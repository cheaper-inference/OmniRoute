import test from "node:test";
import assert from "node:assert/strict";

const { extractOAuthErrorCode, isUnrecoverableRefreshError } =
  await import("../../open-sse/services/tokenRefresh/shared.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const { refreshAccessToken } = await import("../../open-sse/services/tokenRefresh.ts");

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

test("generic refreshAccessToken treats a reused refresh token as unrecoverable", async () => {
  // Before the canonicalization this path only knew invalid_grant / invalid_request, so a
  // refresh_token_reused body returned a transient null and the dead token was retried.
  const probe = "refresh-reused-probe";
  const providers = PROVIDERS as unknown as Record<string, unknown>;
  providers[probe] = { refreshUrl: "https://auth.example.test/token", clientId: "c" };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "refresh_token_reused" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })) as unknown as typeof fetch;
  try {
    const result = await refreshAccessToken(probe, "rt-reused", {}, null);
    assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "invalid_grant" });
    assert.equal(isUnrecoverableRefreshError(result), true);
  } finally {
    globalThis.fetch = originalFetch;
    delete providers[probe];
  }
});

test("client configuration errors do not disable accounts", () => {
  for (const code of ["invalid_client", "unauthorized_client", "invalid_scope"]) {
    assert.equal(extractOAuthErrorCode({ error: code }), null, code);
    assert.equal(isUnrecoverableRefreshError({ error: code }), false, code);
  }
});
