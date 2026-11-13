// After the provider pipeline refreshed the token and the upstream still answers 401,
// the streaming leg must not refresh and resend a second time (non-stream does not).
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("refresh-once-after-pipeline");
const providersDb = await import("../../src/lib/db/providers.ts");
let upstreamCalls = 0;
let refreshCalls = 0;
const sendTokens: string[] = [];

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await h.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  upstreamCalls = 0;
  refreshCalls = 0;
  sendTokens.length = 0;
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    if (/oauth\/token|\/token(\?|$)/.test(url)) {
      refreshCalls++;
      return new Response(
        JSON.stringify({
          access_token: `new-${refreshCalls}`,
          refresh_token: `rt-${refreshCalls}`,
          expires_in: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (/anthropic\.com\/v1\/messages/.test(url)) {
      upstreamCalls++;
      sendTokens.push(
        new Headers(init.headers).get("authorization") ||
          new Headers(init.headers).get("x-api-key") ||
          ""
      );
      return new Response(
        JSON.stringify({
          type: "error",
          error: { type: "authentication_error", message: "invalid x-api-key" },
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
  };
});
test.after(() => h.cleanup());

for (const stream of [false, true]) {
  test(`stream=${stream}: one 401 costs one refresh and two upstream sends`, async () => {
    await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: "refresh-once",
      accessToken: `old-at-${stream}`,
      // A fresh refresh token per test: the refresh layer caches results by refresh token.
      refreshToken: `old-rt-${crypto.randomUUID()}`,
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      isActive: true,
      testStatus: "active",
      priority: 1,
      providerSpecificData: {},
    });
    const res = await h.handleChat(
      h.buildRequest({
        body: {
          model: "claude/claude-sonnet-4-5-20250929",
          stream,
          max_tokens: 16,
          messages: [{ role: "user", content: `hi ${crypto.randomUUID()}` }],
        },
      })
    );
    await res.text();
    assert.equal(refreshCalls, 1, "refresh endpoint calls");
    assert.equal(upstreamCalls, 2, "upstream sends: original + one resend with the new token");
    assert.equal(new Set(sendTokens).size, 2, `each send uses a different token: ${sendTokens}`);
  });
}
