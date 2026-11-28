import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cid-exact-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seed(id: string, correlationId: string | null, minutesAgo: number) {
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, correlation_id)
       VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'gpt-4', 'openai', 'acc', 10, 1, 1, ?)`
    )
    .run(id, new Date(Date.now() - minutesAgo * 60_000).toISOString(), correlationId);
}

// Many unrelated rows, so a timestamp-order scan has a visible cost in the plan.
for (let i = 0; i < 300; i++) seed(`noise-${i}`, `noise-corr-${i}`, i + 5);
seed("exact-row", "req-42", 1);
seed("longer-row", "req-42-retry", 2);
seed("prefixed-row", "xreq-42", 3);

test("correlationIdExact returns only the row with that exact id", async () => {
  const rows = await callLogs.getCallLogs({ correlationIdExact: "req-42" });
  assert.deepEqual(
    rows.map((row: { id: string }) => row.id),
    ["exact-row"]
  );
});

test("correlationId keeps the substring match for interactive filtering", async () => {
  const rows = await callLogs.getCallLogs({ correlationId: "req-42" });
  assert.deepEqual(rows.map((row: { id: string }) => row.id).sort(), [
    "exact-row",
    "longer-row",
    "prefixed-row",
  ]);
});

test("correlationIdExact query seeks idx_cl_correlation_id instead of scanning timestamp order", async () => {
  const db = core.getDbInstance();
  const realPrepare = db.prepare.bind(db);
  let captured: { sql: string } | null = null;
  (db as { prepare: unknown }).prepare = (sql: string) => {
    if (/FROM call_logs cl/.test(sql)) captured = { sql };
    return realPrepare(sql);
  };
  try {
    await callLogs.getCallLogs({ correlationIdExact: "req-42" });
  } finally {
    (db as { prepare: unknown }).prepare = realPrepare;
  }
  assert.ok(captured, "getCallLogs must prepare its SELECT");
  const plan = realPrepare(`EXPLAIN QUERY PLAN ${(captured as { sql: string }).sql}`).all({
    correlationIdExact: "req-42",
    __limit: 200,
    __offset: 0,
  }) as Array<{ detail: string }>;
  const callLogsStep = plan.map((step) => step.detail).find((detail) => /\bcl\b/.test(detail));
  assert.match(callLogsStep ?? "", /SEARCH cl USING INDEX idx_cl_correlation_id/);
});
