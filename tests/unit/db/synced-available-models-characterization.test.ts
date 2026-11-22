/**
 * Characterization of the connection-scoped synced model catalog helpers that live
 * under `src/lib/db/models/` (canonical write, provider purge, vision lookup).
 * Uses only the long-standing exports so it runs unchanged before and after the
 * repository extraction: stored shapes, canonical no-op detection, exact prefix
 * matching, catalog cache invalidation in the same turn as the write, the post-sync
 * reconcile trigger, the provider-delete cascade and the positive-only vision verdict.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "synced-models-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const models = await import("../../../src/lib/db/models.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const persistence = await import("../../../src/lib/db/models/syncedAvailableModelPersistence.ts");
const synced = await import("../../../src/lib/db/models/synced.ts");
const vision = await import("../../../src/lib/db/models/syncedAvailableModelVision.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
  vision.resetSyncedVisionVerdictMemoForTests();
  persistence.cancelPendingPostSyncReconcile();
});
test.after(() => {
  persistence.cancelPendingPostSyncReconcile();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function syncedRows(): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels' ORDER BY key"
    )
    .all() as Array<{ key: string; value: string }>;
}

function putSynced(key: string, value: string): void {
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    )
    .run(key, value);
}

function catalogVersion(): number {
  return readCache.getModelCatalogCacheVersion();
}

const normalize = (value: unknown) => synced.normalizeSyncedAvailableModels(value);

// ── Canonical write ─────────────────────────────────────────────────────────

test("canonical write: stores the normalized list as JSON and invalidates the catalog", () => {
  const list = normalize([{ id: "m1", name: "Model 1" }]);
  const v0 = catalogVersion();
  assert.equal(persistence.persistCanonicalSyncedAvailableModels("acme:c1", list, normalize), true);
  assert.deepEqual(syncedRows(), [{ key: "acme:c1", value: JSON.stringify(list) }]);
  assert.ok(catalogVersion() > v0, "write bumps the catalog version in the same call");
});

test("canonical write: an identical list is a no-op without invalidation", () => {
  const list = normalize([{ id: "m1", name: "Model 1" }]);
  persistence.persistCanonicalSyncedAvailableModels("acme:c1", list, normalize);
  const v1 = catalogVersion();
  // Stored with a different key order and extra noise; canonical comparison ignores it.
  putSynced("acme:c1", JSON.stringify([{ name: "Model 1", id: "m1", junk: 1 }]));
  assert.equal(
    persistence.persistCanonicalSyncedAvailableModels("acme:c1", list, normalize),
    false
  );
  assert.equal(catalogVersion(), v1);
  assert.equal(syncedRows()[0].value, JSON.stringify([{ name: "Model 1", id: "m1", junk: 1 }]));
});

test("canonical write: an empty list deletes the row, or is a no-op when absent", () => {
  const v0 = catalogVersion();
  assert.equal(persistence.persistCanonicalSyncedAvailableModels("acme:c1", [], normalize), false);
  assert.equal(catalogVersion(), v0);

  persistence.persistCanonicalSyncedAvailableModels("acme:c1", normalize([{ id: "m" }]), normalize);
  const v1 = catalogVersion();
  assert.equal(persistence.persistCanonicalSyncedAvailableModels("acme:c1", [], normalize), true);
  assert.deepEqual(syncedRows(), []);
  assert.ok(catalogVersion() > v1);
});

test("canonical write: a malformed stored blob is overwritten", () => {
  putSynced("acme:c1", "{not json");
  const list = normalize([{ id: "m1" }]);
  assert.equal(persistence.persistCanonicalSyncedAvailableModels("acme:c1", list, normalize), true);
  assert.deepEqual(syncedRows(), [{ key: "acme:c1", value: JSON.stringify(list) }]);
});

test("canonical write: an empty list over a malformed blob deletes it", () => {
  putSynced("acme:c1", "{not json");
  assert.equal(persistence.persistCanonicalSyncedAvailableModels("acme:c1", [], normalize), true);
  assert.deepEqual(syncedRows(), []);
});

test("canonical write: only a declared-window change schedules the provider reconcile", () => {
  persistence.persistCanonicalSyncedAvailableModels(
    "acme:c1",
    normalize([{ id: "m1", name: "A" }]),
    normalize
  );
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders(), []);

  persistence.persistCanonicalSyncedAvailableModels(
    "acme:c1",
    normalize([{ id: "m1", name: "A", contextWindow: 1000 }]),
    normalize
  );
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders(), ["acme"]);
  persistence.cancelPendingPostSyncReconcile();

  persistence.persistCanonicalSyncedAvailableModels(
    "acme:c1",
    normalize([{ id: "m1", name: "B", contextWindow: 1000 }]),
    normalize
  );
  assert.deepEqual(persistence.getPendingPostSyncReconcileProviders(), []);
});

// ── Provider purge ──────────────────────────────────────────────────────────

test("provider purge: exact `<provider>:` prefix, count returned, LIKE wildcards literal", async () => {
  putSynced("acme:c1", "[]");
  putSynced("acme:c2", "[]");
  putSynced("acme-2:c1", "[]");
  putSynced("acmeX:c1", "[]");
  putSynced("abc:c1", "[]");
  putSynced("a_c:c1", "[]");

  assert.equal(await persistence.deleteSyncedAvailableModelsForProvider("acme"), 2);
  assert.equal(await persistence.deleteSyncedAvailableModelsForProvider("a_c"), 1);
  assert.deepEqual(
    syncedRows().map((row) => row.key),
    ["abc:c1", "acme-2:c1", "acmeX:c1"]
  );
});

test("provider purge: deletes and invalidates before the returned promise settles", async () => {
  putSynced("acme:c1", "[]");
  const v0 = catalogVersion();
  const pending = persistence.deleteSyncedAvailableModelsForProvider("acme");
  assert.deepEqual(syncedRows(), [], "row is gone in the same turn as the call");
  assert.ok(catalogVersion() > v0, "catalog version bumps in the same turn as the call");
  assert.equal(await pending, 1);
});

test("provider purge: nothing removed means no invalidation", async () => {
  putSynced("other:c1", "[]");
  const v0 = catalogVersion();
  assert.equal(await persistence.deleteSyncedAvailableModelsForProvider("acme"), 0);
  assert.equal(catalogVersion(), v0);
});

test("provider delete cascade: deleting by provider purges its synced catalogs only", async () => {
  const target = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "purge-me",
    apiKey: "sk-characterization-a",
  });
  const other = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "keep-me",
    apiKey: "sk-characterization-b",
  });
  assert.ok(target?.id && other?.id);
  await models.replaceSyncedAvailableModelsForConnection("openai", target.id as string, [
    { id: "gone", name: "Gone" },
  ]);
  await models.replaceSyncedAvailableModelsForConnection("anthropic", other.id as string, [
    { id: "kept", name: "Kept" },
  ]);
  const v0 = catalogVersion();

  assert.equal(await providersDb.deleteProviderConnectionsByProvider("openai"), 1);
  assert.deepEqual(
    syncedRows().map((row) => row.key),
    [`anthropic:${other.id}`]
  );
  assert.ok(catalogVersion() > v0);
});

// ── Vision lookup ───────────────────────────────────────────────────────────

test("vision: bulk map unions positive verdicts across connections and skips bad rows", () => {
  putSynced("acme:c1", JSON.stringify([{ id: "v1", supportsVision: true }, { id: "p1" }]));
  putSynced("acme:c2", JSON.stringify([{ id: "v2", supportsVision: true }]));
  putSynced("acme:c3", "{not json");
  putSynced("beta:c1", JSON.stringify([{ id: "v1", supportsVision: "yes" }]));
  putSynced(":orphan", JSON.stringify([{ id: "x", supportsVision: true }]));

  const map = vision.listSyncedAvailableModelVision();
  assert.deepEqual(
    [...map.entries()].map(([provider, ids]) => [provider, [...ids].sort()]),
    [["acme", ["v1", "v2"]]]
  );
});

test("vision: bulk map read failure degrades to an empty map", () => {
  const failing = {
    prepare: () => {
      throw new Error("closed database");
    },
  };
  const map = vision.listSyncedAvailableModelVision({
    getDatabase: () => failing as never,
  });
  assert.equal(map.size, 0);
});

test("vision: single verdict is positive-only and follows the catalog version", async () => {
  putSynced("acme:c1", JSON.stringify([{ id: "v1", supportsVision: true }, { id: "p1" }]));
  assert.equal(vision.getSyncedAvailableModelVision("acme", "v1"), true);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "p1"), null);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "missing"), null);
  assert.equal(vision.getSyncedAvailableModelVision("", "v1"), null);

  // A write through the shared exit refreshes the memo.
  await models.replaceSyncedAvailableModelsForConnection("acme", "c1", [{ id: "v1" }]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "v1"), null);
});

test("vision: an injected database is read with the historical LIKE prefix match", () => {
  putSynced("abc:c1", JSON.stringify([{ id: "v1", supportsVision: true }]));
  const db = core.getDbInstance();
  // `_` is a LIKE wildcard on the direct read; the memoized read splits keys instead.
  assert.equal(
    vision.getSyncedAvailableModelVision("a_c", "v1", undefined, { getDatabase: () => db }),
    true
  );
  assert.equal(vision.getSyncedAvailableModelVision("a_c", "v1"), null);
  assert.equal(vision.getSyncedVisionVerdictMemoSizeForTests(), 1);
});

test("vision: a supplied bulk map is read without touching the database", () => {
  const bulk = new Map([["acme", new Set(["v1"])]]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "v1", bulk), true);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "v2", bulk), null);
  assert.equal(vision.getSyncedVisionVerdictMemoSizeForTests(), 0);
});

test("barrel: models.ts re-exports the vision lookups", () => {
  assert.equal(models.getSyncedAvailableModelVision, vision.getSyncedAvailableModelVision);
  assert.equal(models.listSyncedAvailableModelVision, vision.listSyncedAvailableModelVision);
});

// ── Freshness ───────────────────────────────────────────────────────────────

test("freshness: 30-day default, env override, and fail-closed on missing or bad stamps", async () => {
  const { isSyncedAtFresh } = await import("../../../src/lib/db/models/syncedCatalogFreshness.ts");
  const day = 24 * 60 * 60 * 1000;
  const ago = (ms: number) => new Date(Date.now() - ms).toISOString();
  const saved = process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
  try {
    delete process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
    assert.equal(isSyncedAtFresh(null), false);
    assert.equal(isSyncedAtFresh(""), false);
    assert.equal(isSyncedAtFresh("not a date"), false);
    assert.equal(isSyncedAtFresh(ago(29 * day)), true);
    assert.equal(isSyncedAtFresh(ago(31 * day)), false);

    process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = String(day);
    assert.equal(isSyncedAtFresh(ago(2 * day)), false);
    assert.equal(isSyncedAtFresh(ago(day / 2)), true);

    for (const bad of ["0", "-5", "abc"]) {
      process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = bad;
      assert.equal(isSyncedAtFresh(ago(29 * day)), true, `fallback for ${bad}`);
    }
  } finally {
    if (saved === undefined) delete process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
    else process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = saved;
  }
});
