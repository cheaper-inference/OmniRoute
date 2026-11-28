import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  acquireConnectionSlot,
  evalCapacity,
  runWithConnectionSlot,
} from "../../src/sse/utils/backpressure.ts";
import type { CapacityResult, ConnectionSlot } from "../../src/sse/utils/backpressure.ts";

// ---------------------------------------------------------------------------
// evalCapacity — pure function, no mocking required
// ---------------------------------------------------------------------------

beforeEach(() => {
  delete process.env.OMNI_MAX_CONCURRENT_CONNECTIONS;
});

test("backpressure: cap=0 never rejects regardless of active count", () => {
  const r: CapacityResult = evalCapacity(9999, 0);
  assert.equal(r.shouldReject, false);
});

test("backpressure: negative cap never rejects", () => {
  assert.equal(evalCapacity(100, -1).shouldReject, false);
});

test("backpressure: passes when active is zero", () => {
  assert.equal(evalCapacity(0, 10).shouldReject, false);
});

test("backpressure: passes when active is below cap", () => {
  assert.equal(evalCapacity(5, 10).shouldReject, false);
});

test("backpressure: passes when active is exactly cap minus one", () => {
  assert.equal(evalCapacity(9, 10).shouldReject, false);
});

test("backpressure: rejects when active equals cap", () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
});

test("backpressure: rejects when active exceeds cap", () => {
  assert.equal(evalCapacity(100, 10).shouldReject, true);
});

test("backpressure: rejection returns HTTP 429", async () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.equal(r.response.status, 429);
});

test("backpressure: rejection includes Retry-After header >= 1", async () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  const val = Number(r.response.headers.get("Retry-After"));
  assert.ok(val >= 1, `Retry-After must be >= 1, got ${val}`);
});

test("backpressure: X-RateLimit-Limit matches the cap", async () => {
  const r = evalCapacity(7, 5);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.equal(r.response.headers.get("X-RateLimit-Limit"), "5");
  assert.equal(r.response.headers.get("X-RateLimit-Remaining"), "0");
});

test("backpressure: rejection body is valid JSON with error.type=rate_limit", async () => {
  const r = evalCapacity(3, 3);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  const body = await r.response.json();
  assert.equal(body?.error?.type, "rate_limit");
  assert.ok(typeof body.error.message === "string");
  assert.ok(typeof body.error.retry_after === "number");
});

test("backpressure: rejection message contains active and limit counts", async () => {
  const r = evalCapacity(8, 5);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  const body = await r.response.json();
  assert.ok(body.error.message.includes("8"), "message should reference active count");
  assert.ok(body.error.message.includes("5"), "message should reference cap");
});

test("backpressure: retry-after formula — at cap gives ceil(1*30)=30", async () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.equal(Number(r.response.headers.get("Retry-After")), 30);
});

test("backpressure: retry-after increases proportionally under higher load", async () => {
  const r1 = evalCapacity(10, 10); // factor 1.0 → 30s
  const r2 = evalCapacity(20, 10); // factor 2.0 → 60s
  assert.equal(r1.shouldReject, true);
  assert.equal(r2.shouldReject, true);
  if (!r1.shouldReject || !r2.shouldReject) throw new Error("unreachable");
  const ra1 = Number(r1.response.headers.get("Retry-After"));
  const ra2 = Number(r2.response.headers.get("Retry-After"));
  assert.ok(ra2 > ra1, `retry-after should grow with load factor (${ra1} → ${ra2})`);
});

test("backpressure: Content-Type is application/json", async () => {
  const r = evalCapacity(5, 5);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.ok(r.response.headers.get("Content-Type")?.includes("application/json"));
});

// ---------------------------------------------------------------------------
// acquireConnectionSlot — one slot per in-flight request (#21157)
// ---------------------------------------------------------------------------

function setCap(cap: number) {
  process.env.OMNI_MAX_CONCURRENT_CONNECTIONS = String(cap);
}

function admit(): ConnectionSlot {
  const slot = acquireConnectionSlot();
  if (slot.shouldReject) throw new Error("expected a free connection slot");
  return slot;
}

function assertFull() {
  assert.equal(acquireConnectionSlot().shouldReject, true);
}

