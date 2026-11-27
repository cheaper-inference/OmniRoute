/**
 * Ledger-gap replays must repair or keep the schema, never certify work that did not happen.
 *
 *  - 005 and 027 add several columns and indexes: one present column must not skip the rest.
 *  - 012 adds cache tokens to usage_history once: a gap replay must not add them again.
 *
 * The database is built through core.ts, then the ledger row of one migration is removed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mig-postcondition-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

const db = core.getDbInstance();

function columns(table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(
    (column) => column.name
  );
}

function hasIndex(name: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'index' AND name = ?").get(name)
  );
}

function forgetMigration(version: string) {
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = ?").run(version);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("005 replay restores the columns and index that a partial schema lacks", () => {
  db.exec(`
    DROP INDEX idx_combos_cache_protection;
    ALTER TABLE combos DROP COLUMN context_cache_protection;
    ALTER TABLE combos DROP COLUMN tool_filter_regex;
  `);
  forgetMigration("005");

  assert.equal(runMigrations(db), 1);

  assert.ok(columns("combos").includes("system_message"));
  assert.ok(columns("combos").includes("tool_filter_regex"), "tool_filter_regex must come back");
  assert.ok(columns("combos").includes("context_cache_protection"));
  assert.ok(hasIndex("idx_combos_cache_protection"), "the 005 index must come back");
});

test("027 replay restores the columns and indexes that a partial schema lacks", () => {
  db.exec(`
    DROP INDEX idx_skills_source_provider;
    ALTER TABLE skills DROP COLUMN source_provider;
    ALTER TABLE skills DROP COLUMN tags;
    ALTER TABLE skills DROP COLUMN install_count;
  `);
  forgetMigration("027");

  assert.equal(runMigrations(db), 1);

  for (const column of ["mode", "source_provider", "tags", "install_count"]) {
    assert.ok(columns("skills").includes(column), `skills.${column} must come back`);
  }
  assert.ok(hasIndex("idx_skills_source_provider"), "the 027 index must come back");
});

test("012 replay in a ledger gap does not add cache tokens to usage history again", () => {
  db.prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_cache_read, tokens_cache_creation, timestamp) " +
      "VALUES ('p', 'm', 1000, 200, 300, datetime('now'))"
  ).run();
  forgetMigration("012");

  assert.equal(runMigrations(db), 1);

  const row = db.prepare("SELECT tokens_input FROM usage_history WHERE provider = 'p'").get() as {
    tokens_input: number;
  };
  assert.equal(row.tokens_input, 1000, "tokens_input is already the total; it must not grow");
  assert.ok(
    db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version = '012'").get(),
    "012 must still be recorded"
  );
});
