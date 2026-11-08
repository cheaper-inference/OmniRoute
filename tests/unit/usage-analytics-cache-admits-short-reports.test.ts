import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-analytics-short-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Default tuning on purpose: this test is about the shipped admission threshold.
delete process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS;
delete process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS;

const cache = await import("../../src/lib/usage/analyticsResponseCache.ts");

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function slowCompute(ms: number, counter: { calls: number }) {
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return jsonResponse({ n: ++counter.calls });
  };
}

test.beforeEach(() => {
  cache.clearAnalyticsResponseCache();
});

test.after(() => {
  cache.clearAnalyticsResponseCache();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a report that takes 150 ms is served from the cache on the second read", async () => {
  const counter = { calls: 0 };
  const compute = slowCompute(150, counter);

  const first = await cache.serveAnalyticsCached("?range=7d", compute);
  assert.equal(first.headers.get("x-analytics-cache"), "miss");

  const second = await cache.serveAnalyticsCached("?range=7d", compute);
  assert.equal(second.headers.get("x-analytics-cache"), "hit", "a sub-second report must be kept");
  assert.deepEqual(await second.json(), { n: 1 });
  assert.equal(counter.calls, 1);
});

test("a report that builds in a few milliseconds is still read live", async () => {
  const counter = { calls: 0 };
  const compute = slowCompute(0, counter);

  await cache.serveAnalyticsCached("?range=7d", compute);
  const second = await cache.serveAnalyticsCached("?range=7d", compute);
  assert.equal(second.headers.get("x-analytics-cache"), "miss", "small instances stay fresh");
  assert.deepEqual(await second.json(), { n: 2 });
});

test("the default admission threshold is 100 ms", () => {
  assert.equal(cache.getAnalyticsCacheMinComputeMs(), 100);
  assert.equal(cache.getAnalyticsCacheTtlMs(), 60_000);
});
