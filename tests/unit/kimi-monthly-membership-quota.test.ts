import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-monthly-membership-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { getKimiUsage } = await import("../../open-sse/services/usage/kimi.ts");
const { toProviderLimitsCacheEntry } = await import("../../src/lib/usage/providerLimitsCache.ts");
const { convertUsageToQuotaInfo } = await import("../../open-sse/services/genericQuotaFetcher.ts");
const { parseQuotaData } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts");
const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function usage(payload: unknown) {
  globalThis.fetch = async () => new Response(JSON.stringify(payload));
  return getKimiUsage(undefined, "fixture-api-key");
}

const monthlyReset = "2099-11-25T00:00:00Z";
const weeklyReset = "2099-10-31T00:00:00Z";

// Shape captured from a Coding API-key response; no account data or credentials.
const mixedPayload = {
  limits: [
    {
      window: { duration: 300, timeUnit: "TIME_UNIT_MINUTE" },
      detail: { limit: "100", remaining: "100" },
    },
  ],
  usages: {
    limit_5h: { used_ratio: 0.0013 },
    limit_month_total: { used_ratio: 0.0001, reset_time: monthlyReset },
    limit_month_code: { used_ratio: 0.0001, reset_time: monthlyReset },
  },
};

test("monthly membership survives cache and existing UI parsing without a phantom weekly row", async () => {
  const result = await usage(mixedPayload);
  assert.deepEqual(Object.keys(result.quotas ?? {}).sort(), ["code_5h", "monthly"]);
  assert.equal(result.quotas?.code_5h.used, 0.13);
  assert.deepEqual(result.quotas?.monthly, {
    used: 0.01,
    total: 100,
    remaining: 99.99,
    remainingPercentage: 99.99,
    resetAt: "2099-11-25T00:00:00.000Z",
    unlimited: false,
    displayName: "Monthly",
    isPercentageOnly: true,
  });
  const cached = JSON.parse(JSON.stringify(toProviderLimitsCacheEntry(result, "test")));
  for (const provider of ["kimi-coding", "kimi-coding-apikey", "moonshot"]) {
    const rows = parseQuotaData(provider, cached);
    assert.deepEqual(
      rows.map((row) => row.name),
      ["code_5h", "monthly"]
    );
    assert.equal(rows[1].isPercentageOnly, true);
    assert.equal(rows[1].displayName, "Monthly");
    assert.equal(rows[1].resetAt, "2099-11-25T00:00:00.000Z");
  }
});

for (const [ratio, used] of [
  [0, 0],
  [1, 100],
  [0.25, 25],
  ["0.5", 50],
  [1.2, 100],
] as const) {
  test(`monthly used_ratio ${ratio} is a percentage, including empty and exhausted quotas`, async () => {
    const result = await usage({
      usages: {
        limit_month_total: { used_ratio: ratio, reset_time: monthlyReset },
        limit_month_code: { used_ratio: 1 },
      },
    });
    assert.deepEqual(Object.keys(result.quotas ?? {}), ["monthly"]);
    assert.equal(result.quotas?.monthly.used, used);
    assert.equal(result.quotas?.monthly.remainingPercentage, 100 - used);
    const quota = convertUsageToQuotaInfo(result, { provider: "kimi-coding-apikey" });
    assert.equal(quota?.limitReached, used === 100);
    assert.equal(quota?.percentUsed, used / 100);
    assert.deepEqual(Object.keys(quota?.windows ?? {}), ["monthly"]);
    assert.equal(quota?.windows?.monthly.resetAt, "2099-11-25T00:00:00.000Z");
  });
}

test("weekly and monthly windows retain their own usage and reset dates", async () => {
  const result = await usage({
    ...mixedPayload,
    usages: {
      ...mixedPayload.usages,
      limit_7d: { used_ratio: 0.4, reset_time: weeklyReset },
    },
  });
  assert.deepEqual(Object.keys(result.quotas ?? {}).sort(), ["code_5h", "code_7d", "monthly"]);
  assert.equal(result.quotas?.code_7d.used, 40);
  assert.equal(result.quotas?.code_7d.resetAt, "2099-10-31T00:00:00.000Z");
  assert.equal(result.quotas?.monthly.used, 0.01);
  assert.equal(result.quotas?.monthly.resetAt, "2099-11-25T00:00:00.000Z");
});

test("legacy count-based weekly quota stays weekly without inventing a month", async () => {
  const result = await usage({
    usage: {
      limit: "100",
      used: "30",
      remaining: "70",
      resetTime: weeklyReset,
    },
  });
  assert.deepEqual(Object.keys(result.quotas ?? {}), ["code_7d"]);
  assert.equal(result.quotas?.code_7d.used, 30);
});

for (const invalid of [
  undefined,
  null,
  {},
  { used_ratio: null },
  { used_ratio: "" },
  { used_ratio: false },
  { used_ratio: "bad" },
  { used_ratio: -1 },
  { used_ratio: "Infinity" },
]) {
  test(`invalid monthly total cannot turn the Coding breakdown into a quota: ${JSON.stringify(invalid)}`, async () => {
    const result = await usage({
      usages: {
        limit_5h: { used_ratio: 0.2 },
        limit_month_total: invalid,
        limit_month_code: { used_ratio: 1 },
      },
    });
    assert.deepEqual(Object.keys(result.quotas ?? {}), ["code_5h"]);
    assert.equal(result.quotas?.code_5h.used, 20);
  });
}
