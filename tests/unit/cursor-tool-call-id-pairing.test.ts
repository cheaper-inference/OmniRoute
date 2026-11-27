import test from "node:test";
import assert from "node:assert/strict";

const { buildCursorRequest } =
  await import("../../open-sse/translator/request/openai-to-cursor.ts");

type Msg = {
  role: string;
  content?: unknown;
  tool_call_id?: string;
  tool_calls?: Array<{ id: string }>;
};

const longId = "call_a\nfc_b";

function translate(messages: unknown[], provider: string | null): Msg[] {
  const result = buildCursorRequest(
    "gpt-4o",
    { messages },
    false,
    provider ? { _provider: provider } : null
  ) as { messages: Msg[] };
  return result.messages;
}

const history = (assistant: Record<string, unknown>) => [
  { role: "user", content: "go" },
  assistant,
  { role: "tool", tool_call_id: longId, content: "result" },
];

test("Cursor: assistant tool_calls id and tool message id agree when the id has a newline", () => {
  const out = translate(
    history({
      role: "assistant",
      content: "",
      tool_calls: [{ id: longId, type: "function", function: { name: "f", arguments: "{}" } }],
    }),
    "cursor"
  );
  const toolMessage = out.find((message) => message.role === "tool");
  const assistant = out.find((message) => message.role === "assistant");
  assert.equal(toolMessage?.tool_call_id, "call_a");
  assert.equal(assistant?.tool_calls?.[0].id, "call_a");
});

test("Cursor: tool_use ids in assistant content agree with the tool message too", () => {
  const out = translate(
    history({
      role: "assistant",
      content: [{ type: "tool_use", id: longId, name: "f", input: {} }],
    }),
    "cursor"
  );
  const toolMessage = out.find((message) => message.role === "tool");
  const assistant = out.find((message) => message.role === "assistant");
  assert.equal(assistant?.tool_calls?.[0].id, toolMessage?.tool_call_id);
});

test("Cursor: a plain id is unchanged", () => {
  const out = translate(
    [
      { role: "user", content: "go" },
      {
        role: "assistant",
        content: "",
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
      { role: "tool", tool_call_id: "call_1", content: "r" },
    ],
    "cursor"
  );
  assert.equal(out.find((message) => message.role === "assistant")?.tool_calls?.[0].id, "call_1");
  assert.equal(out.find((message) => message.role === "tool")?.tool_call_id, "call_1");
});

test("Other Cursor-shaped consumers keep the raw assistant id and the text-block result", () => {
  const out = translate(
    history({
      role: "assistant",
      content: "",
      tool_calls: [{ id: longId, type: "function", function: { name: "f", arguments: "{}" } }],
    }),
    null
  );
  assert.equal(out.find((message) => message.role === "assistant")?.tool_calls?.[0].id, longId);
  assert.equal(
    out.some((message) => message.role === "tool"),
    false
  );
});

test("Cursor: a Claude tool_result block carries the same id as the assistant call", () => {
  const out = translate(
    [
      { role: "user", content: "go" },
      {
        role: "assistant",
        content: "",
        tool_calls: [{ id: longId, type: "function", function: { name: "f", arguments: "{}" } }],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: longId, content: "result" }] },
    ],
    "cursor"
  );
  const assistant = out.find((message) => message.role === "assistant");
  const resultText = out
    .filter((message) => message.role === "user")
    .map((message) => (typeof message.content === "string" ? message.content : ""))
    .join("\n");
  assert.equal(assistant?.tool_calls?.[0].id, "call_a");
  assert.match(resultText, /<tool_call_id>call_a<\/tool_call_id>/);
  assert.doesNotMatch(resultText, /fc_b/);
});
