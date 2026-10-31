import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-daily-rollup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const aggregateHistory = await import("../../src/lib/usage/aggregateHistory.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { buildUnifiedSource, buildPresetUnifiedSource } =
  await import("../../src/lib/db/usageAnalytics/sources.ts");
const { getProviderDailyUsageRows, readPublishedCutoffDate } =
  await import("../../src/lib/db/usageAnalytics.ts");
const { sumUsageTokensThisMonth } = await import("../../src/lib/db/usageSummary.ts");
const { getUsageStats } = await import("../../src/lib/usage/usageStats.ts");
const { calculateCost } = await import("../../src/lib/usage/costCalculator.ts");
const { SQLITE_FILE } = await import("../../src/lib/db/core.ts");

let usageWriteSequence = 0;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertUsageRow(row: {
  provider?: string;
  model?: string;
  tier?: string;
  day: string;
  tokens?: number;
  cacheRead?: number;
  cacheCreation?: number;
  reasoning?: number;
  cost?: number | null;
}) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history
        (provider, model, connection_id, tokens_input, tokens_output,
         tokens_cache_read, tokens_cache_creation, tokens_reasoning,
         provider_cost_usd, service_tier, success, latency_ms, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      row.provider ?? "anthropic",
      row.model ?? "claude",
      "conn-1",
      row.tokens ?? 100,
      40,
      row.cacheRead ?? 0,
      row.cacheCreation ?? 0,
      row.reasoning ?? 0,
      row.cost ?? null,
      row.tier ?? "standard",
      1,
      200,
      `${row.day}T12:00:00.${String(++usageWriteSequence).padStart(3, "0")}Z`
    );
}

function summaryRequests(day: string): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COALESCE(SUM(total_requests), 0) AS n FROM usage_daily_summary WHERE date = ?")
    .get(day) as { n: number };
  return row.n;
}

let summaryWrites = 0;

function countSummaryWrites() {
  const db = core.getDbInstance();
  const original = db.prepare.bind(db);
  db.prepare = ((sql: string) => {
    const statement = original(sql);
    if (sql.startsWith("INSERT INTO usage_daily_summary")) {
      const run = statement.run.bind(statement);
      statement.run = (...args: unknown[]) => {
        summaryWrites += 1;
        return run(...args);
      };
    }
    return statement;
  }) as typeof db.prepare;
}

function pointer(): string | null {
  const row = core
    .getDbInstance()
    .prepare("SELECT last_completed_date FROM rollup_state WHERE tier = 'daily'")
    .get() as { last_completed_date: string | null } | undefined;
  return row?.last_completed_date ?? null;
}

function rawRows(day: string): number {
  return (
    core
      .getDbInstance()
      .prepare("SELECT COUNT(*) AS n FROM usage_history WHERE DATE(timestamp) = ?")
      .get(day) as { n: number }
  ).n;
}

async function retire(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  const now = new Date(Date.UTC(year, month - 1, date + 2, 12));
  const OriginalDate = globalThis.Date;
  class FrozenDate extends OriginalDate {
    constructor(...args: ConstructorParameters<typeof Date>) {
      if (args.length === 0) super(now.getTime());
      else super(...args);
    }
    static now() {
      return now.getTime();
    }
  }
  globalThis.Date = FrozenDate as DateConstructor;
  try {
    databaseSettings.updateDatabaseSettings({
      retention: {
        ...databaseSettings.getUserDatabaseSettings().retention,
        usageHistory: 1,
      },
    });
    return await cleanup.cleanupUsageHistory();
  } finally {
    globalThis.Date = OriginalDate;
  }
}

function revision(day: string): number | undefined {
  return (
    core
      .getDbInstance()
      .prepare("SELECT revision FROM rollup_dirty_day WHERE date = ?")
      .get(day) as { revision: number } | undefined
  )?.revision;
}

async function recordUsageRow(day: string, extra: { endpoint?: string; timestamp?: string } = {}) {
  usageWriteSequence += 1;
  await saveRequestUsage({
    provider: "anthropic",
    model: "claude",
    connectionId: "conn-1",
    timestamp: extra.timestamp ?? `${day}T12:00:00.${String(usageWriteSequence).padStart(3, "0")}Z`,
    tokens: { input: 100, output: 40 },
    endpoint: extra.endpoint,
  });
}

