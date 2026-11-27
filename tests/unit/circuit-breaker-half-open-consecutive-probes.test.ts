import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cb-consecutive-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { CircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
const core = await import("../../src/lib/db/core.ts");

const RESET_TIMEOUT = 30_000;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** A breaker that tripped and now waits in HALF_OPEN for its probes. */
function halfOpenBreaker(
  t: { mock: { timers: { enable: (o: object) => void; tick: (ms: number) => void } } },
  halfOpenRequests: number,
  label: string
) {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000 });
  const breaker = new CircuitBreaker(`cb-consecutive-${label}-${process.pid}-${Date.now()}`, {
    failureThreshold: 1,
    resetTimeout: RESET_TIMEOUT,
    halfOpenRequests,
  });
  breaker._onFailure();
  t.mock.timers.tick(RESET_TIMEOUT);
  assert.equal(breaker.getStatus().state, "HALF_OPEN");
  return breaker;
}

const ok = () => Promise.resolve("ok");

test("halfOpenRequests=3 closes the breaker only after three consecutive probe successes", async (t) => {
  const breaker = halfOpenBreaker(t, 3, "three");

  await breaker.execute(ok);
  assert.equal(breaker.state, "HALF_OPEN", "one lucky probe must not restore the provider");
  await breaker.execute(ok);
  assert.equal(breaker.state, "HALF_OPEN");
  await breaker.execute(ok);
  assert.equal(breaker.state, "CLOSED");
});

test("a probe failure after a probe success sends the breaker back to OPEN", async (t) => {
  const breaker = halfOpenBreaker(t, 3, "fail");

  await breaker.execute(ok);
  await assert.rejects(breaker.execute(() => Promise.reject(new Error("still down"))));
  assert.equal(breaker.state, "OPEN");
});

test("the default (one probe) still closes on the first probe success", async (t) => {
  const breaker = halfOpenBreaker(t, 1, "default");

  await breaker.execute(ok);
  assert.equal(breaker.state, "CLOSED");
});
