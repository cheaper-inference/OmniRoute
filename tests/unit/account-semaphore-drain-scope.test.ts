/**
 * Releasing a seat must wake the next waiter of the gates it freed. It must not re-walk
 * every queued request in the process. A saturated gate with many waiters used to make each
 * release on any other gate cost O(queued waiters).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  acquire,
  acquireMany,
  getStats,
  markBlocked,
  resetAll,
  unblock,
} from "../../open-sse/services/accountSemaphore.ts";

const LONG_MS = 600_000;

test.afterEach(() => {
  resetAll();
});

function settle(promise: Promise<unknown>): Promise<unknown> {
  return promise.then(
    () => undefined,
    () => undefined
  );
}

test("a release on one gate does not re-check waiters of an unrelated blocked gate", async () => {
  const waitersOnBlocked = 2_000;
  const chain = 200;

  // Gate A is blocked, so each check of one of its waiters reads the clock (isBlocked).
  const releaseA = await acquire("A", { maxConcurrency: 1, timeoutMs: LONG_MS });
  markBlocked("A", Date.now() + LONG_MS);
  const parked: Promise<unknown>[] = [];
  for (let i = 0; i < waitersOnBlocked; i++) {
    parked.push(settle(acquire("A", { maxConcurrency: 1, timeoutMs: LONG_MS, maxQueueSize: 0 })));
  }

  // Gate B: a held seat and a chain of waiters that each take the seat once.
  let holder = await acquire("B", { maxConcurrency: 1, timeoutMs: LONG_MS });
  const chained: Array<Promise<() => void>> = [];
  for (let i = 0; i < chain; i++) {
    chained.push(acquire("B", { maxConcurrency: 1, timeoutMs: LONG_MS, maxQueueSize: 0 }));
  }

  const realNow = Date.now;
  let clockReads = 0;
  Date.now = () => {
    clockReads++;
    return realNow();
  };
  try {
    for (let i = 0; i < chain; i++) {
      holder();
      holder = await chained[i];
    }
  } finally {
    Date.now = realNow;
  }
  holder();

  assert.ok(
    clockReads < waitersOnBlocked,
    `releases on gate B re-checked gate A waiters: ${clockReads} clock reads for ${chain} releases`
  );
  assert.equal(getStats().A.queued, waitersOnBlocked, "gate A waiters stay queued");
  releaseA();
  resetAll();
  await Promise.all(parked);
});

test("an aborted head hands the seat to the next waiter in order", async () => {
  const release = await acquire("g", { maxConcurrency: 1, timeoutMs: LONG_MS });
  const controller = new AbortController();
  const aborted = settle(
    acquire("g", { maxConcurrency: 1, timeoutMs: LONG_MS, signal: controller.signal })
  );
  const order: string[] = [];
  const second = acquire("g", { maxConcurrency: 1, timeoutMs: LONG_MS }).then((r) => {
    order.push("second");
    return r;
  });
  const third = acquire("g", { maxConcurrency: 1, timeoutMs: LONG_MS }).then((r) => {
    order.push("third");
    return r;
  });

  controller.abort();
  await aborted;
  release();
  const releaseSecond = await second;
  assert.deepEqual(order, ["second"]);
  releaseSecond();
  (await third)();
  assert.deepEqual(order, ["second", "third"]);
});

test("a two-gate request is admitted only after it heads both queues", async () => {
  const releaseA = await acquire("A", { maxConcurrency: 1, timeoutMs: LONG_MS });
  const releaseB = await acquire("B", { maxConcurrency: 1, timeoutMs: LONG_MS });
  let admitted = false;
  const both = acquireMany(
    [
      { key: "A", maxConcurrency: 1 },
      { key: "B", maxConcurrency: 1 },
    ],
    { timeoutMs: LONG_MS }
  ).then((r) => {
    admitted = true;
    return r;
  });

  releaseA();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(admitted, false, "B is still held, so the pair must wait");
  assert.equal(getStats().A.running, 0, "waiting must not reserve A");

  releaseB();
  const releaseBoth = await both;
  assert.equal(getStats().A.running, 1);
  assert.equal(getStats().B.running, 1);
  releaseBoth();
});

test("a waiter on a blocked gate is admitted after unblock", async () => {
  const release = await acquire("g", { maxConcurrency: 1, timeoutMs: LONG_MS });
  release();
  markBlocked("g", Date.now() + LONG_MS);
  const waiter = acquire("g", { maxConcurrency: 1, timeoutMs: LONG_MS });
  let admitted = false;
  void waiter.then(() => {
    admitted = true;
  });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(admitted, false);
  unblock("g");
  (await waiter)();
});
