import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

const { AUDIO_SPEECH_PROVIDERS, parseSpeechModel } =
  await import("../../open-sse/config/audioRegistry.ts");
const { geminiGenerateSpeech } = await import("../../open-sse/executors/geminiTts.ts");
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");
const { normalizeAudioOutput, vertexGenerateSpeech } =
  await import("../../open-sse/executors/vertexMedia.ts");

test("Google Gemini TTS models parse publicly and remap to Gemini credentials", () => {
  assert.deepEqual(parseSpeechModel("google/gemini-2.5-flash-preview-tts"), {
    provider: "google",
    model: "gemini-2.5-flash-preview-tts",
  });
  assert.deepEqual(parseSpeechModel("google/gemini-3.8-flash-tts"), {
    provider: "google",
    model: "gemini-3.8-flash-tts",
  });
  assert.equal(AUDIO_SPEECH_PROVIDERS.google.credentialProviderId, "gemini");
  assert.deepEqual(
    AUDIO_SPEECH_PROVIDERS.google.models.map(({ id }) => id),
    [
      "gemini-3.1-flash-tts-preview",
      "gemini-2.5-flash-preview-tts",
      "gemini-2.5-pro-preview-tts",
      "gemini-3.8-flash-tts",
      "gemini-3.8-flash-lite-tts",
    ]
  );
  assert.deepEqual(
    AUDIO_SPEECH_PROVIDERS.vertex.models.map(({ id }) => id),
    [
      "gemini-3.1-flash-tts-preview",
      "gemini-2.5-flash-preview-tts",
      "gemini-2.5-pro-preview-tts",
      "gemini-3.8-flash-tts",
      "gemini-3.8-flash-lite-tts",
    ]
  );
});

test("Gemini 3.8 TTS ships opt-in: the google/vertex default model is unchanged from the release", () => {
  // Owner decision (2026-11-03): the 3.8 ids are unverified until a live run, so they are appended
  // after the existing catalog. The first entry (the default and the dashboard example pick) stays
  // gemini-3.1-flash-tts-preview, exactly as on release/v3.8.53.
  assert.equal(AUDIO_SPEECH_PROVIDERS.google.models[0].id, "gemini-3.1-flash-tts-preview");
  assert.equal(AUDIO_SPEECH_PROVIDERS.vertex.models[0].id, "gemini-3.1-flash-tts-preview");
});

