import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-antigravity-pricing-16570-"));
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const { getDefaultPricing } = await import("../../src/shared/constants/pricing.ts");
const { ANTIGRAVITY_SHARED_MODELS } =
  await import("../../open-sse/config/antigravitySharedModels.ts");
const { CLAUDE_OPUS_5_5_PRICING, CLAUDE_SONNET_5_PRICING } =
  await import("../../src/shared/constants/pricing/shared-tiers.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

const BILLABLE_TOKENS = { input: 1_000_000, output: 1_000_000 };
const CHAT_MODEL_IDS = [
  "gemini-3.7-flash-low",
  "gemini-3.7-flash-medium",
  "gemini-3.7-flash-high",
  "gemini-3.8-flash-low",
  "gemini-3.8-flash-medium",
  "gemini-3.8-flash-high",
  "gemini-3.8-flash-tiered",
  "gemini-4-argon-low",
  "gemini-4-argon-medium",
  "gemini-4-argon-high",
  "gemini-pro-agent",
  "gemini-3.1-pro-low",
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-3-flash",
  "claude-opus-4-6-thinking",
  "claude-sonnet-4-6",
  "claude-opus-5-5-low",
  "claude-opus-5-5-medium",
  "claude-opus-5-5-high",
  "claude-sonnet-5-5-low",
  "claude-sonnet-5-5-medium",
  "claude-sonnet-5-5-high",
  "gpt-oss-120b-medium",
];

for (const provider of ["antigravity", "agy"]) {
  for (const id of CHAT_MODEL_IDS) {
    test(`#16570: ${provider}/${id} has billable pricing`, async () => {
      const result = await calculateCostDetailed(provider, id, BILLABLE_TOKENS);
      assert.equal(result.priced, true, `${provider}/${id} must resolve as priced`);
      assert.ok(result.costUsd > 0, `${provider}/${id} must cost more than $0`);
    });
  }

  test(`#16570: ${provider} prices every chat id in the real shared catalog`, async () => {
    // Catalog entries without an explicit type are chat models.
    const chatModels = ANTIGRAVITY_SHARED_MODELS.filter(
      (model: { id: string; type?: string }) => !model.type || model.type === "chat"
    );
    assert.ok(chatModels.length > 0, "the drift guard must exercise the real catalog");
    for (const { id } of chatModels) {
      const result = await calculateCostDetailed(provider, id, BILLABLE_TOKENS);
      assert.equal(result.priced, true, `${provider}/${id} catalog entry must resolve as priced`);
      assert.ok(result.costUsd > 0, `${provider}/${id} catalog entry must cost more than $0`);
    }
  });
}

const ARGON_PROMO_ROW = {
  input: 2.0,
  output: 10.0,
  cached: 0.1,
  reasoning: 10.0,
  cache_creation: 2.0,
};
const FLASH_3_8_PROMO_ROW = {
  input: 0.75,
  output: 3.75,
  cached: 0.075,
  reasoning: 3.75,
  cache_creation: 0.75,
};

// Literal snapshot of every legacy ag row at 9ecddd15a1, including all three 3.7 tiers.
const LEGACY_AG_ROWS = {
  "gemini-3.1-pro-low": {
    input: 2.0,
    output: 12.0,
    cached: 0.25,
    reasoning: 18.0,
    cache_creation: 2.0,
  },
  "gemini-pro-agent": {
    input: 4.0,
    output: 18.0,
    cached: 0.5,
    reasoning: 27.0,
    cache_creation: 4.0,
  },
  "gemini-3.7-flash-low": {
    input: 0.75,
    output: 3.75,
    cached: 0.075,
    reasoning: 3.75,
    cache_creation: 0.75,
  },
  "gemini-3.7-flash-medium": {
    input: 0.75,
    output: 3.75,
    cached: 0.075,
    reasoning: 3.75,
    cache_creation: 0.75,
  },
  "gemini-3.7-flash-high": {
    input: 0.75,
    output: 3.75,
    cached: 0.075,
    reasoning: 3.75,
    cache_creation: 0.75,
  },
  "claude-sonnet-4-6": {
    input: 3.0,
    output: 15.0,
    cached: 0.3,
    reasoning: 22.5,
    cache_creation: 3.0,
  },
  "claude-opus-4-6-thinking": {
    input: 5.0,
    output: 25.0,
    cached: 0.5,
    reasoning: 37.5,
    cache_creation: 5.0,
  },
  "gpt-oss-120b-medium": {
    input: 0.5,
    output: 2.0,
    cached: 0.25,
    reasoning: 3.0,
    cache_creation: 0.5,
  },
};

for (const provider of ["ag", "antigravity", "agy"] as const) {
  test(`#16570: ${provider} contains exact new model rates`, () => {
    const rows = getDefaultPricing()[provider];
    for (const suffix of ["", "-low", "-medium", "-high"]) {
      assert.deepEqual(rows[`gemini-4-argon${suffix}`], ARGON_PROMO_ROW);
      assert.deepEqual(rows[`gemini-3.8-flash${suffix}`], FLASH_3_8_PROMO_ROW);
    }
    assert.deepEqual(rows["gemini-3.8-flash-tiered"], FLASH_3_8_PROMO_ROW);
    assert.deepEqual(rows["gemini-3.7-flash-tiered"], LEGACY_AG_ROWS["gemini-3.7-flash-high"]);
    assert.deepEqual(rows["gemini-3.5-flash-lite"], {
      input: 0.3,
      output: 2.5,
      cached: 0.03,
      reasoning: 2.5,
      cache_creation: 0.3,
    });
    assert.deepEqual(rows["gemini-3.1-flash-lite"], {
      input: 0.25,
      output: 1.5,
      cached: 0.025,
      reasoning: 1.5,
      cache_creation: 0.25,
    });
    assert.deepEqual(rows["gemini-3-flash"], {
      input: 0.5,
      output: 3.0,
      cached: 0.05,
      reasoning: 3.0,
      cache_creation: 0.5,
    });
    for (const tier of ["low", "medium", "high"]) {
      assert.deepEqual(rows[`claude-opus-5-5-${tier}`], CLAUDE_OPUS_5_5_PRICING);
      assert.deepEqual(rows[`claude-sonnet-5-5-${tier}`], CLAUDE_SONNET_5_PRICING);
    }
  });

  test(`#16570: ${provider} preserves every legacy ag key/value`, () => {
    const rows = getDefaultPricing()[provider];
    for (const [id, expected] of Object.entries(LEGACY_AG_ROWS)) {
      assert.deepEqual(rows[id], expected, `${provider}/${id} legacy rate must not change`);
    }
  });
}
