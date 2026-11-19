// Claude `thinking: {type: "disabled"}` and `output_config.effort: "none"` mean "no thinking".
// Gemini 2.5 thinks dynamically when no thinkingConfig is sent, so the off switch has to be
// explicit, as the OpenAI to Gemini path already does for reasoning_effort "none".
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");

const user = [{ role: "user", content: [{ type: "text", text: "hi" }] }];
const thinkingConfig = (model: string, extra: Record<string, unknown>) =>
  (
    claudeToGeminiRequest(model, { messages: user, ...extra }, false) as {
      generationConfig: { thinkingConfig?: Record<string, unknown> };
    }
  ).generationConfig.thinkingConfig;

test("thinking disabled sends an explicit zero budget to gemini-2.5-flash", () => {
  assert.deepEqual(thinkingConfig("gemini-2.5-flash", { thinking: { type: "disabled" } }), {
    thinkingBudget: 0,
    includeThoughts: false,
  });
});

test("output_config.effort none sends an explicit zero budget to gemini-2.5-flash", () => {
  assert.deepEqual(thinkingConfig("gemini-2.5-flash", { output_config: { effort: "none" } }), {
    thinkingBudget: 0,
    includeThoughts: false,
  });
});

test("a Flash-Lite model gets no thinkingBudget 0 (it answers 400), only includeThoughts false", () => {
  assert.deepEqual(thinkingConfig("gemini-2.5-flash-lite", { thinking: { type: "disabled" } }), {
    includeThoughts: false,
  });
});

test("a model that rejects any thinkingConfig still gets none", () => {
  assert.equal(
    thinkingConfig("gemini-2.5-flash-preview-tts", { thinking: { type: "disabled" } }),
    undefined
  );
});

test("guard: no thinking field sends no thinkingConfig", () => {
  assert.equal(thinkingConfig("gemini-2.5-flash", {}), undefined);
});

test("guard: an enabled budget is unchanged", () => {
  assert.deepEqual(
    thinkingConfig("gemini-2.5-flash", { thinking: { type: "enabled", budget_tokens: 2048 } }),
    { thinkingBudget: 2048, includeThoughts: true }
  );
});

test("gemini-2.5-pro cannot switch thinking off, so it gets no zero budget", () => {
  // Gemini 2.5 Pro takes a budget of 128..32768 and answers 400 to thinkingBudget 0.
  for (const extra of [{ thinking: { type: "disabled" } }, { output_config: { effort: "none" } }]) {
    assert.equal(thinkingConfig("gemini-2.5-pro", extra), undefined);
    assert.equal(thinkingConfig("gemini-2.5-pro-preview-06-05", extra), undefined);
  }
});

test("an enabled numeric budget keeps priority over output_config.effort none", () => {
  assert.deepEqual(
    thinkingConfig("gemini-2.5-flash", {
      thinking: { type: "enabled", budget_tokens: 1024 },
      output_config: { effort: "none" },
    }),
    { thinkingBudget: 1024, includeThoughts: true }
  );
});
