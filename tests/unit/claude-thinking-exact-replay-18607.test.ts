/**
 * #18607 — restored signed thinking must land where Claude emitted it, once.
 *
 * The store only kept a flat list of thinking blocks; openai-to-claude unshifted
 * them to the front of every assistant fragment that carried any owning tool_use.
 * Interleaved layouts were reordered and fragmented turns replayed the blocks twice.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { clearClaudeThinkingStore } from "../../open-sse/services/claudeThinkingStore.ts";
import { claudeToOpenAIResponse } from "../../open-sse/translator/response/claude-to-openai.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const MODEL = "claude-opus-5-5";
const T1 = { type: "thinking", thinking: "SYNTHETIC_1", signature: "SYNTHETIC_SIG_1" };
const T2 = { type: "redacted_thinking", data: "SYNTHETIC_OPAQUE_2" };
const digest = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

/** Replay a Claude stream whose content is [T1, text, tool_use A, T2, tool_use B]. */
function captureInterleavedTurn() {
  clearClaudeThinkingStore();
  const state: Record<string, unknown> = { provider: "claude", toolCalls: new Map() };
  const events = [
    { type: "message_start", message: { id: "msg_1", model: MODEL } },
    { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: T1.thinking },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "signature_delta", signature: T1.signature },
    },
    { type: "content_block_stop", index: 0 },
    { type: "content_block_start", index: 1, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "Reading A" } },
    { type: "content_block_stop", index: 1 },
    {
      type: "content_block_start",
      index: 2,
      content_block: { type: "tool_use", id: "toolu_A", name: "read", input: {} },
    },
    {
      type: "content_block_delta",
      index: 2,
      delta: { type: "input_json_delta", partial_json: "{}" },
    },
    { type: "content_block_stop", index: 2 },
    {
      type: "content_block_start",
      index: 3,
      content_block: { type: "redacted_thinking", data: T2.data },
    },
    { type: "content_block_stop", index: 3 },
    {
      type: "content_block_start",
      index: 4,
      content_block: { type: "tool_use", id: "toolu_B", name: "read", input: {} },
    },
    {
      type: "content_block_delta",
      index: 4,
      delta: { type: "input_json_delta", partial_json: "{}" },
    },
    { type: "content_block_stop", index: 4 },
    { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 5 } },
    { type: "message_stop" },
  ];
  for (const event of events) claudeToOpenAIResponse(event, state);
}

const toolCall = (id: string) => ({
  id,
  type: "function",
  function: { name: "read", arguments: "{}" },
});

function translate(assistantMessages: Array<Record<string, unknown>>) {
  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    MODEL,
    {
      reasoning_effort: "high",
      messages: [
        { role: "user", content: "Synthetic task" },
        ...assistantMessages,
        { role: "tool", tool_call_id: "toolu_A", content: "A" },
        { role: "tool", tool_call_id: "toolu_B", content: "B" },
      ],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
    },
    false,
    {},
    "claude"
  ) as { messages: Array<{ role: string; content: Array<Record<string, unknown>> }> };
  return result.messages
    .filter((m) => m.role === "assistant")
    .map((m) => m.content.map(({ cache_control: _c, ...b }) => b));
}

const stripToolUse = (b: Record<string, unknown>) =>
  b.type === "tool_use" ? { type: "tool_use", id: b.id } : b;

test("#18607(a): restored blocks keep their original content index", () => {
  captureInterleavedTurn();
  const [turn] = translate([
    {
      role: "assistant",
      content: "Reading A",
      tool_calls: [toolCall("toolu_A"), toolCall("toolu_B")],
    },
  ]);
  assert.deepEqual(
    turn.map(stripToolUse).map(digest),
    [
      T1,
      { type: "text", text: "Reading A" },
      { type: "tool_use", id: "toolu_A" },
      T2,
      { type: "tool_use", id: "toolu_B" },
    ].map(digest),
    "exact original layout: [thinking, text, tool_use, redacted_thinking, tool_use]"
  );
  clearClaudeThinkingStore();
});

test("#18607(b): a turn the client split into [text] + [tool_calls] messages replays each block once, before its own tool_use", () => {
  captureInterleavedTurn();
  const [turn] = translate([
    { role: "assistant", content: "Reading A" },
    { role: "assistant", content: null, tool_calls: [toolCall("toolu_A"), toolCall("toolu_B")] },
  ]);
  assert.deepEqual(
    turn.map(stripToolUse).map(digest),
    // shortcut: text that lives in another fragment stays where the client put it,
    // upgrade when a client is seen splitting text away from its tool_calls.
    [
      { type: "text", text: "Reading A" },
      T1,
      { type: "tool_use", id: "toolu_A" },
      T2,
      { type: "tool_use", id: "toolu_B" },
    ].map(digest),
    "merged fragments: every signed block once, directly before the tool_use it preceded"
  );
  clearClaudeThinkingStore();
});

test("#18607(b) negative: a history that only carries toolu_B gets T2, never toolu_A's T1", () => {
  captureInterleavedTurn();
  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    MODEL,
    {
      reasoning_effort: "high",
      messages: [
        { role: "user", content: "Synthetic task" },
        { role: "assistant", content: null, tool_calls: [toolCall("toolu_B")] },
        { role: "tool", tool_call_id: "toolu_B", content: "B" },
      ],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
    },
    false,
    {},
    "claude"
  ) as { messages: Array<{ role: string; content: Array<Record<string, unknown>> }> };
  const [turn] = result.messages
    .filter((m) => m.role === "assistant")
    .map((m) => m.content.map(({ cache_control: _c, ...b }) => b));
  assert.deepEqual(
    turn.map(stripToolUse).map(digest),
    [T2, { type: "tool_use", id: "toolu_B" }].map(digest)
  );
  clearClaudeThinkingStore();
});

test("#18607 negative: a different model restores nothing from the layout store", () => {
  captureInterleavedTurn();
  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-sonnet-4-5",
    {
      reasoning_effort: "high",
      messages: [
        { role: "user", content: "Synthetic task" },
        {
          role: "assistant",
          content: "Reading A",
          tool_calls: [toolCall("toolu_A"), toolCall("toolu_B")],
        },
        { role: "tool", tool_call_id: "toolu_A", content: "A" },
        { role: "tool", tool_call_id: "toolu_B", content: "B" },
      ],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
    },
    false,
    {},
    "claude"
  ) as { messages: Array<{ role: string; content: Array<Record<string, unknown>> }> };
  const signed = result.messages
    .filter((m) => m.role === "assistant")
    .flatMap((m) => m.content)
    .filter((b) => b.type === "thinking" || (b.type === "redacted_thinking" && b.data === T2.data));
  assert.equal(signed.length, 0, "model binding still fails closed");
  clearClaudeThinkingStore();
});
