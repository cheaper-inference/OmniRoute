import test from "node:test";
import assert from "node:assert/strict";

const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");

type ClaudeEvent = { type: string; index?: number };

function run(chunks: unknown[]): ClaudeEvent[] {
  const state = {};
  return chunks.flatMap((chunk) => (geminiToClaudeResponse(chunk, state) ?? []) as ClaudeEvent[]);
}

const finishChunk = (text: string) => ({
  responseId: "r1",
  modelVersion: "gemini-test",
  candidates: [{ content: { parts: [{ text }] }, finishReason: "STOP" }],
});

test("a second chunk with finishReason adds no events after message_stop", () => {
  const events = run([
    finishChunk("Hi"),
    {
      candidates: [{ content: { parts: [{ text: " late" }] }, finishReason: "STOP" }],
      usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2 },
    },
  ]);
  const types = events.map((event) => event.type);
  assert.equal(types.filter((type) => type === "message_stop").length, 1);
  assert.equal(types.at(-1), "message_stop");
});

test("a normal stream still ends with one message_delta and one message_stop", () => {
  const events = run([
    { responseId: "r2", candidates: [{ content: { parts: [{ text: "Hel" }] } }] },
    finishChunk("lo"),
  ]);
  const types = events.map((event) => event.type);
  assert.equal(types.filter((type) => type === "message_delta").length, 1);
  assert.equal(types.filter((type) => type === "message_stop").length, 1);
  assert.equal(types.at(-1), "message_stop");
});
