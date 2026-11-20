import test from "node:test";
import assert from "node:assert/strict";

const { buildOAuthTokenUpdate } = await import("../../src/lib/oauth/connectionPersistence.ts");

test("buildOAuthTokenUpdate resets rateLimitedUntil and error metadata when there is no active cooldown (#20067)", () => {
  const tokenData = {
    accessToken: "fresh-access-token",
    refreshToken: "fresh-refresh-token",
    tokenType: "Bearer",
  };
  const expiresAt = new Date(Date.now() + 3600_000).toISOString();

  // 1. Without existing connection
  const updateWithoutMatch = buildOAuthTokenUpdate(tokenData, expiresAt);
  assert.equal(updateWithoutMatch.accessToken, "fresh-access-token");
  assert.equal(updateWithoutMatch.refreshToken, "fresh-refresh-token");
  assert.equal(updateWithoutMatch.expiresAt, expiresAt);
  assert.equal(updateWithoutMatch.tokenExpiresAt, expiresAt);
  assert.equal(updateWithoutMatch.lastError, null);
  assert.equal(updateWithoutMatch.lastErrorAt, null);
  assert.equal(updateWithoutMatch.lastErrorType, null);
  assert.equal(updateWithoutMatch.errorCode, null);
  assert.equal(updateWithoutMatch.rateLimitedUntil, null);
  assert.equal(updateWithoutMatch.backoffLevel, 0);

  // 2. With existing connection that had an expired cooldown or no cooldown
  const pastCooldown = new Date(Date.now() - 3600_000).toISOString();
  const updateWithExpiredCooldown = buildOAuthTokenUpdate(tokenData, expiresAt, {
    rateLimitedUntil: pastCooldown,
    backoffLevel: 2,
    lastError: "Expired 429",
  });
  assert.equal(updateWithExpiredCooldown.rateLimitedUntil, null);
  assert.equal(updateWithExpiredCooldown.backoffLevel, 0);
  assert.equal(updateWithExpiredCooldown.lastError, null);
});

test("buildOAuthTokenUpdate preserves active cooldown and error metadata during an active quota window (#20067, Codex review)", () => {
  const tokenData = {
    accessToken: "fresh-access-token",
    refreshToken: "fresh-refresh-token",
    tokenType: "Bearer",
  };
  const expiresAt = new Date(Date.now() + 3600_000).toISOString();
  const futureCooldown = new Date(Date.now() + 86400_000).toISOString();

  const update = buildOAuthTokenUpdate(tokenData, expiresAt, {
    rateLimitedUntil: futureCooldown,
    backoffLevel: 3,
    lastError: "Weekly quota exceeded",
    lastErrorType: "quota_exhausted",
    errorCode: "429",
  });

  assert.equal(update.accessToken, "fresh-access-token");
  assert.equal(update.refreshToken, "fresh-refresh-token");
  assert.equal(update.expiresAt, expiresAt);
  assert.equal(update.tokenExpiresAt, expiresAt);

  // When cooling down, credential renewal must NOT clear the active cooldown (rotating tokens does not replenish quota),
  // and must NOT wipe the error metadata to null (wiping would orphan the cooldown and block #17043 reset recovery).
  assert.equal(Object.hasOwn(update, "rateLimitedUntil"), false);
  assert.equal(Object.hasOwn(update, "backoffLevel"), false);
  assert.equal(Object.hasOwn(update, "lastError"), false);
  assert.equal(Object.hasOwn(update, "lastErrorType"), false);
  assert.equal(Object.hasOwn(update, "errorCode"), false);
});
