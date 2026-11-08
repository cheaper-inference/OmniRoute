import assert from "node:assert/strict";
import test from "node:test";

import { markEmptyTurnExecution } from "../../open-sse/utils/emptyTurnPolicy.ts";
import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();

function event(type: string, payload: Record<string, unknown>): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...payload })}\n\n`;
}

function streamResponse(chunks: string[]): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function deferred<T = void>(): {
  promise: Promise<T>;
  resolve: (value: T extends void ? undefined : T) => void;
} {
  let resolvePromise: (value: T extends void ? undefined : T) => void = () => {};
  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve as (value: T extends void ? undefined : T) => void;
  });
  return { promise, resolve: resolvePromise };
}

async function collectBytes(response: Response): Promise<Uint8Array> {
  assert.ok(response.body);
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    assert.ok(value);
    chunks.push(value);
    total += value.byteLength;
  }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

const created = event("response.created", {
  response: { id: "resp-probe", status: "in_progress" },
});

test("content probe preserves an executed native Claude empty turn", async () => {
  const messageStart = event("message_start", {
    message: { id: "msg-probe", type: "message", role: "assistant", content: [] },
  });
  const messageDelta = event("message_delta", {
    delta: { stop_reason: "end_turn", stop_sequence: null },
  });
  const messageStop = event("message_stop", {});
  const upstream = streamResponse([messageStart, messageDelta, messageStop]);
  const executed = markEmptyTurnExecution(upstream, "https://api.anthropic.com/v1/messages", {
    connectionId: "test-connection",
    apiKey: "test-key",
  });
  const result = await ensureStreamReadiness(executed, { timeoutMs: 500, contentProbeMs: 1_000 });

  assert.equal(result.ok, true);
  assert.equal(await result.response.text(), messageStart + messageDelta + messageStop);
});

test("opaque Claude signatures are progress, not output that commits the content probe", async () => {
  const upstream = streamResponse([
    event("message_start", { message: { id: "msg-signature", content: [] } }),
    event("content_block_start", { index: 0, content_block: { type: "thinking", thinking: "" } }),
    event("content_block_delta", {
      index: 0,
      delta: { type: "signature_delta", signature: "opaque-signature" },
    }),
    event("content_block_stop", { index: 0 }),
    event("message_delta", { delta: { stop_reason: "end_turn" } }),
    event("message_stop", {}),
  ]);
  const executed = markEmptyTurnExecution(upstream, "https://api.anthropic.com/v1/messages", {
    connectionId: "signature-connection",
    apiKey: "test-key",
  });
  const result = await ensureStreamReadiness(executed, { timeoutMs: 500, contentProbeMs: 1_000 });

  assert.equal(result.ok, false);
  if (result.ok) assert.fail("an opaque signature cannot establish usable output");
  assert.equal(result.code, "empty_content");
  assert.equal(result.response.status, 502);
});

test("content probe bounds an empty lifecycle and returns empty_content at EOF", async () => {
  const completed = event("response.completed", {
    response: { id: "resp-probe", status: "completed", output: [] },
  });
  const result = await ensureStreamReadiness(streamResponse([created, completed]), {
    timeoutMs: 500,
    contentProbeMs: 1_000,
  });

  assert.equal(result.ok, false);
  if (result.ok) assert.fail("an empty completed Responses turn must be rejected");
  assert.equal(result.response.status, 502);
  assert.equal(result.code, "empty_content");
  assert.equal(result.classificationReason, "Provider returned empty content");
});

test("encrypted-only Responses reasoning is not counted as user-visible content", async () => {
  const reasoning = {
    id: "rs-encrypted",
    type: "reasoning",
    encrypted_content: "opaque-upstream-reasoning",
    summary: [],
  };
  const result = await ensureStreamReadiness(
    streamResponse([
      created,
      event("response.output_item.added", { output_index: 0, item: reasoning }),
      event("response.completed", {
        response: { id: "resp-probe", status: "completed", output: [reasoning] },
      }),
    ]),
    { timeoutMs: 500, contentProbeMs: 1_000 }
  );

  assert.equal(result.ok, false);
  if (result.ok) assert.fail("encrypted reasoning alone must not satisfy the empty-content guard");
  assert.equal(result.code, "empty_content");
  assert.equal(result.response.status, 502);
});

test("a legit empty length terminal is preserved instead of classified empty", async () => {
  const roleStart = `data: ${JSON.stringify({
    id: "chatcmpl-probe",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
  })}\n\n`;
  const lengthEnd = `data: ${JSON.stringify({
    id: "chatcmpl-probe",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: {}, finish_reason: "length" }],
  })}\n\n`;
  const result = await ensureStreamReadiness(streamResponse([roleStart, lengthEnd]), {
    timeoutMs: 500,
    contentProbeMs: 100,
  });

  assert.equal(result.ok, true);
  assert.equal(await result.response.text(), roleStart + lengthEnd);
});

test("content probe returns within its small budget while the next upstream read is pending", async () => {
  let upstreamCancelled: unknown;
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(created));
      },
      pull() {
        return new Promise<void>(() => {});
      },
      cancel(reason) {
        upstreamCancelled = reason;
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
  const startedAt = Date.now();
  const result = await ensureStreamReadiness(response, { timeoutMs: 500, contentProbeMs: 15 });
  const elapsedMs = Date.now() - startedAt;

  assert.equal(result.ok, true);
  assert.ok(
    elapsedMs < 300,
    `the 15ms content probe should hand off promptly, took ${elapsedMs}ms`
  );
  assert.ok(result.response.body);
  const reader = result.response.body.getReader();
  assert.deepEqual(await reader.read(), { done: false, value: encoder.encode(created) });
  await reader.cancel("bounded probe test cleanup");
  assert.equal(upstreamCancelled, "bounded probe test cleanup");
});

test("delayed reasoning after probe timeout preserves pending split UTF-8 bytes exactly", async () => {
  const releasePendingRead = deferred<void>();
  const reasoning = event("response.reasoning_summary_text.delta", {
    item_id: "rs-delayed",
    delta: "slow café 🧠",
  });
  const reasoningBytes = encoder.encode(reasoning);
  const emojiStart = reasoningBytes.indexOf(0xf0);
  assert.ok(emojiStart > 0, "fixture must contain a multi-byte emoji");
  const firstPart = reasoningBytes.slice(0, emojiStart + 2);
  const secondPart = reasoningBytes.slice(emojiStart + 2);
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(created));
      },
      pull(controller) {
        return releasePendingRead.promise.then(() => {
          controller.enqueue(firstPart);
          controller.enqueue(secondPart);
          controller.close();
        });
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
  const result = await ensureStreamReadiness(response, { timeoutMs: 500, contentProbeMs: 15 });

  assert.equal(result.ok, true);
  releasePendingRead.resolve(undefined);
  const actualBytes = await collectBytes(result.response);
  const expectedBytes = new Uint8Array(encoder.encode(created).length + reasoningBytes.length);
  expectedBytes.set(encoder.encode(created));
  expectedBytes.set(reasoningBytes, encoder.encode(created).length);
  assert.deepEqual(actualBytes, expectedBytes);
  assert.equal(new TextDecoder().decode(actualBytes), created + reasoning);
});

test("a source error arriving after probe handoff is preserved for the consumer", async () => {
  const releaseError = deferred<void>();
  const upstreamError = new Error("upstream failed after readiness handoff");
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(created));
      },
      pull(controller) {
        return releaseError.promise.then(() => controller.error(upstreamError));
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
  const result = await ensureStreamReadiness(response, { timeoutMs: 500, contentProbeMs: 15 });

  assert.equal(result.ok, true);
  assert.ok(result.response.body);
  const reader = result.response.body.getReader();
  assert.equal((await reader.read()).done, false);
  const pendingRead = reader.read();
  releaseError.resolve(undefined);
  await assert.rejects(pendingRead, (error: Error) => error === upstreamError);
});

test("client cancellation after probe handoff reaches the pending upstream read", async () => {
  let upstreamCancelled: unknown;
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(created));
      },
      pull() {
        return new Promise<void>(() => {});
      },
      cancel(reason) {
        upstreamCancelled = reason;
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
  const result = await ensureStreamReadiness(response, { timeoutMs: 500, contentProbeMs: 15 });

  assert.equal(result.ok, true);
  assert.ok(result.response.body);
  const reader = result.response.body.getReader();
  assert.equal((await reader.read()).done, false);
  const pendingRead = reader.read();
  await reader.cancel("client disconnected during pending read");
  assert.equal(upstreamCancelled, "client disconnected during pending read");
  assert.equal((await pendingRead).done, true);
});

test("function_call item start is useful before arguments finish and is replayed once", async () => {
  const functionCall = event("response.output_item.added", {
    output_index: 0,
    item: {
      id: "fc-incomplete",
      type: "function_call",
      call_id: "call-incomplete",
      name: "lookup",
      arguments: "",
    },
  });
  const result = await ensureStreamReadiness(streamResponse([created, functionCall]), {
    timeoutMs: 500,
    contentProbeMs: 100,
  });

  assert.equal(result.ok, true);
  const body = await result.response.text();
  assert.equal(
    body,
    created + functionCall,
    "each buffered source frame must be replayed exactly once"
  );
});

test("64KiB of buffered lifecycle bytes bypasses the content probe", async () => {
  const oversizedLifecycle = event("provider.lifecycle", { padding: "x".repeat(66 * 1024) });
  const result = await ensureStreamReadiness(streamResponse([created, oversizedLifecycle]), {
    timeoutMs: 500,
    contentProbeMs: 5_000,
  });

  assert.equal(result.ok, true);
  assert.equal(await result.response.text(), created + oversizedLifecycle);
});
