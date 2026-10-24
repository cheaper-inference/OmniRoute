import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

const { AUDIO_SPEECH_PROVIDERS, parseSpeechModel } =
  await import("../../open-sse/config/audioRegistry.ts");
const { geminiGenerateSpeech } = await import("../../open-sse/executors/geminiTts.ts");
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");
const { normalizeAudioOutput } = await import("../../open-sse/executors/vertexMedia.ts");

test("Google Gemini TTS models parse publicly and remap to Gemini credentials", () => {
  assert.deepEqual(parseSpeechModel("google/gemini-3.8-flash-tts"), {
    provider: "google",
    model: "gemini-3.8-flash-tts",
  });
  assert.equal(AUDIO_SPEECH_PROVIDERS.google.credentialProviderId, "gemini");
  assert.deepEqual(
    AUDIO_SPEECH_PROVIDERS.google.models.map(({ id }) => id),
    [
      "gemini-3.8-flash-tts",
      "gemini-3.8-flash-lite-tts",
      "gemini-3.1-flash-tts-preview",
      "gemini-2.5-flash-preview-tts",
      "gemini-2.5-pro-preview-tts",
    ]
  );
  assert.deepEqual(
    AUDIO_SPEECH_PROVIDERS.vertex.models.map(({ id }) => id),
    [
      "gemini-3.8-flash-tts",
      "gemini-3.8-flash-lite-tts",
      "gemini-3.1-flash-tts-preview",
      "gemini-2.5-flash-preview-tts",
      "gemini-2.5-pro-preview-tts",
    ]
  );
});

test("geminiGenerateSpeech sends speech_metadata.style and wraps PCM if needed", async () => {
  const originalFetch = globalThis.fetch;
  const pcm = Buffer.from([1, 2, 3, 4]);
  let captured: { url: string; init: RequestInit } | undefined;
  globalThis.fetch = async (input, init = {}) => {
    captured = { url: String(input), init };
    return Response.json({
      candidates: [
        {
          content: {
            parts: [
              {
                inlineData: {
                  data: pcm.toString("base64"),
                  mimeType: "audio/L16;codec=pcm;rate=16000",
                },
              },
            ],
          },
        },
      ],
    });
  };
  try {
    const { audio, contentType } = await geminiGenerateSpeech(
      { apiKey: "gemini-key" },
      {
        model: "gemini-3.8-flash-tts",
        text: "Hello",
        voice: "Puck",
        instructions: "Whispering with suspense",
        speed: 1.25,
      }
    );
    assert.equal(
      captured?.url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent"
    );
    assert.equal(
      (captured?.init.headers as Record<string, string>)["Content-Type"],
      "application/json"
    );
    assert.equal(
      (captured?.init.headers as Record<string, string>)["x-goog-api-key"],
      "gemini-key"
    );
    assert.deepEqual(JSON.parse(String(captured?.init.body)), {
      contents: [
        {
          parts: [
            {
              text: "Hello",
              speech_metadata: {
                style: "Whispering with suspense. Pace: 1.25x normal speed",
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
        },
      },
    });
    assert.equal(contentType, "audio/wav");
    assert.equal(audio.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(audio.readUInt32LE(24), 16000);
    assert.deepEqual(audio.subarray(44), pcm);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("normalizeAudioOutput preserves existing WAV and prevents double RIFF header", () => {
  const fakePcm = Buffer.alloc(100, 1);
  const dataHeader = Buffer.concat([Buffer.from("data"), Buffer.from([100, 0, 0, 0]), fakePcm]);
  const fmtHeader = Buffer.concat([
    Buffer.from("fmt "),
    Buffer.from([16, 0, 0, 0]),
    Buffer.alloc(16),
  ]);
  const c2paTrailer = Buffer.concat([Buffer.from("C2PA"), Buffer.alloc(50, 0xff)]);
  const riffContent = Buffer.concat([Buffer.from("WAVE"), fmtHeader, dataHeader, c2paTrailer]);
  const wavHeader = Buffer.concat([
    Buffer.from("RIFF"),
    Buffer.from([riffContent.length, 0, 0, 0]),
    riffContent,
  ]);

  const { audio, contentType } = normalizeAudioOutput(wavHeader, "audio/wav");
  assert.equal(contentType, "audio/wav");
  assert.equal(audio.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(audio.indexOf(Buffer.from("RIFF"), 4), -1);
  assert.equal(audio.indexOf(Buffer.from("C2PA")), -1);
});

test("normalizeAudioOutput supports response_format pcm", () => {
  const pcm = Buffer.from([1, 2, 3, 4, 5, 6]);
  const { audio, contentType } = normalizeAudioOutput(pcm, "audio/pcm", "pcm");
  assert.equal(contentType, "audio/pcm");
  assert.deepEqual(audio, pcm);
});

test("handleAudioSpeech passes instructions and style aliases to Gemini TTS", async () => {
  const originalFetch = globalThis.fetch;
  let payload: {
    contents: [{ parts: [{ text: string; speech_metadata?: { style?: string } }] }];
  };
  globalThis.fetch = async (_input, init = {}) => {
    payload = JSON.parse(String(init.body));
    return Response.json({
      candidates: [
        {
          content: {
            parts: [
              {
                inlineData: {
                  data: Buffer.from([5, 6]).toString("base64"),
                  mimeType: "audio/L16;rate=24000",
                },
              },
            ],
          },
        },
      ],
    });
  };
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "google/gemini-3.8-flash-tts",
        input: "Speak",
        delivery: "Dramatic and whispering",
      },
      credentials: { apiKey: "gemini-key" },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/wav");
    assert.equal(payload.contents[0].parts[0].speech_metadata?.style, "Dramatic and whispering");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech rejects an AI Studio response without audio", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ candidates: [{ content: { parts: [] } }] });
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "google/gemini-2.5-flash-preview-tts",
        input: "Silent",
      },
      credentials: { apiKey: "gemini-key" },
    });
    const payload = (await response.json()) as { error: { message: string } };
    assert.equal(response.status, 500);
    assert.equal(
      payload.error.message,
      "Speech request failed: Gemini TTS response did not contain audio data"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech preserves AI Studio upstream errors", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({ error: { message: "quota exhausted" } }, { status: 429 });
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "google/gemini-2.5-flash-preview-tts",
        input: "Limited",
      },
      credentials: { apiKey: "gemini-key" },
    });
    const payload = (await response.json()) as { error: { message: string } };
    assert.equal(response.status, 429);
    assert.equal(payload.error.message, "quota exhausted");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
