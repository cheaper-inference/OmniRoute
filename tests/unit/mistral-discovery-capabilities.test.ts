import { test } from "node:test";
import assert from "node:assert/strict";

import { detectVisionInput, normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import {
  AUDIO_SPEECH_PROVIDERS,
  parseTranscriptionModel,
  parseSpeechModel,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { parseOcrModel } from "@omniroute/open-sse/config/ocrRegistry.ts";
import { mistralProvider } from "@omniroute/open-sse/config/providers/registry/mistral/index.ts";

// Mistral's /v1/models cards (BaseModelCard per the Mistral OpenAPI spec) carry
// `max_context_length` (total prompt+output window) and a `capabilities` object of
// booleans: completion_chat, vision, ocr, audio_transcription, audio_speech, ...
// There is NO per-model output cap and NO modalities array on the card.

test("bug 1: max_context_length maps to the context window", () => {
  const [small] = normalizeDiscoveredModels([
    { id: "mistral-small-latest", object: "model", max_context_length: 262144 },
  ]);
  assert.equal(small.inputTokenLimit, 262144);

  const [glm] = normalizeDiscoveredModels([{ id: "glm-5-2", max_context_length: 1048576 }]);
  assert.equal(glm.inputTokenLimit, 1048576);
});

test("bug 3: max_context_length is a window, never an output cap", () => {
  const [row] = normalizeDiscoveredModels([
    { id: "mistral-medium-latest", object: "model", max_context_length: 262144 },
  ]);
  assert.equal(row.outputTokenLimit, undefined);
});

test("bug 2: capabilities.vision marks a Mistral card as vision-capable", () => {
  assert.equal(detectVisionInput({ id: "pixtral", capabilities: { vision: true } }), true);
  assert.equal(detectVisionInput({ id: "text-only", capabilities: { vision: false } }), false);

  const [row] = normalizeDiscoveredModels([
    {
      id: "pixtral-large-latest",
      object: "model",
      capabilities: { completion_chat: true, vision: true },
      max_context_length: 131072,
    },
  ]);
  assert.equal(row.supportsVision, true);
});

test("bug 2: audio_speech capability stamps the speech endpoint", () => {
  const [row] = normalizeDiscoveredModels([
    {
      id: "voxtral-mini-tts-latest",
      object: "model",
      capabilities: { completion_chat: false, audio_speech: true },
    },
  ]);
  assert.deepEqual(row.supportedEndpoints, ["audio-speech"]);
  assert.equal(row.endpointCapabilitySource, "declared");
});

test("bug 2: audio_transcription capability stamps the transcriptions endpoint", () => {
  const [row] = normalizeDiscoveredModels([
    {
      id: "voxtral-mini-latest",
      object: "model",
      capabilities: { completion_chat: false, audio_transcription: true },
    },
  ]);
  assert.deepEqual(row.supportedEndpoints, ["audio-transcriptions"]);
  assert.equal(row.endpointCapabilitySource, "declared");
});

test("bug 2: declared chat plus audio stamps both endpoints", () => {
  const [row] = normalizeDiscoveredModels([
    {
      id: "voxtral-small-latest",
      object: "model",
      capabilities: { completion_chat: true, audio_transcription: true },
    },
  ]);
  assert.deepEqual(row.supportedEndpoints, ["audio-transcriptions", "chat"]);
  assert.equal(row.endpointCapabilitySource, "declared");
});

test("bug 2: declared chat protects a model from embedding id heuristics", () => {
  // "text-embedding-*" matches the id heuristic; an upstream completion_chat:true
  // declaration is authoritative and must win.
  const [row] = normalizeDiscoveredModels([
    { id: "text-embedding-guard", capabilities: { completion_chat: true } },
  ]);
  assert.equal(row.modelType, undefined);
  assert.deepEqual(row.supportedEndpoints, ["chat"]);
});

test("bug 2: chat-only declarations carry the declared chat endpoint", () => {
  const [row] = normalizeDiscoveredModels([
    {
      id: "mistral-small-latest",
      object: "model",
      capabilities: { completion_chat: true, function_calling: true },
    },
  ]);
  assert.deepEqual(row.supportedEndpoints, ["chat"]);
  assert.equal(row.endpointCapabilitySource, "declared");
  assert.equal(row.modelType, undefined);
});

// A card that declares `completion_chat: true` HAS declared its endpoint. Dropping
// the provenance made the dashboard fall through to the "Assumed" badge for every
// Mistral chat model, even though Mistral's own model card said `completion_chat`.
test("a declared chat-only card carries declared provenance, not Assumed", () => {
  const [row] = normalizeDiscoveredModels(
    [
      {
        id: "mistral-large-latest",
        object: "model",
        capabilities: { completion_chat: true, function_calling: true, vision: true },
        max_context_length: 262144,
      },
    ],
    "mistral"
  );
  assert.deepEqual(row.supportedEndpoints, ["chat"]);
  assert.equal(row.endpointCapabilitySource, "declared");
});

test("a card with no capabilities object keeps the untrusted row shape", () => {
  // No declaration at all is NOT evidence: the row must stay provenance-less so the
  // #16929 gate never arms itself on an id heuristic.
  const [row] = normalizeDiscoveredModels(
    [{ id: "mistral-medium-latest", object: "model", max_context_length: 262144 }],
    "mistral"
  );
  assert.equal(row.supportedEndpoints, undefined);
  assert.equal(row.endpointCapabilitySource, undefined);
});

test("a card past its deprecation date is not discovered", () => {
  // Mistral keeps retired models in /v1/models and marks them on the card itself:
  // `deprecation` (date-time) + `deprecation_replacement_model`. `archived` is NOT
  // the signal — it only exists on FTModelCard (fine-tuned), where it means the
  // operator archived their own model.
  const rows = normalizeDiscoveredModels(
    [
      {
        id: "pixtral-large-latest",
        object: "model",
        deprecation: "2026-05-31T00:00:00Z",
        deprecation_replacement_model: "mistral-large-latest",
        capabilities: { completion_chat: true },
      },
      {
        id: "mistral-large-latest",
        object: "model",
        deprecation: null,
        capabilities: { completion_chat: true },
      },
    ],
    "mistral"
  );
  assert.deepEqual(
    rows.map((row) => row.id),
    ["mistral-large-latest"]
  );
});

test("a future deprecation date is a warning, not a retirement", () => {
  // Still callable until the date: the row must survive so the lifecycle policy can
  // report the upcoming shutdown instead of the model silently vanishing.
  const [row] = normalizeDiscoveredModels(
    [
      {
        id: "mistral-medium-latest",
        object: "model",
        deprecation: "2099-01-01T00:00:00Z",
        capabilities: { completion_chat: true },
      },
    ],
    "mistral"
  );
  assert.equal(row.id, "mistral-medium-latest");
});

test("an unparseable deprecation date keeps the model", () => {
  const [row] = normalizeDiscoveredModels(
    [
      {
        id: "codestral-latest",
        object: "model",
        deprecation: "not-a-date",
        capabilities: { completion_chat: true },
      },
    ],
    "mistral"
  );
  assert.equal(row.id, "codestral-latest");
});

test("an archived fine-tuned card is not treated as retired", () => {
  // `archived` on an FTModelCard is the operator's own archive action, not a vendor
  // retirement — it must not drop the model from discovery.
  const [row] = normalizeDiscoveredModels(
    [
      {
        id: "ft:open-mistral-7b:587a6b29:20240514:7e773925",
        object: "model",
        type: "fine-tuned",
        archived: true,
        capabilities: { completion_chat: true },
      },
    ],
    "mistral"
  );
  assert.equal(row?.id, "ft:open-mistral-7b:587a6b29:20240514:7e773925");
});

test("bug 2: cards without capabilities keep the tip row shape", () => {
  const [row] = normalizeDiscoveredModels([{ id: "mistral-medium-latest", object: "model" }]);
  assert.equal(row.supportedEndpoints, undefined);
  assert.equal(row.endpointCapabilitySource, undefined);
});

test("bug 2: ocr capability stamps the ocr endpoint", () => {
  const [row] = normalizeDiscoveredModels([
    {
      id: "mistral-ocr-latest",
      object: "model",
      capabilities: { completion_chat: false, ocr: true },
    },
  ]);
  assert.deepEqual(row.supportedEndpoints, ["ocr"]);
  assert.equal(row.endpointCapabilitySource, "declared");
});

test("bug 2: function_calling marks a Mistral card as supportsTools, and only a Mistral card", () => {
  const card = {
    id: "mistral-large-latest",
    object: "model",
    capabilities: { completion_chat: true, function_calling: true },
  };
  assert.equal(normalizeDiscoveredModels([card], "mistral")[0].supportsTools, true);
  assert.equal(normalizeDiscoveredModels([card], "openrouter")[0].supportsTools, undefined);
  assert.equal(normalizeDiscoveredModels([card])[0].supportsTools, undefined);
});

test("bug 1: mistral-large-4 maps to 1048576 (1M) context window", () => {
  const [row] = normalizeDiscoveredModels([
    { id: "mistral-large-4", object: "model", max_context_length: 1048576 },
  ]);
  assert.equal(row.inputTokenLimit, 1048576);
});

test("mistral audio and ocr registries correctly parse mistral models", () => {
  const stt = parseTranscriptionModel("voxtral-mini-latest");
  assert.equal(stt.provider, "mistral");
  assert.equal(stt.model, "voxtral-mini-latest");

  const ocr = parseOcrModel("mistral-ocr-latest");
  assert.equal(ocr.provider, "mistral");
  assert.equal(ocr.model, "mistral-ocr-latest");

  const ocrVersioned = parseOcrModel("mistral-ocr-2512");
  assert.equal(ocrVersioned.provider, "mistral");
  assert.equal(ocrVersioned.model, "mistral-ocr-2512");
});

test("mistral speech stays out of the generic path until it has a format handler", () => {
  // Mistral takes `voice_id` and answers JSON base64 `audio_data`; the default speech
  // path sends `voice` and streams the body back as audio.
  assert.equal(AUDIO_SPEECH_PROVIDERS.mistral, undefined);
  assert.equal(parseSpeechModel("mistral/voxtral-mini-tts-3-0").provider, null);
  assert.equal(parseSpeechModel("voxtral-mini-tts-latest").provider, null);
});

test("static mistral rows carry the ids and windows of Mistral's model cards", () => {
  const rows = new Map(mistralProvider.models.map((model) => [model.id, model]));
  assert.deepEqual(Object.fromEntries([...rows].map(([id, model]) => [id, model.contextLength])), {
    "mistral-large-latest": 262144,
    "mistral-large-4": 1048576,
    "mistral-medium-3-5": 262144,
    "mistral-small-latest": 262144,
    "codestral-latest": 131072,
    "ministral-14b-latest": 262144,
    "ministral-8b-latest": 262144,
    "ministral-3b-latest": 262144,
    "voxtral-small-latest": 32768,
    "labs-leanstral-1-5-1": 262144,
  });
  // Retired by Mistral: pixtral-large on 2026-05-31, devstral-latest on 2026-07-31
  // (#18755 / #18792); the ids would only answer an upstream error.
  assert.equal(rows.has("pixtral-large-latest"), false);
  assert.equal(rows.has("devstral-latest"), false);
});

test("a capability flag Mistral does not publish adds no tool support", () => {
  // ModelCapabilities in Mistral's OpenAPI spec has `function_calling`, not `tools`.
  const [row] = normalizeDiscoveredModels([
    { id: "some-model", object: "model", capabilities: { tools: true } },
  ]);
  assert.equal(row.supportsTools, undefined);
});
