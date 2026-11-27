import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "external-sync-state-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { externalSyncStateRepositories } =
  await import("../../../src/lib/db/repositories/externalSyncStateRepositories.ts");
const pricingSync = await import("../../../src/lib/pricingSync.ts");
const arena = await import("../../../src/lib/arenaEloSync.ts");

const { syncedPricing, arenaEloSyncState } = externalSyncStateRepositories;

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

function kv(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

test("services hand out the composition-root repositories", () => {
  assert.equal(pricingSync.getSyncedPricingRepository(), syncedPricing);
  assert.equal(arena.getArenaEloSyncStateRepository(), arenaEloSyncState);
});

test("synced pricing: Promise replace/list/clear without remap, backup or invalidation", async () => {
  const version = readCache.getModelCatalogCacheVersion();
  assert.deepEqual(await promised(syncedPricing.list()), {});

  await promised(
    syncedPricing.replaceAll({ vertex_ai: { a: { input: 1, output: 2 } }, groq: { b: {} } })
  );
  await promised(syncedPricing.replaceAll({ vertex_ai: { a: { input: 1, output: 2 } } }));
  // Stored as given: the historical-alias remap is the service's job.
  assert.deepEqual(await syncedPricing.list(), { vertex_ai: { a: { input: 1, output: 2 } } });

  await promised(syncedPricing.clear());
  assert.deepEqual(await syncedPricing.list(), {});
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("synced pricing: replace is atomic and undecodable rows are skipped on read", async (t) => {
  t.mock.method(console, "warn", () => {});
  await syncedPricing.replaceAll({ keep: { m: { input: 1, output: 1 } } });
  await assert.rejects(
    syncedPricing.replaceAll({ x: {}, y: { bad: 1n as unknown as Record<string, unknown> } })
  );
  assert.deepEqual(await syncedPricing.list(), { keep: { m: { input: 1, output: 1 } } });

  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('pricing_synced', 'z', '{')")
    .run();
  assert.deepEqual(Object.keys(await syncedPricing.list()), ["keep"]);
});

test("synced pricing: status record round-trips and reads leniently", async () => {
  assert.equal(await promised(syncedPricing.readStatus()), null);
  await promised(syncedPricing.writeStatus("2026-01-01T00:00:00.000Z", 12));
  await syncedPricing.writeStatus("2026-01-02T00:00:00.000Z", 13);
  assert.deepEqual(await syncedPricing.readStatus(), {
    lastSyncTime: "2026-01-02T00:00:00.000Z",
    lastSyncModelCount: 13,
  });
  assert.deepEqual(
    kv("pricing_sync_status").map((r) => r.key),
    ["last_sync"]
  );

  core
    .getDbInstance()
    .prepare("UPDATE key_value SET value = ? WHERE namespace = 'pricing_sync_status'")
    .run(JSON.stringify({ lastSyncTime: "t", lastSyncModelCount: "9" }));
  assert.deepEqual(await syncedPricing.readStatus(), { lastSyncTime: "t", lastSyncModelCount: 0 });
});

test("arena state: Promise get/set/remove, values as stored, errors propagate", async (t) => {
  assert.equal(await promised(arenaEloSyncState.get("lastError")), null);
  await promised(arenaEloSyncState.set("lastError", ""));
  assert.equal(await arenaEloSyncState.get("lastError"), "", "empty string is a stored value");
  await promised(arenaEloSyncState.set("activeSource", "huggingface"));
  await promised(arenaEloSyncState.remove("lastError"));
  await promised(arenaEloSyncState.remove("datasetDate"));
  assert.deepEqual(kv("arena_elo"), [{ key: "activeSource", value: "huggingface" }]);

  const db = core.getDbInstance();
  t.mock.method(db, "prepare", () => {
    throw new Error("kv down");
  });
  await assert.rejects(arenaEloSyncState.get("activeSource"), /kv down/);
  await assert.rejects(arenaEloSyncState.set("lastError", "x"), /kv down/);
  await assert.rejects(arenaEloSyncState.remove("lastError"), /kv down/);
});
