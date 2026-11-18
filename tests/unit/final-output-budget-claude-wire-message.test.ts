import test from "node:test";
import assert from "node:assert/strict";

const { enforceFinalOutputTokenBudget } =
  await import("../../open-sse/handlers/chatCore/finalOutputBudget.ts");
const { isContextOverflow400 } = await import("../../open-sse/services/combo/comboPredicates.ts");

const base = {
  body: { messages: [{ role: "user", content: "hi" }], max_tokens: 1024 },
  finalEstimatedInputTokens: 210_724,
  finalContextLimit: 200_000,
  contextWindowChecksDisabled: false,
  modelOutputCap: null,
  effectiveInputCap: null,
  provider: "opencode",
  effectiveModel: "mimo-v2.5-free",
  targetFormat: "openai",
};

test("Anthropic Messages clients get the compactable 'prompt is too long' message", () => {
  const result = enforceFinalOutputTokenBudget({ ...base, sourceFormat: "claude" });

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.message, "prompt is too long: 210724 tokens > 200000 maximum");
  assert.equal(
    isContextOverflow400(result.message),
    true,
    "combo fallback must still see overflow"
  );
});

test("Anthropic Messages clients get the input cap in the same phrase", () => {
  const result = enforceFinalOutputTokenBudget({
    ...base,
    sourceFormat: "claude",
    effectiveInputCap: 128_000,
  });

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.message, "prompt is too long: 210724 tokens > 128000 maximum");
});

test("OpenAI clients keep the provider-aware overflow message", () => {
  const result = enforceFinalOutputTokenBudget({ ...base, sourceFormat: "openai" });

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.message, /^Input exceeds context window for opencode\/mimo-v2\.5-free: /);
});
