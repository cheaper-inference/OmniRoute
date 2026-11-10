import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-commandcode-cli-error-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { CommandCodeExecutor } = await import("../../open-sse/executors/commandCode.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;
const encoder = new TextEncoder();

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

type Chunk = string | (() => Promise<string>);

/** An NDJSON body that yields each entry as its own read() chunk (a function entry is awaited). */
function chunkedBody(chunks: Chunk[]): ReadableStream<Uint8Array> {
  let index = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (index >= chunks.length) {
        controller.close();
        return;
      }
      const chunk = chunks[index++];
      controller.enqueue(encoder.encode(typeof chunk === "string" ? chunk : await chunk()));
    },
  });
}

/** 403 on the provider endpoint, then the given NDJSON chunks on /alpha/generate. */
function mockCliFallback(chunks: Chunk[]): { cliCalls: number } {
  const counter = { cliCalls: 0 };
  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr.includes("/provider/v1/")) {
      return new Response(JSON.stringify({ error: { message: "upgrade_required" } }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("/alpha/generate")) {
      counter.cliCalls++;
      return new Response(chunkedBody(chunks), {
        status: 200,
        headers: { "Content-Type": "application/x-ndjson" },
      });
    }
    return new Response("Not found", { status: 404 });
  };
  return counter;
}

function embeddedError(statusCode: number, message: string): string {
  return (
    JSON.stringify({
      type: "error",
      error: { type: "server_error", statusCode, isRetryable: true, message },
    }) + "\n"
  );
}

async function run(stream: boolean) {
  const executor = new CommandCodeExecutor();
  return executor.execute({
    model: "deepseek/deepseek-v4-flash",
    stream,
    credentials: { apiKey: "cc_go_plan_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  } as Parameters<CommandCodeExecutor["execute"]>[0]);
}

test("CLI fallback: embedded 503 after start (separate chunks) fails a streaming request before commit", async () => {
  const counter = mockCliFallback([
    '{"type":"start"}\n',
    '{"type":"start-step"}\n',
    embeddedError(503, "Service temporarily unavailable"),
  ]);
  const { response } = await run(true);
  assert.equal(counter.cliCalls, 1);
  assert.equal(response.status, 503);
  assert.equal(response.ok, false);
  const body = (await response.json()) as { error: { message: string; type: string } };
  assert.match(body.error.message, /Service temporarily unavailable/);
  assert.equal(body.error.type, "server_error");
});

test("CLI fallback: embedded 503 fails a non-stream request with the embedded status", async () => {
  mockCliFallback(['{"type":"start"}\n', embeddedError(503, "Service temporarily unavailable")]);
  const { response } = await run(false);
  assert.equal(response.status, 503);
  const body = (await response.json()) as { error: { message: string } };
  assert.match(body.error.message, /Service temporarily unavailable/);
});

test("CLI fallback: embedded 429 keeps its rate-limit status", async () => {
  mockCliFallback(['{"type":"start"}\n', embeddedError(429, "Too many requests")]);
  const { response } = await run(true);
  assert.equal(response.status, 429);
});

test("CLI fallback: embedded error without a usable status defaults to 503", async () => {
  mockCliFallback(['{"type":"start"}\n{"type":"error","error":{"message":"boom"}}\n']);
  const { response } = await run(true);
  assert.equal(response.status, 503);
});

test("CLI fallback: error message in the synthetic body is sanitized", async () => {
  mockCliFallback([
    embeddedError(503, "upstream failed\n    at Object.<anonymous> (/srv/app/index.js:10:5)"),
  ]);
  const { response } = await run(false);
  assert.equal(response.status, 503);
  const body = (await response.json()) as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), body.error.message);
  assert.ok(!body.error.message.includes("/srv/app/index.js"), body.error.message);
});

test("CLI fallback: text-delta before an error keeps the 200 stream and delivers the content", async () => {
  let releaseLateError: () => void = () => undefined;
  const lateErrorGate = new Promise<void>((resolve) => {
    releaseLateError = resolve;
  });
  mockCliFallback([
    '{"type":"start"}\n',
    '{"type":"text-delta","text":"partial answer"}\n',
    async () => {
      await lateErrorGate;
      return embeddedError(503, "late failure");
    },
  ]);
  const { response } = await run(true);
  assert.equal(response.status, 200);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let streamError: unknown = null;
  try {
    for (;;) {
      if (text.includes("partial answer")) releaseLateError();
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch (error) {
    streamError = error;
  }
  assert.ok(text.includes("partial answer"), "peeked content frame must be replayed");
  assert.ok(streamError instanceof Error, "a mid-stream error stays a mid-stream error");
});

test("CLI fallback: healthy multi-chunk stream is replayed in full", async () => {
  mockCliFallback([
    '{"type":"start"}\n{"type":"start-step"}\n',
    '{"type":"reasoning-delta","text":"think"}\n{"type":"text-del',
    'ta","text":"Hello"}\n',
    '{"type":"text-delta","text":" world"}\n',
    '{"type":"finish","finishReason":"stop","usage":{"inputTokens":5,"outputTokens":2,"totalTokens":7}}\n',
  ]);
  const { response } = await run(true);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
  const text = await response.text();
  const chunks = text
    .split("\n\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)));
  const deltas = chunks.flatMap((chunk) => chunk.choices.map((c: { delta: unknown }) => c.delta));
  assert.deepEqual(deltas.slice(0, 4), [
    { role: "assistant" },
    { reasoning_content: "think" },
    { content: "Hello" },
    { content: " world" },
  ]);
  assert.ok(text.includes('"finish_reason":"stop"'));
  assert.ok(text.includes('"total_tokens":7'));
  assert.ok(text.trimEnd().endsWith("data: [DONE]"));
});

test("CLI fallback: healthy non-stream JSON aggregates every peeked and later frame", async () => {
  mockCliFallback([
    '{"type":"start"}\n',
    '{"type":"text-delta","text":"Hel"}\n',
    '{"type":"text-delta","text":"lo"}\n{"type":"finish","finishReason":"stop"}\n',
  ]);
  const { response } = await run(false);
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    choices: Array<{ message: { content: string }; finish_reason: string }>;
  };
  assert.equal(body.choices[0].message.content, "Hello");
  assert.equal(body.choices[0].finish_reason, "stop");
});

test("CLI fallback: stream that ends with only start frames still returns a normal 200", async () => {
  mockCliFallback(['{"type":"start"}\n', '{"type":"start-step"}']);
  const { response } = await run(true);
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.ok(text.includes('"role":"assistant"'));
  assert.ok(text.includes("data: [DONE]"));
});
