import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const encoder = new TextEncoder();

type SseEvent = {
  event: string;
  data: { response?: { output: Array<{ type: string; arguments?: string }> } };
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

const callChunks = (args: string, split = false) => {
  const head = {
    id: "a",
    model: "m",
    choices: [
      {
        index: 0,
        delta: {
          role: "assistant",
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "write_file", arguments: split ? "" : args },
            },
          ],
        },
      },
    ],
  };
  const parts = split
    ? [...args.matchAll(/.{1,7}/g)].map((match) => ({
        id: "a",
        choices: [
          { index: 0, delta: { tool_calls: [{ index: 0, function: { arguments: match[0] } }] } },
        ],
      }))
    : [];
  return [
    head,
    ...parts,
    {
      id: "a",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
  ];
};

const functionCallArgs = (events: SseEvent[]) =>
  events
    .find((entry) => entry.event === "response.completed")
    ?.data.response?.output.find((item) => item.type === "function_call")?.arguments;

const required = new Map([
  [
    "write_file",
    {
      type: "object",
      properties: { path: { type: "string" }, content: { type: "string" } },
      required: ["path", "content"],
    },
  ],
]);

test("a required empty-string argument survives, in one chunk", async () => {
  const args = '{"path":"a.txt","content":""}';
  const events = await run(callChunks(args), { toolSchemas: required });
  assert.equal(functionCallArgs(events), args);
});

test("a required empty-string argument survives, when the arguments stream in pieces", async () => {
  const args = '{"path":"a.txt","content":""}';
  const events = await run(callChunks(args, true), { toolSchemas: required });
  assert.equal(functionCallArgs(events), args);
});

test("an empty array that the schema requires survives", async () => {
  const schemas = new Map([
    ["write_file", { type: "object", properties: { tags: { type: "array" } }, required: ["tags"] }],
  ]);
  const events = await run(callChunks('{"tags":[]}'), { toolSchemas: schemas });
  assert.equal(functionCallArgs(events), '{"tags":[]}');
});

test("without a schema no argument is removed", async () => {
  const args = '{"path":"a.txt","content":""}';
  const events = await run(callChunks(args));
  assert.equal(functionCallArgs(events), args);
});

test("an optional empty string that the schema declares is still dropped", async () => {
  const schemas = new Map([
    [
      "write_file",
      {
        type: "object",
        properties: { path: { type: "string" }, note: { type: "string" } },
        required: ["path"],
      },
    ],
  ]);
  const events = await run(callChunks('{"path":"a.txt","note":""}'), { toolSchemas: schemas });
  assert.equal(functionCallArgs(events), '{"path":"a.txt"}');
});
