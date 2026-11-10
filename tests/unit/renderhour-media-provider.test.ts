import test from "node:test";
import assert from "node:assert/strict";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { handleVideoGeneration } from "../../open-sse/handlers/videoGeneration.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";
import { getImageProvider, parseImageModel } from "../../open-sse/config/imageRegistry.ts";
import { getVideoProvider, parseVideoModel } from "../../open-sse/config/videoRegistry.ts";
import { getSpeechProvider, parseSpeechModel } from "../../open-sse/config/audioRegistry.ts";
import {
  RENDERHOUR_IMAGE_RATIOS,
  RENDERHOUR_VIDEO_RATIOS,
  renderhourAspectRatio,
  renderhourBaseUrl,
  renderhourConfig,
  renderhourSeconds,
} from "../../open-sse/handlers/mediaGeneration/renderhour.ts";
import { handleRenderhourVideoGeneration } from "../../open-sse/handlers/videoGeneration/renderhourHandler.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth.ts";
import { supportsDualAuthProvider } from "../../src/shared/constants/providers.ts";

const BASE = "https://renderhour.com";
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

type Seen = {
  uploads: Array<{ auth: string; type: string }>;
  submits: Array<{ auth: string; idempotencyKey: string; body: Record<string, unknown> }>;
  polls: number;
};

/** A fake RenderHour: uploads, one job that succeeds on the second poll, then its file. */
function fakeRenderhour({
  outputs = [{ asset_id: "a1", content_type: "image/png", url: `${BASE}/files/a1` }],
  finalStatus = "succeeded",
  failureReason = null as string | null,
  submitStatus = 201,
  submitError = null as { code: string; message: string } | null,
} = {}) {
  const seen: Seen = { uploads: [], submits: [], polls: 0 };
  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    const headers = (init.headers ?? {}) as Record<string, string>;
    if (url === `${BASE}/v1/uploads`) {
      const file = (init.body as FormData).get("file") as Blob;
      seen.uploads.push({ auth: headers.Authorization, type: file.type });
      return Response.json({ id: `upload-${seen.uploads.length}` }, { status: 201 });
    }
    if (url === `${BASE}/v1/generations`) {
      seen.submits.push({
        auth: headers.Authorization,
        idempotencyKey: headers["Idempotency-Key"],
        body: JSON.parse(String(init.body)),
      });
      if (submitError) return Response.json({ error: submitError }, { status: submitStatus });
      return Response.json({ id: "job-1", status: "queued", outputs: [] }, { status: 201 });
    }
    if (url === `${BASE}/v1/generations/job-1`) {
      seen.polls += 1;
      if (seen.polls < 2) return Response.json({ id: "job-1", status: "running", outputs: [] });
      return Response.json({
        id: "job-1",
        status: finalStatus,
        failure_reason: failureReason,
        outputs: finalStatus === "succeeded" ? outputs : [],
      });
    }
    if (url.startsWith(`${BASE}/files/`)) {
      return new Response(new Uint8Array([1, 2, 3]), { headers: { "content-type": "audio/mpeg" } });
    }
    throw new Error(`Unexpected URL: ${url}`);
  }) as typeof fetch;
  return seen;
}

test("RenderHour is one dual-auth card serving image, video and speech models", () => {
  assert.deepEqual(OAUTH_PROVIDERS.renderhour.serviceKinds, ["image", "video", "tts"]);
  assert.equal(supportsDualAuthProvider("renderhour"), true);

  assert.deepEqual(parseImageModel("renderhour/nano-banana-pro"), {
    provider: "renderhour",
    model: "nano-banana-pro",
  });
  assert.equal(getImageProvider("renderhour")?.format, "renderhour-image");
  assert.deepEqual(parseVideoModel("renderhour/seedance-2.5"), {
    provider: "renderhour",
    model: "seedance-2.5",
  });
  assert.equal(getVideoProvider("renderhour")?.format, "renderhour-video");
  assert.equal(parseSpeechModel("renderhour/eleven-v4").provider, "renderhour");
  assert.equal(getSpeechProvider("renderhour")?.format, "renderhour-tts");
});

test("OpenAI-style fields map to RenderHour's request", () => {
  assert.equal(renderhourAspectRatio({ size: "1792x1024" }, RENDERHOUR_IMAGE_RATIOS), "16:9");
  assert.equal(renderhourAspectRatio({ size: "1024x1536" }, RENDERHOUR_IMAGE_RATIOS), "3:4");
  assert.equal(renderhourAspectRatio({ size: "720x1280" }, RENDERHOUR_VIDEO_RATIOS), "9:16");
  assert.equal(renderhourAspectRatio({ aspect_ratio: "4:5", size: "1x1" }, []), "4:5");
  assert.equal(renderhourAspectRatio({ size: "auto" }, RENDERHOUR_IMAGE_RATIOS), undefined);

  assert.equal(renderhourConfig({ quality: "hd" }), undefined);
  assert.deepEqual(renderhourConfig({ resolution: "2k", config: { quality: "high" } }), {
    quality: "high",
    resolution: "2k",
  });
  assert.deepEqual(renderhourConfig({ mode: "pro", audio: true }), { mode: "pro", audio: true });

  assert.equal(renderhourSeconds({ seconds: "8" }), 8);
  assert.equal(renderhourSeconds({ duration: "10s" }), 10);
  assert.equal(renderhourSeconds({}), undefined);

  assert.equal(
    renderhourBaseUrl({ providerSpecificData: { baseUrl: "http://localhost:3210/" } }),
    "http://localhost:3210"
  );
  assert.equal(renderhourBaseUrl({}), BASE);
});

