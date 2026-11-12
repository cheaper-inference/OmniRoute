import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Gemini 4 Carbon is GA on the Gemini API and Antigravity (Google AI Ultra).
// Validates issue #19796: catalog registration, bare alias, output cap (65535),
// and pricing rows (preventing $0 cost records).

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-4-carbon-catalog-"));
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
const { GEMINI_4_CARBON_PROMO_PRICING } =
  await import("../../src/shared/constants/pricing/shared-tiers.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");
const { geminiProvider } = await import("../../open-sse/config/providers/registry/gemini/index.ts");
const { vertexProvider } = await import("../../open-sse/config/providers/registry/vertex/index.ts");
const { resolveAntigravityModelId, isUserCallableAntigravityModelId } =
  await import("../../open-sse/config/antigravityModelAliases.ts");
const { resolveAntigravityOutputCap } =
  await import("../../open-sse/executors/antigravityOutputCap.ts");
const { isGeminiThinkingLevelModel } = await import("../../open-sse/services/thinkingBudget.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("gemini API-key provider lists gemini-4-carbon with tools and vision", () => {
  const carbon = geminiProvider.models.find((m) => m.id === "gemini-4-carbon");
  assert.ok(carbon, "gemini registry must include gemini-4-carbon");
  assert.equal(carbon.name, "Gemini 4 Carbon");
  assert.equal(carbon.toolCalling, true);
  assert.equal(carbon.supportsVision, true);
});

test("vertex catalog lists gemini-4-carbon on the Gemini transport", () => {
  const carbon = vertexProvider.models.find((m) => m.id === "gemini-4-carbon");
  assert.ok(carbon, "vertex registry must include gemini-4-carbon");
  assert.equal(carbon.name, "Gemini 4 Carbon (Vertex)");
});

test("antigravity resolves bare gemini-4-carbon to the medium tier", () => {
  assert.equal(resolveAntigravityModelId("gemini-4-carbon"), "gemini-4-carbon-medium");
  assert.equal(isUserCallableAntigravityModelId("gemini-4-carbon"), true);
});

test("antigravity keeps explicit gemini-4-carbon tiers verbatim", () => {
  for (const tier of ["high", "medium", "low"]) {
    const tierId = `gemini-4-carbon-${tier}`;
    assert.equal(resolveAntigravityModelId(tierId), tierId);
    assert.equal(isUserCallableAntigravityModelId(tierId), true);
  }
});

test("resolveAntigravityOutputCap preserves 65,535 token ceiling for Carbon tiers", () => {
  for (const tier of ["high", "medium", "low"]) {
    const cap = resolveAntigravityOutputCap(`gemini-4-carbon-${tier}`);
    assert.equal(cap, 65535, `gemini-4-carbon-${tier} output cap must be 65535, not 16384`);
  }
});

test("gemini-4-carbon spec matches 1M context / 65,536 default output", () => {
  const spec = getModelSpec("gemini-4-carbon");
  assert.ok(spec);
  assert.equal(spec.contextWindow, 1048576);
  assert.equal(spec.maxOutputTokens, 65536);
  assert.equal(spec.supportsTools, true);
  assert.equal(spec.supportsVision, true);
});

test("gemini-4-carbon is recognized as thinkingLevel model", () => {
  assert.equal(isGeminiThinkingLevelModel("gemini-4-carbon"), true);
  assert.equal(isGeminiThinkingLevelModel("antigravity/gemini-4-carbon-high"), true);
  assert.equal(isGeminiThinkingLevelModel("vertex/gemini-4-carbon"), true);
});

test("gemini provider has default pricing row for gemini-4-carbon", () => {
  const row = getPricingForModel("gemini", "gemini-4-carbon");
  assert.ok(row, "gemini/gemini-4-carbon must have a default pricing row");
  assert.equal(row.input, 2.0);
  assert.equal(row.output, 10.0);
  assert.equal(row.cached, 0.1);
  assert.deepEqual(row, GEMINI_4_CARBON_PROMO_PRICING);
});

test("antigravity provider prices bare gemini-4-carbon and all tiers", () => {
  for (const modelId of [
    "gemini-4-carbon",
    "gemini-4-carbon-low",
    "gemini-4-carbon-medium",
    "gemini-4-carbon-high",
  ]) {
    const row = getPricingForModel("antigravity", modelId);
    assert.ok(row, `antigravity/${modelId} must resolve a pricing row`);
    assert.deepEqual(row, GEMINI_4_CARBON_PROMO_PRICING);
  }
});

test("calculateCostDetailed bills gemini and antigravity Carbon calls (not $0)", async () => {
  const geminiCost = await calculateCostDetailed("gemini", "gemini-4-carbon", {
    input: 1_000_000,
    output: 1_000_000,
  });
  assert.equal(geminiCost.priced, true);
  assert.equal(geminiCost.costUsd, 12.0);

  const agyCost = await calculateCostDetailed("antigravity", "gemini-4-carbon-high", {
    input: 1_000_000,
    output: 1_000_000,
  });
  assert.equal(agyCost.priced, true);
  assert.equal(agyCost.costUsd, 12.0);
});
