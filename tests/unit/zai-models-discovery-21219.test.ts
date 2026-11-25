/**
 * #21219 — the z.ai API-key provider (`zai`) had neither a PROVIDER_MODELS_CONFIG
 * entry nor a registry `modelsUrl`, so getDiscoveryClass("zai") was "static-only"
 * and model import answered "Model discovery is not configured for this provider —
 * using local catalog" although api.z.ai serves an OpenAI-shaped model list
 * (live probe 2026-11-25: GET /api/paas/v4/models -> 200, Bearer auth, 13 ids
 * including glm-5.4 that the static registry does not list).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zai-discovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { PROVIDER_MODELS_CONFIG } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");
const { getDiscoveryClass } = await import("../../src/lib/providerModels/discoveryClass.ts");

const originalFetch = globalThis.fetch;

const LIVE_LIST = {
  object: "list",
  data: [
    { id: "glm-5.4", object: "model", created: 1, owned_by: "z-ai" },
    { id: "glm-5.3", object: "model", created: 1, owned_by: "z-ai" },
    { id: "glm-4.7-flash", object: "model", created: 1, owned_by: "z-ai" },
  ],
};

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("zai has a live /models discovery config with Bearer auth", () => {
  const cfg = PROVIDER_MODELS_CONFIG.zai;
  assert.ok(cfg, "expected a zai entry in PROVIDER_MODELS_CONFIG");
  assert.equal(cfg.method, "GET");
  assert.equal(cfg.url, "https://api.z.ai/api/paas/v4/models");
  assert.equal(cfg.authHeader, "Authorization");
  assert.equal(cfg.authPrefix, "Bearer ");
});

test("zai discovery is classified openai-compat, not static-only", () => {
  assert.equal(getDiscoveryClass("zai"), "openai-compat");
  // zai-web is a different surface (cookie session) and stays curated.
  assert.equal(getDiscoveryClass("zai-web"), "static-only");
});

test("zai parseResponse maps the OpenAI-style list and tolerates alternate envelopes", () => {
  const cfg = PROVIDER_MODELS_CONFIG.zai;
  assert.deepEqual(
    cfg.parseResponse(LIVE_LIST).map((m: { id: string }) => m.id),
    ["glm-5.4", "glm-5.3", "glm-4.7-flash"]
  );
  assert.deepEqual(cfg.parseResponse({ models: [{ id: "glm-5" }] }), [{ id: "glm-5" }]);
  assert.deepEqual(cfg.parseResponse({}), []);
});

test("provider models route imports the live z.ai catalog instead of the local fallback", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "zai",
    authType: "apikey",
    name: "zai-discovery-test",
    apiKey: "zai-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });

  let calledUrl = "";
  let authorization = "";
  globalThis.fetch = async (url, init) => {
    calledUrl = String(url);
    authorization = new Headers(init?.headers).get("authorization") ?? "";
    return Response.json(LIVE_LIST);
  };

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.equal(calledUrl, "https://api.z.ai/api/paas/v4/models");
  assert.equal(authorization, "Bearer zai-test-key");
  const ids = body.models.map((m) => m.id);
  assert.ok(ids.includes("glm-5.4"), "a live model missing from the static registry is imported");
});

test("provider models route falls back to the local z.ai catalog when the live fetch fails", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "zai",
    authType: "apikey",
    name: "zai-discovery-fallback",
    apiKey: "zai-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });
  globalThis.fetch = async () => new Response("upstream down", { status: 500 });

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.ok(body.models.length > 0);
});
