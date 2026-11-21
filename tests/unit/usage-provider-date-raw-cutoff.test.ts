/**
 * requests-by-provider-date must floor raw history at the same boundary the rollup uses
 * (retention.usageHistory), not at aggregation.rawDataRetentionDays. With the migration-seeded
 * values (7 and 365 days) rows between day-365 and day-7 fell out of both UNION legs.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-provider-date-cutoff-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/usage/requests-by-provider-date/route.ts");

const DAY_MS = 86_400_000;
const isoDaysAgo = (days: number) => new Date(Date.now() - days * DAY_MS).toISOString();

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("provider-date counts an unarchived raw row that is older than the 7-day aggregation setting", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (timestamp, provider, model, tokens_input, tokens_output, success)
     VALUES (?, 'openai', 'gpt-4.1', 10, 20, 1)`
  ).run(isoDaysAgo(100));
  db.prepare(
    `INSERT INTO daily_usage_summary (provider, model, date, total_requests, total_input_tokens, total_output_tokens)
     VALUES ('openai', 'gpt-4.1', ?, 50, 500, 500)`
  ).run(isoDaysAgo(400).slice(0, 10));

  const response = await route.GET(
    new Request("http://localhost/api/usage/requests-by-provider-date?range=all")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { rows: Array<{ requests: number }> };
  const total = body.rows.reduce((sum, row) => sum + row.requests, 0);

  assert.equal(total, 51, "50 archived requests plus the 1 raw request from 100 days ago");
});
