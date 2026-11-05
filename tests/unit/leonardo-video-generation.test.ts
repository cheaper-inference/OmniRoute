/**
 * Leonardo video: the handler posted an image-generation body (`modelId: "phoenix"`,
 * `num_frames`) to the image endpoint, which Leonardo rejects with
 * `400 Unexpected variable num_frames`. Video goes to `POST /generations-text-to-video`
 * with a `model` enum and a `resolution`, the job comes back as `motionVideoGenerationJob`,
 * and the mp4 is `generated_images[0].motionMP4URL` (`url` is a jpg thumbnail).
 */

import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-leonardo-video-"));

const { handleLeonardoVideoGeneration } =
  await import("../../open-sse/handlers/videoGeneration/leonardoHandler.ts");
const { getVideoProvider } = await import("../../open-sse/config/videoRegistry.ts");

const providerConfig = getVideoProvider("leonardo");
const SUBMIT_URL = "https://cloud.leonardo.ai/api/rest/v1/generations-text-to-video";
const STATUS_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";
const MP4 = new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112]);

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

function json(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** Fake Leonardo: records the submit request and completes the job on the first poll. */
async function generate(model: string, body: Record<string, unknown> = {}) {
  let submitted: { url: string; body: Record<string, unknown> } | null = null;
  globalThis.fetch = (async (url: unknown, options?: RequestInit) => {
    const href = String(url);
    if (options?.method === "POST") {
      submitted = { url: href, body: JSON.parse(String(options.body)) };
      return json({ motionVideoGenerationJob: { generationId: "vid-1" } });
    }
    if (href === `${STATUS_URL}/vid-1`) {
      return json({
        generations_by_pk: {
          status: "COMPLETE",
          generated_images: [
            {
              url: "https://cdn.leonardo.ai/thumb.jpg",
              motionMP4URL: "https://cdn.leonardo.ai/video.mp4",
            },
          ],
        },
      });
    }
    if (href === "https://cdn.leonardo.ai/video.mp4") return new Response(MP4);
    if (href === "https://cdn.leonardo.ai/thumb.jpg") return new Response("jpeg");
    throw new Error(`unexpected fetch ${href}`);
  }) as typeof fetch;

  const result = await handleLeonardoVideoGeneration({
    model,
    provider: "leonardo",
    providerConfig,
    body: { prompt: "a paper boat drifting on a pond", ...body },
    credentials: { apiKey: "test-key" },
    log: null,
    pollIntervalMs: 0,
  });
  return { result, submitted };
}

test("a video request goes to the text-to-video endpoint with a model enum and resolution", async () => {
  const { submitted } = await generate("motion-2.0-fast");
  assert.equal(submitted?.url, SUBMIT_URL);
  assert.equal(submitted?.body.model, "MOTION2FAST");
  assert.equal(submitted?.body.resolution, "RESOLUTION_720");
  assert.equal(submitted?.body.width, 1280);
  assert.equal(submitted?.body.height, 720);
  assert.equal(submitted?.body.prompt, "a paper boat drifting on a pond");
  assert.equal(submitted?.body.num_frames, undefined);
  assert.equal(submitted?.body.modelId, undefined);
});

test("the result is the mp4 from motionMP4URL, not the jpg thumbnail", async () => {
  const { result } = await generate("motion-2.0");
  assert.equal(result.success, true);
  const item = (result as { data: { data: Array<{ b64_json: string; format: string }> } }).data
    .data[0];
  assert.equal(item.format, "mp4");
  assert.deepEqual(new Uint8Array(Buffer.from(item.b64_json, "base64")), MP4);
});

test("motion-2.0 and the old phoenix id both send Motion 2.0", async () => {
  assert.equal((await generate("motion-2.0")).submitted?.body.model, "MOTION2");
  assert.equal((await generate("phoenix")).submitted?.body.model, "MOTION2");
});

test("a 480p size picks RESOLUTION_480 and keeps a portrait orientation", async () => {
  const landscape = (await generate("motion-2.0-fast", { size: "832x480" })).submitted?.body;
  assert.deepEqual(
    [landscape?.resolution, landscape?.width, landscape?.height],
    ["RESOLUTION_480", 832, 480]
  );
  const portrait = (await generate("motion-2.0-fast", { size: "480x832" })).submitted?.body;
  assert.deepEqual(
    [portrait?.resolution, portrait?.width, portrait?.height],
    ["RESOLUTION_480", 480, 832]
  );
  const portrait720 = (await generate("motion-2.0", { size: "720x1280" })).submitted?.body;
  assert.deepEqual(
    [portrait720?.resolution, portrait720?.width, portrait720?.height],
    ["RESOLUTION_720", 720, 1280]
  );
});

test("the catalog lists the Motion 2.0 models", () => {
  assert.deepEqual(
    providerConfig.models.map((m: { id: string }) => m.id),
    ["motion-2.0", "motion-2.0-fast"]
  );
});
