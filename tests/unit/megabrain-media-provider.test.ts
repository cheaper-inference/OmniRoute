import test from "node:test";
import assert from "node:assert/strict";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { handleVideoGeneration } from "../../open-sse/handlers/videoGeneration.ts";
import { getImageProvider, parseImageModel } from "../../open-sse/config/imageRegistry.ts";
import { getVideoProvider, parseVideoModel } from "../../open-sse/config/videoRegistry.ts";
import { MEGABRAIN_MEDIA_PARAMS } from "../../open-sse/config/providers/registry/megabrain/mediaModels.ts";
import { buildMegabrainImageInput } from "../../open-sse/handlers/imageGeneration/providers/megabrain.ts";
import {
  buildMegabrainVideoInput,
  handleMegabrainVideoGeneration,
  resolveMegabrainVideoModel,
} from "../../open-sse/handlers/videoGeneration/megabrainHandler.ts";
import {
  megabrainAspectRatio,
  megabrainImageRef,
  megabrainSeconds,
  megabrainToken,
} from "../../open-sse/handlers/mediaGeneration/megabrain.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth.ts";

const BASE = "https://api.getmegabrain.com/api/gateway/v1";
const CDN = `${BASE}/media/files/job-1`;
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

type Seen = {
  submits: Array<{ url: string; headers: Record<string, string>; body: Record<string, unknown> }>;
  polls: Array<{ url: string; auth: string }>;
};

/** A fake MegaBrain queue: one job, 202 on the first result read, then its output. */
function fakeMegabrain({
  output = { images: [{ url: `${CDN}/0` }] } as Record<string, unknown>,
  submitStatus = 200,
  submitError = null as string | null,
  resultStatus = 200,
  resultError = null as string | null,
} = {}) {
  const seen: Seen = { submits: [], polls: [] };
  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    const headers = (init.headers ?? {}) as Record<string, string>;
    if (url.startsWith(`${BASE}/queue/requests/`)) {
      seen.polls.push({ url, auth: headers.Authorization });
      if (seen.polls.length < 2) return Response.json({ status: "IN_PROGRESS" }, { status: 202 });
      if (resultError) {
        return Response.json({ error: { message: resultError } }, { status: resultStatus });
      }
      return Response.json(output);
    }
    if (url.startsWith(`${BASE}/queue/`) && init.method === "POST") {
      seen.submits.push({ url, headers, body: JSON.parse(String(init.body)) });
      if (submitError) {
        return Response.json({ error: { message: submitError } }, { status: submitStatus });
      }
      return Response.json({ request_id: "job-1", status: "IN_QUEUE" });
    }
    throw new Error(`Unexpected URL: ${url}`);
  }) as typeof fetch;
  return seen;
}

test("MegaBrain's one card serves chat, image and video; media ids are megabrain/<model>", () => {
  assert.deepEqual(OAUTH_PROVIDERS.megabrain.serviceKinds, ["llm", "image", "video"]);

  assert.deepEqual(parseImageModel("megabrain/nano-banana-pro"), {
    provider: "megabrain",
    model: "nano-banana-pro",
  });
  // Ids that start with another provider's name still resolve under the megabrain/ prefix.
  assert.deepEqual(parseImageModel("megabrain/minimax/h3-image"), {
    provider: "megabrain",
    model: "minimax/h3-image",
  });
  assert.equal(getImageProvider("megabrain")?.format, "megabrain-image");
  assert.equal(getImageProvider("megabrain")?.baseUrl, BASE);
  assert.deepEqual(parseVideoModel("megabrain/kling-video/v3/pro/text-to-video"), {
    provider: "megabrain",
    model: "kling-video/v3/pro/text-to-video",
  });
  assert.equal(getVideoProvider("megabrain")?.format, "megabrain-video");

  // Every listed model has its input fields, so no request carries a field it would refuse.
  for (const { id } of [
    ...(getImageProvider("megabrain")?.models ?? []),
    ...(getVideoProvider("megabrain")?.models ?? []),
  ]) {
    assert.ok(MEGABRAIN_MEDIA_PARAMS[id], `no input fields for ${id}`);
  }
});

