import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const encoder = new TextEncoder();

type SseEvent = {
  event: string;
  data: { delta?: string; response: { output: Array<{ type: string }> } };
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

const toolSchemas = new Map([["f", {}]]);

test("whitespace-only first text does not drop a tool call in the same chunk", async () => {
  const events = await run(
    [
      {
        id: "a",
        model: "m",
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              content: "\n\n",
              tool_calls: [
                {
                  index: 0,
                  id: "call_1",
                  type: "function",
                  function: { name: "f", arguments: "{}" },
                },
              ],
            },
          },
        ],
      },
      {
        id: "a",
        choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      },
    ],
    { toolSchemas }
  );
  const output = events.find((entry) => entry.event === "response.completed")?.data.response.output;
  assert.equal(output.length, 1);
  assert.equal(output[0].type, "function_call");
});

test("whitespace-only first text does not drop a finish_reason in the same chunk", async () => {
  const events = await run([
    {
      id: "a",
      model: "m",
      choices: [{ index: 0, delta: { role: "assistant", content: "\n" }, finish_reason: "length" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
  ]);
  assert.ok(events.some((entry) => entry.event === "response.incomplete"));
});

test("leading blank lines of the first text are still trimmed", async () => {
  const events = await run([
    {
      id: "a",
      model: "m",
      choices: [{ index: 0, delta: { role: "assistant", content: "\n\nHello" } }],
    },
    { id: "a", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
  ]);
  const deltas = events
    .filter((entry) => entry.event === "response.output_text.delta")
    .map((entry) => entry.data.delta);
  assert.deepEqual(deltas, ["Hello"]);
});

test("a blank first chunk followed by real text emits the text once, trimmed", async () => {
  const events = await run([
    { id: "a", model: "m", choices: [{ index: 0, delta: { role: "assistant", content: "\n" } }] },
    { id: "a", choices: [{ index: 0, delta: { content: "Hi" } }] },
    { id: "a", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
  ]);
  const deltas = events
    .filter((entry) => entry.event === "response.output_text.delta")
    .map((entry) => entry.data.delta);
  assert.deepEqual(deltas, ["Hi"]);
});
