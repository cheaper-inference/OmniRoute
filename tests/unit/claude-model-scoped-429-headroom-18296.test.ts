// #18296 — a Claude explicit-quota 429 on one model (Fable weekly allotment) must not take the
// whole OAuth connection out of routing when fresh usage telemetry proves the account-wide
// windows still have headroom but the upstream reports no per-model (`weekly_scoped`) window.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-18296-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "claude-18296-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { maybeMarkChatAccountExhaustedFrom429 } =
  await import("../../src/sse/services/chatQuotaExhaustion.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");

const FABLE = "claude-fable-5-1";
const OPUS = "claude-opus-5-5";
const EXPLICIT_QUOTA_ERROR =
  "This request would exceed your account's rate limit. Please try again later.";

// Shape observed in production (#18296): only the 5h session and the all-models weekly window,
// both with headroom; no per-model weekly window is reported for Fable.
function productionUsage(now: number, sessionUsed = 2, weeklyUsed = 56) {
  return normalizeClaudeUsageQuotas({
    five_hour: {
      utilization: sessionUsed,
      resets_at: new Date(now + 3.7 * 3_600_000).toISOString(),
    },
    seven_day: { utilization: weeklyUsed, resets_at: new Date(now + 7 * 3_600_000).toISOString() },
  });
}

function seedUsage(connectionId: string, usage = productionUsage(Date.now())) {
  quotaCache.setQuotaCache(connectionId, "claude", usage.quotas, usage.modelQuotas);
}

async function seedClaudeConnection(name: string) {
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

async function flushWrites() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test.beforeEach(async () => {
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#18296 fresh account-wide headroom scopes an explicit Claude quota 429 to the model", () => {
  const connectionId = "claude-18296-decision";
  const now = Date.now();
  seedUsage(connectionId, productionUsage(now));
  const decide = (overrides: Partial<{ errorText: string; nowMs: number; status: number }> = {}) =>
    quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: FABLE,
      nowMs: now,
      ...overrides,
    });

  assert.deepEqual(decide(), {
    scope: "model",
    evidence: "headroom",
    resetAt: null,
    cooldownMs: null,
  });
  // Stale telemetry is not proof of headroom.
  assert.equal(decide({ nowMs: now + 6 * 60_000 }).scope, "connection");
  assert.equal(decide({ errorText: "TPM rate limit exceeded" }).scope, "connection");
  assert.equal(decide({ status: 503 }).scope, "connection");
});

test("#18296 headroom scoping requires proof for every account-wide window", () => {
  const now = Date.now();
  const cases: Array<[string, ReturnType<typeof productionUsage>]> = [
    ["session exhausted", productionUsage(now, 100, 56)],
    ["weekly exhausted", productionUsage(now, 2, 100)],
    [
      "weekly missing",
      normalizeClaudeUsageQuotas({
        five_hour: { utilization: 2, resets_at: new Date(now + 3_600_000).toISOString() },
      }),
    ],
    [
      "session missing",
      normalizeClaudeUsageQuotas({
        seven_day: { utilization: 56, resets_at: new Date(now + 3_600_000).toISOString() },
      }),
    ],
    ["no telemetry", { quotas: {}, modelQuotas: {} }],
  ];
  for (const [label, usage] of cases) {
    const connectionId = `claude-18296-${label.replace(/\s+/g, "-")}`;
    seedUsage(connectionId, usage);
    const decision = quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: FABLE,
      nowMs: now,
    });
    assert.equal(decision.scope, "connection", label);
  }

  // Unreported fractions are not headroom evidence.
  const unreportedId = "claude-18296-unreported";
  const usage = productionUsage(now);
  for (const quota of Object.values(usage.quotas)) quota.fractionReported = false;
  seedUsage(unreportedId, usage);
  assert.equal(
    quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId: unreportedId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: FABLE,
      nowMs: now,
    }).scope,
    "connection"
  );
});

test("#18296 Fable 429 with account headroom locks only Fable; Opus keeps routing", async () => {
  const connection = await seedClaudeConnection("claude-18296-e2e");
  seedUsage(connection.id);

  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    EXPLICIT_QUOTA_ERROR,
    "claude",
    FABLE
  );
  await maybeMarkChatAccountExhaustedFrom429({
    connectionId: connection.id,
    provider: "claude",
    model: FABLE,
    status: 429,
    errorText: EXPLICIT_QUOTA_ERROR,
    failureKind: "quota_exhausted",
    passthroughModels: undefined,
  });
  await flushWrites();

  const updated = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0, "Fable must be locked for a positive window");
  assert.ok(result.cooldownMs <= 60 * 60_000, "lock must stay bounded without an upstream reset");
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(quotaCache.isAccountQuotaExhausted(connection.id), false);
  assert.equal(fallback.isModelLocked("claude", connection.id, FABLE), true);
  assert.equal(fallback.isModelLocked("claude", connection.id, OPUS), false);

  const fableSelection = await auth.getProviderCredentials("claude", null, null, FABLE);
  const opusSelection = await auth.getProviderCredentials("claude", null, null, OPUS);
  assert.equal(fableSelection.allRateLimited, true);
  assert.equal(fableSelection.cooldownScope, "model");
  assert.equal(opusSelection.connectionId, connection.id);
});

test("#18296 an upstream Retry-After hint sets the model lock (within maxCooldownMs)", async () => {
  const connection = await seedClaudeConnection("claude-18296-retry-after");
  seedUsage(connection.id);
  const retryAfterSeconds = 600;

  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    EXPLICIT_QUOTA_ERROR,
    "claude",
    FABLE,
    { ...fallback.getProviderProfile("claude"), useUpstreamRetryHints: true },
    { headers: { "retry-after": String(retryAfterSeconds) } }
  );
  await flushWrites();
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.ok(Math.abs(result.cooldownMs - retryAfterSeconds * 1000) < 5_000, `${result.cooldownMs}`);
  assert.equal(updated.testStatus, "active");
  assert.equal(fallback.isModelLocked("claude", connection.id, FABLE), true);
  assert.equal(fallback.isModelLocked("claude", connection.id, OPUS), false);
});

test("#18296 without headroom proof the same 429 stays connection-wide", async () => {
  const connection = await seedClaudeConnection("claude-18296-no-proof");
  seedUsage(connection.id, productionUsage(Date.now(), 100, 56));

  await auth.markAccountUnavailable(connection.id, 429, EXPLICIT_QUOTA_ERROR, "claude", FABLE);
  await flushWrites();
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(updated.testStatus, "unavailable");
  assert.ok(updated.rateLimitedUntil);
  assert.equal(fallback.isModelLocked("claude", connection.id, FABLE), false);
});
