import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureStreamReadiness,
  hasStreamReadinessSignal,
} from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();

// A stream that emits the given frames and then stays silent (never closes):
// only the readiness deadline or a cancellation ends it.
function framesThenSilence(frames: string[]): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
    },
    cancel() {},
  });
}

// Gate contract: a non-JSON payload under `data:` (a proxy error page, a
// raw log line, a truncated fragment) is garbage, not a readiness signal — it
// must fail the gate (classified 502/504) instead of being released as a false
// 200. Only a non-ping JSON payload under `data:` is a signal. A structural SSE
// field line outside `data:` (`id:`, `retry:`) carries no payload and stays
// refused, so a stream that opens with `retry:` or stamps `id:` on its pings
// still times out instead of being replayed as a false 200.

// --- The gate's signal contract (hasStreamReadinessSignal) ---

// Red proof: before the fix these non-JSON data: payloads were accepted by the
// catch tolerance; after the fix they are refused.
test("a non-JSON payload under data: is not a readiness signal", () => {
  // A proxy error page replayed under data: (the false-200 failure mode).
  assert.equal(
    hasStreamReadinessSignal("data: <html><body>502 Bad Gateway</body></html>\n\n"),
    false
  );
  // A raw log line under data:.
  assert.equal(
    hasStreamReadinessSignal("data: 2026-10-12 13:25:00 ERROR upstream timeout\n\n"),
    false
  );
  // A truncated JSON fragment under data:.
  assert.equal(hasStreamReadinessSignal("data: {truncated-json\n\n"), false);
  // A plain-text answer under data: (non-JSON) is refused too — only a non-ping
  // JSON payload is a signal.
  assert.equal(hasStreamReadinessSignal("data: plain text answer\n\n"), false);
});

// Guard: a non-ping JSON payload under data: is still a signal (no over-refusal).
test("a non-ping JSON payload under data: is still a readiness signal", () => {
  assert.equal(hasStreamReadinessSignal('data: {"choices":[{"delta":{"content":"x"}}]}\n\n'), true);
  assert.equal(hasStreamReadinessSignal('data: {"type":"response.created"}\n\n'), true);
  // An error-only JSON frame stays refused (existing behavior, #7503).
  assert.equal(
    hasStreamReadinessSignal('data: {"error":{"message":"Auggie CLI not found"}}\n\n'),
    false
  );
});

// Guard: a structural field line outside data: carries no payload, so it is not
// a readiness signal. `retry:` is commonly the first bytes of a stream, and some
// servers stamp `id:` on every frame including pings — counting either would
// release a stream that never produces a useful event.
test("a structural SSE field line outside data: is not a readiness signal", () => {
  assert.equal(hasStreamReadinessSignal("id: 42\n\n"), false);
  assert.equal(hasStreamReadinessSignal("retry: 3000\n\n"), false);
  assert.equal(hasStreamReadinessSignal("id: 7\nevent: ping\ndata: {}\n\n"), false);
});

// Guard: a raw text line WITHOUT SSE field syntax is not a signal — a non-SSE
// text upstream (a raw HTML page, a bare log line) must stay refused so it
// fails with a classified error and the fallback fires, not a false 200.
test("a raw text line without SSE field syntax is not a readiness signal", () => {
  assert.equal(hasStreamReadinessSignal("<html><body>502</body></html>\n\n"), false);
  assert.equal(hasStreamReadinessSignal("plain raw garbage line\n\n"), false);
});

// --- End-to-end: the gate must not serve garbage as a false 200 ---

// A stream whose only payload is a non-JSON data: line (a proxy HTML page) must
// end as a classified readiness failure (502/504), never a 200 that replays the
// garbage to the client.
test("a non-JSON data: payload is refused, not replayed as a 200", async () => {
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("data: <html><body>502 Bad Gateway</body></html>\n\n"));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 200 });
  try {
    assert.equal(result.ok, false);
    if (result.ok) assert.fail("a non-JSON data: payload must not release the readiness gate");
    assert.ok(
      result.response.status === 502 || result.response.status === 504,
      `expected a classified 502/504, got ${result.response.status}`
    );
  } finally {
    await result.response.body?.cancel().catch(() => {});
  }
});

// A stream whose only payload is a structural field line outside data: closes
// without a useful event: it must end as a classified readiness failure, never a
// 200 that replays the empty frames to the client.
test("a stream whose only payload is a structural field line is not released", async () => {
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("id: 42\n\n"));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 200 });
  try {
    assert.equal(result.ok, false);
    if (result.ok)
      assert.fail("a structural field line outside data: must not release the readiness gate");
    assert.ok(
      result.response.status === 502 || result.response.status === 504,
      `expected a classified 502/504, got ${result.response.status}`
    );
  } finally {
    await result.response.body?.cancel().catch(() => {});
  }
});

// `retry:` is commonly the very first bytes of an SSE stream. On its own it
// proves nothing about the upstream producing an event: the frame must not
// release the gate, and the silence that follows must fail at the first
// deadline instead of consuming the ceiling.
test("a retry:-only stream times out at the first deadline", async () => {
  const timeoutMs = 100;
  const maxTimeoutMs = 400;
  const response = new Response(framesThenSilence(["retry: 3000\n\n"]), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, {
    timeoutMs,
    maxTimeoutMs,
  });
  try {
    assert.equal(result.ok, false);
    if (result.ok) assert.fail("a retry:-only stream must remain a readiness failure");
    assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
    assert.equal(result.response.status, 504);
    assert.match(result.reason, /within 100ms \(max=400ms\)/);
  } finally {
    await result.response.body?.cancel().catch(() => {});
  }
});

// Some servers stamp `id:` on every frame, pings included. An id:+ping-only
// stream carries no readiness signal, so the pings must not extend the deadline:
// it fails at the first deadline, not at the ceiling.
test("an id:+ping-only stream times out at the first deadline", async () => {
  const timeoutMs = 100;
  const maxTimeoutMs = 400;
  const response = new Response(
    framesThenSilence([
      "id: 1\nevent: ping\ndata: {}\n\n",
      "id: 2\nevent: ping\ndata: {}\n\n",
      "id: 3\nevent: ping\ndata: {}\n\n",
    ]),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, {
    timeoutMs,
    maxTimeoutMs,
  });
  try {
    assert.equal(result.ok, false);
    if (result.ok) assert.fail("an id:+ping-only stream must remain a readiness failure");
    assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
    assert.equal(result.response.status, 504);
    assert.match(result.reason, /within 100ms \(max=400ms\)/);
  } finally {
    await result.response.body?.cancel().catch(() => {});
  }
});

// Guard: a stream whose first payload is a non-ping JSON data: line is released
// as ready (200) — no over-refusal of real content.
test("a non-ping JSON data: payload is released as ready", async () => {
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"x"}}]}\n\n'));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 200 });
  try {
    assert.equal(result.ok, true);
    if (!result.ok) assert.fail("a non-ping JSON data: payload must release the readiness gate");
    assert.equal(result.response.status, 200);
  } finally {
    await result.response.body?.cancel().catch(() => {});
  }
});
