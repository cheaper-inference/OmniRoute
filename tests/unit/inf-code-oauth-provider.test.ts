import test from "node:test";
import assert from "node:assert/strict";
import { generateAuthData, getProvider } from "../../src/lib/oauth/providers.ts";

test("inf-code is registered in the browser OAuth provider registry", () => {
  const provider = getProvider("inf-code");
  assert.ok(provider, "inf-code must be in the OAuth PROVIDERS map");
  assert.equal(provider.flowType, "authorization_code_pkce");
  assert.equal(provider.fixedPort, 56124);
  assert.equal(provider.callbackPath, "/callback");
});

test("inf-code builds the Token Infinity authorize URL with verified params", () => {
  const authData = generateAuthData("inf-code", "http://localhost:56124/callback");
  assert.ok(authData.authUrl, "authUrl must be generated");
  const url = new URL(authData.authUrl);
  assert.equal(url.hostname, "www.tokensinfinity.com");
  assert.equal(url.pathname, "/infcode/login");
  assert.equal(url.searchParams.get("loginType"), "");
  assert.equal(url.searchParams.get("type"), "editor");
  assert.equal(url.searchParams.get("scope"), "profile");
  assert.equal(url.searchParams.get("client_id"), "infcode");
  assert.equal(url.searchParams.get("redirect"), "http://localhost:56124/callback");
  assert.ok(url.searchParams.get("state"), "state param must be present");
});

test("inf-code exchangeToken POSTs a JSON body { code }", async () => {
  let capturedBody: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    void input;
    capturedBody = init?.body as string;
    capturedHeaders = init?.headers as Record<string, string>;
    return new Response(
      JSON.stringify({ access_token: "at-123", refresh_token: "rt-456", expires_in: 3600 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const provider = getProvider("inf-code");
    const tokens = await provider.exchangeToken(provider.config, "auth-code-abc");
    assert.equal(tokens.access_token, "at-123");
    assert.equal(tokens.refresh_token, "rt-456");
    const body = JSON.parse(capturedBody as string);
    assert.deepEqual(body, { code: "auth-code-abc" });
    assert.equal(capturedHeaders["Content-Type"], "application/json");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("inf-code postExchange fetches userinfo with bearer token", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(input, "https://www.tokensinfinity.com/acode/v1/userinfo");
    const headers = init?.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer at-123");
    return new Response(JSON.stringify({ email: "user@example.com", name: "Test User" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const provider = getProvider("inf-code");
    const extra = await provider.postExchange({ access_token: "at-123" });
    const userInfo = extra.userInfo as Record<string, string>;
    assert.equal(userInfo.email, "user@example.com");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("inf-code mapTokens extracts identity and provider data", () => {
  const provider = getProvider("inf-code");
  const mapped = provider.mapTokens(
    { access_token: "at-1", refresh_token: "rt-1", expires_in: 3600 },
    { userInfo: { email: "dev@tokensinfinity.com", name: "InfCode Dev" } }
  );
  assert.equal(mapped.accessToken, "at-1");
  assert.equal(mapped.refreshToken, "rt-1");
  assert.equal(mapped.email, "dev@tokensinfinity.com");
  assert.equal(mapped.name, "InfCode Dev");
});
