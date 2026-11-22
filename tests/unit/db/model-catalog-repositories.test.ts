import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "model-catalog-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { modelCatalogRepositories } =
  await import("../../../src/lib/db/repositories/modelCatalogRepositories.ts");
const aliasFacade = await import("../../../src/lib/db/models/aliases.ts");
const discoveryFacade = await import("../../../src/lib/db/discoveryResults.ts");
const serviceModelFacade = await import("../../../src/lib/db/serviceModels.ts");

const { aliases, discoveryResults, serviceModels } = modelCatalogRepositories;

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
  assert.equal(aliasFacade.getModelAliasRepository(), aliases);
  assert.equal(discoveryFacade.getDiscoveryResultRepository(), discoveryResults);
  assert.equal(serviceModelFacade.getServiceModelRepository(), serviceModels);
});

test("alias repository: Promise CRUD without cache invalidation or marker cleanup", async () => {
  const version = readCache.getModelCatalogCacheVersion();
  assert.deepEqual(await promised(aliases.list()), {});
  await promised(aliases.set("fast", "p/m"));
  await promised(aliases.set("obj", { provider: "p", model: "m" }));
  assert.deepEqual(await promised(aliases.list()), {
    fast: "p/m",
    obj: { provider: "p", model: "m" },
  });

  await promised(aliases.markManaged("fast"));
  await promised(aliases.remove("fast"));
  await promised(aliases.remove("never-existed"));
  assert.deepEqual(await aliases.list(), { obj: { provider: "p", model: "m" } });
  // Clearing the marker on delete is the facade's job, not the repository's.
  assert.deepEqual(await promised(aliases.listManagedNames()), new Set(["fast"]));
  await promised(aliases.unmarkManaged("fast"));
  assert.deepEqual(await aliases.listManagedNames(), new Set());
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("alias legacy sync shares the store with the Promise repository", async () => {
  const legacy = modelCatalogRepositories.legacySync.aliases;
  legacy.set("sync", ["p/a", "p/b"]);
  assert.deepEqual(await aliases.list(), { sync: ["p/a", "p/b"] });
  await aliases.markManaged("sync");
  assert.deepEqual(legacy.readManagedNames(), ["sync"]);
  legacy.writeManagedNames(new Set(["x", "y"]));
  assert.deepEqual(await aliases.listManagedNames(), new Set(["x", "y"]));
  legacy.remove("sync");
  assert.deepEqual(legacy.list(), {});
});

test("alias facade: delete through the facade clears the marker and invalidates", async () => {
  await aliasFacade.setModelAlias("a", "p/m");
  await aliasFacade.markManagedModelAlias("a");
  const version = readCache.getModelCatalogCacheVersion();
  await aliasFacade.deleteModelAlias("a");
  assert.ok(readCache.getModelCatalogCacheVersion() > version);
  assert.deepEqual(await aliases.listManagedNames(), new Set());
  assert.deepEqual(await aliases.list(), {});
});

test("discovery repository: Promise CRUD with dedupe and newest-first ordering", async () => {
  const input = {
    providerId: "acme",
    method: "free_tier" as const,
    endpoint: "https://acme.example",
    authType: "none" as const,
    models: ["m1"],
    feasibility: 3,
    riskLevel: "low" as const,
    status: "pending" as const,
  };
  const first = await promised(discoveryResults.upsert(input));
  const second = await promised(discoveryResults.upsert({ ...input, feasibility: 5 }));
  assert.equal(second.id, first.id);
  assert.equal(second.feasibility, 5);

  const other = await discoveryResults.upsert({ ...input, providerId: "beta" });
  assert.deepEqual(
    (await promised(discoveryResults.list())).map((r) => r.id),
    [other.id, first.id]
  );
  assert.deepEqual(
    (await promised(discoveryResults.list("acme"))).map((r) => r.id),
    [first.id]
  );

  assert.deepEqual(await promised(discoveryResults.findById(first.id!)), second);
  const verified = await promised(discoveryResults.markVerified(first.id!));
  assert.equal(verified?.status, "verified");
  assert.ok(verified?.verifiedAt);
  assert.equal(await discoveryResults.markVerified(-1), null);
  assert.equal(await promised(discoveryResults.remove(first.id!)), true);
  assert.equal(await discoveryResults.remove(first.id!), false);
  assert.equal(await discoveryResults.findById(first.id!), null);
});

test("discovery facade and repository share one store", async () => {
  const row = discoveryFacade.upsertDiscoveryResult({
    providerId: "shared",
    method: "trial",
    endpoint: "e",
    authType: "none",
    feasibility: 1,
    riskLevel: "none",
    status: "pending",
  });
  assert.deepEqual(await discoveryResults.findById(row.id!), row);
  await discoveryResults.markVerified(row.id!);
  assert.equal(discoveryFacade.getDiscoveryResultById(row.id!)?.status, "verified");
});

test("service-model repository stores lists as given; the facade owns the merge", async () => {
  assert.deepEqual(await promised(serviceModels.list("tool")), []);
  await promised(serviceModels.replace("tool", [{ id: "raw" }]));
  assert.deepEqual(await serviceModels.list("tool"), [{ id: "raw" }], "no availability flag added");

  serviceModelFacade.saveServiceModels("tool", [{ id: "new" }]);
  assert.deepEqual(await serviceModels.list("tool"), [
    { id: "new", available: true },
    { id: "raw", available: false },
  ]);

  await promised(serviceModels.replace("tool", []));
  assert.deepEqual(serviceModelFacade.getServiceModels("tool"), []);
  const rows = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM key_value WHERE namespace = 'serviceModels'")
    .get() as { n: number };
  assert.equal(rows.n, 0, "an empty replace deletes the row");
});
