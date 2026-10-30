import test from "node:test";
import assert from "node:assert/strict";
import {
  getVideoJobPreset,
  handleVideoJobGeneration,
} from "../../open-sse/handlers/videoGeneration/job.ts";
import { createMediaSink, readMediaFile } from "../../src/lib/media/mediaStore.ts";
import { getVideoProvider } from "../../open-sse/config/videoRegistry.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistryData.ts";
import {
  AUDIO_SPEECH_PROVIDERS,
  AUDIO_TRANSCRIPTION_PROVIDERS,
} from "../../open-sse/config/audioRegistry.ts";
import { EMBEDDING_PROVIDERS } from "../../open-sse/config/embeddingRegistry.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";
import { getRegistryMediaKinds } from "../../open-sse/config/mediaServiceKinds.ts";
import { APIKEY_PROVIDERS_SPECIALTY } from "../../src/shared/constants/providers/apikey/specialty-media.ts";
import {
  IMAGE_ONLY_PROVIDER_IDS,
  VIDEO_PROVIDER_IDS,
} from "../../src/shared/constants/providers.ts";

const GATEWAY = "https://oai.deapi.ai/v1";

test("deapi has an API-key catalog entry in the specialty-media family", () => {
  const entry = APIKEY_PROVIDERS_SPECIALTY.deapi;
  assert.ok(entry, "deapi catalog entry should exist");
  assert.equal(entry.id, "deapi");
  assert.equal(entry.alias, "deapi");
  assert.equal(entry.website, "https://deapi.ai");
  // Media kinds come from the registries, not from a hand-kept list.
  assert.deepEqual(entry.serviceKinds, []);
  assert.ok(IMAGE_ONLY_PROVIDER_IDS.has("deapi"));
  assert.ok(VIDEO_PROVIDER_IDS.has("deapi"));
});

test("every deapi media registry entry targets the OpenAI-compatible gateway with bearer auth", () => {
  const entries = {
    image: IMAGE_PROVIDERS.deapi,
    stt: AUDIO_TRANSCRIPTION_PROVIDERS.deapi,
    tts: AUDIO_SPEECH_PROVIDERS.deapi,
    embedding: EMBEDDING_PROVIDERS.deapi,
    video: getVideoProvider("deapi"),
  };
  const paths = {
    image: "/images/generations",
    stt: "/audio/transcriptions",
    tts: "/audio/speech",
    embedding: "/embeddings",
    video: "/videos",
  };
  for (const [kind, entry] of Object.entries(entries)) {
    assert.ok(entry, `deapi ${kind} entry should be registered`);
    assert.equal(entry.id, "deapi");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.baseUrl, `${GATEWAY}${paths[kind as keyof typeof paths]}`);
    assert.ok(entry.models.length >= 1, `deapi ${kind} should list at least one model`);
  }
  assert.deepEqual(getRegistryMediaKinds("deapi").sort(), [
    "embedding",
    "image",
    "stt",
    "tts",
    "video",
  ]);
});

