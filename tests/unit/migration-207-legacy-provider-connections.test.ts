import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

// 207_remove_opencode_free_provider reads api_key / access_token / refresh_token / id_token /
// provider_specific_data. A provider_connections table that predates those core.ts columns
// used to abort the whole migration run with "no such column: api_key".

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mig207-legacy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const sqliteFile = path.join(TEST_DATA_DIR, "storage.sqlite");
const seedDb = new Database(sqliteFile);
seedDb.exec(`
  CREATE TABLE provider_connections (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    auth_type TEXT,
    name TEXT,
    priority INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    test_status TEXT,
    error_code TEXT,
    last_error TEXT,
    last_error_at TEXT,
    last_error_type TEXT,
    last_error_source TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE _omniroute_migrations (
    version TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
`);
const now = new Date().toISOString();
const insert = seedDb.prepare(
  "INSERT INTO provider_connections (id, provider, auth_type, name, created_at, updated_at) " +
    "VALUES (?, ?, 'apikey', ?, ?, ?)"
);
insert.run("legacy-opencode", "opencode", "legacy opencode", now, now);
insert.run("legacy-oc", "oc", "legacy oc", now, now);
insert.run("legacy-openai", "openai", "legacy openai", now, now);
seedDb.close();

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 207 applies on a provider_connections table without the credential columns", () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = '207'")
    .get();
  assert.ok(applied, "migration 207 must be recorded as applied on the legacy schema");

  const columns = new Set(
    (db.prepare("PRAGMA table_info(provider_connections)").all() as Array<{ name: string }>).map(
      (row) => row.name
    )
  );
  for (const column of ["api_key", "access_token", "refresh_token", "id_token"]) {
    assert.ok(columns.has(column), `provider_connections.${column} must exist after migrating`);
  }

  const providers = (
    db.prepare("SELECT provider FROM provider_connections ORDER BY id").all() as Array<{
      provider: string;
    }>
  ).map((row) => row.provider);
  assert.deepEqual(providers, ["openai"], "keyless OpenCode Free rows are dropped, others kept");
});
