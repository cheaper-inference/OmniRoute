import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-daily-legacy-carryover-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { readPublishedCutoffDate } = await import("../../src/lib/db/usageAnalytics.ts");

// #18488: retention used to roll old usage up into daily_usage_summary, and the readers now use
// usage_daily_summary. The migration that creates it must carry that history over, or an upgraded
// install loses everything retention already moved out of usage_history.
const MARKER = "-- History retention already rolled up lives only in daily_usage_summary";
const migration = fs.readFileSync(
  new URL("../../src/lib/db/migrations/224_usage_daily_summary.sql", import.meta.url),
  "utf8"
);

function carryOverSql(): string {
  const at = migration.indexOf(MARKER);
  assert.ok(at >= 0, "the usage_daily_summary migration must carry legacy history over");
  return migration.slice(at);
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dir, { recursive: true });
  const db = core.getDbInstance();
  db.exec(
    "DELETE FROM usage_daily_summary; DELETE FROM rollup_state; DELETE FROM daily_usage_summary;"
  );
  return db;
}

function insertLegacy(db: ReturnType<typeof core.getDbInstance>, date: string, requests: number) {
  db.prepare(
    `INSERT INTO daily_usage_summary
       (provider, model, date, total_requests, total_input_tokens, total_output_tokens, total_cost)
     VALUES ('openai', 'gpt-test', ?, ?, ?, ?, ?)`
  ).run(date, requests, requests * 10, requests * 2, requests * 0.5);
}

function insertRaw(db: ReturnType<typeof core.getDbInstance>, day: string) {
  db.prepare(
    `INSERT INTO usage_history
       (provider, model, connection_id, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES ('openai', 'gpt-test', 'conn-1', 10, 2, 1, 100, ?)`
  ).run(`${day}T12:00:00.001Z`);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("an upgrade carries the days before the first raw row and moves the pointer there", () => {
  const db = resetStorage();
  insertLegacy(db, "2025-12-01", 3);
  insertLegacy(db, "2025-12-02", 4);
  insertRaw(db, "2026-01-05");
  db.exec(carryOverSql());

  const rows = db
    .prepare(
      "SELECT date, service_tier, total_requests, total_input_tokens, total_cost FROM usage_daily_summary ORDER BY date"
    )
    .all();
  assert.deepEqual(rows, [
    {
      date: "2025-12-01",
      service_tier: "standard",
      total_requests: 3,
      total_input_tokens: 30,
      total_cost: 1.5,
    },
    {
      date: "2025-12-02",
      service_tier: "standard",
      total_requests: 4,
      total_input_tokens: 40,
      total_cost: 2,
    },
  ]);
  assert.equal(readPublishedCutoffDate(db), "2025-12-02");
});

test("a legacy day at or after the first raw day stays out so raw rows are not hidden", () => {
  const db = resetStorage();
  insertLegacy(db, "2025-12-01", 3);
  insertLegacy(db, "2026-01-05", 9);
  insertRaw(db, "2026-01-05");
  db.exec(carryOverSql());

  const days = (
    db.prepare("SELECT date FROM usage_daily_summary ORDER BY date").all() as Array<{
      date: string;
    }>
  ).map((row) => row.date);
  assert.deepEqual(days, ["2025-12-01"]);
  assert.equal(readPublishedCutoffDate(db), "2025-12-01");
});

test("running the carry-over again changes nothing", () => {
  const db = resetStorage();
  insertLegacy(db, "2025-12-01", 3);
  db.exec(carryOverSql());
  const before = db.prepare("SELECT * FROM usage_daily_summary").all();
  db.exec(carryOverSql());
  assert.deepEqual(db.prepare("SELECT * FROM usage_daily_summary").all(), before);
});

test("an install with no legacy history gets no pointer", () => {
  const db = resetStorage();
  insertRaw(db, "2026-01-05");
  db.exec(carryOverSql());
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS n FROM usage_daily_summary").get() as { n: number }).n,
    0
  );
  assert.equal(db.prepare("SELECT 1 FROM rollup_state WHERE tier = 'daily'").get(), undefined);
});
