// A weekly window can restart before its scheduled reset (a reset the account redeems
// upstream). The reset event must then date the new window from when the refill was
// observed, not from the previous window's scheduled end, which is still in the future:
// window-start consumers (provider window costs, API key usage limits) count usage from it.
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

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const iso = (ms: number) => new Date(ms).toISOString();

test.beforeEach(async () => {
  core.resetDbInstance();
  await cleanupTempDataDir(TEST_DATA_DIR);
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  core.resetDbInstance();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

function weeklySnapshot(connectionId: string, remaining: number, resetAt: string) {
  snapshots.saveQuotaSnapshot({
    provider: "codex",
    connection_id: connectionId,
    window_key: "weekly",
    remaining_percentage: remaining,
    is_exhausted: remaining <= 0 ? 1 : 0,
    next_reset_at: resetAt,
    window_duration_ms: 7 * DAY,
    raw_data: null,
  });
}

test("an early reset dates the new window from the observed refill, not the old reset", () => {
  const now = Date.now();
  const observedAt = iso(now - HOUR);
  const scheduledReset = iso(now + 6 * DAY); // the exhausted window had six days left
  const newReset = iso(now - HOUR + 7 * DAY);

  resetEvents.recordProviderQuotaResetEventIfChanged({
    provider: "codex",
    connectionId: "early",
    windowKey: "weekly",
    currentResetAt: newReset,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: scheduledReset, remainingPercentage: 0 },
    observedAt,
  });
  weeklySnapshot("early", 100, newReset);

  const start = resetEvents.getProviderQuotaWindowStart("early", newReset, now);
  assert.ok(start, "the window start is known");
  assert.equal(start.windowStartIso, observedAt);
  assert.ok(Date.parse(start.windowStartIso) <= now, "a window never starts in the future");
});

test("a scheduled rollover still dates the new window from the previous reset", () => {
  const now = Date.now();
  const previousReset = iso(now - 2 * HOUR); // the window ended on schedule
  const observedAt = iso(now - HOUR); // and was polled an hour later
  const newReset = iso(now - 2 * HOUR + 7 * DAY);

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

test("an unused rolling window whose reset slides forward never starts in the future", () => {
  const now = Date.now();
  // Nothing used yet: each poll reports a reset one window ahead of the clock.
  const yesterdaysReset = iso(now - DAY + 7 * DAY);
  const observedAt = iso(now - HOUR);
  const todaysReset = iso(now - HOUR + 7 * DAY);

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
