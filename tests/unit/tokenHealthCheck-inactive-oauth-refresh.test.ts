import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-inactive-oauth-refresh-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");

const ANTHROPIC_TOKEN_URL = "https://api.anthropic.com/v1/oauth/token";

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // ignore cleanup errors
  }
});

test("refreshes OAuth credentials for inactive connections while preserving isActive: false", async () => {
  await resetStorage();
  const originalFetch = globalThis.fetch;
  let refreshAttempts = 0;

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    if (url === ANTHROPIC_TOKEN_URL) {
      refreshAttempts += 1;
      return new Response(
        JSON.stringify({
          access_token: "new_claude_access_token_789",
          refresh_token: "new_claude_refresh_token_012",
          expires_in: 3600,
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return originalFetch(
      input as Parameters<typeof originalFetch>[0],
      init as Parameters<typeof originalFetch>[1]
    );
  }) as typeof fetch;

  try {
    const expiredIso = new Date(Date.now() - 3600 * 1000).toISOString();
    const created = await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: "quota-resting-claude-account",
      email: "resting@example.com",
      accessToken: "old_claude_access_token",
      refreshToken: "valid_claude_refresh_token",
      expiresAt: expiredIso,
      tokenExpiresAt: expiredIso,
      isActive: false, // Inactive due to quota exhaustion / manual pause
      testStatus: "unavailable",
      healthCheckInterval: 60,
    });

    assert.ok(created);
    const connectionId = created.id;

    await tokenHealthCheck.checkConnection({
      ...created,
      lastHealthCheckAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    });

    assert.equal(refreshAttempts, 1, "OAuth token endpoint must be called to keep credentials fresh");

    const updated = await providersDb.getProviderConnectionById(connectionId);
    assert.equal(
      updated?.accessToken,
      "new_claude_access_token_789",
      "access token must be refreshed in DB"
    );
    assert.equal(
      updated?.refreshToken,
      "new_claude_refresh_token_012",
      "rotated refresh token must be persisted in DB"
    );
    assert.equal(
      updated?.isActive,
      false,
      "connection must remain inactive (routing eligibility is untouched)"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("skips permanently banned connections even if authType is oauth", async () => {
  await resetStorage();
  const originalFetch = globalThis.fetch;
  let refreshAttempts = 0;

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    if (url === ANTHROPIC_TOKEN_URL) {
      refreshAttempts += 1;
    }
    return originalFetch(
      input as Parameters<typeof originalFetch>[0],
      init as Parameters<typeof originalFetch>[1]
    );
  }) as typeof fetch;

  try {
    const expiredIso = new Date(Date.now() - 3600 * 1000).toISOString();
    const created = await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: "banned-claude-account",
      accessToken: "banned_access_token",
      refreshToken: "banned_refresh_token",
      expiresAt: expiredIso,
      tokenExpiresAt: expiredIso,
      isActive: false,
      testStatus: "banned",
      healthCheckInterval: 60,
    });

    assert.ok(created);
    await tokenHealthCheck.checkConnection({
      ...created,
      lastHealthCheckAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    });

    assert.equal(refreshAttempts, 0, "permanently banned connection must not be refreshed");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
