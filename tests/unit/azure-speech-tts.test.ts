import test from "node:test";
import assert from "node:assert/strict";

import { AUDIO_SPEECH_PROVIDERS } from "../../open-sse/config/audioRegistry.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";
import { resolveAzureSpeechVoicesUrl } from "../../open-sse/executors/azureSpeechTts.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

test("Azure Speech is registered as an audio-only TTS provider", () => {
  const provider = AUDIO_SPEECH_PROVIDERS["azure-speech"];

  assert.ok(provider);
  assert.equal(provider.format, "azure-speech-tts");
  assert.equal(provider.authHeader, "ocp-apim-subscription-key");
  assert.deepEqual(provider.models, [{ id: "neural", name: "Azure Neural Text to Speech" }]);
});

test("Azure Speech sends escaped SSML to the regional synthesis endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string>; body: string } | undefined;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: init.headers as Record<string, string>,
      body: String(init.body),
    };
    return new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "azure-speech/neural",
        input: "Pane & <olio>",
        voice: "it-IT-IsabellaNeural",
        response_format: "mp3",
        speed: 1.1,
      },
      credentials: {
        apiKey: "azure-speech-key",
        providerSpecificData: { region: "westeurope" },
      },
    });

    assert.equal(captured?.url, "https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1");
    assert.equal(captured?.headers["Ocp-Apim-Subscription-Key"], "azure-speech-key");
    assert.equal(captured?.headers["X-Microsoft-OutputFormat"], "audio-24khz-96kbitrate-mono-mp3");
    assert.equal(captured?.headers["Content-Type"], "application/ssml+xml");
    assert.match(captured?.body || "", /xml:lang="it-IT"/);
    assert.match(captured?.body || "", /name="it-IT-IsabellaNeural"/);
    assert.match(captured?.body || "", /<prosody rate="\+10%">Pane &amp; &lt;olio&gt;<\/prosody>/);
    assert.equal(response.status, 200);
    assert.deepEqual(Array.from(new Uint8Array(await response.arrayBuffer())), [1, 2, 3]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Azure Speech accepts a custom resource endpoint and WAV output", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedHeaders = init.headers as Record<string, string>;
    return new Response(new Uint8Array([4, 5]), {
      status: 200,
      headers: { "content-type": "audio/wav" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "azure-speech/neural",
        input: "Ciao",
        voice: "it-IT-DiegoNeural",
        response_format: "wav",
      },
      credentials: {
        apiKey: "azure-speech-key",
        providerSpecificData: {
          baseUrl: "https://my-speech-resource.cognitiveservices.azure.com",
          region: "ignored-region",
        },
      },
    });

    assert.equal(
      capturedUrl,
      "https://my-speech-resource.cognitiveservices.azure.com/tts/cognitiveservices/v1"
    );
    assert.equal(capturedHeaders["X-Microsoft-OutputFormat"], "riff-24khz-16bit-mono-pcm");
    assert.equal(response.headers.get("content-type"), "audio/wav");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Azure Speech rejects missing region and unsupported output formats before fetch", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error("should not fetch");
  };

  try {
    const missingRegion = await handleAudioSpeech({
      body: { model: "azure-speech/neural", input: "Hello" },
      credentials: { apiKey: "azure-speech-key", providerSpecificData: {} },
    });
    const unsupportedFormat = await handleAudioSpeech({
      body: {
        model: "azure-speech/neural",
        input: "Hello",
        response_format: "flac",
      },
      credentials: {
        apiKey: "azure-speech-key",
        providerSpecificData: { region: "eastus" },
      },
    });

    assert.equal(missingRegion.status, 400);
    assert.match((await missingRegion.json()).error.message, /region or custom Base URL/i);
    assert.equal(unsupportedFormat.status, 400);
    assert.match((await unsupportedFormat.json()).error.message, /supports response_format/i);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Azure Speech connection validation checks the regional voices endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedHeaders: Record<string, string> = {};
  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedHeaders = init.headers as Record<string, string>;
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "azure-speech",
      apiKey: "azure-speech-key",
      providerSpecificData: { region: "italynorth" },
    });

    assert.equal(
      capturedUrl,
      "https://italynorth.tts.speech.microsoft.com/cognitiveservices/voices/list"
    );
    assert.equal(capturedHeaders["Ocp-Apim-Subscription-Key"], "azure-speech-key");
    assert.equal(result.valid, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Azure Speech keeps the custom-resource TTS prefix for voice validation", () => {
  assert.equal(
    resolveAzureSpeechVoicesUrl({
      providerSpecificData: {
        baseUrl: "https://my-speech-resource.cognitiveservices.azure.com",
      },
    }),
    "https://my-speech-resource.cognitiveservices.azure.com/tts/cognitiveservices/voices/list"
  );
  assert.equal(
    resolveAzureSpeechVoicesUrl({
      providerSpecificData: { baseUrl: "http://127.0.0.1:8080" },
    }),
    null
  );
});
