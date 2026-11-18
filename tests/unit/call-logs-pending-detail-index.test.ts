import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pending-detail-index-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { expirePendingCallLogDetails } = await import("../../src/lib/db/callLogDetails.ts");

const RECOVERY_SQL = `UPDATE call_logs
        SET detail_state = 'missing', detail_pending_until = NULL
      WHERE detail_state = 'pending'
        AND (detail_pending_until IS NULL OR detail_pending_until <= ?)`;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertRow(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  state: string,
  until: number | null
) {
  db.prepare(
    "INSERT INTO call_logs (id, timestamp, detail_state, detail_pending_until) VALUES (?, ?, ?, ?)"
  ).run(id, new Date().toISOString(), state, until);
}

test("pending-detail recovery does not scan the whole call_logs table", () => {
  const db = core.getDbInstance();
  const plan = db.prepare(`EXPLAIN QUERY PLAN ${RECOVERY_SQL}`).all(Date.now()) as Array<{
    detail: string;
  }>;
  const text = plan.map((row) => row.detail).join(" | ");
  assert.doesNotMatch(text, /SCAN call_logs(?! USING)/, `full table scan in plan: ${text}`);
  assert.match(text, /USING (COVERING )?INDEX/, `no index in plan: ${text}`);
});

test("recovery still expires old and legacy NULL-deadline pending rows only", () => {
  const db = core.getDbInstance();
  const now = Date.now();
  insertRow(db, "expired", "pending", now - 1000);
  insertRow(db, "legacy-null", "pending", null);
  insertRow(db, "live", "pending", now + 60_000);
  insertRow(db, "ready", "ready", null);

  expirePendingCallLogDetails(db, now);

  const state = (id: string) =>
    (db.prepare("SELECT detail_state AS s FROM call_logs WHERE id = ?").get(id) as { s: string }).s;
  assert.equal(state("expired"), "missing");
  assert.equal(state("legacy-null"), "missing");
  assert.equal(state("live"), "pending");
  assert.equal(state("ready"), "ready");
});
