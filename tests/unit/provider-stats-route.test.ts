/**
 * #3175 — /api/provider-stats serves its payload through the shared analytics
 * response cache and reports the start of its stats window.
 *
 * Gates:
 *   - "cached": the second call is served from the cache with no SQL prepared
 *   - "bounded": the payload carries `windowSince` (ISO start of the window)
 *   - "window": `?days=` changes the lookback, bounded by that cap
 *   - "orphaned provider": excluded from the response (EXISTS guard)
 *   - "keyless provider": kept in the response (no connection row)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-provider-stats-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS = "60000";
process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/lib/usage/analyticsResponseCache.ts");
const stats = await import("../../src/lib/db/providerStats.ts");
const { NOAUTH_PROVIDERS, AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { GET } = await import("../../src/app/api/provider-stats/route.ts");

let prepareCalls = 0;

interface ProviderStatsBody {
  providers: Array<Record<string, unknown>>;
  windowSince: string;
}

const keylessProvider = Object.keys(NOAUTH_PROVIDERS)[0];
const keylessDisplayName =
  (AI_PROVIDERS as Record<string, { name?: string }>)[keylessProvider]?.name ?? keylessProvider;

function seed() {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?, ?, ?, ?)`
  ).run("route-conn", "openai", now, now);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, model, status, duration, tokens_in, tokens_out)
     VALUES (?, ?, 'openai', 'openai/gpt-4.1', 200, 100, 10, 20),
             (?, ?, 'openai', 'openai/gpt-4.1', 500, 300, 5, 0),
             (?, ?, 'ghost-provider', 'ghost/model', 200, 50, 1, 2),
             (?, ?, ?, 'free-model', 200, 40, 1, 1)`
  ).run("rlog-1", now, "rlog-2", now, "rlog-3", now, "rlog-4", now, keylessProvider);
}

test.before(() => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const realPrepare = db.prepare.bind(db);
  db.prepare = (...args: unknown[]) => {
    prepareCalls += 1;
    return realPrepare(...(args as []));
  };
  seed();
});

test.beforeEach(() => {
  cache.clearAnalyticsResponseCache();
  prepareCalls = 0;
});

test.after(() => {
  core.resetDbInstance();
  delete process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS;
  delete process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function getBody(query = "") {
  const res = await GET(new Request(`http://localhost/api/provider-stats${query}`));
  return { res, body: (await res.json()) as ProviderStatsBody };
}

function windowStartDaysAgo(body: ProviderStatsBody): number {
  return (Date.now() - new Date(body.windowSince).getTime()) / (24 * 60 * 60 * 1000);
}

test("first call computes and bounds the window, orphaned provider excluded", async () => {
  const { res, body } = await getBody();
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-analytics-cache"), "miss");

  const providers = body.providers;
  assert.deepEqual(
    providers.map((p) => p.provider),
    ["OpenAI", keylessDisplayName]
  );
  assert.equal(providers[0].totalRequests, 2);
  assert.equal(providers[0].successfulRequests, 1);
  assert.ok(
    !JSON.stringify(body).includes("ghost-provider"),
    "orphaned provider must not appear in the payload"
  );

  assert.ok(typeof body.windowSince === "string", "windowSince is in the payload");
  assert.match(body.windowSince, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  const start = new Date(body.windowSince).getTime();
  const expected = Date.now() - 7 * 24 * 60 * 60 * 1000;
  assert.ok(
    Math.abs(start - expected) < 5 * 60 * 1000,
    `windowSince ${body.windowSince} is ~7 days before now`
  );
});

test("second call is served from the cache with no SQL prepared", async () => {
  await getBody();
  assert.equal(prepareCalls > 0, true, "first call prepared statements");
  const firstCalls = prepareCalls;

  const { res, body } = await getBody();
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-analytics-cache"), "hit");
  assert.equal(prepareCalls, firstCalls, "no SQL prepared on the cached call");
  assert.ok(typeof body.windowSince === "string", "cached payload keeps windowSince");
  assert.equal(body.providers.length, 2);
});

test("?days= changes the lookback and keeps its own cache entry", async () => {
  const wide = await getBody("?days=30");
  assert.equal(wide.res.headers.get("x-analytics-cache"), "miss");
  assert.ok(
    Math.abs(windowStartDaysAgo(wide.body) - 30) < 0.01,
    `?days=30 starts the window 30 days back, got ${wide.body.windowSince}`
  );

  // A different window is a different payload, never the cached 30-day one.
  const narrow = await getBody("?days=1");
  assert.equal(narrow.res.headers.get("x-analytics-cache"), "miss");
  assert.ok(
    Math.abs(windowStartDaysAgo(narrow.body) - 1) < 0.01,
    `?days=1 starts the window 1 day back, got ${narrow.body.windowSince}`
  );

  const wideAgain = await getBody("?days=30");
  assert.equal(wideAgain.res.headers.get("x-analytics-cache"), "hit");
  assert.ok(
    Math.abs(windowStartDaysAgo(wideAgain.body) - 30) < 0.01,
    "the cached 30-day payload keeps its own window"
  );
});

test("invalid or out-of-range ?days= falls back to a bounded default", async () => {
  for (const [query, days] of [
    ["?days=abc", 7],
    ["?days=0", 7],
    ["?days=-5", 7],
    ["?days=99999", 365],
  ] as const) {
    const { body } = await getBody(query);
    assert.ok(
      Math.abs(windowStartDaysAgo(body) - days) < 0.01,
      `${query} starts the window ${days} days back, got ${body.windowSince}`
    );
  }
});

test("the helper derives the window start from an explicit now", () => {
  const now = new Date("2026-10-19T00:00:00.000Z");
  const since = stats.buildProviderStatsSince(now);
  assert.equal(since, new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString());
});
