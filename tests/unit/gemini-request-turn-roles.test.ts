// Gemini `content.role` is optional (single-turn requests omit it) and older clients send
// "function" or "tool" for tool results. Only role "user" used to map to user; every other
// value, including an omitted role, became an assistant message.
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");

const convert = (contents: unknown[]) => geminiToOpenAIRequest("m", { contents }, false).messages;

test("a content without a role and with plain text is a user message", () => {
  assert.deepEqual(convert([{ parts: [{ text: "hello" }] }]), [{ role: "user", content: "hello" }]);
});

test("roles function and tool carrying text map to user", () => {
  for (const role of ["function", "tool", "FUNCTION", " Tool "]) {
    assert.equal(convert([{ role, parts: [{ text: "x" }] }])[0].role, "user", role);
  }
});

test("role model stays assistant and role user stays user", () => {
  const messages = convert([
    { role: "user", parts: [{ text: "q" }] },
    { role: "model", parts: [{ text: "a" }] },
  ]);
  assert.deepEqual(
    messages.map((m) => m.role),
    ["user", "assistant"]
  );
});

test("an omitted role is inferred from the parts: functionCall -> assistant, functionResponse -> tool", () => {
  const messages = convert([
    { parts: [{ functionCall: { id: "c1", name: "f", args: {} } }] },
    { parts: [{ functionResponse: { id: "c1", name: "f", response: { result: "ok" } } }] },
  ]);
  assert.equal(messages[0].role, "assistant");
  assert.equal((messages[0].tool_calls as Array<{ id: string }>)[0].id, "c1");
  assert.equal(messages[1].role, "tool");
  assert.equal(messages[1].tool_call_id, "c1");
});

test("an omitted role on a thought-only content is an assistant reasoning message", () => {
  const messages = convert([{ parts: [{ text: "thinking", thought: true }] }]);
  assert.deepEqual(messages, [{ role: "assistant", reasoning_content: "thinking" }]);
});

test("a role-less multi-turn history keeps tool-call ids paired with their responses", () => {
  const messages = convert([
    { role: "user", parts: [{ text: "go" }] },
    { parts: [{ functionCall: { name: "f", args: {} } }] },
    { role: "function", parts: [{ functionResponse: { name: "f", response: { result: "ok" } } }] },
  ]);
  const call = messages[1].tool_calls as Array<{ id: string }>;
  assert.equal(messages[2].role, "tool");
  assert.equal(messages[2].tool_call_id, call[0].id);
});

test("an omitted role on thought plus visible text stays assistant with reasoning_content", () => {
  const messages = convert([{ parts: [{ text: "thinking", thought: true }, { text: "answer" }] }]);
  assert.deepEqual(messages, [
    { role: "assistant", content: "answer", reasoning_content: "thinking" },
  ]);
});
