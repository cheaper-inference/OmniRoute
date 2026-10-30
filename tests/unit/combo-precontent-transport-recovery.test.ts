import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { setImmediate as nextTurn } from "node:timers/promises";

type Options = import("../../open-sse/services/combo/types.ts").HandleComboChatOptions;
const data = fs.mkdtempSync(path.join(os.tmpdir(), "combo-precontent-transport-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.EMPTY_STREAM_SIBLING_RECOVERY_ENABLED = "false";
process.env.STREAM_RECOVERY_ENABLED = "false";
// Route these fixtures to the quality peek, bypassing the separate first-output gate.
process.env.FETCH_TIMEOUT_MS = "0";
const { handleComboChat, validateResponseQuality } =
  await import("../../open-sse/services/combo.ts");
const { classifyPreContentReadFailure } =
  await import("../../open-sse/services/combo/preContentTransportFailure.ts");
const { SseOutputScanner } = await import("../../open-sse/services/combo/firstOutputStream.ts");
const { createRecoverableStream } = await import("../../open-sse/services/streamRecovery.ts");
const { recordSessionModelUsage, getLastSessionModel } =
  await import("../../src/lib/db/contextHandoffs.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const pinConnection = await createProviderConnection({
  provider: "transport-a",
  authType: "apikey",
  name: "precontent-pin-fixture",
  isActive: true,
  apiKey: "fixture-only",
});
assert.ok(pinConnection?.id);
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { getComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { clearNativeCodexTurnPinsForTests, pinNativeCodexTurn } =
  await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { dispatchEvent } = await import("../../src/lib/webhookDispatcher.ts");
const noop = () => {};
const quiet = { info: noop, warn: noop, error: noop, debug: noop };
const encoder = new TextEncoder();
const first = "transport-a/first";
const second = "transport-b/second";
const third = "transport-c/third";
const role = 'data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n';
const ping = "event: ping\ndata: {}\n\n";
const answer = 'data: {"choices":[{"delta":{"content":"recovered"}}]}\n\ndata: [DONE]\n\n';
let sequence = 0;
const settings = (enabled = true) => ({
  resilienceSettings: { streamRecovery: { enabled }, modelLockout: { enabled: false } },
});
const frame = (payload: unknown, event?: string) =>
  `${event ? `event: ${event}\n` : ""}data: ${JSON.stringify(payload)}\n\n`;
const coded = (code = "ECONNRESET", message = "connection interrupted") =>
  Object.assign(new Error(message), { code });

// A second consumer read releases the rejection only after the prefix was observed.
function cut(prefix: string | string[] = "", error: unknown = coded(), beforeError?: () => void) {
  const chunks = typeof prefix === "string" ? (prefix ? [prefix] : []) : prefix;
  let release: () => void = noop;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let pulls = 0;
  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        if (pulls < chunks.length) {
          controller.enqueue(encoder.encode(chunks[pulls++]));
          return;
        }
        await gate;
        beforeError?.();
        controller.error(error);
      },
    },
    { highWaterMark: 0 }
  );
  const instrumentReader = (response: Response): void => {
    const getReader = response.body!.getReader.bind(response.body!);
    response.body!.getReader = (() => {
      const reader = getReader();
      const read = reader.read.bind(reader);
      let reads = 0;
      reader.read = () => {
        if (++reads > chunks.length) release();
        return read();
      };
      return reader;
    }) as typeof response.body.getReader;
  };
  const instrument = (response: Response): Response => {
    instrumentReader(response);
    const clone = response.clone.bind(response);
    response.clone = () => {
      const result = clone();
      instrumentReader(response);
      return instrument(result);
    };
    return response;
  };
  return instrument(new Response(body, { headers: { "Content-Type": "text/event-stream" } }));
}

function success() {
  return new Response(answer, { headers: { "Content-Type": "text/event-stream" } });
}
function setup(
  route: "priority" | "round-robin" | "runtime" | "pin",
  config: Record<string, unknown> = {}
) {
  const name = `transport-${route}-${++sequence}`;
  const child = {
    name: `${name}-child`,
    strategy: "priority",
    models: [{ model: third }],
    config: { maxRetries: 0 },
  };
  const combo = {
    name,
    strategy: route === "round-robin" ? "round-robin" : "priority",
    context_cache_protection: route === "pin",
    models: [
      { model: first },
      { model: second },
      ...(route === "runtime" ? [{ kind: "combo-ref", comboName: child.name }] : []),
    ],
    config: {
      maxRetries: 1,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
      targetTimeoutMs: 0,
      stickyRoundRobinLimit: 1,
      ...(route === "runtime" ? { nestedComboMode: "execute" } : {}),
      ...config,
    },
  };
  const relayOptions = route === "pin" ? { sessionId: `${name}-session` } : undefined;
  if (relayOptions) {
    recordSessionModelUsage(relayOptions.sessionId, name, first, "transport-a");
    assert.equal(getLastSessionModel(relayOptions.sessionId, name), first);
  }
  return { combo, allCombos: [combo, child], relayOptions };
}
async function run(
  route: Parameters<typeof setup>[0],
  callback: Options["handleSingleModel"],
  extra: Partial<Options> = {},
  config: Record<string, unknown> = {}
) {
  const fixture = setup(route, config);
  const response = await handleComboChat({
    ...fixture,
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    settings: settings(),
    hiddenModelsByProvider: new Map(),
    isModelAvailable: async () => true,
    handleSingleModel: callback,
    log: quiet,
    ...extra,
  });
  return { response, name: fixture.combo.name };
}
async function drain(response: Response) {
  try {
    return await response.text();
  } catch {
    return "read rejected";
  }
}
async function quality(prefix: string, error: unknown, enabled = true, signal?: AbortSignal) {
  const response = cut(prefix, error);
  const result = await validateResponseQuality(response, true, quiet, null, signal, false, enabled);
  if (result.clonedResponse) await drain(result.clonedResponse);
  else void response.body?.cancel().catch(noop);
  return result;
}

