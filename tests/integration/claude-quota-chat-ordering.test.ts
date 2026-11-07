import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-quota-chat-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "claude-quota-chat-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const readCacheDb = await import("../../src/lib/db/readCache.ts");
const callLogsDb = await import("../../src/lib/usage/callLogs.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
const originalRetryDelayMs = BaseExecutor.RETRY_CONFIG.delayMs;
const EXPLICIT_QUOTA_ERROR =
  "This request would exceed your account's rate limit. Please try again later.";

async function resetStorage() {
  globalThis.fetch = originalFetch;
  clearInflight();
  resetAllCircuitBreakers();
  accountFallback.clearAllModelLockouts();
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

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  await resetStorage();
});

test.after(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("chat preserves an unresolved Claude scoped reset through account fallback", async () => {
  const scenario = "unresolved-scoped";
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `claude-${scenario}-chat-ordering`,
    apiKey: `sk-claude-${scenario}`,
    accessToken: `claude-${scenario}-access-token`,
    refreshToken: `claude-${scenario}-refresh-token`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  const resetAt = new Date(Date.now() + 10 * 60_000).toISOString();
  quotaCache.setQuotaCache(
    connection.id,
    "claude",
    {},
    {
      [scenario]: {
        remainingPercentage: 42,
        resetAt,
        claudeQuota: {
          kind: "weekly_scoped",
          active: true,
          severity: "critical",
          scopeKey: "model:unknown",
          modelId: null,
          modelDisplayName: null,
        },
      },
    }
  );

  globalThis.fetch = async () =>
    Response.json(
      {
        type: "error",
        error: { type: "rate_limit_error", message: EXPLICIT_QUOTA_ERROR },
      },
      { status: 429 }
    );

  const response = await handleChat(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude/claude-fable-5-1",
        stream: false,
        messages: [{ role: "user", content: "Trigger a quota fallback" }],
      }),
    })
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(response.status, 429);
  assert.equal(updated.rateLimitedUntil, resetAt);
  assert.equal(updated.testStatus, "unavailable");
});

async function runNormalizedQuota429(
  scenario: string,
  model: string,
  payload: Record<string, unknown>
) {
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `claude-${scenario}-chat-ordering`,
    apiKey: `sk-claude-${scenario}`,
    accessToken: `claude-${scenario}-access-token`,
    refreshToken: `claude-${scenario}-refresh-token`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas(payload);
  quotaCache.setQuotaCache(connection.id, "claude", quotas, modelQuotas);

  globalThis.fetch = async () =>
    Response.json(
      {
        type: "error",
        error: { type: "rate_limit_error", message: EXPLICIT_QUOTA_ERROR },
      },
      { status: 429 }
    );

  const response = await handleChat(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [{ role: "user", content: `Trigger ${scenario}` }],
      }),
    })
  );
  return {
    connection,
    response,
    updated: await providersDb.getProviderConnectionById(connection.id),
  };
}

for (const { label, scope } of [
  { label: "model-less", scope: null },
  { label: "non-tokenizable", scope: { model: { displayName: "???" } } },
]) {
  for (const activeFirst of [true, false]) {
    const order = activeFirst ? "first" : "last";
    const scenario = `${label}-active-${order}`;
    test(`chat preserves the active reset when the ${label} scope is ${order}`, async () => {
      const activeReset = new Date(Date.now() + 10 * 60_000).toISOString();
      const inactiveReset = new Date(Date.now() + 20 * 60_000).toISOString();
      const active = {
        kind: "weekly_scoped",
        percent: 100,
        resetsAt: activeReset,
        isActive: true,
        severity: "critical",
        scope,
      };
      const inactive = {
        kind: "weekly_scoped",
        percent: 20,
        resetsAt: inactiveReset,
        isActive: false,
        severity: "normal",
        scope,
      };
      const { connection, response, updated } = await runNormalizedQuota429(
        scenario,
        "claude/claude-fable-5-1",
        { limits: activeFirst ? [active, inactive] : [inactive, active] }
      );

      assert.equal(response.status, 429);
      assert.equal(updated.rateLimitedUntil, activeReset);
      assert.equal(updated.testStatus, "unavailable");
      assert.equal(
        accountFallback.isModelLocked("claude", connection.id, "claude-fable-5-1"),
        false
      );
    });
  }
}

test("chat treats a display-only Claude Opus 4 scope as unresolved for Opus 4.5", async () => {
  const resetAt = new Date(Date.now() + 10 * 60_000).toISOString();
  const requestedModel = "claude-opus-4-5";
  const { connection, response, updated } = await runNormalizedQuota429(
    "display-only-opus-4",
    `claude/${requestedModel}`,
    {
      limits: [
        {
          kind: "weekly_scoped",
          percent: 100,
          resetsAt: resetAt,
          isActive: true,
          severity: "critical",
          scope: { model: { displayName: "Claude Opus 4" } },
        },
      ],
    }
  );

  assert.equal(response.status, 429);
  assert.equal(updated.rateLimitedUntil, resetAt);
  assert.equal(updated.testStatus, "unavailable");
  assert.equal(accountFallback.isModelLocked("claude", connection.id, requestedModel), false);
});

