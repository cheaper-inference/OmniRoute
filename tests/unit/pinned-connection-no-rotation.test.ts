// The x-omniroute-connection pin is documented as strict: a failure on the pinned account must
// record the cooldown, not rotate to a sibling account inside the provider execution pipeline.
// Covers both legs; the pin flag must reach both policy builders.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("pinned-connection-no-rotation");
const providersDb = await import("../../src/lib/db/providers.ts");
const TOK = { pinned: "fixture-token-pinned-a", sibling: "fixture-token-sibling-b" };
let upstreamTokens: string[] = [];

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

async function mk(name: string, token: string, priority: number) {
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
  });
  return String(c.id);
}

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await h.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  upstreamTokens = [];
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!/chatgpt\.com\/backend-api\/codex\/responses/.test(url))
      return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
    const token = (new Headers(init.headers).get("authorization") || "").replace(/^Bearer\s+/i, "");
    upstreamTokens.push(token);
    if (token === TOK.pinned)
      return new Response(
        JSON.stringify({ error: { type: "usage_limit_reached", message: "limit reached" } }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
      );
    return completedSse("served by sibling");
  };
});
test.after(() => h.cleanup());

for (const stream of [false, true]) {
  test(`stream=${stream}: pinned codex account that gets 429 must NOT rotate to a sibling`, async () => {
    const pinned = await mk("codex-pinned", TOK.pinned, 1);
    await mk("codex-sibling", TOK.sibling, 2);

    const res = await h.handleChat(
      h.buildRequest({
        headers: { "x-omniroute-connection": pinned },
        body: {
          model: "codex/gpt-5.6-luna",
          stream,
          messages: [{ role: "user", content: `hi ${crypto.randomUUID()}` }],
        },
      })
    );
    await res.text();

    assert.ok(
      !upstreamTokens.includes(TOK.sibling),
      `request was served by sibling account (status ${res.status})`
    );
    assert.notEqual(res.status, 200, "pinned request must fail, not succeed via a sibling account");
  });
}

test("non-stream: unpinned codex 429 still rotates to a sibling account", async () => {
  await mk("codex-pinned", TOK.pinned, 1);
  await mk("codex-sibling", TOK.sibling, 2);

  const res = await h.handleChat(
    h.buildRequest({
      body: {
        model: "codex/gpt-5.6-luna",
        stream: false,
        messages: [{ role: "user", content: `hi ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();

  assert.ok(
    upstreamTokens.includes(TOK.sibling),
    "in-pipeline account rotation must keep working without a pin"
  );
});
