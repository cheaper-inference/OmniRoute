import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cursor-model-usage-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const providerLimitsDb = await import("../../src/lib/db/providerLimits.ts");
const { toProviderLimitsCacheEntry } = await import("../../src/lib/usage/providerLimitsCache.ts");

const MODEL_USAGE = [
  {
    model: "composer-2.5",
    inputTokens: 4861279,
    outputTokens: 726233,
    cacheReadTokens: 87013884,
    cacheWriteTokens: 0,
    costUsd: 21.6769,
  },
];

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("provider-limits cache entry carries Cursor per-model usage", () => {
  const entry = toProviderLimitsCacheEntry(
    {
      plan: "Cursor Pro",
      quotas: { API: { remainingPercentage: 90 } },
      modelUsage: MODEL_USAGE,
    },
    "manual"
  );
  assert.deepEqual(entry.modelUsage, MODEL_USAGE);
});

test("provider-limits cache entry omits modelUsage when the fetcher had none", () => {
  const entry = toProviderLimitsCacheEntry(
    { plan: "Cursor Pro", quotas: { API: { remainingPercentage: 90 } } },
    "manual"
  );
  assert.equal(entry.modelUsage, undefined);
  const bogus = toProviderLimitsCacheEntry(
    { plan: "Cursor Pro", quotas: {}, modelUsage: "not-an-array" },
    "manual"
  );
  assert.equal(bogus.modelUsage, undefined);
});

test("provider-limits cache round-trips Cursor per-model usage through the DB", () => {
  providerLimitsDb.setProviderLimitsCache(
    "cursor-conn",
    toProviderLimitsCacheEntry(
      { plan: "Cursor Pro", quotas: { API: { remainingPercentage: 90 } }, modelUsage: MODEL_USAGE },
      "manual",
      "2026-10-27T00:00:00.000Z"
    )
  );
  assert.deepEqual(providerLimitsDb.getProviderLimitsCache("cursor-conn")?.modelUsage, MODEL_USAGE);
  assert.deepEqual(
    providerLimitsDb.getAllProviderLimitsCache()["cursor-conn"]?.modelUsage,
    MODEL_USAGE
  );

  providerLimitsDb.setProviderLimitsCache(
    "cursor-plain",
    toProviderLimitsCacheEntry(
      { plan: "Cursor Pro", quotas: { API: { remainingPercentage: 90 } } },
      "manual",
      "2026-10-27T00:00:00.000Z"
    )
  );
  const plain = providerLimitsDb.getProviderLimitsCache("cursor-plain");
  assert.ok(plain);
  assert.ok(!("modelUsage" in plain!));
});