test("chat keeps a surface-labeled Claude scope connection-scoped", async () => {
  const resetAt = new Date(Date.now() + 10 * 60_000).toISOString();
  const requestedModel = "claude-fable-5-1";
  const { connection, response, updated } = await runNormalizedQuota429(
    "surface-labeled",
    `claude/${requestedModel}`,
    {
      limits: [
        {
          kind: "weekly_scoped",
          percent: 100,
          resetsAt: resetAt,
          isActive: true,
          severity: "critical",
          scope: { model: null, surface: { display_name: "surface-a" } },
        },
      ],
    }
  );

  assert.equal(response.status, 429);
  assert.equal(updated.rateLimitedUntil, resetAt);
  assert.equal(updated.testStatus, "unavailable");
  assert.equal(accountFallback.isModelLocked("claude", connection.id, requestedModel), false);
});

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const directCoreScenarios: Array<{
  label: string;
  message: string;
  terminal: boolean;
  initialStatus?: string;
  modelScoped?: boolean;
  activeCooldown?: boolean;
}> = [
  { label: "renewing quota", message: EXPLICIT_QUOTA_ERROR, terminal: false },
  {
    label: "depleted credits",
    message: "Your credit balance is too low. Please purchase credits.",
    terminal: true,
  },
  {
    label: "monthly billing cap",
    message: "Your monthly spend limit has been reached",
    terminal: true,
  },
  ...["banned", "expired", "deactivated", "credits_exhausted"].map((initialStatus) => ({
    label: `existing ${initialStatus} status`,
    message: EXPLICIT_QUOTA_ERROR,
    terminal: false,
    initialStatus,
  })),
  {
    label: "model quota scoped",
    message: EXPLICIT_QUOTA_ERROR,
    terminal: false,
    modelScoped: true,
  },
  {
    label: "active cooldown unchanged",
    message: EXPLICIT_QUOTA_ERROR,
    terminal: false,
    activeCooldown: true,
  },
];

for (const {
  label,
  message,
  terminal,
  initialStatus = "active",
  modelScoped = false,
  activeCooldown = false,
} of directCoreScenarios) {
  test(`direct core keeps ${label} in its correct recovery class`, async () => {
    const connection = await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: `direct-${label}`,
      accessToken: "test-claude-core-token",
      isActive: true,
      testStatus: initialStatus,
    });
    const previousCooldown = new Date(Date.now() + 60 * 60_000).toISOString();
    if (activeCooldown) {
      await providersDb.updateProviderConnection(connection.id, {
        testStatus: "unavailable",
        rateLimitedUntil: previousCooldown,
        lastError: "Earlier concurrent request",
      });
    }
    const resetAt = new Date(Date.now() + 10 * 60_000).toISOString();
    quotaCache.setQuotaCache(
      connection.id,
      "claude",
      {},
      {
        unresolved: {
          remainingPercentage: 0,
          resetAt,
          claudeQuota: {
            kind: "weekly_scoped",
            active: true,
            severity: "critical",
            scopeKey: modelScoped ? "model:fable" : "model:unknown",
            modelId: modelScoped ? "claude-fable-5-1" : null,
            modelDisplayName: null,
          },
        },
      }
    );
    globalThis.fetch = async () =>
      Response.json(
        {
          type: "error",
          error: { type: "rate_limit_error", message },
        },
        { status: 429 }
      );
    const result = await handleChatCore({
      body: {
        model: "claude-fable-5-1",
        stream: false,
        messages: [{ role: "user", content: "quota" }],
      },
      modelInfo: { provider: "claude", model: "claude-fable-5-1" },
      credentials: { ...connection, connectionId: connection.id },
      connectionId: connection.id,
      log: { debug() {}, info() {}, warn() {}, error() {} },
      skipUpstreamRetry: true,
    });
    assert.equal(result.status, 429);
    const updated = await providersDb.getProviderConnectionById(connection.id);
    if (initialStatus !== "active") {
      assert.equal(updated.testStatus, initialStatus);
      assert.equal(updated.rateLimitedUntil, undefined);
      assert.equal(
        accountFallback.isModelLocked("claude", connection.id, "claude-fable-5-1"),
        false
      );
    } else if (modelScoped) {
      assert.equal(updated.testStatus, "active");
      assert.equal(updated.rateLimitedUntil, undefined);
      assert.equal(
        accountFallback.isModelLocked("claude", connection.id, "claude-fable-5-1"),
        true
      );
      assert.equal(
        accountFallback.isModelLocked("claude", connection.id, "claude-sonnet-4-5"),
        false
      );
    } else if (activeCooldown) {
      assert.equal(updated.rateLimitedUntil, previousCooldown);
      assert.equal(updated.lastError, "Earlier concurrent request");
    } else {
      assert.equal(updated.testStatus, terminal ? "credits_exhausted" : "unavailable");
      if (!terminal) assert.equal(updated.rateLimitedUntil, resetAt);
    }
  });
}
