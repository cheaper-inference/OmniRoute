import test from "node:test";
import assert from "node:assert/strict";

const { grokBotReadStream } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/read.ts");

function frame(payload: unknown): Uint8Array {
  const body = new TextEncoder().encode(JSON.stringify(payload));
  const out = new Uint8Array(5 + body.length);
  out[0] = 0;
  out[1] = (body.length >>> 24) & 255;
  out[2] = (body.length >>> 16) & 255;
  out[3] = (body.length >>> 8) & 255;
  out[4] = body.length & 255;
  out.set(body, 5);
  return out;
}

test("a frame with a non-zero flag is skipped", async () => {
  const data = frame({ replay: true });
  const control = new Uint8Array(data);
  control[0] = 2;
  const frames = [];
  for await (const item of grokBotReadStream({
    accessToken: "secret-token",
    method: "WatchGrokBotTranscripts",
    payload: {},
    fetch: async () => new Response(control, { status: 200 }),
  })) {
    frames.push(item);
  }
  assert.deepEqual(frames, []);
});

test("a watch stream yields one parsed frame at a time", async () => {
  const first = frame({ replay: true, rows: { entries: [] } });
  const second = frame({ heartbeat: true });
  const bytes = new Uint8Array(first.length + second.length);
  bytes.set(first);
  bytes.set(second, first.length);
  const frames = [];
  for await (const item of grokBotReadStream({
    accessToken: "secret-token",
    method: "WatchGrokBotTranscripts",
    payload: { afterUpdatedSeq: "0" },
    fetch: async () => new Response(bytes, { status: 200 }),
  })) {
    frames.push(item);
  }
  assert.deepEqual(frames, [{ replay: true, rows: { entries: [] } }, { heartbeat: true }]);
});