test("OpenAI-style fields map to each model's own input fields", () => {
  assert.deepEqual(
    buildMegabrainImageInput("flux-2", { prompt: "a fox", n: 9, size: "1536x1024", quality: "hd" }),
    { prompt: "a fox", num_images: 4, image_size: { width: 1536, height: 1024 } }
  );
  assert.deepEqual(
    buildMegabrainImageInput("nano-banana-pro", {
      prompt: "a fox",
      size: "1792x1024",
      resolution: "2K",
      num_inference_steps: 20,
    }),
    { prompt: "a fox", aspect_ratio: "16:9", resolution: "2K" }
  );
  // An explicit ratio wins over one derived from `size`; edits keep the input's size.
  assert.deepEqual(
    buildMegabrainImageInput("nano-banana", {
      prompt: "x",
      size: "1024x1024",
      aspect_ratio: "9:16",
    }),
    { prompt: "x", aspect_ratio: "9:16" }
  );
  assert.deepEqual(buildMegabrainImageInput("flux-2/edit", { prompt: "x", size: "1024x1024" }), {
    prompt: "x",
  });

  assert.deepEqual(
    buildMegabrainVideoInput("kling-video/v3/pro/text-to-video", {
      prompt: "the fox runs",
      seconds: "8",
      size: "720x1280",
      generate_audio: false,
      resolution: "1080p",
    }),
    { prompt: "the fox runs", duration: "8", aspect_ratio: "9:16", generate_audio: false }
  );
  assert.equal(megabrainSeconds({ duration: "10s" }), "10");
  assert.equal(megabrainSeconds({}), undefined);
  assert.equal(megabrainAspectRatio("auto", ["1:1"]), undefined);

  assert.equal(
    resolveMegabrainVideoModel("kling-video/v2.6/pro/text-to-video", {
      image: "https://x/y.png",
    }),
    "kling-video/v2.6/pro/image-to-video"
  );
  assert.equal(
    resolveMegabrainVideoModel("kling-video/v3/pro/text-to-video", {}),
    "kling-video/v3/pro/text-to-video"
  );

  assert.equal(megabrainToken({ apiKey: "mb-v1-key", accessToken: "jwt" }), "mb-v1-key");
  assert.equal(megabrainToken({ accessToken: "jwt" }), "jwt");
  assert.equal(megabrainToken(null), "");
});

test("input images: URLs and data URIs pass as they are, bare base64 becomes a data URI", async () => {
  const read = async () => ({ buffer: PNG, contentType: "image/png" });
  assert.equal(await megabrainImageRef("https://a.example/x.png", read), "https://a.example/x.png");
  assert.equal(
    await megabrainImageRef("data:image/jpeg;base64,AAAA", read),
    "data:image/jpeg;base64,AAAA"
  );
  assert.equal(
    await megabrainImageRef(PNG.toString("base64"), read),
    `data:image/png;base64,${PNG.toString("base64")}`
  );
});

test("images: one queued job with the device token and plan headers, polled to its URLs", async () => {
  const seen = fakeMegabrain({ output: { images: [{ url: `${CDN}/0` }, { url: `${CDN}/1` }] } });
  const result = await handleImageGeneration({
    body: {
      model: "megabrain/nano-banana-pro/edit",
      prompt: "make it winter",
      n: 2,
      image: "https://a.example/fox.png",
      poll_interval_ms: 1,
    },
    credentials: { accessToken: "device-token" },
    log: null,
  });

  assert.equal(result.success, true);
  assert.deepEqual(
    result.data.data.map((item) => item.url),
    [`${CDN}/0`, `${CDN}/1`]
  );
  assert.equal(seen.submits.length, 1);
  assert.equal(seen.submits[0].url, `${BASE}/queue/nano-banana-pro/edit`);
  assert.equal(seen.submits[0].headers.Authorization, "Bearer device-token");
  assert.equal(seen.submits[0].headers["X-KILOCODE-FEATURE"], "omniroute");
  assert.deepEqual(seen.submits[0].body, {
    prompt: "make it winter",
    num_images: 2,
    image_urls: ["https://a.example/fox.png"],
  });
  assert.deepEqual(
    seen.polls.map((poll) => poll.url),
    [`${BASE}/queue/requests/job-1`, `${BASE}/queue/requests/job-1`]
  );
  assert.equal(seen.polls[0].auth, "Bearer device-token");
});

