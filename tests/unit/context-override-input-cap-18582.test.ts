import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-context-18582-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const sync = await import("../../src/lib/modelsDevSync.ts");
const contexts = await import("../../src/lib/db/modelContextOverrides.ts");
const overrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const caps = await import("../../src/lib/modelCapabilities.ts");
const { createModelCapabilityResolutionSnapshot } =
  await import("../../src/lib/modelCapabilityResolutionSnapshot.ts");
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const provider = "openai-compatible-chat-18582";
const model = "gemma-4-E2B-it-GGUF";
const input = { provider, model };

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

test("#18582 context override replaces stale synced input limits in the gate and catalog", () => {
  sync.saveModelsDevCapabilities({
    [provider]: {
      [model]: {
        tool_call: null,
        reasoning: null,
        attachment: null,
        structured_output: null,
        temperature: null,
        modalities_input: '["text"]',
        modalities_output: '["text"]',
        knowledge_cutoff: null,
        release_date: null,
        last_updated: null,
        status: null,
        family: null,
        open_weights: null,
        limit_context: 8064,
        limit_input: 8064,
        limit_output: 4096,
        interleaved_field: null,
      },
    },
  });
  assert.equal(caps.resolveInputTokenCapForGate(input), 8064);
  contexts.setModelContextOverride(provider, model, 131000, "manual");
  const snapshot = createModelCapabilityResolutionSnapshot();
  for (const resolutionSnapshot of [undefined, snapshot]) {
    const resolved = caps.getResolvedModelCapabilities(input, undefined, resolutionSnapshot);
    assert.equal(resolved.contextWindow, 131000);
    assert.equal(resolved.maxInputTokens, 131000);
    assert.equal(resolved.maxOutputTokens, 4096);
  }
  assert.equal(caps.resolveInputTokenCapForGate(input), 131000);
  assert.equal(caps.resolveInputTokenCapForGate(input, { isCombo: true }), 131000);
  assert.equal(
    caps.getResolvedModelCapabilities(input, { persistedOverrides: false }).maxInputTokens,
    8064
  );
  for (const enrichment of [
    undefined,
    { modelsDevPricing: null, capabilityResolutionSnapshot: snapshot },
  ]) {
    const row = enrichCatalogModelEntry(
      { id: `${provider}/${model}`, context_length: 8064, max_input_tokens: 8064 },
      input,
      enrichment
    );
    assert.equal(row.context_length, 131000);
    assert.equal(row.max_input_tokens, 131000);
  }
  const publicRow = enrichCatalogModelEntry(
    { id: `unsloth18582/${model}`, context_length: 8064, max_input_tokens: 8064 },
    { provider: "unsloth18582", model },
    {
      modelsDevPricing: null,
      capabilityResolutionSnapshot: snapshot,
      providerNodeIdsByPrefix: { unsloth18582: provider },
    }
  );
  assert.equal(publicRow.context_length, 131000);
  assert.equal(publicRow.max_input_tokens, 131000);

  overrides.setModelCapabilityOverride(`${provider}/${model}`, "max_input_tokens", 4000);
  assert.equal(caps.resolveInputTokenCapForGate(input), 4000);
  assert.equal(caps.resolveInputTokenCapForGate(input, { isCombo: true }), 4000);
  assert.equal(caps.getResolvedModelCapabilities(input).maxInputTokens, 4000);
  const limited = enrichCatalogModelEntry(
    { id: `${provider}/${model}`, max_input_tokens: 8064 },
    input
  );
  assert.equal(limited.max_input_tokens, 4000);
  overrides.removeModelCapabilityOverride(`${provider}/${model}`, "max_input_tokens");
  contexts.removeModelContextOverride(provider, model);
  assert.equal(caps.resolveInputTokenCapForGate(input), 8064);
});

test("#18582 a direct 40K request reaches upstream after raising the context override", async () => {
  const originalFetch = globalThis.fetch;
  let fetches = 0;
  globalThis.fetch = async () => {
    fetches++;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-18582",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 40000, completion_tokens: 1, total_tokens: 40001 },
      }),
      { headers: { "content-type": "application/json" } }
    );
  };
  contexts.setModelContextOverride(provider, model, 131000, "manual");
  const body = {
    model,
    messages: [{ role: "user", content: "x".repeat(160000) }],
    stream: false,
    max_tokens: 10,
  };
  const request = {
    body,
    modelInfo: { provider, model, extendedContext: false },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://context-18582.example.test/v1" },
    },
    clientRawRequest: { endpoint: "/v1/chat/completions", body, headers: new Headers() },
    userAgent: "unit-test",
    isCombo: false,
    connectionId: undefined,
    comboName: undefined,
    onCredentialsRefreshed: undefined,
    onRequestSuccess: undefined,
    onStreamFailure: undefined,
    onDisconnect: undefined,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  };
  try {
    const result = await handleChatCore(request);
    assert.equal(result.success, true);
    assert.equal(fetches, 1);
    // Preserve explicit input-only ceilings even when the context is larger.
    overrides.setModelCapabilityOverride(`${provider}/${model}`, "max_input_tokens", 4000);
    const rejected = await handleChatCore({ ...request, body: { ...body } });
    assert.equal(rejected.status, 400);
    assert.equal(fetches, 1, "input ceiling must reject before another upstream call");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