test.beforeEach(() => {
  clearAllModelLockouts();
  clearNativeCodexTurnPinsForTests();
});
test.after(async () => {
  // Drain the same webhook import chain used by fire-and-forget combo notifications.
  await dispatchEvent("request.completed", {});
  await closeCallLogSaves(2000);
  resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true });
});

test("test database is inside the temporary DATA_DIR", () => {
  const rows = getDbInstance().pragma("database_list") as Array<{ name: string; file: string }>;
  assert.equal(path.dirname(rows.find((row) => row.name === "main")!.file), data);
});

for (const code of ["ECONNRESET", "EPIPE", "UND_ERR_SOCKET", "UND_ERR_BODY_TIMEOUT"]) {
  for (const form of ["root", "cause", "sanitized"] as const) {
    test(`${code} in ${form} classifies and rejects pre-content quality`, async () => {
      const error =
        form === "root"
          ? coded(code)
          : form === "cause"
            ? new Error("fetch failed", { cause: coded(code) })
            : Object.assign(new Error("fetch failed"), { causeCode: code });
      assert.deepEqual(classifyPreContentReadFailure(error), { kind: "transport", code });
      const result = await quality(form === "root" ? "" : form === "cause" ? ping : role, error);
      assert.equal(result.valid, false);
      assert.equal(result.upstreamFailure?.retryable, true);
      assert.equal(result.upstreamFailure?.transportReadFailure, true);
    });
  }
}
for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  test(`${route}: coded pre-content failure retries the same target`, async () => {
    const calls: string[] = [];
    const { response } = await run(route, async (_body, model, target) => {
      if (route === "pin" && calls.length === 0) assert.equal(target?.modelPinned, true);
      calls.push(model);
      return calls.length === 1 ? cut() : success();
    });
    assert.deepEqual(calls, [first, first]);
    assert.equal(await drain(response), answer);
  });
}

for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  for (const enabled of [false, undefined, true]) {
    test(`${route}: setting ${enabled} preserves unknown errors`, async () => {
      const calls: string[] = [];
      const { response } = await run(
        route,
        async (_body, model) => {
          calls.push(model);
          return cut(ping, new Error("network reset"));
        },
        { settings: enabled === undefined ? {} : settings(enabled) }
      );
      assert.equal(response.status, 200);
      assert.deepEqual(calls, [first]);
      assert.equal(await drain(response), "read rejected");
    });
  }
  test(`${route}: explicit false overrides environment true for coded errors`, async () => {
    process.env.STREAM_RECOVERY_ENABLED = "true";
    try {
      const calls: string[] = [];
      const { response } = await run(
        route,
        async (_body, model) => {
          calls.push(model);
          return cut(ping);
        },
        { settings: settings(false) }
      );
      assert.deepEqual(calls, [first]);
      assert.equal(response.status, 200);
      await drain(response);
    } finally {
      process.env.STREAM_RECOVERY_ENABLED = "false";
    }
  });
  test(`${route}: unset recovery preserves generic coded errors`, async () => {
    const calls: string[] = [];
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return cut(ping);
      },
      { settings: {} }
    );
    assert.deepEqual(calls, [first]);
    assert.equal(response.status, 200);
    await drain(response);
  });
}

for (const route of ["priority", "round-robin", "runtime"] as const) {
  test(`${route}: retries disabled falls back in order`, async () => {
    const calls: string[] = [];
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return model === first ? cut(role) : success();
      },
      {},
      { maxRetries: 0 }
    );
    assert.deepEqual(calls, [first, second]);
    assert.equal(await drain(response), answer);
  });
  test(`${route}: exhausted retries use the existing fallback`, async () => {
    const calls: string[] = [];
    const { response } = await run(route, async (_body, model) => {
      calls.push(model);
      return model === first ? cut(ping) : success();
    });
    assert.deepEqual(calls, [first, first, second]);
    assert.equal(await drain(response), answer);
  });
  test(`${route}: global attempt budget bounds repeated transport failures`, async () => {
    const calls: string[] = [];
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return cut(role);
      },
      {},
      { maxRetries: 3, maxGlobalAttempts: 2 }
    );
    assert.deepEqual(calls, [first, first]);
    assert.equal(response.status, 503);
    await drain(response);
  });
  test(`${route}: priority-only protection policy is preserved on transport failure`, async () => {
    const fixture = setup(route, { maxRetries: 0 });
    Object.assign(fixture.combo.models[0], { fallbackOnlyOnQuotaExhaustion: true });
    const calls: string[] = [];
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return cut(ping);
      },
      fixture
    );
    // Round-robin does not honor priority-only protected-target policy.
    assert.deepEqual(calls, route === "round-robin" ? [first, second] : [first]);
    assert.equal(response.status, 502);
    await drain(response);
  });
}

