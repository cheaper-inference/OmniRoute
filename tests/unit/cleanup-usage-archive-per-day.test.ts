/**
 * Usage archival must not materialize the whole expired backlog at once.
 *
 * rollupUsageHistoryBeforeDate reads every token-shape group before the cutoff
 * with one all() call, prices each group, and only then reduces to daily rows.
 * With a big backlog (a long outage, or a retention cut) that is one huge array
 * and one huge Promise.all. cleanupUsageHistory now archives and deletes one
 * UTC day per pass, so no group query returns more than one day of groups.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-archive-days-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { cleanupUsageHistory } = await import("../../src/lib/db/cleanup.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000;
const DAYS = 3;
const SHAPES_PER_DAY = 25;
const GROUP_QUERY = "GROUP BY LOWER(provider), LOWER(model), DATE(timestamp)";

test("usage archival reads one day of token-shape groups per pass and loses no totals", async () => {
  const db = getDbInstance();
  const retention = getUserDatabaseSettings().retention.usageHistory;
  const insert = db.prepare(
    `INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp)
     VALUES ('openai', 'm', ?, 1, ?)`
  );
  const days: string[] = [];
  for (let d = 0; d < DAYS; d++) {
    const at = new Date(Date.now() - (retention + 10 + d) * DAY_MS);
    at.setUTCHours(12, 0, 0, 0);
    days.push(at.toISOString().slice(0, 10));
    // SHAPES_PER_DAY distinct token shapes, two requests each.
    for (let shape = 1; shape <= SHAPES_PER_DAY; shape++) {
      insert.run(shape, at.toISOString());
      insert.run(shape, at.toISOString());
    }
  }

  const original = db.prepare.bind(db);
  const groupsPerPass: number[] = [];
  db.prepare = ((sql: string) => {
    const stmt = original(sql);
    if (!sql.includes(GROUP_QUERY)) return stmt;
    return {
      ...stmt,
      all: (...params: unknown[]) => {
        const rows = stmt.all(...params);
        groupsPerPass.push(rows.length);
        return rows;
      },
    };
  }) as typeof db.prepare;

  let result;
  try {
    result = await cleanupUsageHistory();
  } finally {
    db.prepare = original;
  }

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, DAYS * SHAPES_PER_DAY * 2);
  assert.ok(groupsPerPass.length >= DAYS, `one group query per day, got ${groupsPerPass}`);
  assert.ok(
    Math.max(...groupsPerPass) <= SHAPES_PER_DAY,
    `a group query returned ${Math.max(...groupsPerPass)} groups, wanted at most one day (${SHAPES_PER_DAY})`
  );

  const summary = db
    .prepare(
      "SELECT date, total_requests AS requests, total_input_tokens AS input FROM daily_usage_summary ORDER BY date"
    )
    .all() as Array<{ date: string; requests: number; input: number }>;
  const expectedInput = ((SHAPES_PER_DAY * (SHAPES_PER_DAY + 1)) / 2) * 2;
  assert.deepEqual(
    summary.map((row) => [row.date, row.requests, row.input]),
    days.sort().map((date) => [date, SHAPES_PER_DAY * 2, expectedInput])
  );
  assert.equal((db.prepare("SELECT COUNT(*) AS n FROM usage_history").get() as { n: number }).n, 0);
});
