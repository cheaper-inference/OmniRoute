import assert from "node:assert/strict";
import test from "node:test";
import { parseSSEToGeminiResponse } from "../../open-sse/handlers/sseParser/geminiResponse.ts";
import { isTruncatedStreamBody } from "../../open-sse/handlers/sseParser/truncation.ts";

const nativeTool = {
  functionCall: { id: "native-tool-fixture", name: "lookup", args: { query: "fixture" } },
};

function event(parts: Record<string, unknown>[], finishReason?: string): string {
  return `data: ${JSON.stringify({
    candidates: [{ content: { parts }, ...(finishReason ? { finishReason } : {}) }],
  })}\n\n`;
}

test("Gemini native tool-only output without a terminal signal is marked as truncated", () => {
  const result = parseSSEToGeminiResponse(event([nativeTool]), "gemini-fixture");
  assert.ok(result);
  assert.equal(isTruncatedStreamBody(result), true);
  assert.ok(Array.isArray(result.choices));
  assert.deepEqual(result.choices[0].message.tool_calls, [
    {
      id: "native-tool-fixture",
      index: 0,
      type: "function",
      function: { name: "lookup", arguments: '{"query":"fixture"}' },
    },
  ]);
  assert.equal(result.choices[0].finish_reason, "tool_calls");
});

test("Gemini native tool-only output with finishReason is not truncated", () => {
  const result = parseSSEToGeminiResponse(event([nativeTool], "STOP"), "gemini-fixture");
  assert.ok(result);
  assert.equal(isTruncatedStreamBody(result), false);
});

test("Gemini native tool-only output with DONE is not truncated", () => {
  const result = parseSSEToGeminiResponse(
    event([nativeTool]) + "data: [DONE]\n\n",
    "gemini-fixture"
  );
  assert.ok(result);
  assert.equal(isTruncatedStreamBody(result), false);
});

test("Gemini text plus tool output without a terminal signal remains truncated", () => {
  const result = parseSSEToGeminiResponse(
    event([{ text: "partial output" }, nativeTool]),
    "gemini-fixture"
  );
  assert.ok(result);
  assert.equal(isTruncatedStreamBody(result), true);
});

test("Gemini input with no visible output is still left to empty-turn handling", () => {
  assert.equal(parseSSEToGeminiResponse(event([]), "gemini-fixture"), null);
});
