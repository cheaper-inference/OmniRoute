import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ollama-routing-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/domain/quotaCache.ts");
test.after(() => {
  cache.stopBackgroundRefresh();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
const quotas = (remaining: unknown, verified = true, currency = "USD") => ({
  monthly: { remainingPercentage: 0, ollamaApiBalance: true },
  credits: { remaining, currency, ollamaApiBalance: verified },
});

test("paid Ollama credits keep account headroom unknown across restart and transitions", () => {
  cache.setQuotaCache("paid", "ollama-cloud", quotas(5));
  for (const restart of [false, true]) {
    if (restart) cache.__clearForTests();
    assert.equal(cache.isQuotaExhaustedForRequest("paid", "ollama-cloud"), false);
    assert.equal(cache.getQuotaWeightedRemainingPercent("paid"), null);
    assert.equal(cache.getQuotaWindowStatus("paid", "monthly")?.reachedThreshold, false);
  }
  cache.setQuotaCache("paid", "ollama-cloud", quotas(0));
  cache.__clearForTests();
  assert.equal(cache.isQuotaExhaustedForRequest("paid", "ollama-cloud"), true);
  cache.setQuotaCache("paid", "ollama-cloud", quotas(5));
  cache.__clearForTests();
  assert.equal(cache.isQuotaExhaustedForRequest("paid", "ollama-cloud"), false);
});

test("zero, malformed, unverified and other-provider credits never bypass an included cap", () => {
  for (const [index, [provider, amount, verified]] of [
    ["ollama-cloud", 0, true],
    ["ollama-cloud", -1, true],
    ["ollama-cloud", "5", true],
    ["ollama-cloud", NaN, true],
    ["ollama-cloud", Infinity, true],
    ["ollama-cloud", null, true],
    ["ollama-cloud", 5, false],
    ["openai", 5, true],
  ].entries()) {
    const id = `invalid-${index}`;
    cache.setQuotaCache(id, String(provider), quotas(amount, verified === true));
    assert.equal(cache.isAccountQuotaExhausted(id), true);
    cache.__clearForTests();
    assert.equal(cache.isAccountQuotaExhausted(id), true);
  }
});

test("a real upstream 429 remains authoritative over paid balance telemetry", () => {
  cache.markAccountExhaustedFrom429("real-429", "ollama-cloud");
  const fetchedAt = cache.getQuotaCache("real-429")?.fetchedAt;
  cache.setQuotaCache("real-429", "ollama-cloud", quotas(5));
  assert.equal(cache.isQuotaExhaustedForRequest("real-429", "ollama-cloud"), true);
  assert.equal(cache.getQuotaCache("real-429")?.fetchedAt, fetchedAt);
});

test("unknown currency cannot turn purchased telemetry into routing permission", () => {
  cache.setQuotaCache("wrong-currency", "ollama-cloud", quotas(5, true, "EUR"));
  assert.equal(cache.isQuotaExhaustedForRequest("wrong-currency", "ollama-cloud"), true);
  cache.__clearForTests();
  assert.equal(cache.isQuotaExhaustedForRequest("wrong-currency", "ollama-cloud"), true);
});
