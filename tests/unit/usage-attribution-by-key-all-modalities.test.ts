import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-attribution-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "usage-attribution-test-secret";

const { getDbInstance, resetDbInstance } = await import("@/lib/db/core");
const { createApiKey } = await import("@/lib/db/apiKeys");
const { createProviderConnection } = await import("@/lib/db/providers");
const { addCustomModel } = await import("@/lib/db/models");
const { createCombo } = await import("@/lib/db/combos");
const { updatePricing } = await import("@/lib/db/settings");
const { waitForCallLogSaves, closeCallLogSaves } = await import("@/lib/usage/callLogs");
const { getApiKeyUsageLimitStatus } = await import("@/lib/usage/apiKeyUsageLimits");
const music = (await import("@/app/api/v1/music/generations/route")).POST;
const moderation = (await import("@/app/api/v1/moderations/route")).POST;
const webFetch = (await import("@/app/api/v1/web/fetch/route")).POST;
const search = (await import("@/app/api/v1/search/route")).POST;
const rerank = (await import("@/app/api/v1/rerank/route")).POST;
const images = (await import("@/app/api/v1/images/generations/route")).POST;
const videos = (await import("@/app/api/v1/videos/generations/route")).POST;
const classify = (await import("@/app/api/v1/classify/route")).POST;
const segment = (await import("@/app/api/v1/segment/route")).POST;
const map = (await import("@/app/api/v1/web/map/route")).POST;
const nativeMusic = (await import("@/app/api/v1/music/route")).POST;
const sound = (await import("@/app/api/v1/sound-generation/route")).POST;

const audio = () => new Response("audio", { headers: { "Content-Type": "audio/mpeg" } });
const searchResult = () =>
  Response.json({
    results: [{ title: "Cube", url: "https://example.com", content: "A cube" }],
  });
const rerankResult = () =>
  Response.json({
    results: [{ index: 0, relevance_score: 0.8 }],
    meta: { billed_units: { search_units: 1 } },
  });
const videoResult = () => Response.json({ video_url: "https://example.com/video.mp4" });

test.before(async () => {
  await addCustomModel(
    "custom-video-attribution",
    "test-video",
    "Test video",
    "manual",
    "chat-completions",
    ["videos"]
  );
  for (const provider of [
    "openai",
    "elevenlabs",
    "firecrawl",
    "jina-reader",
    "jina-ai",
    "tavily-search",
    "cohere",
    "deepinfra",
    "custom-video-attribution",
  ]) {
    await createProviderConnection({
      provider,
      authType: "apikey",
      name: provider,
      apiKey: "provider-test-key",
      testStatus: "active",
      ...(provider === "custom-video-attribution" && {
        providerSpecificData: { baseUrl: "https://example.com/v1/videos/generations" },
      }),
    });
  }
  await createCombo({
    name: "video-attribution-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["deepinfra/Wan-AI/Wan2.2-T2V-A14B"],
  });
  await updatePricing({
    cohere: { "rerank-v3.5": { search_unit_cost: 0.03 } },
    elevenlabs: { music_v1: { input_cost_per_second: 0.02 } },
  });
});

