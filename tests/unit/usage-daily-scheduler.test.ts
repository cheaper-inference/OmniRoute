import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-daily-scheduler-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/databaseSettings.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const aggregate = await import("../../src/lib/usage/aggregateHistory.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
let sequence = 0;
const NativeDate = Date;
const NOW = "2026-06-03T00:00:00.000Z";

async function at(now: string, run: () => Promise<void>) {
  class FixedDate extends NativeDate {
    constructor(...args: ConstructorParameters<typeof Date>) {
      if (args.length === 0) super(now);
      else super(...args);
    }
    static now() {
      return new NativeDate(now).getTime();
    }
  }
  globalThis.Date = FixedDate as DateConstructor;
  try {
    await run();
  } finally {
    globalThis.Date = NativeDate;
  }
}
async function write(day: string) {
  await saveRequestUsage({
    provider: "openai",
    model: "gpt-test",
    success: true,
    tokens: { input: 10, output: 1 },
    timestamp: `${day}T12:00:00.${String(++sequence).padStart(3, "0")}Z`,
  });
}
function totals(day: string) {
  const db = core.getDbInstance();
  return {
    summary: (
      db
        .prepare("SELECT COALESCE(SUM(total_requests),0) n FROM usage_daily_summary WHERE date=?")
        .get(day) as { n: number }
    ).n,
    raw: (
      db.prepare("SELECT COUNT(*) n FROM usage_history WHERE DATE(timestamp)=?").get(day) as {
        n: number;
      }
    ).n,
  };
}
function configure(enabled = true) {
  const current = settings.getUserDatabaseSettings();
  settings.updateDatabaseSettings({
    aggregation: { ...current.aggregation, enabled },
    retention: { ...current.retention, autoCleanupEnabled: true, usageHistory: 365 },
  });
}
test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  configure();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("actual scheduled startup publishes closed UTC days inside retention, repeated periodic pass is idempotent", async () => {
  await write("2026-06-02");
  await write("2026-06-03");
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.deepEqual(totals("2026-06-02"), { summary: 1, raw: 1 });
  assert.deepEqual(totals("2026-06-03"), { summary: 0, raw: 1 });
  await at(NOW, () => cleanup.runScheduledCleanupPass("periodic"));
  assert.deepEqual(totals("2026-06-02"), { summary: 1, raw: 1 });
});

test("scheduled daily publication respects the aggregation setting", async () => {
  configure(false);
  await write("2026-06-02");
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.deepEqual(totals("2026-06-02"), { summary: 0, raw: 1 });
});

test("late writes on a previously published complete day are republished without moving pointer backward", async () => {
  await write("2026-06-01");
  await write("2026-06-02");
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  await write("2026-06-01");
  await at(NOW, () => cleanup.runScheduledCleanupPass("periodic"));
  assert.deepEqual(totals("2026-06-01"), { summary: 2, raw: 2 });
  assert.equal(
    (
      core
        .getDbInstance()
        .prepare("SELECT last_completed_date d FROM rollup_state WHERE tier='daily'")
        .get() as { d: string }
    ).d,
    "2026-06-02"
  );
});

function claim(token: string | null, expires: number | null) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO rollup_state
    (tier, reading_date, reading_token, reading_expires_at) VALUES ('daily','2026-06-02',?,?)
    ON CONFLICT(tier) DO UPDATE SET reading_date=excluded.reading_date,
      reading_token=excluded.reading_token, reading_expires_at=excluded.reading_expires_at`
    )
    .run(token, expires);
}

test("restart retains an active claim and recovers an expired or legacy claim", async () => {
  await write("2026-06-02");
  const now = new NativeDate(NOW).getTime();
  claim("live-owner", now + 60_000);
  core.resetDbInstance();
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.equal(totals("2026-06-02").summary, 0);
  core.resetDbInstance();
  await at("2026-06-03T00:02:00.000Z", () => cleanup.runScheduledCleanupPass("startup"));
  assert.equal(totals("2026-06-02").summary, 1);
  await write("2026-06-02");
  claim(null, null);
  core.resetDbInstance();
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.equal(totals("2026-06-02").summary, 2);
});

test("a replaced owner cannot publish or clear the successor claim", async () => {
  await write("2026-06-02");
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  let replaced = false;
  db.prepare = ((sql: string) => {
    if (!replaced && sql.includes(aggregate.PRICE_RANGE_FROM)) {
      replaced = true;
      // Simulate an expired lease being claimed while the first owner prices.
      claim("successor", new NativeDate(NOW).getTime() + 60_000);
    }
    return prepare(sql);
  }) as typeof db.prepare;
  try {
    await at(NOW, () => aggregate.runDailyRollup(new Date()));
  } finally {
    db.prepare = prepare as typeof db.prepare;
  }
  assert.equal(replaced, true);
  assert.equal(totals("2026-06-02").summary, 0);
  assert.equal(
    (
      db.prepare("SELECT reading_token token FROM rollup_state WHERE tier='daily'").get() as {
        token: string;
      }
    ).token,
    "successor"
  );
});

test("failed startup publication releases its claim and a later pass succeeds", async () => {
  await write("2026-06-02");
  const db = core.getDbInstance();
  db.exec(
    "CREATE TRIGGER fail_publication BEFORE INSERT ON usage_daily_summary BEGIN SELECT RAISE(ABORT,'publication failed'); END"
  );
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.equal(totals("2026-06-02").summary, 0);
  assert.equal(
    (
      db.prepare("SELECT reading_token token FROM rollup_state WHERE tier='daily'").get() as {
        token: null;
      }
    ).token,
    null
  );
  db.exec("DROP TRIGGER fail_publication");
  await at(NOW, () => cleanup.runScheduledCleanupPass("periodic"));
  assert.deepEqual(totals("2026-06-02"), { summary: 1, raw: 1 });
});

test("a retired dirty day does not block daily publication of later days", async () => {
  await write("2026-06-01");
  settings.updateDatabaseSettings({
    retention: { ...settings.getUserDatabaseSettings().retention, usageHistory: 1 },
  });
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.deepEqual(totals("2026-06-01"), { summary: 1, raw: 0 });
  configure();
  await write("2026-06-01");
  await write("2026-06-02");
  await at(NOW, () => cleanup.runScheduledCleanupPass("periodic"));
  assert.deepEqual(totals("2026-06-01"), { summary: 1, raw: 1 });
  assert.deepEqual(totals("2026-06-02"), { summary: 1, raw: 1 });
});

test("dirty revisions are never reused after publication, including reopen", async () => {
  const day = "2026-06-02";
  await write(day);
  const revision = () =>
    (
      core
        .getDbInstance()
        .prepare("SELECT revision r FROM rollup_dirty_day WHERE date=?")
        .get(day) as { r: number }
    ).r;
  const first = revision();
  await aggregate.publishDay(day);
  core.resetDbInstance();
  await write(day);
  assert.ok(revision() > first);
  await aggregate.publishDay(day);
  await write(day);
  assert.ok(revision() > first + 1);
});

test("timer callbacks drive the startup and periodic publication path", async () => {
  await write("2026-06-02");
  const timeout = globalThis.setTimeout,
    interval = globalThis.setInterval,
    clear = globalThis.clearInterval;
  let startup: (() => Promise<void>) | undefined;
  let periodic: (() => Promise<void>) | undefined;
  const fake = { unref() {} };
  globalThis.setTimeout = ((fn: () => Promise<void>, ms: number) => {
    assert.equal(ms, 30_000);
    startup = fn;
    return fake;
  }) as unknown as typeof setTimeout;
  globalThis.setInterval = ((fn: () => Promise<void>, ms: number) => {
    assert.equal(ms, 6 * 60 * 60 * 1000);
    periodic = fn;
    return fake;
  }) as unknown as typeof setInterval;
  globalThis.clearInterval = (() => {}) as typeof clearInterval;
  try {
    cleanup.startCleanupScheduler();
    cleanup.startCleanupScheduler();
  } finally {
    globalThis.setTimeout = timeout;
    globalThis.setInterval = interval;
    cleanup.stopCleanupScheduler();
    globalThis.clearInterval = clear;
  }
  assert.ok(startup);
  assert.ok(periodic);
  await at(NOW, startup);
  assert.equal(totals("2026-06-02").summary, 1);
  await write("2026-06-02");
  await at(NOW, periodic);
  assert.equal(totals("2026-06-02").summary, 2);
});

test("publication cannot accept an ABA revision after another publish and late write", async () => {
  const day = "2026-06-02";
  await write(day);
  const result = await aggregate.publishDay(day, {
    pause: async () => {
      await aggregate.publishDay(day);
      await write(day);
    },
  });
  assert.equal(result.reason, "stale");
  assert.deepEqual(totals(day), { summary: 1, raw: 2 });
  await aggregate.runDailyRollup(new Date(NOW));
  assert.deepEqual(totals(day), { summary: 2, raw: 2 });
});

test("coordination migration initializes its counter above legacy dirty revisions and is restart safe", async () => {
  const day = "2026-06-02";
  await write(day);
  const db = core.getDbInstance();
  db.exec(
    "UPDATE rollup_dirty_day SET revision=42; DROP TABLE rollup_revision_counter; ALTER TABLE rollup_state DROP COLUMN reading_token; ALTER TABLE rollup_state DROP COLUMN reading_expires_at; ALTER TABLE rollup_dirty_day DROP COLUMN published_revision;"
  );
  const sql = fs.readFileSync(
    new URL(
      "../../src/lib/db/migrations/227_usage_daily_publication_coordination.sql",
      import.meta.url
    ),
    "utf8"
  );
  assert.throws(() =>
    db.transaction(() => {
      db.exec(sql);
      throw new Error("rollback");
    })()
  );
  assert.equal(
    (
      db
        .prepare("SELECT COUNT(*) n FROM sqlite_master WHERE name='rollup_revision_counter'")
        .get() as { n: number }
    ).n,
    0
  );
  db.transaction(() => db.exec(sql))();
  core.resetDbInstance();
  await write(day);
  assert.equal(
    (
      core
        .getDbInstance()
        .prepare("SELECT revision r FROM rollup_dirty_day WHERE date=?")
        .get(day) as { r: number }
    ).r,
    43
  );
  assert.equal(
    (
      core
        .getDbInstance()
        .prepare("SELECT COUNT(*) n FROM _omniroute_migrations WHERE version=227")
        .get() as { n: number }
    ).n,
    1
  );
});

test("a clean-day snapshot cannot accept null ABA after a late write and publication", async () => {
  const day = "2026-06-02";
  await write(day);
  // Legacy rows may predate dirty tracking entirely.
  core.getDbInstance().prepare("DELETE FROM rollup_dirty_day WHERE date=?").run(day);
  const result = await aggregate.publishDay(day, {
    pause: async () => {
      await write(day);
      await aggregate.publishDay(day);
    },
  });
  assert.equal(result.reason, "stale");
  assert.deepEqual(totals(day), { summary: 2, raw: 2 });
  const version = core
    .getDbInstance()
    .prepare("SELECT revision,published_revision FROM rollup_dirty_day WHERE date=?")
    .get(day) as { revision: number; published_revision: number };
  assert.equal(version.revision, version.published_revision);
});

for (const period of ["all", "30d"]) {
  for (const alreadyPublished of [false, true]) {
    test(`${period} reset fences an in-flight ${alreadyPublished ? "published" : "unpublished"} day's pricing snapshot`, async () => {
      const day = "2026-01-01";
      await write(day);
      if (alreadyPublished) await aggregate.publishDay(day);
      await at(NOW, async () => {
        const result = await aggregate.publishDay(day, {
          pause: async () => {
            assert.equal((await cleanup.resetUsageHistory(period)).errors, 0);
          },
        });
        assert.equal(result.reason, "stale");
      });
      assert.deepEqual(totals(day), { summary: 0, raw: 0 });
      await write(day);
      assert.equal((await aggregate.publishDay(day)).published, true);
      assert.deepEqual(totals(day), { summary: 1, raw: 1 });
    });
  }
}

