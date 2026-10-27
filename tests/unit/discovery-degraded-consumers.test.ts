import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-discovery-consumers-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-discovery-consumers-secret-" + Date.now();
}

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { buildModelSyncInternalHeaders } =
  await import("../../src/shared/services/modelSyncScheduler.ts");
const { getMcpModelsCatalog } = await import("../../open-sse/mcp-server/server.ts");
const { listModelsCatalogOutput } = await import("../../open-sse/mcp-server/schemas/tools.ts");
const originalFetch = globalThis.fetch;

/**
 * Three consumers read the discovery response: the model picker, which lists
 * the models of a connection, the model synchronization route, which refuses
 * to sync a fallback catalog, and the model catalog tool, which lists the
 * models of every provider.
 *
 * They must read the reason of the degradation — the picker must say WHY, the
 * refusal must say WHY, and the tool must publish WHY per provider.
 */

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  syncModelsRoute.__resetLoopbackReadinessForTests?.();
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  mkdirSync(dataDir, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the synchronization refusal carries the reason of the degraded discovery", async () => {
  const connection = await createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    apiKey: "test-key",
  });

  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) return new Response(null, { status: 404 });
    return Response.json({
      models: [{ id: "fallback-model", name: "Fallback Model" }],
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
      degraded: true,
      error: "HTTP 500",
    });
  };

  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 502);
  assert.equal(body.error, "HTTP 500");
  assert.equal(body.warning, "API unavailable — using local catalog");
  assert.equal(body.source, "local_catalog");
});

test("the model catalog tool marks the fallback models and publishes the reason", async () => {
  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-github", provider: "github", isActive: true },
      ],
      fetchJson: async () => ({
        source: "local_catalog",
        warning: "API unavailable — using local catalog",
        degraded: true,
        error: "HTTP 500",
        models: [{ id: "gpt-4.1", owned_by: "github", supportedEndpoints: ["chat"] }],
      }),
    }
  );

  assert.equal(result.models[0]?.status, "degraded");
  assert.deepEqual(result.degradedProviders, [
    { provider: "github", connectionId: "conn-github", cause: "HTTP 500" },
  ]);
});

test("the model catalog tool omits the degraded providers when there is none", async () => {
  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-github", provider: "github", isActive: true },
      ],
      fetchJson: async () => ({
        source: "api",
        models: [{ id: "gpt-4.1", owned_by: "github", supportedEndpoints: ["chat"] }],
      }),
    }
  );

  assert.equal("degradedProviders" in result, false);
});

test("the model picker asks for no catalog when the connection carries no usable id", async () => {
  // The helper of the picker lives in its own module: imported here, so the
  // case fails on its own assertion when the module is not there.
  const { fetchProviderModels } =
    await import("../../src/shared/components/modelSelectDiscovery.ts");

  const asked: string[] = [];
  globalThis.fetch = async (url) => {
    asked.push(String(url));
    return Response.json({ models: [{ id: "live-model", name: "Live Model" }] });
  };

  const discovery = await fetchProviderModels("openrouter", 0);

  assert.deepEqual(discovery.models, []);
  assert.deepEqual(asked, []);
});

test("a degraded provider without a readable reason is still listed", async () => {
  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-github", provider: "github", isActive: true },
      ],
      fetchJson: async () => ({
        source: "local_catalog",
        warning: "API unavailable — using local catalog",
        degraded: true,
        models: [{ id: "gpt-4.1", owned_by: "github", supportedEndpoints: ["chat"] }],
      }),
    }
  );

  assert.deepEqual(result.degradedProviders, [{ provider: "github", connectionId: "conn-github" }]);
  assert.doesNotThrow(() =>
    listModelsCatalogOutput.parse({
      models: [],
      source: "local_catalog",
      mode: "models",
      total: 0,
      returned: 0,
      limit: 100,
      nextCursor: null,
      degradedProviders: [{ provider: "github" }],
    })
  );
});
