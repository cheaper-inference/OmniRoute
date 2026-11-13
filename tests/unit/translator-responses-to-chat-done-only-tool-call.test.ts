import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function toolCallDeltas(events) {
  const state = initState(FORMATS.OPENAI);
  const out = [];
  for (const event of [...events, null]) {
    const result = openaiResponsesToOpenAIResponse(event, state);
    if (result) out.push(...(Array.isArray(result) ? result : [result]));
  }
  return out.flatMap((chunk) => chunk.choices?.[0]?.delta?.tool_calls || []);
}

const completed = {
  type: "response.completed",
  response: { status: "completed", output: [], usage: { input_tokens: 1, output_tokens: 1 } },
};

test("a function_call sent only in output_item.done gets its id, type and name", () => {
  const deltas = toolCallDeltas([
    {
      type: "response.output_item.done",
      output_index: 0,
      item: {
        type: "function_call",
        id: "fc_1",
        call_id: "call_1",
        name: "f",
        arguments: '{"a":1}',
      },
    },
    completed,
  ]);
  assert.deepEqual(
    deltas,
    [{ index: 0, id: "call_1", type: "function", function: { name: "f", arguments: '{"a":1}' } }],
    JSON.stringify(deltas)
  );
});

test("a function_call with output_item.added still sends its header once", () => {
  const item = { type: "function_call", id: "fc_1", call_id: "call_1", name: "f", arguments: "" };
  const deltas = toolCallDeltas([
    { type: "response.output_item.added", output_index: 0, item },
    {
      type: "response.output_item.done",
      output_index: 0,
      item: { ...item, arguments: '{"a":1}' },
    },
    completed,
  ]);
  assert.equal(deltas.filter((d) => d.id === "call_1").length, 1, JSON.stringify(deltas));
  assert.equal(deltas.map((d) => d.function?.arguments || "").join(""), '{"a":1}');
});
