import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "model-discovery-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { modelDiscoveryRepositories } =
  await import("../../../src/lib/db/repositories/modelDiscoveryRepositories.ts");
const discoveryStateFacade = await import("../../../src/lib/db/discoveryState.ts");
const ccAliasFacade = await import("../../../src/lib/db/ccDiscoveryAliases.ts");

const { discoveryState, ccAliasOverrides } = modelDiscoveryRepositories;

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

test("facades hand out the composition-root repositories", () => {
  assert.equal(discoveryStateFacade.getDiscoveryStateRepository(), discoveryState);
  assert.equal(ccAliasFacade.getCcAliasOverrideRepository(), ccAliasOverrides);
});

test("discovery state repository: stores records as given, without stamping the time", async () => {
  const record = { status: "degraded" as const, cause: "HTTP 502", at: "2026-01-02T03:04:05.000Z" };
  await promised(discoveryState.save("p", "a", record));
  await promised(discoveryState.save("p", "b", { status: "healthy", cause: null, at: record.at }));
  await promised(discoveryState.save("q", "a", { ...record, cause: "other" }));

  const found = await promised(
    discoveryState.findForConnections([
      { provider: "p", id: "a" },
      { provider: "p", id: "missing" },
    ])
  );
  assert.deepEqual([...found.entries()], [["p:a", record]]);
  assert.equal((await promised(discoveryState.findForConnections([]))).size, 0);

  assert.equal(
    await promised(discoveryState.removeForConnections([{ provider: "q", id: "a" }])),
    1
  );
  assert.equal(await promised(discoveryState.removeForConnections([])), 0);
  assert.equal(await promised(discoveryState.removeForProvider("p")), 2);
  assert.equal(await promised(discoveryState.removeForProvider("p")), 0);
});

test("discovery state legacy sync shares the store with the Promise repository", async () => {
  const legacy = modelDiscoveryRepositories.legacySync.discoveryState;
  const at = "2026-01-02T03:04:05.000Z";
  legacy.save("p", "a", { status: "healthy", cause: null, at });
  const found = await discoveryState.findForConnections([{ provider: "p", id: "a" }]);
  assert.deepEqual(found.get("p:a"), { status: "healthy", cause: null, at });

  await discoveryState.save("p", "b", { status: "degraded", cause: "x", at });
  assert.equal(legacy.findForConnections([{ provider: "p", id: "b" }]).get("p:b")?.cause, "x");
  assert.equal(legacy.removeForProvider("p"), 2);
});

test("discovery state facade stamps the time and delegates reads and deletes", () => {
  discoveryStateFacade.saveDiscoveryState("p", "a", { status: "degraded", cause: "boom" });
  const legacy = modelDiscoveryRepositories.legacySync.discoveryState;
  const stored = legacy.findForConnections([{ provider: "p", id: "a" }]).get("p:a");
  assert.equal(stored?.cause, "boom");
  assert.ok(Number.isFinite(Date.parse(stored?.at ?? "")));
  assert.equal(
    discoveryStateFacade.deleteDiscoveryStatesForConnections([{ provider: "p", id: "a" }]),
    1
  );
  assert.equal(discoveryStateFacade.deleteDiscoveryStatesForProvider("p"), 0);
});

test("cc alias override repository: Promise CRUD without cache invalidation", async () => {
  const version = readCache.getModelCatalogCacheVersion();
  assert.equal(await promised(ccAliasOverrides.getProvider("p")), null);
  assert.equal(await promised(ccAliasOverrides.getModel("p", "m")), null);

  await promised(ccAliasOverrides.setProvider("p", "on"));
  await promised(ccAliasOverrides.setModel("p", "m", "off"));
  await promised(ccAliasOverrides.setModel("p", "n", "on"));
  assert.equal(await ccAliasOverrides.getProvider("p"), "on");
  assert.equal(await ccAliasOverrides.getModel("p", "m"), "off");

  const all = await promised(ccAliasOverrides.listAll());
  assert.deepEqual([...all.providers.entries()], [["p", "on"]]);
  assert.deepEqual([...all.models.entries()].sort(), [
    ["p/m", "off"],
    ["p/n", "on"],
  ]);

  await promised(ccAliasOverrides.setProvider("p", null));
  await promised(ccAliasOverrides.setModel("p", "m", null));
  assert.equal(await ccAliasOverrides.getProvider("p"), null);
  assert.equal(await ccAliasOverrides.getModel("p", "m"), null);
  // Invalidating the model catalog is the facade's job, not the repository's.
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("cc alias legacy sync shares the store with the Promise repository", async () => {
  const legacy = modelDiscoveryRepositories.legacySync.ccAliasOverrides;
  legacy.setProvider("p", "off");
  assert.equal(await ccAliasOverrides.getProvider("p"), "off");
  await ccAliasOverrides.setModel("p", "m", "on");
  assert.equal(legacy.getModel("p", "m"), "on");
  assert.deepEqual([...legacy.listAll().models.entries()], [["p/m", "on"]]);
});

test("cc alias facade invalidates the catalog on every write", () => {
  const version = readCache.getModelCatalogCacheVersion();
  ccAliasFacade.setCcAliasProviderSetting("p", "on");
  ccAliasFacade.setCcAliasModelSetting("p", "m", "off");
  assert.equal(readCache.getModelCatalogCacheVersion(), version + 2);
  assert.equal(modelDiscoveryRepositories.legacySync.ccAliasOverrides.getProvider("p"), "on");
});
