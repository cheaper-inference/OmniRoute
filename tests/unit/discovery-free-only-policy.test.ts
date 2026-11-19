import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The import-free-models-only setting must hold where models are READ for
// routing: the dispatch catalog, the /v1/models listing and the auto-combo
// pools. A refresh keeps paid rows as cached discovery (#17028) and a sync of a
// listing with no free model stores nothing, so both states must still leave
// paid models out — and an empty free set must not fall back to the static
// catalog.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-discovery-free-only-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const catalog = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const combo = await import("../../open-sse/services/combo.ts");
const published = await import("../../src/lib/db/apiKeys/publishedModelLookup.ts");

const originalFetch = globalThis.fetch;

const FREE = {
  id: "vendor/free-model:free",
  name: "Free model",
  pricing: { prompt: "0", completion: "0" },
};
const PAID = {
  id: "vendor/paid-model",
  name: "Paid model",
  pricing: { prompt: "0.000003", completion: "0.000015" },
};

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpenRouter(importFreeModelsOnly: boolean): Promise<{ id: string }> {
  return (await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: `openrouter-${importFreeModelsOnly ? "free" : "all"}`,
    apiKey: "openrouter-fixture-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true, importFreeModelsOnly },
  })) as { id: string };
}

/** Answer the upstream listing; the sync's discovery loopback runs the real route in-process. */
function serveListing(connectionId: string, listing: unknown[]) {
  globalThis.fetch = async (input, init) => {
    const rawUrl = input instanceof Request ? input.url : String(input);
    const url = new URL(rawUrl);
    if (url.pathname.includes("__readiness_probe__")) return new Response("", { status: 404 });
    if (url.pathname === `/api/providers/${connectionId}/models`) {
      return providerModelsRoute.GET(new Request(rawUrl, init), { params: { id: connectionId } });
    }
    assert.equal(rawUrl, "https://openrouter.ai/api/v1/models");
    return Response.json({ data: listing });
  };
}

async function refresh(connectionId: string, listing: unknown[]) {
  serveListing(connectionId, listing);
  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
  assert.equal(response.status, 200);
}

async function sync(connectionId: string, listing: unknown[]) {
  serveListing(connectionId, listing);
  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connectionId } }
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

async function storedIds(connectionId: string) {
  const synced = await modelsDb.getSyncedAvailableModelsForConnection("openrouter", connectionId);
  return synced.map((model) => model.id).sort();
}

async function dispatchAdmits(modelId: string) {
  const reconciled = await catalog.reconcileProvidersWithActiveSyncedCatalog(
    ["openrouter"],
    modelId
  );
  return reconciled.providers.includes("openrouter");
}

async function poolModels() {
  const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
  const virtual = prepared.regularCandidates
    .filter((candidate) => candidate.provider === "openrouter")
    .map((candidate) => candidate.model);
  const expanded = (await combo.expandAutoComboCandidatePool([], { config: {} }))
    .filter((target) => target.provider === "openrouter")
    .map((target) => target.modelStr);
  return { virtual, expanded };
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a free-only sync of a listing with no free model stores nothing and reports it", async () => {
  const connection = await seedOpenRouter(true);

  const { response, body } = await sync(connection.id, [PAID]);

  assert.equal(
    response.status,
    200,
    "an all-paid listing is a successful sync with nothing to keep"
  );
  assert.equal(body.freeFilterEmpty, true);
  assert.deepEqual(await storedIds(connection.id), []);
});

test("the stale cut also removes paid rows a refresh cached before the sync", async () => {
  const connection = await seedOpenRouter(true);
  // The refresh keeps the full listing as cached discovery, paid rows marked non-free (#17028).
  await refresh(connection.id, [PAID]);
  assert.ok((await storedIds(connection.id)).includes(PAID.id));

  const { response } = await sync(connection.id, [PAID]);

  assert.equal(response.status, 200);
  assert.deepEqual(await storedIds(connection.id), []);
});

test("after that sync the provider has nothing callable: no paid model, no static fallback", async () => {
  const connection = await seedOpenRouter(true);
  await sync(connection.id, [PAID]);

  const active = await catalog.getActiveSyncedCatalog("openrouter");
  assert.equal(
    active.authoritative,
    true,
    "an empty free set is a synced answer, not a missing catalog"
  );
  assert.deepEqual(active.models, []);
  assert.equal(await dispatchAdmits(PAID.id), false, "dispatch must reject the paid model");
  assert.equal(
    await dispatchAdmits("auto"),
    false,
    "dispatch must not fall back to the static catalog"
  );

  const listing = await catalog.getAllActiveSyncedModels();
  assert.equal(listing.openrouter, undefined, "/v1/models lists nothing for the provider");

  const pools = await poolModels();
  assert.deepEqual(
    pools.virtual,
    [],
    "the virtual auto pool must not fall back to the static catalog"
  );
  assert.deepEqual(
    pools.expanded,
    [],
    "the expanded auto pool must not fall back to the static catalog"
  );
});

test("between a refresh and the next sync, routing serves only the free models", async () => {
  const connection = await seedOpenRouter(true);
  // No sync yet: the stored rows still hold the paid model, marked non-free.
  await refresh(connection.id, [FREE, PAID]);
  assert.deepEqual(await storedIds(connection.id), [PAID.id, FREE.id].sort());

  const active = await catalog.getActiveSyncedCatalog("openrouter");
  assert.equal(active.authoritative, true);
  assert.deepEqual(
    active.models.map((model) => model.id),
    [FREE.id]
  );
  assert.equal(await dispatchAdmits(FREE.id), true);
  assert.equal(await dispatchAdmits(PAID.id), false);

  const listing = await catalog.getAllActiveSyncedModels();
  assert.deepEqual(
    (listing.openrouter ?? []).map((model) => model.id),
    [FREE.id]
  );

  const pools = await poolModels();
  assert.deepEqual(pools.virtual, [FREE.id]);
  assert.deepEqual(pools.expanded, [`openrouter/${FREE.id}`]);

  // A key limited to published models may call the free one only.
  assert.ok(await published.findPublishedModel("openrouter", FREE.id));
  assert.equal(await published.findPublishedModel("openrouter", PAID.id), null);
});

test("a connection that imports every model keeps the paid ones callable", async () => {
  const connection = await seedOpenRouter(false);
  await refresh(connection.id, [FREE, PAID]);

  assert.equal(await dispatchAdmits(PAID.id), true);
  assert.deepEqual((await poolModels()).virtual.sort(), [PAID.id, FREE.id].sort());
});
