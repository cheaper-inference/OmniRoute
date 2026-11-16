import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-summary-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");

const textEncoder = new TextEncoder();
const LOG_WINDOW = 64 * 1024;

type ToolCall = { id: string; function: { name: string; arguments: string } };
type Choice = {
  finish_reason: string;
  message: { content: string | null; tool_calls?: ToolCall[] };
};
type Completion = { status: number; responseBody: { choices: Choice[] } };

async function run(frames: string[], options: Record<string, unknown>) {
  let completion: Completion | null = null;
  const source = new ReadableStream({
    start(controller) {
      for (const f of frames) controller.enqueue(textEncoder.encode(f));
      controller.close();
    },
  });
  const stream = createSSEStream({
    ...options,
    onComplete(payload: Completion) {
      completion = payload;
    },
  } as never);
  const text = await new Response(source.pipeThrough(stream)).text();
  assert.ok(completion, "onComplete must fire");
  return { text, completion: completion as Completion };
}

const sse = (event: object, name?: string) =>
  `${name ? `event: ${name}\n` : ""}data: ${JSON.stringify(event)}\n\n`;

function chat(delta: Record<string, unknown>, finish: string | null = null) {
  return sse({
    id: "chatcmpl_sum",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finish }],
  });
}

function cacheSpy() {
  const stored: Record<string, unknown>[] = [];
  const deps = {
    isCacheableForWrite: () => true,
    isSmallEnoughForSemanticCache: () => true,
    generateSignature: () => "sig",
    setCachedResponse: (_sig: unknown, _model: string, body: Record<string, unknown>) => {
      stored.push(body);
    },
  } as Parameters<typeof storeStreamingSemanticCacheResponse>[1];
  return { deps, stored };
}

function store(
  body: Record<string, unknown>,
  deps: Parameters<typeof storeStreamingSemanticCacheResponse>[1]
) {
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: body,
      body: { messages: [{ role: "user", content: "q" }], temperature: 0 },
      headers: undefined,
      model: "m",
    },
    deps
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an answer longer than the log window is not stored as a cache hit", async () => {
  const frames = [chat({ role: "assistant", content: "HEAD-MARKER " })];
  for (let i = 0; i < 100; i++) frames.push(chat({ content: "x".repeat(1000) }));
  frames.push(chat({ content: " TAIL-MARKER" }, "stop"), "data: [DONE]\n\n");

  const { text, completion } = await run(frames, {
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "m",
    body: { messages: [] },
  });
  assert.ok(text.includes("HEAD-MARKER"), "the client still receives the whole answer");
  const content = completion.responseBody.choices[0].message.content ?? "";
  assert.ok(content.length <= LOG_WINDOW, "the log copy keeps its bound");

  const { deps, stored } = cacheSpy();
  store(completion.responseBody, deps);
  assert.equal(stored.length, 0, "a tail-only body must not be cached as the full answer");
});

test("a short answer is still stored in the cache", async () => {
  const { completion } = await run(
    [chat({ role: "assistant", content: "Hello" }), chat({}, "stop"), "data: [DONE]\n\n"],
    { mode: "passthrough", sourceFormat: FORMATS.OPENAI, provider: "openai", model: "m", body: {} }
  );
  const { deps, stored } = cacheSpy();
  store(completion.responseBody, deps);
  assert.equal(stored.length, 1);
  assert.equal((stored[0].choices as Choice[])[0].message.content, "Hello");
});

const CLAUDE_FRAMES = [
  sse(
    {
      type: "message_start",
      message: { id: "msg_1", type: "message", role: "assistant", model: "m", content: [] },
    },
    "message_start"
  ),
  sse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "toolu_1", name: "get_weather", input: {} },
    },
    "content_block_start"
  ),
  sse(
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "input_json_delta", partial_json: '{"city":"Paris"}' },
    },
    "content_block_delta"
  ),
  sse({ type: "content_block_stop", index: 0 }, "content_block_stop"),
  sse(
    { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 5 } },
    "message_delta"
  ),
  sse({ type: "message_stop" }, "message_stop"),
];

test("native Claude tool_use reaches the completion summary and the wire is unchanged", async () => {
  const { text, completion } = await run(CLAUDE_FRAMES, {
    mode: "passthrough",
    clientResponseFormat: FORMATS.CLAUDE,
    provider: "claude",
    model: "m",
    body: { messages: [] },
  });
  assert.equal(text, CLAUDE_FRAMES.join(""), "wire events must not change");
  const choice = completion.responseBody.choices[0];
  assert.equal(choice.finish_reason, "tool_calls");
  assert.equal(choice.message.tool_calls.length, 1);
  assert.equal(choice.message.tool_calls[0].id, "toolu_1");
  assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), { city: "Paris" });
});

test("native Responses function_call reaches the completion summary and the wire is unchanged", async () => {
  const item = {
    id: "fc_1",
    type: "function_call",
    status: "completed",
    call_id: "call_1",
    name: "get_weather",
    arguments: '{"city":"Paris"}',
  };
  const frames = [
    sse(
      { type: "response.created", sequence_number: 0, response: { id: "resp_1", output: [] } },
      "response.created"
    ),
    sse(
      {
        type: "response.output_item.added",
        sequence_number: 1,
        output_index: 0,
        item: { ...item, status: "in_progress", arguments: "" },
      },
      "response.output_item.added"
    ),
    sse(
      { type: "response.output_item.done", sequence_number: 2, output_index: 0, item },
      "response.output_item.done"
    ),
    sse(
      {
        type: "response.completed",
        sequence_number: 3,
        response: { id: "resp_1", object: "response", status: "completed", output: [item] },
      },
      "response.completed"
    ),
  ];
  const { text, completion } = await run(frames, {
    mode: "passthrough",
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    provider: "openai",
    model: "m",
    body: { input: "hi", tools: [{ type: "function", name: "get_weather" }] },
    dropResponsesCommentary: false,
  });
  assert.equal((text.match(/event: /g) ?? []).length, frames.length, "no synthesized wire event");
  const choice = completion.responseBody.choices[0];
  assert.equal(choice.finish_reason, "tool_calls");
  assert.equal(choice.message.tool_calls.length, 1);
  assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), { city: "Paris" });
});

test("a text-only native Claude turn stays a stop summary without tool calls", async () => {
  const frames = [
    sse(
      { type: "message_start", message: { id: "m", role: "assistant", content: [] } },
      "message_start"
    ),
    sse(
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      "content_block_start"
    ),
    sse(
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Hello" } },
      "content_block_delta"
    ),
    sse({ type: "content_block_stop", index: 0 }, "content_block_stop"),
    sse(
      { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 1 } },
      "message_delta"
    ),
    sse({ type: "message_stop" }, "message_stop"),
  ];
  const { completion } = await run(frames, {
    mode: "passthrough",
    clientResponseFormat: FORMATS.CLAUDE,
    provider: "claude",
    model: "m",
    body: { messages: [] },
  });
  const choice = completion.responseBody.choices[0];
  assert.equal(choice.finish_reason, "stop");
  assert.equal(choice.message.tool_calls, undefined);
  assert.equal(choice.message.content, "Hello");
});
