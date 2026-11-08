import assert from "node:assert/strict";
import test from "node:test";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// A Microsoft sign-in stores copilot-m365-web as an OAuth connection. Without
// an OAUTH_TEST_CONFIG entry, "Test Connection" and the scheduled health sweep
// answered "Provider test not supported" for a connection that chats fine.
const { testOAuthConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");

const signedIn = (expiresInMs: number) => ({
  provider: "copilot-m365-web",
  authType: "oauth",
  accessToken: "access-token",
  refreshToken: "refresh-token",
  tokenExpiresAt: new Date(Date.now() + expiresInMs).toISOString(),
  providerSpecificData: {
    chathubPath: "00000000-0000-4000-8000-000000000001@00000000-0000-4000-8000-000000000002",
    tid: "00000000-0000-4000-8000-000000000002",
  },
});

test.after(() => resetDbInstance());

test("a signed-in M365 connection is testable, not 'unsupported'", async () => {
  const result = await testOAuthConnection(signedIn(3600_000));

  assert.notEqual(result.diagnosis?.type, "unsupported");
  assert.notEqual(result.error, "Provider test not supported");
  assert.equal(result.valid, true);
});

test("an expired M365 access token is renewed with the refresh token", async (t) => {
  const calls: string[] = [];
  t.mock.method(globalThis, "fetch", async (url: string | URL) => {
    calls.push(String(url));
    return new Response(
      JSON.stringify({
        access_token: "renewed-access-token",
        refresh_token: "rotated-refresh-token",
        expires_in: 4500,
        token_type: "Bearer",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  });

  const result = await testOAuthConnection(signedIn(-60_000));

  assert.equal(result.valid, true);
  assert.equal(result.refreshed, true);
  assert.ok(
    calls.some((url) =>
      url.startsWith(
        "https://login.microsoftonline.com/00000000-0000-4000-8000-000000000002/oauth2/v2.0/token"
      )
    ),
    "the renewal goes to the tenant's Microsoft token endpoint"
  );
});

test("an expired M365 token with no refresh token fails without calling Microsoft", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response("{}"));
  const result = await testOAuthConnection({ ...signedIn(-60_000), refreshToken: undefined });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Token expired");
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("an M365 connection with neither token asks for a new sign-in", async () => {
  const result = await testOAuthConnection({
    ...signedIn(3600_000),
    accessToken: undefined,
    refreshToken: undefined,
  });

  assert.equal(result.valid, false);
  assert.equal(result.diagnosis?.type, "reauth_required");
  assert.match(String(result.error), /re-authenticate/i);
});
