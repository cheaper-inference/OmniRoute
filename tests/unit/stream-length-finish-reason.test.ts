/**
 * A streamed reply the provider cut at the output-token limit must reach the
 * assembled completion body with its real finish_reason ("length"), so the
 * streaming semantic-cache store refuses to cache a truncated answer
 * (second half of the `length`-stop finding; the store guard itself is covered
 * by semantic-cache-length-stop.test.ts).
 *
 * The passthrough and translate accumulators built that body with
 * `finish_reason: tool_calls|stop`, so an upstream `length` was masked, the
 * truncation guard could not fire, and the cut reply was replayed for every
 * identical `temperature: 0` request.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-stream-length-"));
process.env.DATA_DIR = DIR;

const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createPassthroughStreamWithLogger, createSSETransformStreamWithLogger } =
  await import("../../open-sse/utils/stream.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");
const sem = await import("../../src/lib/semanticCache.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Completed = {
  status?: number;
  responseBody?: { choices?: Array<{ finish_reason?: unknown }> } | null;
  usage?: unknown;
} | null;

/** Push `sse` through `transform` and drain everything the client would read. */
async function runStream(transform: TransformStream, sse: string): Promise<void> {
  const enc = new TextEncoder();
  const rs = new ReadableStream({
    start(c) {
      c.enqueue(enc.encode(sse));
      c.close();
    },
  });
  const reader = rs.pipeThrough(transform).getReader();
  while (!(await reader.read()).done) {}
}

