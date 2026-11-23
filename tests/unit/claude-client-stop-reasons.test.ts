import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");
const { translateNonStreamingResponse } = await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function streamedStopReason(finishReason: string): unknown {
  const state = { toolCalls: new Map() };
  const base = { id: "chatcmpl-stop", model: "gpt-test" };
  const events = [
    openaiToClaudeResponse(
      { ...base, choices: [{ index: 0, delta: { role: "assistant", content: "partial" }, finish_reason: null }] },
      state
    ),
    openaiToClaudeResponse(
      {
        ...base,
        choices: [{ index: 0, delta: {}, finish_reason: finishReason }],
        usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
      },
      state
    ),
    openaiToClaudeResponse(null, state),
  ].flatMap((items) => items || []);
  return events.find((event) => event?.type === "message_delta")?.delta?.stop_reason;
}

function nonStreamingStopReason(finishReason: string): unknown {
  const body = {
    id: "chatcmpl-stop",
    object: "chat.completion",
    model: "gpt-test",
    choices: [{ index: 0, message: { role: "assistant", content: "partial" }, finish_reason: finishReason }],
    usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
  };
  return (translateNonStreamingResponse(body, FORMATS.OPENAI, FORMATS.CLAUDE) as Record<string, unknown>)
    .stop_reason;
}

function geminiStopReason(finishReason: string): unknown {
  const events = geminiToClaudeResponse(
    {
      responseId: "resp-stop",
      modelVersion: "gemini-2.5-pro",
      candidates: [{ content: { parts: [{ text: "partial" }] }, finishReason }],
      usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2, totalTokenCount: 5 },
    },
    {}
  );
  return events.find((event) => event?.type === "message_delta")?.delta?.stop_reason;
}

test("OpenAI to Claude, streaming: a content filter stop reaches a Claude client as a refusal", () => {
  assert.equal(streamedStopReason("content_filter"), "refusal");
});

test("OpenAI to Claude, streaming: the existing stop reason mappings are unchanged", () => {
  assert.equal(streamedStopReason("stop"), "end_turn");
  assert.equal(streamedStopReason("length"), "max_tokens");
  assert.equal(streamedStopReason("tool_calls"), "tool_use");
});

test("OpenAI to Claude, non-streaming: length becomes max_tokens, as in the streaming path", () => {
  assert.equal(nonStreamingStopReason("length"), "max_tokens");
});

test("OpenAI to Claude, non-streaming: a content filter stop becomes a refusal", () => {
  assert.equal(nonStreamingStopReason("content_filter"), "refusal");
});

test("OpenAI to Claude, non-streaming: stop and tool_calls keep their mappings", () => {
  assert.equal(nonStreamingStopReason("stop"), "end_turn");
  assert.equal(nonStreamingStopReason("tool_calls"), "tool_use");
});

test("Gemini to Claude: a safety, recitation or blocklist stop reaches a Claude client as a refusal", () => {
  for (const reason of ["SAFETY", "RECITATION", "BLOCKLIST"]) {
    assert.equal(geminiStopReason(reason), "refusal", reason);
  }
});

test("Gemini to Claude: STOP and MAX_TOKENS keep their mappings", () => {
  assert.equal(geminiStopReason("STOP"), "end_turn");
  assert.equal(geminiStopReason("MAX_TOKENS"), "max_tokens");
});
