/**
 * Reasoning tokens must survive the OpenAI → Claude response pivot.
 *
 * Responses-API upstreams (Codex) report `output_tokens_details.reasoning_tokens`.
 * The Responses → OpenAI hop already maps it to
 * `completion_tokens_details.reasoning_tokens`, but the OpenAI → Claude hop
 * rebuilt the shared `state.usage` with only input/output/cache counters, so
 * the streaming usage row recorded `tokens_reasoning = 0` for Claude-format
 * clients (e.g. `/v1/messages` → Codex). The count is kept on `state.usage`
 * for accounting only — the client-facing `message_delta.usage` keeps the
 * Anthropic shape.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { translateResponse, initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { getReasoningTokens } = await import("../../src/lib/usage/tokenAccounting.ts");

type Usage = Record<string, unknown>;
type ClaudeEvent = { type?: string; usage?: Usage };

function newState(): Record<string, unknown> {
  return { toolCalls: new Map() };
}

test("Responses upstream → Claude client keeps reasoning_tokens on state.usage", () => {
  const state = initState(FORMATS.CLAUDE) as Record<string, unknown>;
  translateResponse(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    {
      type: "response.output_text.delta",
      item_id: "msg_1",
      output_index: 0,
      content_index: 0,
      delta: "Hello",
    },
    state
  );
  const translated = translateResponse(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    {
      type: "response.completed",
      response: {
        id: "resp_1",
        status: "completed",
        output: [],
        usage: {
          input_tokens: 100,
          output_tokens: 900,
          total_tokens: 1000,
          output_tokens_details: { reasoning_tokens: 512 },
        },
      },
    },
    state
  ) as ClaudeEvent[];

  const usage = state.usage as Usage;
  assert.equal(usage.reasoning_tokens, 512);
  // Reasoning is a subset of output — never added on top of it.
  assert.equal(usage.output_tokens, 900);
  assert.equal(getReasoningTokens(usage), 512);

  const delta = translated.find((e) => e.type === "message_delta");
  assert.ok(delta, "expected a message_delta event");
  assert.equal(delta.usage?.output_tokens, 900);
  assert.equal(delta.usage?.reasoning_tokens, undefined);
});

test("OpenAI completion_tokens_details.reasoning_tokens is kept on state.usage", () => {
  const state = newState();
  openaiToClaudeResponse(
    {
      id: "chatcmpl-reasoning",
      model: "openai/gpt-5",
      choices: [],
      usage: {
        prompt_tokens: 40,
        completion_tokens: 300,
        total_tokens: 340,
        completion_tokens_details: { reasoning_tokens: 200 },
      },
    },
    state
  );
  assert.deepEqual(state.usage, {
    input_tokens: 40,
    output_tokens: 300,
    reasoning_tokens: 200,
  });
});

test("Responses-named output_tokens_details and flat reasoning_tokens are both read", () => {
  const nested = newState();
  openaiToClaudeResponse(
    {
      id: "chatcmpl-nested",
      choices: [],
      usage: {
        input_tokens: 10,
        output_tokens: 90,
        output_tokens_details: { reasoning_tokens: 60 },
      },
    },
    nested
  );
  assert.equal((nested.usage as Usage).reasoning_tokens, 60);

  const flat = newState();
  openaiToClaudeResponse(
    {
      id: "chatcmpl-flat",
      choices: [],
      usage: { prompt_tokens: 10, completion_tokens: 90, reasoning_tokens: 30 },
    },
    flat
  );
  assert.equal((flat.usage as Usage).reasoning_tokens, 30);
});

test("zero/absent reasoning does not add a reasoning_tokens key", () => {
  const state = newState();
  openaiToClaudeResponse(
    {
      id: "chatcmpl-none",
      choices: [],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 5,
        completion_tokens_details: { reasoning_tokens: 0 },
      },
    },
    state
  );
  assert.deepEqual(state.usage, { input_tokens: 10, output_tokens: 5 });
});

test("message_delta.usage keeps the Anthropic shape when reasoning is present", () => {
  const state = newState();
  openaiToClaudeResponse(
    {
      id: "chatcmpl-delta-shape",
      model: "openai/gpt-5",
      choices: [{ index: 0, delta: { content: "hi" }, finish_reason: null }],
    },
    state
  );
  const events = openaiToClaudeResponse(
    {
      id: "chatcmpl-delta-shape",
      model: "openai/gpt-5",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: {
        prompt_tokens: 120,
        completion_tokens: 80,
        prompt_tokens_details: { cached_tokens: 20 },
        completion_tokens_details: { reasoning_tokens: 50 },
      },
    },
    state
  ) as ClaudeEvent[];
  const delta = events.find((e) => e.type === "message_delta");
  assert.ok(delta, "expected a message_delta event");
  assert.deepEqual(delta.usage, {
    input_tokens: 100,
    output_tokens: 80,
    cache_read_input_tokens: 20,
  });
  assert.equal((state.usage as Usage).reasoning_tokens, 50);
});

test("getReasoningTokens reads Responses-API output_tokens_details", () => {
  assert.equal(
    getReasoningTokens({ output_tokens: 900, output_tokens_details: { reasoning_tokens: 300 } }),
    300
  );
  // Existing shapes keep working.
  assert.equal(getReasoningTokens({ completion_tokens_details: { reasoning_tokens: 7 } }), 7);
  assert.equal(getReasoningTokens({ reasoning_tokens: 5 }), 5);
  assert.equal(getReasoningTokens({ reasoning: 4 }), 4);
  assert.equal(getReasoningTokens({ output_tokens: 10 }), 0);
});
