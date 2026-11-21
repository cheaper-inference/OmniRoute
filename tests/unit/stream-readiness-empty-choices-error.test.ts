/**
 * A 200 stream whose first frame is `{choices: [], error: {...}}` (a relay forwarding a dead
 * downstream) carries no completion. Readiness must treat it like any error-only frame and fail
 * the turn, so combo fallback runs, instead of handing the client an empty 200.
 * A normal `choices: []` frame (usage-only chunk) must stay a non-error frame.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureStreamReadiness,
  hasStreamReadinessSignal,
} from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();

function sse(chunks: string[]): Response {
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

const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;

test("empty choices plus error is not a readiness signal", () => {
  assert.equal(
    hasStreamReadinessSignal(frame({ choices: [], error: { message: "downstream closed" } })),
    false
  );
});

test("empty choices without error stays a readiness signal (usage-only chunk)", () => {
  assert.equal(hasStreamReadinessSignal(frame({ choices: [], usage: { total_tokens: 3 } })), true);
});

test("empty choices with a null error field stays a readiness signal", () => {
  assert.equal(
    hasStreamReadinessSignal(frame({ choices: [], usage: { total_tokens: 3 }, error: null })),
    true
  );
});

test("choices with a delta and an error field still counts as content", () => {
  assert.equal(
    hasStreamReadinessSignal(
      frame({ choices: [{ delta: { content: "hi" } }], error: { message: "x" } })
    ),
    true
  );
});

test("error frame in choices-empty shape fails the turn with the diagnostic", async () => {
  const result = await ensureStreamReadiness(
    sse([frame({ choices: [], error: { message: "downstream closed" } })]),
    { timeoutMs: 500, provider: "relay", model: "m" }
  );
  assert.equal(result.ok, false);
  if (result.ok) assert.fail("must not hand the client an empty 200");
  assert.equal(result.code, "STREAM_EARLY_EOF");
  assert.equal(result.upstreamDiagnostic, "downstream closed");
});

test("error after real content is left alone", async () => {
  const result = await ensureStreamReadiness(
    sse([
      frame({ choices: [{ delta: { content: "hello" } }] }),
      frame({ choices: [], error: { message: "late failure" } }),
    ]),
    { timeoutMs: 500, provider: "relay", model: "m" }
  );
  assert.equal(result.ok, true);
});
