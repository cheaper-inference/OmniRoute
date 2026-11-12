import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

const enc = new TextEncoder();

function crc32(buf: Uint8Array) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function encodeHeader(name: string, value: string) {
  const n = enc.encode(name);
  const v = enc.encode(value);
  const out = new Uint8Array(1 + n.length + 1 + 2 + v.length);
  let o = 0;
  out[o++] = n.length;
  out.set(n, o);
  o += n.length;
  out[o++] = 7;
  out[o++] = (v.length >> 8) & 0xff;
  out[o++] = v.length & 0xff;
  out.set(v, o);
  return out;
}

function buildFrame(headers: Record<string, string>, payload: unknown) {
  const parts = Object.entries(headers).map(([k, v]) => encodeHeader(k, v));
  const hdr = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
  let off = 0;
  for (const p of parts) {
    hdr.set(p, off);
    off += p.length;
  }
  const body = enc.encode(JSON.stringify(payload));
  const total = 12 + hdr.length + body.length + 4;
  const frame = new Uint8Array(total);
  const view = new DataView(frame.buffer);
  view.setUint32(0, total, false);
  view.setUint32(4, hdr.length, false);
  view.setUint32(8, crc32(frame.slice(0, 8)), false);
  frame.set(hdr, 12);
  frame.set(body, 12 + hdr.length);
  view.setUint32(total - 4, crc32(frame.slice(0, total - 4)), false);
  return frame;
}

const event = (type: string, payload: unknown) =>
  buildFrame({ ":event-type": type, ":message-type": "event" }, payload);
const exception = (name: string, message: string) =>
  buildFrame({ ":message-type": "exception", ":exception-type": name }, { message });

function respond(frames: Uint8Array[]) {
  return new Response(
    new ReadableStream({
      start(c) {
        for (const f of frames) c.enqueue(f);
        c.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "application/vnd.amazon.eventstream" } }
  );
}

async function run(frames: Uint8Array[]) {
  const text = await new KiroExecutor().transformEventStreamToSSE(respond(frames), "m").text();
  const chunks = text
    .split("\n")
    .filter((l) => l.startsWith("data: "))
    .map((l) => l.slice(6).trim())
    .filter((p) => p && p !== "[DONE]")
    .map((p) => JSON.parse(p));
  return {
    chunks,
    finish: chunks.find((c) => c.choices?.[0]?.finish_reason)?.choices[0].finish_reason as
      string | undefined,
    error: chunks.find((c) => c.error)?.error as
      { message: string; code: string; status_code: number } | undefined,
  };
}

const text = (s: string) => event("assistantResponseEvent", { content: s });
const metering = () => event("meteringEvent", { unit: "credit", usage: 0.01 });

test("an EventStream exception inside HTTP 200 becomes an error with a mapped status", async () => {
  const cases: Array<[string, number]> = [
    ["ThrottlingException", 429],
    ["ServiceQuotaExceededException", 429],
    ["UnauthorizedException", 401],
    ["AccessDeniedException", 403],
    ["ValidationException", 400],
    ["InvalidModelException", 400],
    ["ResourceNotFoundException", 404],
    ["ConflictException", 409],
    ["InternalServerException", 502],
    ["ServiceUnavailableException", 502],
    ["BrandNewException", 502],
  ];
  for (const [name, status] of cases) {
    const out = await run([exception(name, "slow down")]);
    assert.equal(out.error?.status_code, status, `${name} -> ${status}`);
    assert.equal(out.finish, undefined, `${name} must not end as a normal finish`);
  }
});

test("an exception after partial output stops the stream with an error, not a stop", async () => {
  const out = await run([text("partial "), exception("ThrottlingException", "slow down")]);
  assert.equal(out.error?.status_code, 429);
  assert.match(out.error?.message ?? "", /slow down/);
  assert.equal(out.finish, undefined);
});

test("a stream cut before any stop event is an error, not a clean stop", async () => {
  const out = await run([text("half an answ")]);
  assert.equal(out.error?.code, "kiro_incomplete_stream");
  assert.equal(out.error?.status_code, 502);
  assert.equal(out.finish, undefined);
});

test("a stop event, a metadata stopReason, or a trailing accounting frame still completes", async () => {
  assert.equal((await run([text("a"), event("messageStopEvent", {})])).finish, "stop");
  assert.equal(
    (await run([text("a"), event("metadataEvent", { stopReason: "END_TURN" })])).finish,
    "stop"
  );
  const metered = await run([text("a"), metering()]);
  assert.equal(metered.finish, "stop");
  assert.equal(metered.error, undefined);
  const usage = await run([text("a"), event("metricsEvent", { inputTokens: 3, outputTokens: 1 })]);
  assert.equal(usage.finish, "stop");
});

test("Kiro stopReason maps to the OpenAI finish_reason", async () => {
  const stop = (reason: string, ...more: Uint8Array[]) => [
    text("a"),
    ...more,
    event("metadataEvent", { stopReason: reason }),
  ];
  const tool = event("toolUseEvent", { toolUseId: "t1", name: "f", input: { a: 1 } });
  assert.equal((await run(stop("MAX_TOKENS"))).finish, "length");
  assert.equal((await run(stop("MODEL_CONTEXT_WINDOW_EXCEEDED"))).finish, "length");
  assert.equal((await run(stop("CONTENT_FILTERED"))).finish, "content_filter");
  assert.equal((await run(stop("GUARDRAIL_INTERVENED"))).finish, "content_filter");
  assert.equal((await run(stop("END_TURN"))).finish, "stop");
  assert.equal((await run(stop("END_TURN", tool))).finish, "tool_calls");
  assert.equal((await run(stop("TOOL_USE", tool))).finish, "tool_calls");
});

test("a MALFORMED stopReason is an error", async () => {
  const out = await run([text("a"), event("metadataEvent", { stopReason: "MALFORMED_TOOL_USE" })]);
  assert.equal(out.error?.status_code, 502);
  assert.equal(out.finish, undefined);
});

test("a first-frame exception emits no role chunk, so the readiness gate can fail over", async () => {
  const out = await run([exception("ThrottlingException", "slow down")]);
  assert.equal(out.chunks.length, 1);
  assert.equal(out.chunks[0].error.status_code, 429);
});
