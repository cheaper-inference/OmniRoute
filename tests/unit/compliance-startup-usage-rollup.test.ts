import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-startup-rollup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "5";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");

const DAY = 24 * 60 * 60 * 1000;

function seedOldUsage(db: ReturnType<typeof core.getDbInstance>) {
  const ts = new Date(Date.now() - 10 * DAY).toISOString();
  const insert = db.prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp) VALUES (?, ?, ?, ?, ?)"
  );
  insert.run("openai", "gpt-4o", 100, 50, ts);
  insert.run("openai", "gpt-4o", 100, 50, ts);
  return ts.slice(0, 10);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("startup cleanup archives expired usage_history into daily_usage_summary before deleting", async () => {
  compliance.initAuditLog();
  const db = core.getDbInstance();
  const day = seedOldUsage(db);

  const result = await compliance.cleanupExpiredLogs();

  assert.equal(result.deletedUsage, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS n FROM usage_history").get() as { n: number }).n, 0);
  const summary = db
    .prepare(
      "SELECT SUM(total_requests) AS requests, SUM(total_input_tokens) AS input, SUM(total_output_tokens) AS output FROM daily_usage_summary WHERE date = ?"
    )
    .get(day) as Record<string, number>;
  assert.deepEqual({ ...summary }, { requests: 2, input: 200, output: 100 });
});

test("startup cleanup keeps usage_history rows when the pre-delete rollup fails", async () => {
  compliance.initAuditLog();
  const db = core.getDbInstance();
  seedOldUsage(db);
  db.exec("DROP TABLE daily_usage_summary");

  const result = await compliance.cleanupExpiredLogs();

  assert.equal(result.deletedUsage, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS n FROM usage_history").get() as { n: number }).n, 2);

  const cleanup = compliance.getAuditLog().find((entry) => entry.action === "compliance.cleanup");
  assert.ok(cleanup, "the cleanup is audited");
  assert.equal(
    cleanup.status,
    "partial",
    "a skipped usage deletion must not be audited as success"
  );
  assert.equal((cleanup.details as Record<string, unknown>).usageRollupFailed, true);
});

test("startup cleanup is audited as success when the rollup works", async () => {
  compliance.initAuditLog();
  seedOldUsage(core.getDbInstance());

  await compliance.cleanupExpiredLogs();

  const cleanup = compliance.getAuditLog().find((entry) => entry.action === "compliance.cleanup");
  assert.equal(cleanup?.status, "success");
});
