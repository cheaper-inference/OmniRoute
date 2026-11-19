import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "truthful-cache-"));
process.env.DATA_DIR = dir;
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getCacheMetrics, getCacheTrend } =
  await import("../../src/lib/db/settings/cacheMetrics.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
test("cache metrics and trend retain unknown, zero, and mixed completeness", async () => {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT INTO usage_history(provider, model, combo_strategy, tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, timestamp) VALUES (?, 'fixture', ?, 100, 2, ?, ?, ?)"
  );
  const now = Date.now();
  const stamp = (h: number) => new Date(now - h * 3600000).toISOString();
  insert.run("unknown", "unknown", null, null, stamp(0));
  insert.run("zero", "zero", 0, 0, stamp(1));
  insert.run("mixed", "mixed", null, null, stamp(2));
  insert.run("mixed", "mixed", 10, 0, stamp(2));
  db.prepare(
    "UPDATE usage_history SET usage_provenance = 'estimated' WHERE provider = 'mixed'"
  ).run();
  const metrics = await getCacheMetrics();
  assert.equal(metrics.estimated, true);
  assert.equal(metrics.totalCachedTokens, 10);
  assert.equal(metrics.totalCachedTokensComplete, false);
  assert.equal(metrics.totalCacheCreationTokens, 0);
  assert.equal(metrics.totalCacheCreationTokensComplete, false);
  for (const groups of [metrics.byProvider, metrics.byStrategy]) {
    assert.equal(groups.unknown.cachedTokens, null);
    assert.equal(groups.unknown.cacheCreationTokens, null);
    assert.equal(groups.unknown.cachedTokensComplete, false);
    assert.equal(groups.zero.cachedTokens, 0);
    assert.equal(groups.zero.cacheCreationTokensComplete, true);
    assert.equal(groups.mixed.estimated, true);
    assert.equal(groups.mixed.cachedTokens, 10);
    assert.equal(groups.mixed.cacheCreationTokens, 0);
    assert.equal(groups.mixed.cachedTokensComplete, false);
    assert.equal(groups.mixed.cacheCreationTokensComplete, false);
  }
  const trend = await getCacheTrend(4);
  assert.equal(trend.length, 3);
  assert.equal(trend[0].estimated, true);
  assert.equal(trend[0].cachedTokens, 10);
  assert.equal(trend[0].cacheCreationTokensComplete, false);
  assert.equal(trend[1].cacheCreationTokens, 0);
  assert.equal(trend[1].cachedTokensComplete, true);
  assert.equal(trend[2].cachedTokens, null);
  assert.equal(trend[2].cacheCreationTokens, null);
  db.prepare("DELETE FROM usage_history WHERE provider != 'unknown'").run();
  const unknown = await getCacheMetrics();
  assert.equal(unknown.totalCachedTokens, null);
  assert.equal(unknown.totalCacheCreationTokens, null);
  assert.equal(unknown.tokensSaved, null);
  assert.equal(unknown.estimatedCostSaved, null);
});

test("null and explicit direct strategies aggregate under one output key", async () => {
  const db = getDbInstance();
  db.prepare("DELETE FROM usage_history").run();
  const insert = db.prepare(
    "INSERT INTO usage_history(provider,model,combo_strategy,tokens_input,tokens_cache_read,tokens_cache_creation,timestamp) VALUES ('synthetic','fixture',?,100,?,?,?)"
  );
  insert.run(null, 12, 0, new Date().toISOString());
  insert.run("direct", 0, null, new Date().toISOString());
  const { byStrategy } = await getCacheMetrics();
  assert.equal(byStrategy.direct.requests, 2);
  assert.equal(byStrategy.direct.cachedTokens, 12);
  assert.equal(byStrategy.direct.cachedTokensComplete, true);
  assert.equal(byStrategy.direct.cacheCreationTokensComplete, false);
});
