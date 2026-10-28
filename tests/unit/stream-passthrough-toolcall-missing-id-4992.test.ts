// Regression for upstream 9router #4992: in openai→openai passthrough, a
// delta.tool_calls fragment that OPENS a new index without an `id` was forwarded
// verbatim. Strict OpenAI-compatible clients (@ai-sdk/openai-compatible) throw
// "Expected 'id' to be a string." on such a slot opener and abort the turn.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-tc-id-4992-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

async function readTransformed(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(textEncoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options))).text();
}

function chunk(delta: Record<string, unknown>, finishReason: string | null = null) {
  return `data: ${JSON.stringify({
    id: "chatcmpl_4992",
    object: "chat.completion.chunk",
    created: 1,
    model: "deepseek-v4.1-flash",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

function toolCallFrames(text: string) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)))
    .flatMap((payload) => payload?.choices?.[0]?.delta?.tool_calls ?? []);
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("#4992 passthrough fills a stable id on a tool_call fragment that opens a new index without one", async () => {
  type ToolCall = { id: string; function: { arguments: string } };
  let onCompletePayload: {
    responseBody?: { choices?: Array<{ message?: { tool_calls?: ToolCall[] } }> };
  } | null = null;
  const text = await readTransformed(
    [
      chunk({
        role: "assistant",
        tool_calls: [
          { index: 0, id: "call_a", type: "function", function: { name: "f", arguments: "" } },
        ],
      }),
      // continuation of index 0 — no id, must stay untouched
      chunk({ tool_calls: [{ index: 0, function: { arguments: '{"x":1}' } }] }),
      // opens index 1 WITHOUT an id — the defect
      chunk({
        tool_calls: [{ index: 1, type: "function", function: { name: "g", arguments: "" } }],
      }),
      // continuation of index 1 — no id
      chunk({ tool_calls: [{ index: 1, function: { arguments: "{}" } }] }),
      chunk({}, "tool_calls"),
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "opencode-go",
      model: "deepseek-v4.1-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      onComplete(payload: typeof onCompletePayload) {
        onCompletePayload = payload;
      },
    }
  );

  const frames = toolCallFrames(text);
  assert.equal(frames.length, 4, "all four tool_call fragments are forwarded");

  const [openA, contA, openB, contB] = frames;
  assert.equal(openA.id, "call_a", "an upstream id is preserved");
  assert.equal(contA.id, undefined, "a continuation fragment is not given an id");

  assert.equal(openB.index, 1);
  assert.equal(typeof openB.id, "string", "the slot opener for index 1 carries a string id");
  assert.ok(openB.id.length > 0, "the generated id is non-empty");
  assert.notEqual(openB.id, "call_a", "the generated id does not collide with index 0");
  assert.equal(contB.id, undefined, "the continuation of index 1 is not given another id");

  const finalToolCalls = onCompletePayload?.responseBody?.choices?.[0]?.message?.tool_calls;
  assert.ok(Array.isArray(finalToolCalls), "the call-log response carries tool_calls");
  assert.equal(finalToolCalls.length, 2);
  assert.equal(finalToolCalls[0].id, "call_a");
  assert.equal(
    finalToolCalls[1].id,
    openB.id,
    "the call log records the same id sent to the client"
  );
  assert.equal(finalToolCalls[1].function.arguments, "{}");
});

test("#4992 passthrough treats an empty-string id on a slot opener as missing", async () => {
  const text = await readTransformed(
    [
      chunk({
        role: "assistant",
        tool_calls: [
          { index: 0, id: "", type: "function", function: { name: "f", arguments: "" } },
        ],
      }),
      chunk({}, "tool_calls"),
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "opencode-go",
      model: "deepseek-v4.1-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
    }
  );

  const [opener] = toolCallFrames(text);
  assert.equal(typeof opener.id, "string");
  assert.ok(opener.id.length > 0, "an empty id is replaced on the slot opener");
});
