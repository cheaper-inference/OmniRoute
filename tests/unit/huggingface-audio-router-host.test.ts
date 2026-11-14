import test from "node:test";
import assert from "node:assert/strict";

// HuggingFace retired api-inference.huggingface.co (DNS-dead). Chat moved to
// router.huggingface.co/v1 and image to router.huggingface.co/hf-inference/models
// (see image-text-to-image-modality.test.ts); these tests pin the same router host
// for the STT and TTS lanes, which still pointed at the retired host.
const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

function buildFile(contents: string, name: string, type: string) {
  return new File([Buffer.from(contents)], name, { type });
}

function stubFetch() {
  const originalFetch = globalThis.fetch;
  const captured: { url?: string } = {};
  globalThis.fetch = async (url: unknown) => {
    captured.url = String(url);
    return new Response(JSON.stringify({ text: "ok" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  return {
    captured,
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

test("HuggingFace transcription posts to the router host, not the retired api-inference host", async () => {
  const { captured, restore } = stubFetch();
  try {
    const formData = new FormData();
    formData.append("model", "huggingface/openai/whisper-large-v3");
    formData.append("file", buildFile("abc", "clip.mp3", "audio/mpeg"));

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "hf-key" },
    });

    assert.equal(response.status, 200);
    assert.equal(
      captured.url,
      "https://router.huggingface.co/hf-inference/models/openai/whisper-large-v3"
    );
    assert.ok(!captured.url!.includes("api-inference.huggingface.co"));
  } finally {
    restore();
  }
});

test("HuggingFace speech posts to the router host, not the retired api-inference host", async () => {
  const { captured, restore } = stubFetch();
  try {
    // A custom id (not in the catalog) keeps the hf-inference path.
    const custom = await handleAudioSpeech({
      body: {
        model: "huggingface/facebook/mms-tts-eng",
        input: "hf text",
      },
      credentials: { apiKey: "hf-key" },
    });

    assert.equal(custom.status, 200);
    assert.equal(
      captured.url,
      "https://router.huggingface.co/hf-inference/models/facebook/mms-tts-eng"
    );
    assert.ok(!captured.url!.includes("api-inference.huggingface.co"));

    // A catalog model goes to the provider the Hub maps it to, on the same router host
    // (route shape: tests/unit/huggingface-tts-router-provider.test.ts).
    const catalog = await handleAudioSpeech({
      body: {
        model: "huggingface/hexgrad/Kokoro-82M",
        input: "hf text",
      },
      credentials: { apiKey: "hf-key" },
    });

    assert.equal(catalog.status, 200);
    assert.equal(captured.url, "https://router.huggingface.co/deepinfra/v1/openai/audio/speech");
    assert.ok(!captured.url!.includes("api-inference.huggingface.co"));
  } finally {
    restore();
  }
});