test.after(async () => {
  await closeCallLogSaves();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function request(endpoint: string, body: object, key: string) {
  return new Request(`http://localhost/api${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
}

function rowsForKey(keyId: string) {
  return getDbInstance()
    .prepare<{ api_key_name: string; provider: string; cost_usd: number | null }>(
      "SELECT api_key_name, provider, COALESCE(provider_cost_usd, calculated_cost_usd) AS cost_usd FROM usage_history WHERE api_key_id = ? AND success = 1 ORDER BY id"
    )
    .all(keyId);
}

async function assertAttributed(
  key: { id: string; name: string },
  endpoint: string,
  provider: string,
  cost: number | null
) {
  assert.equal(await waitForCallLogSaves(5_000), true);
  const logs = getDbInstance()
    .prepare<{ api_key_name: string; provider: string }>(
      "SELECT api_key_name, provider FROM call_logs WHERE api_key_id = ? AND path IN (?, ?) AND status BETWEEN 200 AND 299"
    )
    .all(key.id, endpoint, "/api" + endpoint);
  assert.deepEqual(
    { usage: rowsForKey(key.id), logs },
    {
      usage: [{ api_key_name: key.name, provider, cost_usd: cost }],
      logs: [{ api_key_name: key.name, provider }],
    }
  );
}

const scenarios = [
  {
    endpoint: "/v1/music/generations",
    post: music,
    provider: "elevenlabs",
    cost: 0.2,
    body: { model: "elevenlabs/music_v1", prompt: "Quiet piano", duration: 10 },
    upstream: audio,
  },
  {
    endpoint: "/v1/moderations",
    post: moderation,
    provider: "openai",
    cost: null,
    body: { model: "openai/omni-moderation-latest", input: "A cube" },
    upstream: () => Response.json({ results: [{ flagged: false }] }),
  },
  {
    endpoint: "/v1/web/fetch",
    post: webFetch,
    provider: "firecrawl",
    cost: null,
    body: { provider: "firecrawl", url: "https://example.com/page" },
    upstream: () => Response.json({ data: { markdown: "A cube" } }),
  },
  {
    endpoint: "/v1/rerank",
    post: rerank,
    provider: "cohere",
    cost: 0.03,
    body: { model: "cohere/rerank-v3.5", query: "cube", documents: ["A cube"] },
    upstream: rerankResult,
  },
  {
    endpoint: "/v1/images/generations",
    post: images,
    provider: "openai",
    cost: null,
    body: { model: "openai/gpt-image-2", prompt: "A cube" },
    upstream: () => Response.json({ data: [{ b64_json: "aW1hZ2U=" }] }),
  },
  {
    endpoint: "/v1/videos/generations",
    post: videos,
    provider: "deepinfra",
    cost: null,
    body: { model: "deepinfra/Wan-AI/Wan2.2-T2V-A14B", prompt: "A rotating cube" },
    upstream: videoResult,
  },
  {
    endpoint: "/v1/videos/generations",
    post: videos,
    provider: "deepinfra",
    cost: null,
    body: { model: "video-attribution-combo", prompt: "A rotating cube" },
    upstream: videoResult,
  },
  {
    endpoint: "/v1/videos/generations",
    post: videos,
    provider: "custom-video-attribution",
    cost: null,
    body: { model: "custom-video-attribution/test-video", prompt: "A rotating cube" },
    upstream: () => Response.json({ data: [{ url: "https://example.com/video.mp4" }] }),
  },
  {
    endpoint: "/v1/classify",
    post: classify,
    provider: "jina-ai",
    cost: null,
    body: { input: ["A cube"], labels: ["shape", "color"] },
    upstream: () => Response.json({ data: [] }),
  },
  {
    endpoint: "/v1/segment",
    post: segment,
    provider: "jina-ai",
    cost: null,
    body: { content: "A cube" },
    upstream: () => Response.json({ chunks: ["A cube"] }),
  },
  {
    endpoint: "/v1/web/map",
    post: map,
    provider: "firecrawl",
    cost: null,
    body: { url: "https://example.com" },
    upstream: () => Response.json({ success: true, links: ["https://example.com/page"] }),
  },
  {
    endpoint: "/v1/music",
    post: nativeMusic,
    provider: "elevenlabs",
    cost: null,
    body: { prompt: "Quiet piano" },
    upstream: audio,
  },
  {
    endpoint: "/v1/sound-generation",
    post: sound,
    provider: "elevenlabs",
    cost: null,
    body: { text: "Quiet piano" },
    upstream: audio,
  },
];

for (const { endpoint, post, provider, body, cost, upstream } of scenarios) {
  test(`${endpoint} attributes one completed request to the resolved key (${"model" in body ? body.model : provider})`, async (t) => {
    const key = await createApiKey("Inference accounting key", "test");
    const upstreamMock = t.mock.method(globalThis, "fetch", upstream);
    const response = await post(request(endpoint, body, key.key));
    assert.equal(response.status, 200, await response.clone().text());
    await response.arrayBuffer();
    assert.equal(upstreamMock.mock.callCount(), 1);
    await assertAttributed(
      { id: key.id, name: "Inference accounting key" },
      endpoint,
      provider,
      cost
    );
    if (endpoint === "/v1/music/generations" || endpoint === "/v1/rerank") {
      assert.equal((await getApiKeyUsageLimitStatus({ id: key.id })).dailySpentUsd, cost);
      assert.deepEqual(
        getDbInstance()
          .prepare("SELECT amount_usd FROM request_cost_ledger WHERE api_key_id = ?")
          .all(key.id),
        [{ amount_usd: cost }]
      );
    }
  });
}

test("search attributes the upstream call and the cache hit to their own keys", async (t) => {
  const endpoint = "/v1/search";
  const provider = "tavily-search";
  const first = await createApiKey("Search first key", "test");
  const cached = await createApiKey("Search cached key", "test");
  const payload = { provider, query: "Unique attribution test cube" };
  const upstream = t.mock.method(globalThis, "fetch", searchResult);
  for (const key of [first, cached]) {
    const response = await search(request(endpoint, payload, key.key));
    assert.equal(response.status, 200, await response.clone().text());
    await response.arrayBuffer();
  }
  assert.equal(upstream.mock.callCount(), 1);
  await assertAttributed({ id: first.id, name: "Search first key" }, endpoint, provider, 0.008);
  await assertAttributed({ id: cached.id, name: "Search cached key" }, endpoint, provider, 0);
  assert.equal((await getApiKeyUsageLimitStatus({ id: first.id })).dailySpentUsd, 0.008);
  assert.equal((await getApiKeyUsageLimitStatus({ id: cached.id })).dailySpentUsd, 0);

  const { GET } = await import("@/app/api/usage/analytics/route");
  const response = await GET(
    new Request("http://localhost/api/usage/analytics?range=all&view=apiKeys")
  );
  assert.equal(response.status, 200, await response.clone().text());
  const { byApiKey } = (await response.json()) as {
    byApiKey: Array<{ apiKeyId: string; requests: number; cost: number }>;
  };
  for (const [id, cost] of [
    [first.id, 0.008],
    [cached.id, 0],
  ] as const) {
    const row = byApiKey.find((entry) => entry.apiKeyId === id);
    assert.equal(row?.requests, 1);
    assert.equal(row?.cost, cost);
  }
});

test("web fetch records one request for the successful fallback provider", async (t) => {
  const endpoint = "/v1/web/fetch";
  const key = await createApiKey("Web fallback key", "test");
  const upstream = t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    const url = new URL(String(input));
    if (url.hostname === "api.firecrawl.dev") return new Response("Limited", { status: 429 });
    assert.equal(url.hostname, "r.jina.ai");
    return Response.json({ data: { content: "Fallback text" } });
  });
  const response = await webFetch(
    request(endpoint, { url: "https://example.com/fallback" }, key.key)
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(upstream.mock.callCount(), 2);
  await assertAttributed({ id: key.id, name: "Web fallback key" }, endpoint, "jina-reader", null);
});

test("audio translation is recorded even without a measured duration", async (t) => {
  const key = await createApiKey("Audio translation key", "test");
  const { POST } = await import("@/app/api/v1/audio/translations/route");
  const endpoint = "/v1/audio/translations";
  const form = new FormData();
  form.set("model", "openai/whisper-1");
  form.set("file", new File(["audio"], "test.wav", { type: "audio/wav" }));
  t.mock.method(globalThis, "fetch", () => Response.json({ text: "Translated" }));
  const response = await POST(
    new Request("http://localhost/api" + endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${key.key}` },
      body: form,
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  await assertAttributed({ id: key.id, name: "Audio translation key" }, endpoint, "openai", null);
});

test("native speech generation and transcription attribute their requests", async (t) => {
  const [{ POST: speak }, { POST: transcribe }] = await Promise.all([
    import("@/app/api/v1/text-to-speech/[voiceId]/route"),
    import("@/app/api/v1/speech-to-text/route"),
  ]);
  t.mock.method(globalThis, "fetch", (input: RequestInfo | URL) =>
    String(input).includes("/speech-to-text") ? Response.json({ text: "Transcript" }) : audio()
  );
  const speechKey = await createApiKey("Native speech key", "test");
  const transcriptionKey = await createApiKey("Native transcription key", "test");
  const voice = "/v1/text-to-speech/test-voice";
  const stt = "/v1/speech-to-text";
  const spoken = await speak(request(voice, { text: "A cube" }, speechKey.key), {
    params: Promise.resolve({ voiceId: "test-voice" }),
  });
  const transcribed = await transcribe(request(stt, {}, transcriptionKey.key));
  assert.equal(spoken.status, 200, await spoken.clone().text());
  assert.equal(transcribed.status, 200, await transcribed.clone().text());
  await assertAttributed(
    { id: speechKey.id, name: "Native speech key" },
    voice,
    "elevenlabs",
    null
  );
  await assertAttributed(
    { id: transcriptionKey.id, name: "Native transcription key" },
    stt,
    "elevenlabs",
    null
  );
});

test("image upscale records the tariff once and attributes the provider log", async (t) => {
  const key = await createApiKey("Image upscale key", "test");
  const { POST } = await import("@/app/api/v1/images/upscale/route");
  const endpoint = "/v1/images/upscale";
  const png =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==";
  await createProviderConnection({
    provider: "stability-ai",
    authType: "apikey",
    apiKey: "test-upscale-key",
  });
  await updatePricing({ "stability-ai": { fast: { output_cost_per_image: 0.05 } } });
  t.mock.method(globalThis, "fetch", () => Response.json({ image: png, finish_reason: "SUCCESS" }));
  const response = await POST(
    request(
      endpoint,
      {
        model: "stability-ai/fast",
        image: `data:image/png;base64,${png}`,
        response_format: "b64_json",
      },
      key.key
    )
  );
  assert.equal(response.status, 200, await response.clone().text());
  await assertAttributed({ id: key.id, name: "Image upscale key" }, endpoint, "stability-ai", 0.05);
  assert.equal((await getApiKeyUsageLimitStatus({ id: key.id })).dailySpentUsd, 0.05);
});

test("alpha search attributes each successful query in a batch", async (t) => {
  const key = await createApiKey("Alpha search key", "test");
  const { POST } = await import("@/app/api/v1/alpha/search/route");
  const endpoint = "/v1/alpha/search";
  const upstream = t.mock.method(
    globalThis,
    "fetch",
    () => new Response("<html></html>", { headers: { "Content-Type": "text/html" } })
  );
  const response = await POST(
    request(endpoint, { commands: { search_query: [{ q: "cube" }, { q: "sphere" }] } }, key.key)
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(upstream.mock.callCount(), 2);
  assert.deepEqual(
    rowsForKey(key.id),
    Array.from({ length: 2 }, () => ({
      api_key_name: "Alpha search key",
      provider: "duckduckgo-free",
      cost_usd: 0,
    }))
  );
  assert.equal(await waitForCallLogSaves(5_000), true);
  assert.deepEqual(
    getDbInstance()
      .prepare("SELECT api_key_name FROM call_logs WHERE api_key_id = ? AND path = '/v1/search'")
      .all(key.id),
    [{ api_key_name: "Alpha search key" }, { api_key_name: "Alpha search key" }]
  );
});

test("decision providers retain API-key attribution for their existing call logs", async (t) => {
  const { createDecisionsRouteHandlers } = await import("@/app/api/v1/_shared/decisionsRoute");
  const { POST: systemOne } = await import("@/app/api/v1/systemone/route");
  await createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "test-decision-key",
  });
  const key = await createApiKey("Decisions key", "test");
  const systemOneKey = await createApiKey("System One key", "test");
  const decisions = createDecisionsRouteHandlers({
    transport: async () =>
      Response.json({
        model: "gpt-6-luna",
        answers: [{ type: "predicate", name: "risk", probability: 0.8 }],
        usage: { input_tokens: 9, output_tokens: 1 },
      }),
  });
  t.mock.method(globalThis, "fetch", () =>
    Response.json({
      model: "jev-latest",
      answers: { risk: { type: "choice", choice: "low" } },
      usage: { input_tokens: 10, output_tokens: 2, cost: 0.00001 },
    })
  );
  const decision = await decisions.POST(
    request(
      "/v1/decisions",
      {
        model: "openai/gpt-6-luna",
        input: "A cube",
        questions: [{ type: "predicate", name: "risk", instructions: "Does it have corners?" }],
      },
      key.key
    )
  );
  const system = await systemOne(
    request(
      "/v1/systemone",
      {
        model: "typesafe/jev-latest",
        state: "A cube",
        questions: { risk: { type: "choice", choices: ["low", "high"] } },
      },
      systemOneKey.key
    )
  );
  assert.equal(decision.status, 200, await decision.clone().text());
  assert.equal(system.status, 200, await system.clone().text());
  await assertAttributed({ id: key.id, name: "Decisions key" }, "/v1/decisions", "openai", null);
  await assertAttributed(
    { id: systemOneKey.id, name: "System One key" },
    "/v1/systemone",
    "typesafe",
    0.00001
  );
});

