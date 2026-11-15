import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Gemini 4 Hydrogen was released on 2026-11-12.
// Validates issue #20124: catalog registration, bare alias (defaults to -high),
// 65535 output cap, thinking levels (including new xhigh), and pricing rows.

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-4-hydrogen-catalog-"));
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
const { GEMINI_4_HYDROGEN_PRICING } =
  await import("../../src/shared/constants/pricing/shared-tiers.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");
const { geminiProvider } = await import("../../open-sse/config/providers/registry/gemini/index.ts");
const { vertexProvider } = await import("../../open-sse/config/providers/registry/vertex/index.ts");
const { resolveAntigravityModelId, isUserCallableAntigravityModelId } =
  await import("../../open-sse/config/antigravityModelAliases.ts");
const { resolveAntigravityOutputCap } =
  await import("../../open-sse/executors/antigravityOutputCap.ts");
const { isGeminiThinkingLevelModel, resolveNativeGeminiThinking } =
  await import("../../open-sse/services/thinkingBudget.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("gemini API-key provider lists gemini-4-hydrogen with tools and vision", () => {
  const hydrogen = geminiProvider.models.find((m) => m.id === "gemini-4-hydrogen");
  assert.ok(hydrogen, "gemini registry must include gemini-4-hydrogen");
  assert.equal(hydrogen.name, "Gemini 4 Hydrogen");
  assert.equal(hydrogen.toolCalling, true);
  assert.equal(hydrogen.supportsVision, true);
});

test("vertex catalog lists gemini-4-hydrogen on the Gemini transport", () => {
  const hydrogen = vertexProvider.models.find((m) => m.id === "gemini-4-hydrogen");
  assert.ok(hydrogen, "vertex registry must include gemini-4-hydrogen");
  assert.equal(hydrogen.name, "Gemini 4 Hydrogen (Vertex)");
});

test("antigravity resolves bare gemini-4-hydrogen to the high tier", () => {
  assert.equal(resolveAntigravityModelId("gemini-4-hydrogen"), "gemini-4-hydrogen-high");
  assert.equal(isUserCallableAntigravityModelId("gemini-4-hydrogen"), true);
});

test("antigravity keeps explicit gemini-4-hydrogen tiers verbatim", () => {
  for (const tier of ["xhigh", "high", "medium", "low"]) {
    const tierId = `gemini-4-hydrogen-${tier}`;
    assert.equal(resolveAntigravityModelId(tierId), tierId);
    assert.equal(isUserCallableAntigravityModelId(tierId), true);
  }
});

test("resolveAntigravityOutputCap preserves 65,535 token ceiling for Hydrogen tiers", () => {
  for (const tier of ["xhigh", "high", "medium", "low"]) {
    const cap = resolveAntigravityOutputCap(`gemini-4-hydrogen-${tier}`);
    assert.equal(cap, 65535, `gemini-4-hydrogen-${tier} output cap must be 65535, not 16384`);
  }
});

test("gemini-4-hydrogen spec matches 1M context / 65,536 default output and 4 thinking levels", () => {
  const spec = getModelSpec("gemini-4-hydrogen");
  assert.ok(spec);
  assert.equal(spec.contextWindow, 1048576);
  assert.equal(spec.maxOutputTokens, 65536);
  assert.equal(spec.supportsTools, true);
  assert.equal(spec.supportsVision, true);
  assert.deepEqual(spec.geminiThinkingLevels, ["low", "medium", "high", "xhigh"]);
  assert.equal(spec.defaultGeminiThinkingLevel, "high");
});

test("gemini-4-hydrogen is recognized as thinkingLevel model", () => {
  assert.equal(isGeminiThinkingLevelModel("gemini-4-hydrogen"), true);
  assert.equal(isGeminiThinkingLevelModel("antigravity/gemini-4-hydrogen-high"), true);
  assert.equal(isGeminiThinkingLevelModel("vertex/gemini-4-hydrogen"), true);
});

test("resolveNativeGeminiThinking routes xhigh and max to xhigh for gemini-4-hydrogen", () => {
  const xhighResult = resolveNativeGeminiThinking("gemini-4-hydrogen", {
    reasoning_effort: "xhigh",
  });
  assert.deepEqual(xhighResult, { thinkingLevel: "xhigh", includeThoughts: true });

  const maxResult = resolveNativeGeminiThinking("gemini-4-hydrogen", {
    reasoning_effort: "max",
  });
  assert.deepEqual(maxResult, { thinkingLevel: "xhigh", includeThoughts: true });

  const highResult = resolveNativeGeminiThinking("gemini-4-hydrogen", {
    reasoning_effort: "high",
  });
  assert.deepEqual(highResult, { thinkingLevel: "high", includeThoughts: true });

  const mediumResult = resolveNativeGeminiThinking("gemini-4-hydrogen", {
    reasoning_effort: "medium",
  });
  assert.deepEqual(mediumResult, { thinkingLevel: "medium", includeThoughts: true });

  const lowResult = resolveNativeGeminiThinking("gemini-4-hydrogen", {
    reasoning_effort: "low",
  });
  assert.deepEqual(lowResult, { thinkingLevel: "low", includeThoughts: true });

  const defaultResult = resolveNativeGeminiThinking("gemini-4-hydrogen", {});
  assert.deepEqual(defaultResult, { thinkingLevel: "high", includeThoughts: true });
});

test("resolveNativeGeminiThinking clamps xhigh to high for models without xhigh", () => {
  const result = resolveNativeGeminiThinking("gemini-3.5-flash-lite", {
    reasoning_effort: "xhigh",
  });
  assert.deepEqual(result, { thinkingLevel: "high", includeThoughts: true });
});

test("gemini provider has default pricing row for gemini-4-hydrogen", () => {
  const row = getPricingForModel("gemini", "gemini-4-hydrogen");
  assert.ok(row, "gemini/gemini-4-hydrogen must have a default pricing row");
  assert.equal(row.input, 1.5);
  assert.equal(row.output, 7.5);
  assert.equal(row.cached, 0.075);
  assert.deepEqual(row, GEMINI_4_HYDROGEN_PRICING);
});

test("antigravity provider prices bare gemini-4-hydrogen and all tiers", () => {
  for (const modelId of [
    "gemini-4-hydrogen",
    "gemini-4-hydrogen-low",
    "gemini-4-hydrogen-medium",
    "gemini-4-hydrogen-high",
    "gemini-4-hydrogen-xhigh",
  ]) {
    const row = getPricingForModel("antigravity", modelId);
    assert.ok(row, `antigravity/${modelId} must resolve a pricing row`);
    assert.deepEqual(row, GEMINI_4_HYDROGEN_PRICING);
  }
});

test("calculateCostDetailed bills gemini and antigravity Hydrogen calls (not $0)", async () => {
  const geminiCost = await calculateCostDetailed("gemini", "gemini-4-hydrogen", {
    input: 1_000_000,
    output: 1_000_000,
  });
  assert.equal(geminiCost.priced, true);
  assert.equal(geminiCost.costUsd, 9.0);

  const agyCost = await calculateCostDetailed("antigravity", "gemini-4-hydrogen-high", {
    input: 1_000_000,
    output: 1_000_000,
  });
  assert.equal(agyCost.priced, true);
  assert.equal(agyCost.costUsd, 9.0);
});
