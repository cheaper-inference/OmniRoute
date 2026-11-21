import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-kie-video-image-urls-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

async function captureKiePayload(body) {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let captured;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.endsWith("/api/v1/jobs/createTask")) {
      captured = JSON.parse(String(options.body || "{}"));
      return jsonResponse({ code: 200, data: { taskId: "kie-video-task" } });
    }
    if (stringUrl.includes("/api/v1/jobs/recordInfo")) {
      return jsonResponse({
        code: 200,
        data: {
          state: "success",
          resultJson: JSON.stringify({ resultUrls: ["https://cdn.example.com/kie.mp4"] }),
        },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    await handleVideoGeneration({ body, credentials: { apiKey: "kie-test-key" }, log: null });
    return captured;
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
}

test("KIE image-to-video forwards the start frame as input.image_urls", async () => {
  const payload = await captureKiePayload({
    model: "kie/grok-imagine/image-to-video",
    prompt: "slow push-in",
    image_url: "https://cdn.example.com/start.png",
  });
  assert.ok(payload, "createTask was called");
  assert.deepEqual(payload.input.image_urls, ["https://cdn.example.com/start.png"]);
});

test("KIE accepts image_urls arrays and {url} objects, de-duplicates, and drops non-http values", async () => {
  const payload = await captureKiePayload({
    model: "kie/kling-3.0/video",
    prompt: "wave",
    image_urls: ["https://cdn.example.com/a.png", "https://cdn.example.com/a.png", "ftp://x/y.png"],
    image: { url: "https://cdn.example.com/b.png" },
  });
  assert.deepEqual(payload.input.image_urls, [
    "https://cdn.example.com/a.png",
    "https://cdn.example.com/b.png",
  ]);
});

test("KIE text-to-video payload is unchanged when no image is given", async () => {
  const payload = await captureKiePayload({
    model: "kie/grok-imagine/text-to-video",
    prompt: "sunrise",
  });
  assert.equal("image_urls" in payload.input, false);
});