for (const route of ["priority", "round-robin", "runtime"] as const) {
  test(`${route}: abort while peeking cancels both branches without provider failure`, async () => {
    const ac = new AbortController();
    let cancelled = false;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    const calls: string[] = [];
    const { response, name } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return new Response(
          new ReadableStream<Uint8Array>(
            {
              start(controller) {
                controller.enqueue(encoder.encode(ping));
                closeTimer = setTimeout(() => controller.close(), 100);
              },
              async pull() {
                await new Promise((resolve) => setTimeout(resolve, 20));
                ac.abort();
              },
              cancel() {
                cancelled = true;
                clearTimeout(closeTimer);
              },
            },
            { highWaterMark: 0 }
          ),
          { headers: { "Content-Type": "text/event-stream" } }
        );
      },
      { signal: ac.signal }
    );
    await nextTurn();
    assert.equal(response.status, 499);
    assert.deepEqual(calls, [first]);
    assert.equal(cancelled, true);
    assert.equal(getComboMetrics(name)?.totalFailures ?? 0, 0);
    await drain(response);
  });
  test(`${route}: abort before classifying a coded error adds no failure`, async () => {
    const ac = new AbortController();
    const calls: string[] = [];
    const { response, name } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return cut(ping, coded(), () => ac.abort());
      },
      { signal: ac.signal }
    );
    assert.equal(response.status, 499);
    assert.deepEqual(calls, [first]);
    assert.equal(getComboMetrics(name)?.totalFailures ?? 0, 0);
    await drain(response);
  });
  test(`${route}: abort during transport retry delay preserves only the genuine failure`, async () => {
    const ac = new AbortController();
    const calls: string[] = [];
    const retryLog = {
      ...quiet,
      info: (_tag: string, message: string) => {
        if (message.startsWith("Retrying ") || message.includes("returned 200 but failed quality"))
          setImmediate(() => ac.abort());
      },
      warn: (_tag: string, message: string) => {
        if (route === "runtime" && message.includes("quality")) setImmediate(() => ac.abort());
      },
    };
    // Runtime units have no retry-delay log; abort after the failed peek's read.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const { response, name } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        if (route === "runtime") timer = setTimeout(() => ac.abort(), 30);
        return cut(role);
      },
      { signal: ac.signal, log: retryLog },
      { retryDelayMs: 200 }
    );
    clearTimeout(timer);
    assert.equal(response.status, 499);
    assert.deepEqual(calls, [first]);
    if (route !== "runtime") assert.equal(getComboMetrics(name)?.totalFailures, 1);
    await drain(response);
  });
  test(`${route}: abort before fallback with maxRetries zero prevents sibling dispatch`, async () => {
    const ac = new AbortController();
    const calls: string[] = [];
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return cut(ping, coded(), () => ac.abort());
      },
      { signal: ac.signal },
      { maxRetries: 0 }
    );
    assert.equal(response.status, 499);
    assert.deepEqual(calls, [first]);
    await drain(response);
  });
}
for (const route of ["round-robin", "runtime"] as const) {
  test(`${route}: transport cancellation state survives fallback to an ordinary 503 retry`, async () => {
    const ac = new AbortController();
    const calls: string[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        if (model === first) return cut(ping);
        timer = setTimeout(() => ac.abort(), 20);
        return Response.json(
          { error: { message: "service busy", code: "upstream_busy", type: "server_error" } },
          { status: 503 }
        );
      },
      { signal: ac.signal },
      { retryDelayMs: 80 }
    );
    clearTimeout(timer);
    assert.deepEqual(calls, [first, first, second]);
    assert.equal(response.status, 499);
    await drain(response);
  });
}
for (const phase of [
  "before-dispatch",
  "callback",
  "callback-rejection",
  "peek",
  "content",
] as const) {
  test(`pin: cancellation at ${phase} stops fallthrough and releases the source`, async () => {
    const ac = new AbortController();
    if (phase === "before-dispatch") ac.abort();
    let cancelled = false;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    const calls: string[] = [];
    const { response, name } = await run(
      "pin",
      async (_body, model) => {
        calls.push(model);
        if (phase === "callback-rejection") {
          ac.abort();
          throw new Error("callback rejected");
        }
        if (phase === "callback") ac.abort();
        let sent = false;
        return new Response(
          new ReadableStream<Uint8Array>(
            {
              start(controller) {
                closeTimer = setTimeout(() => controller.close(), 100);
              },
              async pull(controller) {
                if (!sent) {
                  sent = true;
                  controller.enqueue(encoder.encode(phase === "content" ? answer : ping));
                  if (phase === "content") queueMicrotask(() => ac.abort());
                  return;
                }
                if (phase === "peek") {
                  await nextTurn();
                  ac.abort();
                }
              },
              cancel() {
                cancelled = true;
                clearTimeout(closeTimer);
              },
            },
            { highWaterMark: 0 }
          ),
          { headers: { "Content-Type": "text/event-stream" } }
        );
      },
      { signal: ac.signal }
    );
    await nextTurn();
    assert.equal(response.status, 499);
    assert.deepEqual(calls, phase === "before-dispatch" ? [] : [first]);
    if (phase !== "before-dispatch" && phase !== "callback-rejection")
      assert.equal(cancelled, true);
    assert.equal(getComboMetrics(name)?.totalFailures ?? 0, 0);
    await drain(response);
  });
}

