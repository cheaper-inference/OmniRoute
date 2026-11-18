import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-specialty-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "specialty-catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");
const musicRoute = await import("../../src/app/api/v1/music/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // These routes all derive from the shared unified catalog (getUnifiedModelsResponse),
  // which #6408 wrapped in a 1.5s TTL response cache keyed only by (prefix, isCodex
  // client, apiKey) — NOT by DB state. Every test in this file hits that same cache key,
  // so without clearing it between test cases a test running within the TTL window of
  // a previous one gets served the previous test's stale catalog instead of a fresh
  // build reflecting this test's own seeded connections.
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function listedIds(
  route: { GET: (request?: Request) => Promise<Response> },
  pathname: string
) {
  const response = await route.GET(new Request(`http://localhost${pathname}`));
  const body = (await response.json()) as { data?: Array<{ id: string }> };
  assert.equal(response.status, 200);
  return (body.data || []).map((model) => model.id);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test(
  "image catalog GET uses the unified active-credential model list",
  { timeout: 10000 },
  async () => {
    await seedConnection("codex");

    const ids = await listedIds(imageRoute, "/v1/images/generations");

    // #14976 added the Codex GPT Image models (dedicated Codex Images API route)
    // after the GPT-5.6 hosted-tool ids; see tests/unit/image-registry-gpt56.test.ts.
    assert.deepEqual(
      ids.filter((id) => id.startsWith("codex/")),
      [
        "codex/gpt-6.1-sol-image",
        "codex/gpt-5.6-sol-image",
        "codex/gpt-5.6-terra-image",
        "codex/gpt-5.6-luna-image",
        "codex/gpt-image-2.5-flare",
        "codex/gpt-image-2.5-sunburst",
        "codex/gpt-image-2.6-sunburst",
        "codex/gpt-image-2",
      ]
    );
    assert.ok(!ids.includes("codex/gpt-5.5"));
    assert.ok(!ids.includes("openai/gpt-image-2"));
    assert.ok(!ids.some((id) => id.startsWith("xai/")));
  }
);

test("specialty catalog GET preserves unified catalog headers", async () => {
  await seedConnection("codex");

  const response = await imageRoute.GET(
    new Request("http://localhost/v1/images/generations", {
      headers: { "x-request-id": "specialty-catalog-test" },
    })
  );
  await response.json();

  assert.equal(response.headers.get("x-request-id"), "specialty-catalog-test");
  assert.ok(response.headers.get("x-model-catalog-version"));
  assert.match(response.headers.get("content-type") || "", /application\/json/);
});

test("embedding catalog GET hides providers without active credentials", async () => {
  await seedConnection("cohere");

  const ids = await listedIds(embeddingsRoute, "/v1/embeddings");

  assert.ok(ids.includes("cohere/embed-v4.0"));
  assert.ok(!ids.includes("openai/text-embedding-3-small"));
});

test("video catalog GET hides credential-backed providers without credentials", async () => {
  await seedConnection("kie");

  const ids = await listedIds(videoRoute, "/v1/videos/generations");

  assert.ok(ids.includes("kie/veo/veo-3-1"));
  assert.ok(!ids.includes("vertex/veo-3.0-generate-001"));
});

test("music catalog GET hides providers without active credentials", async () => {
  await seedConnection("kie");

  const ids = await listedIds(musicRoute, "/v1/music/generations");

  assert.ok(ids.includes("kie/suno-v4.0"));
  assert.ok(!ids.includes("vertex/lyria-002"));
});

test("music catalog GET lists a discovered music model once when its registry also ships it", async () => {
  await seedConnection("gemini");
  const db = core.getDbInstance();
  const connectionId = db
    .prepare("SELECT id FROM provider_connections WHERE provider = ?")
    .get("gemini").id;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "syncedAvailableModels",
    `gemini:${connectionId}`,
    JSON.stringify([
      // Discovery tags AI Studio's Lyria as `music` (geminiModelsParser), so this id now
      // arrives twice: once from the synced snapshot and once from MUSIC_PROVIDERS. The
      // synced row is the richer one, so the catalog must merge them, not list both.
      { id: "lyria-3-pro-preview", name: "Lyria 3 Pro", supportedEndpoints: ["music"] },
    ])
  );

  const response = await musicRoute.GET(new Request("http://localhost/v1/music/generations"));
  const body = (await response.json()) as {
    data?: Array<{ id: string; supported_endpoints?: string[] }>;
  };
  assert.equal(response.status, 200);
  const models = body.data || [];
  const ids = models.map((model) => model.id);

  assert.equal(ids.filter((id) => id === "gemini/lyria-3-pro-preview").length, 1);
  // The registry row carries no supported_endpoints, so this proves the synced row survived.
  assert.deepEqual(
    models.find((model) => model.id === "gemini/lyria-3-pro-preview")?.supported_endpoints,
    ["music"]
  );
  // A registry-only neighbour still lists: it has no discovery snapshot of its own.
  assert.equal(ids.filter((id) => id === "gemini/lyria-3-clip-preview").length, 1);
});
