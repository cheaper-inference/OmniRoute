/**
 * Providers with no discovery config (web-cookie providers like gemini-web and
 * claude-web) answered the models route with ONLY the previously synced list once
 * one existed. A model sync re-imports what the route returns, so it re-imported
 * that same list forever and models added to the registry later (gemini-4-neon,
 * claude-haiku-5-5) never reached the connection's catalog. The route now puts the
 * current registry first and keeps synced extras behind it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-no-discovery-merge-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = async () => {
    throw new Error("no network call expected for a provider without discovery config");
  };
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function modelsFor(provider: string, synced: Array<{ id: string; name: string }>) {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-test`,
    apiKey: "cookie=value",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    provider,
    connection.id,
    synced.map((m) => ({ ...m, source: "imported" }))
  );
  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };
  return { source: body.source, ids: body.models.map((m) => m.id) };
}

const { getModelsByProviderId } = await import("../../src/shared/constants/models.ts");

const registryIds = (provider: string) =>
  (getModelsByProviderId(provider) || []).map((m: { id: string }) => m.id);

for (const provider of ["gemini-web", "claude-web"]) {
  test(`${provider}: a stale synced list no longer hides models in the registry`, async () => {
    const registry = registryIds(provider);
    assert.ok(registry.length > 1, "registry has models");
    // A list synced when the registry had only its first model, plus an id the registry
    // no longer has (e.g. one an older discovery path imported).
    const { source, ids } = await modelsFor(provider, [
      { id: registry[0], name: registry[0] },
      { id: "legacy-synced-only", name: "Legacy synced-only" },
    ]);
    assert.equal(source, "local_catalog");
    for (const id of registry) assert.ok(ids.includes(id), `${id} should be listed`);
    assert.ok(ids.includes("legacy-synced-only"), "synced extras are kept");
    assert.ok(
      ids.indexOf(registry[registry.length - 1]) < ids.indexOf("legacy-synced-only"),
      "registry first"
    );
    assert.equal(new Set(ids).size, ids.length, "no duplicates");
  });
}