test("images: references are uploaded, the job is submitted once and polled to its URLs", async () => {
  const seen = fakeRenderhour({
    outputs: [
      { asset_id: "a1", content_type: "image/png", url: `${BASE}/files/a1` },
      { asset_id: "a2", content_type: "image/png", url: `${BASE}/files/a2` },
    ],
  });
  const result = await handleImageGeneration({
    body: {
      model: "renderhour/nano-banana-pro",
      prompt: "a fox in the snow",
      n: 2,
      size: "1024x1024",
      image: `data:image/png;base64,${PNG.toString("base64")}`,
      poll_interval_ms: 1,
    },
    credentials: { accessToken: "rhat_subscription" },
    log: null,
  });

  assert.equal(result.success, true);
  assert.deepEqual(
    result.data.data.map((item) => item.url),
    [`${BASE}/files/a1`, `${BASE}/files/a2`]
  );
  assert.deepEqual(seen.uploads, [{ auth: "Bearer rhat_subscription", type: "image/png" }]);
  assert.equal(seen.submits.length, 1);
  assert.match(seen.submits[0].idempotencyKey, /^[0-9a-f-]{36}$/);
  assert.deepEqual(seen.submits[0].body, {
    model: "nano-banana-pro",
    prompt: "a fox in the snow",
    count: 2,
    aspect_ratio: "1:1",
    inputs: { references: ["upload-1"] },
  });
  assert.equal(seen.polls, 2);
});

test("images: RenderHour's refusal keeps its status and reason", async () => {
  fakeRenderhour({
    submitStatus: 402,
    submitError: { code: "insufficient_credits", message: "not enough credits" },
  });
  const result = await handleImageGeneration({
    body: { model: "renderhour/z-image", prompt: "a fox" },
    credentials: { apiKey: "rh_key" },
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 402);
  assert.match(String(result.error), /insufficient_credits: not enough credits/);
});

test("video: frames are uploaded, length and ratio sent, a moderated job is a 422", async () => {
  const seen = fakeRenderhour({
    outputs: [{ asset_id: "v1", content_type: "video/mp4", url: `${BASE}/files/v1` }],
  });
  const ok = await handleVideoGeneration({
    body: {
      model: "renderhour/kling-3.0",
      prompt: "the fox runs",
      duration: 10,
      size: "1280x720",
      image: `data:image/png;base64,${PNG.toString("base64")}`,
      end_image: PNG.toString("base64"),
      poll_interval_ms: 1,
    },
    credentials: { apiKey: "rh_key" },
    log: null,
  });
  assert.equal(ok.success, true);
  assert.deepEqual(ok.data.data, [{ url: `${BASE}/files/v1`, format: "mp4" }]);
  assert.equal(seen.uploads.length, 2);
  assert.deepEqual(seen.submits[0].body, {
    model: "kling-3.0",
    prompt: "the fox runs",
    duration_s: 10,
    aspect_ratio: "16:9",
    inputs: { references: [], start_frame: "upload-1", end_frame: "upload-2" },
  });

  fakeRenderhour({ finalStatus: "failed", failureReason: "moderation" });
  const refused = await handleVideoGeneration({
    body: { model: "renderhour/seedance-2.5", prompt: "x", poll_interval_ms: 1 },
    credentials: { apiKey: "rh_key" },
    log: null,
  });
  assert.equal(refused.success, false);
  assert.equal(refused.status, 422);
  assert.match(String(refused.error), /moderation/);
});

test("video: the call is recorded through the dispatcher's recorder, failures too", async () => {
  fakeRenderhour({
    outputs: [{ asset_id: "v1", content_type: "video/mp4", url: `${BASE}/files/v1` }],
  });
  const records: Array<{ provider: string; model: string; status?: number; success: boolean }> = [];
  const recordCall = ({ provider, model, result }) => {
    records.push({ provider, model, success: result.success, status: result.status });
  };
  const ok = await handleRenderhourVideoGeneration({
    model: "kling-3.0",
    provider: "renderhour",
    providerConfig: { baseUrl: BASE },
    body: { prompt: "x", poll_interval_ms: 1 },
    credentials: { apiKey: "rh_key" },
    recordCall,
  });
  assert.equal(ok.success, true);

  const missing = await handleRenderhourVideoGeneration({
    model: "kling-3.0",
    provider: "renderhour",
    providerConfig: { baseUrl: BASE },
    body: { prompt: "x" },
    credentials: {},
    recordCall,
  });
  assert.equal(missing.success, false);
  assert.deepEqual(records, [
    { provider: "renderhour", model: "kling-3.0", success: true, status: undefined },
    { provider: "renderhour", model: "kling-3.0", success: false, status: 401 },
  ]);
});

test("speech: the input becomes the job's text and the file is streamed back", async () => {
  const seen = fakeRenderhour({
    outputs: [{ asset_id: "s1", content_type: "audio/mpeg", url: `${BASE}/files/s1` }],
  });
  const response = await handleAudioSpeech({
    body: { model: "renderhour/eleven-v4", input: "Hello there", poll_interval_ms: 1 },
    credentials: { accessToken: "rhat_subscription" },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array([1, 2, 3]));
  assert.deepEqual(seen.submits[0].body, { model: "eleven-v4", text: "Hello there" });
});
