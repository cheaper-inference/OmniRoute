import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-wavespeed-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { buildWavespeedImageInput } =
  await import("../../open-sse/handlers/imageGeneration/providers/wavespeed.ts");
const { SINGLE_IMAGE_FANOUT_FORMATS } =
  await import("../../open-sse/handlers/imageGeneration/fanOut.ts");
const { buildWavespeedSubmitUrl, buildWavespeedResultUrl, readWavespeedFailure } =
  await import("../../open-sse/handlers/mediaGeneration/wavespeed.ts");
const { getVideoJobPreset, handleVideoJobGeneration } =
  await import("../../open-sse/handlers/videoGeneration/job.ts");
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistryData.ts");
const { parseImageModel } = await import("../../open-sse/config/imageRegistry.ts");
const { getVideoProvider, parseVideoModel } =
  await import("../../open-sse/config/videoRegistry.ts");
const { getRegistryMediaKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");
const { APIKEY_PROVIDERS_SPECIALTY } =
  await import("../../src/shared/constants/providers/apikey/specialty-media.ts");
const { IMAGE_ONLY_PROVIDER_IDS, VIDEO_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { validateImageProviderApiKey } = await import("../../src/lib/providers/imageValidation.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");
const dbCore = await import("../../src/lib/db/core.ts");

// Image requests write call logs through the DB singleton; release it so the runner can exit.
test.after(() => {
  dbCore.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const API = "https://api.wavespeed.ai";
const IMAGE_MODEL = "wavespeed-ai/z-image/turbo";
const VIDEO_MODEL = "google/veo3.1-fast/text-to-video";
const CREDENTIALS = { apiKey: "ws-test-key" };

type Call = { url: string; method: string; auth: string | null; body: Record<string, unknown> };
type Responder = (call: Call, index: number) => Response;

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function envelope(data: Record<string, unknown>) {
  return json({ code: 200, message: "success", data });
}

/** Installs a fetch that records every call and answers through `respond`. */
function mockWavespeed(respond: Responder) {
  const calls: Call[] = [];
  const impl = async (input: unknown, init: RequestInit = {}) => {
    const call: Call = {
      url: String(input),
      method: String(init.method ?? "GET"),
      auth: new Headers(init.headers).get("authorization"),
      body: init.body ? JSON.parse(String(init.body)) : {},
    };
    calls.push(call);
    return respond(call, calls.length - 1);
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = impl as typeof fetch;
  setPinnedFetchTestOverride(impl as typeof fetch);
  return {
    calls,
    posts: () => calls.filter((call) => call.method === "POST"),
    restore: () => {
      globalThis.fetch = originalFetch;
      setPinnedFetchTestOverride(undefined);
    },
  };
}

function generateImage(body: Record<string, unknown>) {
  return handleImageGeneration({
    body: { model: `wavespeed/${IMAGE_MODEL}`, poll_interval_ms: 1, ...body },
    credentials: CREDENTIALS,
    log: null,
  });
}

test("wavespeed is registered as an API-key image and video provider", () => {
  const entry = APIKEY_PROVIDERS_SPECIALTY.wavespeed;
  assert.equal(entry.id, "wavespeed");
  assert.equal(entry.alias, "wavespeed");
  assert.equal(entry.name, "WaveSpeedAI");
  assert.equal(entry.website, "https://wavespeed.ai");
  // Media kinds come from the registries, not from a hand-kept list.
  assert.deepEqual(entry.serviceKinds, []);
  assert.ok(IMAGE_ONLY_PROVIDER_IDS.has("wavespeed"));
  assert.ok(VIDEO_PROVIDER_IDS.has("wavespeed"));
  assert.deepEqual(getRegistryMediaKinds("wavespeed").sort(), ["image", "video"]);

  const image = IMAGE_PROVIDERS.wavespeed;
  const video = getVideoProvider("wavespeed");
  for (const config of [image, video]) {
    assert.equal(config.baseUrl, API);
    assert.equal(config.authType, "apikey");
    assert.equal(config.authHeader, "bearer");
  }
  assert.equal(image.format, "wavespeed-image");
  assert.deepEqual(
    image.models.map((model) => model.id),
    [IMAGE_MODEL, "bytedance/seedream-v5.0-pro", "google/nano-banana-pro/text-to-image"]
  );
  assert.equal(video.format, "wavespeed-video-job");
  assert.ok(getVideoJobPreset(video.format), "video format must resolve to a job preset");
  assert.deepEqual(
    video.models.map((model) => model.id),
    [
      VIDEO_MODEL,
      "kwaivgi/kling-v4.0/text-to-video",
      "bytedance/seedance-2.5/text-to-video",
      "alibaba/wan-3.0/text-to-video",
    ]
  );
  // One prediction yields one image, so `n` is served by fanning out single calls.
  assert.ok(SINGLE_IMAGE_FANOUT_FORMATS.has("wavespeed-image"));
});

test("slash-separated model ids survive routing and become the submit path", () => {
  assert.deepEqual(parseImageModel(`wavespeed/${IMAGE_MODEL}`), {
    provider: "wavespeed",
    model: IMAGE_MODEL,
  });
  assert.deepEqual(parseVideoModel(`wavespeed/${VIDEO_MODEL}`), {
    provider: "wavespeed",
    model: VIDEO_MODEL,
  });
  assert.equal(buildWavespeedSubmitUrl(API, IMAGE_MODEL), `${API}/api/v3/${IMAGE_MODEL}`);
  assert.equal(buildWavespeedSubmitUrl(`${API}/`, "a b/c"), `${API}/api/v3/a%20b/c`);
  assert.equal(buildWavespeedResultUrl(API, "pred/1"), `${API}/api/v3/predictions/pred%2F1/result`);
});

test("dot and empty segments in a model id are rejected before any request", async () => {
  for (const model of [
    "../../balance",
    "a/./b",
    "x/%2e%2E/balance",
    "x/.%2e",
    "a//b",
    "/a/b",
    "a/b/",
  ]) {
    assert.throws(() => buildWavespeedSubmitUrl(API, model), /Invalid WaveSpeedAI model id/);
  }
  assert.equal(buildWavespeedSubmitUrl(API, "a/v1.5/b"), `${API}/api/v3/a/v1.5/b`);

  const api = mockWavespeed(() => envelope({ id: "never" }));
  try {
    const video = await handleVideoJobGeneration({
      model: "../../balance",
      presetName: "wavespeed-video-job",
      body: { prompt: "x" },
      credentials: CREDENTIALS,
      pollIntervalMs: 1,
    });
    assert.equal(video.success === false && video.status, 400);
    assert.equal(api.calls.length, 0);
  } finally {
    api.restore();
  }
});

test("image input: OpenAI size is translated per model, native fields pass through", () => {
  // z-image takes pixel dimensions joined by "*".
  assert.deepEqual(
    buildWavespeedImageInput(IMAGE_MODEL, {
      model: `wavespeed/${IMAGE_MODEL}`,
      prompt: "a red kite",
      n: 2,
      size: "1024x1536",
      response_format: "url",
      seed: 7,
      timeout_ms: 1000,
    }),
    { prompt: "a red kite", size: "1024*1536", seed: 7 }
  );
  // A native value is forwarded untouched.
  assert.equal(
    buildWavespeedImageInput(IMAGE_MODEL, { prompt: "p", size: "768*768" }).size,
    "768*768"
  );
  // Aspect-ratio models get the ratio; an explicit aspect_ratio wins over size.
  assert.deepEqual(
    buildWavespeedImageInput("bytedance/seedream-v5.0-pro", {
      prompt: "p",
      size: "1792x1024",
      resolution: "2k",
    }),
    { prompt: "p", aspect_ratio: "16:9", resolution: "2k" }
  );
  assert.deepEqual(
    buildWavespeedImageInput("google/nano-banana-pro/text-to-image", {
      prompt: "p",
      size: "1024x1024",
      aspect_ratio: "4:5",
    }),
    { prompt: "p", aspect_ratio: "4:5" }
  );
  // The size input of a model outside the catalog is unknown: an OpenAI size is left out.
  assert.deepEqual(buildWavespeedImageInput("some/other-model", { prompt: "p", size: "512x512" }), {
    prompt: "p",
  });
});

test("readWavespeedFailure reads error envelopes and failed predictions", () => {
  assert.equal(readWavespeedFailure({ code: 200, data: { status: "processing" } }), null);
  assert.deepEqual(readWavespeedFailure({ code: 400, message: "Model not found." }), {
    status: 400,
    message: "Model not found.",
    transient: false,
  });
  assert.equal(readWavespeedFailure({ code: 1001, message: "odd" })?.status, 502);
  assert.deepEqual(readWavespeedFailure({ code: 429, message: "slow down" }), {
    status: 429,
    message: "slow down",
    transient: true,
  });
  assert.deepEqual(
    readWavespeedFailure({ code: 200, data: { status: "failed", error: "content flagged" } }),
    { status: 502, message: "content flagged", transient: false }
  );
  for (const status of ["cancelled", "timeout", "deleted"]) {
    assert.deepEqual(readWavespeedFailure({ code: 200, data: { status, error: "" } }), {
      status: 502,
      message: `WaveSpeedAI prediction ${status}`,
      transient: false,
    });
  }
});

test("image generation submits once, polls to completion and returns the output URL", async () => {
  const statuses = ["created", "processing", "completed"];
  let polls = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-1", status: "created", outputs: [] });
    const status = statuses[polls++];
    return envelope({
      id: "pred-1",
      status,
      outputs: status === "completed" ? ["https://cdn.example.com/out.jpeg"] : [],
    });
  });

  try {
    const result = await generateImage({ prompt: "a red kite", size: "1024x1024" });

    assert.equal(result.success, true);
    assert.equal(typeof result.data.created, "number");
    assert.deepEqual(result.data.data, [
      { url: "https://cdn.example.com/out.jpeg", revised_prompt: "a red kite" },
    ]);
    assert.deepEqual(
      api.calls.map((call) => `${call.method} ${call.url}`),
      [
        `POST ${API}/api/v3/${IMAGE_MODEL}`,
        `GET ${API}/api/v3/predictions/pred-1/result`,
        `GET ${API}/api/v3/predictions/pred-1/result`,
        `GET ${API}/api/v3/predictions/pred-1/result`,
      ]
    );
    for (const call of api.calls) assert.equal(call.auth, "Bearer ws-test-key");
    assert.deepEqual(api.calls[0].body, { prompt: "a red kite", size: "1024*1024" });
  } finally {
    api.restore();
  }
});

test("image generation converts the output to b64_json when the client asks for it", async () => {
  const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-b64", status: "created" });
    if (call.url.includes("/predictions/")) {
      // A literal public address: the download is DNS-vetted, a hostname would be resolved.
      return envelope({ status: "completed", outputs: ["https://93.184.216.34/out.png"] });
    }
    return new Response(bytes, { status: 200, headers: { "content-type": "image/png" } });
  });

  try {
    const result = await generateImage({ prompt: "a red kite", response_format: "b64_json" });
    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 1);
    assert.equal(result.data.data[0].b64_json, Buffer.from(bytes).toString("base64"));
    assert.equal(api.posts().length, 1);
  } finally {
    api.restore();
  }
});

