import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { test } from "node:test";
import {
  runM365Turn,
  M365TurnError,
  type M365TurnOptions,
} from "../../open-sse/executors/m365Turn.ts";

const RS = "\x1e";
const encode = (frame: unknown) => JSON.stringify(frame) + RS;
class Socket extends EventEmitter {
  static instances: Socket[] = [];
  readyState = 0;
  sent: string[] = [];
  closes = 0;
  terminated = false;
  constructor(
    public url: string,
    public options: { headers: Record<string, string> }
  ) {
    super();
    Socket.instances.push(this);
  }
  send(data: string) {
    this.sent.push(data);
  }
  close() {
    this.closes++;
    this.readyState = 2;
  }
  terminate() {
    this.terminated = true;
    this.closed();
  }
  open() {
    this.readyState = 1;
    this.emit("open");
  }
  frame(frame: unknown) {
    this.emit("message", Buffer.from(encode(frame)));
  }
  closed() {
    this.readyState = 3;
    this.emit("close");
  }
}
const invocation = { type: 4, invocationId: "0", target: "chat", arguments: [] };
function start(extra: Partial<M365TurnOptions> = {}) {
  const promise = runM365Turn({
    url: "wss://substrate.office.com/chat?ConversationId=exact%2Bsession&access_token=PRIVATE",
    invocation,
    WebSocketCtor: Socket,
    idleTimeoutMs: 1000,
    timeoutMs: 2000,
    ...extra,
  });
  const socket = Socket.instances.at(-1)!;
  return { promise, socket };
}
function ready(extra: Partial<M365TurnOptions> = {}) {
  const turn = start(extra);
  turn.socket.open();
  turn.socket.frame({});
  return turn;
}
function rejected(promise: Promise<void>, code: string, status = 502) {
  return assert.rejects(promise, (error: unknown) => {
    assert.ok(error instanceof M365TurnError);
    assert.equal(error.code, code);
    assert.equal(error.status, status);
    assert.equal(error.cause, undefined);
    assert.doesNotMatch(error.message, /PRIVATE|secret|access_token/);
    return true;
  });
}

test("handshake, browser headers, combined invocation Metrics and partial RS frames", async () => {
  const frames: Record<string, unknown>[] = [];
  const { promise, socket } = start({ onFrame: (frame) => frames.push(frame) });
  assert.equal(socket.options.headers["X-RoutingParameter-SessionKey"], "exact+session");
  assert.equal(socket.options.headers.Origin, "https://m365.cloud.microsoft");
  assert.match(socket.options.headers["User-Agent"], /Chrome\/126/);
  socket.open();
  assert.deepEqual(socket.sent, [encode({ protocol: "json", version: 1 })]);
  socket.emit("message", Buffer.from("{"));
  socket.emit("message", Buffer.from("}" + RS + '{"type":1'));
  assert.equal(socket.sent.length, 2);
  const sent = socket.sent[1]
    .split(RS)
    .filter(Boolean)
    .map((s) => JSON.parse(s));
  assert.deepEqual(sent[0], invocation);
  assert.equal(sent[1].target, "Metrics");
  socket.emit("message", Buffer.from(',"arguments":[]}' + RS));
  socket.frame({ type: 6 });
  socket.frame({ type: 2, item: { result: { value: "Success" } } });
  await promise;
  assert.deepEqual(
    frames.map((f) => f.type),
    [undefined, 1, 6, 2]
  );
  assert.equal(socket.closes, 1);
  socket.emit("error", new Error("PRIVATE"));
  socket.closed();
  assert.equal(socket.listenerCount("error"), 0);
  assert.equal(socket.listenerCount("message"), 0);
});

test("native Disengaged messages fail rather than allowing later completion", async () => {
  const { promise, socket } = ready();
  socket.frame({
    type: 1,
    arguments: [{ messages: [{ messageType: "Disengaged", text: "PRIVATE" }] }],
  });
  socket.frame({ type: 3 });
  await rejected(promise, "M365_DISENGAGED", 400);
  socket.closed();
});

