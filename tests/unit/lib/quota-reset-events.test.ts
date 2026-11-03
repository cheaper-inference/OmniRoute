import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-reset-events-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const {
  recordProviderQuotaResetEventIfChanged,
  getProviderQuotaWindowStart,
  getProviderQuotaWindowStartIso,
  hasObservedClaudeQuotaResetAfter,
} = await import("../../../src/lib/db/quotaResetEvents.ts");

// Force migrations (incl. 108_provider_quota_reset_events) to run.
core.getDbInstance();

const CONN = "conn-1";
const PROVIDER = "antigravity";
const PREV_RESET = "2026-01-08T00:00:00.000Z";
const CUR_RESET = "2026-01-15T00:00:00.000Z"; // +7d, different day
const OBSERVED = "2026-01-15T00:05:00.000Z";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("records a weekly window transition and getWindowStart returns the prior window start", () => {
  recordProviderQuotaResetEventIfChanged({
    provider: PROVIDER,
    connectionId: CONN,
    windowKey: "weekly",
    currentResetAt: CUR_RESET,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: PREV_RESET, remainingPercentage: 5 },
    observedAt: OBSERVED,
  });

  // For the new window (resets at CUR_RESET) the observed start is PREV_RESET.
  const start = getProviderQuotaWindowStartIso(CONN, CUR_RESET, Date.parse(OBSERVED) + 1000);
  assert.equal(start, PREV_RESET);
});

test("getWindowStart returns null for a reset day with no recorded event", () => {
  assert.equal(
    getProviderQuotaWindowStartIso(CONN, "2026-02-01T00:00:00.000Z", Date.parse(OBSERVED) + 1000),
    null
  );
});

test("observed same-resetAt quota drop overrides an older recorded weekly window", () => {
  const connectionId = "conn-early-reset-snapshot";
  const targetResetAt = "2026-07-02T23:00:00.000Z";
  const db = core.getDbInstance();

  db.prepare(
    `
    INSERT INTO provider_quota_reset_events
      (provider, connection_id, window_key, window_started_at, window_resets_at,
       observed_at, previous_remaining_percentage, new_remaining_percentage,
       previous_used_percentage, new_used_percentage, raw_data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    "claude",
    connectionId,
    "weekly (7d)",
    "2026-06-25T23:00:00.000Z",
    targetResetAt,
    "2026-06-25T23:04:00.000Z",
    0,
    100,
    100,
    0,
    null
  );

  const insertSnapshot = db.prepare(`
    INSERT INTO quota_snapshots (
      provider,
      connection_id,
      window_key,
      remaining_percentage,
      is_exhausted,
      next_reset_at,
      window_duration_ms,
      raw_data,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertSnapshot.run(
    "claude",
    connectionId,
    "weekly (7d)",
    100,
    0,
    targetResetAt,
    null,
    null,
    "2026-06-25T23:04:00.000Z"
  );
  insertSnapshot.run(
    "claude",
    connectionId,
    "weekly (7d)",
    4,
    0,
    targetResetAt,
    null,
    null,
    "2026-07-01T00:05:00.000Z"
  );
  insertSnapshot.run(
    "claude",
    connectionId,
    "weekly (7d)",
    100,
    0,
    targetResetAt,
    null,
    null,
    "2026-07-01T21:41:13.293Z"
  );

  const start = getProviderQuotaWindowStart(
    connectionId,
    targetResetAt,
    Date.parse("2026-07-02T00:00:00.000Z")
  );

  assert.deepEqual(start, {
    windowStartIso: "2026-07-01T21:41:13.293Z",
    source: "observed_snapshot_reset",
  });
  assert.equal(
    getProviderQuotaWindowStartIso(
      connectionId,
      targetResetAt,
      Date.parse("2026-07-02T00:00:00.000Z")
    ),
    "2026-07-01T21:41:13.293Z"
  );
});

test("records same-resetAt weekly resets when usage drops back to the reset floor", () => {
  const connectionId = "conn-early-reset-record";
  const targetResetAt = "2026-07-02T23:00:00.000Z";
  const observedAt = "2026-07-01T21:41:13.293Z";

  recordProviderQuotaResetEventIfChanged({
    provider: "claude",
    connectionId,
    windowKey: "weekly (7d)",
    currentResetAt: targetResetAt,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: targetResetAt, remainingPercentage: 4 },
    observedAt,
  });

  assert.equal(
    getProviderQuotaWindowStartIso(
      connectionId,
      targetResetAt,
      Date.parse("2026-07-02T00:00:00.000Z")
    ),
    observedAt
  );
});

test("does not record when previous and current reset fall on the same day without a reset drop", () => {
  recordProviderQuotaResetEventIfChanged({
    provider: PROVIDER,
    connectionId: "conn-sameday",
    windowKey: "weekly",
    currentResetAt: "2026-03-10T23:00:00.000Z",
    currentRemainingPercentage: 69,
    previousObservation: { resetAt: "2026-03-10T01:00:00.000Z", remainingPercentage: 70 },
    observedAt: "2026-03-10T23:30:00.000Z",
  });
  assert.equal(
    getProviderQuotaWindowStartIso(
      "conn-sameday",
      "2026-03-10T23:00:00.000Z",
      Date.parse("2026-03-11T00:00:00.000Z")
    ),
    null
  );
});

test("does not record for a non-weekly (e.g. daily) window", () => {
  recordProviderQuotaResetEventIfChanged({
    provider: PROVIDER,
    connectionId: "conn-daily",
    windowKey: "daily",
    currentResetAt: CUR_RESET,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: PREV_RESET, remainingPercentage: 5 },
    observedAt: OBSERVED,
  });
  assert.equal(
    getProviderQuotaWindowStartIso("conn-daily", CUR_RESET, Date.parse(OBSERVED) + 1000),
    null
  );
});