test("n > 1 runs one prediction per image", async () => {
  let nextId = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: `pred-${nextId++}`, status: "created" });
    const id = call.url.split("/").at(-2);
    return envelope({ status: "completed", outputs: [`https://cdn.example.com/${id}.jpeg`] });
  });

  try {
    const result = await generateImage({ prompt: "a red kite", n: 2 });
    assert.equal(result.success, true);
    assert.equal(api.posts().length, 2);
    assert.deepEqual(result.data.data.map((item: { url: string }) => item.url).sort(), [
      "https://cdn.example.com/pred-0.jpeg",
      "https://cdn.example.com/pred-1.jpeg",
    ]);
    for (const post of api.posts()) assert.equal("n" in post.body, false);
  } finally {
    api.restore();
  }
});

test("a rejected submit is reported with the upstream status and is not polled", async () => {
  const cases = [
    { response: () => json({ code: 400, message: "Model not found." }, 400), status: 400 },
    { response: () => json({ code: 401, message: "Invalid API key." }, 401), status: 401 },
    // Some failures arrive as HTTP 200 with a non-200 envelope code.
    { response: () => json({ code: 429, message: "Too many requests." }), status: 429 },
  ];
  for (const { response, status } of cases) {
    const api = mockWavespeed(() => response());
    try {
      const result = await generateImage({ prompt: "a red kite" });
      assert.equal(result.success, false);
      assert.equal(result.status, status);
      assert.equal(api.calls.length, 1, "only the single POST is sent");
    } finally {
      api.restore();
    }
  }
});

