import test from "node:test";
import assert from "node:assert/strict";

const { createStreamController, pipeWithDisconnect } =
  await import("../../open-sse/utils/streamHandler.ts");

// A request-signal abort reaches the inner stream controller directly, so it used to skip the
// wrapper that pipeWithDisconnect builds to clear the stall, active and content-stall timers.
// The three timers stayed live (and kept the stream's closures reachable) until they fired.

const encoder = new TextEncoder();
const STALL_MS = 60_000;
const ACTIVE_MS = 120_000;
const CONTENT_MS = 90_000;
const settle = async () => {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
};

// Track watchdog-sized timers that are set and not yet cleared or fired.
function trackWatchdogTimers() {
  const live = new Set<unknown>();
  const realSet = globalThis.setTimeout;
  const realClear = globalThis.clearTimeout;
  globalThis.setTimeout = ((fn: (...a: unknown[]) => void, ms?: number, ...rest: unknown[]) => {
    const timer = realSet(
      (...a: unknown[]) => {
        live.delete(timer);
        fn(...a);
      },
      ms,
      ...rest
    );
    if ((ms ?? 0) >= STALL_MS) live.add(timer);
    return timer;
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((timer?: Parameters<typeof clearTimeout>[0]) => {
    live.delete(timer);
    return realClear(timer);
  }) as typeof clearTimeout;
  return {
    live,
    restore() {
      for (const timer of live) realClear(timer as Parameters<typeof clearTimeout>[0]);
      live.clear();
      globalThis.setTimeout = realSet;
      globalThis.clearTimeout = realClear;
    },
  };
}

// An upstream body that sent a role-only chunk (no model output yet) and never ends or errors.
// Real content would clear the content-stall timer by design, so it is left out here.
const openBody = () =>
  new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n')
        );
      },
    })
  );

async function startPiped(clientAbort: AbortController, body: Response = openBody()) {
  const controller = createStreamController({ clientAbortSignal: clientAbort.signal });
  const stream = pipeWithDisconnect(body, new TransformStream(), controller, {
    stallTimeoutMs: STALL_MS,
    activeTimeoutMs: ACTIVE_MS,
    contentStallTimeoutMs: CONTENT_MS,
  });
  const reader = stream.getReader();
  await reader.read();
  return reader;
}

test("while streaming, the stall, active and content-stall timers are armed", async () => {
  const timers = trackWatchdogTimers();
  const reader = await startPiped(new AbortController());
  try {
    await settle();
    assert.equal(timers.live.size, 3);
  } finally {
    timers.restore();
    await reader.cancel().catch(() => {});
  }
});

test("a client request abort clears the stall, active and content-stall timers", async () => {
  const timers = trackWatchdogTimers();
  const clientAbort = new AbortController();
  const reader = await startPiped(clientAbort);
  try {
    assert.equal(timers.live.size, 3);
    clientAbort.abort("client_gone");
    await settle();
    assert.equal(timers.live.size, 0, `${timers.live.size} watchdog timers still live`);
  } finally {
    timers.restore();
    await reader.cancel().catch(() => {});
  }
});

test("a deadline abort of the request signal clears the watchdog timers", async () => {
  const timers = trackWatchdogTimers();
  const clientAbort = new AbortController();
  const reader = await startPiped(clientAbort);
  try {
    clientAbort.abort(Object.assign(new Error("deadline"), { name: "TimeoutError" }));
    await settle();
    assert.equal(timers.live.size, 0, `${timers.live.size} watchdog timers still live`);
  } finally {
    timers.restore();
    await reader.cancel().catch(() => {});
  }
});

test("a stream that completes normally leaves no watchdog timer", async () => {
  const timers = trackWatchdogTimers();
  try {
    const controller = createStreamController({ clientAbortSignal: new AbortController().signal });
    const body = new Response(
      new ReadableStream<Uint8Array>({
        start(c) {
          c.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"hi"}}]}\n\n'));
          c.close();
        },
      })
    );
    const stream = pipeWithDisconnect(body, new TransformStream(), controller, {
      stallTimeoutMs: STALL_MS,
      activeTimeoutMs: ACTIVE_MS,
      contentStallTimeoutMs: CONTENT_MS,
    });
    const reader = stream.getReader();
    while (!(await reader.read()).done);
    await settle();
    assert.equal(timers.live.size, 0);
  } finally {
    timers.restore();
  }
});

test("a request already aborted before the pipe starts leaves no watchdog timer", async () => {
  const timers = trackWatchdogTimers();
  const clientAbort = new AbortController();
  clientAbort.abort("gone_before_pipe");
  const controller = createStreamController({ clientAbortSignal: clientAbort.signal });
  await settle(); // the controller handles the pre-aborted signal in a microtask
  const stream = pipeWithDisconnect(openBody(), new TransformStream(), controller, {
    stallTimeoutMs: STALL_MS,
    activeTimeoutMs: ACTIVE_MS,
    contentStallTimeoutMs: CONTENT_MS,
  });
  try {
    await settle();
    assert.equal(timers.live.size, 0, `${timers.live.size} watchdog timers still live`);
  } finally {
    timers.restore();
    await stream.cancel().catch(() => {});
  }
});
