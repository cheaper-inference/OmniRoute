/**
 * Leonardo video: the handler posted an image-generation body (`modelId: "phoenix"`,
 * `num_frames`) to the image endpoint, which Leonardo rejects with
 * `400 Unexpected variable num_frames`. Video goes to `POST /generations-text-to-video`
 * with a `model` enum and a `resolution`, the job comes back as `motionVideoGenerationJob`,
 * and the mp4 is `generated_images[0].motionMP4URL` (`url` is a jpg thumbnail).
 */

import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-leonardo-video-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleLeonardoVideoGeneration } =
  await import("../../open-sse/handlers/videoGeneration/leonardoHandler.ts");
const { getVideoProvider } = await import("../../open-sse/config/videoRegistry.ts");

const providerConfig = getVideoProvider("leonardo");
const SUBMIT_URL = "https://cloud.leonardo.ai/api/rest/v1/generations-text-to-video";
const STATUS_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";
const MP4 = new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112]);

const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");

const originalFetch = globalThis.fetch;
// The result download goes through the guarded media fetch, which resolves the host and then
// connects through a pinned agent. Resolve cdn.leonardo.ai to a public address and send the
// pinned request to the mocked globalThis.fetch.
const originalLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async () => [
  { address: "93.184.216.34", family: 4 },
]) as typeof dns.promises.lookup;
setPinnedFetchTestOverride(((input: string | URL | Request, init?: RequestInit) =>
  globalThis.fetch(input, init)) as typeof fetch);
test.after(async () => {
  globalThis.fetch = originalFetch;
  (dns.promises as { lookup: unknown }).lookup = originalLookup;
  setPinnedFetchTestOverride(undefined);
  await waitForCallLogSaves(1_000);
  resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function json(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** Fake Leonardo: records the submit request and completes the job on the first poll. */
async function generate(
  model: string,
  body: Record<string, unknown> = {},
  {
    fetchVideo = async () => new Response(MP4),
    signal = null,
    downloadTimeoutMs,
  }: {
    fetchVideo?: (options?: RequestInit) => Promise<Response>;
    signal?: AbortSignal | null;
    downloadTimeoutMs?: number;
  } = {}
) {
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
    if (href === "https://cdn.leonardo.ai/video.mp4") return fetchVideo(options);
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
    signal,
    pollIntervalMs: 0,
    ...(downloadTimeoutMs ? { downloadTimeoutMs } : {}),
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

// Leonardo also takes 512x768 (2:3) and 576x720 (4:5); at RESOLUTION_720 the same pair picks
// the aspect. Checked live (Motion 2.0 Fast, 2026-11-08): 512x768 at 720p returned a 768x1152
// mp4, 576x720 at 720p returned 832x1024, and 512x768 at 480p returned 512x768.
test("2:3 and 4:5 portrait sizes keep their aspect instead of becoming 9:16", async () => {
  const sent = async (size: string) => {
    const body = (await generate("motion-2.0-fast", { size })).submitted?.body;
    return [body?.resolution, body?.width, body?.height];
  };
  assert.deepEqual(await sent("512x768"), ["RESOLUTION_480", 512, 768]);
  assert.deepEqual(await sent("576x720"), ["RESOLUTION_480", 576, 720]);
  assert.deepEqual(await sent("768x1152"), ["RESOLUTION_720", 512, 768]);
  assert.deepEqual(await sent("864x1024"), ["RESOLUTION_720", 576, 720]);
  assert.deepEqual(await sent("832x1024"), ["RESOLUTION_720", 576, 720]);
  // Sizes Leonardo has no shape for keep the 16:9 / 9:16 mapping.
  assert.deepEqual(await sent("1024x1024"), ["RESOLUTION_720", 1280, 720]);
  assert.deepEqual(await sent("768x512"), ["RESOLUTION_720", 1280, 720]);
});

test("the catalog lists the Motion 2.0 models", () => {
  assert.deepEqual(
    providerConfig.models.map((m: { id: string }) => m.id),
    ["motion-2.0", "motion-2.0-fast"]
  );
});

/** A CDN response that never arrives; it rejects only when the request's signal aborts. */
function stalledDownload(options?: RequestInit): Promise<Response> {
  return new Promise((_, reject) => {
    options?.signal?.addEventListener("abort", () => reject(options.signal?.reason));
  });
}

test("a failed mp4 download is an upstream error, not a corrupt video", async () => {
  const { result } = await generate(
    "motion-2.0-fast",
    {},
    {
      fetchVideo: async () => new Response("AccessDenied", { status: 403 }),
    }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
});

test("a client abort during the mp4 download stops it", async () => {
  const controller = new AbortController();
  const { result } = await generate(
    "motion-2.0-fast",
    {},
    {
      signal: controller.signal,
      fetchVideo: (options) => {
        setTimeout(() => controller.abort(), 5);
        return stalledDownload(options);
      },
    }
  );
  assert.equal(result.status, 499);
});

test("a stalled mp4 download times out", async () => {
  const { result } = await generate(
    "motion-2.0-fast",
    {},
    {
      downloadTimeoutMs: 20,
      fetchVideo: stalledDownload,
    }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 504);
});