test("a failed prediction surfaces data.error without resubmitting", async () => {
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-f", status: "created" });
    return envelope({ id: "pred-f", status: "failed", error: "Content flagged as sensitive." });
  });

  try {
    const result = await generateImage({ prompt: "a red kite" });
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(String(result.error), /Content flagged as sensitive/);
    assert.equal(api.posts().length, 1);
  } finally {
    api.restore();
  }
});

test("a throttled status read keeps polling the same prediction", async () => {
  let polls = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-r", status: "created" });
    polls += 1;
    if (polls === 1) return json({ code: 429, message: "Too many requests." }, 429);
    return envelope({ status: "completed", outputs: ["https://cdn.example.com/r.jpeg"] });
  });

  try {
    const result = await generateImage({ prompt: "a red kite" });
    assert.equal(result.success, true);
    assert.equal(api.posts().length, 1);
    assert.equal(polls, 2);
  } finally {
    api.restore();
  }
});

test("5xx, network errors and retryable envelopes on a status read keep polling", async () => {
  let polls = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-5", status: "created" });
    polls += 1;
    if (polls === 1) return json({ code: 502, message: "Bad gateway" }, 502);
    if (polls === 2) throw new TypeError("fetch failed");
    if (polls === 3) return json({ code: 503, message: "Service busy" });
    if (polls === 4) return new Response("gateway timeout", { status: 504 });
    return envelope({ status: "completed", outputs: ["https://cdn.example.com/5.jpeg"] });
  });

  try {
    const result = await generateImage({ prompt: "a red kite" });
    assert.equal(result.success, true);
    assert.equal(api.posts().length, 1);
    assert.equal(polls, 5);
  } finally {
    api.restore();
  }
});

