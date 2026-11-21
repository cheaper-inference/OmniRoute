import test from "node:test";
import assert from "node:assert/strict";
import {
  acquireTurnExecution,
  clearTurnExecutionsForTesting,
  createTurnInProgressResult,
  DEFAULT_TURN_GUARD_TTL_MS,
  getTurnExecutionSnapshot,
  getTurnGuardTtlMs,
} from "../../open-sse/handlers/chatCore/turnExecutionGuard.ts";
import {
  runWithoutTurnExecutionOwnership,
  runWithTurnExecutionOwnership,
} from "../../open-sse/handlers/chatCore/turnExecutionContext.ts";

test.afterEach(() => {
  clearTurnExecutionsForTesting();
  delete process.env.OMNIROUTE_TURN_GUARD_TTL_MS;
});

test("turn execution guard rejects a concurrent duplicate and reports its retry count", () => {
  const first = acquireTurnExecution("turn-guard-key");
  const duplicate = acquireTurnExecution("turn-guard-key");

  assert.equal(first.acquired, true);
  assert.equal(duplicate.acquired, false);
  assert.equal(duplicate.retryCount, 1);
  const snapshot = getTurnExecutionSnapshot("turn-guard-key");
  assert.equal(snapshot?.retryCount, 1);
  assert.ok(
    snapshot && snapshot.ageMs >= 0 && snapshot.ageMs < 1000,
    `unexpected ageMs: ${snapshot?.ageMs}`
  );

  first.release();
  const next = acquireTurnExecution("turn-guard-key");
  assert.equal(next.acquired, true);
  next.release();
});

test("turn execution guard release is idempotent", () => {
  const first = acquireTurnExecution("turn-guard-release");
  assert.equal(first.acquired, true);

  first.release();
  first.release();

  const next = acquireTurnExecution("turn-guard-release");
  assert.equal(next.acquired, true);
  next.release();
});

test("turn execution guard bypasses missing idempotency keys", () => {
  const first = acquireTurnExecution(null);
  const second = acquireTurnExecution(null);

  assert.equal(first.acquired, true);
  assert.equal(second.acquired, true);
  first.release();
  second.release();
});

test("duplicate turn result uses a sanitized 409 body and retry headers", async () => {
  const duplicate = createTurnInProgressResult(3);

  assert.deepEqual(duplicate.body, {
    error: {
      message: "An identical request is already in progress",
      type: "turn_in_progress",
      code: "turn_in_progress",
      reason: undefined,
    },
  });
  assert.equal(duplicate.result.status, 409);
  assert.equal(duplicate.result.errorType, "turn_in_progress");
  assert.equal(duplicate.result.errorCode, "turn_in_progress");
  assert.equal(duplicate.result.response.headers.get("Retry-After"), "1");
  assert.equal(duplicate.result.response.headers.get("X-OmniRoute-Turn-Retry"), "3");
  assert.deepEqual(
    await duplicate.result.response.json(),
    JSON.parse(JSON.stringify(duplicate.body))
  );
});

test("getTurnGuardTtlMs parses env overrides, falls back on invalid values, and disables on <= 0", () => {
  assert.equal(getTurnGuardTtlMs({}), DEFAULT_TURN_GUARD_TTL_MS);
  assert.equal(getTurnGuardTtlMs({ OMNIROUTE_TURN_GUARD_TTL_MS: "" }), DEFAULT_TURN_GUARD_TTL_MS);
  assert.equal(getTurnGuardTtlMs({ OMNIROUTE_TURN_GUARD_TTL_MS: "abc" }), DEFAULT_TURN_GUARD_TTL_MS);
  assert.equal(getTurnGuardTtlMs({ OMNIROUTE_TURN_GUARD_TTL_MS: "45000" }), 45_000);
  assert.equal(getTurnGuardTtlMs({ OMNIROUTE_TURN_GUARD_TTL_MS: "0" }), 0);
  assert.equal(getTurnGuardTtlMs({ OMNIROUTE_TURN_GUARD_TTL_MS: "-500" }), 0);
});

