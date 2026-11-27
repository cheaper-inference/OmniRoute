/**
 * Characterization of the `usage_history` statistics read models:
 * `db/settings/cacheMetrics.ts` (cache totals and hourly trend),
 * `db/usageSummary.ts` (monthly token total) and
 * `usage/connectionSpeedStats.ts` (recent decode speed of one connection).
 *
 * Written against the long-standing exports only, so it passes before and
 * after moving the queries behind a repository. Pins null-vs-zero handling,
 * completeness flags, grouping keys, the savings estimate, windows and
 * ordering, fallbacks on failure, and that each export queries in the
 * caller's turn.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-stats-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const cacheMetrics = await import("../../../src/lib/db/settings/cacheMetrics.ts");
const settings = await import("../../../src/lib/db/settings.ts");
const { sumUsageTokensThisMonth } = await import("../../../src/lib/db/usageSummary.ts");
const speed = await import("../../../src/lib/usage/connectionSpeedStats.ts");
const usageDb = await import("../../../src/lib/usageDb.ts");

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

type UsageRow = {
  provider?: string | null;
  model?: string | null;
  connectionId?: string | null;
  comboStrategy?: string | null;
  tokensInput?: number | null;
  tokensOutput?: number | null;
  cacheRead?: number | null;
  cacheCreation?: number | null;
  tokensReasoning?: number | null;
  success?: number;
  latencyMs?: number | null;
  ttftMs?: number | null;
  provenance?: string | null;
  timestamp?: string;
};

function insertUsage(row: UsageRow): void {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history (
         provider, model, connection_id, combo_strategy, tokens_input, tokens_output,
         tokens_cache_read, tokens_cache_creation, tokens_reasoning, success,
         latency_ms, ttft_ms, usage_provenance, timestamp
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      row.provider === undefined ? "p" : row.provider,
      row.model === undefined ? "m" : row.model,
      row.connectionId ?? null,
      row.comboStrategy === undefined ? "direct" : row.comboStrategy,
      row.tokensInput === undefined ? 0 : row.tokensInput,
      row.tokensOutput === undefined ? 0 : row.tokensOutput,
      row.cacheRead === undefined ? 0 : row.cacheRead,
      row.cacheCreation === undefined ? 0 : row.cacheCreation,
      row.tokensReasoning === undefined ? 0 : row.tokensReasoning,
      row.success ?? 1,
      row.latencyMs === undefined ? 0 : row.latencyMs,
      row.ttftMs === undefined ? 0 : row.ttftMs,
      row.provenance ?? null,
      row.timestamp ?? new Date().toISOString()
    );
}

function hoursAgo(hours: number, nowMs = Date.now()): string {
  return new Date(nowMs - hours * 3_600_000).toISOString();
}

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "export must stay synchronous");
  return value;
}

// ---------------------------------------------------------------------------
// getCacheMetrics
// ---------------------------------------------------------------------------

test("getCacheMetrics on an empty table returns zero counts and null token totals", async () => {
  const metrics = await cacheMetrics.getCacheMetrics();
  const { lastUpdated, ...rest } = metrics;
  assert.equal(typeof lastUpdated, "string");
  assert.deepEqual(rest, {
    estimated: false,
    totalRequests: 0,
    requestsWithCacheControl: 0,
    totalInputTokens: 0,
    totalCachedTokens: null,
    totalCacheCreationTokens: null,
    // COUNT(x) = COUNT(*) holds on zero rows, so an empty table reads as complete.
    totalCachedTokensComplete: true,
    totalCacheCreationTokensComplete: true,
    savingsComplete: true,
    tokensSaved: null,
    estimatedCostSaved: null,
    byProvider: {},
    byStrategy: {},
  });
});

test("getCacheMetrics totals, per-provider and per-strategy groups", async () => {
  insertUsage({
    provider: "anthropic",
    comboStrategy: null,
    tokensInput: 1000,
    cacheRead: 600,
    cacheCreation: 0,
  });
  insertUsage({
    provider: "anthropic",
    comboStrategy: "direct",
    tokensInput: 500,
    cacheRead: 0,
    cacheCreation: 200,
  });
  insertUsage({
    provider: "anthropic",
    comboStrategy: "priority",
    tokensInput: 300,
    cacheRead: 0,
    cacheCreation: 0,
  });
  insertUsage({
    provider: "openai",
    comboStrategy: "priority",
    tokensInput: 700,
    cacheRead: null,
    cacheCreation: 0,
    provenance: "estimated",
  });
  insertUsage({
    provider: null,
    comboStrategy: "weighted",
    tokensInput: 50,
    cacheRead: 5,
    cacheCreation: 1,
  });

  const metrics = await cacheMetrics.getCacheMetrics();
  assert.equal(metrics.totalRequests, 5);
  assert.equal(metrics.requestsWithCacheControl, 3);
  assert.equal(metrics.totalInputTokens, 2550);
  assert.equal(metrics.totalCachedTokens, 605);
  assert.equal(metrics.totalCacheCreationTokens, 201);
  assert.equal(metrics.estimated, true);
  assert.equal(metrics.totalCachedTokensComplete, false);
  assert.equal(metrics.totalCacheCreationTokensComplete, true);
  assert.equal(metrics.savingsComplete, false);
  assert.equal(metrics.tokensSaved, 605);
  // 605 / 1e6 * $3 * 0.9, rounded to cents.
  assert.equal(metrics.estimatedCostSaved, 0);

  // Rows without a provider are left out of byProvider only.
  assert.deepEqual(Object.keys(metrics.byProvider).sort(), ["anthropic", "openai"]);
  assert.deepEqual(metrics.byProvider.anthropic, {
    requests: 2,
    totalRequests: 3,
    cachedRequests: 2,
    // Input tokens of the rows with cache activity only.
    inputTokens: 1500,
    estimated: false,
    cachedTokens: 600,
    cacheCreationTokens: 200,
    cachedTokensComplete: true,
    cacheCreationTokensComplete: true,
  });
  assert.deepEqual(metrics.byProvider.openai, {
    requests: 0,
    totalRequests: 1,
    cachedRequests: 0,
    inputTokens: 0,
    estimated: true,
    cachedTokens: null,
    cacheCreationTokens: 0,
    cachedTokensComplete: false,
    cacheCreationTokensComplete: true,
  });

  // A NULL strategy and an explicit 'direct' share one key.
  assert.deepEqual(Object.keys(metrics.byStrategy).sort(), ["direct", "priority", "weighted"]);
  assert.deepEqual(metrics.byStrategy.direct, {
    requests: 2,
    inputTokens: 1500,
    estimated: false,
    cachedTokens: 600,
    cacheCreationTokens: 200,
    cachedTokensComplete: true,
    cacheCreationTokensComplete: true,
  });
  assert.deepEqual(metrics.byStrategy.priority, {
    requests: 2,
    inputTokens: 1000,
    estimated: true,
    cachedTokens: 0,
    cacheCreationTokens: 0,
    cachedTokensComplete: false,
    cacheCreationTokensComplete: true,
  });
  assert.equal(metrics.byStrategy.weighted.requests, 1);
});

test("getCacheMetrics savings estimate rounds to cents and null input tokens read as 0", async () => {
  insertUsage({ provider: "a", tokensInput: null, cacheRead: 1_234_567, cacheCreation: 0 });
  const metrics = await cacheMetrics.getCacheMetrics();
  assert.equal(metrics.totalInputTokens, 0);
  assert.equal(metrics.byProvider.a.inputTokens, 0);
  assert.equal(metrics.byStrategy.direct.inputTokens, 0);
  assert.equal(metrics.tokensSaved, 1_234_567);
  assert.equal(metrics.estimatedCostSaved, 3.33);
});

test("getCacheMetrics returns the empty result and logs when the query fails", async (t) => {
  insertUsage({ provider: "a", tokensInput: 10, cacheRead: 1 });
  core.getDbInstance().exec("DROP TABLE usage_history");
  const errors: unknown[][] = [];
  t.mock.method(console, "error", (...args: unknown[]) => {
    errors.push(args);
  });
  const metrics = await cacheMetrics.getCacheMetrics();
  const { lastUpdated, ...rest } = metrics;
  assert.equal(typeof lastUpdated, "string");
  assert.deepEqual(rest, {
    estimated: false,
    totalRequests: 0,
    requestsWithCacheControl: 0,
    totalInputTokens: 0,
    totalCachedTokens: null,
    totalCacheCreationTokens: null,
    totalCachedTokensComplete: false,
    totalCacheCreationTokensComplete: false,
    savingsComplete: false,
    tokensSaved: null,
    estimatedCostSaved: null,
    byProvider: {},
    byStrategy: {},
  });
  assert.equal(errors.length, 1);
  assert.equal(errors[0][0], "Failed to fetch cache metrics from usage_history:");
});

test("getCacheMetrics reads in the caller's turn, before its first await", async () => {
  insertUsage({ provider: "a", tokensInput: 10 });
  const pending = cacheMetrics.getCacheMetrics();
  insertUsage({ provider: "a", tokensInput: 10 });
  const metrics = await pending;
  assert.equal(metrics.totalRequests, 1);
});

test("updateCacheMetrics and resetCacheMetrics never write and return the computed metrics", async (t) => {
  insertUsage({ provider: "a", tokensInput: 10, cacheRead: 4 });
  const warnings: unknown[][] = [];
  t.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args);
  });
  const updated = await cacheMetrics.updateCacheMetrics({ totalRequests: 999 });
  const reset = await cacheMetrics.resetCacheMetrics();
  for (const result of [updated, reset]) {
    assert.equal(result.totalRequests, 1);
    assert.equal(result.totalCachedTokens, 4);
  }
  assert.equal(warnings.length, 1);
  const count = core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM usage_history").get() as {
    n: number;
  };
  assert.equal(count.n, 1);
});

test("settings.ts keeps re-exporting the cache metrics functions", () => {
  assert.equal(settings.getCacheMetrics, cacheMetrics.getCacheMetrics);
  assert.equal(settings.getCacheTrend, cacheMetrics.getCacheTrend);
  assert.equal(settings.updateCacheMetrics, cacheMetrics.updateCacheMetrics);
  assert.equal(settings.resetCacheMetrics, cacheMetrics.resetCacheMetrics);
});

// ---------------------------------------------------------------------------
// getCacheTrend
// ---------------------------------------------------------------------------

test("getCacheTrend buckets rows by UTC hour inside the window, oldest first", async () => {
  const now = Date.now();
  insertUsage({
    provider: "a",
    tokensInput: 100,
    cacheRead: 10,
    cacheCreation: null,
    timestamp: hoursAgo(0, now),
  });
  insertUsage({
    provider: "a",
    tokensInput: 50,
    cacheRead: 0,
    cacheCreation: 0,
    timestamp: hoursAgo(0, now),
  });
  insertUsage({
    provider: "b",
    tokensInput: null,
    cacheRead: 0,
    cacheCreation: 7,
    provenance: "estimated",
    timestamp: hoursAgo(2, now),
  });
  insertUsage({ provider: "c", tokensInput: 999, cacheRead: 999, timestamp: hoursAgo(72, now) });

  const trend = await cacheMetrics.getCacheTrend(4);
  assert.equal(trend.length, 2);
  const hourOf = (iso: string) => `${iso.slice(0, 13)}:00:00Z`;
  assert.deepEqual(trend[0], {
    estimated: true,
    timestamp: hourOf(hoursAgo(2, now)),
    requests: 1,
    cachedRequests: 1,
    inputTokens: 0,
    cachedTokens: 0,
    cacheCreationTokens: 7,
    cachedTokensComplete: true,
    cacheCreationTokensComplete: true,
  });
  assert.deepEqual(trend[1], {
    estimated: false,
    timestamp: hourOf(hoursAgo(0, now)),
    requests: 2,
    cachedRequests: 1,
    inputTokens: 150,
    cachedTokens: 10,
    cacheCreationTokens: 0,
    cachedTokensComplete: true,
    cacheCreationTokensComplete: false,
  });

  // The default window is 24 hours; a wider window picks up the old row.
  assert.equal((await cacheMetrics.getCacheTrend()).length, 2);
  assert.equal((await cacheMetrics.getCacheTrend(96)).length, 3);
});

test("getCacheTrend compares ISO timestamps as text against SQLite datetime()", async () => {
  // Known limitation kept as-is: the window start is `datetime('now', '-N hours')`
  // ("YYYY-MM-DD HH:MM:SS") and stored timestamps are ISO ("YYYY-MM-DDTHH:..."),
  // so on the window-start day 'T' sorts after ' ' and earlier rows still count.
  const startDay = new Date(Date.now() - 4 * 3_600_000).toISOString().slice(0, 10);
  const beforeStart = `${startDay}T00:00:00.000Z`;
  if (Date.parse(beforeStart) >= Date.now() - 4 * 3_600_000 - 1000) return; // window starts at midnight
  insertUsage({ provider: "a", tokensInput: 1, timestamp: beforeStart });
  const trend = await cacheMetrics.getCacheTrend(4);
  assert.equal(trend.length, 1);
  assert.equal(trend[0].timestamp, `${startDay}T00:00:00Z`);
});

test("getCacheTrend returns [] and logs when the query fails", async (t) => {
  core.getDbInstance().exec("DROP TABLE usage_history");
  const errors: unknown[][] = [];
  t.mock.method(console, "error", (...args: unknown[]) => {
    errors.push(args);
  });
  assert.deepEqual(await cacheMetrics.getCacheTrend(4), []);
  assert.equal(errors.length, 1);
  assert.equal(errors[0][0], "Failed to fetch cache trend:");
});

test("getCacheTrend reads in the caller's turn, before its first await", async () => {
  insertUsage({ provider: "a", tokensInput: 10 });
  const pending = cacheMetrics.getCacheTrend(4);
  insertUsage({ provider: "a", tokensInput: 10 });
  const trend = await pending;
  assert.equal(trend.length, 1);
  assert.equal(trend[0].requests, 1);
});

// ---------------------------------------------------------------------------
// sumUsageTokensThisMonth
// ---------------------------------------------------------------------------

test("sumUsageTokensThisMonth adds this month's live rows and rolled-up days only", () => {
  const db = core.getDbInstance();
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const monthStart = new Date(Date.UTC(year, month, 1)).toISOString();
  const nextMonth = new Date(Date.UTC(year, month + 1, 1)).toISOString();
  const lastMonthEnd = new Date(Date.UTC(year, month, 1) - 1).toISOString();

  insertUsage({ tokensInput: 10, tokensOutput: 5, timestamp: monthStart });
  insertUsage({ tokensInput: 1, tokensOutput: 2, timestamp: now.toISOString() });
  insertUsage({ tokensInput: 1000, tokensOutput: 1000, timestamp: lastMonthEnd });
  insertUsage({ tokensInput: 2000, tokensOutput: 2000, timestamp: nextMonth });

  const insertDay = db.prepare(
    "INSERT INTO daily_usage_summary (provider, model, date, total_input_tokens, total_output_tokens) VALUES ('p', 'm', ?, ?, ?)"
  );
  insertDay.run(monthStart.slice(0, 10), 100, 50);
  insertDay.run(lastMonthEnd.slice(0, 10), 7000, 7000);

  assert.equal(synchronous(sumUsageTokensThisMonth()), 15 + 3 + 150);
});

test("sumUsageTokensThisMonth reads from the handle it is given and falls back to 0", () => {
  const seen: string[] = [];
  const answering = {
    prepare(sql: string) {
      seen.push(sql);
      return { get: () => ({ used: 42 }) };
    },
  };
  assert.equal(sumUsageTokensThisMonth(answering as never), 42);
  assert.equal(seen.length, 1);
  assert.match(seen[0], /FROM usage_history/);
  assert.match(seen[0], /FROM daily_usage_summary/);

  const empty = { prepare: () => ({ get: () => undefined }) };
  assert.equal(sumUsageTokensThisMonth(empty as never), 0);

  const failing = {
    prepare() {
      throw new Error("no such table: daily_usage_summary");
    },
  };
  assert.equal(sumUsageTokensThisMonth(failing as never), 0);
});

// ---------------------------------------------------------------------------
// getConnectionSpeedStats
// ---------------------------------------------------------------------------

test("getConnectionSpeedStats reads the newest successful rows of one connection", () => {
  const now = Date.now();
  // Newest first: a failed row and another connection's row are both ignored.
  insertUsage({
    connectionId: "c1",
    model: "x",
    success: 0,
    latencyMs: 2000,
    ttftMs: 0,
    tokensOutput: 900,
    timestamp: hoursAgo(0.01, now),
  });
  insertUsage({
    connectionId: "c2",
    model: "x",
    latencyMs: 1000,
    ttftMs: 0,
    tokensOutput: 999,
    timestamp: hoursAgo(0.02, now),
  });
  // 300 tokens / 1.5 s = 200 tok/s
  insertUsage({
    connectionId: "c1",
    model: "x",
    latencyMs: 2000,
    ttftMs: 500,
    tokensOutput: 300,
    timestamp: hoursAgo(0.03, now),
  });
  // max(50, 200) tokens / 1.0 s = 200 tok/s
  insertUsage({
    connectionId: "c1",
    model: "y",
    latencyMs: 1200,
    ttftMs: 200,
    tokensOutput: 50,
    tokensReasoning: 200,
    timestamp: hoursAgo(0.04, now),
  });
  // 100 tokens / 1.0 s = 100 tok/s
  insertUsage({
    connectionId: "c1",
    model: null,
    latencyMs: 1100,
    ttftMs: 100,
    tokensOutput: 100,
    timestamp: hoursAgo(0.05, now),
  });

  const stats = synchronous(speed.getConnectionSpeedStats("c1"));
  assert.ok(stats);
  assert.equal(stats.samples, 3);
  assert.equal(stats.lastTps, 200);
  assert.equal(stats.avgTps, 166.67);
  assert.equal(stats.medianTps, 200);
  assert.equal(stats.avgTtftMs, 267);
  assert.deepEqual(
    stats.byModel.map((m) => [m.model, m.samples, m.avgTps]),
    [
      ["x", 1, 200],
      ["y", 1, 200],
      ["unknown", 1, 100],
    ]
  );

  // limit keeps only the newest rows; it is floored and at least 1.
  assert.equal(speed.getConnectionSpeedStats("c1", { limit: 1 })?.samples, 1);
  assert.equal(speed.getConnectionSpeedStats("c1", { limit: 2.9 })?.samples, 2);
  assert.equal(speed.getConnectionSpeedStats("c1", { limit: 0 })?.lastTps, 200);
  assert.equal(speed.getConnectionSpeedStats("c1", { limit: -5 })?.samples, 1);
  assert.equal(speed.DEFAULT_CONNECTION_SPEED_ROWS, 20);
});

test("getConnectionSpeedStats returns null for no id, no rows or no usable rows", () => {
  assert.equal(speed.getConnectionSpeedStats(""), null);
  assert.equal(speed.getConnectionSpeedStats("missing"), null);
  // A 250 ms generation window is below the 300 ms floor.
  insertUsage({ connectionId: "c3", latencyMs: 350, ttftMs: 100, tokensOutput: 40 });
  assert.equal(speed.getConnectionSpeedStats("c3"), null);
});

test("getConnectionSpeedStats only applies the default limit of 20 rows", () => {
  const now = Date.now();
  for (let i = 0; i < 25; i++) {
    insertUsage({
      connectionId: "c4",
      latencyMs: 1000,
      ttftMs: 0,
      tokensOutput: 100,
      timestamp: hoursAgo(i / 100, now),
    });
  }
  assert.equal(speed.getConnectionSpeedStats("c4")?.samples, 20);
});

test("speed decorators stay fail-open and usageDb keeps re-exporting the reader", (t) => {
  assert.equal(usageDb.getConnectionSpeedStats, speed.getConnectionSpeedStats);
  insertUsage({ connectionId: "c5", latencyMs: 1000, ttftMs: 0, tokensOutput: 100 });
  const decorated = speed.withConnectionSpeedStats("c5", { used: 1 }) as {
    speed?: { samples: number };
  };
  assert.equal(decorated.speed?.samples, 1);
  assert.deepEqual(speed.attachConnectionSpeedStats({ c5: { a: 1 }, nobody: { b: 2 } }).nobody, {
    b: 2,
  });

  core.getDbInstance().exec("DROP TABLE usage_history");
  t.mock.method(console, "warn", () => {});
  assert.deepEqual(speed.withConnectionSpeedStats("c5", { used: 1 }), { used: 1 });
});
