/**
 * Regression test — compatible-provider-node model ids must never stack the
 * node prefix.
 *
 * Observed on a live deployment: an `openai-compatible` node with prefix
 * `strata` exposed `strata/strata/strata/qwen3.8-flash-next-coder-iq1_m` on
 * `/v1/models`. Chain:
 *
 *   1. POST /api/provider-models stored a custom row whose `id` already
 *      carried the node prefix (`strata/strata/<model>` — the id was pasted
 *      from a prefixed listing). The route stored `modelId` verbatim.
 *   2. The `/v1/models` catalog built every custom-row id as
 *      `${alias}/${modelId}` without checking whether the stored id already
 *      began with `${alias}/`, emitting a stacked id per copy of the bug.
 *
 * Contract after the fix:
 *   - The catalog collapses a repeated leading node prefix (and only the
 *     node's OWN prefix — slashed upstream ids like `opc/big-pickle` are
 *     untouched) before emitting, so exposure is always exactly
 *     `<prefix>/<upstream-id>`.
 *   - POST /api/provider-models normalizes the stored id to the bare
 *     upstream id, so new rows cannot re-introduce the stack.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prefix-stack-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "prefix-stack-test-secret";

type CoreModule = typeof import("../../src/lib/db/core.ts");
type ProvidersDbModule = typeof import("../../src/lib/db/providers.ts");
type ModelsDbModule = typeof import("../../src/lib/db/models.ts");
type AliasesDbModule = typeof import("../../src/lib/db/models/aliases.ts");
type CatalogModule = typeof import("../../src/app/api/v1/models/catalog.ts");
type ProviderModelsRouteModule = typeof import("../../src/app/api/provider-models/route.ts");

let core: CoreModule;
let providersDb: ProvidersDbModule;
let modelsDb: ModelsDbModule;
let aliasesDb: AliasesDbModule;
let v1ModelsCatalog: CatalogModule;
let providerModelsRoute: ProviderModelsRouteModule;

const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
const NODE_PREFIX = "strata";
const MODEL_IQ1M = "qwen3.8-flash-next-coder-iq1_m";
const MODEL_NVFP4 = "qwen3.8-flash-nvfp4-nvidia";
const STACKED_IQ1M = `${NODE_PREFIX}/${NODE_PREFIX}/${MODEL_IQ1M}`;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedCompatibleNode() {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Local-Strata (probe)",
    prefix: NODE_PREFIX,
    baseUrl: "http://192.168.0.45:8080",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "strata-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "http://192.168.0.45:8080",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });
}

test.before(async () => {
  core = await import("../../src/lib/db/core.ts");
  providersDb = await import("../../src/lib/db/providers.ts");
  modelsDb = await import("../../src/lib/db/models.ts");
  aliasesDb = await import("../../src/lib/db/models/aliases.ts");
  v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
  providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");
  await resetStorage();
});

test.after(async () => {
  delete process.env.OMNIROUTE_API_KEY;
  if (core) core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("catalog collapses a stacked node prefix on a custom row to a single prefixed id", async () => {
  await resetStorage();
  await seedCompatibleNode();
  // The polluted row shape found on the live deployment: node prefix baked
  // into the stored custom id.
  await modelsDb.addCustomModel(NODE_ID, STACKED_IQ1M, "Qwen3.8 Flash Next Coder", "manual");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const ids = body.data.map((m) => String(m.id));

  assert.ok(
    ids.includes(`${NODE_PREFIX}/${MODEL_IQ1M}`),
    `expected "${NODE_PREFIX}/${MODEL_IQ1M}" in ${JSON.stringify(ids)}`
  );
  for (const id of ids) {
    assert.equal(
      id.includes(`${NODE_PREFIX}/${NODE_PREFIX}/`),
      false,
      `no emitted id may stack the node prefix, got "${id}"`
    );
  }

  const row = body.data.find((m) => m.id === `${NODE_PREFIX}/${MODEL_IQ1M}`);
  assert.equal(row?.root, MODEL_IQ1M, "root must carry the bare upstream id, not the stacked one");
});

test("alias-backed entries with a stacked prefix collapse to a single prefixed id", async () => {
  await resetStorage();
  await seedCompatibleNode();
  // Alias values are "<providerKey>/<modelId>"; the modelId half itself can
  // carry the node prefix when it was qualified from an already-prefixed id.
  await aliasesDb.setModelAlias("iq1m", `${NODE_ID}/${NODE_PREFIX}/${MODEL_IQ1M}`);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models?prefix=alias")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const ids = body.data.map((m) => String(m.id));

  assert.ok(
    ids.includes(`${NODE_PREFIX}/${MODEL_IQ1M}`),
    `expected "${NODE_PREFIX}/${MODEL_IQ1M}" in ${JSON.stringify(ids)}`
  );
  for (const id of ids) {
    assert.equal(
      id.includes(`${NODE_PREFIX}/${NODE_PREFIX}/`),
      false,
      `no emitted id may stack the node prefix, got "${id}"`
    );
  }
});

test("POST /api/provider-models stores the bare upstream id, stripping a stacked node prefix", async () => {
  await resetStorage();
  await seedCompatibleNode();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";

  const post = async (modelId: string) =>
    providerModelsRoute.POST(
      new Request("http://localhost/api/provider-models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-prefix-stack-mgmt",
        },
        body: JSON.stringify({ provider: NODE_ID, modelId }),
      })
    );

  // Double-prefixed paste (the live pollution shape).
  const stacked = await post(STACKED_IQ1M);
  assert.equal(stacked.status, 200);

  // Single-prefixed paste (copied from a prefixed listing).
  const single = await post(`${NODE_PREFIX}/${MODEL_NVFP4}`);
  assert.equal(single.status, 200);

  // Control: a slashed upstream id that does NOT start with the node prefix
  // must be stored verbatim.
  const slashed = await post("opc/big-pickle");
  assert.equal(slashed.status, 200);

  const stored = (await modelsDb.getCustomModels(NODE_ID)) as Array<{ id: string }>;
  const storedIds = stored.map((m) => m.id);
  assert.ok(
    storedIds.includes(MODEL_IQ1M),
    `expected bare "${MODEL_IQ1M}" in ${JSON.stringify(storedIds)}`
  );
  assert.ok(
    storedIds.includes(MODEL_NVFP4),
    `expected bare "${MODEL_NVFP4}" in ${JSON.stringify(storedIds)}`
  );
  assert.ok(storedIds.includes("opc/big-pickle"), "slashed upstream id must be stored verbatim");
  for (const id of storedIds) {
    assert.equal(
      id.startsWith(`${NODE_PREFIX}/`),
      false,
      `no stored row may carry the node prefix, got "${id}"`
    );
  }
});

test("POST /api/provider-models leaves non-node provider ids untouched", async () => {
  await resetStorage();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";

  // A canonical-style provider id with no provider node row: slashed ids
  // that begin with the provider's own name are legitimate upstream
  // namespaces and must be stored verbatim.
  const response = await providerModelsRoute.POST(
    new Request("http://localhost/api/provider-models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-prefix-stack-mgmt",
      },
      body: JSON.stringify({ provider: "testplain", modelId: "testplain/model-x" }),
    })
  );
  assert.equal(response.status, 200);
  const stored = (await modelsDb.getCustomModels("testplain")) as Array<{ id: string }>;
  assert.ok(
    stored.some((m) => m.id === "testplain/model-x"),
    `expected verbatim storage, got ${JSON.stringify(stored.map((m) => m.id))}`
  );
});

test("PUT /api/provider-models with createIfMissing stores the bare upstream id", async () => {
  await resetStorage();
  await seedCompatibleNode();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";

  const response = await providerModelsRoute.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-prefix-stack-mgmt",
      },
      body: JSON.stringify({
        provider: NODE_ID,
        modelId: STACKED_IQ1M,
        modelName: "Qwen IQ1_M",
        supportsVision: true,
      }),
    })
  );
  assert.equal(response.status, 200);
  const stored = (await modelsDb.getCustomModels(NODE_ID)) as Array<{ id: string }>;
  assert.ok(
    stored.some((m) => m.id === MODEL_IQ1M),
    `expected bare "${MODEL_IQ1M}" stored via PUT, got ${JSON.stringify(stored.map((m) => m.id))}`
  );
  assert.equal(
    stored.some((m) => m.id.startsWith(`${NODE_PREFIX}/`)),
    false,
    "PUT must not create a stacked-prefix row"
  );
});

test("DELETE resolves the model as submitted and by its normalized form", async () => {
  await resetStorage();
  await seedCompatibleNode();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";

  // Legacy stacked row stored verbatim by an older build: deleting by the
  // same stacked id must still find it (raw-first match).
  await modelsDb.addCustomModel(NODE_ID, STACKED_IQ1M, "Qwen", "manual");
  const rawDelete = await providerModelsRoute.DELETE(
    new Request(
      `http://localhost/api/provider-models?provider=${encodeURIComponent(NODE_ID)}&model=${encodeURIComponent(STACKED_IQ1M)}`,
      { method: "DELETE", headers: { Authorization: "Bearer sk-prefix-stack-mgmt" } }
    )
  );
  assert.equal(rawDelete.status, 200);
  assert.equal(((await rawDelete.json()) as { removed: boolean }).removed, true);

  // Row stored bare (current write path): deleting by the prefixed paste
  // must resolve to the bare row.
  await modelsDb.addCustomModel(NODE_ID, MODEL_IQ1M, "Qwen", "manual");
  const normalizedDelete = await providerModelsRoute.DELETE(
    new Request(
      `http://localhost/api/provider-models?provider=${encodeURIComponent(NODE_ID)}&model=${encodeURIComponent(STACKED_IQ1M)}`,
      { method: "DELETE", headers: { Authorization: "Bearer sk-prefix-stack-mgmt" } }
    )
  );
  assert.equal(normalizedDelete.status, 200);
  assert.equal(((await normalizedDelete.json()) as { removed: boolean }).removed, true);
  const stored = (await modelsDb.getCustomModels(NODE_ID)) as Array<{ id: string }>;
  assert.equal(
    stored.length,
    0,
    `expected no rows left, got ${JSON.stringify(stored.map((m) => m.id))}`
  );
});

test("DELETE resetEndpoints resolves an endpoint override by its normalized form", async () => {
  await resetStorage();
  await seedCompatibleNode();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";

  // Discovered model plus an operator endpoint override, both stored under
  // the bare upstream id (the current write path).
  await modelsDb.replaceSyncedAvailableModelsForConnection(NODE_ID, "connection-1", [
    {
      id: MODEL_IQ1M,
      name: "Qwen",
      supportedEndpoints: ["chat"],
      endpointCapabilitySource: "declared",
    },
  ]);
  const edited = await modelsDb.updateCustomModel(
    NODE_ID,
    MODEL_IQ1M,
    { supportedEndpoints: ["chat", "embeddings"] },
    { createIfMissing: true }
  );
  assert.equal(edited?.endpointCapabilitySource, "operator");

  // Resetting by the prefixed paste must reach the bare-id override.
  const resetByPrefixedPaste = () =>
    providerModelsRoute.DELETE(
      new Request(
        `http://localhost/api/provider-models?provider=${encodeURIComponent(NODE_ID)}&model=${encodeURIComponent(STACKED_IQ1M)}&resetEndpoints=true`,
        { method: "DELETE", headers: { Authorization: "Bearer sk-prefix-stack-mgmt" } }
      )
    );
  const reset = await resetByPrefixedPaste();
  assert.equal(reset.status, 200);
  assert.deepEqual(await reset.json(), { restored: true, resetEndpoints: true });
  assert.deepEqual(await modelsDb.getCustomModels(NODE_ID), []);

  const again = await resetByPrefixedPaste();
  assert.equal(again.status, 404);
});

test("a hide rule keyed on the bare id suppresses a stacked stored row", async () => {
  await resetStorage();
  await seedCompatibleNode();
  await modelsDb.addCustomModel(NODE_ID, STACKED_IQ1M, "Qwen", "manual");
  // Same write the PATCH fallback performs when no custom row matches: the
  // hide lands under the bare upstream id.
  await modelsDb.mergeModelCompatOverride(NODE_ID, MODEL_IQ1M, {
    isHidden: true,
    modality: "chat",
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const ids = body.data.map((m) => String(m.id));
  assert.equal(
    ids.includes(`${NODE_PREFIX}/${MODEL_IQ1M}`),
    false,
    `bare-id hide must suppress the stacked row, got ${JSON.stringify(ids.filter((id) => id.includes(MODEL_IQ1M)))}`
  );
});

test("catalog collapses a stored single-prefix id and leaves canonical provider ids untouched", async () => {
  await resetStorage();
  await seedCompatibleNode();
  // Stored single-prefix (legacy paste stored verbatim): the emitted id must
  // still be the single-prefixed form, not a double.
  await modelsDb.addCustomModel(NODE_ID, `${NODE_PREFIX}/${MODEL_NVFP4}`, "Qwen NVFP4", "manual");

  // Canonical-style provider with no node row: a slashed id that begins with
  // the provider's own name must keep the pre-fix emission shape.
  await providersDb.createProviderConnection({
    provider: "testplain",
    authType: "apikey",
    name: "testplain-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.addCustomModel("testplain", "testplain/model-x", "Model X", "manual");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const ids = body.data.map((m) => String(m.id));
  assert.ok(
    ids.includes(`${NODE_PREFIX}/${MODEL_NVFP4}`),
    `expected single-prefix emission, got ${JSON.stringify(ids.filter((id) => id.includes(MODEL_NVFP4)))}`
  );
  assert.equal(
    ids.includes(`${NODE_PREFIX}/${NODE_PREFIX}/${MODEL_NVFP4}`),
    false,
    "no stacked emission for the stored single-prefix id"
  );
  assert.ok(
    ids.includes("testplain/testplain/model-x"),
    `canonical provider emission must be untouched, got ${JSON.stringify(ids.filter((id) => id.includes("model-x")))}`
  );
});

test("PATCH /api/provider-models normalizes a prefixed id and reports both alias targets", async () => {
  await resetStorage();
  await seedCompatibleNode();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";
  // A managed alias pointing at the bare stored id (the shape the alias
  // layer persists) plus the row itself.
  await modelsDb.addCustomModel(NODE_ID, MODEL_IQ1M, "Qwen", "manual");
  await aliasesDb.setModelAlias("iq1m", `${NODE_ID}/${MODEL_IQ1M}`);

  const response = await providerModelsRoute.PATCH(
    new Request(
      `http://localhost/api/provider-models?provider=${encodeURIComponent(NODE_ID)}&modelId=${encodeURIComponent(STACKED_IQ1M)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-prefix-stack-mgmt",
        },
        body: JSON.stringify({ isHidden: true }),
      }
    )
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    ok: boolean;
    aliasChanges: { removed: string[] };
    modelCompatOverrides: Array<Record<string, unknown>>;
  };
  assert.equal(body.ok, true);
  // The managed alias pointing at the bare stored id must be pruned: the
  // alias layer received both the submitted and normalized id forms.
  assert.ok(
    body.aliasChanges.removed.includes("iq1m"),
    `alias pointing at the bare id must be removed, got ${JSON.stringify(body.aliasChanges.removed)}`
  );
});

test("validate-and-add handler stores the bare upstream id for a prefixed node", async () => {
  await resetStorage();
  await seedCompatibleNode();
  process.env.OMNIROUTE_API_KEY = "sk-prefix-stack-mgmt";

  // createValidateAndAddHandler requires a live validation probe; call the
  // handler with inference consent and a connection that cannot validate to
  // prove the request survives parsing with the normalized id (the 4xx/5xx
  // error must reference the bare id path, not fail on the stacked form).
  const { createValidateAndAddHandler } = await import("../../src/lib/modelValidation/http.ts");
  const handler = createValidateAndAddHandler({
    authorize: async () => null,
    validateAndAdd: async (input: { modelId: string }) => {
      // Capture what the service layer would have received.
      capturedModelId = input.modelId;
      throw new Error("probe-stop");
    },
  });
  let capturedModelId = "";
  const response = await handler(
    new Request("http://localhost/api/provider-models/validate-and-add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-prefix-stack-mgmt",
      },
      body: JSON.stringify({
        provider: NODE_ID,
        modelId: STACKED_IQ1M,
        connectionId: "conn-1",
        allowInference: true,
      }),
    })
  );
  assert.equal(response.status, 500, "the probe error surfaces as a 500");
  assert.equal(
    capturedModelId,
    MODEL_IQ1M,
    `service layer must receive the bare id, got "${capturedModelId}"`
  );
});
