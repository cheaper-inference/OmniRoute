import test from "node:test";
import assert from "node:assert/strict";
import type Bottleneck from "bottleneck";

const rlm = await import("../../open-sse/services/rateLimitManager.ts");
const {
  enableRateLimitProtection,
  refreshConnectionRateLimits,
  withRateLimit,
  applyRequestQueueSettings,
  __setLimiterFactoryForTests,
  __resetRateLimitManagerForTests,
  __getLimiterStateForTests,
} = rlm;

const CONN = "rolling-rpm-conn";
const FLAG = "OMNIROUTE_ROLLING_RPM_GATE";
const MINUTE = 60_000;

// The part of the Bottleneck API that withRateLimit calls on the limiter.
type FakeLimiter = {
  updateSettings: () => FakeLimiter;
  on: () => FakeLimiter;
  schedule: (a: unknown, b?: unknown) => unknown;
  disconnect: () => Promise<void>;
  chain: () => FakeLimiter;
  counts: () => { RECEIVED: number; QUEUED: number; RUNNING: number; EXECUTING: number };
  currentReservoir: () => Promise<null>;
  stop: () => Promise<void>;
};

// A limiter that dispatches at once, so the rolling gate is the only RPM limit in play. While
// `holdQueued()` is true a scheduled job stays queued, so only the queue budget can end it.
function passThroughLimiter(holdQueued: () => boolean = () => false): Bottleneck {
  const fake: FakeLimiter = {
    updateSettings: () => fake,
    on: () => fake,
    schedule: (a, b) =>
      holdQueued() ? new Promise(() => {}) : (typeof b === "function" ? b : (a as () => unknown))(),
    disconnect: () => Promise.resolve(),
    chain: () => fake,
    counts: () => ({ RECEIVED: 0, QUEUED: 0, RUNNING: 0, EXECUTING: 0 }),
    currentReservoir: () => Promise.resolve(null),
    stop: () => Promise.resolve(),
  };
  // The factory is typed for a real Bottleneck; the fake covers the calls withRateLimit makes.
  return fake as unknown as Bottleneck;
}

async function flush() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

async function arm(maxWaitMs: number, rpm = 2, limiter: () => Bottleneck = passThroughLimiter) {
  await applyRequestQueueSettings({
    minTimeBetweenRequestsMs: 0,
    concurrentRequests: 0,
    requestsPerMinute: 0,
    maxWaitMs,
    autoEnableApiKeyProvider: false,
  });
  __setLimiterFactoryForTests(() => limiter());
  enableRateLimitProtection(CONN);
  refreshConnectionRateLimits(CONN, { rpm });
}

const send = () => withRateLimit("openai", CONN, "gpt-4", async () => "ok");

test.beforeEach(async () => {
  await __resetRateLimitManagerForTests();
  process.env[FLAG] = "true";
});

test.afterEach(() => {
  delete process.env[FLAG];
});

test("flag on: a call over the connection rpm waits until the oldest send leaves the window", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  await arm(0);
  await Promise.all([send(), send()]);

  let thirdDone = false;
  const third = send().then(() => {
    thirdDone = true;
  });
  await flush();
  assert.equal(thirdDone, false, "third call must wait for a slot");

  t.mock.timers.tick(MINUTE - 1);
  await flush();
  assert.equal(thirdDone, false, "still inside the window");

  t.mock.timers.tick(1);
  await third;
  assert.equal(thirdDone, true);
});

test("flag on: no burst at a window edge (sends at 0 s, 55 s, then two at 60 s)", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  await arm(0);
  await send();
  t.mock.timers.tick(55_000);
  await send();
  t.mock.timers.tick(5_000); // now = 60 s: the first send is out of the window

  let thirdDone = false;
  let fourthDone = false;
  const third = send().then(() => {
    thirdDone = true;
  });
  const fourth = send().then(() => {
    fourthDone = true;
  });
  await flush();
  assert.equal(thirdDone, true, "one slot is free at 60 s");
  assert.equal(fourthDone, false, "a fixed 60 s refill would let this one through too");

  t.mock.timers.tick(55_000 - 1);
  await flush();
  assert.equal(fourthDone, false);
  t.mock.timers.tick(1);
  await Promise.all([third, fourth]);
  assert.equal(fourthDone, true);
});

test("flag on: refuses a call whose wait would pass the queue budget", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  await arm(30_000);
  await Promise.all([send(), send()]);

  const third = send();
  const outcome = assert.rejects(
    third,
    (error: Error & { code?: string }) => error.code === "RATE_LIMIT_QUEUE_TIMEOUT"
  );
  await flush();
  t.mock.timers.tick(30_000);
  await outcome;
});

test("flag on: an exhausted explicit budget fails at once instead of waiting for a slot", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  await arm(0);
  await Promise.all([send(), send()]);

  let error: (Error & { code?: string }) | null = null;
  const call = withRateLimit("openai", CONN, "gpt-4", async () => "ok", null, 0).catch(
    (e: Error & { code?: string }) => {
      error = e;
    }
  );
  await flush();
  assert.equal(error?.code, "RATE_LIMIT_QUEUE_TIMEOUT", "no wait for a rolling slot");
  t.mock.timers.tick(MINUTE);
  await call;
});

test("flag on: time spent at the gate comes off the resolved queue budget", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  let hold = false;
  await arm(30_000, 2, () => passThroughLimiter(() => hold));
  await Promise.all([send(), send()]);
  t.mock.timers.tick(35_000);

  hold = true;
  let error: (Error & { code?: string }) | null = null;
  const third = send().catch((e: Error & { code?: string }) => {
    error = e;
  });
  await flush();
  t.mock.timers.tick(25_000); // 60 s: the gate admits the call with 5 s of its 30 s budget left
  await flush();
  assert.equal(error, null, "admitted by the gate, now queued in the limiter");

  t.mock.timers.tick(5_000);
  await flush();
  assert.equal(error?.code, "RATE_LIMIT_QUEUE_TIMEOUT", "the limiter gets the 5 s left, not 30 s");
  t.mock.timers.tick(30_000);
  await third;
});

test("flag unset: the same calls pass at once (default behaviour unchanged)", async (t) => {
  delete process.env[FLAG];
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  await arm(0);
  const results = await Promise.all([send(), send(), send(), send()]);
  assert.deepEqual(results, ["ok", "ok", "ok", "ok"]);
});

test("flag on with the real limiter: calls under the rpm pass and a limiter is built", async () => {
  await applyRequestQueueSettings({
    minTimeBetweenRequestsMs: 0,
    concurrentRequests: 0,
    requestsPerMinute: 0,
    maxWaitMs: 5_000,
    autoEnableApiKeyProvider: false,
  });
  enableRateLimitProtection(CONN);
  refreshConnectionRateLimits(CONN, { rpm: 5 });
  assert.deepEqual(await Promise.all([send(), send()]), ["ok", "ok"]);
  assert.ok(await __getLimiterStateForTests("openai", CONN, "gpt-4"));
});
