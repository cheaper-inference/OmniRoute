/**
 * Gemini 3.8 / 4 (thinkingLevel models, e.g. agy/gemini-4-argon-high) must stream
 * thought summaries by default, like every other Gemini thinking path (#4170).
 * Without includeThoughts the upstream emits nothing while the model thinks, so a
 * long think is indistinguishable from a stalled stream and gets cut off by the
 * response-start deadline. Clients can still opt out with include_thoughts: false.
 *
 * Tests hit the translator write sites (OpenAI, Antigravity envelope, Claude).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest, openaiToAntigravityRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");

type ThinkingConfig = {
  thinkingBudget?: number;
  thinkingLevel?: string;
  includeThoughts?: boolean;
};
type GeminiReq = { generationConfig?: { thinkingConfig?: ThinkingConfig } };
type EnvelopeReq = { request?: { generationConfig?: { thinkingConfig?: ThinkingConfig } } };

const body = (extra: Record<string, unknown> = {}) => ({
  messages: [{ role: "user", content: "hi" }],
  max_tokens: 16000,
  ...extra,
});

const MODELS = ["gemini-4-argon-high", "gemini-3.8-flash-high"];

for (const model of MODELS) {
  test(`${model}: no reasoning knob still streams thoughts`, () => {
    const r = openaiToGeminiRequest(model, body(), true) as GeminiReq;
    assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, true);
    assert.ok(r.generationConfig?.thinkingConfig?.thinkingLevel);
    assert.equal(r.generationConfig?.thinkingConfig?.thinkingBudget, undefined);
  });

  test(`${model}: reasoning_effort high streams thoughts`, () => {
    const r = openaiToGeminiRequest(model, body({ reasoning_effort: "high" }), true) as GeminiReq;
    assert.deepEqual(r.generationConfig?.thinkingConfig, {
      thinkingLevel: "high",
      includeThoughts: true,
    });
  });

  test(`${model}: Antigravity envelope streams thoughts by default`, () => {
    const r = openaiToAntigravityRequest(model, body({ reasoning_effort: "high" }), true, {
      projectId: "proj-default-thoughts",
    }) as EnvelopeReq;
    assert.equal(r.request?.generationConfig?.thinkingConfig?.includeThoughts, true);
  });

  test(`${model}: claude thinking.budget_tokens streams thoughts`, () => {
    const r = claudeToGeminiRequest(
      model,
      {
        messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
        max_tokens: 16000,
        thinking: { type: "enabled", budget_tokens: 8192 },
      },
      true
    ) as GeminiReq;
    assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, true);
  });

  test(`${model}: include_thoughts false opts out`, () => {
    for (const optOut of [{ include_thoughts: false }, { includeThoughts: false }]) {
      const r = openaiToGeminiRequest(
        model,
        body({ reasoning_effort: "high", ...optOut }),
        true
      ) as GeminiReq;
      assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, undefined);
      assert.equal(r.generationConfig?.thinkingConfig?.thinkingLevel, "high");
    }
  });
}
