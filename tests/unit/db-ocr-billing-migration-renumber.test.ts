import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createNodeSqliteAdapter } from "../../src/lib/db/adapters/nodeSqliteAdapter.ts";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const realDir = path.resolve("src/lib/db/migrations");
const accountingName = "usage_history_calculated_cost";
const accountingFile = fs
  .readdirSync(realDir)
  .find((name) => name.endsWith(`_${accountingName}.sql`));
assert.ok(accountingFile, "the document-billing migration must exist");
const files = [
  "228_purge_orphaned_provider_catalogs.sql",
  "229_api_key_five_hour_limit.sql",
  accountingFile,
];
// Copy actual SQL under its actual filename: no test-only collision workaround.
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ocr-renumber-"));
for (const file of files) fs.copyFileSync(path.join(realDir, file), path.join(migrationsDir, file));
const previousDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const accountingSql = fs.readFileSync(path.join(realDir, accountingFile), "utf8");
const cleanupSql = fs.readFileSync(path.join(realDir, files[0]), "utf8");
const appliedAt = "2026-11-07 12:00:00";
const billingColumns = [
  "calculated_cost_usd",
  "billing_unit",
  "billing_quantity",
  "billing_unit_price_usd",
];
const expectedLedger = [
  { version: "228", name: "purge_orphaned_provider_catalogs" },
  { version: "229", name: "api_key_five_hour_limit" },
  { version: "230", name: accountingName },
];

