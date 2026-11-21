import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-vertex-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { transformToOmniRoute, saveSyncedPricing } = await import("../../src/lib/pricingSync.ts");
const { remapHistoricalLitellmRows } = await import("../../src/lib/litellmProviderMap.ts");
const { getPricingForModel } = await import("../../src/lib/db/settings/pricing.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");

const RAW_LITELLM_VERTEX = {
  "vertex_ai/gemini-4-argon": {
    input_cost_per_token: 0.000002,
    output_cost_per_token: 0.00001,
    cache_read_input_token_cost: 0.0000001,
    litellm_provider: "vertex_ai",
    mode: "chat",
  },
  "vertex_ai-language-models/gemini-2.5-flash": {
    input_cost_per_token: 0.0000003,
    output_cost_per_token: 0.0000025,
    litellm_provider: "vertex_ai-language-models",
    mode: "chat",
  },
  "vertex_ai-anthropic_models/claude-sonnet-4-5": {
    input_cost_per_token: 0.000003,
    output_cost_per_token: 0.000015,
    litellm_provider: "vertex_ai-anthropic_models",
    mode: "chat",
  },
  "vertex_ai-deepseek_models/deepseek-ai/deepseek-v3.1-maas": {
    input_cost_per_token: 0.0000006,
    output_cost_per_token: 0.0000017,
    litellm_provider: "vertex_ai-deepseek_models",
    mode: "chat",
  },
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("transformToOmniRoute maps vertex_ai models to vertex and gemini", () => {
  const result = transformToOmniRoute(RAW_LITELLM_VERTEX);

  assert.ok(result.vertex);
  assert.equal(result.vertex["gemini-4-argon"]?.input, 2);
  assert.equal(result.vertex["gemini-4-argon"]?.output, 10);
  assert.equal(result.vertex["gemini-4-argon"]?.cached, 0.1);

  assert.ok(result.gemini);
  assert.equal(result.gemini["gemini-4-argon"]?.input, 2);

  assert.equal(result.vertex["gemini-2.5-flash"]?.input, 0.3);
  assert.equal(result.vertex["claude-sonnet-4-5"]?.input, 3);
  assert.equal(result.vertex["deepseek-ai/deepseek-v3.1-maas"]?.input, 0.6);
});

test("remapHistoricalLitellmRows copies historical raw vertex buckets into vertex", () => {
  const rows = {
    "vertex_ai-language-models": {
      "gemini-2.5-flash": { input: 0.3, output: 2.5 },
    },
    "vertex_ai-deepseek_models": {
      "deepseek-ai/deepseek-v3.1-maas": { input: 0.6, output: 1.7 },
    },
  };

  remapHistoricalLitellmRows(rows);

  assert.ok(rows.vertex);
  assert.equal(rows.vertex["gemini-2.5-flash"]?.input, 0.3);
  assert.equal(rows.vertex["deepseek-ai/deepseek-v3.1-maas"]?.input, 0.6);
});

test("vertex default rows price Flash and 2.5 tiers at their own rates", async () => {
  const flash = await getPricingForModel("vertex", "gemini-3-flash-preview");
  assert.ok(flash);
  assert.equal(flash.input, 0.5);
  assert.equal(flash.output, 3);
  assert.equal(flash.cached, 0.05);

  const flashLite = await getPricingForModel("vertex", "gemini-2.5-flash-lite");
  assert.ok(flashLite);
  assert.equal(flashLite.cached, 0.01);

  const proShort = await calculateCostDetailed("vertex", "gemini-2.5-pro", {
    prompt_tokens: 200_000,
    completion_tokens: 100_000,
  });
  assert.equal(proShort.priced, true);
  // 200K × $1.25 + 100K × $10 — exactly 200K stays on the base tier.
  assert.ok(Math.abs(proShort.costUsd - 1.25) < 1e-9, `got ${proShort.costUsd}`);

  const proLong = await calculateCostDetailed("vertex", "gemini-2.5-pro", {
    prompt_tokens: 300_000,
    completion_tokens: 100_000,
  });
  assert.equal(proLong.priced, true);
  // Over 200K the whole request moves to $2.50 in / $15 out.
  assert.ok(Math.abs(proLong.costUsd - 2.25) < 1e-9, `got ${proLong.costUsd}`);
});

test("getPricingForModel resolves vertex gemini-4-argon default and synced prices", async () => {
  const defaultPricing = await getPricingForModel("vertex", "gemini-4-argon");
  assert.ok(defaultPricing);
  assert.equal(defaultPricing.input, 2);
  assert.equal(defaultPricing.output, 10);

  saveSyncedPricing(transformToOmniRoute(RAW_LITELLM_VERTEX));

  const syncedPricing = await getPricingForModel("vertex", "gemini-4-argon");
  assert.ok(syncedPricing);
  assert.equal(syncedPricing.input, 2);
  assert.equal(syncedPricing.output, 10);

  const cost = await calculateCostDetailed("vertex", "gemini-4-argon", {
    prompt_tokens: 1_000_000,
    completion_tokens: 1_000_000,
  });
  assert.equal(cost.priced, true);
  assert.equal(cost.costUsd, 12);
});
