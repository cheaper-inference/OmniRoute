import assert from "node:assert/strict";
import test from "node:test";

import { obscurifyProvider } from "../../open-sse/config/providers/registry/obscurify/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

// tests/_setup/isolateDataDir.ts gives this file its own temp DATA_DIR.
test.after(() => core.resetDbInstance());

const CHAT_URL = "https://obscurify.ai/v1/chat/completions";
const MODELS_URL = "https://obscurify.ai/v1/models";

test("obscurify is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(obscurifyProvider.id, "obscurify");
  assert.equal(obscurifyProvider.alias, "obscurify");
  assert.equal(obscurifyProvider.format, "openai");
  assert.equal(obscurifyProvider.executor, "default");
  assert.equal(obscurifyProvider.authType, "apikey");
  assert.equal(obscurifyProvider.authHeader, "bearer");
  assert.equal(obscurifyProvider.baseUrl, CHAT_URL);
  assert.equal(obscurifyProvider.modelsUrl, MODELS_URL);
  assert.equal(obscurifyProvider.passthroughModels, true);
});

test("obscurify leaves model discovery to the live /v1/models catalog", () => {
  // The catalog changes as models are added and retired, so nothing is
  // hardcoded: an empty list plus passthroughModels keeps the picker in sync.
  assert.deepEqual(obscurifyProvider.models, []);
});

test("obscurify is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.obscurify?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.obscurify, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.obscurify?.id, "obscurify");
  assert.equal(APIKEY_PROVIDERS.obscurify?.name, "Obscurify.ai");
  assert.ok((await getExecutor("obscurify")) instanceof DefaultExecutor);
});

test("obscurify accepts the lab/model ids its catalog returns", () => {
  assert.equal(isValidModel("obscurify", "deepseek/deepseek-v4-flash"), true);
});

test("obscurify claims no free tier and no unexercised capability", () => {
  const metadata = APIKEY_PROVIDERS.obscurify as Record<string, unknown>;
  assert.equal(metadata.hasFree, undefined);
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});

test("obscurify model discovery sends the connection key and lists the live catalog", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "obscurify",
    authType: "apikey",
    name: "obscurify-live",
    apiKey: "sk-obs1_test",
  });

  const seen: Array<{ url: string; authorization: string | null }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    seen.push({ url, authorization: new Headers(init?.headers).get("authorization") });
    if (url === MODELS_URL) {
      return Response.json({
        object: "list",
        data: [{ id: "deepseek/deepseek-v4-flash", object: "model", owned_by: "deepseek" }],
      });
    }
    return new Response("not found", { status: 404 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      provider: string;
      source?: string;
      models: Array<{ id: string }>;
    };
    assert.equal(body.provider, "obscurify");
    assert.equal(body.source, "api");
    const call = seen.find((c) => c.url === MODELS_URL);
    assert.ok(call, `should have fetched ${MODELS_URL}`);
    assert.equal(call.authorization, "Bearer sk-obs1_test");
    // A single returned model is enough to show up in the selectable list.
    assert.deepEqual(
      body.models.map((model) => model.id),
      ["deepseek/deepseek-v4-flash"]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