test("an empty reset still invalidates an earlier empty pricing snapshot", async () => {
  const result = await aggregate.publishDay("2026-01-01", {
    pause: async () => {
      assert.equal((await cleanup.resetUsageHistory("all")).errors, 0);
    },
  });
  assert.equal(result.reason, "stale");
});

test("legacy range publication also refuses a pricing snapshot invalidated by reset", async () => {
  const day = "2026-01-01";
  await write(day);
  const result = await aggregate.rollupUsageHistoryBeforeDate("2026-01-02", {
    pause: async () => {
      await cleanup.resetUsageHistory("all");
    },
  });
  assert.equal(result.errors, 1);
  assert.equal(result.inserted, 0);
  assert.deepEqual(totals(day), { summary: 0, raw: 0 });
  await write(day);
  assert.equal((await aggregate.rollupUsageHistoryBeforeDate("2026-01-02")).inserted, 1);
});

test("a failed reset rolls back both deletion and its generation fence", async () => {
  const day = "2026-01-01";
  await write(day);
  const db = core.getDbInstance();
  const generation = () =>
    (
      db
        .prepare("SELECT reset_generation n FROM rollup_revision_counter WHERE singleton=1")
        .get() as { n: number }
    ).n;
  const before = generation();
  db.exec(
    "CREATE TRIGGER fail_reset BEFORE DELETE ON usage_history BEGIN SELECT RAISE(ABORT,'reset failed'); END"
  );
  const result = await aggregate.publishDay(day, {
    pause: async () => {
      assert.equal((await cleanup.resetUsageHistory("all")).errors, 1);
    },
  });
  assert.equal(generation(), before);
  assert.equal(result.published, true);
  assert.deepEqual(totals(day), { summary: 1, raw: 1 });
});

