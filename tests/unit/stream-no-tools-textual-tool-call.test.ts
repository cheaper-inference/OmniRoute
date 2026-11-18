import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-no-tools-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();
const CALL_TEXT = '[Tool call: read_file]\nArguments: {"path":"a.txt"}';

function chatChunk(delta: Record<string, unknown>, finishReason: string | null = null): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl_nt",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

async function run(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream({
    start(controller) {
      for (const c of chunks) controller.enqueue(textEncoder.encode(c));
      controller.close();
    },
  });
  const text = await new Response(source.pipeThrough(createSSEStream(options as never))).text();
  const events = text
    .split("\n\n")
    .map((b) => b.trim())
    .filter((b) => b.startsWith("data: {"))
    .map((b) => JSON.parse(b.slice(6)));
  return { text, events };
}

const chatOptions = (body: Record<string, unknown>) => ({
  mode: "passthrough",
  sourceFormat: FORMATS.OPENAI,
  provider: "openai",
  model: "gpt-4.1-mini",
  body,
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("chat stream: quoted textual call is plain text when the request declares no tools", async () => {
  const { text, events } = await run(
    [
      chatChunk({ role: "assistant", content: "Example: " }),
      chatChunk({ content: CALL_TEXT }),
      chatChunk({}, "stop"),
      "data: [DONE]\n\n",
    ],
    chatOptions({ messages: [{ role: "user", content: "show syntax" }] })
  );

  assert.ok(!text.includes("tool_calls"), `a tool call was minted:\n${text}`);
  const content = events.map((e) => e.choices?.[0]?.delta?.content ?? "").join("");
  assert.equal(content, `Example: ${CALL_TEXT}`);
  const finish = events.map((e) => e.choices?.[0]?.finish_reason).filter(Boolean);
  assert.deepEqual(finish, ["stop"]);
});

test("chat stream: split quoted textual call is plain text when tools is an empty array", async () => {
  const { text, events } = await run(
    [
      chatChunk({ role: "assistant", content: "[Tool" }),
      chatChunk({ content: " call: read_file]\nArguments: " }),
      chatChunk({ content: '{"path":"a.txt"}' }),
      chatChunk({}, "stop"),
      "data: [DONE]\n\n",
    ],
    chatOptions({ messages: [], tools: [] })
  );

  assert.ok(!text.includes("tool_calls"), `a tool call was minted:\n${text}`);
  const content = events.map((e) => e.choices?.[0]?.delta?.content ?? "").join("");
  assert.equal(content, CALL_TEXT);
});

test("chat stream: textual call is still converted when the tool is declared", async () => {
  const { events } = await run(
    [
      chatChunk({ role: "assistant", content: CALL_TEXT }),
      chatChunk({}, "stop"),
      "data: [DONE]\n\n",
    ],
    chatOptions({
      messages: [],
      tools: [{ type: "function", function: { name: "read_file", parameters: {} } }],
    })
  );

  const calls = events.flatMap((e) => e.choices?.[0]?.delta?.tool_calls ?? []);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].function.name, "read_file");
  assert.equal(
    events.at(-1)?.choices?.[0]?.finish_reason ?? events.at(-2)?.choices?.[0]?.finish_reason,
    "tool_calls"
  );
});

test("chat stream: a real provider tool event passes unchanged when no tools are declared", async () => {
  const { events } = await run(
    [
      chatChunk({
        tool_calls: [
          { index: 0, id: "call_real", type: "function", function: { name: "x", arguments: "{}" } },
        ],
      }),
      chatChunk({}, "stop"),
      "data: [DONE]\n\n",
    ],
    chatOptions({ messages: [] })
  );
  const calls = events.flatMap((e) => e.choices?.[0]?.delta?.tool_calls ?? []);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].id, "call_real");
});

test("responses stream: quoted textual call stays a text delta when no tools are declared", async () => {
  const delta = {
    type: "response.output_text.delta",
    item_id: "msg_1",
    output_index: 0,
    content_index: 0,
    delta: CALL_TEXT,
  };
  const completed = {
    type: "response.completed",
    response: { id: "resp_nt", object: "response", status: "completed", output: [] },
  };
  const { text, events } = await run(
    [`data: ${JSON.stringify(delta)}\n\n`, `data: ${JSON.stringify(completed)}\n\n`],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { input: "show syntax" },
      dropResponsesCommentary: false,
    }
  );

  assert.ok(!text.includes("function_call"), `a function_call was minted:\n${text}`);
  const textDeltas = events.filter((e) => e.type === "response.output_text.delta");
  assert.equal(textDeltas.length, 1);
  assert.equal(textDeltas[0].delta, CALL_TEXT);
});
