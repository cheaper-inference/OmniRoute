/**
 * A video provider answer is read into memory in full. A runaway or hostile
 * upstream body must stop at the shared non-streaming cap
 * (OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES) and become a clean 502, not an
 * unbounded buffer. The test drives the SD WebUI video handler through a stubbed fetch.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES = "4096";

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function run(videoBase64: string) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ video: videoBase64 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  try {
    return await handleVideoGeneration({
      body: { model: "sdwebui/animatediff-webui", prompt: "synthetic" },
      credentials: null,
      log: null,
    });
  } finally {
    globalThis.fetch = original;
  }
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
