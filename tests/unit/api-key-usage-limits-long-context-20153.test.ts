import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-api-key-long-context-20153-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "usage-limit-test-secret-20153";

const core = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("@/lib/db/settings");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const NOW = Date.parse("2026-06-19T20:00:00.000Z");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("per-key USD limit does not apply long-context tier to summed window tokens (#20153)", async () => {
  // Model with a long_context tier above 100K tokens
  await updatePricing({
    anthropic: {
      "claude-haiku-5-5": {
        input: 1,
        output: 5,
        long_context: {
          threshold: 100_000,
          input: 5,
          output: 25,
        },
      },
    },
  });

  const created = await apiKeysDb.createApiKey("Haiku Limited Key", "machine-20153");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 0.5, // 50 cents limit
  });
  apiKeysDb.clearApiKeyCaches();

  // Send 20 requests of 6,000 prompt tokens each (sum = 120,000 prompt tokens across the day,
  // but each individual request is only 6,000 tokens — well below the 100,000 long-context threshold).
  for (let i = 0; i < 20; i++) {
    await usageHistory.saveRequestUsage({
      apiKeyId: created.id,
      apiKeyName: "Haiku Limited Key",
      provider: "anthropic",
      model: "claude-haiku-5-5",
      success: true,
      tokens: {
        input: 6_000,
        output: 100,
      },
      timestamp: new Date(NOW - i * 60_000).toISOString(),
    });
  }

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata);

  const status = await usageLimits.getApiKeyUsageLimitStatus(metadata, {
    now: () => NOW,
  });
  assert.ok(status);
  assert.equal(status.enabled, true);

  // Expected spend at standard flat rates:
  // 120,000 prompt tokens * $1.00 / 1M = $0.12
  // 2,000 completion tokens * $5.00 / 1M = $0.01
  // Total = $0.13.
  //
  // Prior to fix, 120,000 summed tokens crossed threshold 100,000, applying the 5x long-context tier:
  // (120,000 * $5.00 + 2,000 * $25.00) / 1M = $0.65, which exceeded the $0.50 daily limit.
  const expectedSpend = (120_000 * 1 + 2_000 * 5) / 1_000_000;
  assert.ok(
    Math.abs(status.dailySpentUsd - expectedSpend) < 0.001,
    `Expected daily spend ~${expectedSpend} but got ${status.dailySpentUsd}`
  );
  assert.equal(status.dailyExceeded, false);
});
