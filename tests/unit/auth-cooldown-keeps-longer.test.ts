import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-cooldown-max-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-cooldown-max-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");

const FIVE_HOURS_S = 5 * 60 * 60;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/** A connection that a shorter transient failure already cooled for `shortMs`. */
async function seedCooled(shortMs: number) {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "cooled",
    apiKey: "sk-cooled",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await providersDb.updateProviderConnection(created.id, {
    rateLimitedUntil: new Date(Date.now() + shortMs).toISOString(),
    backoffLevel: 1,
    testStatus: "unavailable",
  });
  return created.id as string;
}

const HOUR_MS = 60 * 60 * 1000;
const CLAUDE_QUOTA_ERROR =
  "This request would exceed your account's rate limit. Please try again later.";
// OAuth providers ignore retry hints by default; these cases are about what a hint may extend.
const claudeHintProfile = { ...fallback.getProviderProfile("claude"), useUpstreamRetryHints: true };

/** A Claude OAuth connection already cooled for `shortMs`, with fresh usage telemetry cached. */
async function seedCooledClaude(shortMs: number, sessionUsed: number, sessionResetMs: number) {
  const created = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "cooled-claude",
    accessToken: "cooled-claude-access",
    refreshToken: "cooled-claude-refresh",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await providersDb.updateProviderConnection(created.id, {
    rateLimitedUntil: new Date(Date.now() + shortMs).toISOString(),
    backoffLevel: 1,
    testStatus: "unavailable",
  });
  const now = Date.now();
  const usage = normalizeClaudeUsageQuotas({
    five_hour: {
      utilization: sessionUsed,
      resets_at: new Date(now + sessionResetMs).toISOString(),
    },
    seven_day: { utilization: 56, resets_at: new Date(now + 7 * HOUR_MS).toISOString() },
  });
  quotaCache.setQuotaCache(created.id, "claude", usage.quotas, usage.modelQuotas);
  return created.id as string;
}

const remainingMs = async (id: string) => {
  const row = await providersDb.getProviderConnectionById(id);
  return new Date(row.rateLimitedUntil).getTime() - Date.now();
};

test.beforeEach(resetStorage);
test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a 429 with a long upstream reset replaces a shorter active cooldown", async () => {
  // One minute, not seconds: the existing cooldown must still be active when the 429 lands.
  const id = await seedCooled(60_000);

  const result = await auth.markAccountUnavailable(
    id,
    429,
    "rate limit exceeded",
    "openai",
    "gpt-4o",
    null,
    { headers: new Headers({ "retry-after": String(FIVE_HOURS_S) }) }
  );

  assert.ok(result.cooldownMs > 4 * 60 * 60 * 1000, `returned cooldown ${result.cooldownMs}`);
  assert.ok((await remainingMs(id)) > 4 * 60 * 60 * 1000, "stored cooldown grew to the 5 h reset");
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row.backoffLevel, 1, "growing the cooldown does not bump the backoff level");
});

test("a shorter transient failure never shrinks a longer active cooldown", async () => {
  const id = await seedCooled(2 * 60 * 60 * 1000);

  await auth.markAccountUnavailable(id, 429, "rate limit exceeded", "openai", "gpt-4o", null, {
    headers: new Headers({ "retry-after": "10" }),
  });
  await auth.markAccountUnavailable(id, 500, "boom", "openai", "gpt-4o");

  assert.ok((await remainingMs(id)) > 90 * 60 * 1000, "the 2 h cooldown is kept");
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row.backoffLevel, 1);
});

test("a transient failure does not extend an active cooldown", async () => {
  const id = await seedCooled(1_000);

  await auth.markAccountUnavailable(id, 500, "boom", "openai", "gpt-4o");

  assert.ok((await remainingMs(id)) <= 1_000, "no upstream reset hint, so the window is unchanged");
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row.backoffLevel, 1, "no double backoff increment");
});

test("a model-scoped Claude quota 429 does not extend the connection cooldown", async () => {
  // Fresh telemetry proves account-wide headroom, so the 429 is about this one model only.
  const id = await seedCooledClaude(60_000, 2, 3 * HOUR_MS);

  await auth.markAccountUnavailable(
    id,
    429,
    CLAUDE_QUOTA_ERROR,
    "claude",
    "claude-fable-5-1",
    claudeHintProfile,
    { headers: new Headers({ "retry-after": String(FIVE_HOURS_S) }) }
  );

  const remaining = await remainingMs(id);
  assert.ok(
    remaining > 0 && remaining <= 60_000,
    `sibling models keep the connection (${remaining})`
  );
});

test("a cached connection-wide Claude reset outranks a longer retry hint", async () => {
  // The 5 h session window is exhausted and resets in 2 h; the 429 hints 5 h.
  const id = await seedCooledClaude(60_000, 100, 2 * HOUR_MS);

  const result = await auth.markAccountUnavailable(
    id,
    429,
    CLAUDE_QUOTA_ERROR,
    "claude",
    "claude-opus-5-5",
    claudeHintProfile,
    { headers: new Headers({ "retry-after": String(FIVE_HOURS_S) }) }
  );

  const remaining = await remainingMs(id);
  assert.ok(remaining > 1.5 * HOUR_MS && remaining <= 2 * HOUR_MS, `stored ${remaining}`);
  assert.ok(result.cooldownMs <= 2 * HOUR_MS, `returned cooldown ${result.cooldownMs}`);
});