test("partial-day reset removes morning usage but immediately retains afternoon analytics", async () => {
  const day = "2026-06-02";
  for (const time of ["08:00:00.000", "16:00:00.000"])
    await saveRequestUsage({
      provider: "openai",
      model: "gpt-test",
      success: true,
      tokens: { input: 10, output: 1 },
      timestamp: `${day}T${time}Z`,
    });
  await at("2026-06-03T12:00:00.000Z", async () => {
    await cleanup.runScheduledCleanupPass("startup");
    assert.equal(totals(day).summary, 2);
    assert.equal((await cleanup.resetUsageHistory("1d")).errors, 0);
    const { buildUnifiedSource, buildPresetUnifiedSource, readPublishedCutoffDate } =
      await import("../../src/lib/db/usageAnalytics/sources.ts");
    const db = core.getDbInstance();
    const source = buildUnifiedSource({
      sinceIso: null,
      untilIso: null,
      rawCutoffDate: readPublishedCutoffDate(db),
      apiKeyWhere: null,
      apiKeyParams: {},
    });
    assert.equal(
      (
        db
          .prepare(`SELECT SUM(requests) n FROM ${source.unifiedSource}`)
          .get(source.unifiedParams) as { n: number }
      ).n,
      1
    );
    assert.deepEqual(totals(day), { summary: 0, raw: 1 });
    const preset = buildPresetUnifiedSource({
      sinceIso: null,
      untilIso: null,
      rawCutoffDate: readPublishedCutoffDate(db),
      apiKeyWhere: null,
      apiKeyParams: {},
    });
    assert.equal(
      (
        db.prepare(`SELECT COUNT(*) n FROM ${preset.unifiedSource}`).get(preset.unifiedParams) as {
          n: number;
        }
      ).n,
      1
    );
    const { getUsageStats } = await import("../../src/lib/usage/usageStats.ts");
    assert.equal((await getUsageStats()).totalRequests, 1);
    await cleanup.runScheduledCleanupPass("periodic");
    assert.deepEqual(totals(day), { summary: 1, raw: 1 });
  });
});

