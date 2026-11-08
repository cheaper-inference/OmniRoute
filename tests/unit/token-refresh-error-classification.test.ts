import test from "node:test";
import assert from "node:assert/strict";

const { extractOAuthErrorCode, isUnrecoverableRefreshError } =
  await import("../../open-sse/services/tokenRefresh/shared.ts");

const terminalGrantCodes = [
  "refresh_token_reused",
  "refresh_token_expired",
  "refresh_token_invalidated",
  "token_revoked",
];

test("terminal refresh grants use the existing unrecoverable sentinel path", () => {
  for (const code of terminalGrantCodes) {
    assert.equal(extractOAuthErrorCode({ error: code }), "invalid_grant", code);
  }
});

test("terminal refresh grant results are unrecoverable on every caller", () => {
  for (const code of terminalGrantCodes) {
    assert.equal(isUnrecoverableRefreshError({ error: code }), true, code);
  }
});

test("client configuration errors do not disable accounts", () => {
  for (const code of ["invalid_client", "unauthorized_client", "invalid_scope"]) {
    assert.equal(extractOAuthErrorCode({ error: code }), null, code);
    assert.equal(isUnrecoverableRefreshError({ error: code }), false, code);
  }
});
