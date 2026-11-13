import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

type Message = { role: string; content?: unknown; reasoning_content?: string };
const translate = (messages: unknown[]) =>
  (claudeToOpenAIRequest("gpt-4o", { messages }, false) as { messages: Message[] }).messages;

// A document with source.type "content" or "file", or an image with source.type "file", is
// valid Claude input that OpenAI Chat cannot carry. It must not vanish without a trace.
test("a turn that only holds an unsupported document source keeps a notice", () => {
  const messages = translate([
    {
      role: "user",
      content: [{ type: "document", source: { type: "content", content: [] } }],
    },
  ]);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].role, "user");
  assert.match(String(messages[0].content), /document block omitted/);
});

test("a turn that only holds an unsupported image source keeps a notice", () => {
  const messages = translate([
    { role: "user", content: [{ type: "image", source: { type: "file", file_id: "file_1" } }] },
  ]);
  assert.equal(messages.length, 1);
  assert.match(String(messages[0].content), /image block omitted/);
});

// Next to other content an unknown block leaves no notice (claude-unknown-block-types-4383).
test("guard: a supported base64 image still becomes an image part and adds no notice", () => {
  const messages = translate([
    {
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: "image/png", data: "AAAA" } },
      ],
    },
  ]);
  const text = JSON.stringify(messages[0].content);
  assert.match(text, /image_url/);
  assert.doesNotMatch(text, /omitted/);
});

// Interleaved thinking: the earlier reasoning must reach reasoning-replay upstreams.
test("several thinking blocks in one assistant turn are all kept", () => {
  const messages = translate([
    { role: "user", content: "q" },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "FIRST-THOUGHT", signature: "s" },
        { type: "text", text: "x" },
        { type: "thinking", thinking: "SECOND-THOUGHT", signature: "s" },
        { type: "tool_use", id: "t1", name: "f", input: {} },
      ],
    },
  ]);
  const assistant = messages.find((m) => m.role === "assistant");
  assert.match(String(assistant?.reasoning_content), /FIRST-THOUGHT/);
  assert.match(String(assistant?.reasoning_content), /SECOND-THOUGHT/);
});

test("an empty trailing thinking block does not erase the earlier reasoning", () => {
  const messages = translate([
    { role: "user", content: "q" },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "KEEP-ME", signature: "s" },
        { type: "thinking", thinking: "", signature: "s" },
        { type: "text", text: "answer" },
      ],
    },
  ]);
  const assistant = messages.find((m) => m.role === "assistant");
  assert.equal(assistant?.reasoning_content, "KEEP-ME");
});

test("guard: a redacted thinking block alone still yields an empty reasoning_content", () => {
  const messages = translate([
    { role: "user", content: "q" },
    {
      role: "assistant",
      content: [
        { type: "redacted_thinking", data: "x" },
        { type: "text", text: "answer" },
      ],
    },
  ]);
  const assistant = messages.find((m) => m.role === "assistant");
  assert.equal(assistant?.reasoning_content, "");
});
