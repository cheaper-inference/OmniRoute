// #18664: one Claude account is quota-exhausted for days, the only healthy account
// has a short model lockout after an upstream 502. The request was reported as
// "All claude accounts have exhausted their quota" with the exhausted account's
// multi-day reset, so clients gave up instead of retrying a few seconds later.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18664-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "omniroute-18664-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");

const MODEL = "claude-opus-5-5";

async function seedClaude(name: string) {
  return providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name,
    accessToken: `${name}-access`,
    refreshToken: `${name}-refresh`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function exhaustWeekly(connectionId: string, resetAt: string) {
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
    limits: [
      {
        kind: "weekly_all",
        percent: 100,
        resets_at: resetAt,
        is_active: true,
        severity: "critical",
      },
    ],
  });
  quotaCache.setQuotaCache(connectionId, "claude", quotas, modelQuotas);
}

test.beforeEach(() => {
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a short model lockout on the healthy account is reported as a model cooldown, not quota exhaustion", async () => {
  const exhausted = await seedClaude("claude-18664-exhausted");
  const healthy = await seedClaude("claude-18664-healthy");
  const weeklyReset = new Date(Date.now() + 60 * 60 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);
  fallback.lockModel("claude", healthy.id, MODEL, "unknown", 5_000);

  const result = await auth.getProviderCredentials("claude", null, null, MODEL);

  assert.equal(result.allRateLimited, true);
  assert.equal(result.cooldownScope, "model");
  assert.equal(result.cooldownModel, MODEL);
  assert.equal(result.lastErrorCode, 429);
  assert.equal(String(result.lastError ?? "").includes("exhausted their quota"), false);
  const retryMs = new Date(result.retryAfter).getTime() - Date.now();
  assert.ok(
    retryMs > 0 && retryMs <= 5_000,
    `retryAfter should be the lockout end, got ${retryMs}ms`
  );
});

test("quota exhaustion is still reported when every lockout outlasts the earliest quota reset", async () => {
  const exhausted = await seedClaude("claude-18664-exhausted-soon");
  const healthy = await seedClaude("claude-18664-long-lock");
  const weeklyReset = new Date(Date.now() + 10 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);
  fallback.lockModel("claude", healthy.id, MODEL, "unknown", 60 * 60_000);

  const result = await auth.getProviderCredentials("claude", null, null, MODEL);

  assert.equal(result.allRateLimited, true);
  assert.equal(result.retryAfter, weeklyReset);
  assert.equal(String(result.lastError).includes("exhausted their quota"), true);
});

test("a short lockout on the account excluded by the fallback loop is reported as a model cooldown", async () => {
  // The fallback loop records a short lockout on the healthy account, then retries with
  // that account excluded. It is filtered as "excluded", not "modelLocked", yet its
  // lockout is what blocks the request, not the other account's quota reset.
  const exhausted = await seedClaude("claude-18664-exhausted-excl");
  const healthy = await seedClaude("claude-18664-healthy-excl");
  const weeklyReset = new Date(Date.now() + 60 * 60 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);
  fallback.lockModel("claude", healthy.id, MODEL, "server_error", 5_000);

  const result = await auth.getProviderCredentials("claude", healthy.id, null, MODEL);

  assert.equal(result.allRateLimited, true);
  assert.equal(result.cooldownScope, "model");
  assert.equal(String(result.lastError ?? "").includes("exhausted their quota"), false);
  const retryMs = new Date(result.retryAfter).getTime() - Date.now();
  assert.ok(
    retryMs > 0 && retryMs <= 5_000,
    `retryAfter should be the excluded account's lockout end, got ${retryMs}ms`
  );
});

test("an excluded account without a lockout does not shorten the quota-exhaustion reset", async () => {
  const exhausted = await seedClaude("claude-18664-exhausted-nolock");
  const tried = await seedClaude("claude-18664-tried-nolock");
  const weeklyReset = new Date(Date.now() + 10 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);

  const result = await auth.getProviderCredentials("claude", tried.id, null, MODEL);

  assert.equal(result.allRateLimited, true);
  assert.equal(result.retryAfter, weeklyReset);
  assert.equal(String(result.lastError).includes("exhausted their quota"), true);
});

test("an excluded account whose own quota is exhausted cannot shorten the quota-exhaustion reset", async () => {
  // The excluded account's short lockout ends before the other account's reset, but its
  // own quota for the model is exhausted too: once the lockout ends it still cannot serve.
  const exhausted = await seedClaude("claude-18664-exhausted-both");
  const tried = await seedClaude("claude-18664-tried-exhausted");
  const weeklyReset = new Date(Date.now() + 60 * 60 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);
  exhaustWeekly(tried.id, new Date(Date.now() + 30 * 60 * 60_000).toISOString());
  fallback.lockModel("claude", tried.id, MODEL, "server_error", 5_000);

  const result = await auth.getProviderCredentials("claude", tried.id, null, MODEL);

  assert.equal(result.allRateLimited, true);
  assert.notEqual(result.cooldownScope, "model");
  assert.equal(result.retryAfter, weeklyReset);
  assert.equal(String(result.lastError).includes("exhausted their quota"), true);
});

test("an account in fallback exclusion set with short retryable model lockout reports model cooldown (#20083)", async () => {
  const exhausted = await seedClaude("claude-20083-exhausted");
  const healthy = await seedClaude("claude-20083-healthy");
  const weeklyReset = new Date(Date.now() + 60 * 60 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);
  fallback.lockModel("claude", healthy.id, MODEL, "unknown", 5_000);

  // During the fallback retry the account that just failed is passed in excludeConnectionIds.
  const result = await auth.getProviderCredentials("claude", null, null, MODEL, {
    excludeConnectionIds: [healthy.id],
  });

  assert.equal(result.allRateLimited, true);
  assert.equal(result.cooldownScope, "model");
  assert.equal(result.cooldownModel, MODEL);
  assert.equal(result.lastErrorCode, 429);
  assert.equal(String(result.lastError ?? "").includes("exhausted their quota"), false);
  const retryMs = new Date(result.retryAfter).getTime() - Date.now();
  assert.ok(
    retryMs > 0 && retryMs <= 5_000,
    `retryAfter should be the lockout end, got ${retryMs}ms`
  );
});

test("an excluded account still in an account cooldown is not reported as a short model cooldown (#20083)", async () => {
  const exhausted = await seedClaude("claude-20083-exhausted-cooldown");
  const cooling = await seedClaude("claude-20083-account-cooldown");
  const weeklyReset = new Date(Date.now() + 60 * 60 * 60_000).toISOString();
  exhaustWeekly(exhausted.id, weeklyReset);
  fallback.lockModel("claude", cooling.id, MODEL, "unknown", 5_000);
  // The account itself is cooling down for an hour: it cannot serve when the lockout ends.
  await providersDb.updateProviderConnection(cooling.id, {
    rateLimitedUntil: new Date(Date.now() + 60 * 60_000).toISOString(),
  });

  const result = await auth.getProviderCredentials("claude", null, null, MODEL, {
    excludeConnectionIds: [cooling.id],
  });

  assert.equal(result.allRateLimited, true);
  assert.notEqual(result.cooldownScope, "model");
  assert.equal(result.retryAfter, weeklyReset);
  assert.equal(String(result.lastError).includes("exhausted their quota"), true);
});