test.after(() => {
  if (previousDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = previousDir;
  fs.rmSync(migrationsDir, { recursive: true, force: true });
});

/** Minimal real pre-228 schema; all database contents are synthetic and in memory. */
async function createDb(): Promise<SqliteAdapter> {
  const db = await createNodeSqliteAdapter(":memory:");
  db.exec(`
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE usage_history (id INTEGER PRIMARY KEY, tokens_input INTEGER, provider_cost_usd REAL);
    INSERT INTO usage_history VALUES (1, 12, NULL);
    CREATE TABLE api_keys (id TEXT PRIMARY KEY);
    INSERT INTO api_keys VALUES ('synthetic-key');
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    INSERT INTO provider_connections VALUES ('live-connection');
    CREATE TABLE key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY (namespace, key));
    INSERT INTO key_value VALUES ('syncedAvailableModels', 'mistral:live-connection', '[]');
    INSERT INTO key_value VALUES ('syncedAvailableModels', 'mistral:removed-connection', '[]');
    INSERT INTO key_value VALUES ('otherNamespace', 'mistral:removed-connection', 'preserve');
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
  assert.deepEqual(ledger(db), expectedLedger);
  const columns = db.prepare<{ name: string }>("PRAGMA table_info(usage_history)").all();
  for (const name of billingColumns)
    assert.equal(columns.filter((column) => column.name === name).length, 1);
  assert.deepEqual(
    db
      .prepare("SELECT key FROM key_value WHERE namespace = 'syncedAvailableModels' ORDER BY key")
      .all(),
    [{ key: "mistral:live-connection" }],
    "upstream cleanup must run, retaining the live connection's catalog"
  );
  assert.equal(
    db
      .prepare<{ value: string }>("SELECT value FROM key_value WHERE namespace = 'otherNamespace'")
      .get()?.value,
    "preserve"
  );
  assert.ok(
    db
      .prepare<{ name: string }>("PRAGMA table_info(api_keys)")
      .all()
      .some((column) => column.name === "five_hour_usage_limit_usd")
  );
}

function assertLegacyBillingUnchanged(db: SqliteAdapter) {
  assert.deepEqual(db.prepare("SELECT * FROM usage_history WHERE id = 1").get(), {
    id: 1,
    tokens_input: 12,
    provider_cost_usd: null,
    calculated_cost_usd: 0.62,
    billing_unit: "page",
    billing_quantity: 155,
    billing_unit_price_usd: 0.004,
  });
}

function applyLegacyBilling(db: SqliteAdapter) {
  db.exec(accountingSql);
  db.exec(
    "UPDATE usage_history SET calculated_cost_usd = 0.62, billing_unit = 'page', billing_quantity = 155, billing_unit_price_usd = 0.004 WHERE id = 1"
  );
}

test("accounting uses 230, leaving upstream's 228 cleanup and 229 budget migrations intact", () => {
  assert.equal(accountingFile, "230_usage_history_calculated_cost.sql");
  assert.ok(fs.existsSync(path.join(realDir, files[0])));
  assert.ok(fs.existsSync(path.join(realDir, files[1])));
  assert.equal(fs.existsSync(path.join(realDir, "228_usage_history_calculated_cost.sql")), false);
});

test("pre-228 schema applies cleanup, five-hour limits and billing; second run is a no-op", async () => {
  const db = await createDb();
  try {
    assert.equal(runMigrations(db), 3);
    assertComplete(db);
    assert.equal(
      db
        .prepare<{ calculated_cost_usd: unknown }>(
          "SELECT calculated_cost_usd FROM usage_history WHERE id = 1"
        )
        .get()?.calculated_cost_usd,
      null,
      "do not invent historical costs"
    );
    assert.equal(runMigrations(db), 0);
    assertComplete(db);
  } finally {
    db.close();
  }
});

test("canonical 228 cleanup ledger row is not rehomed as accounting", async () => {
  const db = await createDb();
  try {
    db.exec(cleanupSql);
    record(db, "228", "purge_orphaned_provider_catalogs");
    assert.equal(runMigrations(db), 2);
    assertComplete(db);
    assert.equal(
      db
        .prepare<{ applied_at: string }>(
          "SELECT applied_at FROM _omniroute_migrations WHERE version = '228'"
        )
        .get()?.applied_at,
      appliedAt
    );
  } finally {
    db.close();
  }
});

test("legacy 228 accounting is rehomed to 230 without replay or data loss, freeing cleanup", async () => {
  const db = await createDb();
  try {
    applyLegacyBilling(db);
    record(db, "228", accountingName);
    assert.equal(runMigrations(db), 2);
    assertComplete(db);
    assertLegacyBillingUnchanged(db);
    assert.equal(
      db
        .prepare<{ applied_at: string }>(
          "SELECT applied_at FROM _omniroute_migrations WHERE version = '230'"
        )
        .get()?.applied_at,
      appliedAt
    );
    assert.equal(runMigrations(db), 0);
    assertLegacyBillingUnchanged(db);
  } finally {
    db.close();
  }
});

test("legacy and canonical accounting markers coexist safely during repair", async () => {
  const db = await createDb();
  try {
    applyLegacyBilling(db);
    record(db, "228", accountingName);
    record(db, "230", accountingName);
    assert.equal(runMigrations(db), 2);
    assertComplete(db);
    assertLegacyBillingUnchanged(db);
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});

test("an unrelated migration occupying 230 is rejected before deleting ledger or catalog data", async () => {
  const db = await createDb();
  try {
    applyLegacyBilling(db);
    record(db, "228", accountingName);
    record(db, "230", "unrelated_migration");
    const before = ledger(db);
    assert.throws(() => runMigrations(db), /target version 230 is occupied by unknown migration/);
    assert.deepEqual(ledger(db), before);
    assertLegacyBillingUnchanged(db);
    assert.equal(
      db.prepare<{ count: number }>("SELECT COUNT(*) AS count FROM key_value").get()?.count,
      3
    );
  } finally {
    db.close();
  }
});

test("already-present billing columns with a missing marker are not applied twice", async () => {
  const db = await createDb();
  try {
    applyLegacyBilling(db);
    assert.equal(runMigrations(db), 3);
    assertComplete(db);
    assertLegacyBillingUnchanged(db);
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});

test("a partial billing schema receives missing columns without rewriting stored costs", async () => {
  const db = await createDb();
  try {
    db.exec("ALTER TABLE usage_history ADD COLUMN calculated_cost_usd REAL;");
    db.exec("ALTER TABLE usage_history ADD COLUMN billing_unit TEXT;");
    db.exec(
      "UPDATE usage_history SET calculated_cost_usd = 0.62, billing_unit = 'page' WHERE id = 1;"
    );
    assert.equal(runMigrations(db), 3);
    assertComplete(db);
    assert.deepEqual(db.prepare("SELECT * FROM usage_history WHERE id = 1").get(), {
      id: 1,
      tokens_input: 12,
      provider_cost_usd: null,
      calculated_cost_usd: 0.62,
      billing_unit: "page",
      billing_quantity: null,
      billing_unit_price_usd: null,
    });
    assert.equal(runMigrations(db), 0);
  } finally {
    db.close();
  }
});
