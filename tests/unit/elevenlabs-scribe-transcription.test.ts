import test from "node:test";
import assert from "node:assert/strict";

const { parseTranscriptionModel, AUDIO_TRANSCRIPTION_PROVIDERS, getAllAudioModels } =
  await import("../../open-sse/config/audioRegistry.ts");
const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

const SCRIBE_URL = "https://api.elevenlabs.io/v1/speech-to-text";

function audioForm(model: string, extra: Record<string, string> = {}) {
  const form = new FormData();
  form.set("file", new File([Buffer.from([1, 2, 3])], "clip.mp3", { type: "audio/mpeg" }));
  form.set("model", model);
  for (const [key, value] of Object.entries(extra)) form.set(key, value);
  return form;
}

test("elevenlabs scribe models resolve to the native provider", () => {
  assert.deepEqual(parseTranscriptionModel("elevenlabs/scribe_v1"), {
    provider: "elevenlabs",
    model: "scribe_v1",
  });
  assert.deepEqual(parseTranscriptionModel("elevenlabs/scribe_v2"), {
    provider: "elevenlabs",
    model: "scribe_v2",
  });
  assert.deepEqual(
    AUDIO_TRANSCRIPTION_PROVIDERS.elevenlabs?.models.map((m) => m.id),
    ["scribe_v1", "scribe_v2"]
  );
  assert.ok(
    getAllAudioModels().some(
      (m) => m.id === "elevenlabs/scribe_v1" && m.subtype === "transcription"
    )
  );
});

test("the kie reseller id elevenlabs/speech-to-text keeps resolving to kie", () => {
  const expected = { provider: "kie", model: "elevenlabs/speech-to-text" };
  assert.deepEqual(parseTranscriptionModel("elevenlabs/speech-to-text"), expected);
  assert.deepEqual(parseTranscriptionModel("kie/elevenlabs/speech-to-text"), expected);
});

test("scribe posts multipart to speech-to-text with xi-api-key and maps the text", async () => {
  const originalFetch = globalThis.fetch;
  let captured = { url: "", init: {} as RequestInit };
  globalThis.fetch = async (url, init = {}) => {
    captured = { url: String(url), init: init as RequestInit };
    return Response.json({ language_code: "por", text: "ola mundo", words: [] });
  };
  try {
    const response = await handleAudioTranscription({
      formData: audioForm("elevenlabs/scribe_v1", { language: "pt" }),
      credentials: { apiKey: "xi-test-key" },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { text: "ola mundo" });
    assert.equal(captured.url, SCRIBE_URL);
    assert.equal(captured.init.method, "POST");
    const headers = captured.init.headers as Record<string, string>;
    assert.equal(headers["xi-api-key"], "xi-test-key");
    assert.match(headers["Content-Type"], /^multipart\/form-data; boundary=/);
    const body = Buffer.from(captured.init.body as Uint8Array).toString("latin1");
    assert.match(body, /name="model_id"\r\n\r\nscribe_v1\r\n/);
    assert.match(body, /name="language_code"\r\n\r\npt\r\n/);
    assert.match(body, /name="file"; filename="clip.mp3"/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("scribe omits language_code when none is given and relays upstream errors", async () => {
  const originalFetch = globalThis.fetch;
  let body = "";
  globalThis.fetch = async (_url, init = {}) => {
    body = Buffer.from(init.body as Uint8Array).toString("latin1");
    return Response.json({ detail: { message: "bad audio" } }, { status: 422 });
  };
  try {
    const response = await handleAudioTranscription({
      formData: audioForm("elevenlabs/scribe_v2"),
      credentials: { apiKey: "xi-test-key" },
    });
    assert.equal(response.status, 422);
    assert.doesNotMatch(body, /language_code/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("scribe without a key fails with 401 before any upstream call", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("upstream must not be called");
  };
  try {
    const response = await handleAudioTranscription({
      formData: audioForm("elevenlabs/scribe_v1"),
      credentials: null,
    });
    assert.equal(response.status, 401);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