const boundaries: Array<[string, string]> = [
  ["text", frame({ choices: [{ delta: { content: "hello" } }] })],
  ["reasoning", frame({ choices: [{ delta: { reasoning_content: "thinking" } }] })],
  [
    "encrypted reasoning item",
    frame({
      type: "response.output_item.added",
      item: { type: "reasoning", encrypted_content: "opaque" },
    }),
  ],
  [
    "tool item",
    frame({
      type: "response.output_item.added",
      item: { type: "function_call", name: "tool", arguments: "" },
    }),
  ],
  [
    "opened Claude block",
    frame({ type: "content_block_start", index: 0, content_block: { type: "text", text: "" } }),
  ],
  ["DONE", "data: [DONE]\n\n"],
  ["finish reason", frame({ choices: [{ delta: {}, finish_reason: "stop" }] })],
  ["usage without choices", frame({ usage: { total_tokens: 1 } })],
  ["usage with empty choices", frame({ choices: [], usage: { total_tokens: 1 } })],
  ["Claude stop", frame({ type: "message_stop" })],
  ["Claude delta stop", frame({ type: "message_delta", delta: { stop_reason: "end_turn" } })],
  ...["completed", "done", "incomplete", "cancelled", "canceled"].map((kind): [string, string] => [
    `Responses ${kind}`,
    frame({ type: `response.${kind}`, response: { output: [] } }),
  ]),
  ["Gemini finish", frame({ candidates: [{ finishReason: "STOP" }] })],
  ["wrapped Gemini finish", frame({ response: { candidates: [{ finishReason: "MAX_TOKENS" }] } })],
];
for (const [name, prefix] of boundaries) {
  test(`quality does not replay after ${name}, including Cursor words in a coded error`, async () => {
    const warnings: unknown[][] = [];
    const logger = {
      ...quiet,
      warn: (...args: unknown[]) => {
        warnings.push(args);
      },
    };
    assertScannerVeto(prefix, true);
    const source = cut(prefix, coded("ECONNRESET", "no usable content secret=must-stay-private"));
    const result = await validateResponseQuality(
      source.clone(),
      true,
      logger,
      null,
      null,
      false,
      true
    );
    assert.equal(result.valid, true);
    assert.equal(result.upstreamFailure, undefined);
    try {
      await rejectNextRead(
        source,
        ["text", "reasoning", "encrypted reasoning item", "tool item"].includes(name)
          ? prefix
          : undefined
      );
    } finally {
      void result.clonedResponse?.body?.cancel().catch(noop);
    }
    assert.doesNotMatch(JSON.stringify(result), /must-stay-private/);
    assert.doesNotMatch(JSON.stringify(warnings), /must-stay-private/);
  });
}
for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  test(`${route}: useful output preserves its payload and vetoes coded Cursor errors`, () =>
    assertRouteVeto(route, boundaries[0][1], 0));
}

test("unspecified Gemini finish remains eligible for transport recovery", async () => {
  const result = await quality(
    frame({ candidates: [{ finishReason: "FINISH_REASON_UNSPECIFIED" }] }),
    coded()
  );
  assert.equal(result.valid, false);
  assert.equal(result.upstreamFailure?.retryable, true);
});

test("recognized transport diagnostic never includes Cursor words or raw secrets", async () => {
  const result = await quality(
    ping,
    coded("EPIPE", "cursor-agent stream timed out token=synthetic-secret /srv/private")
  );
  assert.equal(result.valid, false);
  assert.deepEqual(result.upstreamFailure, {
    status: 502,
    type: "stream_error",
    code: "stream_terminated",
    message: "Upstream stream transport failed before usable output",
    requestScoped: false,
    retryable: true,
    transportReadFailure: true,
  });
  assert.doesNotMatch(JSON.stringify(result), /synthetic-secret|\/srv\/private|cursor-agent/);
});

for (const code of ["ABORT_ERR", "UND_ERR_ABORTED"]) {
  for (const outer of [true, false]) {
    test(`explicit ${code} dominates transport code, outer=${outer}`, async () => {
      const abort = Object.assign(new Error("no usable content secret=abort-private"), { code });
      const error = outer
        ? Object.assign(abort, { cause: coded() })
        : Object.assign(coded("ECONNRESET", "no usable content"), { cause: abort });
      assert.equal((await quality(ping, error)).valid, true);
    });
  }
}
test("AbortError name in a cause dominates transport code", async () => {
  const error = Object.assign(coded(), {
    cause: Object.assign(new Error("cancelled"), { name: "AbortError" }),
  });
  assert.equal((await quality(ping, error)).valid, true);
});
for (const malformed of [
  "cycle",
  "depth",
  "cause getter",
  "code getter",
  "primitive cause",
] as const) {
  test(`malformed ${malformed} is not a structured transport match`, async () => {
    const error: Record<string, unknown> = {
      code: "ECONNRESET",
      message: "connection interrupted",
    };
    if (malformed === "cycle") error.cause = error;
    if (malformed === "depth") {
      let node = error;
      for (let i = 0; i < 8; i++) {
        const child = {};
        node.cause = child;
        node = child;
      }
    }
    if (malformed === "cause getter")
      Object.defineProperty(error, "cause", {
        get() {
          throw new Error("hostile cause");
        },
      });
    if (malformed === "code getter")
      Object.defineProperty(error, "code", {
        get() {
          throw new Error("hostile code");
        },
      });
    if (malformed === "primitive cause") error.cause = "ECONNRESET";
    assert.equal((await quality(ping, error)).valid, true);
  });
}
test("eight-object cause chain is accepted when fully inspected", async () => {
  const root: Record<string, unknown> = {};
  let node = root;
  for (let i = 1; i < 8; i++) {
    const child = {};
    node.cause = child;
    node = child;
  }
  node.code = "UND_ERR_SOCKET";
  assert.equal((await quality(ping, root)).valid, false);
});
test("throwing message getter does not defeat structured recovery", async () => {
  const error = coded();
  Object.defineProperty(error, "message", {
    get() {
      throw new Error("hostile message");
    },
  });
  assert.equal((await quality(ping, error)).valid, false);
});
test("throwing conversion on an unknown error preserves passthrough", async () => {
  const error = {
    toString() {
      throw new Error("hostile string conversion");
    },
  };
  assert.equal((await quality(ping, error)).valid, true);
});
test("locked TypeError keeps its legacy verdict even with a recognized code", async () => {
  const result = await quality(
    ping,
    Object.assign(new TypeError("ReadableStream is locked"), { code: "ECONNRESET" })
  );
  assert.equal(result.reason, "stream locked or disturbed");
  assert.equal(result.upstreamFailure, undefined);
});
test("message-only Cursor error retains its legacy verdict", async () => {
  const result = await quality(ping, new Error("cursor-agent stream timed out"));
  assert.equal(result.valid, false);
  assert.match(result.reason ?? "", /streaming aborted before content/);
});
test("normal EOF and byte-cap policies stay unchanged", async () => {
  for (const prefix of [ping, role]) {
    const result = await validateResponseQuality(
      new Response(prefix, { headers: { "Content-Type": "text/event-stream" } }),
      true,
      quiet,
      null,
      null,
      false,
      true
    );
    assert.equal(result.valid, prefix === ping);
    if (result.clonedResponse) await drain(result.clonedResponse);
  }
  const huge = `:${"x".repeat(1_048_576)}\n\n`;
  const result = await quality(huge, coded());
  assert.equal(result.valid, true);
});