test("a partial-day reset refuses an archived boundary without changing data or generation", async () => {
  const day = "2026-06-02";
  await write(day);
  await aggregate.publishDay(day);
  const db = core.getDbInstance();
  db.prepare("UPDATE usage_daily_summary SET raw_rebuild_safe=0 WHERE date=?").run(day);
  const before = db.prepare("SELECT reset_generation n FROM rollup_revision_counter").get() as {
    n: number;
  };
  await at("2026-06-03T12:00:00.000Z", async () => {
    await assert.rejects(() => cleanup.resetUsageHistory("1d"), {
      name: "UsageResetBoundaryError",
    });
  });
  assert.deepEqual(totals(day), { summary: 1, raw: 1 });
  assert.deepEqual(
    db.prepare("SELECT reset_generation n FROM rollup_revision_counter").get(),
    before
  );
});

test("archived partial reset maps to a safe HTTP conflict, and midnight remains permitted", async () => {
  const day = "2026-06-02";
  await write(day);
  await aggregate.publishDay(day);
  core
    .getDbInstance()
    .prepare("UPDATE usage_daily_summary SET raw_rebuild_safe=0 WHERE date=?")
    .run(day);
  const { POST } = await import("../../src/app/api/settings/purge-usage-history/route.ts");
  await at("2026-06-03T12:00:00.000Z", async () => {
    const response = await POST(
      new Request("http://localhost/api/settings/purge-usage-history", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ period: "1d" }),
      })
    );
    assert.equal(response.status, 409);
    assert.match(JSON.stringify(await response.json()), /No data was changed/);
    assert.deepEqual(totals(day), { summary: 1, raw: 1 });
  });
  await at(NOW, async () => {
    assert.equal((await cleanup.resetUsageHistory("1d")).errors, 0);
  });
  assert.deepEqual(totals(day), { summary: 1, raw: 1 });
});

