// A weekly window can restart before its scheduled reset (a reset the account redeems
// upstream), and an unused rolling window slides its reset time forward with the clock. In
// both cases the previous reset time is still in the future when the reset is observed, so the
// new window must not be dated from it: window-start consumers (provider window costs, API key
// usage limits) count usage from that start.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-early-reset-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "early-reset-window-start-test-secret";

const core = await import("../../src/lib/db/core.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const resetEvents = await import("../../src/lib/db/quotaResetEvents.ts");
const providerLimits = await import("../../src/lib/db/providerLimits.ts");
const { getProviderWindowCostBreakdown } =
  await import("../../src/lib/usage/providerWindowCosts.ts");

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const iso = (ms: number) => new Date(ms).toISOString();

/**
 * A fixed clock at noon UTC tomorrow: reset days are compared per UTC day, so offsets of a few
 * hours must not cross midnight, and the clock stays ahead of the real time that stamps rows.
 */
function testClock(): number {
  const today = new Date();
  return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1, 12);
}

test.beforeEach(async () => {
  core.resetDbInstance();
  await cleanupTempDataDir(TEST_DATA_DIR);
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  core.resetDbInstance();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

/** Persist a weekly snapshot for `connectionId` with the given remaining share and reset. */
function weeklySnapshot(connectionId: string, remaining: number, resetAt: string) {
  snapshots.saveQuotaSnapshot({
    provider: "codex",
    connection_id: connectionId,
    window_key: "weekly",
    remaining_percentage: remaining,
    is_exhausted: remaining <= 0 ? 1 : 0,
    next_reset_at: resetAt,
    window_duration_ms: WEEK,
    raw_data: null,
  });
}

/** Record the weekly reset event a poll at `observedAt` records after an early reset. */
function recordEarlyReset(connectionId: string, observedAt: string, newReset: string, now: number) {
  resetEvents.recordProviderQuotaResetEventIfChanged({
    provider: "codex",
    connectionId,
    windowKey: "weekly",
    currentResetAt: newReset,
    currentRemainingPercentage: 100,
    // The exhausted window still had six days left.
    previousObservation: { resetAt: iso(now + 6 * DAY), remainingPercentage: 0 },
    observedAt,
  });
}

test("an early reset dates the new window from the observed refill, not the old reset", () => {
  const now = testClock();
  const observedAt = iso(now - HOUR);
  const newReset = iso(now - HOUR + WEEK);

  recordEarlyReset("early", observedAt, newReset, now);
  weeklySnapshot("early", 100, newReset);

  const start = resetEvents.getProviderQuotaWindowStart("early", newReset, now);
  assert.ok(start, "the window start is known");
  assert.equal(start.windowStartIso, observedAt);
  assert.ok(Date.parse(start.windowStartIso) <= now, "a window never starts in the future");
});

test("a reset observed late still dates the window from the reset itself", () => {
  const now = testClock();
  const resetAt = now - 2 * HOUR; // the account redeemed the reset here
  const newReset = iso(resetAt + WEEK);
  recordEarlyReset("late", iso(resetAt + 10 * 60_000), newReset, now); // seen by the next poll

  const start = resetEvents.getProviderQuotaWindowStart("late", newReset, now);
  assert.equal(start?.windowStartIso, iso(resetAt), "usage before the poll still counts");
});

test("a start recorded in the future by an older version is bounded at read time", () => {
  const now = testClock();
  const newReset = iso(now - HOUR + WEEK);
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_quota_reset_events
        (provider, connection_id, window_key, window_started_at, window_resets_at, observed_at,
         previous_remaining_percentage, new_remaining_percentage, previous_used_percentage,
         new_used_percentage, raw_data)
       VALUES ('codex', 'legacy', 'weekly', ?, ?, ?, 0, 100, 100, 0, NULL)`
    )
    .run(iso(now + 6 * DAY), newReset, iso(now - HOUR));

  const start = resetEvents.getProviderQuotaWindowStart("legacy", newReset, now);
  assert.equal(start?.windowStartIso, iso(now - HOUR));
  assert.equal(start?.source, "recorded_reset_event");
});

test("provider window costs start at the reset, not at the poll that observed it", async () => {
  const now = testClock();
  const resetAt = now - 2 * HOUR;
  const newReset = iso(resetAt + WEEK);
  recordEarlyReset("costs", iso(resetAt + 10 * 60_000), newReset, now);
  providerLimits.setProviderLimitsCache("costs", {
    quotas: {
      "weekly (7d)": { used: 1, total: 100, remainingPercentage: 99, resetAt: newReset },
    },
    plan: "Prolite",
    message: null,
    fetchedAt: iso(now),
  });

  const result = await getProviderWindowCostBreakdown({
    provider: "codex",
    connectionId: "costs",
    now,
  });
  assert.equal(result.windowStartAt, iso(resetAt));
  assert.equal(result.windowStartSource, "recorded_reset_event");
});

test("an unused rolling window whose reset slides forward never starts in the future", () => {
  const now = testClock();
  // Nothing used yet: each poll reports a reset one window ahead of the clock.
  const yesterdaysReset = iso(now - DAY + WEEK);
  const observedAt = iso(now - HOUR);
  const todaysReset = iso(now - HOUR + WEEK);

  resetEvents.recordProviderQuotaResetEventIfChanged({
    provider: "antigravity",
    connectionId: "idle",
    windowKey: "gemini_weekly",
    currentResetAt: todaysReset,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: yesterdaysReset, remainingPercentage: 100 },
    observedAt,
  });

  const start = resetEvents.getProviderQuotaWindowStart("idle", todaysReset, now);
  assert.equal(start?.windowStartIso, observedAt, "usage from now on counts toward this window");
});

test("a scheduled rollover still dates the new window from the previous reset", () => {
  const now = testClock();
  const previousReset = iso(now - 2 * HOUR); // the window ended on schedule
  const observedAt = iso(now - HOUR); // and was polled an hour later
  const newReset = iso(now - 2 * HOUR + WEEK);

  resetEvents.recordProviderQuotaResetEventIfChanged({
    provider: "codex",
    connectionId: "rollover",
    windowKey: "weekly",
    currentResetAt: newReset,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: previousReset, remainingPercentage: 40 },
    observedAt,
  });

  const start = resetEvents.getProviderQuotaWindowStart("rollover", newReset, now);
  assert.equal(start?.windowStartIso, previousReset, "usage after the boundary counts");
  assert.equal(start?.source, "recorded_reset_event");
});
