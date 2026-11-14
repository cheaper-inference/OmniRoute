import assert from "node:assert/strict";
import test from "node:test";

import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

test("speech-only static models advertise the speech operation", () => {
  // ElevenLabs also lists its Scribe transcription models; the TTS models stay speech-only.
  const models = (getStaticModelsForProvider("elevenlabs") || []).filter(
    (model) => !model.id.startsWith("scribe_")
  );

  assert.ok(models.length > 0);
  assert.ok(models.every((model) => model.supportedEndpoints?.includes("audio-speech")));
  assert.ok(models.every((model) => !model.supportedEndpoints?.includes("audio")));
});

test("ElevenLabs Scribe models advertise only the transcription operation", () => {
  const scribe = (getStaticModelsForProvider("elevenlabs") || []).filter((model) =>
    model.id.startsWith("scribe_")
  );

  assert.deepEqual(
    scribe.map((model) => model.id),
    ["scribe_v1", "scribe_v2"]
  );
  assert.ok(scribe.every((model) => model.supportedEndpoints?.join() === "audio-transcriptions"));
});

test("transcription-only static models advertise the transcription operation", () => {
  const models = getStaticModelsForProvider("gladia") || [];

  assert.ok(models.length > 0);
  assert.ok(models.every((model) => model.supportedEndpoints?.includes("audio-transcriptions")));
  assert.ok(models.every((model) => !model.supportedEndpoints?.includes("audio")));
});
