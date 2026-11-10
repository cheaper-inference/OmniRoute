// Regression guard: when the upstream fetch itself throws (DNS failure, connection reset,
// TLS error), the audio handlers' generic `catch` must return the sanitized 500 WITH CORS,
// like every upstream-error path since #15159 / #17844. `errorResponse` does not emit
// CORS and these routes only set it on the OPTIONS preflight.
import assert from "node:assert/strict";
import { test } from "node:test";

const { handleAudioTranslation } = await import("../../open-sse/handlers/audioTranslation.ts");
const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

// A network-level failure whose message carries a credential and an absolute path, to prove
// the existing sanitization still holds on this path.
const NETWORK_ERROR =
  "connect ECONNREFUSED /srv/app/node_modules/undici/index.js api_key=sk-live-FETCHFAIL-4242";

async function withThrowingFetch(run: () => Promise<Response>): Promise<Response> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new TypeError(NETWORK_ERROR);
  };
  try {
    return await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function audioForm(model: string): FormData {
  const formData = new FormData();
  formData.append("model", model);
  formData.append("file", new File([Buffer.from("abc")], "clip.wav", { type: "audio/wav" }));
  return formData;
}

async function assertSanitized500WithCors(response: Response, label: string): Promise<void> {
  assert.equal(response.status, 500, `${label}: status`);
  assert.ok(
    response.headers.get("access-control-allow-methods"),
    `${label}: lost CORS on fetch-failure response`
  );
  const raw = await response.text();
  assert.ok(!raw.includes("sk-live-FETCHFAIL-4242"), `${label}: leaked a credential: ${raw}`);
  assert.ok(!raw.includes("/srv/app/node_modules"), `${label}: leaked a path: ${raw}`);
  const parsed = JSON.parse(raw) as { error?: { message?: string } };
  assert.ok(parsed.error?.message, `${label}: missing error envelope`);
}

test("translation: a thrown upstream fetch returns a sanitized 500 with CORS", async () => {
  const response = await withThrowingFetch(() =>
    handleAudioTranslation({
      formData: audioForm("openai/whisper-1"),
      credentials: { apiKey: "openai-key" },
    })
  );
  await assertSanitized500WithCors(response, "translation");
});

test("transcription: a thrown upstream fetch returns a sanitized 500 with CORS", async () => {
  const response = await withThrowingFetch(() =>
    handleAudioTranscription({
      formData: audioForm("openai/whisper-1"),
      credentials: { apiKey: "openai-key" },
    })
  );
  await assertSanitized500WithCors(response, "transcription");
});

test("speech: a thrown upstream fetch returns a sanitized 500 with CORS", async () => {
  const response = await withThrowingFetch(() =>
    handleAudioSpeech({
      body: { model: "openai/tts-1", input: "hello world" },
      credentials: { apiKey: "openai-key" },
    })
  );
  await assertSanitized500WithCors(response, "speech");
});
