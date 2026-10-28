import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Synthetic catalog entries test the contract, not current SiliconFlow availability/billing.
// Isolate storage before importing any application module (normalizers import DB helpers).
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-siliconflow-evidence-17028-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
assert.equal(process.env.DATA_DIR, dataDir);

const { MockAgent, getGlobalDispatcher, setGlobalDispatcher } = await import("undici");
const originalDispatcher = getGlobalDispatcher();
const deniedNetwork = new MockAgent();
deniedNetwork.disableNetConnect();
setGlobalDispatcher(deniedNetwork);
const originalFetch = globalThis.fetch;

const { normalizeOpenAiLikeModelsResponse } =
  await import("../../src/app/api/providers/[id]/models/discovery/normalizers.ts");
const { isFreeModel, isModelFreeBadge, selectModelsForImport } =
  await import("../../src/shared/utils/freeModels.ts");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const discoveryRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const syncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { buildModelSyncInternalHeaders } =
  await import("../../src/shared/services/modelSyncScheduler.ts");

const free = {
  id: "fixture-siliconflow-free",
  isFree: true,
  pricing: { prompt: "0", completion: "0" },
};
const zeroOnly = {
  id: "fixture-siliconflow-zero-only",
  pricing: { input: "0", output: "0" },
};
const pricedSuffix = {
  id: "fixture-siliconflow-priced:free",
  isFree: true,
  pricing: { prompt: "4", completion: "16" },
};
const paidFlagSuffix = {
  id: "fixture-siliconflow-paid-flag:free",
  isFree: true,
  free: false,
  pricing: { prompt: "0", completion: "0" },
};
const pricedPlain = {
  id: "fixture-siliconflow-priced-plain",
  isFree: true,
  pricing: { prompt: "4", completion: "16" },
};
const unknown = { id: "fixture-siliconflow-unknown" };

type CatalogFixture = { id: string; [key: string]: unknown };

function normalized(model: CatalogFixture) {
  const result = normalizeOpenAiLikeModelsResponse({ data: [model] }, "siliconflow");
  assert.equal(result.length, 1, "the discovery normalizer must retain the catalog entry");
  return result[0];
}

function assertFreeDecision(model: CatalogFixture, expected: boolean) {
  assert.equal(isFreeModel("siliconflow", model), expected, `${model.id}: free predicate`);
  assert.equal(isModelFreeBadge("siliconflow", model), expected, `${model.id}: Free badge`);
  assert.equal(
    isModelFreeBadge("siliconflow", model, { strict: true }),
    expected,
    `${model.id}: strict Free badge`
  );
  const selected = selectModelsForImport("siliconflow", [model], true);
  assert.deepEqual(
    selected.models.map((entry) => entry.id),
    expected ? [model.id] : []
  );
  assert.equal(selected.freeFilterEmpty, !expected);
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  setGlobalDispatcher(originalDispatcher);
  await deniedNetwork.close();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#17028 control: raw free/paid evidence already produces the required decisions", () => {
  assertFreeDecision(free, true);
  assertFreeDecision(zeroOnly, true);
  for (const model of [pricedSuffix, paidFlagSuffix, pricedPlain, unknown]) {
    assertFreeDecision(model, false);
  }
});

test("#17028 discovery retains explicit free and zero-price evidence for import and badges", () => {
  assertFreeDecision(normalized(free), true);
  assertFreeDecision(normalized(zeroOnly), true);
});

test("#17028 discovery retains positive-price veto despite an optimistic :free suffix", () => {
  assertFreeDecision(normalized(pricedSuffix), false);
});

test("#17028 discovery retains explicit paid veto despite zero prices and :free suffix", () => {
  assertFreeDecision(normalized(paidFlagSuffix), false);
});

test("#17028 controls: exclude paid/unknown, retain effort declarations, omit arbitrary fields", () => {
  assertFreeDecision(normalized(pricedPlain), false);
  assertFreeDecision(normalized(unknown), false);
  const model = normalized({
    ...free,
    supported_reasoning_levels: ["low", "high"],
    internalSecret: "fixture-only-must-not-be-projected",
  });
  assert.equal("internalSecret" in model, false);
  assert.deepEqual(Reflect.get(model, "supported_reasoning_levels"), ["low", "high"]);
  const [otherProvider] = normalizeOpenAiLikeModelsResponse(
    {
      data: [
        {
          ...free,
          owned_by: "siliconflow",
          provider: "siliconflow",
          is_free: true,
          free: true,
          tags: ["free"],
          supported_reasoning_levels: ["low", "high"],
        },
      ],
    },
    "reka"
  );
  assert.ok(otherProvider);
  for (const key of ["pricing", "isFree", "is_free", "free", "tags"]) {
    assert.equal(key in otherProvider, false, `${key} must not alter other provider projections`);
  }
  assert.deepEqual(Reflect.get(otherProvider, "supported_reasoning_levels"), ["low", "high"]);
});

async function connection() {
  return providers.createProviderConnection({
    provider: "siliconflow",
    authType: "apikey",
    name: "SiliconFlow discovery evidence fixture",
    apiKey: "fixture-not-a-real-api-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://api.siliconflow.cn/v1",
      autoFetchModels: true,
      importFreeModelsOnly: true,
    },
  });
}

