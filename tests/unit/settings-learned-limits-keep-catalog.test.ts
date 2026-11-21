/**
 * Persisting learned rate limits (`learnedRateLimits`, written by the rate-limit manager after a
 * streaming success) must not bump the model catalog cache version: no catalog code reads that key.
 * Catalog-relevant settings must still bump it, and the settings read cache must still be fresh.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-learned-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-learned-limits-keep-catalog-secret";

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("learnedRateLimits update keeps the model catalog cache version", async () => {
  const before = readCache.getModelCatalogCacheVersion();
  await settings.updateSettings({ learnedRateLimits: JSON.stringify({ openai: { limit: 5 } }) });
  assert.equal(readCache.getModelCatalogCacheVersion(), before);
});

test("learnedRateLimits update still refreshes the settings read cache", async () => {
  await settings.getSettings();
  await settings.updateSettings({ learnedRateLimits: JSON.stringify({ openai: { limit: 9 } }) });
  const read = (await settings.getSettings()) as Record<string, unknown>;
  assert.equal(read.learnedRateLimits, JSON.stringify({ openai: { limit: 9 } }));
});

test("catalog-relevant settings still bump the model catalog cache version", async () => {
  for (const updates of [
    { blockedProviders: ["glm"] },
    { hidePaidModels: true },
    { learnedRateLimits: "{}", blockedProviders: ["glm", "kimi"] },
  ]) {
    const before = readCache.getModelCatalogCacheVersion();
    await settings.updateSettings(updates);
    assert.ok(
      readCache.getModelCatalogCacheVersion() > before,
      `${Object.keys(updates).join("+")} must invalidate the catalog`
    );
  }
});