async function insertDuplicateThatRewritesEndpoint(day: string) {
  await recordUsageRow(day, {
    timestamp: `${day}T12:00:00.001Z`,
    endpoint: "/v1/messages",
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("usage rollup writes service_tier into usage_daily_summary, not daily_usage_summary", async () => {
  insertUsageRow({ provider: "anthropic", model: "claude", tier: "priority", day: "2026-01-01" });
  insertUsageRow({ provider: "anthropic", model: "claude", tier: "standard", day: "2026-01-01" });

  const result = await aggregateHistory.rollupUsageHistoryBeforeDate("2026-01-02");

  assert.equal(result.errors, 0);
  const db = core.getDbInstance();
  const rows = db
    .prepare("SELECT service_tier FROM usage_daily_summary ORDER BY service_tier")
    .all() as Array<{
    service_tier: string;
  }>;
  assert.deepEqual(
    rows.map((row) => row.service_tier),
    ["priority", "standard"]
  );
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS n FROM daily_usage_summary").get() as { n: number }).n,
    0
  );
});

test("a new usage row bumps its day's revision in the same transaction", async () => {
  await recordUsageRow("2026-01-01");
  const db = core.getDbInstance();
  const first = db
    .prepare("SELECT revision FROM rollup_dirty_day WHERE date = ?")
    .get("2026-01-01") as {
    revision: number;
  };
  await recordUsageRow("2026-01-01");
  const second = db
    .prepare("SELECT revision FROM rollup_dirty_day WHERE date = ?")
    .get("2026-01-01") as {
    revision: number;
  };
  assert.ok(second.revision > first.revision);
});

test("rewriting endpoint on a duplicate does not bump the revision", async () => {
  await recordUsageRow("2026-01-01", { timestamp: "2026-01-01T12:00:00.001Z" });
  const before = revision("2026-01-01");
  const db = core.getDbInstance();
  await insertDuplicateThatRewritesEndpoint("2026-01-01");
  assert.equal(revision("2026-01-01"), before);
  assert.equal((db.prepare("SELECT COUNT(*) AS n FROM usage_history").get() as { n: number }).n, 1);
  assert.equal(
    (db.prepare("SELECT endpoint FROM usage_history").get() as { endpoint: string }).endpoint,
    "/v1/messages"
  );
});

test("a row committed while day D is being priced aborts the publish", async () => {
  await recordUsageRow("2026-01-01");
  const result = await aggregateHistory.publishDay("2026-01-01", {
    pause: async () => {
      await recordUsageRow("2026-01-01");
    },
  });
  assert.equal(result.reason, "stale");
  assert.equal(summaryRequests("2026-01-01"), 0);
});

test("the next publish of a stale day includes the row", async () => {
  await recordUsageRow("2026-01-01");
  await aggregateHistory.publishDay("2026-01-01", {
    pause: async () => {
      await recordUsageRow("2026-01-01");
    },
  });
  assert.equal((await aggregateHistory.publishDay("2026-01-01")).reason, "ok");
  assert.equal(summaryRequests("2026-01-01"), 2);
});

test("republishing a day replaces it and does not add", async () => {
  await recordUsageRow("2026-01-01");
  await aggregateHistory.publishDay("2026-01-01");
  await aggregateHistory.publishDay("2026-01-01");
  assert.equal(summaryRequests("2026-01-01"), 1);
});

test("a day with no rows still advances the pointer", async () => {
  insertUsageRow({ day: "2026-01-01" });
  await aggregateHistory.runDailyRollup(new Date("2026-01-04T00:00:00Z"));
  assert.equal(pointer(), "2026-01-03");
});

test("two runs cannot price the same day", async () => {
  insertUsageRow({ day: "2026-01-01", tokens: 10 });
  countSummaryWrites();
  let startSecond: () => void = () => {};
  const secondStarted = new Promise<void>((resolve) => {
    startSecond = resolve;
  });
  const secondDone = secondStarted.then(
    () =>
      new Promise<void>((resolve) => {
        setImmediate(() => {
          void aggregateHistory.runDailyRollup(new Date("2026-01-02T00:00:00Z")).then(resolve);
        });
      })
  );
  const first = aggregateHistory.runDailyRollup(new Date("2026-01-02T00:00:00Z"), {
    pause: () => {
      startSecond();
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    },
  });
  await first;
  await secondDone;
  assert.equal(summaryWrites, 1);
});

test("cleanup does not republish a date it already retired", async () => {
  insertUsageRow({ day: "2026-01-01" });
  await retire("2026-01-01");
  insertUsageRow({ day: "2026-01-01" });
  await cleanup.cleanupUsageHistory();
  assert.equal(summaryRequests("2026-01-01"), 1);
  assert.equal(rawRows("2026-01-01"), 1);
});

test("a null pointer reads raw rows only", () => {
  const { unifiedSource } = buildUnifiedSource({
    sinceIso: "2026-01-01T00:00:00Z",
    untilIso: null,
    rawCutoffDate: null,
    apiKeyWhere: null,
    apiKeyParams: {},
  });
  assert.equal(unifiedSource.includes("usage_daily_summary"), false);
});

test("getUsageStats reports the cache tokens of a published day", async () => {
  databaseSettings.updateDatabaseSettings({
    aggregation: {
      ...databaseSettings.getUserDatabaseSettings().aggregation,
      enabled: true,
    },
  });
  insertUsageRow({
    provider: "openai",
    model: "gpt-6-astra",
    day: "2026-01-01",
    tokens: 1_000,
    cacheCreation: 1_000_000,
    reasoning: 8_000,
    cost: 0,
  });
  insertUsageRow({ provider: "openai", model: "gpt-6-astra", day: "2026-01-02", tokens: 1 });
  await aggregateHistory.runDailyRollup(new Date("2026-01-03T00:00:00Z"));
  core.getDbInstance().prepare("DELETE FROM usage_history").run();

  const stats = await getUsageStats();
  const withoutCache = await calculateCost(
    "openai",
    "gpt-6-astra",
    { input: 1_000, output: 40, reasoning: 8_000 },
    { provider: "openai", flatRateAsZero: true }
  );

  assert.equal(stats.byModel["gpt-6-astra (openai)"].requests, 2);
  assert.equal(stats.totalPromptTokens, 1_001);
  assert.equal(stats.totalCompletionTokens, 80);
  assert.ok(stats.totalCost > withoutCache);
});

test("a published day with a stored cost is not billed again for its tokens", async () => {
  databaseSettings.updateDatabaseSettings({
    aggregation: {
      ...databaseSettings.getUserDatabaseSettings().aggregation,
      enabled: true,
    },
  });
  insertUsageRow({
    provider: "openai",
    model: "gpt-6-astra",
    day: "2026-01-01",
    tokens: 1_000,
    cacheRead: 1_000_000,
    cost: 4.2,
  });
  await aggregateHistory.runDailyRollup(new Date("2026-01-02T00:00:00Z"));
  core.getDbInstance().prepare("DELETE FROM usage_history").run();

  const stats = await getUsageStats();
  const tokenPrice = await calculateCost(
    "openai",
    "gpt-6-astra",
    { input: 1_000, output: 40, cacheRead: 1_000_000 },
    { provider: "openai", flatRateAsZero: true }
  );

  assert.equal(stats.byModel["gpt-6-astra (openai)"].requests, 1);
  assert.equal(stats.totalCost, tokenPrice);
  assert.ok(tokenPrice > 0);
  assert.notEqual(stats.totalCost, tokenPrice + 4.2);
});

test("the rollup hold takes the write lock before its callback runs", async () => {
  insertUsageRow({ day: "2026-01-01" });
  const { Worker } = await import("node:worker_threads");
  // An eval worker needs no file in the repo; its require() resolves from the cwd.
  const writerSource = `
const { parentPort, workerData } = require("node:worker_threads");
const Database = require("better-sqlite3");
const db = new Database(workerData.file);
db.pragma("busy_timeout = 300");
const started = Date.now();
const status = new Int32Array(workerData.status);
try {
  db.exec("BEGIN IMMEDIATE");
  Atomics.store(status, 0, 1);
} catch {
  Atomics.store(status, 0, 2);
}
Atomics.store(status, 1, Date.now() - started);
Atomics.store(status, 2, 1);
Atomics.notify(status, 2);
parentPort.postMessage("done");
`;
  const status = new SharedArrayBuffer(12);

  await aggregateHistory.runDailyRollup(new Date("2026-01-02T00:00:00Z"), {
    pause: () => {
      const writer = new Worker(writerSource, {
        eval: true,
        workerData: { file: SQLITE_FILE, status },
      });
      const view = new Int32Array(status);
      const saw = Atomics.wait(view, 2, 0, 1_000);
      const outcome = [Atomics.load(view, 0), Atomics.load(view, 1)] as const;
      void writer.terminate();
      assert.notEqual(saw, "timed-out", "second connection never answered");
      assert.equal(outcome[0], 2, `second connection committed after ${outcome[1]}ms`);
    },
  });
});

test("a published day is read from usage_daily_summary and carries its cache tokens", () => {
  const { unifiedSource } = buildUnifiedSource({
    sinceIso: "2026-01-01T00:00:00Z",
    untilIso: null,
    rawCutoffDate: "2026-01-05",
    apiKeyWhere: null,
    apiKeyParams: {},
  });
  assert.equal(unifiedSource.includes("usage_daily_summary"), true);
  assert.equal(unifiedSource.includes("total_cache_read_tokens"), true);
  assert.equal(/date <= @rawCutoffDate/.test(unifiedSource), true);
  assert.equal(/DATE\(timestamp\) > @rawCutoff/.test(unifiedSource), true);
});

function insertPublishedDay(row: {
  day: string;
  requests?: number;
  input?: number;
  output?: number;
  provider?: string;
  model?: string;
}) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_daily_summary
        (provider, model, service_tier, date, total_requests, total_input_tokens, total_output_tokens)
       VALUES (?, ?, 'standard', ?, ?, ?, ?)`
    )
    .run(
      row.provider ?? "anthropic",
      row.model ?? "claude",
      row.day,
      row.requests ?? 1,
      row.input ?? 100,
      row.output ?? 40
    );
}

function setPublishedCutoff(day: string) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO rollup_state (tier, last_completed_date)
       VALUES ('daily', ?)
       ON CONFLICT(tier) DO UPDATE SET last_completed_date = excluded.last_completed_date`
    )
    .run(day);
}

