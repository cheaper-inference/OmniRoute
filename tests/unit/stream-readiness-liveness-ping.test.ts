import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureStreamReadiness,
  hasStreamReadinessSignal,
  isReasoningProgressFrame,
} from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// A ping frame: structured but explicitly excluded from readiness signals.
const PING_CHUNK = "event: ping\ndata: {}\n\n";

// A stream that only ever emits pings (no useful signal, never closes).
function pingOnlyStream(intervalMs: number, count: number): ReadableStream<Uint8Array> {
  let n = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (n >= count) {
        controller.close();
        return;
      }
      n += 1;
      await sleep(intervalMs);
      controller.enqueue(encoder.encode(PING_CHUNK));
    },
    cancel() {},
  });
}

// A Claude thinking_delta frame split across two chunks: the first read carries
// the whole frame WITHOUT its trailing blank line, the second read carries the
// blank line that completes the event.
const PARTIAL_REASONING_FRAME =
  'event: content_block_delta\ndata: {"type":"content_block_delta","index":1,"delta":{"type":"thinking_delta","thinking":"working through the answer"}}\n';
const FRAME_TERMINATOR = "\n";

function splitReasoningFrameStream(frameGapMs: number): ReadableStream<Uint8Array> {
  let emitted = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (emitted === 0) {
        await sleep(frameGapMs);
        controller.enqueue(encoder.encode(PARTIAL_REASONING_FRAME));
        emitted += 1;
        return;
      }
      if (emitted === 1) {
        await sleep(frameGapMs);
        controller.enqueue(encoder.encode(FRAME_TERMINATOR));
        emitted += 1;
        return;
      }
      controller.close();
    },
    cancel() {},
  });
}

// Red proof: a stream that only ever pings must fail at its FIRST deadline,
// not consume the whole ceiling. The ceiling is deliberately higher than the
// initial deadline (maxTimeoutMs > timeoutMs) so the base code's "any chunk
// extends" tolerance would otherwise push the failure to the ceiling. The
// fix keeps the initial deadline running for ping-only streams.
test("ping-only stream fails at the first deadline, not the ceiling", async () => {
  const timeoutMs = 100;
  const maxTimeoutMs = 400;
  const response = new Response(pingOnlyStream(30, 40), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs,
    maxTimeoutMs,
  });
  try {
    assert.equal(result.ok, false);
    if (result.ok) assert.fail("ping-only stream must remain a readiness failure");
    assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
    assert.equal(result.response.status, 504);
    // The deadline is not the ceiling (max=400ms) but the initial one (100ms):
    // pings did not extend it.
    assert.match(result.reason, /within 100ms \(max=400ms\)/);
  } finally {
    await response.body?.cancel().catch(() => {});
  }
});

// Guard: a slow stream whose liveness is a reasoning-progress frame split
// across two reads must reach ready past the initial deadline. The first read
// (the whole frame WITHOUT its terminating blank line) already carries the
// extension signal — the one-shot predicates see the reasoning frame — so the
// deadline is extended even though the gate's own event is still incomplete;
// the second read (the blank line) completes the event into a readiness
// signal. maxTimeoutMs > timeoutMs so the extension branch is live from the
// first chunk (without a strict ceiling the branch would be false from the
// start and the guard would pass trivially). Green on the base; red if the
// extension stops counting the first frame.
test("slow reasoning-progress stream stays ready past the initial deadline", async () => {
  const timeoutMs = 150;
  const maxTimeoutMs = 1000;
  const response = new Response(splitReasoningFrameStream(80), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs,
    maxTimeoutMs,
  });
  try {
    assert.equal(result.ok, true);
    if (!result.ok) assert.fail("a reasoning-progress stream must be ready");
    assert.equal(result.response.status, 200);
    await result.response.body?.cancel().catch(() => {});
  } finally {
    if (!result.ok) await result.response.body?.cancel().catch(() => {});
  }
});

// One shared definition of "alive" for the gate and the deadline extension:
// the extension predicate (hasStreamReadinessSignal || isReasoningProgressFrame)
// reaches the same verdict as hasUsefulStreamContent on keepalives and
// ping-only frames — neither may extend the deadline.
test("the extension predicate rejects keepalives and ping-only frames", () => {
  assert.equal(
    hasStreamReadinessSignal(": keepalive\n\n") || isReasoningProgressFrame(": keepalive\n\n"),
    false
  );
  assert.equal(hasStreamReadinessSignal(PING_CHUNK) || isReasoningProgressFrame(PING_CHUNK), false);
});
