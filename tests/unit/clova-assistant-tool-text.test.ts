import test from "node:test";
import assert from "node:assert/strict";

import { buildClovaPayload } from "../../open-sse/translator/request/openai-to-clova.ts";

const tools = [
  { type: "function", function: { name: "get", parameters: { type: "object", properties: {} } } },
];

function messagesFor(assistant: Record<string, unknown>) {
  const payload = buildClovaPayload(
    "HCX-007",
    {
      messages: [
        { role: "user", content: "weather?" },
        assistant,
        { role: "tool", tool_call_id: "c1", content: "sunny" },
      ],
      tools,
    },
    false
  ) as { messages: Array<Record<string, unknown>> };
  return payload.messages;
}

const call = { id: "c1", type: "function", function: { name: "get", arguments: "{}" } };

test("assistant text written before a tool call stays in the history", () => {
  const messages = messagesFor({
    role: "assistant",
    content: "Let me check the weather",
    tool_calls: [call],
  });
  const assistant = messages.find((m) => m.role === "assistant");
  assert.equal(assistant?.content, "Let me check the weather");
  assert.equal((assistant?.toolCalls as unknown[]).length, 1);
});

test("text parts of an array content are joined", () => {
  const messages = messagesFor({
    role: "assistant",
    content: [
      { type: "text", text: "first" },
      { type: "text", text: "second" },
    ],
    tool_calls: [call],
  });
  assert.equal(messages.find((m) => m.role === "assistant")?.content, "first\nsecond");
});

test("an assistant tool call with no text keeps an empty content", () => {
  const messages = messagesFor({ role: "assistant", content: null, tool_calls: [call] });
  assert.equal(messages.find((m) => m.role === "assistant")?.content, "");
});