test("a raw row at noon on the published day is counted once", () => {
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });
  insertPublishedDay({ day, requests: 1, input: 100, output: 40 });

  const { unifiedSource, unifiedParams } = buildUnifiedSource({
    sinceIso: "2026-06-01T00:00:00.000Z",
    untilIso: null,
    rawCutoffDate: day,
    apiKeyWhere: null,
    apiKeyParams: {},
  });
  const preset = buildPresetUnifiedSource({
    sinceIso: "2026-06-01T00:00:00.000Z",
    untilIso: null,
    rawCutoffDate: day,
    apiKeyWhere: null,
    apiKeyParams: {},
  });
  const db = core.getDbInstance();
  const counted = db
    .prepare(
      `SELECT COUNT(*) AS n, COALESCE(SUM(tokens_input), 0) AS input FROM ${unifiedSource} AS _u`
    )
    .get(unifiedParams) as { n: number; input: number };
  const presetCounted = db
    .prepare(
      `SELECT COUNT(*) AS n, COALESCE(SUM(tokens_input), 0) AS input FROM ${preset.unifiedSource} AS _u`
    )
    .get(preset.unifiedParams) as { n: number; input: number };

  assert.equal(counted.n, 1);
  assert.equal(counted.input, 100);
  assert.equal(presetCounted.n, 1);
  assert.equal(presetCounted.input, 100);
});

