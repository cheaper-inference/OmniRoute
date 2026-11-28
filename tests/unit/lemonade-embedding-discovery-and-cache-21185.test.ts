/**
 * Regression tests for #21185:
 *   1. `detectModelModality` / `inferKnownEmbeddingDimensions` infers 768 dims for
 *      versioned `embeddinggemma-2` (not only exact `"embeddinggemma"`).
 *   2. `/api/memory/embedding-providers` (`listEmbeddingProviders`) merges synced and
 *      custom embedding models for built-in curated providers like `lemonade` while
 *      excluding chat-only models.
 *   3. `/api/settings/cache-config/embedding-options` (`getEmbeddingOptions`) surfaces
 *      discovered `embeddinggemma-2` with 768 dimensions under both `lemonade` and
 *      `openai-compatible-chat-*` nodes even when stored synced rows lack `dimensions`.
 *   4. `PUT /api/settings/cache-config` persists `embeddinggemma-2` + 768 dims cleanly.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21185-lemonade-emb-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { detectModelModality, normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { listEmbeddingProviders } = await import("../../src/lib/memory/embedding/index.ts");
const { getEmbeddingOptions } =
  await import("../../src/app/api/settings/cache-config/embeddingOptions.ts");
const cacheConfigRoute = await import("../../src/app/api/settings/cache-config/route.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#21185: detectModelModality infers 768 dimensions for versioned embeddinggemma-2", () => {
  const modality = detectModelModality(
    { id: "embeddinggemma-2", labels: ["embeddings"] },
    "lemonade"
  );
  assert.equal(modality.isEmbedding, true);
  assert.equal(modality.dimensions, 768);

  const normalized = normalizeDiscoveredModels(
    [
      { id: "embeddinggemma-2", labels: ["embeddings"], context_length: 8192 },
      { id: "harrier-oss-v1-0.6b", labels: ["embeddings"] },
      { id: "qwen3-8b", supportedEndpoints: ["chat"] },
    ],
    "lemonade"
  );
  const gemma = normalized.find((m) => m.id === "embeddinggemma-2");
  assert.equal(gemma?.modelType, "embedding");
  assert.equal(gemma?.dimensions, 768);
});

test("#21185: listEmbeddingProviders merges synced & custom Lemonade embedding models and excludes chat models", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "lemonade",
    authType: "apikey",
    name: "Lemonade LAN",
    apiKey: "lemonade-local-key",
    isActive: true,
    providerSpecificData: { baseUrl: "http://192.168.31.246:13305/api/v1" },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "lemonade",
    (conn as { id: string }).id,
    [
      {
        id: "embeddinggemma-2",
        name: "embeddinggemma-2",
        modelType: "embedding",
        supportedEndpoints: ["embeddings"],
        inputTokenLimit: 8192,
      },
      {
        id: "qwen3-8b",
        name: "qwen3-8b",
        modelType: "chat",
        supportedEndpoints: ["chat"],
      },
    ]
  );
  await modelsDb.addCustomModel(
    "lemonade",
    "bge-small-en-v1.5",
    "BGE Small EN",
    "manual",
    "embeddings",
    ["embeddings"]
  );
  invalidateDbCache("connections");

  const providers = await listEmbeddingProviders();
  const lemonade = providers.find((p) => p.provider === "lemonade");
  assert.ok(lemonade, "lemonade provider must be listed");
  assert.equal(lemonade.hasKey, true);

  const byId = new Map(lemonade.models.map((m) => [m.id, m]));
  assert.equal(byId.get("lemonade/harrier-oss-v1-0.6b")?.dimensions, 1024);
  assert.equal(
    byId.get("lemonade/embeddinggemma-2")?.dimensions,
    768,
    "synced embeddinggemma-2 must appear under lemonade with 768 dimensions"
  );
  assert.equal(
    byId.get("lemonade/bge-small-en-v1.5")?.dimensions,
    384,
    "custom embedding model must appear under lemonade with inferred dimensions"
  );
  assert.equal(byId.has("lemonade/qwen3-8b"), false, "chat-only model must not be listed");
});

test("#21185: getEmbeddingOptions infers 768 dims for synced embeddinggemma-2 under both lemonade and compatible nodes, and PUT cache-config persists it", async () => {
  const lemonadeConn = await providersDb.createProviderConnection({
    provider: "lemonade",
    authType: "apikey",
    name: "Lemonade Built-in",
    apiKey: "lemonade-key",
    isActive: true,
    providerSpecificData: { baseUrl: "http://192.168.31.246:13305/api/v1" },
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "lemonade",
    (lemonadeConn as { id: string }).id,
    [
      {
        id: "embeddinggemma-2",
        name: "embeddinggemma-2",
        modelType: "embedding",
        supportedEndpoints: ["embeddings"],
        inputTokenLimit: 8192,
      },
    ]
  );

  await providersDb.createProviderNode({
    id: "openai-compatible-chat-lemonade",
    type: "openai-compatible",
    name: "Lemonade",
    prefix: "lemonade-compat",
    apiType: "chat",
    baseUrl: "http://192.168.31.246:13305/api/v1",
    modelsPath: "/models",
  });
  const compatConn = await providersDb.createProviderConnection({
    provider: "openai-compatible-chat-lemonade",
    authType: "apikey",
    name: "Lemonade",
    apiKey: "lemonade-key",
    isActive: true,
    providerSpecificData: { baseUrl: "http://192.168.31.246:13305/api/v1" },
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openai-compatible-chat-lemonade",
    (compatConn as { id: string }).id,
    [
      {
        id: "embeddinggemma-2",
        name: "embeddinggemma-2",
        modelType: "embedding",
        supportedEndpoints: ["embeddings"],
        inputTokenLimit: 8192,
      },
    ]
  );
  invalidateDbCache("nodes");
  invalidateDbCache("connections");

  const options = await getEmbeddingOptions();
  for (const providerId of ["lemonade", "openai-compatible-chat-lemonade"]) {
    const providerOpt = options.find((p) => p.id === providerId);
    assert.ok(providerOpt, `${providerId} must be present in embedding options`);
    const gemma = providerOpt.models.find((m) => m.rawId === "embeddinggemma-2");
    assert.ok(gemma, `embeddinggemma-2 must appear under ${providerId}`);
    assert.equal(gemma.dimensions, 768, `embeddinggemma-2 under ${providerId} must have 768 dims`);
    assert.equal(gemma.maxTokens, 8192);
  }

  const putRes = await cacheConfigRoute.PUT(
    new Request("http://localhost/api/settings/cache-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        semanticCacheEnabled: true,
        semanticCacheVectorEnabled: true,
        semanticCacheEmbeddingProvider: "lemonade",
        semanticCacheEmbeddingModel: "embeddinggemma-2",
        semanticCacheEmbeddingDimension: 768,
        semanticCacheEmbeddingBaseUrl: "http://192.168.31.246:13305/api/v1",
      }),
    }) as never
  );
  assert.equal(putRes.status, 200);

  const getRes = await cacheConfigRoute.GET(
    new Request("http://localhost/api/settings/cache-config") as never
  );
  const saved = (await getRes.json()) as Record<string, unknown>;
  assert.equal(saved.semanticCacheEmbeddingProvider, "lemonade");
  assert.equal(saved.semanticCacheEmbeddingModel, "embeddinggemma-2");
  assert.equal(saved.semanticCacheEmbeddingDimension, 768);
});
