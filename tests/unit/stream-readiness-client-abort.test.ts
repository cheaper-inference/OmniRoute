/**
 * A client abort during stream readiness is a client disconnect (499), not an upstream
 * readiness stall (504). Gateway-owned deadlines and plain stream errors keep the 504
 * stall class so true upstream timeouts stay visible.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";

function sseResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/** A held-open stream that errors with `reasonOf(signal)` as soon as the signal aborts. */
function abortableStream(signal: AbortSignal): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      signal.addEventListener("abort", () => controller.error(signal.reason), { once: true });
    },
  });
}

test("client abort during readiness is a 499 client disconnect, not a 504 stall", async () => {
  const client = new AbortController();
  const pending = ensureStreamReadiness(sseResponse(abortableStream(client.signal)), {
    timeoutMs: 5_000,
  });
  setTimeout(() => client.abort(), 10);
  const result = await pending;

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.response.status, 499);
  assert.equal(result.code, "client_disconnected");
  assert.equal(result.type, "client_disconnected");
  assert.doesNotMatch(result.classificationReason, /timeout|stall/i);
  const body = (await result.response.json()) as { error: { code: string } };
  assert.equal(body.error.code, "client_disconnected");
});

test("a gateway-owned TimeoutError during readiness stays a 504 readiness stall", async () => {
  const owned = new AbortController();
  const pending = ensureStreamReadiness(sseResponse(abortableStream(owned.signal)), {
    timeoutMs: 5_000,
  });
  const deadline = new Error("Fetch timeout after 10ms");
  deadline.name = "TimeoutError";
  setTimeout(() => owned.abort(deadline), 10);
  const result = await pending;

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.response.status, 504);
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
  assert.equal(result.type, "stream_timeout");
});

test("a string abort reason on the request signal is a client disconnect", async () => {
  // streamController aborts its signal with a string reason such as "request_signal_aborted".
  const client = new AbortController();
  const pending = ensureStreamReadiness(sseResponse(abortableStream(client.signal)), {
    timeoutMs: 5_000,
    signal: client.signal,
  });
  setTimeout(() => client.abort("request_signal_aborted"), 10);
  const result = await pending;

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.response.status, 499);
  assert.equal(result.code, "client_disconnected");
});

test("a deadline abort on the request signal stays a 504 readiness stall", async () => {
  const client = new AbortController();
  const pending = ensureStreamReadiness(sseResponse(abortableStream(client.signal)), {
    timeoutMs: 5_000,
    signal: client.signal,
  });
  const deadline = new Error("Fetch timeout after 10ms");
  deadline.name = "TimeoutError";
  setTimeout(() => client.abort(deadline), 10);
  const result = await pending;

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.response.status, 504);
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
});

test("an AbortError while the request signal is still live stays a 504 readiness stall", async () => {
  // The abort came from somewhere other than the caller, so it is not a client disconnect.
  const live = new AbortController();
  const other = new AbortController();
  const pending = ensureStreamReadiness(sseResponse(abortableStream(other.signal)), {
    timeoutMs: 5_000,
    signal: live.signal,
  });
  setTimeout(() => other.abort(), 10);
  const result = await pending;

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.response.status, 504);
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
});
