import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cortecs-cost-scope-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { calculateCostDetailed, computeCostFromPricing } =
  await import("../../src/lib/usage/costCalculator.ts");
const { isCreditMeteredProvider, readReportedCost } =
  await import("../../src/lib/usage/creditMeteredProviders.ts");
const pricing = { input: 2, output: 4 };
const tokens = { prompt_tokens: 1000, completion_tokens: 500 };
const { tokenPriceableUsageSql, unpricedCortecsRerankSql } =
  await import("../../src/lib/db/usageCostSql.ts");
const { computeUsageRowCost } = await import("../../src/lib/usage/analyticsPricing.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("a Cortecs-named chat or embedding node retains its configured token tariff", async () => {
  await updatePricing({ cortecs: { "synthetic-model": pricing } });
  assert.equal(isCreditMeteredProvider("cortecs"), false);
  for (const endpoint of [undefined, "/v1/embeddings", "/v1/chat/completions"]) {
    assert.equal(computeCostFromPricing(pricing, tokens, { provider: "cortecs", endpoint }), 0.004);
    assert.deepEqual(
      await calculateCostDetailed("cortecs", "synthetic-model", tokens, { endpoint }),
      { costUsd: 0.004, priced: true }
    );
  }
});

test("explicit rerank usage remains unpriced even when a token tariff exists", async () => {
  await updatePricing({ cortecs: { "synthetic-model": pricing } });
  for (const endpoint of ["/v1/rerank", "/rerank"]) {
    assert.equal(computeCostFromPricing(pricing, tokens, { provider: "cortecs", endpoint }), 0);
    assert.deepEqual(
      await calculateCostDetailed("cortecs", "synthetic-model", tokens, { endpoint }),
      { costUsd: 0, priced: false }
    );
  }
  // Only the endpoint marks rerank usage: a stray credit field neither keeps a
  // credit quantity nor turns a Cortecs chat/embedding row into rerank usage.
  const strayCredits = { ...tokens, provider_credits: 4 };
  assert.deepEqual(await calculateCostDetailed("cortecs", "synthetic-model", strayCredits), {
    costUsd: 0.004,
    priced: true,
  });
  assert.deepEqual(readReportedCost("cortecs", strayCredits), {
    providerCredits: null,
    providerCostUsd: null,
  });
});

test("exact USD still wins for any endpoint and Kiro credit accounting is unchanged", async () => {
  for (const endpoint of [undefined, "/v1/rerank", "/v1/embeddings"]) {
    const usage = { ...tokens, cost_usd: 0.000004466 };
    assert.equal(
      computeCostFromPricing(pricing, usage, { provider: "cortecs", endpoint }),
      usage.cost_usd
    );
    assert.deepEqual(
      await calculateCostDetailed("cortecs", "synthetic-model", usage, { endpoint }),
      { costUsd: usage.cost_usd, priced: true }
    );
  }
  assert.equal(computeCostFromPricing(pricing, tokens, { provider: "kiro" }), 0);
  assert.equal(isCreditMeteredProvider("kr"), true);
});

test("durable SQL distinguishes the endpoint, reported zero and unrelated aliases", () => {
  for (const [provider, endpoint, usd, priceable, unpriced] of [
    ["cortecs", "/v1/rerank", null, 0, 1],
    ["cortecs", "/rerank", null, 0, 1],
    ["cortecs", "/v1/embeddings", null, 1, 0],
    ["cortecs", "/v1/chat/completions", null, 1, 0],
    ["other", "/v1/rerank", null, 1, 0],
    ["cortecs", "/v1/rerank", 0, 0, 0],
    [null, null, null, 1, 0],
  ]) {
    const sql = `WITH sample(provider,endpoint,provider_cost_usd) AS (VALUES (?,?,?))
      SELECT CASE WHEN ${tokenPriceableUsageSql("sample")} THEN 1 ELSE 0 END as priceable,
      CASE WHEN ${unpricedCortecsRerankSql("sample")} THEN 1 ELSE 0 END as unpriced FROM sample`;
    assert.deepEqual(core.getDbInstance().prepare(sql).get(provider, endpoint, usd), {
      priceable,
      unpriced,
    });
  }
  assert.throws(() => tokenPriceableUsageSql("untrusted;alias"), /Invalid usage table alias/);
});

test("archived Cortecs values are snapshots, not retrospective token estimates", () => {
  for (const storedCost of [0, 0.000004466]) {
    const row = {
      provider: "cortecs",
      model: "synthetic-model",
      isAggregated: 1,
      storedCost,
      costPromptTokens: 1000,
      costCompletionTokens: 500,
    };
    assert.equal(
      computeUsageRowCost(
        row,
        { cortecs: { "synthetic-model": pricing } },
        {},
        (value) => value,
        computeCostFromPricing
      ),
      storedCost
    );
  }
});
