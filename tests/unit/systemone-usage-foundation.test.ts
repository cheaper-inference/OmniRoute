import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.USAGE_LIMIT_IGNORE_UNPRICED = "false";

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { saveRequestUsage, getUsageDb } = await import("../../src/lib/usage/usageHistory.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { getApiKeyUsageLimitStatus } = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const now = Date.parse("2026-10-24T12:00:00Z");
const entry = {
  provider: "openrouter",
  model: "decision-fixture",
  apiKeyId: "decision-usage-fixture",
  timestamp: "2026-10-24T11:00:00Z",
  success: true,
};

beforeEach(async () => {
  getDbInstance().exec("DELETE FROM usage_history");
  await updatePricing({ openrouter: { "decision-fixture": { input: 1, output: 2 } } });
});
after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rows() {
  return getDbInstance()
    .prepare("SELECT tokens_input, tokens_output, provider_cost_usd FROM usage_history ORDER BY id")
    .all();
}

function status() {
  return getApiKeyUsageLimitStatus(
    { id: entry.apiKeyId, usageLimitEnabled: true, dailyUsageLimitUsd: 1, weeklyUsageLimitUsd: 2 },
    {
      now: () => now,
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
    }
  );
}

test("explicit unknown token counts survive storage and per-request history", async () => {
  await saveRequestUsage({ ...entry, tokens: { input: null, output: null } });
  assert.deepEqual(rows(), [{ tokens_input: null, tokens_output: null, provider_cost_usd: null }]);
  const history = await getUsageDb();
  assert.equal(history.data.history[0].tokens.input, null);
  assert.equal(history.data.history[0].tokens.output, null);
});

test("omitted legacy counts remain zero and valid secondary aliases beat null", async () => {
  await saveRequestUsage({ ...entry, tokens: {} });
  await saveRequestUsage({
    ...entry,
    timestamp: "2026-10-24T11:01:00Z",
    tokens: { input: null, prompt_tokens: 7, output: null, output_tokens: 3 },
  });
  assert.deepEqual(rows(), [
    { tokens_input: 0, tokens_output: 0, provider_cost_usd: null },
    { tokens_input: 7, tokens_output: 3, provider_cost_usd: null },
  ]);
});

test("unknown-token duplicates enrich reported zero once without inventing another call", async () => {
  const tokens = { input: null, output: null };
  await saveRequestUsage({ ...entry, tokens });
  await saveRequestUsage({ ...entry, tokens: { ...tokens, cost_usd: 0 } });
  await saveRequestUsage({ ...entry, tokens: { ...tokens, cost_usd: 0.125 } });
  assert.deepEqual(rows(), [{ tokens_input: null, tokens_output: null, provider_cost_usd: 0 }]);
});

for (const tokens of [
  { input: null, output: null },
  { input: 1, output: null },
  { input: null, output: 1 },
]) {
  test(`incomplete unpriced counts fail USD quotas closed: ${JSON.stringify(tokens)}`, async () => {
    await saveRequestUsage({ ...entry, tokens });
    await saveRequestUsage({
      ...entry,
      timestamp: "2026-10-24T11:02:00Z",
      tokens: { input: 0, output: 0, cost_usd: 0.125 },
    });
    const result = await status();
    assert.equal(result.dailySpentUsd, 0.125);
    assert.equal(result.dailyHasUnpricedUsage, true);
    assert.equal(result.weeklyHasUnpricedUsage, true);
    assert.equal(result.dailyExceeded, true);
    assert.equal(result.weeklyExceeded, true);
  });
}

test("reported costs including zero remain authoritative with unknown counts", async () => {
  await saveRequestUsage({ ...entry, tokens: { input: null, output: null, cost_usd: 0 } });
  await saveRequestUsage({
    ...entry,
    timestamp: "2026-10-24T11:03:00Z",
    tokens: { input: null, output: null, cost_usd: 0.125 },
  });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0.125);
  assert.equal(result.dailyHasUnpricedUsage, false);
  assert.equal(result.dailyExceeded, false);
});

for (const reportedCost of [0, 0.125, null]) {
  test(`a malformed HTTP success still accounts for possible billed usage: ${reportedCost}`, async () => {
    const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
    const response = await handleSystemOneProxy(
      {
        provider: "openrouter",
        canonicalModel: "openrouter/decision-fixture",
        body: {
          model: entry.model,
          state: "synthetic",
          questions: { q: { type: "noul", instructions: "yes?" } },
        },
        credentials: { apiKey: "fixture-only", connectionId: "fixture-only" },
        apiKeyInfo: { id: entry.apiKeyId },
      },
      {
        withCapacity: async (_options, _signal, run) => run(),
        fetchSystemOne: async () => Response.json({ answers: {}, usage: { cost: reportedCost } }),
        saveCallLog: async () => {},
        recordCost: () => {},
        saveRequestUsage: (usage) => saveRequestUsage({ ...usage, timestamp: entry.timestamp }),
      }
    );
    assert.equal(response.status, 502);
    const result = await status();
    assert.equal(result.dailySpentUsd, reportedCost ?? 0);
    assert.equal(result.dailyHasUnpricedUsage, reportedCost === null);
    assert.equal(result.dailyExceeded, reportedCost === null);
    assert.equal(rows().length, 1);
  });
}
