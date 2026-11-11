/**
 * GET /api/usage/analytics needs four row sets that share one grain: day x provider x model x
 * service tier (daily cost, model usage, provider cost, service-tier usage). Each used to run
 * its own grouped scan of the same unified source. One scan now feeds all four.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-analytics-grain-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-analytics-grain-secret";

const core = await import("../../src/lib/db/core.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");
const analyticsCache = await import("../../src/lib/usage/analyticsResponseCache.ts");

function seed() {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, tokens_cache_read, success, latency_ms, timestamp, service_tier)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const day = (offset: number) => new Date(Date.now() - offset * 86_400_000).toISOString();
  const tiers = ["standard", "priority", "flex", ""];
  for (let i = 0; i < 24; i++) {
    insert.run(
      i % 2 === 0 ? "openai" : "anthropic",
      i % 3 === 0 ? "gpt-4o" : "claude-sonnet",
      `conn-${i % 3}`,
      100 + i,
      50 + i,
      i % 5,
      i % 7 === 0 ? 0 : 1,
      200 + i * 10,
      day(i % 4),
      tiers[i % 4]
    );
  }
  db.prepare(
    `INSERT INTO daily_usage_summary (date, provider, model, total_input_tokens, total_output_tokens, total_requests, total_cost)
     VALUES ('2024-01-01', 'openai', 'gpt-4o', 1000, 2000, 7, 0.5)`
  ).run();
}

function countGrainScans(run: () => Promise<unknown>): Promise<number> {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const original = db.prepare;
  let scans = 0;
  db.prepare = function (this: unknown, sql: string) {
    const text = String(sql);
    // The four shared-grain queries read the unified source and group by day, provider, model and
    // tier only. The API-key query groups by one more column and reads usage_history directly.
    if (
      /FROM\s+\(/.test(text) &&
      /GROUP BY DATE\(timestamp\)/.test(text) &&
      /LOWER\(provider\)/.test(text) &&
      /LOWER\(model\)/.test(text) &&
      /serviceTier/.test(text) &&
      !/api_key/.test(text.slice(text.indexOf("GROUP BY")))
    ) {
      scans++;
    }
    return original.call(this, sql);
  };
  return run()
    .then(() => scans)
    .finally(() => {
      db.prepare = original;
    });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  analyticsCache.clearAnalyticsResponseCache();
  seed();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const get = () =>
  analyticsRoute.GET(
    new Request("http://localhost/api/usage/analytics?range=all", { method: "GET" })
  );

test("one analytics request runs the day x provider x model x tier scan once", async () => {
  const scans = await countGrainScans(async () => {
    const response = await get();
    assert.equal(response.status, 200);
    await response.json();
  });
  assert.equal(scans, 1);
});

test("the four views still agree with each other and with the summary", async () => {
  const body = await (await get()).json();
  const tierRequests = body.byServiceTier.reduce(
    (sum: number, t: { requests: number }) => sum + t.requests,
    0
  );
  const modelRequests = body.byModel.reduce(
    (sum: number, m: { requests: number }) => sum + m.requests,
    0
  );
  const dailyCost = body.dailyTrend.reduce((sum: number, d: { cost: number }) => sum + d.cost, 0);
  const providerCost = body.byProvider.reduce(
    (sum: number, p: { cost: number }) => sum + (p.cost || 0),
    0
  );
  assert.equal(body.summary.totalRequests, 24 + 7);
  assert.equal(tierRequests, body.summary.totalRequests);
  assert.equal(modelRequests, body.summary.totalRequests);
  assert.ok(Math.abs(dailyCost - body.summary.totalCost) < 1e-6);
  assert.ok(Math.abs(providerCost - body.summary.totalCost) < 1e-6);
  assert.deepEqual(
    body.byServiceTier.map((t: { serviceTier: string }) => t.serviceTier),
    ["priority", "flex", "standard"]
  );
});

test("the answer does not change between a cold and a repeated build", async () => {
  const first = await (await get()).json();
  analyticsCache.clearAnalyticsResponseCache();
  const second = await (await get()).json();
  assert.deepEqual(second, first);
});
