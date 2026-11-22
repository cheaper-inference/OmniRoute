import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "synced-models-repository-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { syncedAvailableModelRepositories } =
  await import("../../../src/lib/db/repositories/syncedAvailableModelRepositories.ts");
const persistence = await import("../../../src/lib/db/models/syncedAvailableModelPersistence.ts");

const { syncedModels, legacySync } = syncedAvailableModelRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function otherNamespaceRows(): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM key_value WHERE namespace <> 'syncedAvailableModels'")
    .get() as { n: number };
  return row.n;
}

test("facade hands out the composition-root repository", () => {
  assert.equal(persistence.getSyncedAvailableModelRepository(), syncedModels);
});

test("connection catalog: Promise CRUD stores the value verbatim, no cache side effects", async () => {
  const version = readCache.getModelCatalogCacheVersion();
  assert.equal(await promised(syncedModels.readConnectionCatalog("acme:c1")), null);

  await promised(syncedModels.writeConnectionCatalog("acme:c1", '[{"id":"m1"}]'));
  await promised(syncedModels.writeConnectionCatalog("acme:c1", "{not json"));
  assert.equal(await syncedModels.readConnectionCatalog("acme:c1"), "{not json");

  await promised(syncedModels.removeConnectionCatalog("acme:c1"));
  await promised(syncedModels.removeConnectionCatalog("acme:never"));
  assert.equal(await syncedModels.readConnectionCatalog("acme:c1"), null);
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("provider listing uses the LIKE prefix; provider purge matches the prefix exactly", async () => {
  for (const key of ["acme:c1", "acme:c2", "acme-2:c1", "abc:c1", "a_c:c1"]) {
    await syncedModels.writeConnectionCatalog(key, `"${key}"`);
  }
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('modelAliases', 'acme:c9', '1')"
    )
    .run();

  const listed = await promised(syncedModels.listProviderCatalogs("acme"));
  assert.deepEqual(listed.map((row) => row.key).sort(), ["acme:c1", "acme:c2"]);
  assert.deepEqual(
    (await syncedModels.listProviderCatalogs("a_c")).map((row) => row.key).sort(),
    ["a_c:c1", "abc:c1"],
    "listing keeps the historical LIKE semantics"
  );

  const version = readCache.getModelCatalogCacheVersion();
  assert.equal(await promised(syncedModels.removeProviderCatalogs("a_c")), 1);
  assert.equal(await syncedModels.removeProviderCatalogs("acme"), 2);
  assert.equal(await syncedModels.removeProviderCatalogs("acme"), 0);
  assert.equal(readCache.getModelCatalogCacheVersion(), version);

  const all = await promised(syncedModels.listAllCatalogs());
  assert.deepEqual(all.map((row) => row.key).sort(), ["abc:c1", "acme-2:c1"]);
  assert.equal(all.find((row) => row.key === "abc:c1")?.value, '"abc:c1"');
  assert.equal(otherNamespaceRows() >= 1, true, "other namespaces are never touched");
});

test("legacy sync access shares storage with the Promise contract and honors a database", async () => {
  legacySync.syncedModels.writeConnectionCatalog("acme:c1", '["x"]');
  assert.equal(await syncedModels.readConnectionCatalog("acme:c1"), '["x"]');
  assert.equal(legacySync.syncedModels.readConnectionCatalog("acme:c1"), '["x"]');

  const db = core.getDbInstance();
  assert.deepEqual(legacySync.syncedModels.listProviderCatalogValues(db, "acme"), ['["x"]']);
  assert.deepEqual(legacySync.syncedModels.listAllCatalogs(db), [
    { key: "acme:c1", value: '["x"]' },
  ]);

  const injected = {
    prepare: () => ({
      all: () => [{ key: "z:c", value: "[]" }],
      get: () => undefined,
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
    }),
  };
  assert.deepEqual(legacySync.syncedModels.listAllCatalogs(injected as never), [
    { key: "z:c", value: "[]" },
  ]);

  assert.equal(legacySync.syncedModels.removeProviderCatalogs("acme"), 1);
  legacySync.syncedModels.removeConnectionCatalog("acme:c1");
  assert.equal(await syncedModels.readConnectionCatalog("acme:c1"), null);
});
