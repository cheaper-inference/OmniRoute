import test from "node:test";
import assert from "node:assert/strict";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";

interface Chunk {
  choices: {
    delta: { content?: string; role?: string; tool_calls?: unknown[] };
    finish_reason: string | null;
  }[];
  usage?: Record<string, number>;
}
type Event = Record<string, unknown>;

const message = (id: string | undefined, ...texts: string[]) => ({
  id,
  type: "message",
  role: "assistant",
  content: texts.map((text) => ({ type: "output_text", text })),
});

const completed = (...output: unknown[]): Event => ({
  type: "response.completed",
  response: { output },
});

const delta = (text: string, identity: Event = {}): Event => ({
  type: "response.output_text.delta",
  delta: text,
  ...identity,
});

const done = (text: unknown, identity: Event = {}): Event => ({
  type: "response.output_text.done",
  text,
  ...identity,
});

const itemDone = (item: unknown, identity: Event = {}): Event => ({
  type: "response.output_item.done",
  item,
  ...identity,
});

function run(events: (Event | null)[], state: Record<string, unknown> = {}): Chunk[] {
  return events.flatMap((event) => {
    const result: unknown = openaiResponsesToOpenAIResponse(event, state);
    return (Array.isArray(result) ? result : result ? [result] : []) as Chunk[];
  });
}

const text = (chunks: Chunk[]) =>
  chunks.map((chunk) => chunk.choices[0].delta.content ?? "").join("");

test("GitHub Copilot rotating item_id does not duplicate assistant text (#19218)", () => {
  // In GitHub Copilot Responses streams, every event carries a different obfuscated/ephemeral item_id
  // while sharing the same output_index and content_index.
  const fullText = "Ibu kota Amerika Serikat adalah **Washington, D.C.**";

  const events: Event[] = [
    { type: "response.output_item.added", output_index: 0, item: message("ID_1") },
    { type: "response.content_part.added", output_index: 0, content_index: 0, item_id: "ID_2" },
    delta("I", { output_index: 0, content_index: 0, item_id: "ID_3" }),
    delta("bu", { output_index: 0, content_index: 0, item_id: "ID_4" }),
    delta(" kota Amerika Serikat adalah **Washington, D.C.**", {
      output_index: 0,
      content_index: 0,
      item_id: "ID_5",
    }),
    done(fullText, { output_index: 0, content_index: 0, item_id: "ID_6" }),
    {
      type: "response.content_part.done",
      output_index: 0,
      content_index: 0,
      item_id: "ID_7",
      part: { type: "output_text", text: fullText },
    },
    itemDone(message("ID_8", fullText), { output_index: 0 }),
    completed(message("ID_9", fullText)),
    null,
  ];

  const chunks = run(events);
  assert.equal(
    text(chunks),
    fullText,
    "assistant text must be emitted exactly once despite rotating item IDs"
  );

  // Count how many content delta chunks were emitted
  const contentDeltas = chunks
    .map((c) => c.choices[0].delta.content)
    .filter((c): c is string => typeof c === "string" && c.length > 0);

  // Exactly 3 delta chunks were streamed; none from done / itemDone / completed snapshots
  assert.equal(contentDeltas.length, 3);
  assert.deepEqual(contentDeltas, ["I", "bu", " kota Amerika Serikat adalah **Washington, D.C.**"]);
});

test("rotating item_id with partial prefix recovers only the missing suffix once (#19218)", () => {
  const events: Event[] = [
    delta("Hello, ", { output_index: 0, content_index: 0, item_id: "ROT_1" }),
    done("Hello, World!", { output_index: 0, content_index: 0, item_id: "ROT_2" }),
    itemDone(message("ROT_3", "Hello, World!"), { output_index: 0 }),
    completed(message("ROT_4", "Hello, World!")),
  ];

  const chunks = run(events);
  assert.equal(text(chunks), "Hello, World!");

  const contentDeltas = chunks
    .map((c) => c.choices[0].delta.content)
    .filter((c): c is string => typeof c === "string" && c.length > 0);

  assert.deepEqual(contentDeltas, ["Hello, ", "World!"]);
});

test("distinct output indices with rotating item IDs remain independent (#19218)", () => {
  const events: Event[] = [
    delta("First", { output_index: 0, content_index: 0, item_id: "OUT0_1" }),
    delta("Second", { output_index: 1, content_index: 0, item_id: "OUT1_1" }),
    done("First", { output_index: 0, content_index: 0, item_id: "OUT0_2" }),
    done("Second", { output_index: 1, content_index: 0, item_id: "OUT1_2" }),
    completed(message("OUT0_3", "First"), message("OUT1_3", "Second")),
  ];

  const chunks = run(events);
  assert.equal(text(chunks), "FirstSecond");
});
