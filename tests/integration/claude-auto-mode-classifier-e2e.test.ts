/**
 * Auto mode server-side classifier review through OmniRoute — end to end (#17899).
 *
 * Contract (https://code.claude.com/docs/en/auto-mode-classifier-billing and
 * https://code.claude.com/docs/en/llm-gateway-protocol#beta-header-and-body-field-pairs):
 *
 *   Requests  — the gateway forwards the `anthropic-beta` header and the `safeguards`
 *               body field unchanged; the two travel as a pair.
 *   Responses — the gateway returns responses and streaming events without dropping
 *               fields or rewriting tool-use IDs, and keeps `safeguard_results`.
 *
 * When either half is lost, Claude Code falls back to its own (billed) classifier
 * requests and shows "this session isn't eligible". The unit suite
 * `tests/unit/anthropic-auto-mode-classifier-beta.test.ts` covers the pieces (beta
 * allowlist, buildHeaders, the passthrough TransformStream). This suite drives the
 * REAL incoming `POST /v1/messages` route with a fake Anthropic upstream and checks
 * every element of the contract in both directions, streamed and non-streamed, for the
 * two pass-through targets (native `claude`, `anthropic-compatible-*` nodes).
 *
 * Billing itself is decided upstream; this proves only the gateway's wire behavior.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("auto-mode-classifier-e2e");
const { BaseExecutor, resetStorage, seedConnection, toPlainHeaders } = harness;
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

const AUTO_MODE_BETA = "dangerous-tool-use-2026-09-03";
const AFK_MODE_BETA = "afk-mode-2026-01-31";
// Shape of the header Claude Code sends in auto mode (#14186 capture).
const CLIENT_BETA_HEADER = [
  "claude-code-20250219",
  "interleaved-thinking-2025-05-14",
  "context-management-2025-06-27",
  "effort-2025-11-24",
  AFK_MODE_BETA,
  AUTO_MODE_BETA,
].join(",");

const UPSTREAM_MODEL = "claude-sonnet-4-6";
// The previous turn's tool call the client already holds; the upstream must see it as-is.
const PRIOR_TOOL_USE_ID = "toolu_01PriorTurnAutoMode";
// The new tool call the server reviews in this turn.
const NEW_TOOL_USE_ID = "toolu_01ReviewedByServer";

// The request field is opaque to the gateway: whatever Claude Code sends must arrive
// byte-for-byte equal. Nested values make a partial rewrite visible.
const CLIENT_SAFEGUARDS = {
  dangerous_tool_use: { mode: "auto", policy: { version: 3, allow: ["Read"], deny: [] } },
};
const SAFEGUARD_RESULTS = [
  { type: "dangerous_tool_use", tool_use_id: NEW_TOOL_USE_ID, allowed: true, reason: null },
];

type Captured = { url: string; headers: Record<string, string>; body: Record<string, unknown> };

function clientBody(stream: boolean, model: string): Record<string, unknown> {
  return {
    model,
    max_tokens: 256,
    stream,
    safeguards: CLIENT_SAFEGUARDS,
    tools: [
      {
        name: "Bash",
        description: "Run a shell command",
        input_schema: {
          type: "object",
          properties: { command: { type: "string" } },
          required: ["command"],
        },
      },
    ],
    messages: [
      { role: "user", content: [{ type: "text", text: "list the files" }] },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: PRIOR_TOOL_USE_ID, name: "Bash", input: { command: "ls" } },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: PRIOR_TOOL_USE_ID, content: "a.txt" }],
      },
    ],
  };
}

function sseEvent(type: string, data: Record<string, unknown>): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`;
}

function upstreamSse(): string {
  return [
    sseEvent("message_start", {
      message: {
        id: "msg_auto_mode_stream",
        type: "message",
        role: "assistant",
        model: UPSTREAM_MODEL,
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 20, output_tokens: 1 },
      },
    }),
    sseEvent("content_block_start", {
      index: 0,
      content_block: { type: "tool_use", id: NEW_TOOL_USE_ID, name: "Bash", input: {} },
    }),
    sseEvent("content_block_delta", {
      index: 0,
      delta: { type: "input_json_delta", partial_json: '{"command":"cat a.txt"}' },
    }),
    sseEvent("content_block_stop", { index: 0 }),
    sseEvent("message_delta", {
      delta: { stop_reason: "tool_use", stop_sequence: null, safeguard_results: SAFEGUARD_RESULTS },
      usage: { output_tokens: 12 },
    }),
    sseEvent("message_stop", {}),
  ].join("");
}

function upstreamJson(): Record<string, unknown> {
  return {
    id: "msg_auto_mode_json",
    type: "message",
    role: "assistant",
    model: UPSTREAM_MODEL,
    content: [
      { type: "tool_use", id: NEW_TOOL_USE_ID, name: "Bash", input: { command: "cat a.txt" } },
    ],
    stop_reason: "tool_use",
    stop_sequence: null,
    safeguard_results: SAFEGUARD_RESULTS,
    usage: { input_tokens: 20, output_tokens: 12 },
  };
}

// Answers in the shape the upstream request asked for: OmniRoute may stream upstream even
// when the client asked for JSON (Claude-Code-compatible relays), then fold the SSE back.
function installFakeAnthropicUpstream(): Captured[] {
  const calls: Captured[] = [];
  globalThis.fetch = async (url: string | URL | Request, init: RequestInit = {}) => {
    const body = init.body ? JSON.parse(String(init.body)) : {};
    calls.push({ url: String(url), headers: toPlainHeaders(init.headers), body });
    if (body.stream === true) {
      return new Response(upstreamSse(), {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }
    return Response.json(upstreamJson(), { status: 200 });
  };
  return calls;
}

function postMessages(body: Record<string, unknown>, beta: string | null): Promise<Response> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "anthropic-version": "2023-06-01",
    "user-agent": "claude-cli/2.1.300 (external, cli)",
  };
  if (beta !== null) headers["anthropic-beta"] = beta;
  return messagesRoute.POST(
    new Request("http://localhost:20128/v1/messages", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
  );
}

function betaTokens(headers: Record<string, string>): string[] {
  return (headers["anthropic-beta"] ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

function messagesCalls(calls: Captured[]): Captured[] {
  return calls.filter((call) => /\/v1\/messages(\?|$)/.test(call.url));
}

function assertRequestHalf(sent: Captured) {
  const tokens = betaTokens(sent.headers);
  assert.ok(tokens.includes(AUTO_MODE_BETA), `upstream beta lost ${AUTO_MODE_BETA}: ${tokens}`);
  assert.ok(tokens.includes(AFK_MODE_BETA), `upstream beta lost ${AFK_MODE_BETA}: ${tokens}`);
  assert.deepEqual(sent.body.safeguards, CLIENT_SAFEGUARDS, "safeguards body field rewritten");

  const messages = sent.body.messages as Array<{ content: Array<Record<string, unknown>> }>;
  const blocks = messages.flatMap((message) =>
    Array.isArray(message.content) ? message.content : []
  );
  const toolUse = blocks.find((block) => block.type === "tool_use");
  const toolResult = blocks.find((block) => block.type === "tool_result");
  assert.equal(toolUse?.id, PRIOR_TOOL_USE_ID, "prior tool_use id rewritten on the way up");
  assert.equal(toolResult?.tool_use_id, PRIOR_TOOL_USE_ID, "tool_result id rewritten");
}

let originalRetryDelay = 0;

test.before(() => {
  originalRetryDelay = BaseExecutor.RETRY_CONFIG.delayMs;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
});

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelay;
  await harness.cleanup();
});

type Target = { label: string; model: string; seed: () => Promise<unknown> };

const TARGETS: Target[] = [
  {
    label: "native claude",
    model: `claude/${UPSTREAM_MODEL}`,
    seed: () => seedConnection("claude", { apiKey: "sk-ant-auto-mode" }),
  },
  {
    label: "anthropic-compatible node",
    model: `acgw/${UPSTREAM_MODEL}`,
    seed: () => seedCompatibleNode("anthropic-compatible-automode", "acgw"),
  },
];

async function seedCompatibleNode(id: string, prefix: string) {
  const providerSpecificData = {
    baseUrl: "https://gateway.example",
    chatPath: "/v1/messages",
    modelsPath: "/v1/models",
  };
  await providersDb.createProviderNode({
    id,
    type: "anthropic-compatible",
    name: `Auto mode ${prefix}`,
    prefix,
    ...providerSpecificData,
  });
  return seedConnection(id, { apiKey: `sk-${prefix}-auto-mode`, providerSpecificData });
}

type SseEvent = {
  type?: string;
  content_block?: { id?: string };
  delta?: { safeguard_results?: unknown };
};

function parseSseEvents(transcript: string): SseEvent[] {
  return transcript
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice("data: ".length))
    .filter((data) => data.startsWith("{"))
    .map((data) => JSON.parse(data) as SseEvent);
}

for (const target of TARGETS) {
  test(`${target.label} / streamed: beta+safeguards reach the upstream; safeguard_results and tool_use id reach the client`, async () => {
    await target.seed();
    const calls = installFakeAnthropicUpstream();

    const response = await postMessages(clientBody(true, target.model), CLIENT_BETA_HEADER);
    const transcript = await response.text();
    assert.equal(response.status, 200, transcript);
    assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/);

    const sent = messagesCalls(calls);
    assert.equal(sent.length, 1, "exactly one upstream Messages call");
    assertRequestHalf(sent[0]);

    const events = parseSseEvents(transcript);
    const blockStart = events.find((event) => event.type === "content_block_start");
    const messageDelta = events.find((event) => event.type === "message_delta");
    assert.equal(blockStart?.content_block?.id, NEW_TOOL_USE_ID, "tool_use id rewritten");
    assert.deepEqual(
      messageDelta?.delta?.safeguard_results,
      SAFEGUARD_RESULTS,
      "message_delta.delta.safeguard_results dropped or rewritten"
    );
    assert.ok(
      events.some((event) => event.type === "message_stop"),
      "stream must end with message_stop (a cut stream means no verdict)"
    );
  });

  test(`${target.label} / non-streamed: beta+safeguards reach the upstream; safeguard_results and tool_use id reach the client`, async () => {
    await target.seed();
    const calls = installFakeAnthropicUpstream();

    const response = await postMessages(clientBody(false, target.model), CLIENT_BETA_HEADER);
    const text = await response.text();
    assert.equal(response.status, 200, text);
    const json = JSON.parse(text);

    const sent = messagesCalls(calls);
    assert.equal(sent.length, 1, "exactly one upstream Messages call");
    assertRequestHalf(sent[0]);

    const content: Array<{ type?: string; id?: string }> = json.content ?? [];
    const toolUse = content.find((block) => block.type === "tool_use");
    assert.equal(toolUse?.id, NEW_TOOL_USE_ID, "tool_use id rewritten");
    assert.deepEqual(
      json.safeguard_results,
      SAFEGUARD_RESULTS,
      "top-level safeguard_results dropped or rewritten"
    );
  });
}

test("native claude without the paired beta drops safeguards instead of sending an unpaired field", async () => {
  await seedConnection("claude", { apiKey: "sk-ant-auto-mode-unpaired" });
  const calls = installFakeAnthropicUpstream();

  const response = await postMessages(
    clientBody(false, `claude/${UPSTREAM_MODEL}`),
    "claude-code-20250219"
  );
  assert.equal(response.status, 200, await response.text());

  const sent = messagesCalls(calls);
  assert.equal(sent.length, 1);
  assert.ok(!betaTokens(sent[0].headers).includes(AUTO_MODE_BETA), "beta must not be invented");
  assert.equal(
    sent[0].body.safeguards,
    undefined,
    "an unpaired safeguards field makes Anthropic answer 400 Extra inputs are not permitted"
  );
});

// Characterization, not the contract: a Claude-Code-compatible relay node
// (`anthropic-compatible-cc-*`) does not pass the client body through — the CC bridge
// rebuilds the request from a fixed field set (claudeCodeCompatible.ts). `safeguards`
// is not part of it, so these sessions get no server review and Claude Code falls back
// to its own classifier requests. That fallback is safe; what must never happen is an
// unpaired `safeguards` field reaching a relay. Flip this test if the bridge ever starts
// carrying the pair.
test("anthropic-compatible-cc node rebuilds the body without safeguards (client classifier fallback)", async () => {
  await seedCompatibleNode("anthropic-compatible-cc-automode", "ccgw");
  const calls = installFakeAnthropicUpstream();

  const response = await postMessages(
    clientBody(true, `ccgw/${UPSTREAM_MODEL}`),
    CLIENT_BETA_HEADER
  );
  assert.equal(response.status, 200, await response.text());

  const sent = messagesCalls(calls);
  assert.equal(sent.length, 1, "exactly one upstream Messages call");
  assert.equal(sent[0].body.safeguards, undefined);
});
