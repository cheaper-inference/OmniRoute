import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-inf-code-refresh-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { refreshInfCodeToken, infCodeJwtExpiresIn } =
  await import("../../open-sse/services/tokenRefresh/providers/infcode.ts");
const { extractOAuthErrorCode, isUnrecoverableRefreshError } =
  await import("../../open-sse/services/tokenRefresh/shared.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = {
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
};

function makeResponse(status, body) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("refreshInfCodeToken posts a JSON body with rotate_refresh and returns new tokens", async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return makeResponse(200, {
      access_token: "new-access",
      refresh_token: "new-refresh",
      expires_in: 3600,
    });
  };
  try {
    const result = await refreshInfCodeToken("old-refresh", noopLog);
    assert.ok(result, "result must be returned");
    assert.equal(result.accessToken, "new-access");
    assert.equal(result.refreshToken, "new-refresh");
    assert.equal(result.expiresIn, 3600);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].init.method, "POST");
    const body = JSON.parse(calls[0].init.body);
    assert.equal(body.refresh_token, "old-refresh");
    assert.equal(body.rotate_refresh, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("refreshInfCodeToken treats 401/403 as unrecoverable (dead refresh token)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => makeResponse(401, { error: "invalid_grant" });
  try {
    const result = await refreshInfCodeToken("dead-token", noopLog);
    assert.ok(result, "unrecoverable result must be returned");
    assert.equal(result.error, "unrecoverable_refresh_error");
    assert.equal(isUnrecoverableRefreshError(result), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("refreshInfCodeToken treats invalid_grant as unrecoverable", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => makeResponse(400, { error: "invalid_grant" });
  try {
    const result = await refreshInfCodeToken("dead-token", noopLog);
    assert.ok(result, "unrecoverable result must be returned");
    assert.equal(result.error, "unrecoverable_refresh_error");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("refreshInfCodeToken treats transient 5xx as retryable (null, not unrecoverable)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => makeResponse(500, { error: "server_error" });
  try {
    const result = await refreshInfCodeToken("good-token", noopLog);
    assert.equal(result, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

/** Build an unsigned JWT-shaped token (only the payload matters here). */
function makeJwt(payload: Record<string, unknown>): string {
  const part = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${part({ alg: "HS256", typ: "JWT" })}.${part(payload)}.signature`;
}

test("derives expiresIn from the access-token JWT when the refresh response omits it", async () => {
  // The live refresh endpoint answers with only { access_token, refresh_token };
  // without the JWT fallback the stored expiry is never rewritten and Provider
  // Limits shows a red "Token expired" badge on a live connection.
  const originalFetch = globalThis.fetch;
  const exp = Math.floor(Date.now() / 1000) + 7200;
  globalThis.fetch = async () =>
    makeResponse(200, {
      access_token: makeJwt({ exp, client_id: "infcode" }),
      refresh_token: "new-refresh",
    });
  try {
    const result = await refreshInfCodeToken("old-refresh", noopLog);
    assert.ok(result, "result must be returned");
    assert.ok(
      result.expiresIn > 7100 && result.expiresIn <= 7200,
      `expiresIn should come from the JWT exp claim, got ${result.expiresIn}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("keeps an explicit expires_in when the token endpoint sends one", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    makeResponse(200, {
      access_token: makeJwt({ exp: Math.floor(Date.now() / 1000) + 60 }),
      refresh_token: "new-refresh",
      expires_in: "1800",
    });
  try {
    const result = await refreshInfCodeToken("old-refresh", noopLog);
    assert.equal(result.expiresIn, 1800);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("leaves expiresIn undefined for an opaque token with no expires_in", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    makeResponse(200, { access_token: "opaque-token", refresh_token: "new-refresh" });
  try {
    const result = await refreshInfCodeToken("old-refresh", noopLog);
    assert.equal(result.expiresIn, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("infCodeJwtExpiresIn reads the exp claim and rejects unusable tokens", () => {
  const nowMs = 1_800_000_000_000; // fixed clock
  const nowSeconds = nowMs / 1000;

  assert.equal(infCodeJwtExpiresIn(makeJwt({ exp: nowSeconds + 7200 }), nowMs), 7200);
  assert.equal(infCodeJwtExpiresIn(makeJwt({ exp: nowSeconds - 60 }), nowMs), undefined);
  assert.equal(infCodeJwtExpiresIn(makeJwt({ sub: "no-exp" }), nowMs), undefined);
  assert.equal(infCodeJwtExpiresIn("not-a-jwt", nowMs), undefined);
  assert.equal(infCodeJwtExpiresIn("a.!!!not-base64!!!.c", nowMs), undefined);
  assert.equal(infCodeJwtExpiresIn(undefined, nowMs), undefined);
});

test("extractOAuthErrorCode recognizes the InfCode 401 envelope shape", () => {
  assert.equal(extractOAuthErrorCode({ error: "invalid_grant" }), "invalid_grant");
  assert.equal(
    extractOAuthErrorCode({ code: 4010001, message: "credentials missing", success: false }),
    null
  );
});