test("successful reset invalidates cached usage responses immediately", async () => {
  const { serveAnalyticsCached, clearAnalyticsResponseCache } =
    await import("../../src/lib/usage/analyticsResponseCache.ts");
  clearAnalyticsResponseCache();
  const day = "2026-01-01";
  await write(day);
  const compute = async () => Response.json(totals(day));
  await serveAnalyticsCached("analytics:reset-regression", compute, {
    minComputeMs: 0,
    ttlMs: 60_000,
  });
  const hit = await serveAnalyticsCached("analytics:reset-regression", compute, {
    minComputeMs: 0,
    ttlMs: 60_000,
  });
  assert.equal(hit.headers.get("x-analytics-cache"), "hit");
  await cleanup.resetUsageHistory("all");
  const fresh = await serveAnalyticsCached("analytics:reset-regression", compute, {
    minComputeMs: 0,
    ttlMs: 60_000,
  });
  assert.equal(fresh.headers.get("x-analytics-cache"), "miss");
  assert.deepEqual(await fresh.json(), { summary: 0, raw: 0 });
  clearAnalyticsResponseCache();
});

test("missing-summary fallback keeps precise lower bounds in both analytics sources", async () => {
  const day = "2026-06-02";
  for (const time of ["08:00:00.000", "16:00:00.000"])
    await saveRequestUsage({
      provider: "openai",
      model: "gpt-test",
      success: true,
      tokens: { input: 10, output: 1 },
      timestamp: `${day}T${time}Z`,
    });
  const { buildUnifiedSource, buildPresetUnifiedSource } =
    await import("../../src/lib/db/usageAnalytics/sources.ts");
  const db = core.getDbInstance();
  for (const build of [buildUnifiedSource, buildPresetUnifiedSource]) {
    const source = build({
      sinceIso: `${day}T12:00:00.000Z`,
      untilIso: null,
      rawCutoffDate: day,
      apiKeyWhere: null,
      apiKeyParams: {},
    });
    assert.equal(
      (
        db.prepare(`SELECT COUNT(*) n FROM ${source.unifiedSource}`).get(source.unifiedParams) as {
          n: number;
        }
      ).n,
      1
    );
  }
});

test("pre-reset in-flight analytics cannot repopulate or replace the fresh cache entry", async () => {
  const { serveAnalyticsCached, clearAnalyticsResponseCache } =
    await import("../../src/lib/usage/analyticsResponseCache.ts");
  clearAnalyticsResponseCache();
  const day = "2026-01-01";
  await write(day);
  let start!: () => void, release!: () => void;
  const started = new Promise<void>((resolve) => {
    start = resolve;
  });
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  const key = "analytics:reset-inflight";
  const options = { minComputeMs: 0, ttlMs: 60_000 };
  const old = serveAnalyticsCached(
    key,
    async () => {
      const snapshot = totals(day);
      start();
      await held;
      return Response.json(snapshot);
    },
    options
  );
  await started;
  await cleanup.resetUsageHistory("all");
  const fresh = await serveAnalyticsCached(key, async () => Response.json(totals(day)), options);
  assert.deepEqual(await fresh.json(), { summary: 0, raw: 0 });
  release();
  await old;
  const cached = await serveAnalyticsCached(
    key,
    async () => {
      throw new Error("fresh result should remain cached");
    },
    options
  );
  assert.deepEqual(await cached.json(), { summary: 0, raw: 0 });
  clearAnalyticsResponseCache();
});

test("closed UTC publication includes offset timestamps stored on adjacent calendar dates", async () => {
  for (const timestamp of [
    "2026-06-02T12:00:00.000Z",
    "2026-06-01T12:30:00-14:00",
    "2026-06-03T12:30:00+14:00",
  ]) {
    await saveRequestUsage({
      provider: "openai",
      model: "gpt-test",
      success: true,
      tokens: { input: 10, output: 1 },
      timestamp,
    });
  }
  await at(NOW, () => cleanup.runScheduledCleanupPass("startup"));
  assert.deepEqual(totals("2026-06-02"), { summary: 3, raw: 3 });
  settings.updateDatabaseSettings({
    retention: { ...settings.getUserDatabaseSettings().retention, usageHistory: 1 },
  });
  await at("2026-06-05T00:00:00.000Z", () => cleanup.runScheduledCleanupPass("periodic"));
  assert.deepEqual(totals("2026-06-02"), { summary: 3, raw: 0 });
});
