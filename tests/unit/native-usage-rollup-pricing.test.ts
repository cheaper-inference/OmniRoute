import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, beforeEach, test } from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "native-rollup-pricing-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { saveRequestUsage: persistUsage } = await import("../../src/lib/usage/usageHistory.ts");
const saveRequestUsage = (value: Parameters<typeof persistUsage>[0]) =>
  persistUsage(value, { deduplicate: false });
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { getUsageStats, getConnectionSpendUsdSinceAdded } =
  await import("../../src/lib/usage/usageStats.ts");
const { getProviderWindowCostBreakdown } =
  await import("../../src/lib/usage/providerWindowCosts.ts");
const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
const { updateDatabaseSettings, getUserDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { databaseSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const { createNativeUsagePricingScope } = await import("../../src/lib/usage/nativeUsagePricing.ts");
const { cleanupUsageHistory } = await import("../../src/lib/db/cleanup.ts");

const now = Date.now();
const entry = {
  provider: "openai",
  model: "gpt-6-luna",
  connectionId: "synthetic-native-connection",
  endpoint: "/v1/systemone",
  timestamp: new Date(now - 1000).toISOString(),
  success: true,
};
const tokens = { input: 1000, output: 10 };

beforeEach(async () => {
  core
    .getDbInstance()
    .exec(
      "DELETE FROM usage_history; DELETE FROM daily_usage_summary; DELETE FROM domain_cost_history"
    );
  updateDatabaseSettings({
    aggregation: { enabled: true, rawDataRetentionDays: 30, granularity: "daily" },
    retention: { ...getUserDatabaseSettings().retention, usageHistory: 365 },
  });
  await updatePricing({ openai: { "gpt-6-luna": { input: 1, output: 2 } } });
});
after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("stats expose unknown native cost rather than the matching ordinary chat tariff", async () => {
  await saveRequestUsage({ ...entry, tokens });
  const result = await getUsageStats();
  assert.equal(result.totalCost, 0);
  assert.equal(result.unpricedNativeCount, 1);
});

test("connection spend exposes unknown native cost rather than the chat tariff", async () => {
  await saveRequestUsage({ ...entry, tokens });
  const result = await getConnectionSpendUsdSinceAdded(entry.provider, entry.connectionId);
  assert.equal(result.costUsd, 0);
  assert.equal(result.unpricedNativeCount, 1);
});

test("provider window exposes unknown native cost rather than the chat tariff", async () => {
  await saveRequestUsage({ ...entry, tokens });
  const result = await getProviderWindowCostBreakdown({
    provider: entry.provider,
    connectionId: entry.connectionId,
    now,
  });
  assert.equal(result.totalCostUsd, 0);
  assert.equal(result.unpricedNativeCount, 1);
});

test("retention preserves unreconciled native rows instead of archiving an invented price", async () => {
  await saveRequestUsage({
    ...entry,
    timestamp: new Date(now - 400 * 86_400_000).toISOString(),
    tokens,
  });
  assert.equal((await rollupUsageHistoryBeforeDate("2100-01-01")).errors, 0);
  const summary = core.getDbInstance().prepare("SELECT * FROM daily_usage_summary").all();
  assert.equal(summary.length, 0);
  assert.equal((await cleanupUsageHistory()).errors, 0);
  assert.equal(core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM usage_history").get().n, 1);
});

test("mixed native/chat rows preserve reported costs, zero, counts, and minute coverage", async () => {
  await saveRequestUsage({ ...entry, tokens });
  await saveRequestUsage({
    ...entry,
    endpoint: "/v1/decisions",
    tokens: { ...tokens, cost_usd: 0 },
  });
  await saveRequestUsage({ ...entry, tokens: { ...tokens, cost_usd: 0.000123 } });
  await saveRequestUsage({ ...entry, endpoint: "/v1/chat/completions", tokens });
  const stats = await getUsageStats();
  assert.equal(stats.totalRequests, 4);
  assert.ok(Math.abs(stats.totalCost - 0.001143) < 1e-12);
  assert.equal(stats.unpricedNativeCount, 1);
  assert.equal(stats.costStatus, "partial");
  assert.equal(stats.byProvider.openai.unpricedNativeCount, 1);
  assert.equal(Object.values(stats.byAccount)[0].unpricedNativeCount, 1);
  assert.equal(
    stats.last10Minutes.reduce((sum, bucket) => sum + (bucket.unpricedNativeCount || 0), 0),
    1
  );
  const connection = await getConnectionSpendUsdSinceAdded(entry.provider, entry.connectionId);
  assert.ok(Math.abs(connection.costUsd - 0.001143) < 1e-12);
  assert.equal(connection.unpricedNativeCount, 1);
});

test("key-level ledger remains visible but never substitutes for an unknown native charge", async () => {
  const apiKeyId = "synthetic-native-ledger-key";
  await saveRequestUsage({ ...entry, apiKeyId, tokens });
  await saveRequestUsage({ ...entry, apiKeyId, tokens: { ...tokens, cost_usd: 0.000123 } });
  await saveRequestUsage({ ...entry, apiKeyId, endpoint: "/v1/chat/completions", tokens });
  core
    .getDbInstance()
    .prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)")
    .run(apiKeyId, 0.05, now);
  const result = await getProviderWindowCostBreakdown({ provider: "openai", now });
  assert.equal(result.totalCostUsd, 0.001143);
  assert.equal(result.unpricedNativeCount, 1);
  assert.equal(result.unallocatedRecordedCostUsd, 0.05);
  assert.equal(result.recordedCostProvenance, "unallocated_api_key_ledger");
  assert.equal(result.rows[0].unallocatedRecordedCostUsd, 0.05);
  assert.equal(result.rows[0].models[0].unpricedNativeCount, 1);
  assert.equal(result.estimatedFullQuotaUsd, null);
});

test("existing summary plus late unknown native usage retains the full day without double counting", async () => {
  const timestamp = new Date(now - 400 * 86_400_000).toISOString();
  await saveRequestUsage({ ...entry, timestamp, endpoint: "/v1/chat/completions", tokens });
  assert.equal((await rollupUsageHistoryBeforeDate("2100-01-01")).errors, 0);
  await saveRequestUsage({ ...entry, timestamp, tokens });
  const unknown = await getUsageStats();
  assert.equal(unknown.totalRequests, 2);
  assert.equal(unknown.totalCost, 0.00102);
  assert.equal(unknown.unpricedNativeCount, 1);
  assert.equal((await cleanupUsageHistory()).deleted, 0);
  assert.equal(core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM usage_history").get().n, 2);
  // Synthetic late reconciliation supplies a known native charge; the next rollup
  // atomically replaces the whole day's summary, then ordinary cleanup is safe.
  core
    .getDbInstance()
    .prepare("UPDATE usage_history SET provider_cost_usd = ? WHERE endpoint = ?")
    .run(0.000123, "/v1/systemone");
  assert.equal((await cleanupUsageHistory()).deleted, 2);
  const known = await getUsageStats();
  assert.equal(known.totalRequests, 2);
  assert.ok(Math.abs(known.totalCost - 0.001143) < 1e-12);
  assert.equal(known.unpricedNativeCount, undefined);
  assert.equal(known.costStatus, undefined);
});

test(
  "a late backdated native row cannot hide an already archived known subtotal",
  {
    todo: "Legacy external/backdated import overlap has no row identities; native API writes current server time. Not fixed or counted as passing.",
  },
  async () => {
    const timestamp = new Date(now - 400 * 86_400_000).toISOString();
    await saveRequestUsage({ ...entry, timestamp, endpoint: "/v1/chat/completions", tokens });
    assert.equal((await cleanupUsageHistory()).deleted, 1);
    await saveRequestUsage({ ...entry, timestamp, tokens });
    const result = await getUsageStats();
    assert.equal(result.totalCost, 0.00102);
    assert.equal(result.unpricedNativeCount, 1);
    assert.equal(result.costStatus, "partial");
  }
);

test("validated retention rejects zero and fractional days; minimum one day retains current native usage", async () => {
  const retentionSchema = databaseSettingsSchema.shape.retention.shape.usageHistory;
  assert.equal(retentionSchema.safeParse(0).success, false);
  assert.equal(retentionSchema.safeParse(0.5).success, false);
  assert.equal(retentionSchema.safeParse(1).success, true);
  updateDatabaseSettings({
    retention: { ...getUserDatabaseSettings().retention, usageHistory: 1 },
  });
  // Native handler supplies no client timestamp. The usage writer freezes server
  // time at persistence; an API caller cannot insert a 400-day-old usage entry.
  await saveRequestUsage({ ...entry, timestamp: undefined, tokens });
  assert.equal((await cleanupUsageHistory()).deleted, 0);
  const result = await getUsageStats();
  assert.equal(result.totalRequests, 1);
  assert.equal(result.unpricedNativeCount, 1);
});

for (const amount of [0, 0.000123]) {
  test(`reported native ${amount} archives exactly and keeps ordinary DTO shape`, async () => {
    const timestamp = new Date(now - 400 * 86_400_000).toISOString();
    await saveRequestUsage({ ...entry, timestamp, tokens: { ...tokens, cost_usd: amount } });
    assert.equal((await cleanupUsageHistory()).deleted, 1);
    const result = await getUsageStats();
    assert.equal(result.totalCost, amount);
    assert.equal(result.totalRequests, 1);
    assert.equal(Object.hasOwn(result, "unpricedNativeCount"), false);
    assert.equal(Object.hasOwn(result, "costStatus"), false);
  });
}

test("a failed native attempt retains unknown cost in connection and window totals", async () => {
  await saveRequestUsage({ ...entry, success: false, tokens });
  const connection = await getConnectionSpendUsdSinceAdded("openai", entry.connectionId);
  assert.equal(connection.requests, 1);
  assert.equal(connection.costUsd, 0);
  assert.equal(connection.unpricedNativeCount, 1);
  const window = await getProviderWindowCostBreakdown({ provider: "openai", now });
  assert.equal(window.rows[0].requests, 1);
  assert.equal(window.unpricedNativeCount, 1);
});

for (const provider of ["liquid", "perplexity", "inception", "baseten", "fireworks"]) {
  test(`${provider} native cost stays unknown across all current rollups`, async () => {
    await updatePricing({ [provider]: { "synthetic-native-model": { input: 1, output: 2 } } });
    await saveRequestUsage({ ...entry, provider, model: "synthetic-native-model", tokens });
    const stats = await getUsageStats();
    assert.equal(stats.totalCost, 0);
    assert.equal(stats.unpricedNativeCount, 1);
    const connection = await getConnectionSpendUsdSinceAdded(provider, entry.connectionId);
    assert.equal(connection.costUsd, 0);
    assert.equal(connection.unpricedNativeCount, 1);
    const window = await getProviderWindowCostBreakdown({ provider, now });
    assert.equal(window.totalCostUsd, 0);
    assert.equal(window.unpricedNativeCount, 1);
  });
}

test("legacy native operator pricing keeps the exact ordinary DTO shape", async () => {
  await updatePricing({ openrouter: { "synthetic-legacy-native": { input: 1, output: 2 } } });
  await saveRequestUsage({
    ...entry,
    provider: "openrouter",
    model: "synthetic-legacy-native",
    tokens,
  });
  const stats = await getUsageStats();
  assert.equal(stats.totalCost, 0.00102);
  assert.equal(Object.hasOwn(stats, "unpricedNativeCount"), false);
  const window = await getProviderWindowCostBreakdown({ provider: "openrouter", now });
  assert.equal(window.totalCostUsd, 0.00102);
  assert.equal(Object.hasOwn(window, "costStatus"), false);
});

for (const provider of ["openrouter", "typesafe"]) {
  test(`${provider} missing native usage counts stays unknown on all four surfaces`, async () => {
    const timestamp = new Date(now - 400 * 86_400_000).toISOString();
    await saveRequestUsage({
      ...entry,
      provider,
      timestamp,
      tokens: { input: null, output: null },
    });
    const stats = await getUsageStats();
    assert.equal(stats.unpricedNativeCount, 1);
    const connection = await getConnectionSpendUsdSinceAdded(provider, entry.connectionId);
    assert.equal(connection.unpricedNativeCount, 1);
    const window = await getProviderWindowCostBreakdown({
      provider,
      now: Date.parse(timestamp) + 1000,
    });
    assert.equal(window.unpricedNativeCount, 1);
    assert.equal((await cleanupUsageHistory()).deleted, 0);
    assert.equal(
      core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM usage_history").get().n,
      1
    );
    assert.equal(
      core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM daily_usage_summary").get().n,
      0
    );
  });
  test(`${provider} failed native attempt with a reported amount remains visible`, async () => {
    await saveRequestUsage({
      ...entry,
      provider,
      success: false,
      tokens: { ...tokens, cost_usd: 0.125 },
    });
    const connection = await getConnectionSpendUsdSinceAdded(provider, entry.connectionId);
    assert.equal(connection.requests, 1);
    assert.equal(connection.costUsd, 0.125);
    const window = await getProviderWindowCostBreakdown({ provider, now });
    assert.equal(window.rows[0].requests, 1);
    assert.equal(window.totalCostUsd, 0.125);
    assert.equal(window.unpricedNativeCount, undefined);
  });
  test(`${provider} complete counts without any compatible price do not mean free`, async () => {
    await saveRequestUsage({
      ...entry,
      provider,
      model: "synthetic-native-no-price-20261027",
      tokens,
    });
    const stats = await getUsageStats();
    assert.equal(stats.unpricedNativeCount, 1);
    const connection = await getConnectionSpendUsdSinceAdded(provider, entry.connectionId);
    assert.equal(connection.unpricedNativeCount, 1);
    const window = await getProviderWindowCostBreakdown({ provider, now });
    assert.equal(window.unpricedNativeCount, 1);
  });
}

test("compatible complete native counts with an explicit zero tariff remain known, not unknown", async () => {
  const model = "synthetic-native-zero-tariff";
  await updatePricing({ openrouter: { [model]: { input: 0, output: 0 } } });
  await saveRequestUsage({ ...entry, provider: "openrouter", model, tokens });
  const stats = await getUsageStats();
  assert.equal(stats.totalCost, 0);
  assert.equal(stats.unpricedNativeCount, undefined);
});

test("native pricing scope quotes model ids and treats NUL/oversized ids conservatively", async () => {
  const provider = "openrouter";
  const model = "synthetic-'quoted'); DROP TABLE usage_history; --";
  await updatePricing({ [provider]: { [model]: { input: 1, output: 2 } } });
  await saveRequestUsage({ ...entry, provider, model, tokens });
  await saveRequestUsage({ ...entry, provider, model: "synthetic\0nul", tokens });
  await saveRequestUsage({ ...entry, provider, model: "x".repeat(4097), tokens });
  const stats = await getUsageStats();
  assert.equal(stats.totalRequests, 3);
  assert.equal(stats.totalCost, 0.00102);
  assert.equal(stats.unpricedNativeCount, 2);
});

test("one pricing scope keeps a formerly unknown native day safe across a tariff change", async () => {
  const provider = "openrouter";
  const model = "synthetic-newly-priced-native";
  const timestamp = new Date(now - 400 * 86_400_000).toISOString();
  await saveRequestUsage({ ...entry, provider, model, timestamp, tokens });
  const scope = await createNativeUsagePricingScope();
  await updatePricing({ [provider]: { [model]: { input: 1, output: 2 } } });
  assert.equal((await rollupUsageHistoryBeforeDate("2100-01-01", scope)).inserted, 0);
  const deleted = core
    .getDbInstance()
    .prepare(
      `DELETE FROM usage_history
    WHERE timestamp < ? AND NOT ${scope.retainedGroupSql()}`
    )
    .run("2100-01-01");
  assert.equal(deleted.changes, 0);
  // A subsequent read can know the price before the next cleanup; retained raw
  // native rows must remain visible during that interval.
  const stats = await getUsageStats();
  assert.equal(stats.totalRequests, 1);
  assert.equal(stats.totalCost, 0.00102);
  assert.equal(stats.unpricedNativeCount, undefined);
});

test("a tariff removed during rollup cannot turn native unknown into an archived zero", async () => {
  const provider = "openrouter";
  const model = "synthetic-native-removed-tariff";
  await updatePricing({ [provider]: { [model]: { input: 1, output: 2 } } });
  await saveRequestUsage({ ...entry, provider, model, tokens });
  const scope = await createNativeUsagePricingScope();
  await updatePricing({ [provider]: { [model]: null } });
  const result = await rollupUsageHistoryBeforeDate("2100-01-01", scope);
  assert.equal(result.inserted, 0);
  const deleted = core
    .getDbInstance()
    .prepare(
      `DELETE FROM usage_history
    WHERE timestamp < ? AND NOT ${scope.retainedGroupSql()}`
    )
    .run("2100-01-01");
  assert.equal(deleted.changes, 0);
});

test("bounded native tariff inspection leaves unscanned pairs unknown rather than free", async () => {
  const provider = "openrouter";
  const models = Array.from(
    { length: 1025 },
    (_, index) => `synthetic-bound-${String(index).padStart(4, "0")}`
  );
  await updatePricing({
    [provider]: Object.fromEntries(models.map((model) => [model, { input: 0, output: 0 }])),
  });
  const insert = core.getDbInstance().prepare(`INSERT INTO usage_history
    (provider, model, endpoint, tokens_input, tokens_output, timestamp, success)
    VALUES (?, ?, '/v1/systemone', 1, 1, ?, 1)`);
  core.getDbInstance().transaction(() => {
    for (const model of models) insert.run(provider, model, entry.timestamp);
  })();
  const stats = await getUsageStats();
  assert.equal(stats.totalRequests, 1025);
  assert.equal(stats.totalCost, 0);
  assert.equal(stats.unpricedNativeCount, 1);
  assert.equal(stats.costStatus, "partial");
});

test("native tariff SQL budget leaves oversized quoted coverage conservative", async () => {
  const provider = "openrouter";
  const models = Array.from(
    { length: 20 },
    (_, index) => `${String(index).padStart(2, "0")}${"'".repeat(4080)}`
  );
  await updatePricing({
    [provider]: Object.fromEntries(models.map((model) => [model, { input: 0, output: 0 }])),
  });
  const insert = core.getDbInstance().prepare(`INSERT INTO usage_history
    (provider, model, endpoint, tokens_input, tokens_output, timestamp, success)
    VALUES (?, ?, '/v1/systemone', 1, 1, ?, 1)`);
  core.getDbInstance().transaction(() => {
    for (const model of models) insert.run(provider, model, entry.timestamp);
  })();
  const scope = await createNativeUsagePricingScope();
  const coverage = core
    .getDbInstance()
    .prepare(
      `SELECT SUM(CASE WHEN ${scope.unpricedUsageSql()}
    THEN 1 ELSE 0 END) AS n FROM usage_history`
    )
    .get() as { n: number };
  assert.ok(coverage.n > 0);
  assert.ok(coverage.n < 20);
});

test("an unrelated provider cannot inherit another provider's native tariff by model name", async () => {
  await saveRequestUsage({
    ...entry,
    provider: "synthetic-unrelated-native",
    model: "jev-1.14.0",
    tokens,
  });
  const stats = await getUsageStats();
  assert.equal(stats.totalCost, 0);
  assert.equal(stats.unpricedNativeCount, 1);
  const window = await getProviderWindowCostBreakdown({
    provider: "synthetic-unrelated-native",
    now,
  });
  assert.equal(window.totalCostUsd, 0);
  assert.equal(window.unpricedNativeCount, 1);
});
