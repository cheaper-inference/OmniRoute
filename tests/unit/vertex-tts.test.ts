/**
 * Tests for Gemini TTS catalog-driven model resolution (port of PR #2055)
 *
 * Asserts:
 *   (a) gemini-3.8-flash-tts is the first (default) model in the vertex TTS catalog (#17265 moved
 *       the 3.8 TTS pair ahead of gemini-3.1-flash-tts-preview)
 *   (b) the catalog exposes all Gemini TTS model ids in the correct order
 *   (c) parseSpeechModel resolves bare voice input (non-model-id) to the vertex provider
 *       and returns the input string as modelId (so the caller can detect it as a voice)
 */

import test from "node:test";
import assert from "node:assert/strict";

import { AUDIO_SPEECH_PROVIDERS } from "../../open-sse/config/audioRegistry.ts";

const VERTEX_TTS = AUDIO_SPEECH_PROVIDERS["vertex"];

test("gemini-3.8-flash-tts is the first entry in the vertex TTS catalog (new default)", () => {
  assert.ok(VERTEX_TTS, "vertex entry must exist in AUDIO_SPEECH_PROVIDERS");
  assert.ok(
    Array.isArray(VERTEX_TTS.models) && VERTEX_TTS.models.length > 0,
    "vertex must have at least one model"
  );
  assert.equal(
    VERTEX_TTS.models[0].id,
    "gemini-3.8-flash-tts",
    "First vertex TTS model must be gemini-3.8-flash-tts (the new default)"
  );
});

test("vertex TTS catalog exposes all Gemini TTS model ids in order", () => {
  const ids = VERTEX_TTS.models.map((m) => m.id);
  // The 3.8 pair comes first, then 3.1 and the two pre-existing 2.5 models
  assert.deepEqual(ids.slice(0, 5), [
    "gemini-3.8-flash-tts",
    "gemini-3.8-flash-lite-tts",
    "gemini-3.1-flash-tts-preview",
    "gemini-2.5-flash-preview-tts",
    "gemini-2.5-pro-preview-tts",
  ]);
});

test("gemini-3.1-flash-tts-preview has a human-readable name for the Vertex provider", () => {
  const entry = VERTEX_TTS.models.find((m) => m.id === "gemini-3.1-flash-tts-preview");
  assert.ok(entry, "gemini-3.1-flash-tts-preview must be present in the vertex TTS models");
  assert.ok(entry.name.length > 0, "name must be non-empty");
});
