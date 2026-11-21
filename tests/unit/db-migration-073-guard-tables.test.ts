/**
 * The 073 skip guard must look at the objects 073 creates (the token-limit tables), not at a
 * column of an unrelated migration. With the old guard, a ledger gap at 073 on a database that
 * already had memories.needs_reindex skipped 073, and 196 then failed on the missing tables.
 *
 * The database is built through core.ts, then the 073 objects and the 073 and 196 ledger rows
 * are removed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mig-073-guard-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

const db = core.getDbInstance();

function objectExists(type: "table" | "index", name: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = ? AND name = ?").get(type, name)
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a ledger gap at 073 recreates the token-limit tables before 196 reads them", () => {
  db.exec(`
    DROP TABLE api_key_token_limit_reset_logs;
    DROP TABLE api_key_token_counters;
    DROP TABLE api_key_token_limits;
    DROP INDEX idx_uh_key_provider_model_ts;
  `);
  db.prepare("DELETE FROM _omniroute_migrations WHERE version IN ('073', '196')").run();

  assert.doesNotThrow(() => runMigrations(db));

  for (const table of [
    "api_key_token_limits",
    "api_key_token_counters",
    "api_key_token_limit_reset_logs",
  ]) {
    assert.ok(objectExists("table", table), `${table} must exist after the 073 replay`);
  }
  assert.ok(objectExists("index", "idx_uh_key_provider_model_ts"));
  assert.ok(db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version = '196'").get());
});

test("a ledger gap at 083 still restores the memory vector metadata", () => {
  db.exec("DROP TABLE memory_vec_meta; DROP INDEX idx_memories_needs_reindex;");
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = '083'").run();

  assert.equal(runMigrations(db), 1);

  assert.ok(objectExists("table", "memory_vec_meta"));
  assert.ok(objectExists("index", "idx_memories_needs_reindex"));
});
