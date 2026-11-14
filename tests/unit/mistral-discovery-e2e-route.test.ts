/**
 * End-to-end check of the Mistral discovery path with a payload shaped exactly like
 * Mistral's documented `BaseModelCard` (see the OpenAPI spec's `ModelCapabilities`
 * and `BaseModelCard`). Proves the three reported symptoms are fixed at the API
 * boundary the dashboard actually reads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mistral-e2e-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** A BaseModelCard as Mistral documents it (capabilities + deprecation fields). */
function card(overrides: Record<string, unknown>) {
  return {
    object: "model",
    created: 1756746619,
    owned_by: "mistralai",
    max_context_length: 262144,
    aliases: [],
    deprecation: null,
    deprecation_replacement_model: null,
    default_model_temperature: null,
    internal: false,
    billing_model_name: null,
    type: "base",
    audio_transcription_capabilities: null,
    audio_speech_capabilities: null,
    ...overrides,
  };
}

test("Mistral discovery: declared endpoints, provenance, and retired cards", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "mistral-e2e",
    apiKey: "sk-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });

  globalThis.fetch = (async () =>
    Response.json({
      object: "list",
      data: [
        // Chat-only card: must keep the declared chat endpoint + provenance.
        card({
          id: "mistral-large-latest",
          capabilities: { completion_chat: true, function_calling: true, vision: true },
          max_context_length: 262144,
        }),
        // Speech card: audio-speech endpoint.
        card({
          id: "voxtral-mini-tts-3",
          capabilities: { completion_chat: false, audio_speech: true },
        }),
        // Transcription card.
        card({
          id: "voxtral-mini-transcribe-3",
          capabilities: { completion_chat: false, audio_transcription: true },
        }),
        // OCR card.
        card({
          id: "mistral-ocr-2512",
          capabilities: { completion_chat: false, ocr: true },
        }),
        // Retired: deprecation date already passed.
        card({
          id: "pixtral-large-latest",
          capabilities: { completion_chat: true, vision: true },
          deprecation: "2026-05-31T00:00:00Z",
          deprecation_replacement_model: "mistral-large-latest",
        }),
      ],
    })) as typeof fetch;

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  assert.equal(response.status, 200);

  const body = (await response.json()) as {
    source: string;
    models: Array<{
      id: string;
      supportedEndpoints?: string[];
      endpointCapabilitySource?: string;
      supportsVision?: boolean;
    }>;
  };
  assert.equal(body.source, "api");

  const byId = new Map(body.models.map((m) => [m.id, m]));

  // Symptom 1: a chat model no longer reads as "Assumed".
  const chat = byId.get("mistral-large-latest");
  assert.ok(chat, "mistral-large-latest should be returned");
  assert.deepEqual(chat.supportedEndpoints, ["chat"]);
  assert.equal(chat.endpointCapabilitySource, "declared");

  // Symptom 2: the specialty endpoints are present on their models.
  assert.deepEqual(byId.get("voxtral-mini-tts-3")?.supportedEndpoints, ["audio-speech"]);
  assert.deepEqual(byId.get("voxtral-mini-transcribe-3")?.supportedEndpoints, [
    "audio-transcriptions",
  ]);
  assert.deepEqual(byId.get("mistral-ocr-2512")?.supportedEndpoints, ["ocr"]);
  assert.equal(byId.get("mistral-ocr-2512")?.endpointCapabilitySource, "declared");

  // Symptom 3: the retired card never reaches the catalog.
  assert.equal(byId.has("pixtral-large-latest"), false);
});
