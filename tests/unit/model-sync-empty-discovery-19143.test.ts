import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// #19143: a sync whose upstream answers 200 with no models must not touch the catalog.
// The self-fetch is served by the real /models route because the destructive write
// happens there, before the sync route looks at the response.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-discovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= `test-empty-discovery-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

const originalFetch = globalThis.fetch;
const COMPATIBLE = "openai-compatible-19143";
const OLD_SYNC = "2020-01-01T00:00:00.000Z";

type Row = { id: string; source?: string };
type Upstream = () => Response;

const emptyList: Upstream = () => Response.json({ data: [] });
const noListKey: Upstream = () => Response.json({ error: { message: "starting up" } });
const listOf =
  (...rows: Array<string | Record<string, unknown>>): Upstream =>
  () =>
    Response.json({ data: rows.map((row) => (typeof row === "string" ? { id: row } : row)) });

function serve(upstream: Upstream) {
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    if (url.pathname.includes("__readiness_probe__")) {
      return new Response(null, { status: 404 });
    }
    const self = url.pathname.match(/^\/api\/providers\/([^/]+)\/models$/);
    if (self) {
      return providerModelsRoute.GET(new Request(url.href, { headers: init?.headers }), {
        params: Promise.resolve({ id: decodeURIComponent(self[1]) }),
      });
    }
    return upstream();
  };
}

