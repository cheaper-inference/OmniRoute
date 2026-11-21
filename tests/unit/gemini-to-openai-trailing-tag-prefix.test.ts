import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");

type Chunk = { choices?: Array<{ delta?: { content?: string; reasoning_content?: string } }> };

function run(parts: string[]): { content: string; reasoning: string } {
  const state = { toolCalls: new Map(), functionIndex: 0 };
  const chunks = parts.map((text, i) => ({
    responseId: "r1",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      i === parts.length - 1
        ? { content: { parts: [{ text }] }, finishReason: "STOP" }
        : { content: { parts: [{ text }] } },
    ],
  }));
  const out = chunks.flatMap((chunk) => (geminiToOpenAIResponse(chunk, state) ?? []) as Chunk[]);
  const join = (field: "content" | "reasoning_content") =>
    out.map((chunk) => chunk.choices?.[0]?.delta?.[field] ?? "").join("");
  return { content: join("content"), reasoning: join("reasoning_content") };
}

test("a lone trailing '<' at the end of the stream is delivered as text", () => {
  assert.equal(run(["if a <", ""]).content, "if a <");
});

test("a trailing '<th' cut at the token limit is delivered as text", () => {
  assert.equal(run(["Array<th"]).content, "Array<th");
});

test("a held prefix that completes a think tag is still treated as reasoning", () => {
  const out = run(["Hi <th", "ink>plan</think>done"]);
  assert.equal(out.content, "Hi done");
  assert.equal(out.reasoning, "plan");
});

test("a partial close tag inside open reasoning does not leak into the content", () => {
  const out = run(["<think>plan</thi"]);
  assert.equal(out.content, "");
});
