import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { PKCE_CHALLENGE_METHOD } from "../../src/lib/oauth/utils/pkce";

// NOTE: Dynamic imports below are used (with comment) solely because the modules read process.env at evaluation time.
// The specifiers are literals. This is the established pattern in this repo's auth tests for env-controlled DB setup.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oidc-login-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-oidc-login";

// @ts-ignore - intentional for test harness timing (see note at top)
const core = await import("../../src/lib/db/core.ts");
// @ts-ignore - intentional for test harness timing
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };
// @ts-ignore - intentional for test harness timing
const loginRoute = await import("../../src/app/api/auth/oidc/login/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.JWT_SECRET;
});

async function setupFullOidcSettings() {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "client-oidc-test",
    oidcClientSecret: "secret-oidc-test",
    oidcRedirectPath: "/api/auth/oidc/callback",
    oidcAllowedSubjects: [],
  });
}

function extractCookieValue(setCookies: string[], name: string): string | undefined {
  const header = setCookies.find((cookie) => cookie.startsWith(`${name}=`));
  if (!header) return undefined;
  const value = header.split(";")[0].slice(name.length + 1);
  return decodeURIComponent(value);
}

test("OIDC login redirect includes a state parameter matching the oidc_state cookie", async () => {
  await setupFullOidcSettings();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    if (url.includes("/.well-known/openid-configuration")) {
      // Force the deterministic fallback authEndpoint path (no live network dependency).
      return new Response("not found", { status: 404 });
    }
    return new Response("not mocked", { status: 404 });
  }) as unknown as typeof fetch;

  try {
    const response = await loginRoute.GET(
      new Request("http://localhost/api/auth/oidc/login", {
        headers: { "x-forwarded-proto": "http" },
      })
    );

    assert.equal(response.status, 307);

    const location = response.headers.get("location");
    assert.ok(location, "redirect must include a Location header");

    const redirectUrl = new URL(location as string);
    const stateInUrl = redirectUrl.searchParams.get("state");
    assert.ok(stateInUrl, "authorization URL must include a state query parameter");

    const setCookies = response.headers.getSetCookie();
    assert.ok(setCookies.length >= 3, "response must set the state, verifier and nonce cookies");

    const stateInCookie = extractCookieValue(setCookies, "oidc_state");
    assert.ok(stateInCookie, "oidc_state cookie must carry a value");

    assert.equal(
      stateInUrl,
      stateInCookie,
      "state parameter in the authorization URL must match the oidc_state cookie value"
    );

    const verifierInCookie = extractCookieValue(setCookies, "oidc_pkce_verifier");
    assert.ok(verifierInCookie, "oidc_pkce_verifier cookie must carry a value");

    assert.equal(
      redirectUrl.searchParams.get("code_challenge_method"),
      PKCE_CHALLENGE_METHOD,
      "code_challenge_method must match the method of the hash the code_challenge uses"
    );
    assert.equal(
      redirectUrl.searchParams.get("code_challenge"),
      createHash("sha256")
        .update(verifierInCookie as string)
        .digest("base64url"),
      "code_challenge must be the SHA-256 (base64url) hash of the oidc_pkce_verifier cookie"
    );

    const nonceInCookie = extractCookieValue(setCookies, "oidc_nonce");
    assert.ok(nonceInCookie, "oidc_nonce cookie must carry a value");
    assert.equal(
      redirectUrl.searchParams.get("nonce"),
      nonceInCookie,
      "nonce parameter in the authorization URL must match the oidc_nonce cookie value"
    );

    // The verifier stays server-side: it must never appear in the authorization URL.
    assert.equal(redirectUrl.searchParams.get("code_verifier"), null);

    // Basic cookie hygiene (mirrors the callback route's expectations)
    for (const name of ["oidc_state", "oidc_pkce_verifier", "oidc_nonce"]) {
      const header = setCookies.find((cookie) => cookie.startsWith(`${name}=`)) as string;
      assert.match(header, /HttpOnly/i);
      assert.match(header, /SameSite=lax/i);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OIDC login returns 400 without redirecting when OIDC is not configured", async () => {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: false,
  });

  const response = await loginRoute.GET(new Request("http://localhost/api/auth/oidc/login"));

  assert.equal(response.status, 400);
  assert.equal(response.headers.get("location"), null);
  assert.equal(response.headers.get("set-cookie"), null);
});
