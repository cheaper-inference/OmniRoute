// Compressed JSON request bodies (Content-Encoding: zstd / gzip / br / deflate) are decoded
// exactly once, at the central chat body admission, and the decoded size is held to the same
// hard body limit as an uncompressed body (decompression-bomb guard).
import test from "node:test";
import assert from "node:assert/strict";
import zlib from "node:zlib";

const { admitChatRequest, ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { decodeRequestBodyBytes, normalizeContentEncoding } =
  await import("../../src/shared/utils/requestBodyEncoding.ts");

const PAYLOAD = { model: "openai/gpt-4.1", input: "hello compressed world" };
const PAYLOAD_JSON = JSON.stringify(PAYLOAD);

const COMPRESSORS: Array<[string, (input: Buffer) => Buffer]> = [
  ["zstd", (input) => zlib.zstdCompressSync(input)],
  ["gzip", (input) => zlib.gzipSync(input)],
  ["br", (input) => zlib.brotliCompressSync(input)],
  ["deflate", (input) => zlib.deflateSync(input)],
];

function encodedRequest(body: Uint8Array | string, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

function admit(request: Request, hardMaxBytes?: number) {
  return admitChatRequest(request, {
    controller: new ChatAdmissionController(2),
    hardMaxBytes,
    queueMs: 0,
    heapPressureCheck: () => false,
  });
}

async function errorMessage(response: Response): Promise<string> {
  const payload = (await response.json()) as { error?: { message?: string } };
  return String(payload?.error?.message ?? "");
}

for (const [encoding, compress] of COMPRESSORS) {
  test(`admission decodes a ${encoding} body and strips the representation headers`, async () => {
    const compressed = compress(Buffer.from(PAYLOAD_JSON));
    const result = await admit(
      encodedRequest(compressed, {
        "content-encoding": encoding,
        "content-length": String(compressed.byteLength),
        authorization: "Bearer sk-test",
      })
    );
    assert.equal(result.admit, true);
    if (result.admit !== true) return;
    assert.equal(result.request.headers.get("content-encoding"), null);
    assert.notEqual(
      result.request.headers.get("content-length"),
      String(compressed.byteLength),
      "the wire content-length must not survive onto the decoded request"
    );
    assert.equal(result.request.headers.get("authorization"), "Bearer sk-test");
    assert.deepEqual(await result.request.json(), PAYLOAD);
    result.lease?.release();
  });

  test(`admission rejects a ${encoding} body whose decoded size exceeds the hard limit`, async () => {
    // ~4 KiB of JSON compresses to a few dozen bytes: the wire size is far under the limit,
    // only the expanded size is not.
    const big = JSON.stringify({ model: "x", input: "a".repeat(4096) });
    const compressed = compress(Buffer.from(big));
    const hardMaxBytes = 1024;
    assert.ok(compressed.byteLength < hardMaxBytes, "wire bytes must fit the limit");
    const result = await admit(
      encodedRequest(compressed, { "content-encoding": encoding }),
      hardMaxBytes
    );
    assert.equal(result.admit, false);
    if (result.admit !== false) return;
    assert.equal(result.response.status, 413);
  });
}

test("admission decodes a compressed body on the internal self-loop path too", async () => {
  const { ADMISSION_BYPASS_HEADER, resolveSelfLoopBearer } =
    await import("../../src/shared/middleware/chatBodyAdmission.ts");
  const compressed = zlib.zstdCompressSync(Buffer.from(PAYLOAD_JSON));
  const result = await admit(
    encodedRequest(compressed, {
      "content-encoding": "zstd",
      [ADMISSION_BYPASS_HEADER]: "internal",
      authorization: `Bearer ${resolveSelfLoopBearer()}`,
    })
  );
  assert.equal(result.admit, true);
  if (result.admit !== true) return;
  assert.equal(result.request.headers.get("content-encoding"), null);
  assert.deepEqual(await result.request.json(), PAYLOAD);
});

test("admission enforces the decoded hard limit on the internal self-loop path", async () => {
  const { ADMISSION_BYPASS_HEADER, resolveSelfLoopBearer } =
    await import("../../src/shared/middleware/chatBodyAdmission.ts");
  const compressed = zlib.gzipSync(Buffer.from("a".repeat(8192)));
  const result = await admit(
    encodedRequest(compressed, {
      "content-encoding": "gzip",
      [ADMISSION_BYPASS_HEADER]: "internal",
      authorization: `Bearer ${resolveSelfLoopBearer()}`,
    }),
    1024
  );
  assert.equal(result.admit, false);
  if (result.admit !== false) return;
  assert.equal(result.response.status, 413);
});

test("admission normalizes the content-encoding case and whitespace", async () => {
  const compressed = zlib.zstdCompressSync(Buffer.from(PAYLOAD_JSON));
  const result = await admit(encodedRequest(compressed, { "content-encoding": " ZSTD " }));
  assert.equal(result.admit, true);
  if (result.admit !== true) return;
  assert.deepEqual(await result.request.json(), PAYLOAD);
});

test("admission leaves an uncompressed body untouched (no header, identity)", async () => {
  for (const headers of [{}, { "content-encoding": "identity" }]) {
    const result = await admit(encodedRequest(PAYLOAD_JSON, headers));
    assert.equal(result.admit, true);
    if (result.admit !== true) continue;
    assert.deepEqual(await result.request.json(), PAYLOAD);
  }
});

test("admission answers a corrupt compressed body with a sanitized 400", async () => {
  const result = await admit(encodedRequest("definitely not zstd", { "content-encoding": "zstd" }));
  assert.equal(result.admit, false);
  if (result.admit !== false) return;
  assert.equal(result.response.status, 400);
  const message = await errorMessage(result.response);
  assert.match(message, /could not be decoded/i);
  assert.doesNotMatch(message, /ZSTD_error|Z_DATA_ERROR|Z_BUF_ERROR|at \S+:\d+/);
});

test("admission answers an unsupported content-encoding with 415", async () => {
  for (const encoding of ["compress", "gzip, zstd", "x-unknown"]) {
    const result = await admit(encodedRequest(PAYLOAD_JSON, { "content-encoding": encoding }));
    assert.equal(result.admit, false, encoding);
    if (result.admit !== false) continue;
    assert.equal(result.response.status, 415, encoding);
    assert.match(await errorMessage(result.response), /Unsupported Content-Encoding/);
  }
});

test("normalizeContentEncoding maps absent and identity to null", () => {
  assert.equal(normalizeContentEncoding(null), null);
  assert.equal(normalizeContentEncoding(""), null);
  assert.equal(normalizeContentEncoding("  "), null);
  assert.equal(normalizeContentEncoding("Identity"), null);
  assert.equal(normalizeContentEncoding(" GZip "), "gzip");
});

test("decodeRequestBodyBytes reports the outcome without throwing", async () => {
  const ok = await decodeRequestBodyBytes(
    new Uint8Array(zlib.gzipSync(Buffer.from(PAYLOAD_JSON))),
    "gzip",
    1024
  );
  assert.equal(ok.ok, true);
  if (ok.ok) assert.equal(Buffer.from(ok.body).toString("utf8"), PAYLOAD_JSON);

  const tooLarge = await decodeRequestBodyBytes(
    new Uint8Array(zlib.gzipSync(Buffer.from("a".repeat(4096)))),
    "gzip",
    1024
  );
  assert.deepEqual(tooLarge, { ok: false, reason: "too_large" });

  const invalid = await decodeRequestBodyBytes(new TextEncoder().encode("broken"), "br", 1024);
  assert.deepEqual(invalid, { ok: false, reason: "invalid" });

  const unsupported = await decodeRequestBodyBytes(new Uint8Array(0), "compress", 1024);
  assert.deepEqual(unsupported, { ok: false, reason: "unsupported" });
});

test("a body that is only large once expanded takes the heavyweight lease", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0, () => {});
  const big = Buffer.from(JSON.stringify({ model: "x", input: "a".repeat(4096) }));
  const compressed = zlib.gzipSync(big);
  const largeBodyBytes = 1024;
  assert.ok(compressed.byteLength < largeBodyBytes && big.byteLength >= largeBodyBytes);
  const options = { controller, largeBodyBytes, queueMs: 0, heapPressureCheck: () => true };

  // A free slot: the expanded body is admitted holding the lease.
  const first = await admitChatRequest(
    encodedRequest(compressed, { "content-encoding": "gzip" }),
    options
  );
  assert.equal(first.admit, true);
  if (first.admit !== true) return;
  assert.ok(first.lease, "the decoded large body must hold a heavyweight lease");
  assert.deepEqual(await first.request.json(), JSON.parse(big.toString("utf8")));

  // The only slot is taken: the same small wire body is shed with the capacity 503.
  const second = await admitChatRequest(
    encodedRequest(compressed, { "content-encoding": "gzip" }),
    options
  );
  assert.equal(second.admit, false);
  if (second.admit !== false) return;
  assert.equal(second.response.status, 503);
  first.lease?.release();
});
