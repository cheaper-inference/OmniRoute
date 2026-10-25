import test from "node:test";
import assert from "node:assert/strict";

const { translateNonStreamingResponse } = await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function claudeBody(stopReason: string) {
  return {
    id: "msg_stop",
    type: "message",
    role: "assistant",
    model: "claude-test",
    content: [{ type: "text", text: "partial" }],
    stop_reason: stopReason,
    usage: { input_tokens: 3, output_tokens: 2 },
  };
}

function openaiFinish(stopReason: string): unknown {
  const out = translateNonStreamingResponse(claudeBody(stopReason), FORMATS.CLAUDE, FORMATS.OPENAI) as {
    choices?: Array<{ finish_reason?: unknown }>;
  };
  return out.choices?.[0]?.finish_reason;
}

function geminiFinish(stopReason: string): unknown {
  type GeminiBody = { candidates?: Array<{ finishReason?: unknown }> };
  const out = translateNonStreamingResponse(claudeBody(stopReason), FORMATS.CLAUDE, FORMATS.GEMINI) as GeminiBody & {
    response?: GeminiBody;
  };
  return (out.candidates ?? out.response?.candidates)?.[0]?.finishReason;
}

test("non-streaming Claude refusal reaches an OpenAI-shaped body as content_filter", () => {
  assert.equal(openaiFinish("refusal"), "content_filter");
});

test("non-streaming Claude context-window stop reaches an OpenAI-shaped body as length", () => {
  assert.equal(openaiFinish("model_context_window_exceeded"), "length");
});

test("non-streaming Claude stop_sequence and pause_turn reach an OpenAI-shaped body as stop", () => {
  assert.equal(openaiFinish("stop_sequence"), "stop");
  assert.equal(openaiFinish("pause_turn"), "stop");
});

test("a Gemini client sees a Claude refusal as SAFETY, not as a clean STOP", () => {
  assert.equal(geminiFinish("refusal"), "SAFETY");
});

test("a Gemini client sees a Claude context-window stop as MAX_TOKENS", () => {
  assert.equal(geminiFinish("model_context_window_exceeded"), "MAX_TOKENS");
});

test("existing non-streaming mappings are unchanged", () => {
  assert.equal(openaiFinish("end_turn"), "stop");
  assert.equal(openaiFinish("tool_use"), "tool_calls");
  assert.equal(openaiFinish("max_tokens"), "length");
  assert.equal(geminiFinish("end_turn"), "STOP");
  assert.equal(geminiFinish("max_tokens"), "MAX_TOKENS");
});
