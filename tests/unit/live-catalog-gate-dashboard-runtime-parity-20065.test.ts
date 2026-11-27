/**
 * #20065: the provider dashboard's "Not in live catalog" flag must decide authority with
 * the same rule and inputs as the dispatch gate (src/sse/services/model.ts::lookupModelMeta
 * → getActiveSyncedCatalog with custom rows included). Before the fix the dashboard read
 * GET /api/synced-available-models, which builds its catalog WITHOUT custom rows, so a
 * provider whose live catalog held only operator custom rows was authoritative at
 * runtime (built-ins rejected) but not on the dashboard (no flag).
 *
 * Every case drives the real route + the real merge the page uses, and compares each
 * built-in row's flag with what getModelInfo answers for the same model.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20065-parity-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "live-catalog-parity-20065-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { addCustomModel, getCustomModels, replaceSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { GET } = await import("../../src/app/api/synced-available-models/route.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { mergeProviderModelListing } =
  await import("../../src/lib/providers/mergeProviderModelListing.ts");
const { readLiveCatalogGate } = await import("../../src/lib/providers/liveCatalogAdmission.ts");

const PROVIDER = "deepseek";
const CONNECTION_ID = "deepseek-parity-20065";
const REGISTRY = [
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
  { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
  { id: "deepseek-flash", name: "DeepSeek V4.1 Flash" },
];

type RouteBody = {
  authoritative: boolean;
  models: Array<{ id: string }>;
  liveCatalog?: unknown;
};

async function seedConnection(syncedIds: string[], syncedAt = new Date().toISOString()) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, now, now);
  await replaceSyncedAvailableModelsForConnection(
    PROVIDER,
    CONNECTION_ID,
    syncedIds.map((id) => ({ id, name: id, source: "imported" as const }))
  );
  db.prepare("UPDATE provider_connections SET synced_models_at = ? WHERE id = ?").run(
    syncedAt,
    CONNECTION_ID
  );
}

/** What the provider page renders: route payload → useProviderModels → merge. */
async function dashboardListing() {
  const response = await GET(
    new Request(`http://localhost/api/synced-available-models?provider=${PROVIDER}`)
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as RouteBody;
  const custom = (await getCustomModels(PROVIDER)) as Array<{ id: string; source?: string }>;
  const models = mergeProviderModelListing({
    providerId: PROVIDER,
    registryModels: REGISTRY,
    syncedModels: body.models,
    syncedCatalogAuthoritative: body.authoritative === true,
    liveCatalog: readLiveCatalogGate(body.liveCatalog),
    customModels: custom.map((model) => ({
      ...model,
      source: model.source === "imported" ? "imported" : "custom",
    })),
  });
  return { body, models };
}

async function runtimeRejects(modelId: string): Promise<boolean> {
  const info = (await getModelInfo(`${PROVIDER}/${modelId}`)) as { errorType?: string };
  return info.errorType === "model_not_found";
}

/** For every listed built-in row: flagged on the dashboard ⇔ rejected at dispatch. */
type ListedRow = { id: string; source?: string; liveCatalogMissing?: unknown };

async function assertFlagsMatchRuntime(models: ListedRow[]): Promise<ListedRow[]> {
  const builtIns = models.filter((model) => model.source === "system");
  for (const model of builtIns) {
    const flagged = model.liveCatalogMissing === true;
    assert.equal(flagged, await runtimeRejects(model.id), `flag/runtime mismatch: ${model.id}`);
  }
  return builtIns;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await updateSettings({ requireLogin: false });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("live catalog with only custom rows: dashboard authority equals the runtime's", async () => {
  await seedConnection([]);
  await addCustomModel(PROVIDER, "deepseek-v4-pro", "My V4 Pro");

  const runtimeCatalog = await getActiveSyncedCatalog(PROVIDER);
  assert.equal(runtimeCatalog.authoritative, true, "runtime gates on the custom-only catalog");

  const { body, models } = await dashboardListing();
  assert.equal(body.authoritative, false, "listing authority (custom rows excluded) unchanged");
  assert.deepEqual(body.models, [], "listing still excludes custom rows");
  assert.equal(readLiveCatalogGate(body.liveCatalog)?.authoritative, runtimeCatalog.authoritative);

  // Which rows are listed does not change: every built-in stays, plus the custom row.
  assert.deepEqual(
    models.map((model) => model.id).sort(),
    REGISTRY.map((model) => model.id).sort()
  );
  const builtIns = await assertFlagsMatchRuntime(models);
  assert.deepEqual(
    builtIns.filter((model) => model.liveCatalogMissing === true).map((model) => model.id),
    ["deepseek-v4-flash", "deepseek-flash"]
  );
});

test("normal live catalog with built-ins: listing and runtime unchanged", async () => {
  await seedConnection(["deepseek-flash", "deepseek-v4-pro"]);

  const { body, models } = await dashboardListing();
  assert.equal(body.authoritative, true);
  assert.equal(readLiveCatalogGate(body.liveCatalog)?.authoritative, true);
  // Authoritative listing stays exclusive: the retired built-in is not listed at all.
  assert.deepEqual(models.map((model) => model.id).sort(), ["deepseek-flash", "deepseek-v4-pro"]);
  assert.equal(
    models.some((model) => model.liveCatalogMissing === true),
    false
  );
  assert.equal(await runtimeRejects("deepseek-v4-flash"), true);
  assert.equal(await runtimeRejects("deepseek-v4-pro"), false);
});

test("non-authoritative (stale) live catalog: no missing flags, runtime fails open", async () => {
  await seedConnection(["deepseek-flash"], "2000-01-01T00:00:00.000Z");
  await addCustomModel(PROVIDER, "deepseek-v4-pro", "My V4 Pro");

  assert.equal((await getActiveSyncedCatalog(PROVIDER)).authoritative, false);
  const { body, models } = await dashboardListing();
  assert.equal(readLiveCatalogGate(body.liveCatalog)?.authoritative, false);
  // Static coverage stays listed (deepseek-v4-pro is the operator's custom row).
  assert.deepEqual(
    models.map((model) => model.id).sort(),
    REGISTRY.map((model) => model.id).sort()
  );
  const builtIns = await assertFlagsMatchRuntime(models);
  assert.deepEqual(
    builtIns.map((model) => model.id),
    ["deepseek-v4-flash", "deepseek-flash"]
  );
  assert.equal(
    models.some((model) => model.liveCatalogMissing === true),
    false
  );
});