test("getUsageStats counts a raw noon row on the published day once", async () => {
  databaseSettings.updateDatabaseSettings({
    aggregation: {
      ...databaseSettings.getUserDatabaseSettings().aggregation,
      enabled: true,
    },
  });
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });
  insertPublishedDay({ day, requests: 1, input: 100, output: 40 });
  setPublishedCutoff(day);

  const stats = await getUsageStats();

  assert.equal(stats.byModel["claude (anthropic)"].requests, 1);
  assert.equal(stats.totalPromptTokens, 100);
});

test("getProviderDailyUsageRows sums total_requests of a published day", () => {
  const day = "2026-06-20";
  insertPublishedDay({ day, requests: 7, input: 70, output: 14 });
  const { unifiedSource, unifiedParams } = buildUnifiedSource({
    sinceIso: "2026-06-01T00:00:00.000Z",
    untilIso: null,
    rawCutoffDate: day,
    apiKeyWhere: null,
    apiKeyParams: {},
  });

  const rows = getProviderDailyUsageRows(unifiedSource, unifiedParams);
  const published = rows.find((row) => row.date === day && row.provider === "anthropic");

  assert.ok(published);
  assert.equal(published.requests, 7);
});

function tokensReadThroughAnalytics(day: string): number {
  const { unifiedSource, unifiedParams } = buildUnifiedSource({
    sinceIso: `${day.slice(0, 8)}01T00:00:00.000Z`,
    untilIso: null,
    rawCutoffDate: readPublishedCutoffDate(core.getDbInstance()),
    apiKeyWhere: null,
    apiKeyParams: {},
  });
  const row = core
    .getDbInstance()
    .prepare(
      `SELECT COALESCE(SUM(tokens_input + tokens_output), 0) AS tokens FROM ${unifiedSource} AS _u`
    )
    .get(unifiedParams) as { tokens: number };
  return row.tokens;
}

