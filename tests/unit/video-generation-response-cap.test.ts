/**
 * A video provider answer is read into memory in full. A runaway or hostile
 * upstream body must stop at the shared non-streaming cap
 * (OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES) and become a clean 502, not an
 * unbounded buffer. The tests drive the SD WebUI, Haiper and Runway video handlers
 * through a stubbed fetch.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CAP_ENV = "OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES";
const PREVIOUS_DATA_DIR = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (PREVIOUS_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = PREVIOUS_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// The cap is read on every call. Set it, and the fetch stub, only while one handler call
// runs, so other test files sharing this process (--test-isolation=none) never see either.
async function withStubbedFetch<T>(stub: typeof fetch, fn: () => Promise<T>): Promise<T> {
  const originalFetch = globalThis.fetch;
  const previousCap = process.env[CAP_ENV];
  globalThis.fetch = stub;
  process.env[CAP_ENV] = "4096";
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
    if (previousCap === undefined) delete process.env[CAP_ENV];
    else process.env[CAP_ENV] = previousCap;
  }
}

const jsonResponse = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json" },
  });

async function run(videoBase64: string) {
  return withStubbedFetch((async () => jsonResponse({ video: videoBase64 })) as typeof fetch, () =>
    handleVideoGeneration({
      body: { model: "sdwebui/animatediff-webui", prompt: "synthetic" },
      credentials: null,
      log: null,
    })
  );
}

test("a video body under the cap is returned", async () => {
  const result = await run("QUJD");
  assert.equal(result.success, true);
});

test("a video body over the cap is refused with a 502", async () => {
  const result = await run("A".repeat(64 * 1024));
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(String(result.error), /exceeded/i);
});

test("an over-cap Haiper submission answer is a 502, not a rejection", async () => {
  const stub = (async () => jsonResponse({ job_id: "A".repeat(64 * 1024) })) as typeof fetch;
  const result = await withStubbedFetch(stub, () =>
    handleVideoGeneration({
      body: { model: "haiper/gen2", prompt: "synthetic" },
      credentials: { apiKey: "h-key" },
      log: null,
    })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(String(result.error), /exceeded/i);
});

test("an abort while a Runway poll error body is read is a 499", async () => {
  const controller = new AbortController();
  const stub = (async (_input: string | URL | Request, init: RequestInit = {}) => {
    if ((init.method || "GET") === "POST") return jsonResponse({ id: "rt-abort" });
    // The status poll fails upstream, and the client goes away while its error body streams.
    const body = new ReadableStream<Uint8Array>({
      pull(stream) {
        controller.abort();
        stream.error(new DOMException("This operation was aborted", "AbortError"));
      },
    });
    return new Response(body, { status: 500 });
  }) as typeof fetch;
  const result = await withStubbedFetch(stub, () =>
    handleVideoGeneration({
      body: { model: "runwayml/gen4.5", prompt: "synthetic" },
      credentials: { apiKey: "r-key" },
      log: null,
      signal: controller.signal,
    })
  );
  assert.deepEqual(result, { success: false, status: 499, error: "Request aborted" });
});
