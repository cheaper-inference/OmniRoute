// Codex (ChatGPT-plan accounts) can reject a model with an HTTP 200
// text/event-stream whose first meaningful event is `response.failed` / `error`
// carrying "The configured model is unavailable from the provider — it may have
// been renamed, retired, or is not offered on this account." (sometimes after an
// empty `response.output_text.delta`). Passed through as a 200, the client gets a
// failed turn and the combo never tries the next model. The peek must classify it
// as model-unavailable and the executor must surface a model-scoped 400 — not a
// 503, which is a provider-breaker status and would retry the same model as if it
// were a capacity problem.
import test from "node:test";
import assert from "node:assert/strict";

import {
  CodexExecutor,
  __setCodexWebSocketTransportForTesting,
  peekCodexSseTransientError,
} from "../../open-sse/executors/codex.ts";
import { isModelScoped400 } from "../../open-sse/services/modelAccessDenied.ts";
import { comboTargetDecision } from "../../open-sse/services/combo/statusDecisionTable.ts";

const UNAVAILABLE_MESSAGE =
  "The configured model is unavailable from the provider — it may have been renamed, retired, or is not offered on this account.";
const READ_TIMEOUT_MS = 50;

test.afterEach(() => {
  __setCodexWebSocketTransportForTesting(undefined);
});

function sseResponse(chunks: string[]): Response {
  const encoder = new TextEncoder();
  let i = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[i]));
      i++;
    },
  });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function sseFrame(payload: Record<string, unknown>): string {
  return `event: ${String(payload.type)}\ndata: ${JSON.stringify(payload)}\n\n`;
}

const CREATED = sseFrame({
  type: "response.created",
  response: { id: "resp_1", status: "in_progress" },
});
const EMPTY_DELTA = sseFrame({ type: "response.output_text.delta", delta: "" });
const FAILED = sseFrame({
  type: "response.failed",
  response: { id: "resp_1", status: "failed", error: { message: UNAVAILABLE_MESSAGE } },
});

test("model-unavailable wording is a model-scoped 400 that advances the combo", () => {
  assert.equal(isModelScoped400(UNAVAILABLE_MESSAGE), true);
  assert.equal(comboTargetDecision(400, UNAVAILABLE_MESSAGE), "advance");
});

test("peek classifies created + empty delta + response.failed model-unavailable", async () => {
  const peek = await peekCodexSseTransientError(
    sseResponse([CREATED, EMPTY_DELTA, FAILED]),
    READ_TIMEOUT_MS
  );

  assert.ok(peek.matched, "expected the model-unavailable failure to be matched");
  assert.equal(peek.modelUnavailable, true);
  assert.equal(peek.message, UNAVAILABLE_MESSAGE);
  assert.equal(peek.replacementBody, null);
});

test("peek classifies a bare `event: error` frame without a type field", async () => {
  const peek = await peekCodexSseTransientError(
    sseResponse([
      `event: error\ndata: ${JSON.stringify({ error: { message: UNAVAILABLE_MESSAGE } })}\n\n`,
    ]),
    READ_TIMEOUT_MS
  );

  assert.ok(peek.matched);
  assert.equal(peek.modelUnavailable, true);
  assert.equal(peek.message, UNAVAILABLE_MESSAGE);
});

test("peek classifies a final error frame the upstream closes without a blank line", async () => {
  const peek = await peekCodexSseTransientError(
    sseResponse([
      EMPTY_DELTA,
      `event: response.failed\ndata: ${JSON.stringify({ error: { message: UNAVAILABLE_MESSAGE } })}\n`,
    ]),
    READ_TIMEOUT_MS
  );

  assert.equal(peek.modelUnavailable, true);
  assert.equal(peek.message, UNAVAILABLE_MESSAGE);
});

test("peek classifies the failure when the frame is split across chunks", async () => {
  const half = Math.floor(FAILED.length / 2);
  const peek = await peekCodexSseTransientError(
    sseResponse([CREATED, FAILED.slice(0, half), FAILED.slice(half)]),
    READ_TIMEOUT_MS
  );

  assert.equal(peek.modelUnavailable, true);
  assert.equal(peek.message, UNAVAILABLE_MESSAGE);
});

test("peek does not classify output text that merely quotes the phrase", async () => {
  const chunks = [
    CREATED,
    sseFrame({
      type: "response.output_text.delta",
      delta:
        "That plan is not offered on this account, but the configured model is unavailable from the provider list.",
    }),
    sseFrame({ type: "response.completed", response: { id: "resp_1", status: "completed" } }),
  ];
  const peek = await peekCodexSseTransientError(sseResponse(chunks), READ_TIMEOUT_MS);

  assert.equal(peek.matched, null);
  assert.ok(peek.replacementBody, "expected the stream to be passed through");
  assert.equal(await new Response(peek.replacementBody).text(), chunks.join(""));
});

test("peek still classifies capacity errors as transient (not model-unavailable)", async () => {
  const peek = await peekCodexSseTransientError(
    sseResponse([
      `event: error\ndata: ${JSON.stringify({ error: { message: "Selected model is at capacity. Please try a different model." } })}\n\n`,
    ]),
    READ_TIMEOUT_MS
  );

  assert.equal(peek.matched, "selected model is at capacity");
  assert.notEqual(peek.modelUnavailable, true);
});

async function executeWithUpstream(chunks: string[]) {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => sseResponse(chunks);
  try {
    return await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("CodexExecutor.execute converts the 200-SSE model-unavailable failure into a model-scoped 400", async () => {
  const result = await executeWithUpstream([CREATED, EMPTY_DELTA, FAILED]);

  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.match(body.error.message, /configured model is unavailable/i);
  assert.equal(isModelScoped400(body.error.message), true);
  // Hard Rule #12: never leak raw stack/paths in the sanitized error body.
  assert.equal(body.error.message.includes("at /"), false);
});

test("CodexExecutor.execute keeps the capacity failure on the 503 path", async () => {
  const result = await executeWithUpstream([
    CREATED,
    `event: error\ndata: ${JSON.stringify({ error: { message: "Selected model is at capacity. Please try a different model." } })}\n\n`,
  ]);

  assert.equal(result.response.status, 503);
});
