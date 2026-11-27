// listCompressionCombos() runs on every chat request (chatCore). Its table/seed
// bootstrap must run once per DB instance: the INSERT OR IGNORE seed takes the
// SQLite write lock even when the row exists, so a request could wait up to
// busy_timeout while another process holds the lock.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-seed-latch-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const combosDb = await import("../../../src/lib/db/compressionCombos.ts");

const WRITE_SQL = /\b(INSERT|UPDATE|DELETE|REPLACE|CREATE|DROP|ALTER)\b/i;

function countWrites(fn: () => void): string[] {
  const db = core.getDbInstance() as unknown as {
    exec: (sql: string) => unknown;
    prepare: (sql: string) => unknown;
  };
  const seen: string[] = [];
  const origExec = db.exec;
  const origPrepare = db.prepare;
  db.exec = function (sql: string) {
    if (WRITE_SQL.test(sql)) seen.push(sql.trim().split("\n")[0]);
    return origExec.call(this, sql);
  };
  db.prepare = function (sql: string) {
    if (WRITE_SQL.test(sql)) seen.push(sql.trim().split("\n")[0]);
    return origPrepare.call(this, sql);
  };
  try {
    fn();
  } finally {
    db.exec = origExec;
    db.prepare = origPrepare;
  }
  return seen;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("second listCompressionCombos() call runs no write or DDL statement", () => {
  const first = combosDb.listCompressionCombos();
  assert.ok(first.some((c) => c.id === "default-caveman" && c.isDefault));
  const writes = countWrites(() => combosDb.listCompressionCombos());
  assert.deepEqual(writes, [], `expected no write statements, got: ${writes.join(" | ")}`);
});

test("a new DB instance (restore/reset) seeds again", () => {
  combosDb.listCompressionCombos();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Drop the seed so only the bootstrap can bring it back on the fresh instance.
  core.getDbInstance().prepare("DELETE FROM compression_combos").run();
  const combos = combosDb.listCompressionCombos();
  assert.ok(combos.some((c) => c.id === "default-caveman" && c.isDefault));
});
