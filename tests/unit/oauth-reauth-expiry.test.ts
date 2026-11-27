import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "oauth-reauth-expiry-"));
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const persistence = await import("../../src/lib/oauth/connectionPersistence.ts");
const { checkConnection } = await import("../../src/lib/tokenHealthCheck.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(process.env.DATA_DIR!, { recursive: true, force: true });
});

test("reauth replaces stale expiry and survives the next health check without refreshing", async () => {
  const staleExpiry = new Date(Date.now() - 3600_000).toISOString();
  const connection = await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: false,
    testStatus: "expired",
    accessToken: "old-access",
    refreshToken: null,
    expiresAt: staleExpiry,
    tokenExpiresAt: staleExpiry,
    lastError: "Refresh token consumed",
    lastErrorType: "unrecoverable_refresh_error",
    lastErrorSource: "oauth",
    errorCode: "unrecoverable_refresh_error",
  });
  await db.updateProviderConnection(connection.id, { tokenExpiresAt: staleExpiry });
  await persistence.persistOAuthConnection(
    "codex",
    {
      accessToken: "fresh-access",
      refreshToken: "fresh-refresh",
      expiresIn: 864000,
    },
    connection.id
  );
  const reauthed = await db.getProviderConnectionById(connection.id);
  assert.equal(reauthed!.tokenExpiresAt, reauthed!.expiresAt);
  assert.equal(reauthed!.lastError ?? null, null);
  assert.equal(reauthed!.errorCode ?? null, null);
  const originalFetch = globalThis.fetch;
  let refreshCalls = 0;
  globalThis.fetch = async () => {
    refreshCalls++;
    return Response.json({ error: { code: "refresh_token_invalidated" } }, { status: 401 });
  };
  try {
    await checkConnection(reauthed);
  } finally {
    globalThis.fetch = originalFetch;
  }
  const after = await db.getProviderConnectionById(connection.id);
  assert.equal(refreshCalls, 0);
  assert.equal(after!.isActive, true);
  assert.equal(after!.testStatus, "active");
  assert.equal(after!.refreshToken, "fresh-refresh");
});

test("reauth with unknown expiry clears the previous token clock", async () => {
  const connection = await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "old",
    tokenExpiresAt: "2020-01-01T00:00:00.000Z",
    isActive: false,
  });
  await db.updateProviderConnection(connection.id, { tokenExpiresAt: "2020-01-01T00:00:00.000Z" });
  await persistence.persistOAuthConnection(
    "codex",
    { accessToken: "new", refreshToken: "new-refresh" },
    connection.id
  );
  const after = await db.getProviderConnectionById(connection.id);
  assert.equal(after!.expiresAt ?? null, null);
  assert.equal(after!.tokenExpiresAt ?? null, null);
});

test("reauth preserves active cooldown and error metadata during an active quota window (#20067, Codex review)", async () => {
  const futureCooldown = new Date(Date.now() + 86400_000).toISOString();
  const connection = await db.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    accessToken: "old-access",
    refreshToken: "old-refresh",
    rateLimitedUntil: futureCooldown,
    backoffLevel: 3,
    lastError: "Weekly quota exceeded",
    lastErrorType: "quota_exhausted",
    errorCode: "429",
  });
  await persistence.persistOAuthConnection(
    "claude",
    {
      accessToken: "new-access",
      refreshToken: "new-refresh",
      expiresIn: 3600,
    },
    connection.id
  );
  const reauthed = await db.getProviderConnectionById(connection.id);
  assert.equal(reauthed!.rateLimitedUntil, futureCooldown);
  assert.equal(reauthed!.backoffLevel, 3);
  assert.equal(reauthed!.lastError, "Weekly quota exceeded");
  assert.equal(reauthed!.lastErrorType, "quota_exhausted");
  assert.equal(reauthed!.errorCode, "429");
});

test("reauth clears expired rateLimitedUntil and resets backoffLevel when not in active cooldown (#20067)", async () => {
  const pastCooldown = new Date(Date.now() - 3600_000).toISOString();
  const connection = await db.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    accessToken: "old-access-2",
    refreshToken: "old-refresh-2",
    rateLimitedUntil: pastCooldown,
    backoffLevel: 2,
    lastError: "Old error",
    errorCode: "500",
  });
  await persistence.persistOAuthConnection(
    "claude",
    {
      accessToken: "new-access-2",
      refreshToken: "new-refresh-2",
      expiresIn: 3600,
    },
    connection.id
  );
  const reauthed = await db.getProviderConnectionById(connection.id);
  assert.equal(reauthed!.rateLimitedUntil ?? null, null);
  assert.equal(reauthed!.backoffLevel ?? 0, 0);
  assert.equal(reauthed!.lastError ?? null, null);
  assert.equal(reauthed!.errorCode ?? null, null);
});
