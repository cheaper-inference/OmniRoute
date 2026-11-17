import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or-video-nob64-"));

const { handleVideoJobGeneration } = await import("../../open-sse/handlers/videoGeneration/job.ts");

test("auth-gated video result reaches the media sink without a base64 copy", async () => {
  const downloaded = new Uint8Array([0, 0, 0, 32, 102, 116, 121, 112, 105, 115, 111, 109]).buffer;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (String(init?.method ?? "GET") === "POST") {
      return new Response(JSON.stringify({ id: "job-1", status: "pending" }), {
        status: 202,
        headers: { "content-type": "application/json" },
      });
    }
    if (url.endsWith("/content?index=0")) {
      const response = new Response("x", { status: 200 });
      response.arrayBuffer = async () => downloaded;
      return response;
    }
    return new Response(
      JSON.stringify({
        id: "job-1",
        status: "completed",
        unsigned_urls: ["https://openrouter.ai/api/v1/videos/job-1/content?index=0"],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  let stored: Buffer | null = null;
  try {
    const result = await handleVideoJobGeneration({
      model: "alibaba/wan-3.0",
      presetName: "openrouter-video-job",
      body: { prompt: "a paper boat" },
      credentials: { apiKey: "test-key" },
      pollIntervalMs: 1,
      mediaSink: {
        store: (bytes) => {
          stored = bytes;
          return "https://gw.example/api/v1/media/none__abc.mp4";
        },
      },
    });
    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(stored, "sink should receive the video bytes");
  assert.ok(
    (stored as Buffer).buffer === downloaded,
    "sink must get a view of the downloaded ArrayBuffer, not a base64-decoded copy"
  );
});
