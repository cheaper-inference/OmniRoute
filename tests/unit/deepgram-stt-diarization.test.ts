// Deepgram's /v1/listen path never asked for speaker diarization and ignored
// `response_format=verbose_json`: every request came back as `{ text, noSpeechDetected }`.
// Soniox already had opt-in diarization and a verbose envelope, so this brings Deepgram to
// parity. Deepgram rejects requests that set BOTH `diarize` and `diarize_model`
// (developers.deepgram.com/docs/diarization → "Versioning Behavior"), so the two are never
// forwarded together.
//
// The default contract is load-bearing: no diarization flag and no verbose_json must keep the
// upstream URL and the response body byte-identical to before.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

const TRANSCRIPT = "hello world and more";

const PLAIN_BODY = {
  metadata: { duration: 8.04 },
  results: { channels: [{ alternatives: [{ transcript: TRANSCRIPT }] }] },
};

const DIARIZED_BODY = {
  metadata: { duration: 8.04 },
  results: {
    channels: [{ alternatives: [{ transcript: TRANSCRIPT }], detected_language: "en" }],
    utterances: [
      { start: 0, end: 3.62, transcript: "hello world", speaker: 0 },
      { start: 4.1, end: 7.9, transcript: "and more", speaker: 1 },
    ],
  },
};

// Hostile payload: a null entry (must not throw) and a trailing utterance with no `end`
// and no `speaker` (must not drop keys or emit non-numbers).
const MALFORMED_BODY = {
  metadata: { duration: 8.04 },
  results: {
    channels: [{ alternatives: [{ transcript: TRANSCRIPT }] }],
    utterances: [
      { start: 0, end: 5, transcript: "first", speaker: 0 },
      null,
      { start: 6, transcript: "second" },
    ],
  },
};

const KNOWN_DEEPGRAM_PARAMS = new Set([
  "model",
  "smart_format",
  "punctuate",
  "language",
  "detect_language",
  "diarize",
  "diarize_model",
  "utterances",
]);

async function runDeepgram(fields: Record<string, string>, upstreamBody: unknown = PLAIN_BODY) {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return Response.json(upstreamBody);
  };
  try {
    const formData = new FormData();
    formData.append("model", "deepgram/nova-3");
    formData.append("file", new File([Buffer.from("abc")], "clip.wav", { type: "audio/wav" }));
    for (const [key, value] of Object.entries(fields)) formData.append(key, value);
    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "dg-key" },
    });
    return { url: new URL(capturedUrl), status: response.status, payload: await response.json() };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("a boolean diarization flag sends diarize=true and utterances=true", async () => {
  for (const key of ["diarization", "speaker_labels", "enable_speaker_diarization", "diarize"]) {
    const { url } = await runDeepgram({ [key]: "true" }, DIARIZED_BODY);
    assert.equal(url.searchParams.get("diarize"), "true", `spelling ${key} was dropped`);
    assert.equal(url.searchParams.get("utterances"), "true", `spelling ${key} lost utterances`);
    assert.equal(url.searchParams.has("diarize_model"), false);
  }
  const off = await runDeepgram({ diarization: "false" });
  assert.equal(off.url.searchParams.has("diarize"), false);
  assert.equal(off.url.searchParams.has("utterances"), false);
});

test("diarize_model is forwarded trimmed, without the conflicting diarize flag", async () => {
  const { url } = await runDeepgram({ diarize_model: " latest " }, DIARIZED_BODY);
  assert.equal(url.searchParams.get("diarize_model"), "latest");
  assert.equal(url.searchParams.get("utterances"), "true");
  // Deepgram rejects requests that set both — even when the client sent both.
  assert.equal(url.searchParams.has("diarize"), false);

  const both = await runDeepgram({ diarize: "true", diarize_model: "v2" }, DIARIZED_BODY);
  assert.equal(both.url.searchParams.get("diarize_model"), "v2");
  assert.equal(both.url.searchParams.has("diarize"), false);
});

test("verbose_json returns speaker-labeled segments built from utterances", async () => {
  const { status, payload } = await runDeepgram(
    { diarization: "true", response_format: "verbose_json" },
    DIARIZED_BODY
  );
  assert.equal(status, 200);
  assert.deepEqual(payload, {
    task: "transcribe",
    language: "en",
    duration: 7.9,
    text: TRANSCRIPT,
    segments: [
      { id: 0, start: 0, end: 3.62, text: "hello world", speaker: 0 },
      { id: 1, start: 4.1, end: 7.9, text: "and more", speaker: 1 },
    ],
    noSpeechDetected: false,
  });
});

test("diarization implies the verbose body, matching Soniox", async () => {
  const { payload } = await runDeepgram({ diarize_model: "latest" }, DIARIZED_BODY);
  assert.equal(payload.segments.length, 2);
  assert.equal(payload.segments[1].speaker, 1);
  assert.equal(payload.text, TRANSCRIPT);
});

test("verbose_json without diarization reports metadata duration and no segments", async () => {
  const { url, payload } = await runDeepgram({ response_format: "verbose_json" });
  assert.equal(url.searchParams.has("diarize"), false);
  assert.equal(url.searchParams.has("utterances"), false);
  assert.equal(payload.text, TRANSCRIPT);
  assert.equal(payload.duration, 8.04);
  assert.deepEqual(payload.segments, []);
  assert.equal(payload.noSpeechDetected, false);
});

test("malformed utterances never throw and keep a stable numeric shape", async () => {
  const { status, payload } = await runDeepgram(
    { response_format: "verbose_json", diarization: "true" },
    MALFORMED_BODY
  );
  assert.equal(status, 200);
  assert.equal(typeof payload.duration, "number");
  assert.ok(Number.isFinite(payload.duration));
  assert.equal(payload.segments.length, 2);
  for (const segment of payload.segments) {
    assert.deepEqual(Object.keys(segment).sort(), ["end", "id", "speaker", "start", "text"]);
    assert.equal(typeof segment.start, "number");
    assert.equal(typeof segment.end, "number");
    assert.equal(typeof segment.speaker, "number");
  }
  assert.deepEqual(payload.segments[1], { id: 1, start: 6, end: 0, text: "second", speaker: 0 });
  // The last surviving utterance has no `end`, so duration falls back to the metadata.
  assert.equal(payload.duration, 8.04);
  assert.equal("language" in payload, false);
});

test("no flags: URL has no diarization params and the body is unchanged", async () => {
  const { url, payload } = await runDeepgram({});
  assert.equal(url.searchParams.has("diarize"), false);
  assert.equal(url.searchParams.has("diarize_model"), false);
  assert.equal(url.searchParams.has("utterances"), false);
  assert.deepEqual(payload, { text: TRANSCRIPT, noSpeechDetected: false });
});

test("client-only fields never leak upstream as unknown query params", async () => {
  const { url } = await runDeepgram(
    {
      response_format: "verbose_json",
      diarization: "true",
      speaker_labels: "true",
      enable_speaker_diarization: "true",
      prompt: "ctx",
      temperature: "0",
    },
    DIARIZED_BODY
  );
  const unknown = [...url.searchParams.keys()].filter((key) => !KNOWN_DEEPGRAM_PARAMS.has(key));
  assert.deepEqual(unknown, []);
});
