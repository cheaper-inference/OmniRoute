/**
 * Retention must not delete spend that an active budget window still sums.
 *
 * Dollar budgets add up domain_cost_history rows from the start of the calendar
 * period (UTC day 1 for a monthly budget). The default retention is 30 days, so
 * on the last day of a 31-day month the first-day spend is older than the cutoff.
 * Before the fix, cleanup deleted it and the key got that allowance back.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-budget-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { cleanupDomainCostHistory } = await import("../../src/lib/db/cleanup.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { saveBudget } = await import("../../src/lib/db/domainState.ts");
const { updateDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");

test.after(() => {
  mock.timers.reset();
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000;
// 2026-03-31 12:00 UTC: a 31-day month, the monthly window opened 30.5 days ago.
const NOW = Date.UTC(2026, 2, 31, 12, 0, 0);
const MONTH_START = Date.UTC(2026, 2, 1, 0, 0, 0);

function reset() {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_cost_history").run();
  db.prepare("DELETE FROM domain_budgets").run();
  return db;
}

async function cleanupAt(now: number) {
  mock.timers.enable({ apis: ["Date"], now });
  try {
    return await cleanupDomainCostHistory();
  } finally {
    mock.timers.reset();
  }
}

function remainingCosts(db: ReturnType<typeof getDbInstance>, apiKeyId: string): number[] {
  return (
    db
      .prepare("SELECT cost FROM domain_cost_history WHERE api_key_id = ? ORDER BY cost")
      .all(apiKeyId) as Array<{ cost: number }>
  ).map((row) => row.cost);
}

test("cleanup keeps first-day spend of an active monthly budget window in a 31-day month", async () => {
  const db = reset();
  saveBudget("monthly-key", { monthlyLimitUsd: 100, resetInterval: "monthly", resetTime: "00:00" });
  const insert = db.prepare(
    "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
  );
  insert.run("monthly-key", 1, MONTH_START + 1_000); // 30.5 days old, inside the window
  insert.run("monthly-key", 2, MONTH_START - 5 * DAY_MS); // before the window

  const result = await cleanupAt(NOW);

  assert.equal(result.errors, 0);
  assert.deepEqual(remainingCosts(db, "monthly-key"), [1]);
});

test("cleanup keeps the spend of an active weekly window when retention is shorter than a week", async () => {
  const db = reset();
  updateDatabaseSettings({ retention: { domainCostHistory: 1 } } as never);
  // 2026-03-29 12:00 UTC is a Sunday: the weekly window opened Monday 2026-03-23.
  const now = Date.UTC(2026, 2, 29, 12, 0, 0);
  const weekStart = Date.UTC(2026, 2, 23, 0, 0, 0);
  saveBudget("weekly-key", { weeklyLimitUsd: 50, resetInterval: "weekly", resetTime: "00:00" });
  const insert = db.prepare(
    "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
  );
  insert.run("weekly-key", 1, weekStart + 1_000);
  insert.run("weekly-key", 2, weekStart - DAY_MS);

  try {
    await cleanupAt(now);
    assert.deepEqual(remainingCosts(db, "weekly-key"), [1]);
  } finally {
    updateDatabaseSettings({ retention: { domainCostHistory: 30 } } as never);
  }
});

test("cleanup still deletes expired rows when no budget window needs them", async () => {
  const db = reset();
  saveBudget("daily-key", { dailyLimitUsd: 5, resetInterval: "daily", resetTime: "00:00" });
  const insert = db.prepare(
    "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
  );
  insert.run("daily-key", 1, NOW - 40 * DAY_MS);
  insert.run("daily-key", 2, NOW - 2 * DAY_MS);
  insert.run("no-budget-key", 3, NOW - 40 * DAY_MS);

  const result = await cleanupAt(NOW);

  assert.equal(result.deleted, 2);
  assert.deepEqual(remainingCosts(db, "daily-key"), [2]);
  assert.deepEqual(remainingCosts(db, "no-budget-key"), []);
});
