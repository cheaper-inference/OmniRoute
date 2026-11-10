import test from "node:test";
import assert from "node:assert/strict";

// The Hugging Face TTS catalog lists three models (Orpheus, Chatterbox, Kokoro). The hf-inference
// provider serves no text-to-speech model, so POSTing them to
// router.huggingface.co/hf-inference/models/<id> could never work. The Hub maps these models to
// the deepinfra provider (OpenAI-style speech route, model id unchanged). Model ids that are not
// in the catalog keep the hf-inference route.
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");
const { AUDIO_SPEECH_PROVIDERS, parseSpeechModel } =
  await import("../../open-sse/config/audioRegistry.ts");

// Built from parts so no credential-shaped literal sits in the file.
const TOKEN = ["router", "test", "key"].join("-");

const ROUTED_MODELS = [
  "canopylabs/orpheus-3b-0.1-ft",
  "ResembleAI/chatterbox",
  "hexgrad/Kokoro-82M",
];

function stubFetch() {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; headers: Record<string, string>; body: unknown }> = [];
  globalThis.fetch = async (url: unknown, options: RequestInit = {}) => {
    calls.push({
      url: String(url),
      headers: (options.headers || {}) as Record<string, string>,
      body: JSON.parse(String(options.body || "{}")),
    });
    return new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };
  return { calls, restore: () => (globalThis.fetch = originalFetch) };
}

test("the three catalog models stay listed under the huggingface speech provider", () => {
  const ids = AUDIO_SPEECH_PROVIDERS.huggingface.models.map((m) => m.id);
  for (const id of ROUTED_MODELS) assert.ok(ids.includes(id), `${id} must stay in the catalog`);
});

for (const model of ROUTED_MODELS) {
  test(`huggingface/${model} goes to the deepinfra route on the Hugging Face router`, async () => {
    const { calls, restore } = stubFetch();
    try {
      const response = await handleAudioSpeech({
        body: { model: `huggingface/${model}`, input: "hello router" },
        credentials: { apiKey: TOKEN },
      });

      assert.equal(response.status, 200);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, "https://router.huggingface.co/deepinfra/v1/openai/audio/speech");
      assert.equal(calls[0].headers.Authorization, `Bearer ${TOKEN}`);
      assert.deepEqual(calls[0].body, { model, input: "hello router" });
      assert.equal(response.headers.get("content-type"), "audio/mpeg");
    } finally {
      restore();
    }
  });
}

test("a bare catalog model id resolves to the huggingface provider and takes the same route", async () => {
  const parsed = parseSpeechModel("hexgrad/Kokoro-82M");
  assert.equal(parsed.provider, "huggingface");

  const { calls, restore } = stubFetch();
  try {
    await handleAudioSpeech({
      body: { model: "hexgrad/Kokoro-82M", input: "bare id" },
      credentials: { apiKey: TOKEN },
    });
    assert.equal(calls[0].url, "https://router.huggingface.co/deepinfra/v1/openai/audio/speech");
  } finally {
    restore();
  }
});

test("voice and response_format reach the deepinfra route when the caller sets them", async () => {
  const { calls, restore } = stubFetch();
  try {
    await handleAudioSpeech({
      body: {
        model: "huggingface/hexgrad/Kokoro-82M",
        input: "with a voice",
        voice: "af_bella",
        response_format: "wav",
      },
      credentials: { apiKey: TOKEN },
    });
    assert.deepEqual(calls[0].body, {
      model: "hexgrad/Kokoro-82M",
      input: "with a voice",
      voice: "af_bella",
      response_format: "wav",
    });
  } finally {
    restore();
  }
});

test("a custom Hugging Face model id keeps the hf-inference route", async () => {
  const { calls, restore } = stubFetch();
  try {
    await handleAudioSpeech({
      body: { model: "huggingface/facebook/mms-tts-eng", input: "custom id" },
      credentials: { apiKey: TOKEN },
    });
    assert.equal(
      calls[0].url,
      "https://router.huggingface.co/hf-inference/models/facebook/mms-tts-eng"
    );
    assert.deepEqual(calls[0].body, { inputs: "custom id" });
  } finally {
    restore();
  }
});

test("an upstream error from the deepinfra route is returned as an error, not as audio", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "model not ready" } }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  try {
    const response = await handleAudioSpeech({
      body: { model: "huggingface/canopylabs/orpheus-3b-0.1-ft", input: "x" },
      credentials: { apiKey: TOKEN },
    });
    assert.equal(response.status, 503);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
