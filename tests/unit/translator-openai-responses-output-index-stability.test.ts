import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

/**
 * output_index is the Responses API's item identity. Two invariants:
 *
 * 1. A tool call must keep ONE output_index for its whole lifecycle: the
 *    `output_item.added` index equals the `output_item.done` index, no matter
 *    what items were opened or closed in between (a text message that starts
 *    AFTER the call must not push the call's done index around).
 * 2. Post-tool-call text re-homes onto ONE fresh message item (not one new
 *    item per delta chunk) — unbounded item growth and an O(n) scan per delta
 *    otherwise (#13693 follow-up).
 */
function collectEvents(chunks) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  state.toolSchemas = new Map([["f", {}]]);
  const events = [];
  for (const chunk of [...chunks, null]) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }
  return events;
}

const mk = (delta, finish = null, extra = {}) => ({
  id: "chatcmpl-idx",
  model: "test-model",
  choices: [{ index: 0, delta, finish_reason: finish }],
  ...extra,
});

test("tool call before text: added and done output_index stay equal, message takes a fresh index", () => {
  const events = collectEvents([
    mk({
      tool_calls: [
        { index: 0, id: "call_1", type: "function", function: { name: "f", arguments: "{}" } },
      ],
    }),
    mk({ content: "hi" }),
    mk({}, "tool_calls", { usage: { prompt_tokens: 1, completion_tokens: 1 } }),
  ]);

  const callAdded = events.find(
    (e) => e.event === "response.output_item.added" && e.data.item?.type === "function_call"
  );
  const callDone = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
  );
  const msgAdded = events.find(
    (e) => e.event === "response.output_item.added" && e.data.item?.type === "message"
  );
  assert.ok(callAdded && callDone && msgAdded, "expected one call and one message item");
  const seq = events
    .filter((e) => e.data.item)
    .map(
      (e) =>
        `${e.event.replace("response.output_item.", "")}:${e.data.item.type}@${e.data.output_index}`
    );
  assert.equal(
    callDone.data.output_index,
    callAdded.data.output_index,
    `done index moved away from added index: ${seq.join(" | ")}`
  );
  assert.notEqual(msgAdded.data.output_index, callAdded.data.output_index, seq.join(" | "));
});

test("text after a tool call reuses ONE fresh message item for every delta", () => {
  const events = collectEvents([
    mk({ content: "pre" }),
    mk({
      tool_calls: [
        { index: 0, id: "call_1", type: "function", function: { name: "f", arguments: "{}" } },
      ],
    }),
    mk({ content: "a" }),
    mk({ content: "b" }),
    mk({ content: "c" }),
    mk({}, "stop", { usage: { prompt_tokens: 1, completion_tokens: 1 } }),
  ]);

  const msgAddedIndexes = events
    .filter((e) => e.event === "response.output_item.added" && e.data.item?.type === "message")
    .map((e) => e.data.output_index);
  assert.equal(
    msgAddedIndexes.length,
    2,
    `message items added at ${JSON.stringify(msgAddedIndexes)}`
  );

  const completed = events.find((e) => e.event === "response.completed");
  const texts = completed.data.response.output
    .filter((o) => o.type === "message")
    .map((o) => o.content[0].text);
  assert.deepEqual(texts, ["pre", "abc"]);

  // One item per output_index: no index may hold two completed items.
  const outputIndexes = events
    .filter((e) => e.event === "response.output_item.done")
    .map((e) => e.data.output_index);
  assert.equal(
    new Set(outputIndexes).size,
    outputIndexes.length,
    `duplicate output_index in done events: ${outputIndexes}`
  );
});

test("a relocated post-tool message closes before the next tool call opens", () => {
  const call = (index, id) =>
    mk({ tool_calls: [{ index, id, type: "function", function: { name: "f", arguments: "{}" } }] });
  const events = collectEvents([
    mk({ content: "pre" }),
    call(0, "call_1"),
    mk({ content: "abc" }),
    call(1, "call_2"),
    mk({ content: "xyz" }),
    mk({}, "stop", { usage: { prompt_tokens: 1, completion_tokens: 1 } }),
  ]);

  const seq = events
    .filter((e) => e.data.item)
    .map(
      (e) =>
        `${e.event.replace("response.output_item.", "")}:${e.data.item.type}@${e.data.output_index}`
    );
  const abcDone = events.findIndex(
    (e) => e.event === "response.output_item.done" && e.data.item?.content?.[0]?.text === "abc"
  );
  const call2Added = events.findIndex(
    (e) => e.event === "response.output_item.added" && e.data.item?.call_id === "call_2"
  );
  assert.ok(abcDone !== -1 && call2Added !== -1, seq.join(" | "));
  assert.ok(abcDone < call2Added, `message stayed open across call_2: ${seq.join(" | ")}`);

  const completed = events.find((e) => e.event === "response.completed");
  const order = completed.data.response.output.map((o) =>
    o.type === "message" ? o.content[0].text : o.call_id
  );
  assert.deepEqual(order, ["pre", "call_1", "abc", "call_2", "xyz"]);
});

test("a relocated message between two tool calls never makes a third call reuse an index", () => {
  const call = (index, id) =>
    mk({ tool_calls: [{ index, id, type: "function", function: { name: "f", arguments: "{}" } }] });
  const events = collectEvents([
    call(0, "call_1"),
    mk({ content: "mid" }),
    call(1, "call_2"),
    call(2, "call_3"),
    mk({}, "tool_calls", { usage: { prompt_tokens: 1, completion_tokens: 1 } }),
  ]);

  const added = events
    .filter((e) => e.event === "response.output_item.added")
    .map((e) => `${e.data.item.call_id ?? e.data.item.type}@${e.data.output_index}`);
  const addedIndexes = events
    .filter((e) => e.event === "response.output_item.added")
    .map((e) => e.data.output_index);
  assert.equal(new Set(addedIndexes).size, addedIndexes.length, `shared output_index: ${added}`);

  const doneIndexes = events
    .filter((e) => e.event === "response.output_item.done")
    .map((e) => e.data.output_index);
  assert.equal(
    new Set(doneIndexes).size,
    doneIndexes.length,
    `shared output_index: ${doneIndexes}`
  );

  const completed = events.find((e) => e.event === "response.completed");
  const callIds = completed.data.response.output
    .filter((o) => o.type === "function_call")
    .map((o) => o.call_id);
  assert.deepEqual(callIds, ["call_1", "call_2", "call_3"]);
});