test("real recoverable stream commits metadata, then combo retries its coded read failure", async () => {
  const calls: string[] = [];
  let now = 0;
  let finalized = 0;
  let reopens = 0;
  const { response } = await run("priority", async (_body, model) => {
    calls.push(model);
    if (calls.length > 1) return success();
    let pull = 0;
    const upstream = new ReadableStream<Uint8Array>(
      {
        async pull(controller) {
          if (pull++ === 0) {
            controller.enqueue(encoder.encode(ping));
            return;
          }
          if (pull === 2) {
            now = 60_000;
            controller.enqueue(encoder.encode(role));
            return;
          }
          await nextTurn();
          controller.error(coded("UND_ERR_SOCKET"));
        },
      },
      { highWaterMark: 0 }
    );
    return new Response(
      createRecoverableStream(
        upstream,
        async () => {
          reopens++;
          return null;
        },
        {
          now: () => now,
          maxEarlyRetries: 1,
          finalize: () => {
            finalized++;
          },
        }
      ),
      { headers: { "Content-Type": "text/event-stream" } }
    );
  });
  assert.deepEqual(calls, [first, first]);
  assert.equal(await drain(response), answer);
  assert.equal(reopens, 0);
  assert.equal(finalized, 1);
});
test("real recoverable stream precommit ping-only exhaustion stays clean EOF", async () => {
  const calls: string[] = [];
  let reopens = 0;
  let finalized = 0;
  const { response } = await run("priority", async (_body, model) => {
    calls.push(model);
    const initial = cut(ping).body!;
    const body = createRecoverableStream(
      initial,
      async () => {
        reopens++;
        return cut(ping).body!;
      },
      {
        now: () => 0,
        maxEarlyRetries: 1,
        finalize: () => {
          finalized++;
        },
      }
    );
    return new Response(body, { headers: { "Content-Type": "text/event-stream" } });
  });
  assert.deepEqual(calls, [first]);
  assert.equal(await drain(response), ping);
  assert.equal(reopens, 1);
  assert.equal(finalized, 1);
});

test("enabled transport retry respects explicit connection pins and API-key ACLs", async () => {
  const fixture = setup("priority", { maxRetries: 1 });
  Object.assign(fixture.combo.models[0], {
    connectionId: "allowed",
    allowedConnectionIds: ["allowed"],
  });
  Object.assign(fixture.combo.models[1], { connectionId: "forbidden" });
  const targets: Array<{ model: string; connection: unknown; allowed: unknown }> = [];
  const { response } = await run(
    "priority",
    async (_body, model, target) => {
      targets.push({
        model,
        connection: target?.connectionId,
        allowed: target?.allowedConnectionIds,
      });
      return targets.length === 1 ? cut(ping) : success();
    },
    { ...fixture, apiKeyAllowedConnections: ["allowed"] }
  );
  assert.deepEqual(targets, [
    { model: first, connection: "allowed", allowed: ["allowed"] },
    { model: first, connection: "allowed", allowed: ["allowed"] },
  ]);
  assert.equal(await drain(response), answer);
});

test("transport recovery cannot leave a native turn's model pin", async () => {
  const fixture = setup("priority", { maxRetries: 0 });
  const nativeBody = {
    stream: true,
    messages: [{ role: "user", content: "hello" }],
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({ thread_id: fixture.combo.name, turn_id: "turn" }),
    },
  };
  const model = "codex/gpt-5.6-sol";
  fixture.combo.models[0] = { model };
  pinNativeCodexTurn({
    body: nativeBody,
    comboName: fixture.combo.name,
    target: {
      kind: "model",
      modelStr: model,
      provider: "codex",
      providerId: "codex",
      connectionId: "native-account",
      stepId: "native",
      executionKey: "native",
      label: null,
      weight: 1,
    },
    connectionId: "native-account",
  });
  const calls: string[] = [];
  const { response } = await run(
    "priority",
    async (_body, selected) => {
      calls.push(selected);
      return cut(ping);
    },
    { ...fixture, body: nativeBody, clientManagedResponsesContext: true }
  );
  assert.deepEqual(calls, [model]);
  assert.equal(response.status, 502);
  await drain(response);
});

for (const route of ["priority", "round-robin", "runtime"] as const) {
  test(`${route}: abort after useful output releases the quality replay reader`, async () => {
    const ac = new AbortController();
    let cancelled = false;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    const calls: string[] = [];
    const { response, name } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        let sent = false;
        return new Response(
          new ReadableStream<Uint8Array>(
            {
              start(controller) {
                closeTimer = setTimeout(() => controller.close(), 100);
              },
              pull(controller) {
                if (!sent) {
                  sent = true;
                  controller.enqueue(encoder.encode(answer));
                  queueMicrotask(() => ac.abort());
                }
              },
              cancel() {
                cancelled = true;
                clearTimeout(closeTimer);
              },
            },
            { highWaterMark: 0 }
          ),
          { headers: { "Content-Type": "text/event-stream" } }
        );
      },
      { signal: ac.signal }
    );
    await nextTurn();
    assert.equal(response.status, 499);
    assert.deepEqual(calls, [first]);
    assert.equal(cancelled, true, "canceling both tee branches must reach their source");
    assert.equal(getComboMetrics(name)?.totalFailures ?? 0, 0);
    await drain(response);
  });
}

