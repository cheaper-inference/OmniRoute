import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Gemini 4 Carbon (2026-11-10) is served to Google AI Ultra plans by the live
// Antigravity `:fetchAvailableModels` catalog at its -low/-medium/-high tier ids,
// and to paid Gemini API keys as `gemini-4-carbon`. Without registry entries the
// tiers routed but billed as unpriced ($0), the bare id was rejected, and the
// output cap fell back to the conservative default.
// Source: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-4-carbon-"));
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const { GEMINI_4_CARBON_PROMO_PRICING } =
  await import("../../src/shared/constants/pricing/shared-tiers.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");
const { ANTIGRAVITY_SHARED_MODELS } =
  await import("../../open-sse/config/antigravitySharedModels.ts");
const { ANTIGRAVITY_MODEL_ALIASES } =
  await import("../../open-sse/config/antigravityModelAliases.ts");
const { geminiProvider } = await import("../../open-sse/config/providers/registry/gemini/index.ts");
const { getAntigravityQuotaFamily } =
  await import("../../open-sse/services/antigravityQuotaFamily.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

const TIERS = ["gemini-4-carbon-low", "gemini-4-carbon-medium", "gemini-4-carbon-high"];
const ONE_M = { input: 1_000_000, output: 1_000_000 };

test("Carbon introductory pricing matches the published $2/$10 rate", () => {
  assert.equal(GEMINI_4_CARBON_PROMO_PRICING.input, 2);
  assert.equal(GEMINI_4_CARBON_PROMO_PRICING.output, 10);
});

for (const provider of ["antigravity", "agy"]) {
  for (const id of [...TIERS, "gemini-4-carbon"]) {
    test(`${provider}/${id} is billable at Carbon pricing`, async () => {
      const result = await calculateCostDetailed(provider, id, ONE_M);
      assert.equal(result.priced, true, `${provider}/${id} must resolve as priced`);
      assert.equal(result.costUsd, 12);
    });
  }
}

test("gemini API-key gemini-4-carbon is billable", async () => {
  const result = await calculateCostDetailed("gemini", "gemini-4-carbon", ONE_M);
  assert.equal(result.priced, true);
  assert.equal(result.costUsd, 12);
});

test("Antigravity shared catalog advertises all Carbon tiers with tools and vision", () => {
  for (const id of TIERS) {
    const m = ANTIGRAVITY_SHARED_MODELS.find((x) => x.id === id);
    assert.ok(m, `${id} must be in ANTIGRAVITY_SHARED_MODELS`);
    assert.equal(m.toolCalling, true);
    assert.equal(m.supportsVision, true);
    assert.equal(m.supportsReasoning, true);
    assert.equal(m.maxOutputTokens, 65535);
  }
});

test("bare gemini-4-carbon aliases to the medium tier on Antigravity", () => {
  assert.equal(ANTIGRAVITY_MODEL_ALIASES["gemini-4-carbon"], "gemini-4-carbon-medium");
});

test("Carbon has a model spec so the output cap is not the conservative fallback", () => {
  for (const id of ["gemini-4-carbon", "agy/gemini-4-carbon-high", "gemini/gemini-4-carbon"]) {
    const spec = getModelSpec(id);
    assert.ok(spec, `${id} must resolve a spec`);
    assert.equal(spec.maxOutputTokens, 65536);
    assert.equal(spec.supportsTools, true);
  }
});

test("gemini API-key provider lists gemini-4-carbon", () => {
  const m = geminiProvider.models.find((x) => x.id === "gemini-4-carbon");
  assert.ok(m);
  assert.equal(m.toolCalling, true);
  assert.equal(m.supportsVision, true);
});

test("Carbon shares the Gemini 4 quota family with Argon", () => {
  for (const id of TIERS) assert.equal(getAntigravityQuotaFamily(`agy/${id}`), "argon");
});

test("Antigravity executor caps Carbon tiers at the declared 65535, not the 16384 fallback", async () => {
  const { resolveAntigravityOutputCap } =
    await import("../../open-sse/executors/antigravityOutputCap.ts");
  for (const id of TIERS) assert.equal(resolveAntigravityOutputCap(id), 65535, id);
});
