import test from "node:test";
import assert from "node:assert/strict";
import type { NextRequest } from "next/server";

const { GET: gamificationStreamGET } =
  await import("../../src/app/api/gamification/stream/route.ts");
const { GET: serviceLogsGET } = await import("../../src/app/api/services/[name]/logs/route.ts");
const { registerSupervisor } = await import("../../src/lib/services/registry.ts");
const { ServiceSupervisor } = await import("../../src/lib/services/ServiceSupervisor.ts");

/**
 * Count intervals created while `fn` runs that are still armed afterwards.
 * The routes own their handles privately, so this is the only way to observe them.
 */
async function withTimerAccounting(fn: () => Promise<void>): Promise<number> {
  const live = new Set<unknown>();
  const realSet = globalThis.setInterval;
  const realClear = globalThis.clearInterval;

  globalThis.setInterval = ((...args: Parameters<typeof realSet>) => {
    const handle = realSet(...args);
    live.add(handle);
    return handle;
  }) as typeof realSet;

  globalThis.clearInterval = ((handle: Parameters<typeof realClear>[0]) => {
    if (handle !== undefined) live.delete(handle);
    return realClear(handle);
  }) as typeof realClear;

  try {
    await fn();
    await new Promise((r) => setTimeout(r, 50));
    // Stop whatever survived so a failing test cannot hang the runner.
    for (const handle of live) realClear(handle as Parameters<typeof realClear>[0]);
    return live.size;
  } finally {
    globalThis.setInterval = realSet;
    globalThis.clearInterval = realClear;
  }
}

test("gamification stream: cancel() without an abort clears both intervals (#18445)", async () => {
  // A half-open peer never aborts the request signal; the runtime only
  // cancels the body stream once a write to the dead socket fails.
  const live = await withTimerAccounting(async () => {
    const resp = await gamificationStreamGET(
      new Request("http://localhost/api/gamification/stream") as NextRequest
    );
    const reader = resp.body!.getReader();
    await reader.read();
    await reader.cancel();
  });
  assert.equal(live, 0, `cancel() left ${live} interval(s) running`);
});

test("gamification stream: an already-aborted signal closes the stream with no timers (#18445)", async () => {
  const abort = new AbortController();
  abort.abort();

  let done = false;
  const live = await withTimerAccounting(async () => {
    const resp = await gamificationStreamGET(
      new Request("http://localhost/api/gamification/stream", {
        signal: abort.signal,
      }) as NextRequest
    );
    ({ done } = await resp.body!.getReader().read());
  });
  assert.equal(live, 0, `an already-aborted signal left ${live} interval(s) running`);
  assert.equal(done, true, "the stream must be closed when the signal was already aborted");
});

test("service logs stream: cancel() without an abort unsubscribes and clears the heartbeat (#18445)", async () => {
  const sup = new ServiceSupervisor({
    tool: "sse-cancel-18445",
    port: 29998,
    spawnArgs: () => ({
      command: process.execPath,
      args: ["-e", "setTimeout(() => {}, 999999)"],
      env: process.env,
      cwd: process.cwd(),
    }),
    healthUrl: () => `http://127.0.0.1:29998/health`,
    healthIntervalMs: 500,
    stopTimeoutMs: 500,
    logsBufferBytes: 1_048_576,
  });
  registerSupervisor(sup);

  const rb = sup.getRingBuffer();
  let subscribers = 0;
  const realSubscribe = rb.subscribe.bind(rb);
  rb.subscribe = (cb) => {
    subscribers++;
    const unsubscribe = realSubscribe(cb);
    return () => {
      subscribers--;
      return unsubscribe();
    };
  };

  const live = await withTimerAccounting(async () => {
    const resp = await serviceLogsGET(
      new Request("http://localhost/api/services/x/logs") as NextRequest,
      {
        params: Promise.resolve({ name: "sse-cancel-18445" }),
      }
    );
    const reader = resp.body!.getReader();
    await reader.read();
    assert.equal(subscribers, 1, "the stream should subscribe to the ring buffer");
    await reader.cancel();
  });

  assert.equal(live, 0, `cancel() left ${live} heartbeat interval(s) running`);
  assert.equal(subscribers, 0, "cancel() must unsubscribe from the ring buffer");
});
