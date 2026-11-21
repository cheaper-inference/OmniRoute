// The unified headers of a Claude 429 must reach getCachedClaudeQuotaScopeDecision at the call
// sites that hold them. Without them a Fable-only rejection with a cold usage cache parks the
// whole account (see claude-fable-429-header-scope.test.ts for the decision itself).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-claude-fable-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "claude-fable-wiring-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const readCacheDb = await import("../../src/lib/db/readCache.ts");
const callLogsDb = await import("../../src/lib/usage/callLogs.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { maybeMarkChatAccountExhaustedFrom429 } =
  await import("../../src/sse/services/chatQuotaExhaustion.ts");
const { applyComboTargetExhaustion } =
  await import("../../open-sse/services/combo/targetExhaustion.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");

const FABLE = "claude-fable-5-1";
const OPUS = "claude-opus-5-5";
const EXPLICIT_QUOTA_ERROR =
  "This request would exceed your account's rate limit. Please try again later.";
const P = "anthropic-ratelimit-unified-";
const FABLE_ONLY = {
  [`${P}status`]: "rejected",
  [`${P}7d-status`]: "allowed",
  [`${P}representative-claim`]: "seven_day_overage",
};

const originalFetch = globalThis.fetch;
const originalRetryDelayMs = BaseExecutor.RETRY_CONFIG.delayMs;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  clearInflight();
  resetAllCircuitBreakers();
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  readCacheDb.invalidateDbCache();
  invalidateMemorySettingsCache();
  await callLogsDb.waitForCallLogSaves(10_000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  initTranslators();
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.after(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

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

function stubFable429() {
  globalThis.fetch = async () =>
    Response.json(
      { type: "error", error: { type: "rate_limit_error", message: EXPLICIT_QUOTA_ERROR } },
      { status: 429, headers: FABLE_ONLY }
    );
}

async function assertOnlyFableLocked(connectionId: string) {
  const updated = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(fallback.isModelLocked("claude", connectionId, FABLE), true);
  assert.equal(fallback.isModelLocked("claude", connectionId, OPUS), false);
}

test("combo exhaustion reads the 429 headers: overage-only rejection stays model scoped", () => {
  const derived = applyComboTargetExhaustion(
    {
      kind: "model",
      executionKey: "ek",
      modelStr: `claude/${FABLE}`,
      provider: "claude",
      providerId: null,
      connectionId: "cold-conn",
    } as Parameters<typeof applyComboTargetExhaustion>[0],
    {
      result: { status: 429, headers: new Headers(FABLE_ONLY) },
      fallbackResult: {},
      errorText: EXPLICIT_QUOTA_ERROR,
      rawModel: FABLE,
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      requestScopedFailure: false,
      sets: {
        exhaustedProviders: new Set<string>(),
        exhaustedConnections: new Set<string>(),
        transientRateLimitedProviders: new Set<string>(),
      },
      log: { info() {}, warn() {}, error() {}, debug() {} },
      tag: "COMBO",
      exhaustedLogLevel: "info",
    }
  );
  assert.equal(derived.isModelScopedClaudeQuota, true);
  assert.equal(derived.isConnectionScopedClaudeQuota, false);
});

test("chat quota-exhaustion mark reads the 429 headers and leaves the account usable", async () => {
  const input = {
    connectionId: "cold-conn",
    provider: "claude",
    model: FABLE,
    status: 429,
    errorText: EXPLICIT_QUOTA_ERROR,
    failureKind: "quota_exhausted" as const,
    passthroughModels: undefined,
  };
  await maybeMarkChatAccountExhaustedFrom429({ ...input, headers: new Headers(FABLE_ONLY) });
  assert.equal(quotaCache.isAccountQuotaExhausted("cold-conn"), false);
  // Control: the same 429 without the headers is an account-wide wall.
  await maybeMarkChatAccountExhaustedFrom429(input);
  assert.equal(quotaCache.isAccountQuotaExhausted("cold-conn"), true);
});

test("markAccountUnavailable reads the 429 headers: only Fable is locked", async () => {
  const connection = await seedClaudeConnection("fable-wiring-auth");
  await auth.markAccountUnavailable(
    connection.id,
    429,
    EXPLICIT_QUOTA_ERROR,
    "claude",
    FABLE,
    null,
    { headers: new Headers(FABLE_ONLY) }
  );
  await assertOnlyFableLocked(connection.id);
});

test("handleChatCore passes the 429 headers on: only Fable is locked", async () => {
  const connection = await seedClaudeConnection("fable-wiring-core");
  stubFable429();
  const result = await handleChatCore({
    body: { model: FABLE, stream: false, messages: [{ role: "user", content: "quota" }] },
    modelInfo: { provider: "claude", model: FABLE },
    credentials: { ...connection, connectionId: connection.id },
    connectionId: connection.id,
    log: { debug() {}, info() {}, warn() {}, error() {} },
    skipUpstreamRetry: true,
  });
  assert.equal(result.status, 429);
  await assertOnlyFableLocked(connection.id);
});
