// call_logs.client_session_id is a nullable additive column with an index. Fresh databases
// and upgrades from the prior schema both receive it, and a database where
// ensureCallLogsColumns() already added the column at boot still records the migration.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

const MIGRATION = "214_call_logs_client_session_id.sql";
const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-214-"));
fs.copyFileSync(path.join(repoMigrations, MIGRATION), path.join(migrationsDir, MIGRATION));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

const columns = (db: SqliteAdapter) =>
  (db.prepare("PRAGMA table_info(call_logs)").all() as Array<{ name: string }>).map((c) => c.name);
const indexes = (db: SqliteAdapter) =>
  (db.prepare("PRAGMA index_list(call_logs)").all() as Array<{ name: string }>).map((i) => i.name);
const applied = (db: SqliteAdapter) =>
  db.prepare("SELECT version FROM _omniroute_migrations WHERE version = '214'").get();

function openDb(withColumn: boolean): SqliteAdapter {
  const db = openMemorySqliteAdapter();
  db.exec(
    `CREATE TABLE call_logs (id TEXT PRIMARY KEY, status INTEGER, session_tag TEXT${
      withColumn ? ", client_session_id TEXT DEFAULT NULL" : ""
    });`
  );
  return db;
}

test("an older call_logs gains client_session_id and its index; a second run is a no-op", () => {
  const db = openDb(false);
  try {
    db.prepare(
      "INSERT INTO call_logs (id, status, session_tag) VALUES ('old', 200, 'conv_1')"
    ).run();
    runMigrations(db);
    assert.ok(columns(db).includes("client_session_id"));
    assert.ok(indexes(db).includes("idx_cl_client_session_id"));
    assert.ok(applied(db));
    const old = db
      .prepare("SELECT session_tag, client_session_id FROM call_logs WHERE id = 'old'")
      .get() as Record<string, unknown>;
    assert.equal(old.session_tag, "conv_1", "existing rows keep their data");
    assert.equal(old.client_session_id, null, "existing rows read NULL, not a synthesized id");
    runMigrations(db);
    assert.ok(columns(db).includes("client_session_id"));
  } finally {
    db.close();
  }
});

test("a call_logs that already has the column (healed at boot) still records 214 and gets the index", () => {
  const db = openDb(true);
  try {
    runMigrations(db);
    assert.ok(applied(db));
    assert.ok(indexes(db).includes("idx_cl_client_session_id"));
    assert.equal(columns(db).filter((c) => c === "client_session_id").length, 1);
  } finally {
    db.close();
  }
});
