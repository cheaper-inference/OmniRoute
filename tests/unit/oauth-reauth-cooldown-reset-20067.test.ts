import test from "node:test";
import assert from "node:assert/strict";

const { buildOAuthTokenUpdate } = await import("../../src/lib/oauth/connectionPersistence.ts");

test("buildOAuthTokenUpdate resets rateLimitedUntil and backoffLevel alongside error metadata (#20067)", () => {
  const tokenData = {
    accessToken: "fresh-access-token",
    refreshToken: "fresh-refresh-token",
    tokenType: "Bearer",
  };
  const expiresAt = new Date(Date.now() + 3600_000).toISOString();

  const update = buildOAuthTokenUpdate(tokenData, expiresAt);

  assert.equal(update.accessToken, "fresh-access-token");
  assert.equal(update.refreshToken, "fresh-refresh-token");
  assert.equal(update.expiresAt, expiresAt);
  assert.equal(update.tokenExpiresAt, expiresAt);

  // Error fields must be cleared
  assert.equal(update.lastError, null);
  assert.equal(update.lastErrorAt, null);
  assert.equal(update.lastErrorType, null);
  assert.equal(update.lastErrorSource, null);
  assert.equal(update.errorCode, null);

  // Rate limit cooldown and backoff level must be reset to avoid orphaned cooldowns (#20067)
  assert.equal(update.rateLimitedUntil, null);
  assert.equal(update.backoffLevel, 0);
});