test("a status read honors Retry-After before polling again", async () => {
  let throttledAt = 0;
  let retriedAt = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-ra", status: "created" });
    if (!throttledAt) {
      throttledAt = Date.now();
      return new Response(JSON.stringify({ code: 429, message: "Too many requests." }), {
        status: 429,
        headers: { "retry-after": "0.2" },
      });
    }
    retriedAt = Date.now();
    return envelope({ status: "completed", outputs: ["https://cdn.example.com/ra.jpeg"] });
  });

  try {
    const result = await generateImage({ prompt: "a red kite" });
    assert.equal(result.success, true);
    assert.ok(retriedAt - throttledAt >= 180, `retried after ${retriedAt - throttledAt}ms`);
  } finally {
    api.restore();
  }
});

test("a status read that keeps failing gives up after bounded retries", async () => {
  let polls = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "pred-x", status: "created" });
    polls += 1;
    return json({ code: 500, message: "Internal error" }, 500);
  });

  try {
    const result = await generateImage({ prompt: "a red kite" });
    assert.equal(result.success, false);
    assert.equal(result.status, 500);
    assert.equal(api.posts().length, 1);
    assert.equal(polls, 6);
  } finally {
    api.restore();
  }
});

test("a stalled status read is cut off at the deadline with 504", async () => {
  const originalFetch = globalThis.fetch;
  let posts = 0;
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    if (init.method === "POST") {
      posts += 1;
      return envelope({ id: "pred-s", status: "created" });
    }
    return new Promise<Response>((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
    });
  }) as typeof fetch;

  try {
    const started = Date.now();
    const result = await generateImage({ prompt: "a red kite", timeout_ms: 1000 });
    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.equal(posts, 1);
    assert.ok(Date.now() - started < 3000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a stalled submit is cut off at the deadline with 504 and sent once", async () => {
  const originalFetch = globalThis.fetch;
  let posts = 0;
  let reads = 0;
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    if (init.method !== "POST") reads += 1;
    else posts += 1;
    return new Promise<Response>((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
    });
  }) as typeof fetch;

  try {
    const started = Date.now();
    const result = await generateImage({ prompt: "a red kite", timeout_ms: 1000 });
    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.equal(posts, 1);
    assert.equal(reads, 0);
    assert.ok(Date.now() - started < 3000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("polling stops at the deadline with 504 and never resubmits", async () => {
  const api = mockWavespeed((call) =>
    call.method === "POST"
      ? envelope({ id: "pred-t", status: "created" })
      : envelope({ id: "pred-t", status: "processing", outputs: [] })
  );

  try {
    const result = await generateImage({ prompt: "a red kite", timeout_ms: 30 });
    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.equal(api.posts().length, 1);
  } finally {
    api.restore();
  }
});

test("image generation without a key fails before any request", async () => {
  const api = mockWavespeed(() => json({}));
  try {
    const result = await handleImageGeneration({
      body: { model: `wavespeed/${IMAGE_MODEL}`, prompt: "a red kite" },
      credentials: {},
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(api.calls.length, 0);
  } finally {
    api.restore();
  }
});

test("video preset submits the model input to the model path and returns the output URL", async () => {
  let polls = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "vid-1", status: "created", outputs: [] });
    polls += 1;
    return polls === 1
      ? envelope({ id: "vid-1", status: "processing", outputs: [] })
      : envelope({ id: "vid-1", status: "completed", outputs: ["https://cdn.example.com/v.mp4"] });
  });

  try {
    const result = await handleVideoJobGeneration({
      model: VIDEO_MODEL,
      presetName: "wavespeed-video-job",
      body: {
        model: `wavespeed/${VIDEO_MODEL}`,
        prompt: "a paper boat",
        duration: 4,
        aspect_ratio: "9:16",
        n: 1,
        response_format: "url",
      },
      credentials: CREDENTIALS,
      pollIntervalMs: 1,
    });

    assert.equal(result.success, true);
    const payload = (result.data as { data: Array<{ url: string; format: string }> }).data;
    assert.deepEqual(payload, [{ url: "https://cdn.example.com/v.mp4", format: "mp4" }]);
    assert.deepEqual(
      api.calls.map((call) => `${call.method} ${call.url}`),
      [
        `POST ${API}/api/v3/${VIDEO_MODEL}`,
        `GET ${API}/api/v3/predictions/vid-1/result`,
        `GET ${API}/api/v3/predictions/vid-1/result`,
      ]
    );
    for (const call of api.calls) assert.equal(call.auth, "Bearer ws-test-key");
    // The body is the model's own input: no model id, no OpenAI-only fields.
    assert.deepEqual(api.calls[0].body, {
      prompt: "a paper boat",
      duration: 4,
      aspect_ratio: "9:16",
    });
  } finally {
    api.restore();
  }
});

