import test from "node:test";
import assert from "node:assert/strict";

// An assistant turn carrying `tool_calls: []` has NO tool calls. Treating the empty
// array as truthy skipped the content normalization (Claude `thinking` blocks leaked
// raw to OpenAI-compatible upstreams) and kept blank assistant turns alive.

const { filterToOpenAIFormat } = await import("../../open-sse/translator/helpers/openaiHelper.ts");

type Msg = Record<string, unknown>;

test("filterToOpenAIFormat: tool_calls:[] does not bypass content normalization", () => {
  const body = {
    messages: [
      { role: "user", content: "hi" },
      {
        role: "assistant",
        tool_calls: [],
        content: [
          { type: "thinking", thinking: "x" },
          { type: "text", text: "y" },
        ],
      },
    ],
  };
  const result = filterToOpenAIFormat(body);
  const assistant = (result.messages as Msg[])[1];
  const content = assistant.content as Msg[];
  assert.ok(
    content.every((block) => block.type !== "thinking"),
    "thinking block must not leak to an OpenAI-format body"
  );
  assert.deepEqual(
    content.map((block) => block.text),
    ["y"]
  );
  assert.equal(assistant.reasoning_content, "x");
  assert.equal("tool_calls" in assistant, false, "empty tool_calls key is removed");
});

test("filterToOpenAIFormat: blank assistant turn with tool_calls:[] is dropped", () => {
  const body = {
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", tool_calls: [], content: "   " },
      { role: "user", content: "again" },
    ],
  };
  const result = filterToOpenAIFormat(body);
  assert.deepEqual(
    (result.messages as Msg[]).map((m) => m.role),
    ["user", "user"]
  );
});

test("filterToOpenAIFormat: empty tool_calls key removed from a text assistant turn", () => {
  const body = {
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", tool_calls: [], content: "answer" },
    ],
  };
  const result = filterToOpenAIFormat(body);
  const assistant = (result.messages as Msg[])[1];
  assert.equal(assistant.content, "answer");
  assert.equal("tool_calls" in assistant, false);
});

test("filterToOpenAIFormat: a real tool_calls turn is kept unchanged", () => {
  const toolCalls = [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }];
  const body = {
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "", tool_calls: toolCalls },
      { role: "tool", tool_call_id: "call_1", content: "ok" },
    ],
  };
  const result = filterToOpenAIFormat(body);
  const messages = result.messages as Msg[];
  assert.equal(messages.length, 3);
  assert.deepEqual(messages[1].tool_calls, toolCalls);
  assert.equal(messages[1].content, "");
});
