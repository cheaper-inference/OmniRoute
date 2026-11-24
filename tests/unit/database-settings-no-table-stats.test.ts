/**
 * getDatabaseSettings() only shows the database size and page count. It must read them from
 * page_size/page_count, not from the per-table COUNT(*) and dbstat scans that getDatabaseStats()
 * runs for the explicit refresh-stats endpoint.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-settings-no-scan-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const { getDatabaseStats } = await import("../../src/lib/db/stats.ts");

type Db = {
  prepare: (sql: string) => unknown;
  pragma: (sql: string, options?: { simple?: boolean }) => unknown;
};

/** Runs fn and returns every SQL string prepared while it ran. */
function recordPrepared<T>(db: Db, fn: () => T): { result: T; sql: string[] } {
  const prepare = db.prepare.bind(db);
  const sql: string[] = [];
  db.prepare = (text: string) => {
    sql.push(text);
    return prepare(text);
  };
  try {
    return { result: fn(), sql };
  } finally {
    db.prepare = prepare;
  }
}

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("database settings read the size from pragmas and scan no table", () => {
  const db = core.getDbInstance() as unknown as Db;
  const pageSize = db.pragma("page_size", { simple: true }) as number;

  const { result, sql } = recordPrepared(db, () => databaseSettings.getDatabaseSettings());

  const scans = sql.filter((text) => /COUNT\(\*\)\s+as\s+count\s+FROM\s+"|\bdbstat\b/i.test(text));
  assert.deepEqual(scans, [], "settings must not count rows or read dbstat per table");
  assert.equal(result.stats.pageCount, db.pragma("page_count", { simple: true }));
  assert.equal(result.stats.databaseSizeBytes, pageSize * result.stats.pageCount);
});

test("the explicit refresh-stats read still returns per-table statistics", () => {
  const stats = getDatabaseStats();
  assert.ok(stats.tables.length > 50, "full statistics keep every table");
  assert.ok(stats.tables.every((table) => typeof table.rowCount === "number"));
  assert.ok(stats.indexes.length > 0);
});
