import test from "node:test";
import assert from "node:assert/strict";

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

// A limiter that dispatches at once, so the rolling gate is the only RPM limit in play.
function passThroughLimiter() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fake: any = {
    updateSettings: () => fake,
    on: () => fake,
    schedule: (a: unknown, b?: unknown) => (typeof b === "function" ? b : (a as () => unknown))(),
    disconnect: () => Promise.resolve(),
    chain: () => fake,
    counts: () => ({ RECEIVED: 0, QUEUED: 0, RUNNING: 0, EXECUTING: 0 }),
    currentReservoir: () => Promise.resolve(null),
    stop: () => Promise.resolve(),
  };
  return fake;
}

async function flush() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

async function arm(maxWaitMs: number, rpm = 2) {
  await applyRequestQueueSettings({
    minTimeBetweenRequestsMs: 0,
    concurrentRequests: 0,
    requestsPerMinute: 0,
    maxWaitMs,
    autoEnableApiKeyProvider: false,
  });
  __setLimiterFactoryForTests(passThroughLimiter);
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