test("UTF-8 code points split across packets remain intact", async () => {
  const seen: Record<string, unknown>[] = [];
  const { promise, socket } = ready({ onFrame: (frame) => seen.push(frame) });
  const bytes = Buffer.from(encode({ type: 1, text: "😀" }));
  const split = bytes.indexOf(Buffer.from("😀")) + 2;
  socket.emit("message", bytes.subarray(0, split));
  socket.emit("message", bytes.subarray(split));
  socket.frame({ type: 3 });
  await promise;
  assert.equal(seen[1].text, "😀");
  socket.closed();
});

test("constructor failures expose only fixed socket error", async () => {
  class BrokenSocket extends Socket {
    constructor(url: string, options: { headers: Record<string, string> }) {
      super(url, options);
      throw new Error("PRIVATE access_token=secret");
    }
  }
  await rejected(start({ WebSocketCtor: BrokenSocket }).promise, "M365_SOCKET_ERROR");
});

test("pre-aborted signal creates no socket", async () => {
  const before = Socket.instances.length;
  const signal = AbortSignal.abort("PRIVATE");
  await rejected(start({ signal }).promise, "M365_ABORTED", 499);
  assert.equal(Socket.instances.length, before);
});

test("abort sends native Stop and rejects before asynchronous close", async () => {
  const controller = new AbortController();
  const { promise, socket } = ready({ signal: controller.signal });
  controller.abort(new Error("PRIVATE"));
  await rejected(promise, "M365_ABORTED", 499);
  assert.deepEqual(JSON.parse(socket.sent.at(-1)!.slice(0, -1)), {
    type: 1,
    invocationId: "1",
    target: "stop",
    arguments: [{}],
  });
  assert.equal(socket.closes, 1);
  socket.frame({ type: 2, item: { result: { value: "Success" } } });
  socket.emit("error", new Error("secret"));
  socket.closed();
});

for (const [value, status, code] of [
  ["Throttled", 429, "M365_THROTTLED"],
  ["PerUserThrottled", 429, "M365_THROTTLED"],
  ["OutOfCredits", 429, "M365_OUT_OF_CREDITS"],
  ["ForbiddenRequest", 403, "M365_FORBIDDEN"],
  ["InvalidCopilotLicense", 403, "M365_FORBIDDEN"],
  ["InternalError", 502, "M365_PROTOCOL_ERROR"],
  ["Disengaged", 400, "M365_DISENGAGED"],
] as const) {
  test(`type2 ${value} fails before composer can publish a success`, async () => {
    const seen: unknown[] = [];
    const { promise, socket } = ready({ onFrame: (f) => seen.push(f) });
    socket.frame({ type: 2, item: { result: { value, message: "PRIVATE" } } });
    socket.frame({ type: 3 });
    socket.closed();
    await rejected(promise, code, status);
    assert.equal(seen.length, 1);
  });
}
for (const frame of [
  { type: 3, error: "PRIVATE" },
  { type: 3, error: { code: "InternalError", message: "PRIVATE" } },
  { type: 7, error: "PRIVATE" },
  { type: 7 },
  { type: 2, item: { result: { error: "PRIVATE" } } },
]) {
  test(`terminal failure ${JSON.stringify(frame)}`, async () => {
    const { promise, socket } = ready();
    socket.frame(frame);
    await rejected(promise, "M365_PROTOCOL_ERROR");
    socket.closed();
  });
}

test("type3 success settles before close and late abort/error cannot override", async () => {
  const controller = new AbortController();
  const { promise, socket } = ready({ signal: controller.signal });
  socket.frame({ type: 3 });
  await promise;
  controller.abort();
  socket.emit("error", new Error("PRIVATE"));
  socket.closed();
  assert.equal(socket.closes, 1);
});

test("premature close with updates is never partial success", async () => {
  const { promise, socket } = ready();
  socket.frame({ type: 1, arguments: [{ text: "partial" }] });
  socket.closed();
  await rejected(promise, "M365_SOCKET_CLOSED");
});