test("deapi registries use native model ids and gateway-specific defaults", () => {
  assert.equal(IMAGE_PROVIDERS.deapi.format, "openai");
  assert.ok(IMAGE_PROVIDERS.deapi.models.some((m) => m.id === "Flux1schnell"));
  // The gateway has no dall-e/tts-1/whisper-1 aliases — they would 404 upstream.
  for (const registry of [IMAGE_PROVIDERS, AUDIO_SPEECH_PROVIDERS, AUDIO_TRANSCRIPTION_PROVIDERS]) {
    for (const model of registry.deapi.models) {
      assert.doesNotMatch(model.id, /^(dall-e|tts-1|whisper-1|gpt-)/);
    }
  }
  // deAPI maps the OpenAI stock voices onto every model, so the handler's "alloy"
  // default must not be overridden by a model-specific voice id.
  assert.equal(AUDIO_SPEECH_PROVIDERS.deapi.defaultVoice, undefined);
  assert.deepEqual(AUDIO_SPEECH_PROVIDERS.deapi.supportedFormats, ["mp3"]);
  assert.equal(EMBEDDING_PROVIDERS.deapi.models[0].dimensions, 1024);
  assert.equal(getVideoProvider("deapi")?.format, "deapi-video-job");
  assert.ok(getVideoJobPreset("deapi-video-job"), "video format must resolve to a job preset");
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("deapi video preset submits, polls and downloads the key-gated /content result", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; method: string; body: string; auth: string | null }> = [];
  const videoBytes = new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112, 109, 112, 52, 50]);
  let polls = 0;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    const method = String(init?.method ?? "GET");
    const headers = new Headers(init?.headers);
    calls.push({ url, method, body: String(init?.body ?? ""), auth: headers.get("authorization") });
    if (method === "POST") {
      return jsonResponse({ id: "vid-1", object: "video", status: "queued", progress: 0 });
    }
    if (url.endsWith("/content")) {
      return new Response(videoBytes, { status: 200, headers: { "content-type": "video/mp4" } });
    }
    polls += 1;
    // The finished object carries no URL at all — only the /content route serves the file.
    return jsonResponse({
      id: "vid-1",
      object: "video",
      status: polls === 1 ? "in_progress" : "completed",
      progress: polls === 1 ? 50 : 100,
    });
  };

  try {
    const result = await handleVideoJobGeneration({
      model: "Ltx2_3_22B_Dist_INT8",
      presetName: "deapi-video-job",
      body: { prompt: "a paper boat", duration: 5, size: "768x768" },
      credentials: { apiKey: "sk-dp-1-test" },
      pollIntervalMs: 1,
      mediaSink: createMediaSink({ origin: "https://gw.example", ownerId: null }),
    });

    assert.equal(result.success, true);
    const payload = (result.data as { data: Array<{ url?: string; format: string }> }).data;
    assert.equal(payload.length, 1);
    assert.equal(payload[0].format, "mp4");
    assert.match(
      payload[0].url!,
      /^https:\/\/gw\.example\/api\/v1\/media\/none__[a-f0-9]{32}\.mp4$/
    );
    assert.equal(readMediaFile(payload[0].url!.split("/").pop()!)?.length, videoBytes.length);

    assert.deepEqual(
      calls.map((c) => `${c.method} ${c.url}`),
      [
        "POST https://oai.deapi.ai/v1/videos",
        "GET https://oai.deapi.ai/v1/videos/vid-1",
        "GET https://oai.deapi.ai/v1/videos/vid-1",
        "GET https://oai.deapi.ai/v1/videos/vid-1/content",
      ]
    );
    // The content route 401s without the key, so every call carries it.
    for (const call of calls) assert.equal(call.auth, "Bearer sk-dp-1-test");

    // `seconds` is a string in the Sora-shaped contract; extras pass through.
    const submitBody = JSON.parse(calls[0].body);
    assert.equal(submitBody.model, "Ltx2_3_22B_Dist_INT8");
    assert.equal(submitBody.seconds, "5");
    assert.equal(submitBody.duration, undefined);
    assert.equal(submitBody.size, "768x768");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("deapi video preset reports a failed job instead of downloading", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input, init) => {
    urls.push(String(input));
    if (String(init?.method ?? "GET") === "POST") {
      return jsonResponse({ id: "vid-2", status: "queued" });
    }
    // A failed job still answers 200; the outcome lives in `status`.
    return jsonResponse({
      id: "vid-2",
      status: "failed",
      error: { code: "job_failed", message: "Job failed during rendering." },
    });
  };

  try {
    const result = await handleVideoJobGeneration({
      model: "Ltxv_13B_0_9_8_Distilled_FP8",
      presetName: "deapi-video-job",
      body: { prompt: "a paper boat" },
      credentials: { apiKey: "sk-dp-1-test" },
      pollIntervalMs: 1,
      mediaSink: createMediaSink({ origin: "https://gw.example", ownerId: null }),
    });

    assert.equal(result.success, false);
    assert.equal(result.success === false && result.status, 502);
    assert.ok(!urls.some((url) => url.endsWith("/content")), "a failed job must not be downloaded");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

async function captureSpeechBody(body: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (input, init) => {
    seen.push({ url: String(input), body: JSON.parse(String(init?.body ?? "{}")) });
    return new Response(new Uint8Array([0xff, 0xfb, 0x90, 0x00]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };
  try {
    const res = await handleAudioSpeech({ body, credentials: { apiKey: "sk-dp-1-test" } });
    assert.equal(res.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(seen.length, 1);
  return seen[0];
}

test("deapi speech forwards instructions for the voice-design model and defaults to alloy", async () => {
  const call = await captureSpeechBody({
    model: "deapi/Qwen3_TTS_12Hz_1_7B_VoiceDesign",
    input: "Hello from OmniRoute.",
    instructions: "a warm female voice with a British accent",
  });
  assert.equal(call.url, `${GATEWAY}/audio/speech`);
  assert.equal(call.body.model, "Qwen3_TTS_12Hz_1_7B_VoiceDesign");
  assert.equal(call.body.voice, "alloy");
  assert.equal(call.body.instructions, "a warm female voice with a British accent");
});

test("the OpenAI-compatible speech path omits instructions when the client sends none", async () => {
  const call = await captureSpeechBody({ model: "deapi/Kokoro", input: "Hello from OmniRoute." });
  assert.equal(call.body.model, "Kokoro");
  assert.equal("instructions" in call.body, false);
});
