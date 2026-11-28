import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const encoder = new TextEncoder();

type SseEvent = {
  event: string;
  data: {
    output_index?: number;
    delta?: string;
    item?: { type: string };
    response?: { output: Array<{ type: string }> };
  };
};

async function run(chunks: unknown[], options: Record<string, unknown> = {}): Promise<SseEvent[]> {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      }
      controller.close();
    },
  });
  const text = await new Response(
    source.pipeThrough(createResponsesApiTransformStream(null, 3_600_000, options))
  ).text();
  const events: SseEvent[] = [];
  for (const block of text.split("\n\n")) {
    const event = block.match(/^event: (.+)$/m)?.[1];
    const data = block.match(/^data: (.+)$/m)?.[1];
    if (event && data && data !== "[DONE]") events.push({ event, data: JSON.parse(data) });
  }
  return events;
}

const toolSchemas = new Map([["f", { type: "object", properties: {} }]]);
const call = (id: string, index = 0) => ({
  index,
  id,
  type: "function",
  function: { name: "f", arguments: "{}" },
});
const chunk = (delta: unknown, finish: string | null = null, extra: object = {}) => ({
  id: "y",
  model: "m",
  choices: [{ index: 0, delta, finish_reason: finish }],
  ...extra,
});
const finish = chunk({}, "tool_calls", {
  usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
});

const added = (events: SseEvent[]) =>
  events
    .filter((entry) => entry.event === "response.output_item.added")
    .map((entry) => ({ type: entry.data.item?.type, index: entry.data.output_index }));
const textDeltas = (events: SseEvent[]) =>
  events
    .filter((entry) => entry.event === "response.output_text.delta")
    .map((entry) => ({ text: entry.data.delta, index: entry.data.output_index }));
const unique = (items: Array<{ index?: number }>) =>
  new Set(items.map((item) => item.index)).size === items.length;

test("text after a first tool call gets its own output_index", async () => {
  const events = await run(
    [
      chunk({ role: "assistant", tool_calls: [call("call_1")] }),
      chunk({ content: "hello" }),
      finish,
    ],
    { toolSchemas }
  );
  assert.ok(unique(added(events)), JSON.stringify(added(events)));
  const output = events.find((entry) => entry.event === "response.completed")?.data.response
    ?.output;
  assert.equal(output?.length, 2);
});

test("several text deltas after a tool call stay on one message item", async () => {
  const events = await run(
    [
      chunk({ role: "assistant", tool_calls: [call("call_1")] }),
      chunk({ content: "B" }),
      chunk({ content: "C" }),
      finish,
    ],
    { toolSchemas }
  );
  const messages = added(events).filter((item) => item.type === "message");
  assert.equal(messages.length, 1);
  assert.ok(unique(added(events)), JSON.stringify(added(events)));
  assert.deepEqual(
    textDeltas(events).map((delta) => delta.text),
    ["B", "C"]
  );
  assert.equal(new Set(textDeltas(events).map((delta) => delta.index)).size, 1);
});

test("reasoning after a first tool call gets its own output_index", async () => {
  const events = await run(
    [
      chunk({ role: "assistant", tool_calls: [call("call_1")] }),
      chunk({ reasoning_content: "late thought" }),
      finish,
    ],
    { toolSchemas }
  );
  assert.ok(unique(added(events)), JSON.stringify(added(events)));
});

test("text before a tool call keeps its index (no change for the common order)", async () => {
  const events = await run(
    [chunk({ role: "assistant", content: "A" }), chunk({ tool_calls: [call("call_1")] }), finish],
    { toolSchemas }
  );
  assert.deepEqual(added(events), [
    { type: "message", index: 0 },
    { type: "function_call", index: 1 },
  ]);
});
