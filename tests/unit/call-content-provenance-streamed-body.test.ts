import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// This file owns its data directory: the call log it writes and the stream
// engine's own bookkeeping never reach an installation's database.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-streamed-body-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { saveCallLog } = await import("../../src/lib/usage/callLogs.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rowFor(id: string) {
  return getDbInstance().prepare("SELECT has_content FROM call_logs WHERE id = ?").get(id) as {
    has_content: number | null;
  };
}

function cleanup(ids: string[]) {
  const stmt = getDbInstance().prepare("DELETE FROM call_logs WHERE id = ?");
  for (const id of ids) stmt.run(id);
}

const textEncoder = new TextEncoder();

function chatChunk(delta: Record<string, unknown>, finishReason?: string): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl_streamed_body",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta, ...(finishReason ? { finish_reason: finishReason } : {}) }],
  })}\n\n`;
}

// The stream engine of the repository: the client-visible body it reports is
// the one the pipeline journals.
async function runStream(chunks: string[]): Promise<{
  clientPayload: Record<string, unknown>;
  responseBody: Record<string, unknown>;
}> {
  let captured: {
    clientPayload?: Record<string, unknown>;
    responseBody?: Record<string, unknown>;
  } | null = null;
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(textEncoder.encode(chunk));
      controller.close();
    },
  });
  await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI,
        provider: "openrouter",
        model: "test-model",
        body: { messages: [{ role: "user", content: "hello" }] },
        onComplete(payload) {
          captured = {
            clientPayload: payload.clientPayload as Record<string, unknown>,
            responseBody: payload.responseBody as Record<string, unknown>,
          };
        },
      })
    )
  ).text();
  assert.ok(captured, "the stream must report its completion");
  return captured as {
    clientPayload: Record<string, unknown>;
    responseBody: Record<string, unknown>;
  };
}

test("streamed reply journaled from the production stream body counts as content", async () => {
  const id = "ccp-stream-production-envelope";
  const { clientPayload } = await runStream([
    chatChunk({ role: "assistant", content: "Hello world" }),
    chatChunk({}, "stop"),
  ]);
  // The envelope carries the aggregated reply, which the producer stamps with
  // the same streamed marker it puts on the envelope.
  const summary = clientPayload.summary as Record<string, unknown>;
  assert.equal(summary._streamed, true);
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: clientPayload,
  });
  try {
    assert.equal(rowFor(id).has_content, 1);
  } finally {
    cleanup([id]);
  }
});

test("streamed reply journaled from the aggregated body alone counts as content", async () => {
  const id = "ccp-stream-production-body";
  const { responseBody } = await runStream([
    chatChunk({ role: "assistant", content: "Hello world" }),
    chatChunk({}, "stop"),
  ]);
  assert.equal(responseBody._streamed, true);
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: responseBody,
  });
  try {
    assert.equal(rowFor(id).has_content, 1);
  } finally {
    cleanup([id]);
  }
});

test("streamed reply carrying reasoning only counts as no content", async () => {
  const id = "ccp-stream-production-reasoning";
  const { responseBody } = await runStream([
    chatChunk({ role: "assistant", reasoning_content: "thinking" }),
    chatChunk({}, "stop"),
  ]);
  assert.equal(responseBody._streamed, true);
  // The reply carries reasoning only: reasoning is never rendered content, so
  // the journal records an empty reply (0) and not an unknown one (null).
  const message = (responseBody.choices as Array<{ message: Record<string, unknown> }>)[0].message;
  assert.equal(message.content, null);
  assert.equal(message.reasoning_content, "thinking");
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: responseBody,
  });
  try {
    assert.equal(rowFor(id).has_content, 0);
  } finally {
    cleanup([id]);
  }
});