test("video preset reports a failed prediction with its reason", async () => {
  const api = mockWavespeed((call) =>
    call.method === "POST"
      ? envelope({ id: "vid-2", status: "created" })
      : envelope({ id: "vid-2", status: "failed", error: "Prompt rejected by the model." })
  );

  try {
    const result = await handleVideoJobGeneration({
      model: VIDEO_MODEL,
      presetName: "wavespeed-video-job",
      body: { prompt: "a paper boat" },
      credentials: CREDENTIALS,
      pollIntervalMs: 1,
    });
    assert.equal(result.success, false);
    assert.equal(result.success === false && result.status, 502);
    assert.match(String(result.success === false && result.error), /Prompt rejected by the model/);
    assert.equal(api.posts().length, 1);
  } finally {
    api.restore();
  }
});

test("video preset treats an HTTP 200 error envelope as a failure and does not poll", async () => {
  const api = mockWavespeed(() => json({ code: 500, message: "Insufficient credits." }));

  try {
    const result = await handleVideoJobGeneration({
      model: VIDEO_MODEL,
      presetName: "wavespeed-video-job",
      body: { prompt: "a paper boat" },
      credentials: CREDENTIALS,
      pollIntervalMs: 1,
    });
    assert.equal(result.success, false);
    assert.match(String(result.success === false && result.error), /Insufficient credits/);
    assert.equal(api.calls.length, 1);
  } finally {
    api.restore();
  }
});

