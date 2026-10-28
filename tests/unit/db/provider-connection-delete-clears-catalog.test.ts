/**
 * Deleting a connection through the API must not leave its synced catalog in
 * the key/value store.
 *
 * The store is keyed on `<providerId>:<connectionId>`, so a catalog entry whose
 * connection is gone is dead weight. The API delete paths (single connection
 * and batch) clean the store after the deletion; this test drives both real
 * route handlers and checks that no catalog entry survives them.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const MIGRATIONS_DIR = path.resolve(import.meta.dirname, "../../../src/lib/db/migrations");
const CLEANUP_MIGRATION_FILE = "217_purge_orphaned_provider_catalogs.sql";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-connection-delete-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-for-connection-delete";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const providerByIdRoute = await import("../../../src/app/api/providers/[id]/route.ts");
const providersRoute = await import("../../../src/app/api/providers/route.ts");

type CatalogRow = { key: string };

function readMigration(file: string): string {
  return fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
}

function catalogKeys(): string[] {
  const db = core.getDbInstance();
  const rows = db
    .prepare("SELECT key FROM key_value WHERE namespace = 'syncedAvailableModels' ORDER BY key")
    .all() as CatalogRow[];
  return rows.map((row) => row.key);
}

async function createConnectionWithCatalog(
  name: string
): Promise<{ id: string; catalogKey: string }> {
  const connection = (await providersDb.createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name,
    apiKey: `sk-test-${name}`,
    isActive: true,
    providerSpecificData: {},
  })) as { id: string };
  await modelsDb.replaceSyncedAvailableModelsForConnection("qoder", connection.id, [
    { id: `model-${name}`, name: `Model ${name}` },
  ]);
  return { id: connection.id, catalogKey: `qoder:${connection.id}` };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("deleting one connection through the API leaves no catalog entry behind", async () => {
  const { id, catalogKey } = await createConnectionWithCatalog("single");
  assert.ok(catalogKeys().includes(catalogKey), "the catalog entry must exist before the deletion");

  const response = await providerByIdRoute.DELETE(
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id }) }
  );

  assert.equal(response.status, 200);
  assert.equal(
    catalogKeys().includes(catalogKey),
    false,
    "no catalog entry must survive the deletion of its connection"
  );
});

test("deleting several connections through the API leaves no catalog entry behind", async () => {
  const first = await createConnectionWithCatalog("batch-a");
  const second = await createConnectionWithCatalog("batch-b");
  const before = catalogKeys();
  assert.ok(before.includes(first.catalogKey), "the first catalog entry must exist");
  assert.ok(before.includes(second.catalogKey), "the second catalog entry must exist");

  const response = await providersRoute.DELETE(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "DELETE",
      body: { ids: [first.id, second.id] },
    })
  );

  assert.equal(response.status, 200);
  const after = catalogKeys();
  assert.equal(after.includes(first.catalogKey), false, "the first catalog entry must be gone");
  assert.equal(after.includes(second.catalogKey), false, "the second catalog entry must be gone");
});

test("deleting a connection through the API leaves the store free of catalog rows whose connection is gone", async () => {
  // An installation that carried the debt: a removal migration deleted a connection
  // and left its catalog behind. The cleanup migration drops those rows when it runs.
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, '[]')"
  ).run("qoder:gone-connection");
  db.exec(readMigration(CLEANUP_MIGRATION_FILE));

  // The connection deleted through the API leaves no catalog row behind either.
  const { id, catalogKey } = await createConnectionWithCatalog("clean-store");
  const response = await providerByIdRoute.DELETE(
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id }) }
  );

  assert.equal(response.status, 200);
  const remaining = catalogKeys();
  assert.equal(
    remaining.includes("qoder:gone-connection"),
    false,
    "no catalog entry may survive for a connection that is gone"
  );
  assert.equal(
    remaining.includes(catalogKey),
    false,
    "no catalog entry may survive for the connection the API deleted"
  );
});