test("#17043: only a measured Claude weekly refill AFTER the 429 authorizes recovery", () => {
  const now = Date.now();
  const observedAt = new Date(now - 10_000).toISOString();
  const lastErrorAt = new Date(now - 20_000).toISOString();
  const weeklyReset = new Date(now + 86_400_000).toISOString();
  const id = "conn-17043-confirmed";

  recordProviderQuotaResetEventIfChanged({
    provider: "claude",
    connectionId: id,
    windowKey: "weekly (7d)",
    currentResetAt: weeklyReset,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: weeklyReset, remainingPercentage: 0 },
    observedAt,
  });
  assert.equal(hasObservedClaudeQuotaResetAfter(id, lastErrorAt, now), true);
  assert.equal(
    hasObservedClaudeQuotaResetAfter(id, new Date(now - 5_000).toISOString(), now),
    false,
    "a second 429 newer than the event must never inherit an older reset"
  );
  assert.equal(hasObservedClaudeQuotaResetAfter("conn-17043-unrelated", lastErrorAt, now), false);
  assert.equal(hasObservedClaudeQuotaResetAfter(id, null, now), false);
});

test("#17043: a reset timestamp change without measured quota recovery is insufficient", () => {
  const now = Date.now();
  const id = "conn-17043-unknown-refill";
  const pastReset = new Date(now + 86_400_000).toISOString();
  const nextReset = new Date(now + 2 * 86_400_000).toISOString();
  recordProviderQuotaResetEventIfChanged({
    provider: "claude",
    connectionId: id,
    windowKey: "weekly (7d)",
    currentResetAt: nextReset,
    currentRemainingPercentage: 99,
    previousObservation: { resetAt: pastReset, remainingPercentage: null },
    observedAt: new Date(now - 5_000).toISOString(),
  });
  assert.equal(
    hasObservedClaudeQuotaResetAfter(id, new Date(now - 10_000).toISOString(), now),
    false,
    "a reset date moving without known previous capacity is not positive evidence"
  );
});

test("#17043: a model-scoped weekly refill cannot unlock the account-wide 429", () => {
  const now = Date.now();
  const before429 = new Date(now - 30_000).toISOString();
  const observedAt = new Date(now - 10_000).toISOString();
  const resetAt = new Date(now + 86_400_000).toISOString();
  const id = "conn-17043-model-only-reset";

  // These rows pass the legacy broad weekly-window matcher, so they exercise
  // the SQL selector rather than assuming the ingestion path filters them out.
  for (const windowKey of ["weekly opus (7d)", "weekly haiku (7d)"]) {
    recordProviderQuotaResetEventIfChanged({
      provider: "claude",
      connectionId: id,
      windowKey,
      currentResetAt: resetAt,
      currentRemainingPercentage: 100,
      previousObservation: { resetAt, remainingPercentage: 0 },
      observedAt,
    });
  }
  assert.equal(
    hasObservedClaudeQuotaResetAfter(id, before429, now),
    false,
    "a scoped model refill cannot establish global weekly capacity"
  );

  recordProviderQuotaResetEventIfChanged({
    provider: "claude",
    connectionId: id,
    windowKey: "weekly (7d)",
    currentResetAt: resetAt,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt, remainingPercentage: 0 },
    observedAt,
  });
  assert.equal(
    hasObservedClaudeQuotaResetAfter(id, before429, now),
    true,
    "a measured global weekly refill is still sufficient"
  );
});
