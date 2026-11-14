import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-budget-window-zone-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getBudgetWindow } = await import("../../src/domain/costRules.ts");

const ENV = "OMNIROUTE_BUDGET_TIMEZONE";

test.afterEach(() => {
  delete process.env[ENV];
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Expected epoch values were computed with an independent calendar library (Python zoneinfo).
// "now" for the day, week and Tokyo cases is a Wednesday, 2026-03-11 05:00 in Tokyo.
const NOW_DAY = 1773172800000; // 2026-03-10T20:00Z
const NOW_WEEK = 1773205200000; // 2026-03-11T05:00Z
const NOW_MONTH_EDGE = 1774972800000; // 2026-03-31T16:00Z = 2026-04-01 01:00 in Tokyo
const NOW_NY_SPRING = 1772971200000; // 2026-03-08T12:00Z, New York spring-forward day

test("unset: windows stay in UTC (default behaviour unchanged)", () => {
  assert.deepEqual(getBudgetWindow("daily", "00:00", NOW_DAY), {
    periodStartAt: 1773100800000, // 2026-03-10T00:00Z
    nextResetAt: 1773187200000, // 2026-03-11T00:00Z
  });
});

test("daily window starts at local midnight in the configured zone", () => {
  process.env[ENV] = "Asia/Tokyo";
  assert.deepEqual(getBudgetWindow("daily", "00:00", NOW_DAY), {
    periodStartAt: 1773154800000, // 2026-03-11 00:00 JST
    nextResetAt: 1773241200000, // 2026-03-12 00:00 JST
  });
});

test("the reset time is local wall-clock time in the zone", () => {
  process.env[ENV] = "Asia/Tokyo";
  // 05:00 local is before today's 06:30 reset, so the window began yesterday at 06:30.
  assert.deepEqual(getBudgetWindow("daily", "06:30", NOW_DAY), {
    periodStartAt: 1773091800000, // 2026-03-10 06:30 JST
    nextResetAt: 1773178200000, // 2026-03-11 06:30 JST
  });
});

test("weekly window starts on local Monday 00:00", () => {
  process.env[ENV] = "Asia/Tokyo";
  assert.deepEqual(getBudgetWindow("weekly", "00:00", NOW_WEEK), {
    periodStartAt: 1772982000000, // Mon 2026-03-09 00:00 JST
    nextResetAt: 1773586800000, // Mon 2026-03-16 00:00 JST
  });
});

test("monthly window follows the local calendar month", () => {
  process.env[ENV] = "Asia/Tokyo";
  // 16:00Z on 31 March is already 1 April in Tokyo: a new month there, still March in UTC.
  assert.deepEqual(getBudgetWindow("monthly", "00:00", NOW_MONTH_EDGE), {
    periodStartAt: 1774969200000, // 2026-04-01 00:00 JST
    nextResetAt: 1777561200000, // 2026-05-01 00:00 JST
  });
});

test("a daylight-saving day is 23 hours long, not 24", () => {
  process.env[ENV] = "America/New_York";
  const window = getBudgetWindow("daily", "00:00", NOW_NY_SPRING);
  assert.deepEqual(window, {
    periodStartAt: 1772946000000, // 2026-03-08 00:00 EST
    nextResetAt: 1773028800000, // 2026-03-09 00:00 EDT
  });
  assert.equal((window.nextResetAt - window.periodStartAt) / 3_600_000, 23);
});

test("a name that is not an IANA zone (Local) falls back to UTC and does not throw", (t) => {
  t.mock.method(console, "warn", () => {});
  process.env[ENV] = "Local";
  assert.deepEqual(getBudgetWindow("daily", "00:00", NOW_DAY), {
    periodStartAt: 1773100800000,
    nextResetAt: 1773187200000,
  });
});
