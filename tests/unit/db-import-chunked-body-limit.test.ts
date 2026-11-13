/**
 * `POST /api/db-backups/import` must bound the raw-bytes branch by itself.
 *
 * The pipeline's body-size guard only reads `Content-Length`, so a chunked
 * upload (no such header) sails past it and the handler buffered whatever
 * arrived. The raw branch now counts bytes while streaming.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-import-limit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DB_IMPORT_MAX_MB = "1";

const { readUpload } = await import("../../src/app/api/db-backups/import/route.ts");

test.after(() => {
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // Windows may still hold the directory for a moment; tmp is cleaned by the OS.
  }
});

/** A POST whose body is a stream and therefore carries no `Content-Length`. */
function chunkedRequest(chunks: Uint8Array[], filename = "import.sqlite"): Request {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  return new Request(
    `http://localhost:20128/api/db-backups/import?filename=${encodeURIComponent(filename)}`,
    {
      method: "POST",
      headers: { "content-type": "application/octet-stream" },
      body: stream,
      duplex: "half",
    } as RequestInit
  );
}

test("the fixture really has no Content-Length", () => {
  const request = chunkedRequest([new Uint8Array(8)]);
  assert.equal(request.headers.get("content-length"), null);
});

test("a chunked body over the configured limit is refused with 413", async () => {
  const chunk = new Uint8Array(800 * 1024);
  const result = await readUpload(chunkedRequest([chunk, chunk]));

  assert.equal(result instanceof Response, true, "expected a rejection, got an accepted upload");
  const response = result as Response;
  assert.equal(response.status, 413);
  assert.match(await response.text(), /File too large/);
});

test("a chunked body inside the limit is accepted", async () => {
  const result = await readUpload(chunkedRequest([new Uint8Array(4096)]));

  assert.equal(result instanceof Response, false);
  assert.equal((result as { fileBuffer: Buffer }).fileBuffer.byteLength, 4096);
  assert.equal((result as { fileName: string }).fileName, "import.sqlite");
});

test("an empty chunked body is a 400, not a 413", async () => {
  const result = await readUpload(chunkedRequest([]));

  assert.equal(result instanceof Response, true);
  assert.equal((result as Response).status, 400);
});
