/**
 * Contract and composition tests for the `usage_history` statistics read
 * repository: Promise-returning async methods, the SQLite-only synchronous
 * legacy binding, and the facades delegating to the same queries.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-stats-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const { sqliteUsageStatsReadRepository: reads, sqliteUsageStatsReadLegacySync: legacy } =
  await import("../../../../src/lib/db/repositories/sqliteUsageStatsReadRepository.ts");
const { usageStatsRepositories } =
  await import("../../../../src/lib/db/repositories/usageStatsRepositories.ts");
const cacheMetrics = await import("../../../../src/lib/db/settings/cacheMetrics.ts");
const { sumUsageTokensThisMonth } = await import("../../../../src/lib/db/usageSummary.ts");
const speed = await import("../../../../src/lib/usage/connectionSpeedStats.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

function insertUsage(values: {
  provider?: string | null;
  connectionId?: string | null;
  model?: string | null;
  tokensInput?: number | null;
  tokensOutput?: number;
  cacheRead?: number | null;
  cacheCreation?: number | null;
  success?: number;
  latencyMs?: number;
  ttftMs?: number;
  tokensReasoning?: number;
  timestamp?: string;
}): void {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history (
         provider, model, connection_id, tokens_input, tokens_output, tokens_cache_read,
         tokens_cache_creation, tokens_reasoning, success, latency_ms, ttft_ms, timestamp
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      values.provider === undefined ? "p" : values.provider,
      values.model === undefined ? "m" : values.model,
      values.connectionId ?? null,
      values.tokensInput === undefined ? 0 : values.tokensInput,
      values.tokensOutput ?? 0,
      values.cacheRead === undefined ? 0 : values.cacheRead,
      values.cacheCreation === undefined ? 0 : values.cacheCreation,
      values.tokensReasoning ?? 0,
      values.success ?? 1,
      values.latencyMs ?? 0,
      values.ttftMs ?? 0,
      values.timestamp ?? new Date().toISOString()
    );
}

test("composition root binds the SQLite repository and its legacy sync helpers", () => {
  assert.equal(usageStatsRepositories.reads, reads);
  assert.equal(usageStatsRepositories.legacySync, legacy);
  for (const fn of Object.values(legacy)) assert.equal(typeof fn, "function");
});

test("async methods return Promises; legacy helpers return values", async () => {
  const db = core.getDbInstance();
  const calls = [
    reads.getCacheUsageSnapshot(),
    reads.listCacheTrend(4),
    reads.sumTokensThisMonth(),
    reads.listRecentConnectionSpeedSamples("c", 5),
  ];
  for (const call of calls) assert.ok(call instanceof Promise);
  await Promise.all(calls);
  for (const value of [
    legacy.getCacheUsageSnapshot(db),
    legacy.listCacheTrend(db, 4),
    legacy.sumTokensThisMonth(db),
    legacy.listRecentConnectionSpeedSamples(db, "c", 5),
  ]) {
    assert.equal(value instanceof Promise, false);
  }
});

test("getCacheUsageSnapshot keeps null counters and boolean flags", async () => {
  assert.deepEqual(await reads.getCacheUsageSnapshot(), {
    totals: {
      totalRequests: 0,
      totalInputTokens: null,
      totalCachedTokens: null,
      totalCacheCreationTokens: null,
      cachedRequests: null,
      estimated: false,
      totalCachedTokensComplete: true,
      totalCacheCreationTokensComplete: true,
    },
    allRequests: 0,
    byProvider: [],
    byStrategy: [],
  });

  insertUsage({ provider: "a", tokensInput: 10, cacheRead: null, cacheCreation: 3 });
  insertUsage({ provider: null, tokensInput: 5, cacheRead: 2, cacheCreation: 0 });
  const snapshot = await reads.getCacheUsageSnapshot();
  assert.deepEqual(snapshot.totals, {
    totalRequests: 2,
    totalInputTokens: 15,
    totalCachedTokens: 2,
    totalCacheCreationTokens: 3,
    cachedRequests: 2,
    estimated: false,
    totalCachedTokensComplete: false,
    totalCacheCreationTokensComplete: true,
  });
  assert.equal(snapshot.allRequests, 2);
  assert.deepEqual(snapshot.byProvider, [
    {
      provider: "a",
      totalRequests: 1,
      cachedRequests: 1,
      inputTokens: 10,
      cachedTokens: null,
      cacheCreationTokens: 3,
      estimated: false,
      cachedTokensComplete: false,
      cacheCreationTokensComplete: true,
    },
  ]);
  assert.deepEqual(snapshot.byStrategy, [
    {
      strategy: "direct",
      requests: 2,
      inputTokens: 15,
      cachedTokens: 2,
      cacheCreationTokens: 3,
      estimated: false,
      cachedTokensComplete: false,
      cacheCreationTokensComplete: true,
    },
  ]);
  assert.deepEqual(legacy.getCacheUsageSnapshot(core.getDbInstance()), snapshot);
});

test("legacy helpers query the handle they are given", () => {
  const seen: string[] = [];
  const fake = {
    prepare(sql: string) {
      seen.push(sql.replace(/\s+/g, " ").trim());
      return { get: () => undefined, all: () => [] };
    },
  };
  assert.deepEqual(legacy.getCacheUsageSnapshot(fake as never), {
    totals: null,
    allRequests: null,
    byProvider: [],
    byStrategy: [],
  });
  assert.deepEqual(legacy.listCacheTrend(fake as never, 4), []);
  assert.equal(legacy.sumTokensThisMonth(fake as never), 0);
  assert.deepEqual(legacy.listRecentConnectionSpeedSamples(fake as never, "c", 3), []);
  assert.equal(seen.length, 7);
});

test("listCacheTrend, sumTokensThisMonth and speed samples match the facades", async () => {
  const now = Date.now();
  insertUsage({ provider: "a", tokensInput: 100, tokensOutput: 7, cacheRead: 10 });
  insertUsage({
    connectionId: "c1",
    model: "x",
    tokensOutput: 300,
    latencyMs: 2000,
    ttftMs: 500,
    timestamp: new Date(now - 60_000).toISOString(),
  });
  insertUsage({
    connectionId: "c1",
    model: "y",
    tokensOutput: 50,
    tokensReasoning: 200,
    latencyMs: 1200,
    ttftMs: 200,
    timestamp: new Date(now - 120_000).toISOString(),
  });
  insertUsage({ connectionId: "c1", success: 0, tokensOutput: 9, latencyMs: 9 });

  const trend = await reads.listCacheTrend(4);
  assert.equal(trend.length, 1);
  assert.deepEqual(
    (await cacheMetrics.getCacheTrend(4)).map((p) => [p.timestamp, p.requests]),
    trend.map((b) => [b.hour, b.requests])
  );

  assert.equal(await reads.sumTokensThisMonth(), 107 + 300 + 50 + 9);
  assert.equal(await reads.sumTokensThisMonth(), sumUsageTokensThisMonth());

  const samples = await reads.listRecentConnectionSpeedSamples("c1", 5);
  assert.deepEqual(samples, [
    { model: "x", latencyMs: 2000, ttftMs: 500, tokensOutput: 300, tokensReasoning: 0 },
    { model: "y", latencyMs: 1200, ttftMs: 200, tokensOutput: 50, tokensReasoning: 200 },
  ]);
  assert.deepEqual(await reads.listRecentConnectionSpeedSamples("c1", 1), [samples[0]]);
  assert.equal(speed.getConnectionSpeedStats("c1")?.samples, 2);
});