test("images: MegaBrain's refusal keeps its status and message; no credential is a 401", async () => {
  fakeMegabrain({ submitStatus: 402, submitError: "Insufficient balance" });
  const refused = await handleImageGeneration({
    body: { model: "megabrain/flux/schnell", prompt: "a fox" },
    credentials: { apiKey: "mb-v1-key" },
    log: null,
  });
  assert.equal(refused.success, false);
  assert.equal(refused.status, 402);
  assert.match(String(refused.error), /MegaBrain 402: Insufficient balance/);

  const missing = await handleImageGeneration({
    body: { model: "megabrain/flux/schnell", prompt: "a fox" },
    credentials: {},
    log: null,
  });
  assert.equal(missing.success, false);
  assert.equal(missing.status, 401);
});

test("video: a start frame moves text-to-video to image-to-video; a failed job is a 422", async () => {
  const seen = fakeMegabrain({ output: { video: { url: `${CDN}/0` } } });
  const ok = await handleVideoGeneration({
    body: {
      model: "megabrain/kling-video/v3/standard/text-to-video",
      prompt: "the fox runs",
      duration: 10,
      size: "1280x720",
      image: `data:image/png;base64,${PNG.toString("base64")}`,
      end_image: "https://a.example/end.png",
      poll_interval_ms: 1,
    },
    credentials: { apiKey: "mb-v1-key" },
    log: null,
  });
  assert.equal(ok.success, true);
  assert.deepEqual(ok.data.data, [{ url: `${CDN}/0`, format: "mp4" }]);
  assert.equal(seen.submits[0].url, `${BASE}/queue/kling-video/v3/standard/image-to-video`);
  assert.deepEqual(seen.submits[0].body, {
    prompt: "the fox runs",
    duration: "10",
    start_image_url: `data:image/png;base64,${PNG.toString("base64")}`,
    end_image_url: "https://a.example/end.png",
  });

  // `image_urls: [start]` is a start frame too; fields the model does not take are left out.
  const kling26 = fakeMegabrain({ output: { video: { url: `${CDN}/0` } } });
  await handleVideoGeneration({
    body: {
      model: "megabrain/kling-video/v2.6/pro/image-to-video",
      prompt: "x",
      image_urls: ["https://a.example/start.png"],
      resolution: "1080p",
      cfg_scale: 0.7,
      generate_audio: true,
      poll_interval_ms: 1,
    },
    credentials: { apiKey: "mb-v1-key" },
    log: null,
  });
  assert.deepEqual(kling26.submits[0].body, {
    prompt: "x",
    generate_audio: true,
    start_image_url: "https://a.example/start.png",
  });

  fakeMegabrain({ resultStatus: 422, resultError: "The generation failed" });
  const failed = await handleVideoGeneration({
    body: { model: "megabrain/kling-video/v3/pro/text-to-video", prompt: "x", poll_interval_ms: 1 },
    credentials: { apiKey: "mb-v1-key" },
    log: null,
  });
  assert.equal(failed.success, false);
  assert.equal(failed.status, 422);
  assert.match(String(failed.error), /The generation failed/);
});

test("video: the call is recorded through the dispatcher's recorder, failures too", async () => {
  fakeMegabrain({ output: { video: { url: `${CDN}/0` } } });
  const records: Array<{ provider: string; model: string; status?: number; success: boolean }> = [];
  const recordCall = ({ provider, model, result }) => {
    records.push({ provider, model, success: result.success, status: result.status });
  };
  const model = "kling-video/v2.6/pro/text-to-video";
  const ok = await handleMegabrainVideoGeneration({
    model,
    provider: "megabrain",
    providerConfig: { baseUrl: BASE },
    body: { prompt: "x", poll_interval_ms: 1 },
    credentials: { accessToken: "device-token" },
    recordCall,
  });
  assert.equal(ok.success, true);

  const missing = await handleMegabrainVideoGeneration({
    model,
    provider: "megabrain",
    providerConfig: { baseUrl: BASE },
    body: { prompt: "x" },
    credentials: {},
    recordCall,
  });
  assert.equal(missing.success, false);
  assert.deepEqual(records, [
    { provider: "megabrain", model, success: true, status: undefined },
    { provider: "megabrain", model, success: false, status: 401 },
  ]);
});
