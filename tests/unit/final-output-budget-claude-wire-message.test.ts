import test from "node:test";
import assert from "node:assert/strict";

const { enforceFinalOutputTokenBudget, requiredOutputHeadroom } =
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

test("cache-stable compaction reserves translator output headroom before the final gate", () => {
  const body = { messages: [{ role: "user", content: "history" }] };
  const headroom = requiredOutputHeadroom(body, "openai", "claude");
  assert.equal(headroom, 64_000);
  const result = enforceFinalOutputTokenBudget({
    ...base,
    body,
    finalEstimatedInputTokens: 150_000,
    sourceFormat: "openai",
    targetFormat: "claude",
    finalContextLimit: 200_000,
  });
  assert.equal(result.ok, false, "without early compaction, the final gate rejects");
  assert.equal(150_000 >= 200_000 - headroom, true, "early guard must compact");
  assert.equal(requiredOutputHeadroom({ ...body, max_tokens: 1024 }, "openai", "claude"), 0);
  assert.equal(requiredOutputHeadroom(body, "claude", "claude"), 0);
  assert.equal(requiredOutputHeadroom(body, "openai", "openai"), 0);
});

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
