import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Ev = {
  event: string;
  data: {
    output_index?: number;
    item_id?: string;
    item?: { id?: string; type: string; summary?: Array<{ text: string }> };
    response?: { output: Array<{ type: string; summary?: Array<{ text: string }> }> };
  };
};

function run(deltas: Array<Record<string, unknown>>): Ev[] {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const chunks = deltas.map((delta) => ({
    id: "c1",
    model: "m",
    choices: [{ index: 0, delta, finish_reason: null }],
  }));
  chunks.push({
    id: "c1",
    model: "m",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 1, completion_tokens: 1 },
  } as never);
  return [...chunks, null].flatMap(
    (chunk) => (openaiToOpenAIResponsesResponse(chunk, state) ?? []) as Ev[]
  );
}

const added = (events: Ev[]) =>
  events
    .filter((entry) => entry.event === "response.output_item.added")
    .map((entry) => ({ type: entry.data.item?.type, index: entry.data.output_index }));
const unique = (items: Array<{ index?: number }>) =>
  new Set(items.map((item) => item.index)).size === items.length;
const reasoningTexts = (events: Ev[]) =>
  (events.find((entry) => entry.event === "response.completed")?.data.response?.output ?? [])
    .filter((item) => item.type === "reasoning")
    .map((item) => item.summary?.[0]?.text);

test("reasoning after content opens a new reasoning item, and no reasoning text is lost", () => {
  const events = run([{ reasoning_content: "a" }, { content: "x" }, { reasoning_content: "b" }]);
  assert.deepEqual(reasoningTexts(events), ["a", "b"]);
});

test("no reasoning delta is sent for an item that is already done", () => {
  const events = run([{ reasoning_content: "a" }, { content: "x" }, { reasoning_content: "b" }]);
  const doneAt = new Map<string, number>();
  events.forEach((entry, position) => {
    if (entry.event === "response.output_item.done" && entry.data.item?.id) {
      doneAt.set(entry.data.item.id, position);
    }
  });
  events.forEach((entry, position) => {
    if (entry.event !== "response.reasoning_summary_text.delta") return;
    const done = doneAt.get(String(entry.data.item_id));
    assert.ok(done === undefined || position < done, `delta after done for ${entry.data.item_id}`);
  });
});

test("reasoning after content gets its own output_index", () => {
  const events = run([{ content: "x" }, { reasoning_content: "late" }]);
  assert.ok(unique(added(events)), JSON.stringify(added(events)));
});

test("all output indexes stay unique when reasoning comes back after content", () => {
  const events = run([{ reasoning_content: "a" }, { content: "x" }, { reasoning_content: "b" }]);
  assert.ok(unique(added(events)), JSON.stringify(added(events)));
});

test("continuous reasoning deltas stay in one item", () => {
  const events = run([{ reasoning_content: "a" }, { reasoning_content: "b" }, { content: "x" }]);
  assert.deepEqual(reasoningTexts(events), ["ab"]);
  assert.deepEqual(added(events), [
    { type: "reasoning", index: 0 },
    { type: "message", index: 1 },
  ]);
});

test("a second <think> block after text opens a second reasoning item", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const send = (delta: Record<string, unknown>) => ({
    id: "c1",
    model: "deepseek-r1",
    choices: [{ index: 0, delta, finish_reason: null }],
  });
  const events = [
    send({ content: "<think>one</think>text " }),
    send({ content: "<think>two</think>done" }),
    {
      id: "c1",
      model: "deepseek-r1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 1 },
    },
    null,
  ].flatMap((chunk) => (openaiToOpenAIResponsesResponse(chunk, state) ?? []) as Ev[]);
  assert.deepEqual(reasoningTexts(events), ["one", "two"]);
  assert.ok(unique(added(events)), JSON.stringify(added(events)));
});
