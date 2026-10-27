import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Gemini 4 Argon is GA on the Gemini API (AI Studio API key). Specs and pricing
// existed only for the Antigravity subscription aliases; the direct `gemini`
// provider had no catalog entry and no default pricing row, so API-key usage
// of gemini-4-argon was billed at $0.
// Source: https://ai.google.dev/gemini-api/docs/models/gemini-4-argon
//         https://ai.google.dev/gemini-api/docs/pricing

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-4-argon-catalog-"));
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
const { GEMINI_3_7_FLASH_PROMO_PRICING, GEMINI_4_ARGON_PROMO_PRICING } =
  await import("../../src/shared/constants/pricing/shared-tiers.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");
const { geminiProvider } = await import("../../open-sse/config/providers/registry/gemini/index.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("gemini API-key provider lists gemini-4-argon with tools and vision", () => {
  const argon = geminiProvider.models.find((m) => m.id === "gemini-4-argon");
  assert.ok(argon, "gemini registry must include gemini-4-argon");
  assert.equal(argon.name, "Gemini 4 Argon");
  assert.equal(argon.toolCalling, true);
  assert.equal(argon.supportsVision, true);
  // The catalog default stays gemini-3.8-flash.
  assert.equal(geminiProvider.models[0].id, "gemini-3.8-flash");
});

test("gemini-4-argon spec matches the documented 1M context / 65,536 default output", () => {
  const spec = getModelSpec("gemini-4-argon");
  assert.ok(spec);
  assert.equal(spec.contextWindow, 1048576);
  assert.equal(spec.maxOutputTokens, 65536);
  assert.equal(spec.supportsTools, true);
  assert.equal(spec.supportsVision, true);
});

test("gemini provider has a default pricing row for gemini-4-argon (intro paid tier)", () => {
  const row = getPricingForModel("gemini", "gemini-4-argon");
  assert.ok(row, "gemini/gemini-4-argon must have a default pricing row");
  assert.equal(row.input, 2.0);
  assert.equal(row.output, 10.0);
  assert.equal(row.cached, 0.1);
  assert.deepEqual(row, GEMINI_4_ARGON_PROMO_PRICING);
});

test("gemini/gemini-4-argon is billed (not $0) through the cost calculator", async () => {
  const cost = await calculateCostDetailed("gemini", "gemini-4-argon", {
    input: 1_000_000,
    output: 1_000_000,
  });
  assert.equal(cost.priced, true, "gemini/gemini-4-argon must resolve a pricing row");
  assert.equal(cost.costUsd, 12.0);
});

test("neighbour gemini/gemini-3.7-flash pricing is unchanged", () => {
  assert.deepEqual(
    getPricingForModel("gemini", "gemini-3.7-flash"),
    GEMINI_3_7_FLASH_PROMO_PRICING
  );
});