test("native Fal queue submissions preserve key attribution without counting idempotent retries", async (t) => {
  process.env.FAL_NATIVE_ENABLED = "true";
  t.after(() => {
    delete process.env.FAL_NATIVE_ENABLED;
  });
  const { POST } = await import("@/app/api/v1/fal/run/route");
  await createProviderConnection({
    provider: "fal-ai",
    authType: "apikey",
    apiKey: "test-native-fal-key",
  });
  const key = await createApiKey("Native Fal key", "test");
  const endpoint = "/v1/fal/run";
  const upstreamEndpoint = "fal-ai/hunyuan3d-v21";
  const definition = JSON.parse(
    fs.readFileSync(new URL("../fixtures/fal/fal-ai_hunyuan3d-v21.json", import.meta.url), "utf8")
  );
  const upstream = t.mock.method(globalThis, "fetch", (input: RequestInfo | URL) => {
    const url = new URL(String(input));
    if (url.hostname === "api.fal.ai")
      return Response.json({ models: [definition], has_more: false });
    assert.equal(url.hostname, "queue.fal.run");
    return Response.json({
      request_id: "upstream-id",
      status_url: `https://queue.fal.run/${upstreamEndpoint}/requests/upstream-id/status`,
      response_url: `https://queue.fal.run/${upstreamEndpoint}/requests/upstream-id`,
    });
  });
  for (let i = 0; i < 2; i++) {
    const req = request(
      endpoint,
      {
        endpoint_id: upstreamEndpoint,
        input: { input_image_url: "https://example.com/image.png" },
        transport: "queue",
      },
      key.key
    );
    req.headers.set("Idempotency-Key", "same-input");
    const response = await POST(req);
    assert.equal(response.status, 202, await response.clone().text());
  }
  assert.equal(
    upstream.mock.calls.filter(({ arguments: [input] }) => String(input).includes("queue.fal.run"))
      .length,
    1
  );
  await assertAttributed({ id: key.id, name: "Native Fal key" }, endpoint, "fal-ai", null);
});
