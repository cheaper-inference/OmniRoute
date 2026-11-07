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

// Each row sets the body's `index` on call_a and call_b, then the indexes the
// replay must emit. Every call needs its own slot or a reader collapses them.
const INDEX_REPAIRS: Array<[string, unknown[], number[]]> = [
  ["a missing index next to a set one", [1, undefined], [1, 0]],
  ["a missing index before a set one", [undefined, 0], [1, 0]],
  ["null indexes", [null, null], [0, 1]],
  ["repeated indexes", [0, 0], [0, 1]],
  ["negative and fractional indexes", [-1, 1.5], [0, 1]],
  ["a string index", ["0", "1"], [0, 1]],
];

function completionWithIndexes(indexes: unknown[]) {
  const completion = twoToolCallCompletion();
  const toolCalls = completion.choices[0].message.tool_calls as Array<Record<string, unknown>>;
  indexes.forEach((index, i) => {
    if (index !== undefined) toolCalls[i].index = index;
  });
  return completion;
}

for (const [label, indexes, expected] of INDEX_REPAIRS) {
  test(`JSON->SSE replay gives each tool_call its own slot with ${label}`, () => {
    const sse = synthesizeOpenAiSseFromJson(JSON.stringify(completionWithIndexes(indexes)));
    const calls = sse
      .split("\n\n")
      .filter((f) => f.startsWith("data: {"))
      .flatMap((f) => JSON.parse(f.slice(6)).choices[0].delta.tool_calls ?? []);
    assert.deepEqual(
      calls.map((tc: { id: string; index?: number }) => [tc.id, tc.index]),
      [
        ["call_a", expected[0]],
        ["call_b", expected[1]],
      ]
    );
  });

  test(`Responses SSE wrap keeps both function_call items with ${label}`, async () => {
    const text = await wrapChatCompletionJsonAsResponsesSse(
      completionWithIndexes(indexes),
      {}
    ).text();
    const completed = text
      .split("\n\n")
      .filter((f) => f.includes("event: response.completed"))
      .map((f) => JSON.parse(f.split("data: ")[1]))[0];
    const names = (completed?.response?.output ?? [])
      .filter((o: { type: string }) => o.type === "function_call")
      .map((o: { name: string }) => o.name)
      .sort();
    assert.deepEqual(names, ["alpha", "beta"]);
  });
}

test("JSON->SSE replay passes non-object tool_calls through without taking a slot", () => {
  const completion = twoToolCallCompletion();
  const toolCalls = completion.choices[0].message.tool_calls as unknown[];
  toolCalls.unshift("not-a-call");
  const sse = synthesizeOpenAiSseFromJson(JSON.stringify(completion));
  const calls = sse
    .split("\n\n")
    .filter((f) => f.startsWith("data: {"))
    .flatMap((f) => JSON.parse(f.slice(6)).choices[0].delta.tool_calls ?? []);
  assert.equal(calls[0], "not-a-call");
  assert.deepEqual(
    calls.slice(1).map((tc: { index?: number }) => tc.index),
    [0, 1]
  );
});
