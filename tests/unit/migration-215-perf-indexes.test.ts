import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "migration-215-indexes-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const db = core.getDbInstance();

type PlanRow = { detail: string };

function planRows(sql: string, ...params: unknown[]): string {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...params) as PlanRow[])
    .map((row) => row.detail)
    .join(" | ");
}

after(() => {
  core.closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 215 created idx_rcl_request_id on request_cost_ledger", () => {
  const indexes = db.prepare("PRAGMA index_list(request_cost_ledger)").all() as Array<{ name: string }>;
  const found = indexes.some((idx) => idx.name === "idx_rcl_request_id");
  assert.equal(found, true, "Expected idx_rcl_request_id on request_cost_ledger");
});

test("migration 215 created idx_cl_conn_model_state_time on call_logs", () => {
  const indexes = db.prepare("PRAGMA index_list(call_logs)").all() as Array<{ name: string }>;
  const found = indexes.some((idx) => idx.name === "idx_cl_conn_model_state_time");
  assert.equal(found, true, "Expected idx_cl_conn_model_state_time on call_logs");
});

test("request_cost_ledger lookup by request_id uses idx_rcl_request_id", () => {
  const plan = planRows("SELECT * FROM request_cost_ledger WHERE request_id = ?", "req-123");
  assert.match(plan, /idx_rcl_request_id/);
  assert.doesNotMatch(plan, /SCAN request_cost_ledger/);
});

test("session_tag join uses idx_rcl_request_id on request_cost_ledger", () => {
  const plan = planRows(
    `SELECT r.provider, r.model, r.amount_usd, r.request_id, r.timestamp
     FROM call_logs c
     JOIN request_cost_ledger r ON r.request_id = c.correlation_id
     WHERE c.session_tag = ?
     ORDER BY r.timestamp DESC`,
    "sess-abc"
  );
  assert.match(plan, /idx_rcl_request_id/);
});

test("completed request details lookup uses idx_cl_conn_model_state_time", () => {
  const plan = planRows(
    `SELECT artifact_relpath FROM call_logs
     WHERE connection_id = ? AND model = ? AND detail_state = ?
       AND artifact_relpath IS NOT NULL
     ORDER BY timestamp DESC
     LIMIT 1`,
    "conn-1",
    "gpt-4o",
    "COMPLETED"
  );
  assert.match(plan, /idx_cl_conn_model_state_time/);
  assert.doesNotMatch(plan, /SCAN call_logs/);
});
