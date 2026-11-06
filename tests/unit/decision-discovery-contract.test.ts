import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "decision-discovery-contract-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "decision-discovery-test-secret";
const { discoverDecisionModels } = await import("../../open-sse/handlers/decisionDiscovery.ts");
const { resolveDecisionBackend } = await import("../../open-sse/config/decisionRegistry.ts");
const { resolveDecisionProtocol } = await import("../../src/shared/constants/decisionProtocol.ts");
const { getOpenRouterModelType } = await import("../../src/app/api/v1/models/catalogOpenrouter.ts");
const { isChatSelectableModel } = await import("../../open-sse/services/modelEndpointPolicy.ts");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const storedModels = await import("../../src/lib/db/models.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const settings = await import("../../src/lib/db/settings.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { GET } = await import("../../src/app/api/v1/systemone/models/route.ts");
const originalFetch = globalThis.fetch;
const upstreamRows = [
  { id: "aaa/chat", architecture: { input_modalities: ["text"], output_modalities: ["text"] } },
  {
    id: "typesafe/jev-1.13",
    architecture: { input_modalities: ["text"], output_modalities: ["decision"] },
  },
  {
    id: "example/mixed",
    architecture: { input_modalities: ["text"], output_modalities: ["text", "decision"] },
  },
];

test("native discovery validates row identifiers and preserves provider-specific ID selection", async () => {
  const backend = resolveDecisionBackend("basal", {});
  const fetcher = async () =>
    Response.json({
      data: [
        null,
        {},
        { id: "" },
        { id: 1 },
        { id: "x".repeat(513) },
        { id: "by-id", name: "ignored" },
        { name: "by-name" },
        { model: "by-model" },
      ],
    });
  const signal = new AbortController().signal;
  const models = await discoverDecisionModels(backend, {}, fetcher, signal);
  assert.deepEqual(
    models.map((model) => model.id),
    ["basal/by-id", "basal/by-name", "basal/by-model"]
  );
  const filtered = await discoverDecisionModels(backend, {}, fetcher, signal, { model: "by-name" });
  assert.deepEqual(
    filtered.map((model) => model.id),
    ["basal/by-name"]
  );
  const cloudflare = resolveDecisionBackend("cloudflare-ai", {
    providerSpecificData: { accountId: "test" },
  });
  const cloudflareModels = await discoverDecisionModels(
    cloudflare,
    {},
    async () =>
      Response.json({
        result: [
          { id: "opaque-id", name: "@cf/cloudflare/clef" },
          { id: "@cf/cloudflare/clef-flash" },
        ],
      }),
    signal
  );
  assert.deepEqual(
    cloudflareModels.map((model) => model.id),
    ["cloudflare-ai/@cf/cloudflare/clef"]
  );
});

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5 });
  fs.mkdirSync(dataDir, { recursive: true });
  catalog.__resetCatalogBuilderRunsForTest();
  keys.clearApiKeyCaches();
  await settings.updateSettings({ hideAutoCombos: true, hideNoThinkVariants: true });
  globalThis.fetch = (async (url: RequestInfo | URL) => {
    assert.equal(String(url), "https://openrouter.ai/api/v1/models");
    return Response.json({ data: upstreamRows });
  }) as typeof fetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5 });
});

async function seed(allowedModels?: string[]) {
  const connection = await providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "discovery",
    apiKey: "test-only",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const key = await keys.createApiKey("discovery", "test", [], {
    allowedConnections: [String(connection.id)],
    ...(allowedModels ? { modelAccessMode: "restricted", allowedModels } : {}),
  });
  keys.clearApiKeyCaches();
  return key.key;
}

function request(key: string, query = "", endpoint = "systemone/models") {
  return new Request(`http://localhost/v1/${endpoint}${query}`, {
    headers: { authorization: `Bearer ${key}` },
  });
}

test("arbitrary native Decisions prefixes publish explicit protocol metadata", async () => {
  const credentials = {
    providerSpecificData: {
      decision: {
        format: "decisions",
        endpoint: "https://example.com/v1/decisions",
        models: ["native-model"],
      },
    },
  };
  const backend = { ...resolveDecisionBackend("custom", credentials), provider: "my-native" };
  const models = await discoverDecisionModels(
    backend,
    credentials,
    async () => Response.json({ data: [{ id: "native-model" }] }),
    new AbortController().signal
  );
  assert.equal(models.length, 1);
  assert.equal(resolveDecisionProtocol(models[0]), "decisions");
  assert.equal((models[0] as unknown as Record<string, unknown>).api_format, "decisions");
});

