import test from "node:test";
import assert from "node:assert/strict";

import { antigravityToOpenAIRequest } from "../../open-sse/translator/request/antigravity-to-openai.ts";

// The Gemini `role` field is optional (single-turn requests omit it). A content without a
// role must become a user turn, not a message with no role at all.
const convert = (contents: unknown[]) =>
  antigravityToOpenAIRequest("m", { request: { contents } }, false).messages;

test("a content without a role becomes a user message", () => {
  assert.deepEqual(convert([{ parts: [{ text: "hi" }] }]), [{ role: "user", content: "hi" }]);
});

test("a role-less content with a thought part and text is an assistant turn", () => {
  const [message] = convert([{ parts: [{ thought: true, text: "thinking" }, { text: "answer" }] }]);
  assert.equal(message.role, "assistant");
  assert.equal(message.content, "answer");
  assert.equal(message.reasoning_content, "thinking");
});

test("a role-less content with a function call is an assistant turn with the call", () => {
  const [message] = convert([{ parts: [{ functionCall: { name: "lookup", args: { q: 1 } } }] }]);
  assert.equal(message.role, "assistant");
  assert.equal(
    (message.tool_calls as Array<{ function: { name: string } }>)[0].function.name,
    "lookup"
  );
});

test("explicit user and model roles are unchanged", () => {
  const messages = convert([
    { role: "user", parts: [{ text: "q" }] },
    { role: "model", parts: [{ text: "a" }] },
  ]);
  assert.deepEqual(
    messages.map((m) => m.role),
    ["user", "assistant"]
  );
});
