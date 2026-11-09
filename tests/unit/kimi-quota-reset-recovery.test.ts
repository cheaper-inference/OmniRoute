import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-quota-reset-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-kimi-quota-reset-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Kimi billing-cycle quota errors remain active and recover at the cached reset", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.UTC(2026, 9, 25, 12) });
  await settingsDb.updateSettings({ autoDisableBannedAccounts: true });

  const connection = await providersDb.createProviderConnection({
    provider: "kimi-coding",
    authType: "oauth",
    accessToken: "kimi-access-token",
    refreshToken: "kimi-refresh-token",
    isActive: true,
    testStatus: "active",
  });
  const connectionId = (connection as { id: string }).id;
  const resetAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  quotaCache.setQuotaCache(connectionId, "kimi-coding", {
    Ratelimit: { remainingPercentage: 0, resetAt },
    Weekly: {
      remainingPercentage: 62,
      resetAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });

  const result = await auth.markAccountUnavailable(
    connectionId,
    403,
    "You've reached your usage limit for this billing cycle. Your quota will be refreshed in the next cycle.",
    "kimi-coding",
    "kimi-for-coding"
  );
  const after = await providersDb.getProviderConnectionById(connectionId);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 30 * 60 * 1000);
  assert.equal(after.isActive, true);
  assert.equal(after.testStatus, "unavailable");
  assert.equal(after.lastErrorType, "quota_exhausted");
  assert.equal(new Date(after.rateLimitedUntil).getTime(), new Date(resetAt).getTime());
});
