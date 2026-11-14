import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-tc-placeholder-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// Test-only loose shape: the fixtures below are fully known.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = any;

const textEncoder = new TextEncoder();

function chunk(delta: Record<string, unknown>, finishReason: string | null = null): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl_ph",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

async function run(chunks: string[]) {
  let completed: Loose | null = null;
  const source = new ReadableStream({
    start(controller) {
      for (const c of chunks) controller.enqueue(textEncoder.encode(c));
      controller.close();
    },
  });
  const stream = createSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "gpt-4.1-mini",
    body: { messages: [{ role: "user", content: "hi" }] },
    onComplete(payload: Loose) {
      completed = payload;
    },
  });
  const text = await new Response(source.pipeThrough(stream)).text();
  const events = text
    .split("\n\n")
    .map((b) => b.trim())
    .filter((b) => b.startsWith("data: {"))
    .map((b) => JSON.parse(b.slice(6)));
  return { text, events, completed: completed as Loose | null };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("all-empty tool_calls placeholders never become a phantom call or a tool_calls finish", async () => {
  const { text, events, completed } = await run([
    chunk({ role: "assistant", content: "" }),
    chunk({
      tool_calls: [
        { index: 0, id: null, type: "function", function: { name: null, arguments: null } },
      ],
    }),
    chunk({ tool_calls: [{ index: 0, function: { arguments: "" } }] }),
    chunk({ content: "Hello" }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);

  assert.ok(!text.includes('tool_calls":['), `phantom tool_calls reached client:\n${text}`);
  assert.ok(!text.includes("call_"), `an id was minted for a placeholder:\n${text}`);
  const finish = events.map((e) => e.choices?.[0]?.finish_reason).filter(Boolean);
  assert.deepEqual(finish, ["stop"]);
  assert.equal(completed?.responseBody.choices[0].message.tool_calls, undefined);
  assert.equal(completed?.responseBody.choices[0].finish_reason, "stop");
});

test("name-only, id-only and argument fragments of one real call are all kept", async () => {
  const { events, completed } = await run([
    chunk({ tool_calls: [{ index: 0, function: { name: "read_file" } }] }),
    chunk({ tool_calls: [{ index: 0, function: { arguments: '{"path":' } }] }),
    chunk({ tool_calls: [{ index: 0, function: { arguments: '"a"}' } }] }),
    chunk({ tool_calls: [{ index: 1, id: "call_id_only" }] }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);

  const fragments = events.flatMap((e) => e.choices?.[0]?.delta?.tool_calls ?? []);
  assert.equal(fragments.length, 4, "every non-empty fragment is forwarded");
  assert.equal(fragments[0].function.name, "read_file");
  assert.ok(typeof fragments[0].id === "string" && fragments[0].id.length > 0);
  assert.equal(fragments[3].id, "call_id_only");
  const calls = completed?.responseBody.choices[0].message.tool_calls;
  assert.equal(calls.length, 2);
  assert.equal(calls[0].function.arguments, '{"path":"a"}');
  assert.equal(events.at(-1)?.choices?.[0]?.finish_reason, "tool_calls");
});

test("a tool_call with an extension key (not a placeholder) is kept", async () => {
  const { events } = await run([
    chunk({
      tool_calls: [{ index: 0, extra_content: { google: { thought_signature: "sig" } } }],
    }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
  const fragments = events.flatMap((e) => e.choices?.[0]?.delta?.tool_calls ?? []);
  assert.equal(fragments.length, 1);
  assert.deepEqual(fragments[0].extra_content, { google: { thought_signature: "sig" } });
});

test("a placeholder riding on a content chunk is removed from the forwarded line", async () => {
  const { text, events } = await run([
    chunk({ content: "Hi", tool_calls: [{ index: 0, function: { arguments: "" } }] }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!text.includes("tool_calls"), `placeholder forwarded:\n${text}`);
  assert.equal(events[0].choices[0].delta.content, "Hi");
});
