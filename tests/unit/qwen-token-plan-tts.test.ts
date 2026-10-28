// Qwen Cloud Token Plan text-to-speech (qwen-audio-3.0-tts-plus) over the DashScope
// SpeechSynthesizer service: the upstream answers JSON with either inline base64 audio or
// an expiring result URL, and reports failures as a `{ code, message }` body.
import test, { afterEach } from "node:test";
import assert from "node:assert/strict";

import { setPinnedFetchTestOverride } from "../../src/shared/network/remoteImageFetch.ts";

const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");
const { getSpeechProvider, parseSpeechModel } =
  await import("../../open-sse/config/audioRegistry.ts");

const SG_URL =
  "https://token-plan.ap-southeast-1.maas.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer";
const BJ_URL =
  "https://token-plan.cn-beijing.maas.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer";
// Public IP literal: the SSRF guard validates it without a real DNS lookup.
const RESULT_URL = "http://8.8.8.8/tts/speech.mp3";

type Captured = { url: string; init: RequestInit };

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  setPinnedFetchTestOverride(undefined);
});

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function installFetch(responses: Array<() => Response>): Captured[] {
  const calls: Captured[] = [];
  const mock = (async (url: string | URL | Request, init: RequestInit = {}) => {
    calls.push({ url: String(url), init });
    const next = responses.shift();
    if (!next) throw new Error(`unexpected fetch: ${String(url)}`);
    return next();
  }) as typeof fetch;
  globalThis.fetch = mock;
  setPinnedFetchTestOverride(mock);
  return calls;
}

test("registry exposes qwen-audio-3.0-tts-plus under qwen-cloud-token-plan and its qct alias", () => {
  const provider = getSpeechProvider("qwen-cloud-token-plan");
  assert.ok(provider, "qwen-cloud-token-plan speech provider must exist");
  assert.equal(provider.format, "dashscope-tts");
  assert.equal(provider.baseUrl, SG_URL);
  assert.deepEqual(
    provider.models.map((m: { id: string }) => m.id),
    ["qwen-audio-3.0-tts-plus"]
  );
  assert.deepEqual(parseSpeechModel("qct/qwen-audio-3.0-tts-plus"), {
    provider: "qwen-cloud-token-plan",
    model: "qwen-audio-3.0-tts-plus",
  });
});

test("inline base64 audio is returned without a second fetch", async () => {
  const calls = installFetch([() => jsonResponse({ output: { audio: { data: "3q2+7w==" } } })]);

  const res = await handleAudioSpeech({
    body: { model: "qct/qwen-audio-3.0-tts-plus", input: "Router check.", voice: "longanlufeng" },
    credentials: { apiKey: "sk-tp" },
  });

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "audio/mpeg");
  assert.deepEqual(Array.from(new Uint8Array(await res.arrayBuffer())), [0xde, 0xad, 0xbe, 0xef]);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, SG_URL);
  assert.equal((calls[0].init.headers as Record<string, string>).Authorization, "Bearer sk-tp");
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
    model: "qwen-audio-3.0-tts-plus",
    input: { text: "Router check.", voice: "longanlufeng" },
    parameters: { format: "mp3", sample_rate: 24000 },
  });
});

test("expiring result URL is downloaded and the default voice is longanlingxin", async () => {
  const calls = installFetch([
    () => jsonResponse({ output: { audio: { data: "", url: RESULT_URL } } }),
    () =>
      new Response(new Uint8Array([1, 2, 3, 4, 5]), {
        status: 200,
        headers: { "content-type": "audio/mpeg" },
      }),
  ]);

  const res = await handleAudioSpeech({
    body: { model: "qwen-cloud-token-plan/qwen-audio-3.0-tts-plus", input: "Hello" },
    credentials: { apiKey: "sk-tp" },
  });

  assert.equal(res.status, 200);
  assert.deepEqual(Array.from(new Uint8Array(await res.arrayBuffer())), [1, 2, 3, 4, 5]);
  assert.equal(calls.length, 2);
  assert.equal(JSON.parse(String(calls[0].init.body)).input.voice, "longanlingxin");
  assert.equal(calls[1].url, RESULT_URL);
});

test("a result URL pointing at a private host is refused, never fetched", async () => {
  const calls = installFetch([
    () => jsonResponse({ output: { audio: { url: "http://127.0.0.1:8080/secret.mp3" } } }),
  ]);

  const res = await handleAudioSpeech({
    body: { model: "qct/qwen-audio-3.0-tts-plus", input: "Hello" },
    credentials: { apiKey: "sk-tp" },
  });

  assert.equal(res.status, 502);
  assert.equal(calls.length, 1, "the private result URL must not be requested");
});

test("a DashScope { code, message } body surfaces as a sanitized error", async () => {
  installFetch([
    () =>
      jsonResponse({
        code: "InvalidApiKey",
        message: "Invalid API-key provided. at /srv/app/node_modules/x.js:1:2",
      }),
  ]);

  const res = await handleAudioSpeech({
    body: { model: "qct/qwen-audio-3.0-tts-plus", input: "Hello" },
    credentials: { apiKey: "bad" },
  });

  assert.equal(res.status, 502);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /Invalid API-key provided/);
  assert.ok(!body.error.message.includes("at /"), "stack-like fragments must be stripped");
});

test("upstream HTTP errors keep their status", async () => {
  installFetch([() => jsonResponse({ code: "Throttling", message: "Requests throttled" }, 429)]);

  const res = await handleAudioSpeech({
    body: { model: "qct/qwen-audio-3.0-tts-plus", input: "Hello" },
    credentials: { apiKey: "sk-tp" },
  });

  assert.equal(res.status, 429);
});

test("a response with neither inline audio nor a URL is an error, not empty audio", async () => {
  installFetch([() => jsonResponse({ output: { audio: { data: "" } } })]);

  const res = await handleAudioSpeech({
    body: { model: "qct/qwen-audio-3.0-tts-plus", input: "Hello" },
    credentials: { apiKey: "sk-tp" },
  });

  assert.equal(res.status, 502);
});

test("Beijing-region connections hit the cn-beijing Token Plan host", async () => {
  const calls = installFetch([() => jsonResponse({ output: { audio: { data: "AAAA" } } })]);

  const res = await handleAudioSpeech({
    body: { model: "qct/qwen-audio-3.0-tts-plus", input: "Hello" },
    credentials: { apiKey: "sk-tp", providerSpecificData: { region: "china-beijing" } },
  });

  assert.equal(res.status, 200);
  assert.equal(calls[0].url, BJ_URL);
});