const chatChunk = (delta: Record<string, unknown>, finishReason: string | null = null) =>
  `data: ${JSON.stringify({
    id: "chatcmpl_len",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4o",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;

const claudeEvent = (type: string, data: Record<string, unknown>) =>
  `event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`;

test("passthrough: a length-finish plain-text stream keeps finish_reason length and is not cached", async () => {
  let completed: Completed = null;
  const body = {
    messages: [{ role: "user", content: "count to five thousand" }],
    temperature: 0,
    stream: true,
  };
  const ts = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-4o",
    "conn-len-1",
    body,
    (p) => {
      completed = p;
    },
    null,
    null,
    "openai",
    null,
    null,
    null
  );
  await runStream(
    ts,
    chatChunk({ role: "assistant", content: "The answer begins and then " }) +
      chatChunk({}, "length") +
      "data: [DONE]\n\n"
  );
  assert.equal(completed?.status, 200);
  assert.equal(completed?.responseBody?.choices?.[0]?.finish_reason, "length");
  assert.equal(sem.isTruncatedStreamBody(completed?.responseBody), true);

  storeStreamingSemanticCacheResponse({
    enabled: true,
    streamStatus: 200,
    streamResponseBody: completed?.responseBody,
    body,
    headers: {},
    model: "gpt-4o",
    provider: "openai",
    apiKeyId: "k-len-1",
    streamUsage: completed?.usage as Record<string, unknown> | null,
  });
  const sig = sem.generateSignature(
    "gpt-4o",
    body.messages,
    0,
    undefined,
    "k-len-1",
    sem.outputContractOf(body)
  );
  assert.equal(sem.getCachedResponse(sig), null, "a length-cut stream must not be cached");
});

test("passthrough control: a stop-finish stream still caches", async () => {
  let completed: Completed = null;
  const body = {
    messages: [{ role: "user", content: "say done" }],
    temperature: 0,
    stream: true,
  };
  const ts = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-4o",
    "conn-len-2",
    body,
    (p) => {
      completed = p;
    },
    null,
    null,
    "openai",
    null,
    null,
    null
  );
  await runStream(
    ts,
    chatChunk({ role: "assistant", content: "done" }) + chatChunk({}, "stop") + "data: [DONE]\n\n"
  );
  assert.equal(completed?.responseBody?.choices?.[0]?.finish_reason, "stop");

  storeStreamingSemanticCacheResponse({
    enabled: true,
    streamStatus: 200,
    streamResponseBody: completed?.responseBody,
    body,
    headers: {},
    model: "gpt-4o",
    provider: "openai",
    apiKeyId: "k-len-2",
    streamUsage: completed?.usage as Record<string, unknown> | null,
  });
  const sig = sem.generateSignature(
    "gpt-4o",
    body.messages,
    0,
    undefined,
    "k-len-2",
    sem.outputContractOf(body)
  );
  assert.notEqual(sem.getCachedResponse(sig), null, "a complete stop stream is still cacheable");
});

test("passthrough: tool calls with an upstream length finish keep finish_reason length", async () => {
  let completed: Completed = null;
  const body = {
    messages: [{ role: "user", content: "write the file" }],
    temperature: 0,
    stream: true,
  };
  const ts = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-4o",
    "conn-len-3",
    body,
    (p) => {
      completed = p;
    },
    null,
    null,
    "openai",
    null,
    null,
    null
  );
  await runStream(
    ts,
    chatChunk({ role: "assistant" }) +
      chatChunk({
        tool_calls: [
          {
            index: 0,
            id: "call_1",
            type: "function",
            function: { name: "write_file", arguments: '{"path":"a.txt"}' },
          },
        ],
      }) +
      chatChunk({}, "length") +
      "data: [DONE]\n\n"
  );
  assert.equal(completed?.responseBody?.choices?.[0]?.finish_reason, "length");
});

test("translate claude->chat: stop_reason max_tokens becomes finish_reason length", async () => {
  let completed: Completed = null;
  const body = {
    messages: [{ role: "user", content: "count to five thousand" }],
    temperature: 0,
    stream: true,
  };
  // (targetFormat = upstream provider format, sourceFormat = client format)
  const ts = createSSETransformStreamWithLogger(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "anthropic",
    null,
    null,
    "claude-sonnet-4-6",
    "conn-len-4",
    body,
    (p) => {
      completed = p;
    },
    null,
    null
  );
  await runStream(
    ts,
    claudeEvent("message_start", {
      message: {
        id: "msg_1",
        role: "assistant",
        model: "claude-sonnet-4-6",
        usage: { input_tokens: 10 },
      },
    }) +
      claudeEvent("content_block_start", { index: 0, content_block: { type: "text", text: "" } }) +
      claudeEvent("content_block_delta", {
        index: 0,
        delta: { type: "text_delta", text: "The answer begins and then " },
      }) +
      claudeEvent("content_block_stop", { index: 0 }) +
      claudeEvent("message_delta", {
        delta: { stop_reason: "max_tokens" },
        usage: { output_tokens: 6 },
      }) +
      claudeEvent("message_stop", {})
  );
  assert.equal(completed?.status, 200);
  assert.equal(completed?.responseBody?.choices?.[0]?.finish_reason, "length");
  assert.equal(sem.isTruncatedStreamBody(completed?.responseBody), true);
});

test("translate responses->chat: response.incomplete (max_output_tokens) becomes finish_reason length", async () => {
  let completed: Completed = null;
  const body = {
    messages: [{ role: "user", content: "count to five thousand" }],
    temperature: 0,
    stream: true,
  };
  // (targetFormat = upstream provider format, sourceFormat = client format)
  const ts = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "codex",
    null,
    null,
    "gpt-5.6-sol",
    "conn-len-5",
    body,
    (p) => {
      completed = p;
    },
    null,
    null
  );
  await runStream(
    ts,
    `event: response.output_text.delta\ndata: ${JSON.stringify({ type: "response.output_text.delta", item_id: "msg_1", output_index: 0, delta: "The answer begins and then " })}\n\n` +
      `event: response.incomplete\ndata: ${JSON.stringify({
        type: "response.incomplete",
        response: {
          id: "resp_1",
          status: "incomplete",
          incomplete_details: { reason: "max_output_tokens" },
          usage: { input_tokens: 10, output_tokens: 7, total_tokens: 17 },
          output: [
            {
              type: "message",
              id: "msg_1",
              content: [{ type: "output_text", text: "The answer begins and then " }],
            },
          ],
        },
      })}\n\n`
  );
  assert.equal(completed?.status, 200);
  assert.equal(completed?.responseBody?.choices?.[0]?.finish_reason, "length");
});