test("geminiGenerateSpeech sends the exact AI Studio generateContent contract and wraps PCM", async () => {
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
    // geminiGenerateSpeech now returns { audio, contentType } (deliberate contract change in #17265).
    const { audio: wav, contentType } = await geminiGenerateSpeech(
      { apiKey: "gemini-key" },
      { model: "gemini-2.5-flash-preview-tts", text: "Hello", voice: "Kore" }
    );
    assert.equal(
      captured?.url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent"
    );
    assert.equal(
      (captured?.init.headers as Record<string, string>)["Content-Type"],
      "application/json"
    );
    assert.equal(
      (captured?.init.headers as Record<string, string>)["x-goog-api-key"],
      "gemini-key"
    );
    assert.equal((captured?.init.headers as Record<string, string>).Authorization, undefined);
    assert.deepEqual(JSON.parse(String(captured?.init.body)), {
      contents: [{ parts: [{ text: "Hello" }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
        },
      },
    });
    assert.equal(contentType, "audio/wav");
    assert.equal(wav.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(wav.readUInt32LE(24), 16000);
    assert.deepEqual(wav.subarray(44), pcm);
  } finally {
    globalThis.fetch = originalFetch;
  }
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
    assert.equal((captured?.init.headers as Record<string, string>).Authorization, undefined);
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

test("normalizeAudioOutput strips a structurally valid C2PA trailer from raw PCM", () => {
  const pcm = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
  const trailer = Buffer.concat([Buffer.from("C2PA"), Buffer.from([5, 0, 0, 0]), Buffer.alloc(5)]);
  const { audio, contentType } = normalizeAudioOutput(
    Buffer.concat([pcm, trailer]),
    "audio/L16;rate=24000",
    "pcm"
  );
  assert.equal(contentType, "audio/pcm");
  assert.deepEqual(audio, pcm);
});

test("normalizeAudioOutput keeps raw PCM whose 'C2PA' bytes are not a trailing chunk", () => {
  // The marker is detected by structure (tag + LE length ending at the buffer end), not by a
  // fixed size: a declared length that does not end the buffer means it is audio, not metadata.
  const pcm = Buffer.concat([
    Buffer.from([9, 9]),
    Buffer.from("C2PA"),
    Buffer.from([50, 0, 0, 0]),
    Buffer.from([1, 2, 3, 4]),
  ]);
  const { audio } = normalizeAudioOutput(pcm, "audio/L16;rate=24000", "pcm");
  assert.deepEqual(audio, pcm);
});

test("handleAudioSpeech returns WAV and defaults the AI Studio voice to Kore", async () => {
  const originalFetch = globalThis.fetch;
  let payload: {
    generationConfig: {
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: string } } };
    };
  };
  globalThis.fetch = async (_input, init: RequestInit = {}) => {
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
        model: "google/gemini-2.5-pro-preview-tts",
        input: "Speak",
      },
      credentials: { apiKey: "gemini-key" },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/wav");
    assert.equal(
      payload.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,
      "Kore"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("normalizeAudioOutput with response_format pcm returns only the RIFF data chunk payload", () => {
  // A LIST/INFO chunk whose text contains the bytes "data" precedes the real data chunk:
  // a raw byte search would cut the audio at the wrong offset, a chunk walk must not.
  const pcm = Buffer.from([10, 20, 30, 40, 50, 60]);
  const fmtChunk = Buffer.concat([
    Buffer.from("fmt "),
    Buffer.from([16, 0, 0, 0]),
    Buffer.alloc(16),
  ]);
  const listBody = Buffer.from("INFOICMT\x08\x00\x00\x00metadata", "latin1");
  const listChunk = Buffer.concat([
    Buffer.from("LIST"),
    Buffer.from([listBody.length, 0, 0, 0]),
    listBody,
  ]);
  const dataChunk = Buffer.concat([Buffer.from("data"), Buffer.from([pcm.length, 0, 0, 0]), pcm]);
  const c2paChunk = Buffer.concat([
    Buffer.from("C2PA"),
    Buffer.from([4, 0, 0, 0]),
    Buffer.alloc(4),
  ]);
  const riffBody = Buffer.concat([Buffer.from("WAVE"), fmtChunk, listChunk, dataChunk, c2paChunk]);
  const riff = Buffer.concat([
    Buffer.from("RIFF"),
    Buffer.from([riffBody.length, 0, 0, 0]),
    riffBody,
  ]);

  const { audio, contentType } = normalizeAudioOutput(riff, "audio/wav", "pcm");
  assert.equal(contentType, "audio/pcm");
  assert.deepEqual(audio, pcm);
});

test("handleAudioSpeech passes instructions and style aliases to Gemini TTS", async () => {
  const originalFetch = globalThis.fetch;
  let payload: {
    contents: [{ parts: [{ text: string; speech_metadata?: { style?: string } }] }];
  };
  globalThis.fetch = async (_input, init: RequestInit = {}) => {
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

function buildRiffWithC2pa(pcm: Buffer): Buffer {
  const fmtChunk = Buffer.concat([
    Buffer.from("fmt "),
    Buffer.from([16, 0, 0, 0]),
    Buffer.alloc(16),
  ]);
  const dataChunk = Buffer.concat([Buffer.from("data"), Buffer.from([pcm.length, 0, 0, 0]), pcm]);
  const c2paChunk = Buffer.concat([
    Buffer.from("C2PA"),
    Buffer.from([6, 0, 0, 0]),
    Buffer.alloc(6),
  ]);
  const riffBody = Buffer.concat([Buffer.from("WAVE"), fmtChunk, dataChunk, c2paChunk]);
  return Buffer.concat([Buffer.from("RIFF"), Buffer.from([riffBody.length, 0, 0, 0]), riffBody]);
}

function vertexSaCredentials() {
  return {
    apiKey: JSON.stringify({
      project_id: "proj-test",
      client_email: "svc@x.iam",
      private_key: "x",
    }),
    accessToken: "test-bearer-token",
    providerSpecificData: { region: "us-central1" },
  };
}

test("vertexGenerateSpeech sends speech_metadata.style and returns raw PCM for response_format pcm", async () => {
  const originalFetch = globalThis.fetch;
  const pcm = Buffer.from([7, 8, 9, 10]);
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
                  data: buildRiffWithC2pa(pcm).toString("base64"),
                  mimeType: "audio/wav",
                },
              },
            ],
          },
        },
      ],
    });
  };
  try {
    const { audio, contentType } = await vertexGenerateSpeech(vertexSaCredentials(), {
      model: "gemini-3.8-flash-tts",
      input: "Hello",
      instructions: "Calm narrator",
      speed: 0.8,
      response_format: "pcm",
    });
    assert.equal(
      captured?.url,
      "https://us-central1-aiplatform.googleapis.com/v1/projects/proj-test/locations/us-central1/publishers/google/models/gemini-3.8-flash-tts:generateContent"
    );
    const body = JSON.parse(String(captured?.init.body));
    assert.deepEqual(body.contents, [
      {
        role: "user",
        parts: [
          {
            text: "Hello",
            speech_metadata: { style: "Calm narrator. Pace: 0.8x normal speed" },
          },
        ],
      },
    ]);
    assert.equal(
      body.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,
      "Kore"
    );
    assert.equal(contentType, "audio/pcm");
    assert.deepEqual(audio, pcm);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vertexGenerateSpeech omits speech_metadata without style and keeps a single clean RIFF", async () => {
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
                  data: buildRiffWithC2pa(pcm).toString("base64"),
                  mimeType: "audio/wav",
                },
              },
            ],
          },
        },
      ],
    });
  };
  try {
    const { audio, contentType } = await vertexGenerateSpeech(vertexSaCredentials(), {
      model: "gemini-2.5-flash-preview-tts",
      input: "Plain",
      speed: 1,
    });
    const body = JSON.parse(String(captured?.init.body));
    assert.deepEqual(body.contents, [{ role: "user", parts: [{ text: "Plain" }] }]);
    assert.equal(contentType, "audio/wav");
    assert.equal(audio.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(audio.indexOf(Buffer.from("RIFF"), 4), -1);
    assert.equal(audio.indexOf(Buffer.from("C2PA")), -1);
    assert.equal(audio.readUInt32LE(4), audio.length - 8);
    assert.deepEqual(audio.subarray(audio.length - pcm.length), pcm);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
