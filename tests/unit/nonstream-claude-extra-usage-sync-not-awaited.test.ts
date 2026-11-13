// The Claude extra-usage sync fetches the live usage endpoint (up to 10 s). The streaming path
// fires it without waiting; the non-streaming path must not hold the client response for it.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const USAGE_DELAY_MS = 1500;
const h = await createChatPipelineHarness("nonstream-extra-usage-sync");
const providersDb = await import("../../src/lib/db/providers.ts");
let usageCalls = 0;

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  usageCalls = 0;
  globalThis.fetch = async (input) => {
    const url = String(input instanceof Request ? input.url : input);
    if (/anthropic\.com\/v1\/messages/.test(url)) {
      return new Response(
        JSON.stringify({
          id: "msg_1",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-5-20250929",
          content: [{ type: "text", text: "hello" }],
          stop_reason: "end_turn",
          usage: { input_tokens: 3, output_tokens: 2 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (/anthropic\.com\/api\/oauth\/usage/.test(url)) {
      usageCalls++;
      await new Promise((resolve) => setTimeout(resolve, USAGE_DELAY_MS));
      return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
  };
});
test.after(() => h.cleanup());

test("non-stream Claude success does not wait for the extra-usage sync", async () => {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "extra-usage-sync",
    accessToken: `at-${crypto.randomUUID()}`,
    refreshToken: `rt-${crypto.randomUUID()}`,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    priority: 1,
    providerSpecificData: {},
  });
  const started = Date.now();
  const res = await h.handleChat(
    h.buildRequest({
      body: {
        model: "claude/claude-sonnet-4-5-20250929",
        stream: false,
        max_tokens: 16,
        messages: [{ role: "user", content: `hi ${crypto.randomUUID()}` }],
      },
    })
  );
  const body = await res.text();
  const elapsed = Date.now() - started;
  assert.equal(res.status, 200, body);
  assert.ok(usageCalls >= 1, "the extra-usage sync still runs");
  assert.ok(elapsed < USAGE_DELAY_MS, `client waited ${elapsed}ms for the usage fetch`);
  // Let the detached sync finish before the harness tears down the DB.
  await new Promise((resolve) => setTimeout(resolve, USAGE_DELAY_MS + 200));
});