test("priority transport retry removes the abort listener after normal delay expiry", async () => {
  const ac = new AbortController();
  const active = new Set<EventListenerOrEventListenerObject>();
  const add = ac.signal.addEventListener.bind(ac.signal);
  const remove = ac.signal.removeEventListener.bind(ac.signal);
  ac.signal.addEventListener = (type, callback, options) => {
    if (type === "abort" && callback) active.add(callback);
    add(type, callback, options);
  };
  ac.signal.removeEventListener = (type, callback, options) => {
    if (type === "abort" && callback) active.delete(callback);
    remove(type, callback, options);
  };
  let calls = 0;
  const { response } = await run(
    "priority",
    async () => (++calls === 1 ? cut(ping) : success()),
    { signal: ac.signal },
    { retryDelayMs: 5 }
  );
  assert.equal(await drain(response), answer);
  await nextTurn();
  assert.equal(calls, 2);
  assert.equal(active.size, 0);
});

test("an unknown structured code remains passthrough when enabled", async () => {
  assert.equal((await quality(ping, coded("EAI_AGAIN"))).valid, true);
});
test("aborted signal vetoes known transport and Cursor classification", async () => {
  const ac = new AbortController();
  ac.abort();
  assert.equal(
    (await quality(ping, coded("EPIPE", "no usable content secret=private"), true, ac.signal))
      .valid,
    true
  );
});
for (const enabled of [false, true]) {
  test(`legacy locked and Cursor verdicts remain when enabled=${enabled}`, async () => {
    assert.equal(
      (await quality(ping, new TypeError("body used already"), enabled)).reason,
      "stream locked or disturbed"
    );
    assert.equal((await quality(ping, new Error("no usable content"), enabled)).valid, false);
  });
}

test("canceling an enabled quality replay releases the reader it owns", async () => {
  let cancelled = false;
  let sent = false;
  const original = new Response(
    new ReadableStream<Uint8Array>(
      {
        pull(controller) {
          if (!sent) {
            sent = true;
            controller.enqueue(encoder.encode(answer));
          }
        },
        cancel() {
          cancelled = true;
        },
      },
      { highWaterMark: 0 }
    ),
    { headers: { "Content-Type": "text/event-stream" } }
  );
  const clone = original.clone();
  const result = await validateResponseQuality(clone, true, quiet, null, null, false, true);
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse);
  void result.clonedResponse.body!.cancel().catch(noop);
  void original.body!.cancel().catch(noop);
  await nextTurn();
  assert.equal(cancelled, true);
  assert.equal(clone.body!.locked, false);
});

test("one configured target recovers through its existing same-target retry", async () => {
  const fixture = setup("priority", { maxRetries: 1 });
  fixture.combo.models = [{ model: first }];
  const calls: string[] = [];
  const { response } = await run(
    "priority",
    async (_body, model) => {
      calls.push(model);
      return calls.length === 1 ? cut(role) : success();
    },
    fixture
  );
  assert.deepEqual(calls, [first, first]);
  assert.equal(await drain(response), answer);
});

test("non-streaming client request keeps coded read-error passthrough", async () => {
  const calls: string[] = [];
  const { response } = await run(
    "priority",
    async (_body, model) => {
      calls.push(model);
      return cut("", coded());
    },
    { body: { stream: false, messages: [{ role: "user", content: "hello" }] } }
  );
  assert.deepEqual(calls, [first]);
  assert.equal(response.status, 200);
  await drain(response);
});

