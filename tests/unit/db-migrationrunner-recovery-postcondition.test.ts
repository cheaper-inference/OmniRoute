/**
 * Duplicate-column recovery may record a migration only when every column the file adds is
 * present afterwards. A replay that fails for another reason must not certify the missing ones.
 *
 * `MIGRATIONS_DIR` is resolved once when migrationRunner.ts is evaluated, so the migration
 * files are written before the import.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const CORE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "mig-recovery-postcondition-"));
fs.writeFileSync(
  path.join(CORE_DIR, "001_initial_schema.sql"),
  [
    "CREATE TABLE subs (id INTEGER PRIMARY KEY, control_url TEXT);",
    "CREATE TABLE subs_log (id INTEGER PRIMARY KEY);",
  ].join("\n")
);
// control_url exists (duplicate column), subs_log exists (the replay fails), extra is missing.
fs.writeFileSync(
  path.join(CORE_DIR, "002_subs_extra.sql"),
  [
    "ALTER TABLE subs ADD COLUMN control_url TEXT;",
    "ALTER TABLE subs ADD COLUMN extra TEXT;",
    "CREATE TABLE subs_log (id INTEGER PRIMARY KEY);",
  ].join("\n")
);
process.env.OMNIROUTE_MIGRATIONS_DIR = CORE_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

process.on("exit", () => {
  fs.rmSync(CORE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failed replay with a column still missing aborts and leaves no ledger row", () => {
  const db = new Database(":memory:");
  try {
    assert.throws(() => runMigrations(db as never, { isNewDb: true }), /subs\.extra/);
    const ledger = db.prepare("SELECT version FROM _omniroute_migrations ORDER BY rowid").all();
    assert.deepEqual(ledger, [{ version: "001" }], "002 must not be certified");
  } finally {
    db.close();
  }
});
