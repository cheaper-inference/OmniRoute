/**
 * The cleanup migration drops the synced catalogs that provider removals left
 * behind in the key/value store.
 *
 * Provider removal migrations delete the connections of a retired provider in
 * SQL; the ones that don't purge the synced catalog namespace leave their
 * synced catalogs behind: the synced catalog of every removed connection
 * stayed there forever. This test replays the removal migrations on a
 * populated database, then applies the cleanup migration, and checks that no
 * catalog of a removed provider survives while the catalog of a live
 * connection is untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MIGRATIONS_DIR = path.resolve(import.meta.dirname, "../../../src/lib/db/migrations");
const CLEANUP_MIGRATION_FILE = "217_purge_orphaned_provider_catalogs.sql";
const REMOVAL_MIGRATIONS = [
  "130_remove_unregistered_qwen_data.sql",
  "152_remove_puter_provider.sql",
  "159_remove_mimocode_provider.sql",
  "162_remove_hackclub_provider.sql",
];

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-orphaned-catalogs-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
const originalEncryptionKey = process.env.STORAGE_ENCRYPTION_KEY;
process.env.STORAGE_ENCRYPTION_KEY = "orphaned-catalogs-isolated-test-key";

const core = await import("../../../src/lib/db/core.ts");

const REMOVED_PROVIDERS = ["qwen", "puter", "mimocode", "mcode", "hackclub"];
const LIVE_PROVIDER = "qoder";

type CatalogRow = { key: string };

function catalogKeys(): string[] {
  const db = core.getDbInstance();
  const rows = db
    .prepare("SELECT key FROM key_value WHERE namespace = 'syncedAvailableModels' ORDER BY key")
    .all() as CatalogRow[];
  return rows.map((row) => row.key);
}

function readMigration(file: string): string {
  return fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
}

test.before(() => {
  const db = core.getDbInstance();
  const insertConnection = db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
      "VALUES (?, ?, 'apikey', ?, 1, datetime('now'), datetime('now'))"
  );
  const insertCatalog = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, '[]')"
  );
  for (const provider of REMOVED_PROVIDERS) {
    const connectionId = `${provider}-connection`;
    insertConnection.run(connectionId, provider, `${provider}-legacy`);
    insertCatalog.run(`${provider}:${connectionId}`);
  }
  insertConnection.run("live-connection", LIVE_PROVIDER, "live");
  insertCatalog.run(`${LIVE_PROVIDER}:live-connection`);

  for (const file of REMOVAL_MIGRATIONS) {
    db.exec(readMigration(file));
  }
});

test.after(() => {
  core.resetDbInstance();
  if (originalEncryptionKey === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = originalEncryptionKey;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the cleanup migration file exists in the migrations folder", () => {
  assert.equal(
    fs.existsSync(path.join(MIGRATIONS_DIR, CLEANUP_MIGRATION_FILE)),
    true,
    `the cleanup migration ${CLEANUP_MIGRATION_FILE} must exist in the migrations folder`
  );
});

test("the removal migrations delete the connections and leave their catalog behind", () => {
  const db = core.getDbInstance();
  for (const provider of REMOVED_PROVIDERS) {
    assert.equal(
      db.prepare("SELECT id FROM provider_connections WHERE id = ?").get(`${provider}-connection`),
      undefined,
      `${provider}: the removal migration must delete the connection`
    );
  }
  const keys = catalogKeys();
  for (const provider of REMOVED_PROVIDERS) {
    assert.ok(
      keys.includes(`${provider}:${provider}-connection`),
      `${provider}: the removal migration must leave the catalog behind, that is the debt to clean`
    );
  }
  assert.equal(
    keys.length,
    REMOVED_PROVIDERS.length + 1,
    `only the catalogs of the removed providers and the live one must be left, got ${JSON.stringify(keys)}`
  );
});

test("the cleanup migration drops the catalog of every removed provider", () => {
  const db = core.getDbInstance();
  db.exec(readMigration(CLEANUP_MIGRATION_FILE));

  const keys = catalogKeys();
  for (const provider of REMOVED_PROVIDERS) {
    assert.equal(
      keys.includes(`${provider}:${provider}-connection`),
      false,
      `${provider}: no catalog entry must survive the cleanup`
    );
  }
  assert.deepEqual(keys, [`${LIVE_PROVIDER}:live-connection`]);
});

test("the cleanup migration keeps the catalog of a live connection", () => {
  const db = core.getDbInstance();
  db.exec(readMigration(CLEANUP_MIGRATION_FILE));

  assert.deepEqual(catalogKeys(), [`${LIVE_PROVIDER}:live-connection`]);
});

test("the cleanup migration is idempotent", () => {
  const db = core.getDbInstance();
  db.exec(readMigration(CLEANUP_MIGRATION_FILE));
  const before = catalogKeys();
  db.exec(readMigration(CLEANUP_MIGRATION_FILE));

  assert.deepEqual(catalogKeys(), before);
});
