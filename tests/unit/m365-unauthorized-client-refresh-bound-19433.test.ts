/**
 * #19433: `unauthorized_client` is a client-configuration error, so it no longer
 * takes the unrecoverable (deactivate) path. Retrying it must stay bounded.
 *
 * The background sweep never redeems the M365 grant (copilot-m365-web is a
 * web-cookie provider, so checkConnection hands it to the cookie probe). Every
 * automatic redemption comes from the per-request refresh
 * (prepareM365Credentials → getAccessToken → refreshM365Token), once per chat
 * request while the access token is near expiry. A tenant that permanently
 * rejects the client must not turn that into one token-endpoint call per request.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-m365-client-config-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";

const core = await import("../../src/lib/db/core.ts");
const tokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const { M365_CLIENT_CONFIG_REFRESH_MAX_ATTEMPTS, M365_CLIENT_CONFIG_REFRESH_COOLDOWN_MS } =
  await import("../../open-sse/services/tokenRefresh/providers/m365.ts");

const REQUESTS = 10;
const MAX_ATTEMPTS = 3;
const realNow = Date.now;
const originalFetch = globalThis.fetch;
let clockOffsetMs = 0;
let tokenCalls = 0;

test.before(() => {
  Date.now = () => realNow() + clockOffsetMs;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : String((input as Request).url ?? input);
    if (url.startsWith("https://login.microsoftonline.com/")) {
      tokenCalls++;
      return new Response(
        JSON.stringify({ error: "unauthorized_client", error_description: "AADSTS" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }
    return originalFetch(
      input as Parameters<typeof originalFetch>[0],
      init as Parameters<typeof originalFetch>[1]
    );
  }) as typeof fetch;
});

test.after(() => {
  Date.now = realNow;
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function credentials(connectionId: string) {
  return {
    connectionId,
    refreshToken: `rt_${connectionId}`,
    accessToken: `at_${connectionId}`,
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    providerSpecificData: {},
  };
}

async function requestRefresh(connectionId: string) {
  return (await tokenRefresh.getAccessToken(
    "copilot-m365-web",
    credentials(connectionId),
    null
  )) as { accessToken?: string; error?: string } | null;
}

test("unauthorized_client is redeemed at most the attempt cap, then backs off", async () => {
  tokenCalls = 0;
  for (let request = 0; request < REQUESTS; request++) {
    const result = await requestRefresh("m365-capped");
    assert.equal(result?.accessToken, undefined);
    assert.equal(result?.error, "unauthorized_client", "the caller still sees why it failed");
    assert.equal(tokenRefresh.isUnrecoverableRefreshError(result), false, "never deactivates");
  }
  assert.equal(
    tokenCalls,
    MAX_ATTEMPTS,
    `${REQUESTS} requests must spend at most the attempt cap on the token endpoint`
  );
  assert.equal(M365_CLIENT_CONFIG_REFRESH_MAX_ATTEMPTS, MAX_ATTEMPTS);

  clockOffsetMs += M365_CLIENT_CONFIG_REFRESH_COOLDOWN_MS - 60_000;
  await requestRefresh("m365-capped");
  assert.equal(tokenCalls, MAX_ATTEMPTS, "still inside the backoff");

  clockOffsetMs += 2 * 60_000;
  await requestRefresh("m365-capped");
  assert.equal(
    tokenCalls,
    MAX_ATTEMPTS + 1,
    "a backoff, not a permanent block: the grant is retried once the window ends"
  );
});

test("the cap is per connection, so a sibling account keeps refreshing", async () => {
  tokenCalls = 0;
  await requestRefresh("m365-sibling");
  assert.equal(tokenCalls, 1);
});