async function sync(connectionId: string, search = "") {
  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models${search}`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}

function connect(provider = COMPATIBLE, name = "main", extra: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: "test-key",
    providerSpecificData: { baseUrl: "https://proxy.example.com/v1", ...extra },
  });
}

function syncedAt(connectionId: string): string | null {
  const row = core
    .getDbInstance()
    .prepare("SELECT synced_models_at AS at FROM provider_connections WHERE id = ?")
    .get(connectionId) as { at: string | null };
  return row.at;
}

function setSyncedAt(connectionId: string, value: string | null) {
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET synced_models_at = ? WHERE id = ?")
    .run(value, connectionId);
  invalidateDbCache();
}

async function syncedIds(provider: string, connectionId: string) {
  const rows = await modelsDb.getSyncedAvailableModelsForConnection(provider, connectionId);
  return rows.map((row) => row.id).sort();
}

async function customIds(provider = COMPATIBLE) {
  const rows = (await modelsDb.getCustomModels(provider)) as Row[];
  return rows.map((row) => row.id).sort();
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.COMBO_AUTO_PRUNE_STALE_STEPS;
  modelSyncRoute.__resetLoopbackReadinessForTests();
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [label, search] of [
  ["scheduled sync", ""],
  ["mode=import", "?mode=import"],
] as const) {
  for (const [shape, upstream] of [
    ["empty list", emptyList],
    ["no list key", noListKey],
  ] as const) {
    test(`${label}, ${shape}: a cached catalog and every custom row survive`, async () => {
      const connection = await connect();
      await modelsDb.replaceSyncedAvailableModelsForConnection(COMPATIBLE, connection.id, [
        { id: "model-a", name: "Model A" },
        { id: "model-b", name: "Model B" },
      ]);
      setSyncedAt(connection.id, OLD_SYNC);
      await modelsDb.addCustomModel(COMPATIBLE, "imported-row", "Imported", "imported");
      await modelsDb.addCustomModel(COMPATIBLE, "manual-row", "Manual", "manual");
      await modelsDb.setModelAlias("keep-alias", `${COMPATIBLE}/model-a`);
      await modelsDb.markManagedModelAlias("keep-alias");

      serve(upstream);
      const { status, body } = await sync(connection.id, search);

      assert.equal(status, 502);
      assert.equal(body.error, "EMPTY_CATALOG");
      assert.deepEqual(await syncedIds(COMPATIBLE, connection.id), ["model-a", "model-b"]);
      assert.deepEqual(await customIds(), ["imported-row", "manual-row"]);
      assert.equal(syncedAt(connection.id), OLD_SYNC);
      assert.equal((await modelsDb.getModelAliases())["keep-alias"], `${COMPATIBLE}/model-a`);
    });

    test(`${label}, ${shape}: no cache and no local catalog fails the sync and keeps rows`, async () => {
      const connection = await connect();
      await modelsDb.addCustomModel(COMPATIBLE, "imported-row", "Imported", "imported");
      await modelsDb.addCustomModel(COMPATIBLE, "manual-row", "Manual", "manual");
      setSyncedAt(connection.id, null);

      serve(upstream);
      const { status, body } = await sync(connection.id, search);

      assert.equal(status, 502);
      assert.equal(body.error, "EMPTY_CATALOG");
      assert.deepEqual(await customIds(), ["imported-row", "manual-row"]);
      assert.equal(syncedAt(connection.id), null);
    });
  }
}

test("a provider with a static catalog keeps its synced rows instead of falling back", async () => {
  const connection = await connect("opencode-go");
  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-go", connection.id, [
    { id: "cached-go", name: "Cached Go" },
  ]);
  setSyncedAt(connection.id, OLD_SYNC);

  serve(emptyList);
  const { status, body } = await sync(connection.id);

  assert.equal(status, 502);
  assert.equal(body.error, "EMPTY_CATALOG");
  assert.deepEqual(await syncedIds("opencode-go", connection.id), ["cached-go"]);
  assert.equal(syncedAt(connection.id), OLD_SYNC);
});

test("empty discovery on one connection does not refresh a stale sibling catalog", async () => {
  const stale = await connect(COMPATIBLE, "stale");
  const empty = await connect(COMPATIBLE, "empty");
  await modelsDb.replaceSyncedAvailableModelsForConnection(COMPATIBLE, stale.id, [
    { id: "old-model", name: "Old" },
  ]);
  setSyncedAt(stale.id, OLD_SYNC);
  setSyncedAt(empty.id, null);
  assert.equal((await getActiveSyncedCatalog(COMPATIBLE)).authoritative, false);

  serve(emptyList);
  const { status } = await sync(empty.id);

  assert.equal(status, 502);
  assert.equal(syncedAt(empty.id), null);
  assert.equal((await getActiveSyncedCatalog(COMPATIBLE)).authoritative, false);
});

test("empty discovery on one connection does not prune combo steps it alone served", async () => {
  process.env.COMBO_AUTO_PRUNE_STALE_STEPS = "true";
  const healthy = await connect(COMPATIBLE, "healthy");
  const empty = await connect(COMPATIBLE, "empty");
  await modelsDb.replaceSyncedAvailableModelsForConnection(COMPATIBLE, healthy.id, [
    { id: "model-a", name: "A" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(COMPATIBLE, empty.id, [
    { id: "model-b", name: "B" },
  ]);
  const steps = [`${COMPATIBLE}/model-a`, `${COMPATIBLE}/model-b`];
  const combo = await combosDb.createCombo({ name: "combo-19143", models: steps });

  serve(emptyList);
  const { status } = await sync(empty.id);

  assert.equal(status, 502);
  assert.deepEqual((await combosDb.getComboById(String(combo.id)))?.models, combo.models);
  assert.deepEqual(await syncedIds(COMPATIBLE, empty.id), ["model-b"]);
});

test("a cached catalog of only non-chat models survives on the chat surface", async () => {
  const connection = await connect();
  await modelsDb.replaceSyncedAvailableModelsForConnection(COMPATIBLE, connection.id, [
    { id: "embed-a", name: "Embed", supportedEndpoints: ["embeddings"] },
  ]);
  setSyncedAt(connection.id, OLD_SYNC);

  serve(emptyList);
  const { status } = await sync(connection.id);

  assert.equal(status, 502);
  assert.deepEqual(await syncedIds(COMPATIBLE, connection.id), ["embed-a"]);
  assert.equal(syncedAt(connection.id), OLD_SYNC);
});

test("control: a healthy non-chat-only catalog is not treated as empty", async () => {
  const connection = await connect();
  await modelsDb.addCustomModel(COMPATIBLE, "synthetic-chat", "Synthetic", "imported");
  await modelsDb.addCustomModel(COMPATIBLE, "speech-row", "Speech", "imported", "audio-speech", [
    "audio-speech",
  ]);
  setSyncedAt(connection.id, OLD_SYNC);

  serve(listOf({ id: "embed-a", supportedEndpoints: ["embeddings"] }));
  const { status } = await sync(connection.id);

  assert.equal(status, 200);
  assert.deepEqual(await syncedIds(COMPATIBLE, connection.id), ["embed-a"]);
  assert.notEqual(syncedAt(connection.id), OLD_SYNC);
  // #14825: media rows stay and rows with the synthetic chat default are replaced.
  assert.deepEqual(await customIds(), ["speech-row"]);
});

test("control: a smaller non-empty catalog still removes models and managed aliases", async () => {
  const connection = await connect();
  serve(listOf("model-a", "model-b"));
  assert.equal((await sync(connection.id)).status, 200);
  const before = Object.keys(await modelsDb.getModelAliases());
  assert.equal(before.length, 2);

  serve(listOf("model-a"));
  assert.equal((await sync(connection.id)).status, 200);

  assert.deepEqual(await syncedIds(COMPATIBLE, connection.id), ["model-a"]);
  assert.deepEqual(Object.values(await modelsDb.getModelAliases()), [`${COMPATIBLE}/model-a`]);
});

test("repeated empty answers then a healthy one updates the catalog normally", async () => {
  const connection = await connect();
  await modelsDb.replaceSyncedAvailableModelsForConnection(COMPATIBLE, connection.id, [
    { id: "model-a", name: "A" },
  ]);
  setSyncedAt(connection.id, OLD_SYNC);

  serve(emptyList);
  assert.equal((await sync(connection.id)).status, 502);
  assert.equal((await sync(connection.id)).status, 502);
  assert.equal(syncedAt(connection.id), OLD_SYNC);

  serve(listOf("model-a", "model-new"));
  assert.equal((await sync(connection.id)).status, 200);

  assert.deepEqual(await syncedIds(COMPATIBLE, connection.id), ["model-a", "model-new"]);
  assert.notEqual(syncedAt(connection.id), OLD_SYNC);
});

test("control: importFreeModelsOnly with no free models keeps its deliberate cleanup", async () => {
  const connection = await connect(COMPATIBLE, "free-only", { importFreeModelsOnly: true });
  await modelsDb.addCustomModel(COMPATIBLE, "imported-row", "Imported", "imported");

  serve(listOf("paid-model"));
  const { status, body } = await sync(connection.id);

  assert.equal(status, 200);
  assert.equal(body.freeFilterEmpty, true);
  assert.deepEqual(await customIds(), []);
});
