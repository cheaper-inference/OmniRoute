/**
 * Claude-to-Claude requests skip openai-to-claude and reach the upstream through
 * prepareClaudeRequest. A past assistant turn that ends in thinking must be
 * repaired there too (Anthropic 400 "final block ... cannot be `thinking`").
 */
import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const types = (msg: { content: unknown }) =>
  (msg.content as Array<{ type: string }>).map((b) => b.type);

test("claude passthrough drops trailing thinking on past assistant turns only", () => {
  const body = {
    model: "claude-sonnet-4-5",
    max_tokens: 100,
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "text", text: "A" },
          { type: "thinking", thinking: "t", signature: "SYNTHETIC_SIG" },
        ],
      },
      { role: "user", content: [{ type: "text", text: "next" }] },
      { role: "assistant", content: [{ type: "redacted_thinking", data: "SYNTHETIC_OPAQUE" }] },
      { role: "user", content: [{ type: "text", text: "more" }] },
      {
        role: "assistant",
        content: [
          { type: "text", text: "latest" },
          { type: "thinking", thinking: "keep", signature: "SYNTHETIC_SIG_2" },
        ],
      },
    ],
  };
  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.CLAUDE,
    "claude-sonnet-4-5",
    body,
    false,
    null,
    "claude"
  ) as { messages: Array<{ role: string; content: unknown }> };
  const assistants = out.messages.filter((m) => m.role === "assistant");
  assert.equal(assistants.length, 2, "the turn that held only redacted_thinking is dropped");
  assert.deepEqual(types(assistants[0]), ["text"]);
  assert.deepEqual(types(assistants[1]), ["text", "thinking"], "latest turn stays byte-exact");
});
