import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyModelSupportedEndpoints,
  MODEL_SUPPORTED_ENDPOINT_VALUES,
  normalizeModelSupportedEndpoints,
} from "../../src/shared/constants/modelSupportedEndpoints.ts";
import { providerModelMutationSchema } from "../../src/shared/validation/schemas/provider.ts";

test("normalizes legacy video and audio metadata to operation-specific endpoint ids", () => {
  assert.deepEqual(normalizeModelSupportedEndpoints(["chat", "video", "audio"]), [
    "chat",
    "videos",
    "audio-speech",
    "audio-transcriptions",
  ]);
});

test("deduplicates canonical endpoint ids while preserving order", () => {
  assert.deepEqual(
    normalizeModelSupportedEndpoints([
      "videos",
      "video",
      "audio-speech",
      "audio",
      "audio-transcriptions",
    ]),
    ["videos", "audio-speech", "audio-transcriptions"]
  );
});

test("exports operation-specific values accepted by model metadata", () => {
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("videos"));
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("audio-speech"));
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("audio-transcriptions"));
});

test("preserves endpoint ids introduced by external discovery", () => {
  assert.deepEqual(normalizeModelSupportedEndpoints(["responses", "video"]), [
    "responses",
    "videos",
  ]);
});

test("classifies operation-specific media endpoints for the model catalog", () => {
  assert.deepEqual(classifyModelSupportedEndpoints(["videos"]), { type: "video" });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-speech"]), {
    type: "audio",
    subtype: "speech",
  });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-transcriptions"]), {
    type: "audio",
    subtype: "transcription",
  });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-speech", "audio-transcriptions"]), {
    type: "audio",
  });
});

test("accepts the responses endpoint emitted by Codex discovery", () => {
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("responses"));
  assert.deepEqual(normalizeModelSupportedEndpoints(["responses"]), ["responses"]);
  // A responses-only model is a plain chat-type model: no media type override.
  assert.deepEqual(classifyModelSupportedEndpoints(["responses"]), {});

  const parsed = providerModelMutationSchema.safeParse({
    provider: "codex",
    modelId: "gpt-6-sol",
    supportedEndpoints: ["responses"],
  });
  assert.equal(parsed.success, true);
  assert.deepEqual(parsed.success && parsed.data.supportedEndpoints, ["responses"]);
});

test("classifyModelSupportedEndpoints returns empty object when chat or responses is supported", () => {
  assert.deepEqual(classifyModelSupportedEndpoints(["chat", "images"]), {});
  assert.deepEqual(classifyModelSupportedEndpoints(["responses", "audio-transcriptions"]), {});
});

// ─── decisions (System One, #13987) ────────────────────────────────────────

test("classifies decisions-only models as the decisions model kind", () => {
  assert.deepEqual(classifyModelSupportedEndpoints(["decisions"]), { type: "decisions" });
  // A decisions model is never a chat model even if mislabeled with both.
  assert.deepEqual(classifyModelSupportedEndpoints(["chat", "decisions"]), {});
});

test("accepts decisions in model metadata and provider-node api types", () => {
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("decisions"));
  assert.deepEqual(normalizeModelSupportedEndpoints(["decisions"]), ["decisions"]);

  const parsed = providerModelMutationSchema.safeParse({
    provider: "typesafe",
    modelId: "jev-latest",
    supportedEndpoints: ["decisions"],
  });
  assert.equal(parsed.success, true);
  assert.deepEqual(parsed.success && parsed.data.supportedEndpoints, ["decisions"]);
});

test("defaultEndpointsForProviderNodeApiType maps a decisions node to decisions only", async () => {
  const { defaultEndpointsForProviderNodeApiType } =
    await import("../../src/shared/constants/modelSupportedEndpoints.ts");
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("decisions"), ["decisions"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("Decisions "), ["decisions"]);
});
