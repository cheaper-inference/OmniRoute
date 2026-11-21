/**
 * Anthropic answers 400 "The final block in an assistant message cannot be
 * `thinking`" for any assistant turn that ends in a thinking or redacted_thinking
 * block. A client that replays such a turn in history poisons the whole
 * conversation: every later request fails the same way.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

const THINK = { type: "thinking", thinking: "reasoning text", signature: "SYNTHETIC_SIG" };
const REDACTED = { type: "redacted_thinking", data: "SYNTHETIC_OPAQUE" };
const types = (msg: { content: unknown }) =>
  (msg.content as Array<{ type: string }>).map((b) => b.type);

function translate(messages: unknown[]) {
  return openaiToClaudeRequest("claude-sonnet-4-5", { messages }, false);
}

test("a historical assistant turn that ends in thinking loses the trailing block", () => {
  const out = translate([
    { role: "user", content: "hi" },
    { role: "assistant", content: [{ type: "text", text: "A" }, THINK] },
    { role: "user", content: "next" },
    { role: "assistant", content: [{ type: "text", text: "B" }] },
    { role: "user", content: "more" },
  ]);
  const assistants = out.messages.filter((m) => m.role === "assistant");
  assert.deepEqual(types(assistants[0]), ["text"]);
  assert.deepEqual(types(assistants[1]), ["text"]);
});

test("trailing redacted_thinking is dropped and a turn left empty is removed", () => {
  const out = translate([
    { role: "user", content: "hi" },
    { role: "assistant", content: [REDACTED] },
    { role: "user", content: "next" },
    { role: "assistant", content: [{ type: "text", text: "B" }] },
    { role: "user", content: "more" },
  ]);
  assert.equal(out.messages.filter((m) => m.role === "assistant").length, 1);
  for (const msg of out.messages) {
    if (msg.role !== "assistant") continue;
    assert.notEqual(types(msg).at(-1), "redacted_thinking");
  }
});

test("thinking before a tool_use in a historical turn is kept", () => {
  const out = translate([
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: [THINK],
      tool_calls: [{ id: "call_1", type: "function", function: { name: "read", arguments: "{}" } }],
    },
    { role: "tool", tool_call_id: "call_1", content: "ok" },
    { role: "assistant", content: [{ type: "text", text: "done" }] },
    { role: "user", content: "more" },
  ]);
  const first = out.messages.find((m) => m.role === "assistant");
  assert.deepEqual(types(first!), ["thinking", "tool_use"]);
});

test("the latest assistant turn is never edited", () => {
  const out = translate([
    { role: "user", content: "hi" },
    { role: "assistant", content: [{ type: "text", text: "A" }, THINK] },
  ]);
  const latest = out.messages.filter((m) => m.role === "assistant").at(-1);
  assert.deepEqual(types(latest!), ["text", "thinking"]);
});
