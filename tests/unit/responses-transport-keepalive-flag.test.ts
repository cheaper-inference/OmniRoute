/**
 * RESPONSES_TRANSPORT_KEEPALIVE_ENABLED (#18312, default off). Off, timers keep sending the
 * spec-valid response.in_progress event; on, they send a blank line. Whether the blank line is safe
 * for clients whose idle watchdog resets only on dispatched events is an open owner decision.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-transport-keepalive-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const FLAG = "RESPONSES_TRANSPORT_KEEPALIVE_ENABLED";
delete process.env[FLAG];

const { createSseHeartbeatTransform, isResponsesTransportKeepaliveEnabled } =
  await import("../../open-sse/utils/sseHeartbeat.ts");
const { buildRequestKeepaliveFrame } = await import("../../src/app/api/v1/responses/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.afterEach(() => {
  delete process.env[FLAG];
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const decode = (bytes: Uint8Array | undefined) => new TextDecoder().decode(bytes);

async function firstTick(t: { mock: { method: (...args: never[]) => unknown } }) {
  let tick!: () => void;
  t.mock.method(
    globalThis as never,
    "setInterval" as never,
    ((fn: () => void) => {
      tick = fn;
      return { unref() {} };
    }) as never
  );
  t.mock.method(globalThis as never, "clearInterval" as never, (() => {}) as never);
  const transform = createSseHeartbeatTransform({
    intervalMs: 10,
    shape: "openai-responses-in-progress",
  });
  const reader = transform.readable.getReader();
  const writer = transform.writable.getWriter();
  tick();
  const { value } = await reader.read();
  await reader.cancel();
  writer.releaseLock();
  reader.releaseLock();
  return decode(value);
}

test("the flag defaults off", () => {
  assert.equal(isResponsesTransportKeepaliveEnabled(), false);
});

test("flag off: the timer sends the spec-valid response.in_progress event", async (t) => {
  const frame = await firstTick(t as never);
  assert.match(frame, /^data: /);
  const payload = JSON.parse(frame.slice("data: ".length));
  assert.equal(payload.type, "response.in_progress");
  assert.equal(payload.response.object, "response");
});

test("flag on: the timer sends only a blank line", async (t) => {
  process.env[FLAG] = "true";
  assert.equal(await firstTick(t as never), "\n\n");
});

test("flag off: the route's early keepalive is a per-request event for the request model", () => {
  const frame = decode(buildRequestKeepaliveFrame({ model: "fixture-model" }));
  const payload = JSON.parse(frame.slice("data: ".length));
  assert.equal(payload.type, "response.in_progress");
  assert.equal(payload.response.model, "fixture-model");
});

test("flag on: the route's early keepalive is a blank line", () => {
  process.env[FLAG] = "true";
  assert.equal(decode(buildRequestKeepaliveFrame({ model: "fixture-model" })), "\n\n");
});

test("flag off: a timer tick inside an event sends nothing, then resumes at the boundary", async (t) => {
  let tick!: () => void;
  t.mock.method(globalThis, "setInterval", (fn: () => void) => {
    tick = fn;
    return { unref() {} } as ReturnType<typeof setInterval>;
  });
  t.mock.method(globalThis, "clearInterval", () => {});
  const transform = createSseHeartbeatTransform({
    intervalMs: 10,
    shape: "openai-responses-in-progress",
  });
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const encode = (text: string) => new TextEncoder().encode(text);

  // The readable side has no buffer: each write settles only once its chunk is read.
  const send = async (text: string) => {
    const written = writer.write(encode(text));
    assert.equal(decode((await reader.read()).value), text);
    await written;
  };

  await send('data: {"type":"response.output_text.del');
  tick();
  await send('ta"}\n\n'); // the read asserts the tick above spliced nothing into the JSON
  tick();
  const { value } = await reader.read();
  assert.match(decode(value), /^data: \{"type":"response\.in_progress"/);
  await reader.cancel();
  writer.releaseLock();
  reader.releaseLock();
});
