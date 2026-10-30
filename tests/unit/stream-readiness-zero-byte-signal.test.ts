/**
 * Telemetry for the two STREAM_READINESS_TIMEOUT failure shapes:
 *   - fully silent upstream (zero raw bytes — `anyByteAt` null, header "none")
 *   - transport alive but stalled (raw bytes incl. keepalive pings arrived —
 *     `anyByteAt` epoch-ms, header carries the number)
 *
 * Also pins two properties that cost a production incident to learn:
 *   - the stamp is PER-CALL: one stream's chunks must never mark a concurrent
 *     or subsequent stream as "bytes arrived" (a module-level stamp did
 *     exactly that — a silent hang inherited a sibling's timestamp);
 *   - the header round-trips through parseAnyByteAtHeader for tooling.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  ANY_BYTE_AT_HEADER,
  buildAnyByteAtHeader,
  parseAnyByteAtHeader,
  ensureStreamReadiness,
} from "../../open-sse/utils/streamReadiness.ts";

const sse = { "Content-Type": "text/event-stream" };

function silentBody(): ReadableStream<Uint8Array> {
  return new ReadableStream({ start() {} });
}

function pingThenSilentBody(): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(": ping\n\n"));
    },
  });
}

test("silent upstream → anyByteAt null + header 'none'", async () => {
  const result = await ensureStreamReadiness(new Response(silentBody(), { status: 200, headers: sse }), {
    timeoutMs: 60,
  });

  assert.equal(result.ok, false);
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
  assert.equal(result.anyByteAt, null, "zero bytes ever arrived");
  assert.equal(result.response.headers.get(ANY_BYTE_AT_HEADER), "none");
});

test("keepalive-only stream → anyByteAt timestamp + numeric header", async () => {
  const before = Date.now();
  const result = await ensureStreamReadiness(
    new Response(pingThenSilentBody(), { status: 200, headers: sse }),
    { timeoutMs: 60, maxTimeoutMs: 90 }
  );

  assert.equal(result.ok, false);
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
  assert.ok(
    typeof result.anyByteAt === "number" && result.anyByteAt >= before,
    "the ping byte is stamped"
  );
  const header = result.response.headers.get(ANY_BYTE_AT_HEADER);
  assert.match(String(header), /^\d+$/, "header carries the epoch-ms form");
  assert.equal(parseAnyByteAtHeader(header), result.anyByteAt, "header round-trips");
});

test("per-call stamp: a silent stream after a chatty one still reports zero bytes", async () => {
  const chatty = await ensureStreamReadiness(
    new Response(pingThenSilentBody(), { status: 200, headers: sse }),
    { timeoutMs: 60, maxTimeoutMs: 90 }
  );
  assert.equal(typeof chatty.anyByteAt, "number");

  const silent = await ensureStreamReadiness(new Response(silentBody(), { status: 200, headers: sse }), {
    timeoutMs: 60,
  });
  assert.equal(
    silent.anyByteAt,
    null,
    "a module-level stamp would leak the previous stream's timestamp here"
  );
  assert.equal(silent.response.headers.get(ANY_BYTE_AT_HEADER), "none");
});

test("concurrent streams keep independent stamps", async () => {
  const [pinged, silent] = await Promise.all([
    ensureStreamReadiness(new Response(pingThenSilentBody(), { status: 200, headers: sse }), {
      timeoutMs: 120,
      maxTimeoutMs: 150,
    }),
    ensureStreamReadiness(new Response(silentBody(), { status: 200, headers: sse }), {
      timeoutMs: 120,
    }),
  ]);
  assert.equal(typeof pinged.anyByteAt, "number", "ping stream stamped");
  assert.equal(silent.anyByteAt, null, "concurrent silent stream NOT contaminated");
});

test("header helpers: build/parse agreement for both shapes", () => {
  assert.deepEqual(buildAnyByteAtHeader(null), { [ANY_BYTE_AT_HEADER]: "none" });
  assert.deepEqual(buildAnyByteAtHeader(1729123456789), { [ANY_BYTE_AT_HEADER]: "1729123456789" });
  assert.equal(parseAnyByteAtHeader("none"), null);
  assert.equal(parseAnyByteAtHeader("1729123456789"), 1729123456789);
  assert.equal(parseAnyByteAtHeader(undefined), undefined, "absent header = unknown, not zero-bytes");
  assert.equal(parseAnyByteAtHeader("garbage"), undefined);
});
