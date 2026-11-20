import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Context: custom model registered with a generic provider (openai/anthropic-compatible)
// fell into DEFAULT_LIMITS.default (128k) because the ADD form had no way to inform the
// janela real — o guard de chatCore devolvia 400 context_length_exceeded (caso real:
// qwen-cloud-token-plan/qwen3.8-max, janela 1M). O POST passa a gravar o override na
// Feature-5004 table `model_context_overrides` (same path as PUT #4125).

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-context-add-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const contextManager = await import("../../open-sse/services/contextManager.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function buildRequest(method: string, body: unknown) {
  return new Request("http://localhost/api/provider-models", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST with contextWindowOverride persists a manual override consumed by getTokenLimit", async () => {
  const res = await providerModelsRoute.POST(
    buildRequest("POST", {
      provider: "qwen-cloud-token-plan",
      modelId: "qwen3.8-max",
      modelName: "Qwen 3.8 Max",
      contextWindowOverride: 1_000_000,
    })
  );
  const body = (await res.json()) as {
    model?: { contextWindowOverride?: number; contextWindowOverrideSource?: string };
  };
  assert.equal(res.status, 200);
  assert.equal(body.model?.contextWindowOverride, 1_000_000);
  assert.equal(body.model?.contextWindowOverrideSource, "manual");

  const record = contextOverrides.getModelContextOverrideRecord(
    "qwen-cloud-token-plan",
    "qwen3.8-max"
  );
  assert.ok(record, "override record should exist");
  assert.equal(record!.realContext, 1_000_000);
  assert.equal(record!.source, "manual");

  // getTokenLimit is what the chatCore guard reads; no override this provider/model
  // unknown falls into DEFAULT_LIMITS.default (128000) and the guard rejects with 400.
  assert.equal(contextManager.getTokenLimit("qwen-cloud-token-plan", "qwen3.8-max"), 1_000_000);
});

test("POST without contextWindowOverride creates no override (default preserved)", async () => {
  const res = await providerModelsRoute.POST(
    buildRequest("POST", { provider: "qwen-cloud-token-plan", modelId: "plain-model" })
  );
  assert.equal(res.status, 200);
  assert.equal(
    contextOverrides.getModelContextOverrideRecord("qwen-cloud-token-plan", "plain-model"),
    null
  );
  assert.equal(contextManager.getTokenLimit("qwen-cloud-token-plan", "plain-model"), 128000);
});

test("POST on an already-existing model id still applies the override", async () => {
  // addCustomModel returns the existing row without rewriting; the override must be
  // applied anyway (operator's intention when re-submitting with the window).
  await providerModelsRoute.POST(buildRequest("POST", { provider: "p1", modelId: "m1" }));
  const res = await providerModelsRoute.POST(
    buildRequest("POST", { provider: "p1", modelId: "m1", contextWindowOverride: 256_000 })
  );
  assert.equal(res.status, 200);
  const record = contextOverrides.getModelContextOverrideRecord("p1", "m1");
  assert.equal(record?.realContext, 256_000);
});

test("POST with a prefixed id on a compatible node keys the override by the stored bare id", async () => {
  // #17334 grava o row sob o id sem prefixo; o guard consulta esse mesmo id. Um override
  // written under the pasted id (`strata/model`) would never be read and the model would fall into 128k.
  const nodeId = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440001";
  await providersDb.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    name: "Strata",
    prefix: "strata",
    baseUrl: "http://127.0.0.1:8080",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });

  const res = await providerModelsRoute.POST(
    buildRequest("POST", {
      provider: nodeId,
      modelId: "strata/strata/qwen3.8-max",
      contextWindowOverride: 1_000_000,
    })
  );
  const body = (await res.json()) as {
    model?: { id?: string; contextWindowOverride?: number };
  };
  assert.equal(res.status, 200);
  assert.equal(body.model?.id, "qwen3.8-max");
  assert.equal(body.model?.contextWindowOverride, 1_000_000);

  assert.equal(
    contextOverrides.getModelContextOverrideRecord(nodeId, "qwen3.8-max")?.realContext,
    1_000_000
  );
  assert.equal(
    contextOverrides.getModelContextOverrideRecord(nodeId, "strata/strata/qwen3.8-max"),
    null
  );
  assert.equal(contextManager.getTokenLimit(nodeId, "qwen3.8-max"), 1_000_000);
});
