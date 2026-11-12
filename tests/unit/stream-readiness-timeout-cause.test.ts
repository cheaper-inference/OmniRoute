/**
 * Readiness timeout contract:
 *  - the deadline returns even when the provider's `cancel()` promise never settles;
 *  - `response.queued` / `response.metadata` lifecycle frames are not model output, so an
 *    overload error after them stays a failure the caller can fail over from;
 *  - a timeout keeps the first upstream error cause instead of a bare "stall".
 */
import test from "node:test";
import assert from "node:assert/strict";

import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();

function sseResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function closedStream(frames: string[]): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
}

/** Emits `frames`, then holds the connection open; `cancel()` returns `cancelResult()`. */
function heldOpenStream(
  frames: string[],
  cancelResult: () => Promise<void> | void = () => {}
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
    },
    pull() {
      return new Promise<void>(() => {});
    },
    cancel() {
      return cancelResult();
    },
  });
}

const frame = (event: string, payload: unknown) =>
  `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;

test("readiness deadline returns even when the provider cancel() never settles", async () => {
  let cancelCalls = 0;
  const body = heldOpenStream([], () => {
    cancelCalls += 1;
    return new Promise<void>(() => {});
  });

  let sentinel: ReturnType<typeof setTimeout> | undefined;
  const outcome = await Promise.race([
    ensureStreamReadiness(sseResponse(body), { timeoutMs: 50 }),
    new Promise<"HUNG">((resolve) => {
      sentinel = setTimeout(() => resolve("HUNG"), 1000);
    }),
  ]);
  clearTimeout(sentinel);

  assert.notEqual(outcome, "HUNG", "readiness stayed pending on the provider cancel promise");
  if (outcome === "HUNG") return;
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "STREAM_READINESS_TIMEOUT");
  assert.equal(outcome.response.status, 504);
  assert.equal(cancelCalls, 1);
});

test("response.queued and response.metadata do not make the stream ready", async () => {
  const result = await ensureStreamReadiness(
    sseResponse(
      closedStream([
        frame("response.queued", {
          type: "response.queued",
          response: { id: "resp_1", status: "queued" },
        }),
        frame("response.metadata", {
          type: "response.metadata",
          response: { id: "resp_1", metadata: { region: "r1" } },
        }),
        `data: ${JSON.stringify({ error: { message: "Overloaded", type: "overloaded_error" } })}\n\n`,
      ])
    ),
    { timeoutMs: 500 }
  );

  assert.equal(result.ok, false, "queued/metadata frames released the stream as ready");
  if (result.ok) return;
  assert.equal(result.code, "STREAM_EARLY_EOF");
  assert.equal(result.upstreamDiagnostic, "Overloaded");
});

test("other response.* lifecycle frames still make the stream ready", async () => {
  const result = await ensureStreamReadiness(
    sseResponse(
      closedStream([
        frame("response.created", {
          type: "response.created",
          response: { id: "resp_1", status: "in_progress" },
        }),
      ])
    ),
    { timeoutMs: 500 }
  );

  assert.equal(result.ok, true);
  if (result.ok) await result.response.body?.cancel().catch(() => {});
});

test("a readiness timeout keeps the first upstream error cause", async () => {
  const errorFrame = `data: ${JSON.stringify({
    error: { message: "insufficient_quota: monthly quota exhausted", type: "insufficient_quota" },
  })}\n\n`;

  const result = await ensureStreamReadiness(sseResponse(heldOpenStream([errorFrame])), {
    timeoutMs: 60,
  });

  assert.equal(result.ok, false);
  if (result.ok) return;
  // Routing class is unchanged: still the readiness timeout.
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
  assert.equal(result.response.status, 504);
  assert.match(result.upstreamDiagnostic ?? "", /monthly quota exhausted/);
  assert.match(result.reason, /monthly quota exhausted/);
  // The stable classification text must not carry upstream words (#8972).
  assert.doesNotMatch(result.classificationReason, /quota/i);

  const body = (await result.response.json()) as {
    error: { message: string; code: string };
    upstream_details?: { error: { message: string } };
  };
  assert.equal(body.error.code, "STREAM_READINESS_TIMEOUT");
  assert.doesNotMatch(body.error.message, /quota/i);
  assert.equal(body.upstream_details?.error.message, result.upstreamDiagnostic);
});