function sse(body: ReadableStream<Uint8Array> | string): Response {
  return new Response(body, { headers: { "Content-Type": "text/event-stream" } });
}

function openStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: 1\n\n"));
    },
  });
}

test("backpressure: a disabled cap counts nothing and leaves the response as it is", () => {
  const response = sse("data: 1\n\n");
  assert.equal(admit().releaseAfter(response), response);

  setCap(1);
  admit().release();
});

test("backpressure: the cap admits `cap` requests and one release frees one slot", () => {
  setCap(2);
  const first = admit();
  const second = admit();
  assertFull();

  first.release();
  first.release();
  const third = admit();
  assertFull();

  second.release();
  third.release();
});

test("backpressure: a response that is not a stream frees its slot when it is returned", () => {
  setCap(1);
  const response = Response.json({ ok: true });
  assert.equal(admit().releaseAfter(response), response);
  admit().release();
});

test("backpressure: a stream keeps its slot until it has been read to the end", async () => {
  setCap(1);
  const response = admit().releaseAfter(sse("data: 1\n\ndata: [DONE]\n\n"));
  assertFull();

  assert.equal(await response.text(), "data: 1\n\ndata: [DONE]\n\n");
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  admit().release();
});

test("backpressure: a stream that fails frees its slot", async () => {
  setCap(1);
  const failing = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.error(new Error("upstream closed"));
    },
  });
  const response = admit().releaseAfter(sse(failing));
  assertFull();

  await assert.rejects(response.text(), /upstream closed/);
  admit().release();
});

test("backpressure: a cancelled stream frees its slot", async () => {
  setCap(1);
  const response = admit().releaseAfter(sse(openStream()));
  assertFull();

  await response.body?.cancel();
  admit().release();
});

function admitFor(signal: AbortSignal): ConnectionSlot {
  const slot = acquireConnectionSlot(signal);
  if (slot.shouldReject) throw new Error("expected a free connection slot");
  return slot;
}

test("backpressure: an aborted request frees the slot of a stream nobody reads", () => {
  setCap(1);
  const lifecycle = new AbortController();
  admitFor(lifecycle.signal).releaseAfter(sse(openStream()));
  assertFull();

  lifecycle.abort();
  admit().release();
});

test("backpressure: a request aborted before its response exists frees its slot", () => {
  setCap(1);
  const lifecycle = new AbortController();
  const slot = admitFor(lifecycle.signal);
  assertFull();

  lifecycle.abort();
  const next = admit();
  // The handler still answers the aborted request later; that must not free a second slot.
  slot.releaseAfter(Response.json({ ok: false }));
  assertFull();
  next.release();
});

test("backpressure: a request whose signal is already aborted takes no slot for long", () => {
  setCap(1);
  const lifecycle = new AbortController();
  lifecycle.abort();
  admitFor(lifecycle.signal);
  admit().release();
});

test("backpressure: runWithConnectionSlot answers 429 at the cap and logs it", async () => {
  setCap(1);
  const held = admit();
  const warnings: string[] = [];
  let ran = false;
  const response = await runWithConnectionSlot(
    null,
    async () => {
      ran = true;
      return Response.json({ ok: true });
    },
    { warn: (tag, message) => warnings.push(`${tag}: ${message}`) }
  );
  assert.equal(response.status, 429);
  assert.equal(ran, false);
  assert.deepEqual(warnings, ["BACKPRESSURE: Rejecting request: at connection limit"]);
  held.release();
});

test("backpressure: runWithConnectionSlot frees the slot when the handler throws", async () => {
  setCap(1);
  const quiet = { warn: () => {} };
  await assert.rejects(
    runWithConnectionSlot(null, async () => Promise.reject(new Error("handler failed")), quiet),
    /handler failed/
  );
  admit().release();
});

test("backpressure: the sanitized busy response keeps its contract", async () => {
  const r = evalCapacity(2, 2);
  if (!r.shouldReject) throw new Error("expected a rejection");
  assert.equal(r.response.status, 429);
  assert.equal(r.response.headers.get("Retry-After"), "30");
  assert.deepEqual(await r.response.json(), {
    error: {
      message: "Server busy — 2 active connections (limit 2). Retry after 30s.",
      type: "rate_limit",
      retry_after: 30,
    },
  });
});
