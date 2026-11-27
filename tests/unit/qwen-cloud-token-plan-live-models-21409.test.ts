/**
 * Regression tests for #21409:
 *   `qwen-cloud-token-plan` model discovery must query the authenticated regional
 *   OpenAI-compatible `/compatible-mode/v1/models` endpoint (with DashScope chat-model
 *   filtering) rather than the lagging public Token Plan pricing catalog.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21409-qwen-token-plan-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { isTokenPlanCatalogProvider } =
  await import("../../src/lib/providerModels/tokenPlanModelDiscovery.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#21409 qwen-cloud-token-plan is excluded from the public Token Plan catalog shortcut while bailian-coding-plan stays on it", () => {
  assert.equal(isTokenPlanCatalogProvider("qwen-cloud-token-plan"), false);
  assert.equal(isTokenPlanCatalogProvider("bailian-coding-plan"), true);
});

test("#21409 qwen-cloud-token-plan (global-sg) imports live models including qwen4-max and filters non-chat entries", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "qwen-cloud-token-plan",
    authType: "apikey",
    name: "qct-sg",
    apiKey: "sk-qct-live-sg",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { region: "global-sg", autoFetchModels: true },
  });

  let calledUrl = "";
  let authHeader = "";
  let method = "";
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calledUrl = String(url);
    method = init?.method || "GET";
    const headers = new Headers(init?.headers);
    authHeader = headers.get("authorization") || "";
    return Response.json({
      object: "list",
      data: [
        { id: "qwen4-max", object: "model" },
        { id: "qwen3.8-flash", object: "model" },
        { id: "deepseek-v4-pro", object: "model" },
        { id: "glm-5.2", object: "model" },
        { id: "wan2.7-image", object: "model" },
        { id: "wan3.0-video", object: "model" },
        { id: "qwen-image-3.0-pro", object: "model" },
        { id: "qwen-audio-3.0-asr-flash", object: "model" },
        { id: "auto", object: "model" },
      ],
    });
  }) as typeof fetch;

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.equal(method, "GET");
  assert.equal(
    calledUrl,
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/models"
  );
  assert.equal(authHeader, "Bearer sk-qct-live-sg");

  const ids = body.models.map((m) => m.id);
  assert.ok(ids.includes("qwen4-max"), "live qwen4-max must be imported");
  assert.ok(ids.includes("qwen3.8-flash"));
  assert.ok(ids.includes("deepseek-v4-pro"));
  assert.ok(ids.includes("glm-5.2"));
  for (const excluded of [
    "wan2.7-image",
    "wan3.0-video",
    "qwen-image-3.0-pro",
    "qwen-audio-3.0-asr-flash",
    "auto",
  ]) {
    assert.ok(!ids.includes(excluded), `non-chat model ${excluded} must be excluded`);
  }
});

test("#21409 qwen-cloud-token-plan (china-beijing) queries the Beijing regional /models endpoint", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "qwen-cloud-token-plan",
    authType: "apikey",
    name: "qct-bj",
    apiKey: "sk-qct-live-bj",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { region: "china-beijing", autoFetchModels: true },
  });

  let calledUrl = "";
  let authHeader = "";
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calledUrl = String(url);
    const headers = new Headers(init?.headers);
    authHeader = headers.get("authorization") || "";
    return Response.json({
      object: "list",
      data: [
        { id: "qwen4-max", object: "model" },
        { id: "wan3.0-video", object: "model" },
      ],
    });
  }) as typeof fetch;

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.equal(
    calledUrl,
    "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/models"
  );
  assert.equal(authHeader, "Bearer sk-qct-live-bj");
  assert.deepEqual(
    body.models.map((m) => m.id),
    ["qwen4-max"]
  );
});
