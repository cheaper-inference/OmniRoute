// A codex 429 rotates A -> B inside the provider pipeline. The success bookkeeping
// (selected-connection header, quota-healthy mark) must name B, the account that served.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("chat-rotation-success");
const providersDb = await import("../../src/lib/db/providers.ts");
const TOK = { first: "fixture-token-first-a", second: "fixture-token-second-b" };

function completedSse(text: string): Response {
  const completed = {
    type: "response.completed",
    response: {
      id: "resp_fixture",
      object: "response",
      status: "completed",
      model: "gpt-5.6-luna",
      output: [
        {
          id: "msg_fixture",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  };
  const delta = { type: "response.output_text.delta", item_id: "msg_fixture", delta: text };
  return new Response(
    `data: ${JSON.stringify(delta)}\n\ndata: ${JSON.stringify(completed)}\n\ndata: [DONE]\n\n`,
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function seedCodex(
  name: string,
  token: string,
  priority: number,
  extra: Record<string, unknown> = {}
) {
  const c = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    accessToken: token,
    refreshToken: `${token}-r`,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
    ...extra,
  });
  return String(c.id);
}

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await h.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!/chatgpt\.com\/backend-api\/codex\/responses/.test(url)) {
      return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
    }
    const token = (new Headers(init.headers).get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (token === TOK.first) {
      return new Response(
        JSON.stringify({ error: { type: "usage_limit_reached", message: "limit reached" } }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
      );
    }
    return completedSse("served by the second account");
  };
});
test.after(() => h.cleanup());

for (const stream of [false, true]) {
  test(`stream=${stream}: after a 429 rotation A -> B the header and quota mark name B`, async () => {
    const { isQuotaHealthy } = await import("../../src/domain/quotaCacheState.ts");
    const a = await seedCodex("rotation-a", TOK.first, 1);
    const b = await seedCodex("rotation-b", TOK.second, 2);
    const res = await h.handleChat(
      h.buildRequest({
        body: {
          model: "codex/gpt-5.6-luna",
          stream,
          messages: [{ role: "user", content: `rotate ${crypto.randomUUID()}` }],
        },
      })
    );
    await res.text();
    assert.equal(res.headers.get("x-omniroute-selected-connection-id"), b);
    assert.equal(isQuotaHealthy(a), false, "the account that returned usage_limit_reached");
    assert.equal(isQuotaHealthy(b), true, "the account that served");
  });
}

test("after a 429 rotation A -> B the success clears the old error state of B, the account that served", async () => {
  await seedCodex("rotation-a", TOK.first, 1);
  const b = await seedCodex("rotation-b", TOK.second, 2, {
    lastError: "old failure",
    lastErrorType: "upstream_error",
    lastErrorAt: new Date(Date.now() - 3600_000).toISOString(),
  });
  const res = await h.handleChat(
    h.buildRequest({
      body: {
        model: "codex/gpt-5.6-luna",
        stream: false,
        messages: [{ role: "user", content: `rotate ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  const row = (await providersDb.getProviderConnectionById(b)) as Record<string, unknown>;
  assert.equal(row.lastError ?? null, null);
});