test("cleanup publishes a day the analytics source still reads", async () => {
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });

  await retire(day);

  assert.equal(rawRows(day), 0);
  assert.equal(tokensReadThroughAnalytics(day), 140);
});

test("cleanup leaves the pointer where it is when the day was already retired", async () => {
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });
  await retire(day);
  const advanced = pointer();
  assert.equal(advanced, day);

  await retire(day);

  assert.equal(pointer(), advanced);
});

test("cleanup does not move a newer pointer backward", async () => {
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });
  setPublishedCutoff("2026-06-22");

  await retire(day);

  assert.equal(pointer(), "2026-06-22");
  assert.equal(tokensReadThroughAnalytics(day), 140);
});

test("a failed publish commit leaves the pointer and the raw rows", async () => {
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });
  const db = core.getDbInstance();
  const original = db.prepare.bind(db);
  let deleted = false;
  db.prepare = ((sql: string) => {
    const statement = original(sql);
    if (sql.startsWith("DELETE FROM usage_history WHERE DATE(timestamp)")) {
      const run = statement.run.bind(statement);
      statement.run = (...args: unknown[]) => {
        deleted = true;
        return run(...args);
      };
    }
    if (deleted && sql.includes("INSERT INTO rollup_state")) {
      throw new Error("publish commit failed after delete");
    }
    return statement;
  }) as typeof db.prepare;

  const result = await retire(day);

  assert.equal(result.errors, 1);
  assert.equal(result.deleted, 0);
  assert.equal(pointer(), null);
  assert.equal(rawRows(day), 1);
  assert.equal(summaryRequests(day), 0);
});

test("sumUsageTokensThisMonth counts tokens cleanup moved into usage_daily_summary", async () => {
  const day = "2026-06-21";
  insertUsageRow({ day, tokens: 100 });
  await retire(day);

  const moved = core
    .getDbInstance()
    .prepare(
      "SELECT COALESCE(SUM(total_input_tokens + total_output_tokens), 0) AS n FROM usage_daily_summary"
    )
    .get() as { n: number };
  assert.equal(moved.n, 140);
  assert.equal(rawRows(day), 0);

  const monthStart = core
    .getDbInstance()
    .prepare("SELECT strftime('%Y-%m-01', 'now') AS d")
    .get() as { d: string };
  core
    .getDbInstance()
    .prepare("UPDATE usage_daily_summary SET date = ?")
    .run(`${monthStart.d.slice(0, 8)}05`);

  assert.equal(sumUsageTokensThisMonth(), 140);
});

test("a usage reset deletes the published usage day", async () => {
  const day = "2026-06-21";
  insertPublishedDay({ day, requests: 3, input: 30, output: 10 });
  assert.equal(summaryRequests(day), 3);

  const period = await cleanup.resetUsageHistory("all");
  assert.equal(period.errors, 0);
  assert.equal(period.deletedDailySummary, 1);
  assert.equal(summaryRequests(day), 0);

  insertPublishedDay({ day, requests: 3, input: 30, output: 10 });
  const scoped = await cleanup.resetUsageHistory("30d");
  assert.equal(scoped.errors, 0);
  assert.equal(scoped.deletedDailySummary, 1);
  assert.equal(summaryRequests(day), 0);
});
