import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { dropUnsignedPassthroughThinkingBlocks } =
  await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");

// Strict Claude clients (Grok Build) deserialize `signature` on every thinking block and
// fail when the key is missing. A translated block has no real signature, so it carries
// the empty string, and the request side must keep dropping an empty signature on replay.

test("OpenAI to Claude, streaming: thinking content_block_start has an empty signature field", () => {
  const events = openaiToClaudeResponse(
    {
      id: "chatcmpl-sig",
      model: "gpt-test",
      choices: [{ index: 0, delta: { reasoning_content: "plan" }, finish_reason: null }],
    },
    { toolCalls: new Map() }
  );
  const start = events.find((e) => e?.type === "content_block_start");
  assert.equal(start.content_block.type, "thinking");
  assert.equal(start.content_block.signature, "");
});

test("Gemini to Claude, streaming: thinking content_block_start has an empty signature field", () => {
  const events = geminiToClaudeResponse(
    { candidates: [{ content: { parts: [{ thought: true, text: "plan" }] } }] },
    {}
  );
  const start = events.find((e) => e?.type === "content_block_start");
  assert.equal(start.content_block.type, "thinking");
  assert.equal(start.content_block.signature, "");
});

test("OpenAI to Claude, non-streaming: the thinking block has an empty signature field", () => {
  const result = translateNonStreamingResponse(
    {
      id: "chatcmpl-sig",
      object: "chat.completion",
      model: "gpt-test",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "answer", reasoning_content: "plan" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  ) as { content: Array<Record<string, unknown>> };
  const thinking = result.content.find((b) => b.type === "thinking");
  assert.ok(thinking);
  assert.equal(thinking.signature, "");
});

test("an empty-signature thinking block is not replayed to an Anthropic upstream", () => {
  const body = prepareClaudeRequest(
    {
      messages: [
        { role: "user", content: [{ type: "text", text: "q" }] },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "plan", signature: "" },
            { type: "text", text: "a" },
          ],
        },
        { role: "user", content: [{ type: "text", text: "q2" }] },
      ],
    },
    "claude"
  );
  const assistant = body.messages.find((m) => m.role === "assistant");
  assert.deepEqual(
    assistant.content.map((b) => b.type),
    ["text"]
  );
});

test("the empty signature of a translated thinking block is dropped by the passthrough guard", () => {
  const out = dropUnsignedPassthroughThinkingBlocks([
    { role: "user", content: [{ type: "text", text: "q" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "plan", signature: "" },
        { type: "text", text: "a" },
      ],
    },
  ]) as Array<{ role: string; content: Array<{ type: string }> }>;
  assert.deepEqual(
    out.find((m) => m.role === "assistant")!.content.map((b) => b.type),
    ["text"]
  );
});
