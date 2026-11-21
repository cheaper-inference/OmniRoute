import test from "node:test";
import assert from "node:assert/strict";

const { grokBotComputerFile } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/computerFile.ts");

test("a computer file request uses a framed download and returns the last file chunk", async () => {
  const payload = JSON.stringify({
    requestId: "probe-1",
    file: { data: Buffer.from("omni-grok-read-probe\n").toString("base64"), last: true },
  });
  const frame = new Uint8Array(5 + payload.length);
  frame[1] = (payload.length >>> 24) & 255;
  frame[2] = (payload.length >>> 16) & 255;
  frame[3] = (payload.length >>> 8) & 255;
  frame[4] = payload.length & 255;
  frame.set(new TextEncoder().encode(payload), 5);
  let seen: { method: string; body: Uint8Array } | null = null;
  const result = await grokBotComputerFile({
    accessToken: "token",
    machineId: "machine-1",
    path: "/home/houminxi/terminals/omni-grok-read-probe.txt",
    fetch: async (url: string, init: RequestInit) => {
      seen = {
        method: url.split("/").at(-1) ?? "",
        body: new Uint8Array(init.body as BufferSource),
      };
      return new Response(frame, { status: 200 });
    },
  });
  assert.equal(seen?.method, "OpenGrokBotUserComputerRequest");
  assert.equal(result.byteLength, 21);
  assert.equal(Buffer.from(result).toString(), "omni-grok-read-probe\n");
});

test("a computer file stream without a final chunk is rejected", async () => {
  const payload = JSON.stringify({
    requestId: "probe-1",
    file: { data: Buffer.from("partial").toString("base64") },
  });
  const frame = new Uint8Array(5 + payload.length);
  frame[4] = payload.length;
  frame.set(new TextEncoder().encode(payload), 5);
  await assert.rejects(
    grokBotComputerFile({
      accessToken: "token",
      machineId: "machine-1",
      path: "/home/houminxi/terminals/probe.txt",
      fetch: async () => new Response(frame, { status: 200 }),
    }),
    /incomplete/
  );
});

function fileFrame(payload: unknown): Uint8Array {
  const body = new TextEncoder().encode(JSON.stringify(payload));
  const frame = new Uint8Array(5 + body.length);
  frame[1] = (body.length >>> 24) & 255;
  frame[2] = (body.length >>> 16) & 255;
  frame[3] = (body.length >>> 8) & 255;
  frame[4] = body.length & 255;
  frame.set(body, 5);
  return frame;
}

test("a file past the limit is refused instead of buffered", async () => {
  const big = "x".repeat(200);
  const frames = [
    fileFrame({ file: { data: Buffer.from(big).toString("base64") } }),
    fileFrame({ file: { data: Buffer.from(big).toString("base64"), last: true } }),
  ];
  const bytes = new Uint8Array(frames.reduce((sum, f) => sum + f.length, 0));
  let offset = 0;
  for (const frame of frames) {
    bytes.set(frame, offset);
    offset += frame.length;
  }
  await assert.rejects(
    () =>
      grokBotComputerFile({
        accessToken: "token",
        machineId: "machine-1",
        path: "/home/houminxi/terminals/probe.txt",
        limitBytes: 100,
        fetch: async () => new Response(bytes, { status: 200 }),
      }),
    /computer file too large/
  );
});
