import test from "node:test";
import assert from "node:assert/strict";

import { generateAuthData } from "../../src/lib/oauth/providers.ts";
import { renderhour } from "../../src/lib/oauth/providers/renderhour.ts";
import { RENDERHOUR_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { OAUTH_ENDPOINTS } from "../../open-sse/config/constants.ts";
import { refreshRenderhourToken } from "../../open-sse/services/tokenRefresh/providers/renderhour.ts";
import { OAUTH_TEST_CONFIG } from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";
import { testOAuthConnection } from "../../src/app/api/providers/[id]/test/route.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";
import PROVIDERS from "../../src/lib/oauth/providers/index.ts";

const originalFetch = globalThis.fetch;
const REDIRECT = "http://localhost:20128/callback";

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("RenderHour OAuth builds a PKCE request for the built-in public client", () => {
  assert.equal(PROVIDERS.renderhour, renderhour);
  assert.match(RENDERHOUR_CONFIG.clientId, /^rhc_[a-z]+$/);
  assert.equal(OAUTH_ENDPOINTS.renderhour.clientId, RENDERHOUR_CONFIG.clientId);

  const authData = generateAuthData("renderhour", REDIRECT);
  const url = new URL(authData.authUrl);
  assert.equal(url.origin, "https://renderhour.com");
  assert.equal(url.pathname, "/oauth/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), RENDERHOUR_CONFIG.clientId);
  assert.equal(url.searchParams.get("redirect_uri"), REDIRECT);
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.equal(url.searchParams.get("state"), authData.state);
  assert.ok(url.searchParams.get("code_challenge"));
  assert.equal(url.searchParams.get("scope"), null);
});

test("RenderHour OAuth exchanges the code form-encoded and learns the account", async () => {
  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    if (url === RENDERHOUR_CONFIG.tokenUrl) {
      assert.equal(init.method, "POST");
      const body = init.body as URLSearchParams;
      assert.equal(body.get("grant_type"), "authorization_code");
      assert.equal(body.get("client_id"), RENDERHOUR_CONFIG.clientId);
      assert.equal(body.get("code"), "the-code");
      assert.equal(body.get("redirect_uri"), REDIRECT);
      assert.equal(body.get("code_verifier"), "verifier");
      return Response.json({
        access_token: "rhat_access",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "rhrt_refresh",
      });
    }
    if (url === RENDERHOUR_CONFIG.userinfoUrl) {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer rhat_access");
      return Response.json({ sub: "acc-1", email: "smm@example.com", name: "SMM Studio" });
    }
    throw new Error(`Unexpected URL: ${url}`);
  }) as typeof fetch;

  const tokens = await renderhour.exchangeToken(
    RENDERHOUR_CONFIG,
    "the-code",
    REDIRECT,
    "verifier"
  );
  const mapped = renderhour.mapTokens(tokens, await renderhour.postExchange(tokens));
  assert.deepEqual(mapped, {
    accessToken: "rhat_access",
    refreshToken: "rhrt_refresh",
    expiresIn: 3600,
    email: "smm@example.com",
    name: "SMM Studio",
    providerSpecificData: { tokenType: "Bearer", accountId: "acc-1" },
  });
  assert.doesNotThrow(() => renderhour.mapTokens({}, null));
});

test("RenderHour refresh rotates the pair; a used refresh token asks to sign in again", async () => {
  assert.equal(supportsTokenRefresh("renderhour"), true);

  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    assert.equal(String(input), "https://renderhour.com/api/oauth/token");
    const body = init.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("client_id"), RENDERHOUR_CONFIG.clientId);
    if (body.get("refresh_token") === "rhrt_used") {
      return Response.json(
        { error: "invalid_grant", error_description: "the refresh token is not valid" },
        { status: 400 }
      );
    }
    return Response.json({
      access_token: "rhat_new",
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token: "rhrt_new",
    });
  }) as typeof fetch;

  assert.deepEqual(await refreshRenderhourToken("rhrt_old", null, null), {
    accessToken: "rhat_new",
    refreshToken: "rhrt_new",
    expiresIn: 3600,
  });
  assert.deepEqual(await refreshRenderhourToken("rhrt_used", null, null), {
    error: "unrecoverable_refresh_error",
    code: "invalid_grant",
  });
});

test("RenderHour connection test reads the balance with the access token", async () => {
  assert.equal(OAUTH_TEST_CONFIG.renderhour.url, "https://renderhour.com/v1/balance");
  let calledUrl = "";
  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    calledUrl = String(input);
    const headers = new Headers(init.headers);
    assert.equal(headers.get("Authorization"), "Bearer rhat_access");
    return Response.json({ balance_usd: 0, credits: 120, concurrency: 2 });
  }) as typeof fetch;

  const result = await testOAuthConnection({
    provider: "renderhour",
    accessToken: "rhat_access",
    refreshToken: "rhrt_refresh",
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });
  assert.equal(result.valid, true);
  assert.equal(calledUrl, "https://renderhour.com/v1/balance");
});
