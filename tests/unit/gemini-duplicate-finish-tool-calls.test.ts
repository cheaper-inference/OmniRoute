import test from "node:test";
import assert from "node:assert/strict";

const { openaiToAntigravityResponse } =
  await import("../../open-sse/translator/response/openai-to-antigravity.ts");
const { openAIChunkToGeminiChunk } =
  await import("../../open-sse/translator/response/openai-to-gemini-sse.ts");

const toolCall = { index: 0, id: "call_1", function: { name: "lookup", arguments: "{}" } };
const finish = { choices: [{ delta: {}, finish_reason: "tool_calls" }] };

function countCalls(parts: Array<{ functionCall?: unknown }>[]): number {
  return parts.flat().filter((part) => part.functionCall).length;
}

test("Antigravity: a repeated finish chunk does not emit the tool call again", () => {
  const state = {};
  openaiToAntigravityResponse(
    { id: "x", model: "m", choices: [{ delta: { tool_calls: [toolCall] }, finish_reason: null }] },
    state
  );
  const first = openaiToAntigravityResponse({ id: "x", model: "m", ...finish }, state);
  const second = openaiToAntigravityResponse({ id: "x", model: "m", ...finish }, state);
  const parts = [first, second].map((chunk) => chunk?.response.candidates[0].content.parts ?? []);
  assert.equal(countCalls(parts), 1);
});

test("Gemini SSE: a repeated finish chunk does not emit the tool call again", () => {
  const state = {};
  openAIChunkToGeminiChunk(
    { choices: [{ delta: { tool_calls: [toolCall] }, finish_reason: null }] },
    "m",
    state
  );
  const first = openAIChunkToGeminiChunk(finish, "m", state);
  const second = openAIChunkToGeminiChunk(finish, "m", state);
  const parts = [first, second].map((chunk) => chunk?.candidates[0].content.parts ?? []);
  assert.equal(countCalls(parts), 1);
});

test("Gemini SSE: a tool call that streams in a second turn after a finish is still emitted", () => {
  const state = {};
  openAIChunkToGeminiChunk(
    { choices: [{ delta: { tool_calls: [toolCall] }, finish_reason: null }] },
    "m",
    state
  );
  openAIChunkToGeminiChunk(finish, "m", state);
  openAIChunkToGeminiChunk(
    {
      choices: [
        {
          delta: {
            tool_calls: [{ index: 0, id: "call_2", function: { name: "other", arguments: "{}" } }],
          },
          finish_reason: null,
        },
      ],
    },
    "m",
    state
  );
  const last = openAIChunkToGeminiChunk(finish, "m", state);
  const calls = (last?.candidates[0].content.parts ?? []).filter((part) => "functionCall" in part);
  assert.equal(calls.length, 1);
});