test("turn execution guard evicts stale slot after TTL and protects new owner from late release", () => {
  process.env.OMNIROUTE_TURN_GUARD_TTL_MS = "1000";
  const realNow = Date.now;
  let now = 10_000;
  Date.now = () => now;
  try {
    const first = acquireTurnExecution("ttl-key");
    assert.equal(first.acquired, true);

    now = 10_999;
    const blocked = acquireTurnExecution("ttl-key");
    assert.equal(blocked.acquired, false);

    now = 11_000;
    const second = acquireTurnExecution("ttl-key");
    assert.equal(second.acquired, true);

    const snapshot = getTurnExecutionSnapshot("ttl-key");
    assert.equal(snapshot?.retryCount, 0);
    assert.equal(snapshot?.ageMs, 0);

    // Late release from evicted owner must not remove the new owner's slot.
    first.release();
    const stillHeld = acquireTurnExecution("ttl-key");
    assert.equal(stillHeld.acquired, false);

    second.release();
    const afterRelease = acquireTurnExecution("ttl-key");
    assert.equal(afterRelease.acquired, true);
    afterRelease.release();
  } finally {
    Date.now = realNow;
  }
});

test("turn execution guard cleans ownership keys on TTL eviction and preserves re-entry before TTL", () => {
  process.env.OMNIROUTE_TURN_GUARD_TTL_MS = "1000";
  const realNow = Date.now;
  let now = 20_000;
  Date.now = () => now;
  try {
    runWithTurnExecutionOwnership(() => {
      const first = acquireTurnExecution("owned-ttl");
      assert.equal(first.acquired, true);

      // Before TTL: re-entry under same ownership reuses slot with no-op release.
      now = 20_500;
      const reentry = acquireTurnExecution("owned-ttl");
      assert.equal(reentry.acquired, true);
      reentry.release();
      const foreignBeforeTtl = runWithoutTurnExecutionOwnership(() =>
        acquireTurnExecution("owned-ttl")
      );
      assert.equal(foreignBeforeTtl.acquired, false);

      // After TTL: same ownership context evicts stale slot and acquires a fresh one.
      now = 21_000;
      const refreshed = acquireTurnExecution("owned-ttl");
      assert.equal(refreshed.acquired, true);

      // Late release of the evicted first handle must not clear the refreshed slot or ownership.
      first.release();
      const foreignAfterRefresh = runWithoutTurnExecutionOwnership(() =>
        acquireTurnExecution("owned-ttl")
      );
      assert.equal(foreignAfterRefresh.acquired, false);

      refreshed.release();
      const afterRelease = runWithoutTurnExecutionOwnership(() =>
        acquireTurnExecution("owned-ttl")
      );
      assert.equal(afterRelease.acquired, true);
      afterRelease.release();
    });
  } finally {
    Date.now = realNow;
  }
});

test("turn execution guard disables TTL eviction when OMNIROUTE_TURN_GUARD_TTL_MS <= 0", () => {
  process.env.OMNIROUTE_TURN_GUARD_TTL_MS = "0";
  const realNow = Date.now;
  let now = 30_000;
  Date.now = () => now;
  try {
    const first = acquireTurnExecution("no-ttl");
    assert.equal(first.acquired, true);

    now = 30_000 + 10_000_000;
    const blocked = acquireTurnExecution("no-ttl");
    assert.equal(blocked.acquired, false);

    first.release();
  } finally {
    Date.now = realNow;
  }
});

test("turn execution guard blocks re-entry of TTL-evicted owner when another owner holds the slot", () => {
  process.env.OMNIROUTE_TURN_GUARD_TTL_MS = "1000";
  const realNow = Date.now;
  let now = 40_000;
  Date.now = () => now;
  try {
    runWithTurnExecutionOwnership(() => {
      const firstA = acquireTurnExecution("evicted-owner-key");
      assert.equal(firstA.acquired, true);

      // TTL expires and request B (in a separate ownership scope) takes the slot.
      now = 41_000;
      let handleB: ReturnType<typeof acquireTurnExecution> | null = null;
      runWithoutTurnExecutionOwnership(() => {
        runWithTurnExecutionOwnership(() => {
          handleB = acquireTurnExecution("evicted-owner-key");
          assert.equal(handleB.acquired, true);
        });
      });

      // Request A re-enters after eviction: must NOT enter B's slot.
      const reentryA = acquireTurnExecution("evicted-owner-key");
      assert.equal(reentryA.acquired, false);

      // Once B releases, A's next attempt acquires a fresh slot (not a slotless no-op).
      handleB!.release();
      const reacquiredA = acquireTurnExecution("evicted-owner-key");
      assert.equal(reacquiredA.acquired, true);
      const foreign = runWithoutTurnExecutionOwnership(() =>
        acquireTurnExecution("evicted-owner-key")
      );
      assert.equal(foreign.acquired, false);

      reacquiredA.release();
      firstA.release();
    });
  } finally {
    Date.now = realNow;
  }
});
