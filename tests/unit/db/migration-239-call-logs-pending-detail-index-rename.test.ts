import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createNodeSqliteAdapter } from "../../../src/lib/db/adapters/nodeSqliteAdapter.ts";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";

// Earlier #19573 heads shipped the pending-detail index as 236 and then 237. Those
// slots now belong to 236_key_templates and 237_usage_history_calculated_cost, so a
// database that ran an earlier head must have its ledger row rehomed to 239 — otherwise
// the canonical migration in the old slot is silently skipped forever.
const realDir = path.resolve("src/lib/db/migrations");
const indexName = "call_logs_pending_detail_index";
const files = [
  "236_key_templates.sql",
  "237_usage_history_calculated_cost.sql",
  `239_${indexName}.sql`,
];
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pending-detail-239-"));
for (const file of files) fs.copyFileSync(path.join(realDir, file), path.join(migrationsDir, file));
const previousDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const indexSql = fs.readFileSync(path.join(realDir, `239_${indexName}.sql`), "utf8");
const appliedAt = "2026-11-10 12:00:00";

test.after(() => {
  if (previousDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = previousDir;
  fs.rmSync(migrationsDir, { recursive: true, force: true });
});

/** Minimal synthetic pre-236 schema, in memory. */
async function createDb(): Promise<SqliteAdapter> {
  const db = await createNodeSqliteAdapter(":memory:");
  db.exec(`
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE usage_history (id INTEGER PRIMARY KEY, tokens_input INTEGER);
    CREATE TABLE call_logs (
      id TEXT PRIMARY KEY, timestamp TEXT, detail_state TEXT, detail_pending_until INTEGER
    );
  `);
  return db;
}

function record(db: SqliteAdapter, version: string, name: string) {
  db.prepare("INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES (?, ?, ?)").run(
    version,
    name,
    appliedAt
  );
}

function ledger(db: SqliteAdapter) {
  return db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all();
}

function assertComplete(db: SqliteAdapter) {
  assert.deepEqual(ledger(db), [
    { version: "236", name: "key_templates" },
    { version: "237", name: "usage_history_calculated_cost" },
    { version: "239", name: indexName },
  ]);
  assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name = 'key_templates'").get());
  assert.ok(
    db
      .prepare<{ name: string }>("PRAGMA table_info(usage_history)")
      .all()
      .some((column) => column.name === "calculated_cost_usd"),
    "the canonical 237 migration must run, not be shadowed by the old index row"
  );
  assert.ok(
    db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = ?")
      .get("idx_cl_detail_pending")
  );
}

test("a fresh database applies the pending-detail index as 239", async () => {
  const db = await createDb();
  try {
    assert.equal(runMigrations(db), 3);
    assertComplete(db);
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});

test("a 236-numbered head is rehomed to 239 and key_templates + 237 still apply", async () => {
  const db = await createDb();
  try {
    db.exec(indexSql);
    record(db, "236", indexName);
    assert.equal(runMigrations(db), 2);
    assertComplete(db);
    assert.equal(
      db
        .prepare<{ applied_at: string }>(
          "SELECT applied_at FROM _omniroute_migrations WHERE version = '239'"
        )
        .get()?.applied_at,
      appliedAt,
      "the rehomed row keeps its original applied_at (no replay)"
    );
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});

test("a 237-numbered head is rehomed to 239 and the canonical 237 still applies", async () => {
  const db = await createDb();
  try {
    const keyTemplatesSql = fs.readFileSync(path.join(realDir, "236_key_templates.sql"), "utf8");
    db.exec(keyTemplatesSql);
    record(db, "236", "key_templates");
    db.exec(indexSql);
    record(db, "237", indexName);
    assert.equal(runMigrations(db), 1);
    assertComplete(db);
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});
