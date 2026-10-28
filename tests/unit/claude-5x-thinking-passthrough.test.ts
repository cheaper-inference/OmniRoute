// End-to-end request shaping for Claude 5.x adaptive thinking through handleChatCore:
// an Anthropic-format client (e.g. @ai-sdk/anthropic / OpenCode) sending
// `thinking: {type:"adaptive", display:"summarized"}` must reach the upstream unchanged
// for 5.x models (Haiku 5.x included — it is adaptive-only), while Haiku 4.5 keeps the
// manual `enabled` + budget shape it requires.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude5-thinking-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { isAdaptiveThinkingOnly } = await import("../../src/shared/constants/modelSpecs.ts");
const { normalizeClaudeAdaptiveThinking } =
  await import("../../open-sse/services/claudeAdaptiveThinking.ts");
const originalFetch = globalThis.fetch;

test.after(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const noopLog = { debug() {}, info() {}, warn() {}, error() {} };
const SSE = [
  "event: message_start",
  'data: {"type":"message_start","message":{"id":"m","type":"message","role":"assistant","model":"x","content":[],"usage":{"input_tokens":1,"output_tokens":0}}}',
  "",
  "event: message_stop",
  'data: {"type":"message_stop"}',
  "",
].join("\n");

async function upstreamThinking(
  provider: string,
  model: string,
  credentials: Record<string, unknown>,
  thinking: Record<string, unknown>
): Promise<Record<string, unknown> | undefined> {
  let sent: Record<string, unknown> | undefined;
  globalThis.fetch = (async (url: unknown, init: { body?: unknown } = {}) => {
    if (String(url).includes("/v1/messages")) sent = JSON.parse(String(init.body ?? "{}"));
    return new Response(SSE, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  }) as typeof globalThis.fetch;
  const body = {
    model,
    max_tokens: 32000,
    stream: true,
    thinking,
    system: [{ type: "text", text: "You are a coding agent." }],
    tools: [{ name: "read", description: "read", input_schema: { type: "object" } }],
    messages: [{ role: "user", content: "hi" }],
  };
  const headers = new Headers({
    "anthropic-beta": "interleaved-thinking-2025-05-14",
    "user-agent": "ai-sdk/anthropic",
  });
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider, model, extendedContext: false },
    credentials: { ...credentials, providerSpecificData: {} },
    log: noopLog,
    clientRawRequest: { endpoint: "/v1/messages", body: structuredClone(body), headers },
    userAgent: "ai-sdk/anthropic",
  } as never);
  await (result as { response: Response }).response.text();
  assert.ok(sent, "expected an upstream /v1/messages request");
  return sent.thinking as Record<string, unknown> | undefined;
}

const ADAPTIVE = { type: "adaptive", display: "summarized" };
const OAUTH = { accessToken: "sk-ant-oat-test-token" };
const API_KEY = { apiKey: "sk-ant-api-test" };

for (const [provider, creds] of [
  ["claude", OAUTH],
  ["anthropic", API_KEY],
] as const) {
  for (const model of ["claude-haiku-5-5", "claude-sonnet-5-5", "claude-opus-5-5"]) {
    test(`${provider}/${model}: adaptive + display summarized passes through unchanged`, async () => {
      assert.deepEqual(await upstreamThinking(provider, model, creds, ADAPTIVE), ADAPTIVE);
    });
  }

  test(`${provider}/claude-haiku-4-5: manual enabled + budget is kept`, async () => {
    const manual = { type: "enabled", budget_tokens: 2000, display: "summarized" };
    assert.deepEqual(
      await upstreamThinking(provider, "claude-haiku-4-5-20251001", creds, manual),
      manual
    );
  });
}

test("Claude Haiku 5.x is adaptive-only: a manual budget collapses to adaptive", () => {
  assert.equal(isAdaptiveThinkingOnly("claude-haiku-5-5"), true);
  assert.equal(isAdaptiveThinkingOnly("claude-haiku-4-5-20251001"), false);
  const out = normalizeClaudeAdaptiveThinking(
    { thinking: { type: "enabled", budget_tokens: 2000, display: "summarized" } },
    "claude-haiku-5-5"
  );
  assert.deepEqual(out.thinking, { type: "adaptive", display: "summarized" });
});
