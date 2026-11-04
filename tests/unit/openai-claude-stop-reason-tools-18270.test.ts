/**
 * Regression test for #18270: Claude Code agentic loop stops after one turn
 * when the OpenAI upstream returns `tool_calls` with `finish_reason: "stop"`.
 *
 * Both the non-streaming (`convertOpenAINonStreamingToClaude` in
 * `open-sse/handlers/responseTranslator.ts`) and streaming (`openaiToClaudeResponse`
 * in `open-sse/translator/response/openai-to-claude.ts`) translators trusted
 * `finish_reason` verbatim, emitting `stop_reason: "end_turn"` together with
 * `tool_use` blocks. Claude Code requires `stop_reason: "tool_use"` to continue
 * the loop, so it stopped after a single response without reaching the objective.
 *
 * Some OpenAI-compatible gateways (GLM, DeepSeek, Kimi, OpenRouter variants)
 * emit `finish_reason: "stop"` even when `tool_calls` are present, so the
 * override must key off the presence of tool calls, not the finish reason.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";

function toolCallsMessage() {
  return {
    role: "assistant",
    content: "",
    tool_calls: [
      {
        id: "call_18270",
        type: "function",
        function: {
          name: "Read",
          arguments: JSON.stringify({ file_path: "/tmp/test.txt" }),
        },
      },
    ],
  };
}

test("#18270 non-streaming: tool_calls + finish_reason stop => stop_reason tool_use", () => {
  const claude = translateNonStreamingResponse(
    {
      id: "chatcmpl-18270",
      object: "chat.completion",
      created: 1234567890,
      model: "gpt-test",
      choices: [{ index: 0, message: toolCallsMessage(), finish_reason: "stop" }],
      usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  ) as unknown as { stop_reason: string; content: Array<{ type: string }> };

  assert.ok(
    claude.content.some((block) => block.type === "tool_use"),
    "expected a tool_use block in the translated content"
  );
  assert.equal(
    claude.stop_reason,
    "tool_use",
    `tool_use present but stop_reason=${claude.stop_reason} — Claude Code stops the loop`
  );
});

test("#18270 non-streaming no-regression: text-only stop still maps to end_turn", () => {
  const claude = translateNonStreamingResponse(
    {
      id: "chatcmpl-18270-text",
      object: "chat.completion",
      created: 1234567890,
      model: "gpt-test",
      choices: [
        { index: 0, message: { role: "assistant", content: "done" }, finish_reason: "stop" },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 },
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  ) as unknown as { stop_reason: string };

  assert.equal(claude.stop_reason, "end_turn");
});

test("#18270 non-streaming no-regression: refusal still maps to refusal", () => {
  const claude = translateNonStreamingResponse(
    {
      id: "chatcmpl-18270-refusal",
      object: "chat.completion",
      created: 1234567890,
      model: "gpt-test",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "blocked" },
          finish_reason: "content_filter",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 },
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  ) as unknown as { stop_reason: string };

  assert.equal(claude.stop_reason, "refusal");
});

function streamingToolCallState() {
  return { toolCalls: new Map() };
}

test("#18270 streaming: tool_calls + finish_reason stop => message_delta tool_use", () => {
  const state = streamingToolCallState();

  const events = [
    openaiToClaudeResponse(
      {
        id: "chatcmpl-18270-s",
        model: "gpt-test",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_18270",
                  type: "function",
                  function: { name: "Read", arguments: '{"file_path":' },
                },
              ],
            },
            finish_reason: null,
          },
        ],
      },
      state
    ),
    openaiToClaudeResponse(
      {
        id: "chatcmpl-18270-s",
        model: "gpt-test",
        choices: [
          {
            index: 0,
            delta: { tool_calls: [{ index: 0, function: { arguments: '"/tmp/a.txt"}' } }] },
            finish_reason: null,
          },
        ],
      },
      state
    ),
    openaiToClaudeResponse(
      {
        id: "chatcmpl-18270-s",
        model: "gpt-test",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
      },
      state
    ),
  ].flatMap((chunk) => chunk || []) as Array<Record<string, unknown>>;

  const toolUseStarts = events.filter(
    (event) =>
      event?.type === "content_block_start" &&
      (event.content_block as Record<string, unknown>)?.type === "tool_use"
  );
  assert.ok(toolUseStarts.length > 0, "expected a tool_use content_block_start");

  const messageDelta = events.find((event) => event?.type === "message_delta") as
    { delta: { stop_reason?: string } } | undefined;
  assert.ok(messageDelta, "expected a terminal message_delta event");
  assert.equal(
    messageDelta.delta.stop_reason,
    "tool_use",
    `tool_use emitted but stop_reason=${messageDelta.delta.stop_reason} — Claude Code stops the loop`
  );
});

test("#18270 streaming no-regression: text-only stop still maps to end_turn", () => {
  const state = streamingToolCallState();

  const events = [
    openaiToClaudeResponse(
      {
        id: "chatcmpl-18270-t",
        model: "gpt-test",
        choices: [{ index: 0, delta: { content: "done" }, finish_reason: null }],
      },
      state
    ),
    openaiToClaudeResponse(
      {
        id: "chatcmpl-18270-t",
        model: "gpt-test",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 },
      },
      state
    ),
  ].flatMap((chunk) => chunk || []) as Array<Record<string, unknown>>;

  const messageDelta = events.find((event) => event?.type === "message_delta") as
    { delta: { stop_reason?: string } } | undefined;
  assert.ok(messageDelta, "expected a terminal message_delta event");
  assert.equal(messageDelta.delta.stop_reason, "end_turn");
});
