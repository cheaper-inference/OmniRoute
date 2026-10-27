/** Local subset guards, not a claim to detect every interpretation by a provider. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateSystemOneBackendBody } from "../../open-sse/services/typesafe/systemOneAnswers.ts";
import { resolveSystemOneCandidates } from "../../open-sse/config/systemOneRegistry.ts";
import { dispatchSystemOne } from "../../src/app/api/v1/systemone/dispatch.ts";
const providers = [
  ["liquid", "d1.1"],
  ["perplexity", "pplx-decider-latest"],
  ["inception", "mercury-decide"],
  ["baseten", "decision-models/baseten-elephant-9b-latest"],
  ["fireworks", "accounts/synthetic/models/decision"],
] as const;
const body = (model: string, state: unknown) => ({
  model,
  state,
  questions: { q: { type: "noul", instructions: "Synthetic?" } },
});
const parts = [
  { type: "image_url", image_url: { url: "https://example.invalid/synthetic.png" } },
  { type: "input_image", image_url: "data:image/png;base64,AA==" },
  { type: "image", source: { type: "base64", media_type: "image/png", data: "AA==" } },
  { type: "input_audio", input_audio: { data: "AA==", format: "wav" } },
  { type: "audio_url", audio_url: { url: "https://example.invalid/synthetic.wav" } },
  { type: "video_url", video_url: { url: "https://example.invalid/synthetic.mp4" } },
];
for (const [provider, model] of providers) {
  test(`${provider} recognized framed media is rejected before credentials or physical dispatch`, async () => {
    for (const part of parts) {
      let selections = 0,
        calls = 0;
      const response = await dispatchSystemOne(
        {
          candidates: resolveSystemOneCandidates(`${provider}/${model}`),
          requestedModel: `${provider}/${model}`,
          body: body(model, { messages: [{ role: "user", content: [part] }] }),
        },
        {
          authorizeAttempt: async () => null,
          selectCredentials: async () => {
            selections++;
            return { apiKey: "synthetic" };
          },
          clearRecoveredProviderState: async () => {},
          dispatch: async () => {
            calls++;
            return Response.json({});
          },
        }
      );
      assert.equal(response.status, 400);
      assert.equal(selections, 0);
      assert.equal(calls, 0);
    }
  });
  test(`${provider} ordinary JSON, URLs, and unframed type examples remain data`, () => {
    assert.equal(
      validateSystemOneBackendBody(
        provider,
        body(model, {
          type: "image",
          url: "https://example.invalid/manual",
          documentation: "image_url parts and input_audio are deferred",
          example: { type: "image_url", description: "A schema name without a payload" },
        })
      ).ok,
      true
    );
    assert.equal(
      validateSystemOneBackendBody(
        provider,
        body(model, "A URL https://example.invalid/image.png is ordinary synthetic text")
      ).ok,
      true
    );
  });
}
test("subset traversal is bounded and legacy native backends are unchanged", () => {
  assert.equal(
    validateSystemOneBackendBody(
      "liquid",
      body(
        "d1.1",
        Array.from({ length: 17000 }, () => null)
      )
    ).ok,
    false
  );
  const oversized = validateSystemOneBackendBody("liquid", body("d1.1", "x".repeat(1_048_576)));
  assert.equal(oversized.ok, false);
  if (!oversized.ok) assert.equal(oversized.status, 413);
  assert.equal(
    validateSystemOneBackendBody("typesafe", body("jev-1.14.0", { synthetic: parts[0] })).ok,
    true
  );
});
