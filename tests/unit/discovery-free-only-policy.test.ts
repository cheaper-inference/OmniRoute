import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-discovery-free-only-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

const originalFetch = globalThis.fetch;

const LISTING = {
  data: [
    {
      id: "vendor/free-model:free",
      name: "Free model",
      pricing: { prompt: "0", completion: "0" },
    },
    {
      id: "vendor/paid-model",
      name: "Paid model",
      pricing: { prompt: "0.000003", completion: "0.000015" },
    },
  ],
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

async function refresh(connectionId: string) {
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://openrouter.ai/api/v1/models");
    return Response.json(LISTING);
  };
  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

async function storedIds(connectionId: string) {
  const synced = await modelsDb.getSyncedAvailableModelsForConnection("openrouter", connectionId);
  return synced.map((model) => model.id).sort();
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a sync of a free-only connection whose listing holds no free model leaves nothing callable", async () => {
  const connection = await seedOpenRouter(true);
  globalThis.fetch = async (url) => {
    const target = String(url);
    // The sync reads discovery through its loopback; refusing it runs the route in-process.
    if (target.startsWith("http://127.0.0.1")) throw new TypeError("fetch failed: ECONNREFUSED");
    assert.equal(target, "https://openrouter.ai/api/v1/models");
    return Response.json({ data: [LISTING.data[1]] });
  };

  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(
    response.status,
    200,
    "an all-paid listing is a successful sync with nothing to keep"
  );
  assert.equal(body.freeFilterEmpty, true);
  assert.deepEqual(await storedIds(connection.id), [], "the paid model must not stay callable");
});

test("the stale cut also removes paid rows a refresh cached before the sync", async () => {
  const connection = await seedOpenRouter(true);
  // The refresh keeps the full listing as cached discovery, paid rows marked non-free (#17028).
  await refresh(connection.id);
  assert.ok((await storedIds(connection.id)).includes("vendor/paid-model"));

  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.startsWith("http://127.0.0.1")) throw new TypeError("fetch failed: ECONNREFUSED");
    return Response.json({ data: [LISTING.data[1]] });
  };
  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await storedIds(connection.id), []);
});
