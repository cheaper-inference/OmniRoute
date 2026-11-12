import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-evidence-aggregates-"));
process.env.DATA_DIR = dir;
process.env.SQLITE_FILE = path.join(dir, "storage.sqlite");
process.env.OMNIROUTE_SQLITE_FILE = process.env.SQLITE_FILE;
process.env.APP_LOG_TO_FILE = "false";
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { getUsageStats } = await import("../../src/lib/usage/usageStats.ts");
const { buildUnifiedSource, getUsageSummary } = await import("../../src/lib/db/usageAnalytics.ts");
const evidence = {
  input: { source: "reported" },
  output: { source: "estimated", method: "chars/4" },
  cacheRead: { source: "unknown" },
  cacheCreation: { source: "unknown" },
};
test.after(async () => {
  await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5000);
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
test("live and archived dashboards retain estimates without inventing old provenance", async () => {
  await saveRequestUsage({
    provider: "fixture",
    model: "fixture",
    timestamp: new Date().toISOString(),
    tokens: { input: 20, output: 5, usage_evidence: evidence },
  });
  let stats = await getUsageStats();
  assert.equal(stats.estimated, true);
  assert.equal(stats.totalCachedInputTokens, null);
  getDbInstance().prepare("UPDATE usage_history SET timestamp = '2020-01-01T10:00:00.000Z'").run();
  const source = () =>
    buildUnifiedSource({
      sinceIso: null,
      untilIso: null,
      rawCutoffDate: "2020-02-01",
      apiKeyWhere: "",
      apiKeyParams: {},
    });
  const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
  await rollupUsageHistoryBeforeDate("2020-02-01");
  const db = getDbInstance();
  assert.equal(
    db.prepare("SELECT estimated_requests FROM daily_usage_summary").get().estimated_requests,
    1
  );
  let unified = source();
  assert.equal(getUsageSummary(unified.unifiedSource, unified.unifiedParams).estimatedRequests, 1);
  db.prepare(
    "INSERT INTO daily_usage_summary(provider,model,date,total_requests) VALUES ('old','old','2019-01-01',1)"
  ).run();
  unified = source();
  assert.equal(
    getUsageSummary(unified.unifiedSource, unified.unifiedParams).unknownEvidenceRequests,
    1
  );
  const { GET } = await import("../../src/app/api/usage/analytics/route.ts");
  const response = await GET(new Request("http://localhost/api/usage/analytics?range=all"));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.summary.estimated, true);
  assert.equal(body.summary.unknownEvidence, true);
  assert.equal(body.summary.cachedInputTokens, null);
  assert.equal(body.summary.cachedInputTokensComplete, false);
  const { getUserDatabaseSettings, updateDatabaseSettings } =
    await import("../../src/lib/db/databaseSettings.ts");
  updateDatabaseSettings({
    aggregation: { ...getUserDatabaseSettings().aggregation, enabled: true },
  });
  stats = await getUsageStats();
  assert.equal(stats.estimated, true);
  assert.equal(stats.unknownEvidence, true);
  assert.equal(stats.totalCachedInputTokens, null);
  assert.equal(stats.totalCachedInputTokensComplete, false);
  await saveRequestUsage({
    provider: "fixture",
    model: "fixture",
    timestamp: "2020-01-01T11:00:00.000Z",
    tokens: { input: 20, output: 5, cacheRead: 7 },
  });
  await rollupUsageHistoryBeforeDate("2020-02-01");
  stats = await getUsageStats();
  assert.equal(stats.totalCachedInputTokens, 7);
  assert.equal(stats.totalCachedInputTokensComplete, false);
  const { getCachedInputAnalytics } = await import("../../src/lib/db/cachedInputAnalytics.ts");
  const cache = getCachedInputAnalytics({
    sinceIso: null,
    untilIso: null,
    rawCutoffDate: "2020-02-01",
    apiKeyWhere: "",
    apiKeyParams: {},
  });
  assert.equal(cache.summary.cachedInputTokens, 7);
  assert.equal(cache.summary.cachedInputTokensComplete, false);
});

test("archive totals and evidence use the same snapshot when a write arrives during pricing", async () => {
  const db = getDbInstance();
  const insert = db.prepare(`INSERT INTO usage_history
    (provider, model, timestamp, tokens_input, tokens_output, tokens_cache_read,
     usage_evidence, usage_provenance, calculated_cost_usd)
    VALUES ('snapshot-fixture', 'snapshot-model', ?, ?, 5, ?, ?, 'estimated', 0.01)`);
  insert.run("2018-01-01T10:00:00.000Z", 20, null, JSON.stringify(evidence));
  const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
  // The async function has captured its rows and yielded at pricing. This insertion
  // must only appear in a subsequent rollup, not in this snapshot's evidence.
  const pending = rollupUsageHistoryBeforeDate("2018-02-01");
  insert.run(
    "2018-01-01T11:00:00.000Z",
    100,
    50,
    JSON.stringify({
      ...evidence,
      cacheRead: { source: "reported" },
    })
  );
  assert.equal((await pending).errors, 0);
  const read = () =>
    db
      .prepare(
        `SELECT total_requests, total_input_tokens,
    total_cache_read_tokens, estimated_requests, unknown_evidence_requests,
    cached_input_unknown_requests FROM daily_usage_summary
    WHERE provider = 'snapshot-fixture'`
      )
      .get();
  assert.deepEqual(read(), {
    total_requests: 1,
    total_input_tokens: 20,
    total_cache_read_tokens: null,
    estimated_requests: 1,
    unknown_evidence_requests: 0,
    cached_input_unknown_requests: 1,
  });
  assert.equal((await rollupUsageHistoryBeforeDate("2018-02-01")).errors, 0);
  assert.deepEqual(read(), {
    total_requests: 2,
    total_input_tokens: 120,
    total_cache_read_tokens: 50,
    estimated_requests: 2,
    unknown_evidence_requests: 0,
    cached_input_unknown_requests: 1,
  });
});
