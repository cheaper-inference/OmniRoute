import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ModelCapabilityEntry } from "../../src/lib/modelsDevSync/transform.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-go-limits-"));
process.env.DATA_DIR = dataDir;
const savedContextEnv = new Map(
  ["CONTEXT_LENGTH_OPENCODE_GO", "CONTEXT_LENGTH_DEFAULT"].map((name) => [name, process.env[name]])
);
for (const name of savedContextEnv.keys()) delete process.env[name];
const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilities, createModelCapabilityResolutionSnapshot } =
  await import("../../src/lib/modelCapabilities.ts");
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
const { getTokenLimit } = await import("../../open-sse/services/contextManager.ts");
test.after(() => {
  for (const [name, value] of savedContextEnv) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// Exact provider/base-model TOMLs at anomalyco/models.dev commit
// 26d4dc7b66c93470f4e5337708e794b62a589620; never infer an integer from "1M".
const limits: readonly (readonly [string, number, number])[] = [
  ["deepseek-v4.1-flash", 1000000, 384000],
  ["claude-haiku-5-5", 1000000, 128000],
  ["gpt-6-luna", 1050000, 128000],
  ["grok-4.6", 500000, 500000],
  ["grok-4.7", 500000, 500000],
  ["hy4-preview", 1024000, 64000],
  ["longcat-2.0", 1000000, 131072],
  ["mimo-v2.6-flash", 1048576, 131072],
  ["mimo-v2.6-pro", 1048576, 131072],
  ["qwen3.7-plus", 1000000, 65536],
  ["qwen3.8-flash", 1000000, 131072],
  ["space-bunny", 1048576, 524288],
];

for (const [model, context, output] of limits) {
  test(`#16579 ${model} exposes exact Go limits without models.dev sync`, () => {
    const snapshot = createModelCapabilityResolutionSnapshot();
    assert.equal(Object.keys(snapshot.synced).length, 0);
    const caps = getResolvedModelCapabilities(
      { provider: "opencode-go", model },
      undefined,
      snapshot
    );
    assert.equal(caps.contextWindow, context);
    assert.equal(getTokenLimit("opencode-go", model, snapshot), context);
    assert.equal(caps.maxOutputTokens, output);
    const imported: Record<string, unknown> = {
      id: `opencode-go/${model}`,
      root: model,
      owned_by: "opencode-go",
      name: model,
    };
    const row = enrichCatalogModelEntry(imported, undefined, {
      modelsDevPricing: {},
      userPricing: {},
      capabilityResolutionSnapshot: snapshot,
    });
    assert.equal(row.context_length, context);
    assert.equal(row.max_output_tokens, output);
  });
}

test("#16579 explicit input ceilings stay narrower than the full context", () => {
  const snapshot = createModelCapabilityResolutionSnapshot();
  for (const [model, expected] of [
    ["gpt-6-luna", 922000],
    ["space-bunny", 524288],
  ] as const) {
    const caps = getResolvedModelCapabilities(
      { provider: "opencode-go", model },
      undefined,
      snapshot
    );
    assert.equal(caps.maxInputTokens, expected);
  }
});

test("#16579 synced and persisted context/output overrides retain precedence", () => {
  const row: ModelCapabilityEntry = {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: 345678,
    limit_input: 300000,
    limit_output: 12000,
    interleaved_field: null,
  };
  const snapshot = {
    ...createModelCapabilityResolutionSnapshot(),
    synced: { "opencode-go": { "grok-4.7": row } },
  };
  const caps = getResolvedModelCapabilities("opencode-go/grok-4.7", undefined, snapshot);
  assert.equal(caps.contextWindow, 345678);
  assert.equal(caps.maxOutputTokens, 12000);
  assert.equal(caps.maxInputTokens, 300000);
  const operatorSnapshot = {
    ...snapshot,
    contextOverrides: new Map([["opencode-go", new Map([["grok-4.7", 400000]])]]),
    maxTokenOverrides: new Map([["opencode-go", new Map([["grok-4.7", 16000]])]]),
    maxInputTokenOverrides: new Map([["opencode-go", new Map([["grok-4.7", 200000]])]]),
  };
  const overridden = getResolvedModelCapabilities(
    "opencode-go/grok-4.7",
    undefined,
    operatorSnapshot
  );
  assert.equal(overridden.contextWindow, 400000);
  assert.equal(overridden.maxOutputTokens, 16000);
  assert.equal(overridden.maxInputTokens, 200000);
});

test("#16579 catalog rows preserve the documented Go request formats", () => {
  for (const [model, format] of [
    ["gpt-6-luna", "openai-responses"],
    ["grok-4.6", "openai-responses"],
    ["grok-4.7", "openai-responses"],
    ["claude-haiku-5-5", "claude"],
    ["qwen3.7-plus", "claude"],
    ["qwen3.8-flash", "claude"],
  ] as const)
    assert.equal(getModelTargetFormat("opencode-go", model), format, model);
});

test("#16579 undocumented models do not inherit a guessed family window", () => {
  const snapshot = createModelCapabilityResolutionSnapshot();
  const caps = getResolvedModelCapabilities("opencode-go/omen-alpha", undefined, snapshot);
  assert.equal(caps.contextWindow, null);
});

test("#16579 explicit environment limits still override catalog context", () => {
  process.env.CONTEXT_LENGTH_OPENCODE_GO = "123456";
  try {
    assert.equal(getTokenLimit("opencode-go", "grok-4.7"), 123456);
  } finally {
    delete process.env.CONTEXT_LENGTH_OPENCODE_GO;
  }
});
