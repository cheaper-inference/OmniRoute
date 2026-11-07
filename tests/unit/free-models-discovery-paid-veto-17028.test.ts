import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "free-veto-17028-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
const { MockAgent, setGlobalDispatcher, getGlobalDispatcher } = await import("undici");
const dispatcher = getGlobalDispatcher();
const denied = new MockAgent();
denied.disableNetConnect();
setGlobalDispatcher(denied);
const originalFetch = globalThis.fetch;
const { normalizeOpenAiLikeModelsResponse } =
  await import("../../src/app/api/providers/[id]/models/discovery/normalizers.ts");
const discovery = await import("../../src/app/api/providers/[id]/models/route.ts");
const sync = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { buildModelSyncInternalHeaders } =
  await import("../../src/shared/services/modelSyncScheduler.ts");
const { isFreeModel, isModelFreeBadge } = await import("../../src/shared/utils/freeModels.ts");

// Synthetic pricing on shipped Agnes identities tests evidence precedence, not actual tariffs.
const paid = { id: "agnes-2.0-flash", pricing: { prompt: "1", completion: "2" } };
const flaggedPaid = { id: "agnes-2.5-flash", isFree: true, free: false };
const free = { id: "agnes-3.0-flash", pricing: { prompt: 0, completion: 0 } };
const entries = [paid, flaggedPaid, free];
type ModelRow = { id: string; pricing?: unknown; free?: unknown; isFree?: boolean };

test.after(async () => {
  globalThis.fetch = originalFetch;
  resetDbInstance();
  setGlobalDispatcher(dispatcher);
  await denied.close();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#17028 named-provider normalization preserves a paid veto without projecting secrets", () => {
  const [result] = normalizeOpenAiLikeModelsResponse(
    { data: [{ ...paid, secret: "omit-fixture" }] },
    "agnes"
  );
  assert.equal("secret" in result, false);
  assert.equal(isFreeModel("agnes", result), false);
});

test("#17028 real discovery/cache/sync keep paid catalogued models out of free-only imports", async () => {
  const row = await providers.createProviderConnection({
    provider: "agnes",
    authType: "apikey",
    apiKey: "offline-fixture-only",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://apihub.agnes-ai.com/v1",
      autoFetchModels: true,
      importFreeModelsOnly: true,
    },
  });
  const calls = { upstream: 0, discovery: 0 };
  let upstreamAvailable = false;
  globalThis.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (url.pathname.includes("__readiness_probe__")) return new Response("", { status: 404 });
    if (url.origin === "https://apihub.agnes-ai.com" && url.pathname === "/v1/models") {
      calls.upstream++;
      if (!upstreamAvailable) return new Response("offline fixture", { status: 503 });
      return Response.json({ data: entries });
    }
    if (
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) &&
      url.pathname === `/api/providers/${row.id}/models`
    ) {
      calls.discovery++;
      return discovery.GET(new Request(url, init), { params: { id: row.id } });
    }
    throw new Error("Unexpected network request in offline catalog fixture");
  };
  const url = `http://localhost/api/providers/${row.id}/models?excludeCustom=true`;
  // A legacy cache has already discarded the prices. Reading it cannot reconstruct them.
  await models.replaceSyncedAvailableModelsForConnection("agnes", row.id, [
    { id: paid.id, name: paid.id },
  ]);
  const legacy = await discovery.GET(new Request(url), { params: { id: row.id } });
  const legacyBody = (await legacy.json()) as { source: string; models: ModelRow[] };
  assert.equal(legacyBody.source, "cache");
  assert.equal(legacyBody.models[0].isFree, undefined);
  assert.equal(calls.upstream, 0);
  // A 200 fallback is not proof of refresh: its source/warning and old verdict remain visible.
  const unavailable = await discovery.GET(new Request(url + "&refresh=true"), {
    params: { id: row.id },
  });
  const unavailableBody = (await unavailable.json()) as {
    source: string;
    warning?: string;
    models: ModelRow[];
  };
  assert.equal(unavailableBody.source, "cache");
  assert.match(unavailableBody.warning || "", /unavailable/i);
  assert.equal(unavailableBody.models[0].isFree, undefined);
  const failedSync = await sync.POST(
    new Request(`http://127.0.0.1/api/providers/${row.id}/sync-models`, {
      method: "POST",
      headers: buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: row.id }) }
  );
  assert.equal(failedSync.status, 502);
  const untouched = await models.getSyncedAvailableModelsForConnection("agnes", row.id);
  assert.deepEqual(
    untouched.map((model) => model.id),
    [paid.id]
  );
  assert.equal(untouched[0].isFree, undefined);
  upstreamAvailable = true;
  const fresh = await discovery.GET(new Request(url + "&refresh=true"), { params: { id: row.id } });
  assert.equal(fresh.status, 200);
  assert.equal((await fresh.json()).source, "api");
  const cached = await discovery.GET(new Request(url), { params: { id: row.id } });
  const body = (await cached.json()) as { source: string; models: ModelRow[] };
  assert.equal(body.source, "cache");
  assert.equal(calls.upstream, 3);
  const response = await sync.POST(
    new Request(`http://127.0.0.1/api/providers/${row.id}/sync-models`, {
      method: "POST",
      headers: buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: row.id }) }
  );
  assert.equal(response.status, 200);
  assert.equal(calls.discovery, 2);
  assert.equal(calls.upstream, 4);
  const persisted = await models.getSyncedAvailableModelsForConnection("agnes", row.id);
  assert.deepEqual(
    persisted.map((m) => m.id),
    [free.id]
  );
  for (const entry of [paid, flaggedPaid]) {
    const cachedModel = body.models.find((m) => m.id === entry.id);
    assert.ok(cachedModel);
    assert.equal(isFreeModel("agnes", cachedModel), false);
    assert.equal(isModelFreeBadge("agnes", cachedModel), false);
  }
});
