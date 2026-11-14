/**
 * The circuit breaker row must be written only when its content changes.
 *
 * getCircuitBreaker(name, options) re-applied the options and wrote the row on every call, and
 * _onSuccess() wrote it again on every success. The request path asks for the breaker with
 * options twice and records a success once, so a healthy request wrote the same CLOSED row
 * three times (synchronous INSERT OR REPLACE each). Real changes (failures, state transitions,
 * option changes, recovery) must still reach the database so a restart restores them.
 *
 * SQLite `total_changes()` counts every row written on the shared connection, so the test counts
 * writes without a mock.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cb-persist-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { CircuitBreaker, getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { loadCircuitBreakerState, saveCircuitBreakerState } =
  await import("../../src/lib/db/domainState.ts");

test.after(() => {
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const uniqueName = (suffix: string) =>
  `cb-persist-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

function rowWrites(run: () => void): number {
  const db = core.getDbInstance();
  const total = () => (db.prepare("SELECT total_changes() AS n").get() as { n: number }).n;
  const before = total();
  run();
  return total() - before;
}

const OPTIONS = { failureThreshold: 5, resetTimeout: 30_000, halfOpenRequests: 1 };

test("a healthy request (two lookups with options, one success) writes nothing after the first", () => {
  const name = uniqueName("healthy");
  getCircuitBreaker(name, OPTIONS); // first sight of the breaker: the row is created here
  const writes = rowWrites(() => {
    for (let request = 0; request < 3; request++) {
      getCircuitBreaker(name, OPTIONS);
      getCircuitBreaker(name, OPTIONS);
      getCircuitBreaker(name)._onSuccess();
    }
  });
  assert.equal(writes, 0, "unchanged CLOSED breaker must not rewrite its row");
  assert.equal(loadCircuitBreakerState(name)?.state, "CLOSED");
});

test("a failure is written, and a restart restores the count", () => {
  const name = uniqueName("failure");
  const breaker = getCircuitBreaker(name, OPTIONS);
  breaker._onFailure("rate_limit");
  breaker._onFailure("rate_limit");
  const saved = loadCircuitBreakerState(name);
  assert.equal(saved?.failureCount, 2);
  assert.equal(saved?.options?.lastFailureKind, "rate_limit");
  const restarted = new CircuitBreaker(name, OPTIONS);
  assert.equal(restarted.failureCount, 2);
  assert.equal(restarted.lastFailureKind, "rate_limit");
});

test("a success that lowers the failure count is written", () => {
  const name = uniqueName("recovery");
  const breaker = getCircuitBreaker(name, OPTIONS);
  breaker._onFailure();
  breaker._onFailure();
  const writes = rowWrites(() => breaker._onSuccess());
  assert.equal(writes, 1);
  assert.equal(loadCircuitBreakerState(name)?.failureCount, 1);
});

test("OPEN, then recovery to CLOSED, reach the database", () => {
  const name = uniqueName("transition");
  const breaker = getCircuitBreaker(name, { ...OPTIONS, failureThreshold: 2 });
  breaker._onFailure();
  breaker._onFailure();
  assert.equal(loadCircuitBreakerState(name)?.state, "OPEN");
  breaker._onSuccess();
  const saved = loadCircuitBreakerState(name);
  assert.equal(saved?.state, "CLOSED");
  assert.equal(saved?.failureCount, 0);
});

test("a changed option is written once, then repeated lookups write nothing", () => {
  const name = uniqueName("options");
  getCircuitBreaker(name, OPTIONS);
  const changed = { ...OPTIONS, failureThreshold: 9, resetTimeout: 45_000 };
  assert.equal(
    rowWrites(() => getCircuitBreaker(name, changed)),
    1
  );
  const saved = loadCircuitBreakerState(name);
  assert.equal(saved?.options?.failureThreshold, 9);
  assert.equal(saved?.options?.resetTimeout, 45_000);
  assert.equal(
    rowWrites(() => {
      getCircuitBreaker(name, changed);
      getCircuitBreaker(name, changed);
    }),
    0
  );
});

test("a manual reset is written even when the breaker was already clean", () => {
  const name = uniqueName("reset");
  const breaker = getCircuitBreaker(name, OPTIONS);
  breaker._onFailure();
  breaker.reset();
  const saved = loadCircuitBreakerState(name);
  assert.equal(saved?.state, "CLOSED");
  assert.equal(saved?.failureCount, 0);
});

// A backup restore or database import replaces the file under the live breakers. The restored
// file may hold an OPEN row for a breaker that is CLOSED in memory: the next write must replace
// it with the live state, or a restart inside the restored cooldown would block the provider.
test("a database replacement makes the next lookup write the live state over a restored row", () => {
  const name = uniqueName("restore");
  const breaker = getCircuitBreaker(name, OPTIONS); // row written: CLOSED, the cache now matches
  assert.equal(loadCircuitBreakerState(name)?.state, "CLOSED");

  core.resetDbInstance(); // what restoreDbBackup and the import route do before swapping the file
  saveCircuitBreakerState(name, {
    state: "OPEN",
    failureCount: 5,
    lastFailureTime: Date.now(),
    options: { lastFailureKind: "transient", openCycleCount: 1, kindFailureCounts: {} },
  }); // the restored file holds an OPEN row for this breaker

  getCircuitBreaker(name, OPTIONS);
  breaker._onSuccess();

  assert.equal(
    loadCircuitBreakerState(name)?.state,
    "CLOSED",
    "the live CLOSED breaker must overwrite the restored OPEN row"
  );
  assert.equal(new CircuitBreaker(name, OPTIONS).state, "CLOSED", "a restart sees CLOSED");
});
