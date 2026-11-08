/**
 * Kimi ignores thinking signatures, so a thinking block in an assistant turn keeps its
 * text and loses only the signature. The OpenAI-to-Claude translator dropped every
 * thinking block without a signature, which erased the reasoning text for Kimi.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";

type Block = Record<string, unknown>;

function assistantBlocks(provider: string, thinkingPart: Block): Block[] {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "kimi-for-coding",
    {
      model: "kimi-for-coding",
      max_tokens: 4096,
      thinking: { type: "enabled" },
      messages: [
        { role: "user", content: "go" },
        {
          role: "assistant",
          content: [thinkingPart, { type: "text", text: "searching" }],
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "search", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "ok" },
      ],
    },
    false,
    {},
    provider
  ) as { messages: Array<{ role: string; content: Block[] }> };
  return translated.messages.find((m) => m.role === "assistant")!.content;
}

test("Kimi keeps the text of an unsigned thinking block", () => {
  const blocks = assistantBlocks("kimi-coding", { type: "thinking", thinking: "plan A" });
  assert.deepEqual(blocks[0], { type: "thinking", thinking: "plan A" });
});

test("Kimi keeps the text of an empty-signature thinking block", () => {
  const blocks = assistantBlocks("kimi-coding-apikey", {
    type: "thinking",
    thinking: "plan A",
    signature: "",
  });
  assert.deepEqual(blocks[0], { type: "thinking", thinking: "plan A" });
});

test("Kimi keeps the text of a signed thinking block and drops the foreign signature", () => {
  const blocks = assistantBlocks("kimi-coding", {
    type: "thinking",
    thinking: "plan A",
    signature: "foreign-signature",
  });
  assert.deepEqual(blocks[0], { type: "thinking", thinking: "plan A" });
});

test("an Anthropic target still drops an unsigned thinking block", () => {
  const blocks = assistantBlocks("claude", { type: "thinking", thinking: "plan A" });
  assert.ok(!blocks.some((b) => b.type === "thinking" && b.thinking === "plan A"));
});