for (const handshake of [{ type: 6 }, [], null, { error: "PRIVATE" }, { unexpected: true }]) {
  test(`strict handshake refuses ${JSON.stringify(handshake)}`, async () => {
    const { promise, socket } = start();
    socket.open();
    socket.frame(handshake);
    await rejected(promise, "M365_HANDSHAKE_ERROR");
    assert.equal(socket.sent.length, 1);
    socket.closed();
  });
}
for (const raw of [
  "not json" + RS,
  "null" + RS,
  "[]" + RS,
  "{}" + RS,
  "x".repeat(1024 * 1024 + 1),
]) {
  test(`malformed or oversized payload fails closed (${raw.length})`, async () => {
    const { promise, socket } = ready();
    socket.emit("message", Buffer.from(raw));
    await rejected(
      promise,
      raw.length > 1024 * 1024 ? "M365_FRAME_TOO_LARGE" : "M365_PROTOCOL_ERROR"
    );
    socket.closed();
  });
}

test("full incoming cumulative bytes are bounded even when every frame is complete", async () => {
  const { promise, socket } = ready();
  const chunk = encode({ type: 1, padding: "x".repeat(512 * 1024) });
  for (let i = 0; i < 33; i++) socket.emit("message", Buffer.from(chunk));
  await rejected(promise, "M365_RESPONSE_TOO_LARGE");
  socket.closed();
});

test("idle activity resets the deadline", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const { promise, socket } = ready({ idleTimeoutMs: 80, timeoutMs: 500 });
  const failure = rejected(promise, "M365_IDLE_TIMEOUT", 504);
  t.mock.timers.tick(45);
  socket.frame({ type: 6 });
  t.mock.timers.tick(45);
  assert.equal(socket.closes, 0);
  t.mock.timers.tick(35);
  await failure;
  socket.closed();
});

test("total timeout bounds an active socket", async () => {
  const { promise, socket } = ready({ idleTimeoutMs: 200, timeoutMs: 40 });
  await rejected(promise, "M365_TIMEOUT", 504);
  socket.closed();
});

test("unclosed socket is forcibly terminated after bounded grace", async () => {
  const { promise, socket } = ready();
  socket.frame({ type: 3 });
  await promise;
  await delay(2100);
  assert.equal(socket.terminated, true);
  assert.equal(socket.listenerCount("error"), 0);
});

for (const shape of ["object", "array", "argument"] as const) {
  for (const errorCode of [
    "PremiumModelUnavailableForLicense",
    "ClaudeUnavailableForLicense",
    "ForbiddenRequest",
    "InvalidCopilotLicense",
  ] as const) {
    test(`licence errorCode ${errorCode} wins over generic result in ${shape}`, async () => {
      const seen: unknown[] = [];
      const { promise, socket } = ready({ onFrame: (f) => seen.push(f) });
      const item = {
        result: { value: "InternalError", errorCode, message: "PRIVATE access_token=secret" },
      };
      socket.frame({
        type: 2,
        ...(shape === "object"
          ? { item }
          : shape === "array"
            ? { item: [item] }
            : { arguments: [{ item }] }),
      });
      await assert.rejects(promise, (error: unknown) => {
        assert.ok(error instanceof M365TurnError);
        assert.equal(error.code, "M365_FORBIDDEN");
        assert.equal(error.status, 403);
        assert.equal(error.upstreamErrorCode, errorCode);
        assert.doesNotMatch(JSON.stringify(error) + error.message, /PRIVATE|secret|access_token/);
        return true;
      });
      assert.equal(socket.readyState, 2); // settled without waiting for close
      socket.frame({ type: 3 });
      assert.equal(seen.length, 1);
      socket.closed();
    });
  }
  test(`canonical ${shape} success reaches composer unchanged`, async () => {
    const seen: unknown[] = [];
    const { promise, socket } = ready({ onFrame: (f) => seen.push(f) });
    const item = { result: { value: "Success" } };
    const frame = {
      type: 2,
      ...(shape === "object"
        ? { item }
        : shape === "array"
          ? { item: [item] }
          : { arguments: [{ item }] }),
    };
    socket.frame(frame);
    await promise;
    assert.deepEqual(seen[1], frame);
    socket.closed();
  });
}

