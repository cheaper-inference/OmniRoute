import test from "node:test";
import assert from "node:assert/strict";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";

/**
 * #19218 / #19575: GitHub Copilot's Responses stream gives every event of one message a
 * different item_id; only output_index is stable. These cases pin that the text snapshot
 * dedupe emits each answer exactly once across stream shapes beyond the single-message
 * case, and that a genuinely new message reusing an output_index stays separate.
 */

type Event = Record<string, unknown>;

// Every call yields a fresh id, the way GitHub Copilot labels each Responses event.
function rotating(prefix: string) {
  let n = 0;
  return () => `${prefix}${++n}`;
}
const fixed = (id: string) => () => id;

const msg = (id: string, text?: string) => ({
  type: "message",
  role: "assistant",
  id,
  ...(text === undefined ? {} : { content: [{ type: "output_text", text }] }),
});

function messageEvents(
  outputIndex: number,
  nextId: () => string,
  deltas: string[],
  full: string,
  { added = true } = {}
): Event[] {
  return [
    ...(added
      ? [{ type: "response.output_item.added", output_index: outputIndex, item: msg(nextId()) }]
      : []),
    ...deltas.map((delta) => ({
      type: "response.output_text.delta",
      output_index: outputIndex,
      content_index: 0,
      item_id: nextId(),
      delta,
    })),
    {
      type: "response.output_text.done",
      output_index: outputIndex,
      content_index: 0,
      item_id: nextId(),
      text: full,
    },
    { type: "response.output_item.done", output_index: outputIndex, item: msg(nextId(), full) },
  ];
}

function run(events: Event[]): string {
  const state = {};
  let out = "";
  for (const event of [...events, null]) {
    const result: unknown = openaiResponsesToOpenAIResponse(event, state);
    for (const chunk of (Array.isArray(result) ? result : result ? [result] : []) as Event[]) {
      const choices = chunk?.choices as { delta?: { content?: string } }[] | undefined;
      out += choices?.[0]?.delta?.content ?? "";
    }
  }
  return out;
}

const completed = (...output: unknown[]): Event => ({
  type: "response.completed",
  response: { output },
});

const A = "Copilot rotates every id.";
const B = "A second, separate message.";

test("1: one message, stable ids", () => {
  const id = fixed("m");
  const events = [
    ...messageEvents(0, id, ["Copilot rot", "ates every", " id."], A),
    completed(msg("m", A)),
  ];
  assert.equal(run(events), A);
});

test("2: one message at output_index 1, new id on every event, reasoning at 0", () => {
  const id = rotating("m");
  const events = [
    ...messageEvents(1, id, ["Copilot rot", "ates every", " id."], A),
    completed({ type: "reasoning" }, msg(id(), A)),
  ];
  assert.equal(run(events), A);
});

test("3: two messages at indexes 0 and 1, stable ids", () => {
  const events = [
    ...messageEvents(0, fixed("a"), ["Copilot ", "rotates every id."], A),
    ...messageEvents(1, fixed("b"), ["A second, ", "separate message."], B),
    completed(msg("a", A), msg("b", B)),
  ];
  assert.equal(run(events), A + B);
});

test("4: two messages at indexes 0 and 1, rotating ids, each announced", () => {
  const id = rotating("x");
  const events = [
    ...messageEvents(0, id, ["Copilot ", "rotates every id."], A),
    ...messageEvents(1, id, ["A second, ", "separate message."], B),
    completed(msg(id(), A), msg(id(), B)),
  ];
  assert.equal(run(events), A + B);
});

test("5: rotating ids, last delta lost; the missing tail is recovered once", () => {
  const id = rotating("m");
  const events = [
    ...messageEvents(0, id, ["Copilot rot", "ates every"], A),
    completed(msg(id(), A)),
  ];
  assert.equal(run(events), A);
});

test("6: a second message reusing an output_index after its own output_item.added stays separate", () => {
  const events = [
    ...messageEvents(0, fixed("a"), ["Copilot ", "rotates every id."], A),
    ...messageEvents(0, fixed("b"), ["A second, ", "separate message."], B),
  ];
  assert.equal(run(events), A + B);
});

test("7: reused output_index, new id, second message arrives only as snapshots", () => {
  const events = [
    ...messageEvents(0, fixed("a"), ["Copilot ", "rotates every id."], A),
    { type: "response.output_item.added", output_index: 0, item: msg("b") },
    { type: "response.output_text.done", output_index: 0, content_index: 0, item_id: "b", text: B },
    { type: "response.output_item.done", output_index: 0, item: msg("b", B) },
  ];
  assert.equal(run(events), A + B);
});

test("8: rotating ids, done carries no text-continuation, completed only", () => {
  const id = rotating("m");
  const events = [
    { type: "response.output_item.added", output_index: 0, item: msg(id()) },
    ...["Copilot rot", "ates every", " id."].map((delta) => ({
      type: "response.output_text.delta",
      output_index: 0,
      content_index: 0,
      item_id: id(),
      delta,
    })),
    completed(msg(id(), A)),
  ];
  assert.equal(run(events), A);
});
