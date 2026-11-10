import assert from "node:assert/strict";
import test from "node:test";
import { Worker } from "node:worker_threads";
import { createTokenBreakdown } from "../../bin/cli/runtime/tokenBreakdown.mjs";
const fixture = new URL("../fixtures/token-breakdown/worker.mjs", import.meta.url);
test("numeric breakdown reaps owned workers, bounds busy work and recovers after timeout", async () => {
  const workers = [];
  const counter = createTokenBreakdown({
    timeoutMs: 1000,
    cooldownMs: 0,
    workerFactory: () => {
      const worker = new Worker(fixture, { execArgv: [], env: {} });
      workers.push(worker);
      return worker;
    },
  });
  try {
    const timedOut = counter.submit("timeout");
    assert.equal((await counter.submit("busy")).status, "busy");
    assert.equal((await timedOut).status, "timeout");
    assert.equal((await counter.submit("good")).status, "ok");
    assert.ok(workers.every((w) => w.threadId === -1));
    assert.equal((await counter.submit("invalid")).status, "invalid_result");
    assert.equal((await counter.submit(Buffer.alloc(8 * 1024 * 1024 + 1))).status, "oversized");
  } finally {
    await counter.stop();
  }
  assert.equal((await counter.submit("good")).status, "stopped");
});
test("transient worker startup failure observes cooldown and allows a fresh worker", async () => {
  let clock = 0;
  let attempts = 0;
  const counter = createTokenBreakdown({
    now: () => clock,
    cooldownMs: 100,
    workerFactory: () => {
      if (attempts++ === 0)
        throw Object.assign(new Error("temporary startup failure"), { code: "EAGAIN" });
      return new Worker(fixture, { execArgv: [], env: {} });
    },
  });
  try {
    assert.equal((await counter.submit("good")).status, "unavailable");
    assert.equal((await counter.submit("good")).status, "cooldown");
    clock = 101;
    assert.equal((await counter.submit("good")).status, "ok");
    assert.equal(attempts, 2);
  } finally {
    await counter.stop();
  }
});
