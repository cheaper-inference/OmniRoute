// Text held in `_xmlInvokeBuffer` (an unterminated <tool_call>/<invoke> tail —
// prose that merely mentions the tag, or a MAX_TOKENS cut mid-call) must be
// released as a text delta at finish; before the fix the finish path closed the
// text block and dropped everything from the marker on.
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");

type Event = { type: string; delta?: { type: string; text: string } };
type Out = Event[];

function toClaude(chunks: unknown[]): Out[] {
  const state = {};
  return chunks.map((chunk) => (geminiToClaudeResponse(chunk, state) ?? []) as Out);
}

function textOf(batches: Out[]): string {
  return batches
    .flat()
    .filter((e) => e.delta?.type === "text_delta")
    .map((e) => e.delta!.text)
    .join("");
}

test("unclosed <tool_call> prose tail is flushed as text at finish", () => {
  const batches = toClaude([
    {
      responseId: "r",
      modelVersion: "g",
      candidates: [
        { content: { parts: [{ text: "Hello. Use the <tool_call> tag to call tools." }] } },
      ],
    },
    {
      candidates: [{ content: { parts: [{ text: "" }] }, finishReason: "STOP" }],
      usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1 },
    },
  ]);
  assert.match(textOf(batches), /Use the <tool_call> tag to call tools\./);
});

test("MAX_TOKENS cut inside a tool-call tail keeps the held text", () => {
  const batches = toClaude([
    {
      responseId: "r",
      modelVersion: "g",
      candidates: [{ content: { parts: [{ text: 'Trying <invoke name="f">' }] } }],
    },
    {
      candidates: [{ content: { parts: [{ text: "" }] }, finishReason: "MAX_TOKENS" }],
      usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1 },
    },
  ]);
  assert.match(textOf(batches), /<invoke name="f">/);
});

test("a held tail is emitted before the grounding blocks of the finish chunk", () => {
  const batches = toClaude([
    {
      responseId: "r",
      modelVersion: "g",
      candidates: [
        { content: { parts: [{ text: "Hello. Use the <tool_call> tag to call tools." }] } },
      ],
    },
    {
      candidates: [
        {
          content: { parts: [{ text: "" }] },
          finishReason: "STOP",
          groundingMetadata: {
            webSearchQueries: ["tool call tag"],
            groundingChunks: [{ web: { uri: "https://example.test/a", title: "A" } }],
          },
        },
      ],
      usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1 },
    },
  ]);
  const events = batches.flat() as Array<{
    type: string;
    index?: number;
    content_block?: { type: string };
    delta?: { type: string; text: string };
  }>;
  const tailAt = events.findIndex((e) => e.delta?.text?.includes("<tool_call> tag"));
  const searchAt = events.findIndex(
    (e) => e.type === "content_block_start" && e.content_block?.type === "server_tool_use"
  );
  assert.ok(tailAt >= 0, "the held tail is emitted");
  assert.ok(searchAt >= 0, "the grounding blocks are emitted");
  assert.ok(tailAt < searchAt, "the answer text comes before the search blocks");
  const open = new Set<number>();
  for (const e of events) {
    if (e.type === "content_block_start") open.add(e.index!);
    if (e.type === "content_block_stop") assert.ok(open.delete(e.index!), "balanced blocks");
  }
  assert.equal(open.size, 0, "every block is closed");
});
