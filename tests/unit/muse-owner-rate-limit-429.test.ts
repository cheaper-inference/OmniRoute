import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A Muse Code session is pinned to its OAuth account, and credential selection only ever
// considers that account. When the account is rate-limited (Muse's "Subscription quota
// exhausted" 429 locks the model until the window resets), no other account can be picked,
// so there is no cross-account risk: the caller must get the normal 429 with the reset time,
// not a 503 "cross-account continuation is forbidden" that clients retry in a loop.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-owner-429-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) process.env.API_KEY_SECRET = `test-muse-owner-429-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");

const originalFetch = globalThis.fetch;
const MODEL = "muse-code/muse-wonder-1.0-contributor";
const QUOTA_MESSAGE =
  "Subscription quota exhausted. Your usage window resets at 2099-01-01T00:00:00Z.";

function request(sessionId: string) {
  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-session-id": sessionId },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: `Reply with OK only. ${nonce}` }],
      stream: false,
    }),
  });
}

function museReply(): Response {
  return Response.json({
    id: "resp_owner_429",
    object: "response",
    status: "completed",
    output: [
      {
        type: "message",
        id: "msg_owner_429",
        role: "assistant",
        content: [{ type: "output_text", text: "OK" }],
      },
    ],
    usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
  });
}

test.beforeEach(async () => {
  clearInflight();
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a rate-limited session owner answers 429 with its reset, never a cross-account 503", async () => {
  await providersDb.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: "muse-owner",
    accessToken: "owner-key",
    refreshToken: "dca:owner",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  let inference = 0;
  let quotaExhausted = false;
  globalThis.fetch = (async (url: unknown) => {
    if (String(url).endsWith("/muse-code/key")) return Response.json({ api_key: "owner-key" });
    inference += 1;
    if (quotaExhausted) {
      return Response.json(
        { error: { message: QUOTA_MESSAGE, type: "rate_limit_error" } },
        { status: 429 }
      );
    }
    return museReply();
  }) as typeof fetch;

  try {
    // 1. A served turn pins the session to the account.
    const served = await handleChat(request("ses_owner_429"));
    assert.equal(served.status, 200, await served.clone().text());
    await served.text();

    // 2. Muse refuses the next turn: the subscription window is exhausted.
    quotaExhausted = true;
    const refused = await handleChat(request("ses_owner_429"));
    assert.equal(refused.status, 429, await refused.clone().text());
    await refused.text();
    const callsAfterRefusal = inference;

    // 3. Retries of the pinned session and a brand-new session: the locked account is the
    //    only one, so both get 429 and never reach Muse again.
    for (const sessionId of ["ses_owner_429", "ses_owner_429_fresh"]) {
      const retry = await handleChat(request(sessionId));
      const body = await retry.text();
      assert.equal(retry.status, 429, `${sessionId}: ${body}`);
      assert.doesNotMatch(body, /cross-account/);
    }
    assert.equal(inference, callsAfterRefusal, "a locked owner must not be called again");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