test("OpenRouter decision-only and mixed output modalities retain distinct capabilities", async () => {
  assert.equal(getOpenRouterModelType(["text"], ["decision"]), "decisions");
  assert.equal(getOpenRouterModelType(["text"], ["text", "decision"]), "chat");
  const key = await seed();
  const response = await catalog.getUnifiedModelsResponse(request(key, "", "models"));
  const { data } = await response.json();
  const decision = data.find((row: { id: string }) => row.id === "openrouter/typesafe/jev-1.13");
  const mixed = data.find((row: { id: string }) => row.id === "openrouter/example/mixed");
  assert.equal(decision.type, "decisions");
  assert.equal(decision.api_format, "systemone");
  assert.deepEqual(decision.supported_endpoints, ["systemone"]);
  assert.equal(mixed.type, "chat");
  assert.deepEqual(mixed.supported_endpoints, ["chat", "systemone"]);
  assert.equal(
    isChatSelectableModel("openrouter", {
      id: decision.id,
      supportedEndpoints: decision.supported_endpoints,
    }),
    false
  );
  assert.equal(
    isChatSelectableModel("openrouter", {
      id: mixed.id,
      supportedEndpoints: mixed.supported_endpoints,
    }),
    true
  );
});

test("pagination applies to the final decision catalog after chat rows and key filtering", async () => {
  const key = await seed();
  const first = await GET(request(key, "?limit=1"));
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("X-OmniRoute-Catalog-Status"), "complete");
  const page1 = await first.json();
  assert.equal(page1.data.length, 1);
  assert.equal(page1.has_more, true);
  const second = await GET(request(key, `?limit=1&after=${encodeURIComponent(page1.last_id)}`));
  const page2 = await second.json();
  assert.equal(page2.data.length, 1);
  assert.equal(page2.has_more, false);
  assert.deepEqual([...page1.data, ...page2.data].map((row: { id: string }) => row.id).sort(), [
    "openrouter/example/mixed",
    "openrouter/typesafe/jev-1.13",
  ]);
  for (const row of [...page1.data, ...page2.data]) assert.equal(row.api_format, "systemone");
});

test("decision catalog preserves exact authorized model IDs", async () => {
  const key = await seed(["openrouter/typesafe/jev-1.13"]);
  const response = await GET(request(key, "?limit=1"));
  const body = await response.json();
  assert.deepEqual(
    body.data.map((row: { id: string }) => row.id),
    ["openrouter/typesafe/jev-1.13"]
  );
  assert.equal(body.has_more, false);
});

test("a failed OpenRouter discovery cannot masquerade as a complete empty catalog", async () => {
  const key = await seed();
  globalThis.fetch = async () => new Response(null, { status: 503 });
  const response = await GET(request(key));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("X-OmniRoute-Catalog-Status"), "unavailable");
});

test("malformed upstream discovery is unavailable rather than an empty success", async () => {
  const key = await seed();
  globalThis.fetch = async () => Response.json({ error: "unavailable" });
  const response = await GET(request(key));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("X-OmniRoute-Catalog-Status"), "unavailable");
});

test("a forbidden provider connection contributes no legacy rows", async () => {
  const key = await seed();
  await providers.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    name: "forbidden",
    apiKey: "test-forbidden",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const response = await GET(request(key));
  assert.equal(response.status, 200);
  const { data } = await response.json();
  assert.ok(data.length > 0);
  assert.ok(data.every((row: { id: string }) => row.id.startsWith("openrouter/")));
});

test("legacy TypeSafe rows explicitly advertise System One", async () => {
  const connection = await providers.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    name: "legacy",
    apiKey: "test-legacy",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await storedModels.replaceSyncedAvailableModelsForConnection("typesafe", String(connection.id), [
    { id: "jev-latest", source: "imported", supportedEndpoints: ["decisions"] },
  ]);
  const key = await keys.createApiKey("legacy", "test", [], {
    allowedConnections: [String(connection.id)],
  });
  const response = await GET(request(key.key));
  const { data } = await response.json();
  assert.ok(data.length > 0);
  assert.ok(data.every((row: { api_format: string }) => row.api_format === "systemone"));
});
