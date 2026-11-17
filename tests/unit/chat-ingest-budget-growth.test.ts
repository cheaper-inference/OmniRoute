// The chat ingest byte budget must hold what a body really occupies: every chunk of a body sent
// without Content-Length, and the decoded size of a compressed body, not only the first chunk or
// the wire size.
import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { gzipSync } from "node:zlib";

const { admitChatRequest, ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

const KiB = 1024;
const MiB = 1024 * KiB;
const LARGE_BODY_BYTES = 64 * KiB;
const silentSink = () => {};

function budgetedController(maxInflightBytes: number) {
  return new ChatAdmissionController(Number.MAX_SAFE_INTEGER, undefined, 0, silentSink, {
    maxInflightBytes,
    checkPressureSeverity: () => "normal",
  });
}

function chunkedRequest(totalBytes: number, chunkBytes = 64 * KiB): Request {
  let sent = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(stream) {
      if (sent >= totalBytes) return stream.close();
      const size = Math.min(chunkBytes, totalBytes - sent);
      sent += size;
      stream.enqueue(new Uint8Array(size).fill(0x20));
    },
  });
  return new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    duplex: "half",
  } as RequestInit);
}

function gzipRequest(decoded: Uint8Array): Request {
  const wire = gzipSync(decoded);
  return new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-encoding": "gzip",
      "content-length": String(wire.byteLength),
    },
    body: wire,
  });
}

const options = (controller: InstanceType<typeof ChatAdmissionController>) => ({
  controller,
  largeBodyBytes: LARGE_BODY_BYTES,
  hardMaxBytes: 16 * MiB,
  queueMs: 0,
  heapPressureCheck: () => true,
});

test("a body without Content-Length is charged for every byte it brings", async () => {
  const controller = budgetedController(1 * MiB);
  const first = await admitChatRequest(chunkedRequest(600 * KiB), options(controller));
  assert.equal(first.admit, true);
  try {
    assert.ok(
      controller.inflightBytes >= 600 * KiB,
      `charged ${controller.inflightBytes} bytes for a 600 KiB body`
    );
    const second = await admitChatRequest(chunkedRequest(600 * KiB), options(controller));
    assert.equal(second.admit, false, "two 600 KiB bodies do not fit a 1 MiB budget");
  } finally {
    if (first.admit) first.lease?.release();
  }
  assert.equal(controller.inflightBytes, 0);
});

test("a compressed body is charged its decoded size, not its wire size", async () => {
  // Incompressible head keeps the wire above the large-body line; the zero tail expands.
  const decoded = new Uint8Array(680 * KiB);
  decoded.set(randomBytes(80 * KiB));
  const controller = budgetedController(1 * MiB);
  const first = await admitChatRequest(gzipRequest(decoded), options(controller));
  assert.equal(first.admit, true);
  try {
    assert.ok(
      controller.inflightBytes >= decoded.byteLength,
      `charged ${controller.inflightBytes} bytes for a ${decoded.byteLength}-byte decoded body`
    );
    const second = await admitChatRequest(gzipRequest(decoded), options(controller));
    assert.equal(second.admit, false, "two 680 KiB decoded bodies do not fit a 1 MiB budget");
  } finally {
    if (first.admit) first.lease?.release();
  }
  assert.equal(controller.inflightBytes, 0);
});

test("a compressed body that would expand past the budget is refused", async () => {
  const controller = budgetedController(1 * MiB);
  const result = await admitChatRequest(gzipRequest(new Uint8Array(4 * MiB)), options(controller));
  assert.equal(result.admit, false);
  if (!result.admit) {
    const body = (await result.response.json()) as { error: { code: string } };
    assert.equal(body.error.code, "body_exceeds_budget");
  }
  assert.equal(controller.inflightBytes, 0);
});

test("bodies below the large-body line stay outside the budget", async () => {
  const controller = budgetedController(1 * MiB);
  const result = await admitChatRequest(chunkedRequest(16 * KiB), options(controller));
  assert.equal(result.admit, true);
  assert.equal(controller.inflightBytes, 0);
  if (result.admit) result.lease?.release();
});
