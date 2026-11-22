import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-copilot-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getPricingWithSources, resetAllPricing, updatePricing } =
  await import("../../src/lib/db/settings/pricing.ts");
const { clearSyncedPricing, getSyncedPricing, saveSyncedPricing, transformToOmniRoute } =
  await import("../../src/lib/pricingSync.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");

const MODEL = "claude-sonnet-5.5";
const PROVIDERS = ["github", "gh"];
const PRICE = { input: 2, output: 10, cached: 0.1, cache_creation: 2.5 };
// Rates and provider spelling from LiteLLM's model_prices_and_context_window.json.
const RAW = {
  [`github_copilot/${MODEL}`]: {
    litellm_provider: "github_copilot",
    input_cost_per_token: 0.000002,
    output_cost_per_token: 0.00001,
    cache_read_input_token_cost: 0.0000001,
    cache_creation_input_token_cost: 0.0000025,
    mode: "chat",
  },
};
const TOKENS = { prompt_tokens: 1_000_000, completion_tokens: 1_000_000 };

test.beforeEach(async () => {
  clearSyncedPricing();
  await resetAllPricing();
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("LiteLLM Copilot prices map to the GitHub provider and alias, preserving model IDs and cache rates", () => {
  const transformed = transformToOmniRoute(RAW);
  for (const provider of PROVIDERS) {
    assert.deepEqual(transformed[provider]?.[MODEL], { ...PRICE, mode: "chat" });
  }
  assert.equal(transformed.github_copilot, undefined);
});

for (const provider of PROVIDERS) {
  test(`${provider} requests resolve newly synced Copilot prices`, async () => {
    saveSyncedPricing(transformToOmniRoute(RAW));

    const result = await calculateCostDetailed(provider, MODEL, TOKENS);
    assert.equal(result.priced, true);
    assert.equal(result.costUsd, 12);
  });

  test(`${provider} requests resolve historical github_copilot prices without a re-sync`, async () => {
    saveSyncedPricing({ github_copilot: { [MODEL]: PRICE } });

    const result = await calculateCostDetailed(provider, MODEL, TOKENS);
    assert.equal(result.priced, true);
    assert.equal(result.costUsd, 12);

    const { pricing, sourceMap } = await getPricingWithSources();
    assert.deepEqual(pricing[provider]?.[MODEL], PRICE);
    assert.equal(sourceMap[provider]?.[MODEL], "litellm");
  });

  test(`${provider} user overrides win over remapped historical Copilot prices`, async () => {
    saveSyncedPricing({ github_copilot: { [MODEL]: PRICE } });
    await updatePricing({ [provider]: { [MODEL]: { input: 4, output: 20 } } });

    const result = await calculateCostDetailed(provider, MODEL, TOKENS);
    assert.equal(result.priced, true);
    assert.equal(result.costUsd, 24);

    const { sourceMap } = await getPricingWithSources();
    assert.equal(sourceMap[provider]?.[MODEL], "user");
  });
}

test("existing mapped Copilot prices win while missing models are recovered from historical rows", async () => {
  const mappedPrice = { input: 4, output: 20 };
  saveSyncedPricing({
    github_copilot: {
      [MODEL]: PRICE,
      "claude-opus-5.5": { input: 4, output: 20 },
    },
    github: { [MODEL]: mappedPrice },
    gh: { [MODEL]: mappedPrice },
  });

  const synced = getSyncedPricing();
  const { pricing } = await getPricingWithSources();
  for (const provider of PROVIDERS) {
    assert.deepEqual(synced[provider]?.[MODEL], mappedPrice);
    assert.deepEqual(pricing[provider]?.[MODEL], mappedPrice);
    assert.deepEqual(synced[provider]?.["claude-opus-5.5"], { input: 4, output: 20 });
    assert.deepEqual(pricing[provider]?.["claude-opus-5.5"], { input: 4, output: 20 });
  }
});
