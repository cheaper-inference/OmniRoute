import test from "node:test";
import assert from "node:assert/strict";
import { synthesizeOpenAiSseFromJson } from "../../open-sse/utils/jsonToSse.ts";
import { wrapChatCompletionJsonAsResponsesSse } from "../../open-sse/handlers/chatCore/responsesJsonToSse.ts";

// A stored non-stream completion: tool_calls carry no `index`, like a real
// chat.completion body.
function twoToolCallCompletion() {
  return {
    id: "c1",
    object: "chat.completion",
    created: 1,
    model: "m",
    choices: [
      {
        index: 0,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_a", type: "function", function: { name: "alpha", arguments: '{"x":1}' } },
            { id: "call_b", type: "function", function: { name: "beta", arguments: '{"y":2}' } },
          ],
        },
      },
    ],
    usage: { prompt_tokens: 5, completion_tokens: 5, total_tokens: 10 },
  };
}

test("JSON->SSE replay gives each tool_call delta its array index", () => {
  const sse = synthesizeOpenAiSseFromJson(JSON.stringify(twoToolCallCompletion()));
  const frames = sse
    .split("\n\n")
    .filter((f) => f.startsWith("data: {"))
    .map((f) => JSON.parse(f.slice(6)));
  const calls = frames.flatMap((f) => f.choices[0].delta.tool_calls ?? []);
  assert.deepEqual(
    calls.map((tc: { id: string; index?: number }) => [tc.id, tc.index]),
    [
      ["call_a", 0],
      ["call_b", 1],
    ]
  );
});

test("JSON->SSE replay keeps an index the upstream already set", () => {
  const completion = twoToolCallCompletion();
  const toolCalls = completion.choices[0].message.tool_calls as Array<Record<string, unknown>>;
  toolCalls[0].index = 3;
  toolCalls[1].index = 7;
  const sse = synthesizeOpenAiSseFromJson(JSON.stringify(completion));
  const calls = sse
    .split("\n\n")
    .filter((f) => f.startsWith("data: {"))
    .flatMap((f) => JSON.parse(f.slice(6)).choices[0].delta.tool_calls ?? []);
  assert.deepEqual(
    calls.map((tc: { index?: number }) => tc.index),
    [3, 7]
  );
});

test("Responses SSE wrap of a completion with 2 tool calls emits 2 function_call items", async () => {
  const text = await wrapChatCompletionJsonAsResponsesSse(twoToolCallCompletion(), {}).text();
  const completed = text
    .split("\n\n")
    .filter((f) => f.includes("event: response.completed"))
    .map((f) => JSON.parse(f.split("data: ")[1]))[0];
  const names = (completed?.response?.output ?? [])
    .filter((o: { type: string }) => o.type === "function_call")
    .map((o: { name: string }) => o.name);
  assert.deepEqual(names, ["alpha", "beta"]);
});
