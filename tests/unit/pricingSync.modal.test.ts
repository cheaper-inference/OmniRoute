import { test } from "node:test";
import assert from "node:assert/strict";
import { transformToOmniRoute } from "../../src/lib/pricingSync.ts";

test("transformToOmniRoute maps LiteLLM's annotated OCR tariff without scaling USD per page", () => {
  const out = transformToOmniRoute({
    "mistral-ocr-latest": {
      mode: "ocr",
      litellm_provider: "mistral",
      ocr_cost_per_page: 0.004,
      annotation_cost_per_page: 0.005,
    },
  });
  assert.equal(out.mistral?.["mistral-ocr-latest"]?.ocr_cost_per_page, 0.004);
  assert.equal(out.mistral?.["mistral-ocr-latest"]?.ocr_cost_per_annotated_page, 0.005);
  assert.equal(Object.hasOwn(out.mistral["mistral-ocr-latest"], "annotation_cost_per_page"), false);
});

test("an annotation-only LiteLLM entry is retained without token or ordinary OCR rates", () => {
  const out = transformToOmniRoute({
    "mistral/annotation-only": {
      mode: "ocr",
      litellm_provider: "mistral",
      annotation_cost_per_page: 0.005,
    },
  });
  assert.equal(out.mistral?.["annotation-only"]?.ocr_cost_per_annotated_page, 0.005);
  assert.equal(out.mistral["annotation-only"].ocr_cost_per_page, undefined);
});

test("an explicitly free annotation-only rate remains a known zero", () => {
  const out = transformToOmniRoute({
    free: { litellm_provider: "mistral", annotation_cost_per_page: 0 },
  });
  assert.equal(out.mistral?.free?.ocr_cost_per_annotated_page, 0);
});

for (const canonical of [0, 0.007]) {
  test(`the explicit OmniRoute annotated tariff ${canonical} takes precedence over the LiteLLM alias`, () => {
    const out = transformToOmniRoute({
      explicit: {
        litellm_provider: "mistral",
        annotation_cost_per_page: 0.005,
        ocr_cost_per_annotated_page: canonical,
      },
    });
    assert.equal(out.mistral?.explicit?.ocr_cost_per_annotated_page, canonical);
  });
}

test("legacy canonical-only annotated tariff input remains supported", () => {
  const out = transformToOmniRoute({
    legacy: { litellm_provider: "mistral", ocr_cost_per_annotated_page: 0.007 },
  });
  assert.equal(out.mistral?.legacy?.ocr_cost_per_annotated_page, 0.007);
});

test("a discarded non-finite canonical field can fall back to the valid LiteLLM alias", () => {
  const out = transformToOmniRoute({
    fallback: {
      litellm_provider: "mistral",
      ocr_cost_per_annotated_page: NaN,
      annotation_cost_per_page: 0.005,
    },
  });
  assert.equal(out.mistral?.fallback?.ocr_cost_per_annotated_page, 0.005);
});

for (const invalid of [-1, NaN, Infinity, -Infinity, "0.005", null, undefined]) {
  test(`invalid annotation-only tariff ${String(invalid)} does not invent a free model`, () => {
    const raw = {
      invalid: { litellm_provider: "mistral", annotation_cost_per_page: invalid },
    } as unknown as Parameters<typeof transformToOmniRoute>[0];
    assert.deepEqual(transformToOmniRoute(raw), {});
  });
}

test("ordinary OCR pricing never invents an annotated tariff", () => {
  const out = transformToOmniRoute({
    ordinary: { litellm_provider: "mistral", ocr_cost_per_page: 0.004 },
  });
  assert.equal(out.mistral?.ordinary?.ocr_cost_per_page, 0.004);
  assert.equal(out.mistral.ordinary.ocr_cost_per_annotated_page, undefined);
});

test("transformToOmniRoute ingests an image model's per-image cost", () => {
  const out = transformToOmniRoute({
    "dall-e-3": {
      mode: "image_generation",
      litellm_provider: "openai",
      output_cost_per_image: 0.04,
    },
  });
  assert.equal(out.openai?.["dall-e-3"]?.output_cost_per_image, 0.04);
});
test("transformToOmniRoute ingests an audio (per-second) model", () => {
  const out = transformToOmniRoute({
    "whisper-1": {
      mode: "audio_transcription",
      litellm_provider: "openai",
      input_cost_per_second: 0.0001,
    },
  });
  assert.equal(out.openai?.["whisper-1"]?.input_cost_per_second, 0.0001);
});
test("transformToOmniRoute still ingests chat token pricing (no regression)", () => {
  const out = transformToOmniRoute({
    "gpt-4o": {
      mode: "chat",
      litellm_provider: "openai",
      input_cost_per_token: 0.0000025,
      output_cost_per_token: 0.00001,
    },
  });
  assert.equal(out.openai?.["gpt-4o"]?.input, 2.5);
  assert.equal(out.openai?.["gpt-4o"]?.output, 10);
});
test("transformToOmniRoute maps newly-covered providers", () => {
  const out = transformToOmniRoute({
    "mistral-large": {
      mode: "chat",
      litellm_provider: "mistral",
      input_cost_per_token: 0.000002,
      output_cost_per_token: 0.000006,
    },
    "grok-2": {
      mode: "chat",
      litellm_provider: "xai",
      input_cost_per_token: 0.000002,
      output_cost_per_token: 0.00001,
    },
  });
  assert.ok(out.mistral?.["mistral-large"]);
  assert.ok(out.xai?.["grok-2"]);
});
