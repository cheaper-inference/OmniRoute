import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
const { cleanup } = createTempDataDir("kimi-slot-");
const { createNodeSqliteAdapter } =
  await import("../../../src/lib/db/adapters/nodeSqliteAdapter.ts");
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-migrations-240-"));
for (const name of ["239_call_logs_pending_detail_index.sql", "240_canonical_kimi_provider.sql"]) {
  fs.copyFileSync(path.join("src/lib/db/migrations", name), path.join(migrationsDir, name));
}
const previousDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const appliedAt = "2026-11-12 12:00:00";
test.after(async () => {
  if (previousDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = previousDir;
  fs.rmSync(migrationsDir, { recursive: true, force: true });
  await cleanup();
});
async function createDb() {
  const db = await createNodeSqliteAdapter(":memory:");
  db.exec(`
    CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE TABLE call_logs (id TEXT PRIMARY KEY, detail_state TEXT, detail_pending_until INTEGER);
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY, provider TEXT);
    INSERT INTO provider_connections VALUES ('saved', 'kimi');
  `);
  return db;
}

test("a published 239 Kimi marker moves to 240 without shadowing the upstream index", async () => {
  const db = await createDb();
  try {
    db.prepare(
      "INSERT INTO _omniroute_migrations VALUES ('239', 'canonical_kimi_provider', ?)"
    ).run(appliedAt);
    assert.equal(runMigrations(db), 1);
    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [
        { version: "239", name: "call_logs_pending_detail_index" },
        { version: "240", name: "canonical_kimi_provider" },
      ]
    );
    assert.equal(
      db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='240'").get()
        ?.applied_at,
      appliedAt
    );
    assert.ok(db.prepare("SELECT 1 FROM sqlite_master WHERE name='idx_cl_detail_pending'").get());
    assert.deepEqual(db.prepare("SELECT * FROM provider_connections").all(), [
      { id: "saved", provider: "kimi" },
    ]);
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});

test("canonical upstream 239 and Kimi 240 ledger rows retain their identities", async () => {
  const db = await createDb();
  try {
    db.prepare(
      "INSERT INTO _omniroute_migrations VALUES ('239', 'call_logs_pending_detail_index', ?)"
    ).run(appliedAt);
    db.prepare(
      "INSERT INTO _omniroute_migrations VALUES ('240', 'canonical_kimi_provider', ?)"
    ).run(appliedAt);
    const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
    assert.equal(runMigrations(db), 0);
    assert.deepEqual(
      db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
      before
    );
  } finally {
    db.close();
  }
});