// Only upstream I/O and the self-HTTP transport are replaced. The real GET and POST
// handlers, normalizer, free predicates and SQLite domain APIs remain in the path.
function mockCatalogTransport(connectionId: string, entries: CatalogFixture[]) {
  const calls = { upstream: 0, discovery: 0, unexpected: 0 };
  globalThis.fetch = async (input, init) => {
    const rawUrl = input instanceof Request ? input.url : String(input);
    const url = new URL(rawUrl);
    if (url.pathname.includes("__readiness_probe__")) {
      return new Response("", { status: 404 });
    }
    if (url.origin === "https://api.siliconflow.cn" && url.pathname === "/v1/models") {
      calls.upstream++;
      assert.equal(init?.method || "GET", "GET");
      return Response.json({ object: "list", data: entries });
    }
    if (
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) &&
      url.pathname === `/api/providers/${connectionId}/models`
    ) {
      calls.discovery++;
      assert.equal(url.searchParams.get("refresh"), "true");
      assert.equal(url.searchParams.get("excludeCustom"), "true");
      return discoveryRoute.GET(new Request(rawUrl, init), { params: { id: connectionId } });
    }
    calls.unexpected++;
    throw new Error("Unexpected outbound request in SiliconFlow evidence fixture");
  };
  return calls;
}

test("#17028 real discovery GET preserves free and paid decisions from upstream payloads", async () => {
  const row = await connection();
  const calls = mockCatalogTransport(row.id, [free, pricedSuffix, paidFlagSuffix, unknown]);
  const response = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${row.id}/models?refresh=true&excludeCustom=true`),
    { params: { id: row.id } }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { source: string; models: CatalogFixture[] };
  assert.equal(body.source, "api");
  assert.equal(calls.upstream, 1, "the real GET must consume the fake upstream catalog");
  assert.equal(calls.unexpected, 0);
  const byId = new Map(body.models.map((model) => [model.id, model]));
  for (const [id, expected] of [
    [free.id, true],
    [pricedSuffix.id, false],
    [paidFlagSuffix.id, false],
    [unknown.id, false],
  ] as const) {
    const model = byId.get(id);
    assert.ok(model, `GET must return ${id}`);
    assertFreeDecision(model, expected);
  }
});

test("#17028 real sync POST imports only the genuinely free fixture after real discovery GET", async () => {
  const row = await connection();
  const calls = mockCatalogTransport(row.id, [free, pricedSuffix, paidFlagSuffix, unknown]);
  const response = await syncRoute.POST(
    new Request(`http://127.0.0.1/api/providers/${row.id}/sync-models`, {
      method: "POST",
      headers: buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: row.id }) }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    ok: boolean;
    freeFilterEmpty: boolean;
    syncedModels: number;
  };
  assert.equal(body.ok, true);
  assert.equal(
    calls.discovery,
    1,
    "sync must call the real discovery GET through its self-HTTP path"
  );
  assert.equal(calls.upstream, 1);
  assert.equal(calls.unexpected, 0);
  assert.equal(body.freeFilterEmpty, false);
  const persisted = await modelsDb.getSyncedAvailableModelsForConnection("siliconflow", row.id);
  assert.deepEqual(
    persisted.map((model) => model.id),
    [free.id]
  );
  assert.equal(body.syncedModels, 1);
});

test("#17028 cache round-trip keeps paid plain and :free IDs excluded after a refresh GET", async () => {
  const row = await connection();
  const paidEntries = [pricedPlain, pricedSuffix, paidFlagSuffix];
  const calls = mockCatalogTransport(row.id, [free, ...paidEntries, unknown]);
  const refreshed = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${row.id}/models?refresh=true&excludeCustom=true`),
    { params: { id: row.id } }
  );
  assert.equal(refreshed.status, 200);
  const freshBody = (await refreshed.json()) as { source: string; models: CatalogFixture[] };
  assert.equal(freshBody.source, "api");
  for (const entry of paidEntries) {
    const freshPaid = freshBody.models.find((model) => model.id === entry.id);
    assert.ok(freshPaid);
    assertFreeDecision(freshPaid, false);
  }

  const cached = await discoveryRoute.GET(
    new Request(`http://localhost/api/providers/${row.id}/models?excludeCustom=true`),
    { params: { id: row.id } }
  );
  assert.equal(cached.status, 200);
  const cachedBody = (await cached.json()) as { source: string; models: CatalogFixture[] };
  assert.equal(cachedBody.source, "cache", "the second GET must exercise persisted discovery");
  assert.equal(calls.upstream, 1, "the cache read must not request a second upstream catalog");
  assert.equal(calls.unexpected, 0);
  const byId = new Map(cachedBody.models.map((model) => [model.id, model]));
  for (const [id, expected] of [
    [unknown.id, false],
    [free.id, true],
  ] as const) {
    const model = byId.get(id);
    assert.ok(model, `cache must return ${id}`);
    assertFreeDecision(model, expected);
  }
  for (const entry of paidEntries) {
    const cachedPaid = byId.get(entry.id);
    assert.ok(cachedPaid, `${entry.id} must remain present as a non-free model`);
    const selected = selectModelsForImport("siliconflow", [cachedPaid], true);
    assert.deepEqual(
      {
        isFree: isFreeModel("siliconflow", cachedPaid),
        badge: isModelFreeBadge("siliconflow", cachedPaid),
        strictBadge: isModelFreeBadge("siliconflow", cachedPaid, { strict: true }),
        importedIds: selected.models.map((model) => model.id),
        freeFilterEmpty: selected.freeFilterEmpty,
      },
      { isFree: false, badge: false, strictBadge: false, importedIds: [], freeFilterEmpty: true },
      `${entry.id}: paid veto must survive persisted discovery`
    );
  }
});