test("video preset retries a 502 status read and keeps the same prediction", async () => {
  let polls = 0;
  const api = mockWavespeed((call) => {
    if (call.method === "POST") return envelope({ id: "vid-3", status: "created" });
    polls += 1;
    if (polls === 1) return json({ code: 502, message: "Bad gateway" }, 502);
    if (polls === 2) return json({ code: 429, message: "Too many requests." });
    return envelope({
      id: "vid-3",
      status: "completed",
      outputs: ["https://cdn.example.com/3.mp4"],
    });
  });

  try {
    const result = await handleVideoJobGeneration({
      model: VIDEO_MODEL,
      presetName: "wavespeed-video-job",
      body: { prompt: "a paper boat" },
      credentials: CREDENTIALS,
      pollIntervalMs: 1,
    });
    assert.equal(result.success, true);
    assert.equal(api.posts().length, 1);
    assert.equal(polls, 3);
  } finally {
    api.restore();
  }
});

test("video preset keeps the envelope status of a rejected submit", async () => {
  const api = mockWavespeed(() => json({ code: 401, message: "Invalid API key." }));

  try {
    const result = await handleVideoJobGeneration({
      model: VIDEO_MODEL,
      presetName: "wavespeed-video-job",
      body: { prompt: "a paper boat" },
      credentials: CREDENTIALS,
      pollIntervalMs: 1,
    });
    assert.equal(result.success === false && result.status, 401);
    assert.equal(api.calls.length, 1);
  } finally {
    api.restore();
  }
});

test("key validation reads the balance endpoint", async () => {
  const api = mockWavespeed((call) =>
    call.auth === "Bearer ws-test-key"
      ? envelope({ balance: 1 })
      : json({ code: 401, message: "Invalid API key." }, 401)
  );

  try {
    const valid = await validateImageProviderApiKey({
      provider: "wavespeed",
      apiKey: "ws-test-key",
    });
    assert.equal(valid.valid, true);
    const invalid = await validateImageProviderApiKey({ provider: "wavespeed", apiKey: "nope" });
    assert.equal(invalid.valid, false);
    assert.equal(invalid.error, "Invalid API key");
    for (const call of api.calls) assert.equal(call.url, `${API}/api/v3/balance`);
  } finally {
    api.restore();
  }
});
