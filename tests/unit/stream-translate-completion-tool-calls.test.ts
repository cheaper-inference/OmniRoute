import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-completion-tools-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type JsonRecord = Record<string, unknown>;

const dataFrame = (payload: JsonRecord) => `data: ${JSON.stringify(payload)}\n\n`;
const eventFrame = (payload: JsonRecord) =>
  `event: ${payload.type}\ndata: ${JSON.stringify(payload)}\n\n`;

const body = {
  messages: [{ role: "user", content: "weather?" }],
  tools: [
    {
      type: "function",
      function: { name: "get_weather", parameters: { type: "object", properties: {} } },
    },
  ],
};

async function assemble(chunks: string[], targetFormat: string, sourceFormat: string) {
  let completed: JsonRecord | null = null;
  const source = new ReadableStream({
    start(controller) {
      for (const text of chunks) controller.enqueue(textEncoder.encode(text));
      controller.close();
    },
  });
  const stream = createSSEStream({
    mode: "translate",
    targetFormat,
    sourceFormat,
    provider: "test",
    model: "m",
    body,
    onComplete: (payload: JsonRecord) => {
      completed = payload;
    },
  } as never);
  await new Response(source.pipeThrough(stream)).text();
  const choice = (completed?.responseBody as JsonRecord).choices as JsonRecord[];
  return {
    finish: choice[0].finish_reason,
    toolCalls: ((choice[0].message as JsonRecord).tool_calls ?? []) as JsonRecord[],
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const argsOf = (call: JsonRecord) => (call.function as JsonRecord).arguments;
const nameOf = (call: JsonRecord) => (call.function as JsonRecord).name;

test("OpenAI upstream to Claude client: the saved call keeps its full arguments", async () => {
  const chunk = (delta: JsonRecord, finish: string | null = null) =>
    dataFrame({
      id: "c1",
      object: "chat.completion.chunk",
      model: "m",
      choices: [{ index: 0, delta, finish_reason: finish }],
    });
  const result = await assemble(
    [
      chunk({
        role: "assistant",
        tool_calls: [
          {
            index: 0,
            id: "call_1",
            type: "function",
            function: { name: "get_weather", arguments: "" },
          },
        ],
      }),
      chunk({ tool_calls: [{ index: 0, function: { arguments: '{"city":' } }] }),
      chunk({ tool_calls: [{ index: 0, function: { arguments: '"Paris"}' } }] }),
      chunk({}, "tool_calls"),
      "data: [DONE]\n\n",
    ],
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  );
  assert.equal(result.finish, "tool_calls");
  assert.equal(result.toolCalls.length, 1);
  assert.equal(nameOf(result.toolCalls[0]), "get_weather");
  assert.equal(argsOf(result.toolCalls[0]), '{"city":"Paris"}');
});

test("Gemini upstream to Claude client: the saved completion has the tool call", async () => {
  const result = await assemble(
    [
      dataFrame({
        candidates: [
          {
            content: {
              role: "model",
              parts: [{ functionCall: { name: "get_weather", args: { city: "Paris" } } }],
            },
            finishReason: "STOP",
          },
        ],
        usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2, totalTokenCount: 5 },
      }),
    ],
    FORMATS.GEMINI,
    FORMATS.CLAUDE
  );
  assert.equal(result.finish, "tool_calls");
  assert.equal(result.toolCalls.length, 1);
  assert.equal(nameOf(result.toolCalls[0]), "get_weather");
  assert.equal(argsOf(result.toolCalls[0]), '{"city":"Paris"}');
});

test("Responses upstream to Claude client: one saved call per tool, with full arguments", async () => {
  const items = ["a", "b"].map((id) => ({
    type: "function_call",
    id: `fc_${id}`,
    call_id: `call_${id}`,
    name: "get_weather",
    arguments: JSON.stringify({ city: id }),
  }));
  const frames = [
    eventFrame({ type: "response.created", response: { id: "r1", status: "in_progress" } }),
  ];
  items.forEach((item, i) => {
    frames.push(
      eventFrame({
        type: "response.output_item.added",
        output_index: i + 1,
        item: { ...item, arguments: "" },
      }),
      eventFrame({
        type: "response.function_call_arguments.delta",
        item_id: item.id,
        output_index: i + 1,
        delta: item.arguments,
      }),
      eventFrame({
        type: "response.function_call_arguments.done",
        item_id: item.id,
        output_index: i + 1,
        arguments: item.arguments,
      }),
      eventFrame({ type: "response.output_item.done", output_index: i + 1, item })
    );
  });
  frames.push(
    eventFrame({
      type: "response.completed",
      response: {
        id: "r1",
        status: "completed",
        output: items,
        usage: { input_tokens: 3, output_tokens: 2, total_tokens: 5 },
      },
    })
  );
  const result = await assemble(frames, FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE);
  assert.equal(result.toolCalls.length, 2);
  assert.deepEqual(result.toolCalls.map(argsOf), ['{"city":"a"}', '{"city":"b"}']);
});

test("Claude upstream to OpenAI client keeps its call and arguments (unchanged)", async () => {
  const result = await assemble(
    [
      eventFrame({
        type: "message_start",
        message: { id: "m", role: "assistant", model: "m", usage: { input_tokens: 3 } },
      }),
      eventFrame({
        type: "content_block_start",
        index: 0,
        content_block: { type: "tool_use", id: "tu_1", name: "get_weather", input: {} },
      }),
      eventFrame({
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: '{"city":"Paris"}' },
      }),
      eventFrame({ type: "content_block_stop", index: 0 }),
      eventFrame({
        type: "message_delta",
        delta: { stop_reason: "tool_use" },
        usage: { output_tokens: 2 },
      }),
      eventFrame({ type: "message_stop" }),
    ],
    FORMATS.CLAUDE,
    FORMATS.OPENAI
  );
  assert.equal(result.finish, "tool_calls");
  assert.equal(result.toolCalls.length, 1);
  assert.equal(argsOf(result.toolCalls[0]), '{"city":"Paris"}');
});

test("Gemini upstream to OpenAI client keeps its call and arguments (unchanged)", async () => {
  const result = await assemble(
    [
      dataFrame({
        candidates: [
          {
            content: {
              role: "model",
              parts: [{ functionCall: { name: "get_weather", args: { city: "Paris" } } }],
            },
            finishReason: "STOP",
          },
        ],
        usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2, totalTokenCount: 5 },
      }),
    ],
    FORMATS.GEMINI,
    FORMATS.OPENAI
  );
  assert.equal(result.finish, "tool_calls");
  assert.equal(result.toolCalls.length, 1);
  assert.equal(argsOf(result.toolCalls[0]), '{"city":"Paris"}');
});