async function rejectNextRead(response: Response, prefix?: string) {
  const reader = response.body!.getReader();
  try {
    if (prefix !== undefined) {
      const initial = await reader.read();
      assert.equal(new TextDecoder().decode(initial.value), prefix);
    }
    await assert.rejects(reader.read(), { code: "ECONNRESET" });
  } finally {
    reader.releaseLock();
  }
}
async function rejectReturnedStream(response: Response) {
  const reader = response.body!.getReader();
  try {
    await assert.rejects(
      async () => {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) return;
        }
      },
      { code: "ECONNRESET" }
    );
  } finally {
    reader.releaseLock();
  }
}
async function assertRouteVeto(
  route: Parameters<typeof setup>[0],
  prefix: string,
  targetTimeoutMs = 1000
) {
  const calls: string[] = [];
  const warnings: unknown[][] = [];
  const { response } = await run(
    route,
    async (_body, model, target) => {
      if (route === "pin" && calls.length === 0) assert.equal(target?.modelPinned, true);
      calls.push(model);
      return cut(prefix, coded("ECONNRESET", "no usable content secret=must-stay-private"));
    },
    {
      log: {
        ...quiet,
        warn: (...args: unknown[]) => {
          warnings.push(args);
        },
      },
    },
    { targetTimeoutMs }
  );
  assert.deepEqual(calls, [first]);
  assert.equal(response.status, 200);
  if (targetTimeoutMs === 0) await rejectNextRead(response, prefix);
  else await rejectReturnedStream(response);
  assert.doesNotMatch(JSON.stringify(warnings), /must-stay-private/);
}
const eventOnlyItems: Array<[string, string]> = ["added", "done"].map((kind) => [
  `event-only empty message item ${kind}`,
  frame({ item: { type: "message", content: [] } }, `response.output_item.${kind}`),
]);
function assertScannerVeto(prefix: string | string[], expected: boolean) {
  let observed = false;
  const scanner = new SseOutputScanner(() => {
    observed = true;
  });
  const readiness = new SseOutputScanner();
  for (const chunk of typeof prefix === "string" ? [prefix] : prefix) {
    const ready = scanner.push(chunk);
    assert.equal(ready, readiness.push(chunk), "observer preserves push readiness");
    const overflowed = scanner.overflowedWithoutOutput();
    assert.equal(overflowed, readiness.overflowedWithoutOutput());
    if (ready || overflowed) break;
  }
  assert.equal(scanner.flush(), readiness.flush(), "observer preserves error/EOF flush");
  assert.equal(observed, expected, "scanner's completed frames/output/caps decide replay veto");
}
for (const [boundary, prefix] of eventOnlyItems) {
  test(`scanner observes ${boundary} veto`, () => assertScannerVeto(prefix, true));
}
for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  for (const [boundary, prefix] of [boundaries[0], boundaries[12], eventOnlyItems[1]]) {
    test(`${route}: positive first-output gate retains ${boundary} veto`, () =>
      assertRouteVeto(route, prefix));
  }
  test(`${route}: inherited terminal veto precedes Cursor diagnostics`, async () => {
    const calls: string[] = [];
    const warnings: unknown[][] = [];
    const { response } = await run(
      route,
      async (_body, model) => {
        calls.push(model);
        return cut(
          frame({}, "response.done"),
          coded("ECONNRESET", "no usable content synthetic-secret-veto")
        );
      },
      {
        log: {
          ...quiet,
          warn: (...args: unknown[]) => {
            warnings.push(args);
          },
        },
      },
      { targetTimeoutMs: 1000 }
    );
    assert.deepEqual(calls, [first]);
    assert.doesNotMatch(JSON.stringify(warnings), /synthetic-secret-veto/);
    assert.equal(response.status, 200);
    await rejectReturnedStream(response);
  });
  for (const prefix of [ping, role]) {
    test(`${route}: positive gate metadata still permits transport retry (${prefix === ping ? "ping" : "role"})`, async () => {
      const calls: string[] = [];
      const { response } = await run(
        route,
        async (_body, model) => {
          calls.push(model);
          return calls.length === 1 ? cut(prefix) : success();
        },
        {},
        { targetTimeoutMs: 1000 }
      );
      assert.deepEqual(calls, [first, first]);
      assert.equal(await drain(response), answer);
    });
  }
}
const failureFrames = [
  frame(
    {
      response: {
        status: "failed",
        error: { code: "invalid_request_error", message: "invalid request" },
      },
    },
    "response.failed"
  ),
  frame({ error: { code: "invalid_request_error", message: "invalid request" } }, "error"),
  frame({ error: { code: "context_length_exceeded", message: "context too long" } }),
  frame({ response: { status: "failed", error: { message: "failed" } } }),
  frame("invalid request", "error"),
];
for (const [index, prefix] of failureFrames.entries()) {
  test(`scanner observes failure ${index} veto`, () => assertScannerVeto(prefix, true));
}
for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  test(`${route}: first-gate observed failure preserves lost-frame passthrough`, () =>
    assertRouteVeto(route, failureFrames[0]));
}
for (const benign of [{}, "", false, 0]) {
  test(`benign error ${JSON.stringify(benign)} cannot create a first-output veto`, async () => {
    let calls = 0;
    const { response } = await run(
      "priority",
      async () => (++calls === 1 ? cut(frame({ error: benign })) : success()),
      {},
      { targetTimeoutMs: 1000 }
    );
    assert.equal(calls, 2);
    assert.equal(await drain(response), answer);
  });
}
test("an error still visible to quality retains its request-scoped classification", async () => {
  const fixture = setup("priority", { maxRetries: 1 });
  fixture.combo.models = [{ model: first }];
  let calls = 0;
  const { response } = await run(
    "priority",
    async () => {
      calls++;
      return new Response(failureFrames[0], { headers: { "Content-Type": "text/event-stream" } });
    },
    fixture
  );
  assert.equal(calls, 1);
  assert.equal(response.status, 400);
  await drain(response);
});
for (const ending of ["\n", "\r\n", "\r"]) {
  for (const kind of ["added", "done"]) {
    test(`event-only item ${kind} survives split ${JSON.stringify(ending)} without changing readiness`, async () => {
      const prefix = frame(
        { item: { type: "message", content: [] } },
        `response.output_item.${kind}`
      ).replaceAll("\n", ending);
      const chunks = [...prefix];
      const calls: string[] = [];
      const { response } = await run(
        "priority",
        async (_body, model) => {
          calls.push(model);
          return cut(chunks);
        },
        {},
        { targetTimeoutMs: 1000 }
      );
      assert.deepEqual(calls, [first]);
      assert.equal(response.status, 200);
      await rejectReturnedStream(response);
    });
  }
}
test("response-bound vetoes remain isolated across interleaved invocations", async () => {
  const callsA: string[] = [];
  const callsB: string[] = [];
  const [a, b] = await Promise.all([
    run(
      "priority",
      async (_body, model) => {
        callsA.push(model);
        return cut(frame({}, "response.done"));
      },
      {},
      { targetTimeoutMs: 1000 }
    ),
    run(
      "priority",
      async (_body, model) => {
        callsB.push(model);
        return callsB.length === 1 ? cut(ping) : success();
      },
      {},
      { targetTimeoutMs: 1000 }
    ),
  ]);
  assert.deepEqual(callsA, [first]);
  assert.deepEqual(callsB, [first, first]);
  await rejectReturnedStream(a.response);
  assert.equal(await drain(b.response), answer);
});
test("forged headers cannot create the private veto and no policy header is emitted", async () => {
  let calls = 0;
  const { response } = await run(
    "priority",
    async () => {
      calls++;
      const result = calls === 1 ? cut(ping) : success();
      result.headers.set("X-Forged-Replay-Veto", "true");
      return result;
    },
    { requestHeaders: { "X-Forged-Replay-Veto": "true" } },
    { targetTimeoutMs: 1000 }
  );
  assert.equal(calls, 2);
  assert.equal(await drain(response), answer);
  assert.deepEqual(
    [...response.headers.keys()].filter((name) => /veto|transport/i.test(name)),
    ["x-forged-replay-veto"]
  );
});
for (const root of [true, false]) {
  test(`revoked proxy ${root ? "root" : "cause"} remains safe unknown-error passthrough`, async () => {
    const proxy = Proxy.revocable({}, {});
    proxy.revoke();
    const error = root ? proxy.proxy : Object.assign(coded(), { cause: proxy.proxy });
    assert.equal((await quality(ping, error)).valid, true);
  });
}
const splitReviewFrame = (event: string, data: string[]) =>
  [`event: ${event}`, ...data.map((line) => `data: ${line}`), "", ""].join("\r\n").split(/(?<=\r)/);
