// Vercel AI Gateway speech: the gateway's own protocol (POST /v4/ai/speech-model,
// model in the `ai-model-id` header, base64 JSON reply), reusing the provider's
// API key connections.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");
const { parseSpeechModel, getSpeechProvider } =
  await import("../../open-sse/config/audioRegistry.ts");
const { getRegistryMediaKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");

const AUDIO_BYTES = [0x49, 0x44, 0x33, 0x04, 0x00, 0x00];
const AUDIO_BASE64 = btoa(String.fromCharCode(...AUDIO_BYTES));

type ErrorBody = { error: { message: string } };
type Captured = { url: string; headers: Record<string, string>; body: Record<string, unknown> };

async function withFetch(
  reply: () => Response,
  run: (calls: Captured[]) => Promise<void>
): Promise<void> {
  const originalFetch = globalThis.fetch;
  const calls: Captured[] = [];
  globalThis.fetch = (async (url: unknown, options: RequestInit = {}) => {
    calls.push({
      url: String(url),
      headers: options.headers as Record<string, string>,
      body: JSON.parse(String(options.body || "{}")),
    });
    return reply();
  }) as typeof fetch;
  try {
    await run(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const audioReply = () =>
  new Response(JSON.stringify({ audio: AUDIO_BASE64, warnings: [] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

test("speech model ids resolve to vercel-ai-gateway by id, alias and bare catalog id", () => {
  assert.deepEqual(parseSpeechModel("vercel-ai-gateway/spacexai/grok-tts"), {
    provider: "vercel-ai-gateway",
    model: "spacexai/grok-tts",
  });
  assert.deepEqual(parseSpeechModel("vag/spacexai/grok-tts"), {
    provider: "vercel-ai-gateway",
    model: "spacexai/grok-tts",
  });
  // No native "spacexai" provider exists, so the bare catalog id finds the gateway.
  assert.deepEqual(parseSpeechModel("spacexai/grok-tts"), {
    provider: "vercel-ai-gateway",
    model: "spacexai/grok-tts",
  });
  // A native provider's own prefix still wins over the gateway listing.
  assert.equal(parseSpeechModel("openai/tts-1").provider, "openai");
  assert.ok(getRegistryMediaKinds("vercel-ai-gateway").includes("tts"));
});

test("handleAudioSpeech sends the gateway speech protocol and decodes the base64 audio", async () => {
  await withFetch(audioReply, async (calls) => {
    const response = await handleAudioSpeech({
      body: { model: "vercel-ai-gateway/spacexai/grok-tts", input: "Hello there", voice: "Rex" },
      credentials: { apiKey: "vck-test" },
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/mpeg");
    assert.deepEqual(Array.from(new Uint8Array(await response.arrayBuffer())), AUDIO_BYTES);

    assert.equal(calls.length, 1);
    const [call] = calls;
    assert.equal(call.url, "https://ai-gateway.vercel.sh/v4/ai/speech-model");
    assert.equal(call.headers.Authorization, "Bearer vck-test");
    assert.equal(call.headers["ai-gateway-protocol-version"], "0.0.1");
    assert.equal(call.headers["ai-gateway-auth-method"], "api-key");
    assert.equal(call.headers["ai-speech-model-specification-version"], "4");
    assert.equal(call.headers["ai-model-id"], "spacexai/grok-tts");
    // Unset options are omitted so the gateway applies the model's own defaults.
    assert.deepEqual(call.body, { text: "Hello there", outputFormat: "mp3", voice: "Rex" });
  });
});

test("handleAudioSpeech maps format, speed, instructions and language for the gateway", async () => {
  await withFetch(audioReply, async (calls) => {
    const response = await handleAudioSpeech({
      body: {
        model: "vag/openai/tts-1",
        input: "Привет",
        response_format: "ogg",
        speed: 1.25,
        instructions: "calm",
        language: "ru",
      },
      credentials: { apiKey: "vck-test" },
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/opus");
    assert.equal(calls[0].headers["ai-model-id"], "openai/tts-1");
    assert.deepEqual(calls[0].body, {
      text: "Привет",
      outputFormat: "opus",
      instructions: "calm",
      speed: 1.25,
      language: "ru",
    });
  });
});

test("handleAudioSpeech rejects an unsupported format or a model without creator before any request", async () => {
  await withFetch(audioReply, async (calls) => {
    const badFormat = await handleAudioSpeech({
      body: { model: "vercel-ai-gateway/spacexai/grok-tts", input: "hi", response_format: "m4a" },
      credentials: { apiKey: "vck-test" },
    });
    assert.equal(badFormat.status, 400);
    assert.match(((await badFormat.json()) as ErrorBody).error.message, /response_format/);

    // Inherited object keys are not formats either.
    for (const format of ["constructor", "__proto__", "toString"]) {
      const inherited = await handleAudioSpeech({
        body: {
          model: "vercel-ai-gateway/spacexai/grok-tts",
          input: "hi",
          response_format: format,
        },
        credentials: { apiKey: "vck-test" },
      });
      assert.equal(inherited.status, 400, `format ${format}`);
    }

    const badModel = await handleAudioSpeech({
      body: { model: "vercel-ai-gateway/grok-tts", input: "hi" },
      credentials: { apiKey: "vck-test" },
    });
    assert.equal(badModel.status, 400);
    assert.equal(calls.length, 0);
  });
});

test("handleAudioSpeech keeps the gateway's error status so the connection can fail over", async () => {
  await withFetch(
    () =>
      new Response(
        JSON.stringify({ error: { message: "Rate limit exceeded", type: "rate_limit_exceeded" } }),
        { status: 429, headers: { "content-type": "application/json" } }
      ),
    async () => {
      const response = await handleAudioSpeech({
        body: { model: "vercel-ai-gateway/spacexai/grok-tts", input: "hi" },
        credentials: { apiKey: "vck-test" },
      });
      assert.equal(response.status, 429);
      assert.match(((await response.json()) as ErrorBody).error.message, /Rate limit exceeded/);
    }
  );
});

test("handleAudioSpeech returns 502 when the gateway replies without valid audio", async () => {
  for (const payload of [
    "{}",
    JSON.stringify({ audio: "" }),
    JSON.stringify({ audio: "%%%" }),
    "not json",
  ]) {
    await withFetch(
      () => new Response(payload, { status: 200, headers: { "content-type": "application/json" } }),
      async () => {
        const response = await handleAudioSpeech({
          body: { model: "vercel-ai-gateway/spacexai/grok-tts", input: "hi" },
          credentials: { apiKey: "vck-test" },
        });
        assert.equal(response.status, 502, `payload ${payload}`);
      }
    );
  }
});

test("handleAudioSpeech needs a credential for the gateway", async () => {
  const response = await handleAudioSpeech({
    body: { model: "vercel-ai-gateway/spacexai/grok-tts", input: "hi" },
    credentials: null,
  });
  assert.equal(response.status, 401);
  assert.equal(getSpeechProvider("vercel-ai-gateway")?.format, "vercel-ai-gateway-speech");
});

test("handleAudioSpeech answers a gateway transport failure with 502 instead of throwing", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new TypeError("fetch failed");
  }) as typeof fetch;
  try {
    const response = await handleAudioSpeech({
      body: { model: "vercel-ai-gateway/spacexai/grok-tts", input: "hi" },
      credentials: { apiKey: "vck-test" },
    });
    assert.equal(response.status, 502);
    assert.match(((await response.json()) as ErrorBody).error.message, /Vercel AI Gateway/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
