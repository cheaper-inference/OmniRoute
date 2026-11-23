import test from "node:test";
import assert from "node:assert/strict";
import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";
import {
  getResolvedModelCapabilities,
  createModelCapabilityResolutionSnapshot,
} from "../../src/lib/modelCapabilities.ts";
import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";

test("#16579 OpenCode Go imports DeepSeek Flash alias with its full 1M context", () => {
  const models = opencode_goProvider.models ?? [];
  for (const id of ["deepseek-v4.1-flash", "deepseek-flash"]) {
    const model = models.find((entry) => entry.id === id);
    assert.ok(model, id + " must be in the provider registry");
    assert.equal(model.contextLength, 1_000_000);
    assert.equal(model.maxOutputTokens, 384_000);
  }
});

test("#16579 OpenCode Go MiniMax M2.5 inherits its verified 204800-token window", () => {
  const model = (opencode_goProvider.models ?? []).find((entry) => entry.id === "minimax-m2.5");
  assert.ok(model);
  assert.equal(model.contextLength, 204_800);
  assert.equal(model.maxOutputTokens, 131_072);
  assert.equal(model.targetFormat, "claude");
});

// Exercise the actual /v1/models capability resolution, not just the registry rows.
test("#16579 OpenCode Go capability resolver uses the declared context windows", () => {
  for (const [id, context] of [
    ["deepseek-flash", 1_000_000],
    ["deepseek-v4.1-flash", 1_000_000],
    ["minimax-m2.5", 204_800],
  ] as const) {
    const caps = getResolvedModelCapabilities({ provider: "opencode-go", model: id }, {
      persistedOverrides: false,
    });
    assert.equal(caps.contextWindow, context, id);
  }
});

test("#16579 shared MiniMax M2.5 metadata matches verified upstream limit", () => {
  assert.equal(getModelSpec("minimax-m2.5")?.contextWindow, 204_800);
  assert.equal(getModelSpec("MiniMax-M2.5")?.contextWindow, 204_800);
  assert.equal(getModelSpec("minimax-m2.7")?.contextWindow, 204_800);
});

test("#16579 verified affected models keep their published Go-tier limits", () => {
  // These limits were verified in issue #16579 against the official OpenCode
  // model pages. Do not pin space-bunny or omen-alpha: neither is verified.
  const verified = [
    ["deepseek-v4.1-flash", 1_000_000, 384_000],
    ["deepseek-flash", 1_000_000, 384_000],
    ["claude-haiku-5-5", 1_000_000, 128_000],
    ["gpt-6-luna", 1_050_000, 128_000],
    ["grok-4.6", 500_000, 500_000],
    ["grok-4.7", 500_000, 500_000],
    ["hy4-preview", 1_024_000, 64_000],
    ["longcat-2.0", 1_000_000, 131_072],
    ["mimo-v2.6-flash", 1_048_576, 131_072],
    ["mimo-v2.6-pro", 1_048_576, 131_072],
    ["qwen3.7-plus", 1_000_000, 65_536],
    ["qwen3.8-flash", 1_000_000, 131_072],
    ["minimax-m2.5", 204_800, 131_072],
  ] as const;
  const models = opencode_goProvider.models ?? [];
  for (const [id, context, output] of verified) {
    const model = models.find((entry) => entry.id === id);
    assert.ok(model, `Go registry is missing ${id}`);
    assert.equal(model.contextLength, context, `${id}: context window`);
    assert.equal(model.maxOutputTokens, output, `${id}: output limit`);
    const caps = getResolvedModelCapabilities(
      { provider: "opencode-go", model: id },
      { persistedOverrides: false }
    );
    assert.equal(caps.contextWindow, context, `${id}: resolved context window`);
    assert.equal(caps.maxOutputTokens, output, `${id}: resolved output limit`);
  }
});

test("#16579 imported catalog placeholders are replaced for verified OpenCode Go models", () => {
  for (const [model, context, output] of [
    ["deepseek-v4.1-flash", 1_000_000, 384_000],
    ["deepseek-flash", 1_000_000, 384_000],
    ["minimax-m2.5", 204_800, 131_072],
  ] as const) {
    const imported = {
      id: `opencode-go/${model}`,
      root: model,
      owned_by: "opencode-go",
      context_length: 200_000,
      max_output_tokens: 32_000,
    };
    const enriched = enrichCatalogModelEntry(imported);
    assert.equal(enriched.context_length, context, `${model}: context`);
    assert.equal(enriched.max_output_tokens, output, `${model}: output`);
  }
});

test("#16579 operator context overrides still win over authoritative Go metadata", () => {
  const snapshot = {
    ...createModelCapabilityResolutionSnapshot(),
    contextOverrides: new Map([
      ["opencode-go", new Map([["deepseek-flash", 750_000]])],
    ]),
  };
  const caps = getResolvedModelCapabilities(
    { provider: "opencode-go", model: "deepseek-flash" },
    undefined,
    snapshot
  );
  assert.equal(caps.contextWindow, 750_000);
  const enriched = enrichCatalogModelEntry(
    {
      id: "opencode-go/deepseek-flash",
      root: "deepseek-flash",
      owned_by: "opencode-go",
      context_length: 200_000,
    },
    undefined,
    {
      modelsDevPricing: {},
      userPricing: {},
      capabilityResolutionSnapshot: snapshot,
    }
  );
  assert.equal(enriched.context_length, 750_000);
});

test("#16579 imported Go output respects an operator-set override", () => {
  const snapshot = {
    ...createModelCapabilityResolutionSnapshot(),
    maxTokenOverrides: new Map([
      ["opencode-go", new Map([["deepseek-flash", 64_000]])],
    ]),
  };
  const enriched = enrichCatalogModelEntry(
    {
      id: "opencode-go/deepseek-flash",
      root: "deepseek-flash",
      owned_by: "opencode-go",
      max_output_tokens: 32_000,
    },
    undefined,
    {
      modelsDevPricing: {},
      userPricing: {},
      capabilityResolutionSnapshot: snapshot,
    }
  );
  assert.equal(enriched.max_output_tokens, 64_000);
});

test("#16579 does not override explicit output caps for unrelated models", () => {
  // The imported Go model catalogue is not generally authoritative: some
  // gateways enforce a narrower upstream limit than the model's native spec.
  const rows = [
    {
      id: "opencode-go/grok-4.7",
      root: "grok-4.7",
      owned_by: "opencode-go",
      max_output_tokens: 32_000,
    },
    {
      id: "deepseek/deepseek-flash",
      root: "deepseek-flash",
      owned_by: "deepseek",
      max_output_tokens: 32_000,
    },
  ];
  for (const row of rows) {
    const enriched = enrichCatalogModelEntry(row);
    assert.equal(enriched.max_output_tokens, 32_000, row.id);
  }
});