type ReviewFrame = [string, string | string[], boolean];
const reviewFrames: ReviewFrame[] = [
  [
    "implicit terminal flush on comment",
    'event: response.done\ndata: {"type":"response.done"}\n: ping\n',
    false,
  ],
  ["comment after non-self-describing data", "event: response.done\ndata: {}\n: ping\n", true],
  ["array-valued usage terminal", frame({ choices: null, usage: [] }), false],
  [
    "incomplete terminal frame",
    frame({ type: "response.done" }, "response.done").slice(0, -1),
    true,
  ],
  [
    "incomplete error frame",
    frame({ type: "error", error: { code: "invalid_request_error" } }, "error").slice(0, -1),
    true,
  ],
  [
    "incomplete useful output",
    frame(
      { type: "response.output_text.delta", delta: "hello" },
      "response.output_text.delta"
    ).slice(0, -1),
    false,
  ],
  ["usage terminal with choices null", frame({ choices: null, usage: { total_tokens: 1 } }), false],
  ["usage terminal with non-array choices", frame({ choices: {}, usage: {} }), false],
  ["response.created usage metadata", frame({ type: "response.created", usage: {} }), true],
  ["response.in_progress usage metadata", frame({ type: "response.in_progress", usage: {} }), true],
  [
    "individual JSON data lines",
    splitReviewFrame("response.output_item.added", [
      '{"item":{"type":"message","content":[]}}',
      '{"metadata":true}',
    ]),
    false,
  ],
  ["empty-type terminal", frame({ type: "", response: { output: [] } }, "response.done"), false],
  [
    "empty-type request failure",
    frame({ type: "", response: { error: { code: "invalid_request_error" } } }, "response.failed"),
    false,
  ],
  [
    "empty-type error",
    frame({ type: "", code: "invalid_request_error", message: "invalid request" }, "error"),
    false,
  ],
  [
    "split multiline terminal",
    splitReviewFrame("response.done", ["{", '"response":{"output":[]}}']),
    false,
  ],
  [
    "split multiline request failure",
    splitReviewFrame("response.failed", [
      "{",
      '"response":{"status":"failed","error":{"code":"invalid_request_error"}}}',
    ]),
    false,
  ],
  [
    "split multiline error",
    splitReviewFrame("error", ["{", '"error":{"code":"invalid_request_error"}}']),
    false,
  ],
  [
    "split multiline output item",
    splitReviewFrame("response.output_item.added", [
      "{",
      '"item":{"type":"message","content":[]}}',
    ]),
    false,
  ],
  ["split multiline metadata", splitReviewFrame("ping", ["{", '"metadata":true}']), true],
];
const largeMetadata = frame({ type: "progress", padding: "x".repeat(80 * 1024) }, "progress");
for (const event of ["response.done", "error", "progress"]) {
  reviewFrames.push([
    `review13 oversized complete ${event} then later metadata`,
    [frame({ type: event, padding: "x".repeat(80 * 1024) }, event), ping],
    false,
  ]);
}
reviewFrames.push(["review13 pending line overflow", ":" + "x".repeat(80 * 1024), false]);
reviewFrames.push(["review13 below cap", frame({ padding: "x".repeat(60 * 1024) }), true]);
for (const payload of [true, 1, "signal", []]) {
  for (const event of [
    "response.done",
    "content_block_start",
    "message_stop",
    "message_start",
    "message_delta",
    "progress",
  ]) {
    reviewFrames.push([
      `review13 ${event} ${JSON.stringify(payload)}`,
      frame(payload, event),
      ["message_start", "message_delta", "progress"].includes(event),
    ]);
  }
}
for (const payload of [false, 0, "", null]) {
  reviewFrames.push([
    `review13 falsey terminal ${JSON.stringify(payload)}`,
    frame(payload, "response.done"),
    true,
  ]);
}
reviewFrames.push(["review14 line budget", ":\n".repeat(257), false]);
reviewFrames.push(["review14 below line budget", ":\n".repeat(200), true]);
for (const [label, prefix, recover] of reviewFrames) {
  test(`scanner preserves ${label}`, () => assertScannerVeto(prefix, !recover));
}
for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  for (const enabled of [false, undefined]) {
    test(`${route}: oversized metadata passthrough with recovery ${enabled}`, async () => {
      const calls: string[] = [];
      const { response } = await run(
        route,
        async (_body, model, target) => {
          if (route === "pin" && calls.length === 0) assert.equal(target?.modelPinned, true);
          calls.push(model);
          return cut(largeMetadata);
        },
        { settings: enabled === undefined ? {} : settings(enabled) },
        { targetTimeoutMs: 1000 }
      );
      assert.deepEqual(calls, [first]);
      assert.equal(response.status, 200);
      await rejectReturnedStream(response);
    });
  }
}
