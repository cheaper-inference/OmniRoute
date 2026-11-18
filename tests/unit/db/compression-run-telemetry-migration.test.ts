import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// compression_run_telemetry used to be created only lazily (ensureCompressionRunTelemetryTable,
// run by the cleanup timer and the output-style telemetry after boot). A clean install and an
// upgraded install then differed by timing, and check:install-upgrade stopped the 3.8.54 npm
// publish on it (run 44254498706: 151 tables clean, 152 upgraded). The migration makes every
// database have the table right after runMigrations, with the lazy DDL's exact columns.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "compression-run-telemetry-migration-"));
const data = path.join(scratch, "data");
fs.mkdirSync(data, { recursive: true });
process.env.DATA_DIR = data;

const MIGRATION = new URL(
  "../../../src/lib/db/migrations/20261118120853_compression_run_telemetry.sql",
  import.meta.url
);

const core = await import("../../../src/lib/db/core.ts");
const { ensureCompressionRunTelemetryTable } =
  await import("../../../src/lib/db/compressionRunTelemetry.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

type Column = { name: string; type: string; notnull: number; pk: number };

function columns(db: ReturnType<typeof core.getDbInstance>): Column[] {
  return (db.prepare("PRAGMA table_info(compression_run_telemetry)").all() as Column[]).map(
    ({ name, type, notnull, pk }) => ({ name, type, notnull, pk })
  );
}

test("a clean install has compression_run_telemetry before any feature runs", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const table = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get("compression_run_telemetry");
  assert.ok(table, "runMigrations must create compression_run_telemetry on a fresh database");
  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
    .get("20261118120853");
  assert.ok(applied, "the migration is recorded in the ledger");
});

test("the migration and the lazy CREATE define the same columns", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const fromMigration = columns(db);

  db.exec("DROP TABLE compression_run_telemetry");
  ensureCompressionRunTelemetryTable();
  const fromLazy = columns(db);

  assert.deepEqual(fromMigration, fromLazy);
  assert.equal(fromMigration.length, 13);
});

test("re-running the migration keeps a lazily created table and its rows", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  db.exec("DELETE FROM compression_run_telemetry");
  db.prepare(
    "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
  ).run(1, 100, 40);

  db.exec(fs.readFileSync(MIGRATION, "utf8"));

  const { count } = db.prepare("SELECT COUNT(*) AS count FROM compression_run_telemetry").get() as {
    count: number;
  };
  assert.equal(count, 1);
});
