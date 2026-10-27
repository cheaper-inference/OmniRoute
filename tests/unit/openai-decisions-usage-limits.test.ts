import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, beforeEach, test } from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "openai-decision-usage-limit-"));
process.env.DATA_DIR = directory;
process.env.USAGE_LIMIT_IGNORE_UNPRICED = "false";
const core = await import("../../src/lib/db/core.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { getApiKeyUsageLimitStatus } = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const now = Date.parse("2026-10-27T04:00:00Z");
const keyId = "synthetic-native-openai-key-id";
const entry = {
  provider: "openai",
  model: "gpt-6-luna",
  apiKeyId: keyId,
  endpoint: "/v1/systemone",
  timestamp: "2026-10-27T03:00:00Z",
  success: true,
};
const counts = { input: 1000, output: 10 };

beforeEach(async () => {
  core.getDbInstance().exec("DELETE FROM usage_history");
  // A deliberately different, ordinary chat/operator tariff for the same id.
  await updatePricing({
    openai: { "gpt-6-luna": { input: 1, output: 2 } },
    openrouter: { "fixture-model": { input: 1, output: 2 } },
    ...Object.fromEntries(
      [
        "liquid",
        "perplexity",
        "inception",
        "baseten",
        "fireworks",
        "historical-fixture-provider",
      ].map((provider) => [provider, { "synthetic-shared-model": { input: 1, output: 2 } }])
    ),
  });
});
after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

function status() {
  return getApiKeyUsageLimitStatus(
    { id: keyId, usageLimitEnabled: true, dailyUsageLimitUsd: 1, weeklyUsageLimitUsd: 2 },
    {
      now: () => now,
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
    }
  );
}

test("unreported native OpenAI cost is unknown, never the same model's chat price", async () => {
  await saveRequestUsage({ ...entry, tokens: counts });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0);
  assert.equal(result.dailyHasUnpricedUsage, true);
  assert.equal(result.weeklyHasUnpricedUsage, true);
  assert.equal(result.dailyExceeded, true);
});

test("a failed native Decisions attempt with missing USD still closes a capped window", async () => {
  await saveRequestUsage({ ...entry, endpoint: "/v1/decisions", success: false, tokens: counts });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0);
  assert.equal(result.dailyHasUnpricedUsage, true);
  assert.equal(result.dailyExceeded, true);
});

test("mixing chat and native usage cannot price the native tokens as chat", async () => {
  await saveRequestUsage({ ...entry, tokens: counts });
  await saveRequestUsage({
    ...entry,
    endpoint: "/v1/chat/completions",
    timestamp: "2026-10-27T03:01:00Z",
    tokens: counts,
  });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0.00102);
  assert.equal(result.dailyHasUnpricedUsage, true);
  assert.equal(result.dailyExceeded, true);
});

test("a reported native amount remains authoritative alongside ordinary chat usage", async () => {
  await saveRequestUsage({ ...entry, tokens: { ...counts, cost_usd: 0.000123 } });
  await saveRequestUsage({
    ...entry,
    endpoint: "/v1/chat/completions",
    timestamp: "2026-10-27T03:01:00Z",
    tokens: counts,
  });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0.001143);
  assert.equal(result.dailyHasUnpricedUsage, false);
  assert.equal(result.dailyExceeded, false);
});

test("reported native zero is known even when token counts remain unknown", async () => {
  await saveRequestUsage({ ...entry, tokens: { input: null, output: null, cost_usd: 0 } });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0);
  assert.equal(result.dailyHasUnpricedUsage, false);
  assert.equal(result.dailyExceeded, false);
});

test("zero token counts without a reported native price do not manufacture a free call", async () => {
  await saveRequestUsage({ ...entry, tokens: { input: 0, output: 0 } });
  const result = await status();
  assert.equal(result.dailyHasUnpricedUsage, true);
  assert.equal(result.dailyExceeded, true);
});

test("reported zero cannot hide another unpriced attempt in the same native window", async () => {
  await saveRequestUsage({ ...entry, tokens: { ...counts, cost_usd: 0 } });
  await saveRequestUsage({ ...entry, timestamp: "2026-10-27T03:01:00Z", tokens: counts });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0);
  assert.equal(result.dailyHasUnpricedUsage, true);
  assert.equal(result.dailyExceeded, true);
});

test("other native providers retain their existing explicit operator-pricing behavior", async () => {
  await saveRequestUsage({
    ...entry,
    provider: "openrouter",
    model: "fixture-model",
    tokens: counts,
  });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0.00102);
  assert.equal(result.dailyHasUnpricedUsage, false);
  assert.equal(result.dailyExceeded, false);
});

for (const provider of ["liquid", "perplexity", "inception", "baseten", "fireworks"]) {
  test(`${provider} native USD remains unknown despite an ordinary operator token price`, async () => {
    await saveRequestUsage({ ...entry, provider, model: "synthetic-shared-model", tokens: counts });
    const result = await status();
    assert.equal(result.dailySpentUsd, 0);
    assert.equal(result.dailyHasUnpricedUsage, true);
    assert.equal(result.dailyExceeded, true);
  });
  test(`${provider} reported zero is known and never replaced with an operator estimate`, async () => {
    await saveRequestUsage({
      ...entry,
      provider,
      model: "synthetic-shared-model",
      tokens: { ...counts, cost_usd: 0 },
    });
    const result = await status();
    assert.equal(result.dailySpentUsd, 0);
    assert.equal(result.dailyHasUnpricedUsage, false);
    assert.equal(result.dailyExceeded, false);
  });
}

test("an unregistered historical native provider retains its existing operator-pricing policy", async () => {
  await saveRequestUsage({
    ...entry,
    provider: "historical-fixture-provider",
    model: "synthetic-shared-model",
    tokens: counts,
  });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0.00102);
  assert.equal(result.dailyHasUnpricedUsage, false);
});

test("a native pricing fence does not change that provider's ordinary chat tariff", async () => {
  await saveRequestUsage({
    ...entry,
    provider: "fireworks",
    model: "synthetic-shared-model",
    endpoint: "/v1/chat/completions",
    tokens: counts,
  });
  const result = await status();
  assert.equal(result.dailySpentUsd, 0.00102);
  assert.equal(result.dailyHasUnpricedUsage, false);
});
