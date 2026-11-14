/**
 * #18669 — rate-limit cooldown timers and Codex WebSocket listeners must be releasable.
 *
 * - rateLimitSemaphore tracks the cooldown drain timeouts it schedules, so resetAll() clears
 *   them, and each drain timeout is unref'd so a long cooldown cannot keep a process alive.
 * - The Codex Responses-over-WebSocket stream detaches its socket listeners once it finishes,
 *   so a late frame or close event can no longer reach a finished stream.
 * - Guards for two accountSemaphore behaviours the original PR changed and that stay as on
 *   the release branch: reset(key) frees the key for an immediate re-acquire, and a release
 *   on one key still admits a waiter queued on another key whose block has expired.
 */
import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-timer-cleanup-18669-"));
const savedDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

type TimerHandle = ReturnType<typeof setInterval>;

/** Records every handle passed to clearInterval/clearTimeout while `fn` runs. */
function captureClears(fn: () => void): unknown[] {
  const cleared: unknown[] = [];
  const realClearInterval = globalThis.clearInterval;
  const realClearTimeout = globalThis.clearTimeout;
  globalThis.clearInterval = ((handle?: TimerHandle) => {
    cleared.push(handle);
    realClearInterval(handle);
  }) as typeof clearInterval;
  globalThis.clearTimeout = ((handle?: ReturnType<typeof setTimeout>) => {
    cleared.push(handle);
    realClearTimeout(handle);
  }) as typeof clearTimeout;
  try {
    fn();
  } finally {
    globalThis.clearInterval = realClearInterval;
    globalThis.clearTimeout = realClearTimeout;
  }
  return cleared;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

after(async () => {
  const core = await import("../../src/lib/db/core.ts");
  core.resetDbInstance();
  if (savedDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = savedDataDir;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("#18669 rateLimitSemaphore cooldown timers", () => {
  afterEach(async () => {
    const mod = await import("../../open-sse/services/rateLimitSemaphore.ts");
    mod.resetAll();
  });

  it("the cooldown timer admits the queued waiter", async () => {
    const mod = await import("../../open-sse/services/rateLimitSemaphore.ts");
    const model = "provider-18669/model-a";
    const release = await mod.acquire(model, { maxConcurrency: 1, timeoutMs: 1_000 });
    release();
    mod.markRateLimited(model, 20);
    const waiter = mod.acquire(model, { maxConcurrency: 1, timeoutMs: 1_000 });
    const releaseWaiter = await waiter;
    releaseWaiter();
  });

  it("resetAll clears pending cooldown timers", async () => {
    const mod = await import("../../open-sse/services/rateLimitSemaphore.ts");
    const model = "provider-18669/model-c";
    mod.markRateLimited(model, 5_000);
    const cleared = captureClears(() => mod.resetAll());
    assert.equal(cleared.length, 1);
  });

  it("the cooldown drain timeout does not keep the process alive", async () => {
    const mod = await import("../../open-sse/services/rateLimitSemaphore.ts");
    const model = "provider-18669/model-d";
    mod.markRateLimited(model, 60_000);
    const cleared = captureClears(() => mod.resetAll());
    assert.equal(cleared.length, 1);
    const timer = cleared[0] as ReturnType<typeof setTimeout>;
    assert.equal(timer.hasRef(), false, "the drain timeout is unref'd");
  });
});

describe("#18669 Codex WebSocket stream detaches socket listeners when it finishes", () => {
  type MockSocket = {
    send: (data: string) => void;
    close: (code?: number, reason?: string) => void;
    onmessage: ((event: { data: unknown }) => void) | null;
    onerror: ((event: { message?: string }) => void) | null;
    onclose: ((event?: { code?: number; reason?: string }) => void) | null;
  };

  after(async () => {
    const codex = await import("../../open-sse/executors/codex.ts");
    codex.__setCodexWebSocketTransportForTesting(undefined);
  });

  async function runWith(ws: MockSocket) {
    const codex = await import("../../open-sse/executors/codex.ts");
    codex.__setCodexWebSocketTransportForTesting(async () => ws);
    const executor = new codex.CodexExecutor();
    return executor.execute({
      model: "gpt-5.5-xhigh",
      body: { model: "gpt-5.5-xhigh", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "codex-token",
        providerSpecificData: { codexTransport: "websocket" },
      },
    });
  }

  it("after a terminal event", async () => {
    const closes: string[] = [];
    const ws: MockSocket = {
      send() {
        queueMicrotask(() => {
          ws.onmessage?.({
            data: JSON.stringify({
              type: "response.completed",
              response: { id: "resp_18669", status: "completed" },
            }),
          });
        });
      },
      close(_code, reason) {
        closes.push(String(reason));
      },
      onmessage: null,
      onerror: null,
      onclose: null,
    };
    const result = await runWith(ws);
    const body = await result.response.text();

    assert.match(body, /response\.completed/);
    assert.deepEqual(closes, ["terminal_event"]);
    assert.equal(ws.onmessage, null);
    assert.equal(ws.onerror, null);
    assert.equal(ws.onclose, null);
  });

  it("after the client cancels the stream", async () => {
    const closes: string[] = [];
    const ws: MockSocket = {
      send() {
        queueMicrotask(() => {
          ws.onmessage?.({
            data: JSON.stringify({ type: "response.output_text.delta", delta: "partial" }),
          });
        });
      },
      close(_code, reason) {
        closes.push(String(reason));
      },
      onmessage: null,
      onerror: null,
      onclose: null,
    };
    const result = await runWith(ws);
    const reader = result.response.body!.getReader();
    await reader.read();
    await reader.cancel("client went away");

    assert.deepEqual(closes, ["client_cancelled"]);
    assert.equal(ws.onmessage, null);
    assert.equal(ws.onerror, null);
    assert.equal(ws.onclose, null);
  });
});

describe("#18669 accountSemaphore guards", () => {
  afterEach(async () => {
    const mod = await import("../../open-sse/services/accountSemaphore.ts");
    mod.resetAll();
  });

  it("reset(key) frees the key for an immediate re-acquire", async () => {
    const mod = await import("../../open-sse/services/accountSemaphore.ts");
    const key = "acct-18669-reset";
    await mod.acquire(key, { maxConcurrency: 1, timeoutMs: 200 });
    mod.reset(key);

    const release = await mod.acquire(key, { maxConcurrency: 1, timeoutMs: 200 });
    assert.equal(mod.getStats()[key].running, 1);
    release();
  });

  it("a release on one key admits a waiter whose blocked key has expired", async () => {
    const mod = await import("../../open-sse/services/accountSemaphore.ts");
    const blockedKey = "acct-18669-blocked";
    const otherKey = "acct-18669-other";

    const releaseOther = await mod.acquire(otherKey, { maxConcurrency: 1, timeoutMs: 1_000 });
    mod.acquire(blockedKey, { maxConcurrency: 1, timeoutMs: 1_000 }).then((r) => r());
    await sleep(5);
    mod.markBlocked(blockedKey, 30);

    let admitted = false;
    const waiter = mod
      .acquire(blockedKey, { maxConcurrency: 1, timeoutMs: 1_000 })
      .then((release) => {
        admitted = true;
        release();
      });

    await sleep(60);
    assert.equal(admitted, false, "the block holds the waiter until something drains");
    releaseOther();
    await waiter;
    assert.equal(admitted, true);
  });
});