for (const retryAfter of [12.2, 0, -1, "25", "PRIVATE", 1e20, null]) {
  test(`throttle retry hint is bounded and typed (${retryAfter})`, async () => {
    const { promise, socket } = ready();
    socket.frame({
      type: 2,
      item: {
        result: { value: "Throttled", errorCode: "PRIVATE access_token=secret", retryAfter },
      },
    });
    await assert.rejects(promise, (error: unknown) => {
      assert.ok(error instanceof M365TurnError);
      assert.equal(error.code, "M365_THROTTLED");
      assert.equal(
        error.retryAfterSeconds,
        typeof retryAfter === "number" && retryAfter > 0
          ? Math.min(604800, Math.ceil(retryAfter))
          : undefined
      );
      assert.equal(error.upstreamErrorCode, undefined);
      assert.equal(error.priorityWindow, undefined);
      assert.doesNotMatch(JSON.stringify(error) + error.message, /PRIVATE|secret|access_token/);
      return true;
    });
    socket.closed();
  });
}

for (const [now, window, reset] of [
  ["2026-11-04T12:00:00Z", "today", "2026-11-05T00:00:00Z"],
  ["2026-11-08T23:59:59Z", "the week", "2026-11-09T00:00:00Z"],
  ["2026-11-09T00:00:00Z", "the week", "2026-11-16T00:00:00Z"],
] as const) {
  test(`observed priority refusal ${window} uses strictly next UTC reset from ${now}`, async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: Date.parse(now) });
    const { promise, socket } = ready();
    socket.frame({
      type: 2,
      item: {
        result: {
          value: "OutOfCredits",
          message: `You've used your available priority access to the Opus model for ${window}. You can choose another available model or wait until tomorrow.`,
        },
      },
    });
    await assert.rejects(promise, (error: unknown) => {
      assert.ok(error instanceof M365TurnError);
      assert.equal(error.code, "M365_OUT_OF_CREDITS");
      assert.equal(error.priorityWindow, window === "today" ? "day" : "week");
      assert.equal(error.retryAfterSeconds, (Date.parse(reset) - Date.now()) / 1000);
      assert.equal(error.quotaResetSource, "priority_access");
      return true;
    });
    socket.closed();
  });
}

test("unrecognized credits refusal has no invented reset and metadata is per turn", async () => {
  for (const message of [
    "PRIVATE week Monday access_token=secret",
    "Example: You've used your available priority access to the Opus model for today.",
    undefined,
  ]) {
    const { promise, socket } = ready();
    socket.frame({ type: 2, item: { result: { value: "OutOfCredits", message } } });
    await assert.rejects(promise, (error: unknown) => {
      assert.ok(error instanceof M365TurnError);
      assert.equal(error.quotaResetSource, "unknown");
      assert.equal(error.priorityWindow, undefined);
      assert.equal(error.retryAfterSeconds, undefined);
      assert.equal(error.upstreamErrorCode, undefined);
      assert.doesNotMatch(JSON.stringify(error) + error.message, /PRIVATE|secret|access_token/);
      return true;
    });
    socket.closed();
  }
  const { promise, socket } = ready();
  socket.frame({
    type: 2,
    item: {
      result: { value: "Throttled" },
      throttling: { metering: { remainingAllowance: 0 }, retryAfterSeconds: 100 },
    },
  });
  await assert.rejects(promise, (error: unknown) => {
    assert.ok(error instanceof M365TurnError);
    assert.equal(error.retryAfterSeconds, undefined);
    assert.equal(error.quotaResetSource, undefined);
    return true;
  });
  socket.closed();
});

test("abort before handshake never sends Stop", async () => {
  const controller = new AbortController();
  const { promise, socket } = start({ signal: controller.signal });
  socket.open();
  controller.abort();
  await rejected(promise, "M365_ABORTED", 499);
  assert.deepEqual(socket.sent, [encode({ protocol: "json", version: 1 })]);
  socket.closed();
});
