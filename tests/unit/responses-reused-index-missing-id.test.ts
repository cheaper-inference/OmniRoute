import test from "node:test";
import assert from "node:assert/strict";
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function collect(calls: Array<Record<string, unknown>>) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const chunks = calls.map((call) => ({ choices: [{ delta: { tool_calls: [call] } }] }));
  const events = chunks.flatMap((chunk) => openaiToOpenAIResponsesResponse(chunk, state) || []);
  events.push(
    ...(openaiToOpenAIResponsesResponse(
      { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
      state
    ) || []),
    ...(openaiToOpenAIResponsesResponse(null, state) || [])
  );
  return events;
}

test("different calls at one upstream index keep separate completed items", () => {
  const events = collect([
    { index: 0, id: "call_a", function: { name: "first", arguments: "{}" } },
    { index: 0, id: "call_b", function: { name: "second", arguments: "{}" } },
  ]);
  const done = events.filter((event) => event.event === "response.output_item.done");
  assert.deepEqual(
    done.map((event) => event.data.output_index),
    [0, 1]
  );
  const completed = events.find((event) => event.event === "response.completed");
  assert.deepEqual(
    completed.data.response.output.map((item) => item.call_id),
    ["call_a", "call_b"]
  );
});

test("an id arriving after the name does not create a second call", () => {
  const events = collect([
    { index: 0, function: { name: "first", arguments: "{" } },
    { index: 0, id: "call_late", function: { arguments: "}" } },
  ]);
  const completed = events.find((event) => event.event === "response.completed");
  assert.equal(completed.data.response.output.length, 1);
  assert.equal(completed.data.response.output[0].call_id, "call_late");
  assert.equal(completed.data.response.output[0].arguments, "{}");
});

test("a tool without an upstream id receives a stable generated id", () => {
  const events = collect([
    { index: 0, function: { name: "first", arguments: "{" } },
    { index: 0, function: { arguments: "}" } },
  ]);
  const added = events.find((event) => event.event === "response.output_item.added");
  const completed = events.find((event) => event.event === "response.completed");
  assert.equal(completed.data.response.output.length, 1);
  const item = completed.data.response.output[0];
  assert.ok(item.call_id);
  assert.equal(item.call_id, added.data.item.call_id);
  assert.equal(item.arguments, "{}");
});
