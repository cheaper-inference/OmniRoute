import test from "node:test";
import assert from "node:assert/strict";

// Public OAuth client_id/secret defaults for Gemini, Antigravity and Windsurf
// are resolved at module load through open-sse/utils/publicCreds.ts — no need
// to populate them here. Only the providers without a baked-in default need
// explicit env setup for this suite.
Object.assign(process.env, {
  CLAUDE_OAUTH_CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
  CODEX_OAUTH_CLIENT_ID: "app_EMoamEEZ73f0CkXaXp7hrann",
  KIMI_CODING_OAUTH_CLIENT_ID: "17e5f671-d194-4dfb-9706-5516cb48c098",
  GITHUB_OAUTH_CLIENT_ID: "Iv1.b507a08c87ecfe98",
});

const { claude } = await import("../../src/lib/oauth/providers/claude.ts");
const { CLAUDE_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Claude OAuth provider always uses the configured redirectUri when building the auth URL", () => {
  const runtimeRedirectUri = "http://localhost:43121/callback";
  const authUrl = claude.buildAuthUrl(
    CLAUDE_CONFIG,
    runtimeRedirectUri,
    "state-123",
    "challenge-456"
  );
  const parsed = new URL(authUrl);

  assert.equal(parsed.searchParams.get("redirect_uri"), CLAUDE_CONFIG.redirectUri);
  assert.equal(parsed.searchParams.get("state"), "state-123");
  assert.equal(parsed.searchParams.get("code_challenge"), "challenge-456");
});

test("Claude OAuth provider always uses the configured redirectUri during token exchange", async () => {
  let captured = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      method: init.method,
      headers: init.headers,
      body: JSON.parse(String(init.body)),
    };

    return new Response(JSON.stringify({ access_token: "token-1" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const runtimeRedirectUri = "http://localhost:43121/callback";
  await claude.exchangeToken(
    CLAUDE_CONFIG,
    "auth-code#state-from-fragment",
    runtimeRedirectUri,
    "verifier-123",
    "state-from-request"
  );

  assert.equal(captured.url, CLAUDE_CONFIG.tokenUrl);
  assert.equal(captured.method, "POST");
  assert.equal(captured.body.redirect_uri, CLAUDE_CONFIG.redirectUri);
  assert.equal(captured.body.code, "auth-code");
  assert.equal(captured.body.state, "state-from-fragment");
  assert.equal(captured.body.code_verifier, "verifier-123");
});

test("Claude OAuth token mapper persists the first non-empty token plan field", () => {
  const cases = [
    [{ account_tier: " Pro ", plan: "Max" }, "Pro"],
    [{ account_tier: "", plan: "Max" }, "Max"],
    [{ plan: "", subscription_type: "Team" }, "Team"],
    [{ subscription_type: "", billing: { plan: "Enterprise" } }, "Enterprise"],
  ];

  for (const [tokens, expected] of cases) {
    const mapped = claude.mapTokens({ access_token: "token-1", ...tokens });

    assert.equal(mapped.providerSpecificData.plan, expected);
  }
});

test("Claude OAuth token mapper reads plan fields from userinfo extras after token fields", () => {
  const mapped = claude.mapTokens(
    { access_token: "token-1" },
    { userInfo: { account_tier: "", subscription_type: "Max" } }
  );

  assert.equal(mapped.providerSpecificData.plan, "Max");
});

test("Claude OAuth token mapper leaves providerSpecificData.plan undefined without plan fields", () => {
  const mapped = claude.mapTokens({ access_token: "token-1", scope: "user:profile" });

  assert.ok(mapped.providerSpecificData);
  assert.ok(typeof mapped.providerSpecificData.cliUserID === "string");
  assert.equal(mapped.providerSpecificData.plan, undefined);
});

const DAY_MS = 86_400_000;

test("Claude OAuth token mapper keeps when the login ends, from refresh_token_expires_in", () => {
  const before = Date.now();
  const mapped = claude.mapTokens({
    access_token: "token-1",
    refresh_token: "refresh-1",
    expires_in: 28_800,
    refresh_token_expires_in: 3 * 86_400,
  });
  const after = Date.now();

  const endsAt = Date.parse(mapped.providerSpecificData.refreshTokenExpiresAt);
  assert.ok(endsAt >= before + 3 * DAY_MS, "not before the login's lifetime from the exchange");
  assert.ok(endsAt <= after + 3 * DAY_MS, "not after it either");
});

test("Claude OAuth token mapper records no login end when the response carries none", () => {
  for (const refreshTtl of [undefined, null, 0, -1, "soon"]) {
    const mapped = claude.mapTokens({
      access_token: "token-1",
      refresh_token_expires_in: refreshTtl,
    });

    assert.equal(mapped.providerSpecificData?.refreshTokenExpiresAt, undefined, String(refreshTtl));
  }
});

test("Claude OAuth token mapper reads a numeric string lifetime as seconds", () => {
  const before = Date.now();
  const mapped = claude.mapTokens({ access_token: "token-1", refresh_token_expires_in: "86400" });

  assert.ok(Date.parse(mapped.providerSpecificData.refreshTokenExpiresAt) >= before + DAY_MS);
});

test("Claude OAuth token mapper drops a login end past Date's range and keeps the tokens", () => {
  const mapped = claude.mapTokens({ access_token: "token-1", refresh_token_expires_in: 1e20 });

  assert.equal(mapped.accessToken, "token-1");
  assert.equal(mapped.providerSpecificData.refreshTokenExpiresAt, undefined);
});
