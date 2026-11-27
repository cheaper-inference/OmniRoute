/**
 * `POST /api/db-backups/import` must refuse an oversized body by its real byte
 * count, before anything is buffered, when the request carries no
 * `content-length` header (chunked transfer encoding).
 *
 * The pipeline's body-size guard only reads `Content-Length`. A chunked upload
 * has none, so nothing bounded the body: the route buffered whatever arrived.
 * The rejection has to happen while reading, not after the read. This test
 * drives the real route handler with an operator credential and a streamed
 * body; the assertion is that the stream is not drained to the end.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-import-boundary-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DB_IMPORT_MAX_MB = "1";

const CLI_TOKEN = "local-cli-token-fixture";
const HARD_LIMIT = 1024 * 1024;

// The operator guard accepts the machine-bound local CLI credential stamped by
// the authz pipeline; the same headers any real loopback CLI request carries.
function operatorHeaders(): Record<string, string> {
  return {
    "content-type": "application/octet-stream",
    "x-omniroute-auth-kind": "management_key",
    "x-omniroute-auth-label": "local-cli-token",
    authorization: `Bearer ${CLI_TOKEN}`,
  };
}

type Chunked = { request: Request; bytesPulled: () => number; pulledAtEnd: () => number };

/**
 * A request whose body is a stream with no `content-length`. Every chunk the
 * handler pulls is counted, so a test can tell "refused early" from "buffered
 * everything and then complained".
 */
function chunkedRequest(totalBytes: number, chunkSize = 64 * 1024): Chunked {
  let pulled = 0;
  let ended = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (pulled >= totalBytes) {
        ended = pulled;
        controller.close();
        return;
      }
      const size = Math.min(chunkSize, totalBytes - pulled);
      pulled += size;
      controller.enqueue(new Uint8Array(size));
    },
  });
  const request = new Request(
    "http://localhost:20128/api/db-backups/import?filename=import.sqlite",
    { method: "POST", headers: operatorHeaders(), body: stream, duplex: "half" } as RequestInit
  );
  return { request, bytesPulled: () => pulled, pulledAtEnd: () => ended };
}

test.after(() => {
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // Windows may still hold the directory for a moment; tmp is cleaned by the OS.
  }
});

const { POST } = await import("../../src/app/api/db-backups/import/route.ts");

test("the fixture really has no Content-Length", () => {
  const { request } = chunkedRequest(8);
  assert.equal(request.headers.get("content-length"), null);
});

test("a chunked body far over the limit is a 413 and is never buffered whole", async () => {
  const body = chunkedRequest(64 * 1024 * 1024);
  const response = await POST(body.request);

  assert.equal(response.status, 413, `expected 413, got ${response.status}`);
  assert.match(await response.text(), /too large/i);
  assert.ok(
    body.bytesPulled() < 64 * 1024 * 1024,
    `the whole 64 MB body was pulled (${body.bytesPulled()} bytes)`
  );
  // A margin of two chunks: the reader stops at the first chunk that crosses
  // the limit, so it may pull up to one chunk past it.
  assert.ok(
    body.bytesPulled() <= HARD_LIMIT + 128 * 1024,
    `read ${body.bytesPulled()} bytes for a ${HARD_LIMIT} byte limit`
  );
});

test("a chunked body inside the limit reaches the importer", async () => {
  // Not a valid SQLite file: the point is that it is accepted past the size
  // gate and refused later for what it is, not for its size.
  const body = chunkedRequest(8192);
  const response = await POST(body.request);

  assert.notEqual(response.status, 413, "an in-limit body must not be refused for its size");
  assert.equal(body.pulledAtEnd(), 8192, "an in-limit body must be read to the end");
});

test("an empty chunked body is a 400, not a 413", async () => {
  const body = chunkedRequest(0);
  const response = await POST(body.request);
  assert.equal(response.status, 400);
});
