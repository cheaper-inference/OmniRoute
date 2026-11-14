import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-priority-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oauth-priority-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const oauthOccupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: (overrides.authType as "apikey" | "oauth") || "oauth",
    name: (overrides.name as string) || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    email: overrides.email as string | undefined,
    apiKey: (overrides.apiKey as string) || `sk-test-${Math.random().toString(16).slice(2, 10)}`,
    accessToken: (overrides.accessToken as string) || "test-access-token",
    refreshToken: (overrides.refreshToken as string) || "test-refresh-token",
    isActive: (overrides.isActive as boolean | undefined) ?? true,
    testStatus: (overrides.testStatus as string) || "active",
    priority: overrides.priority as number | undefined,
    rateLimitedUntil: overrides.rateLimitedUntil as string | undefined,
  });
}

test.beforeEach(async () => {
  oauthOccupancy._clearOAuthSessionOccupancyForTest();
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("OAuth session spreading does not leak to lower priority account under fill-first (#19262)", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "fill-first",
    sessionAffinityTtlMs: 0,
  });

  const maxConn = await seedConnection("claude", {
    name: "claude-max-flatrate",
    priority: 1,
  });
  const paidConn = await seedConnection("claude", {
    name: "claude-paid-pertoken",
    priority: 2,
  });

  // Verify priorities are strictly ordered
  assert.equal(maxConn.priority, 1);
  assert.equal(paidConn.priority, 2);

  // 1. Idle maxConn -> selects maxConn
  const creds1 = await auth.getProviderCredentials("claude", null, null, "claude-sonnet", {
    sessionKey: "session-client-1",
    reserveOAuthSession: true,
  });
  assert.equal(creds1.connectionId, maxConn.id);
  creds1.releaseOAuthSession?.();

  // 2. maxConn has in-flight foreign session -> under fill-first, still selects maxConn (NOT paidConn)
  const releaseForeign = oauthOccupancy.reserveOAuthSession(
    maxConn.id,
    "session-foreign-worker",
    60_000
  );
  try {
    const creds2 = await auth.getProviderCredentials("claude", null, null, "claude-sonnet", {
      sessionKey: "session-client-2",
      reserveOAuthSession: true,
    });
    // Under fill-first, lower-priority paid account must NOT be chosen just because maxConn is busy
    assert.equal(creds2.connectionId, maxConn.id);
    creds2.releaseOAuthSession?.();
  } finally {
    releaseForeign();
  }

  // 3. When maxConn is actually rate-limited -> falls back to paidConn
  await providersDb.updateProviderConnection(maxConn.id, {
    rateLimitedUntil: futureIso(30_000),
  });

  const creds3 = await auth.getProviderCredentials("claude", null, null, "claude-sonnet", {
    sessionKey: "session-client-3",
    reserveOAuthSession: true,
  });
  assert.equal(creds3.connectionId, paidConn.id);
  creds3.releaseOAuthSession?.();
});

test("OAuth session spreading spreads across accounts under round-robin", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "round-robin",
    sessionAffinityTtlMs: 0,
  });

  const connA = await seedConnection("claude", {
    name: "claude-sub-a",
    priority: 1,
  });
  const connB = await seedConnection("claude", {
    name: "claude-sub-b",
    priority: 2,
  });

  // Reserve session on connA
  const releaseA = oauthOccupancy.reserveOAuthSession(connA.id, "session-occupying-a", 60_000);
  try {
    // Under round-robin, session spreading can route to connB to balance occupancy
    const creds = await auth.getProviderCredentials("claude", null, null, "claude-sonnet", {
      sessionKey: "session-client-spread",
      reserveOAuthSession: true,
    });
    assert.equal(creds.connectionId, connB.id);
    creds.releaseOAuthSession?.();
  } finally {
    releaseA();
  }
});
