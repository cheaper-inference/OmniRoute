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

test("cacheable Claude translation reserves fitted manual thinking plus response output", () => {
  const body = {
    messages: [{ role: "user", content: "history" }],
    max_tokens: 32_768,
    thinking: { type: "enabled", budget_tokens: 16_384 },
  };
  const headroom = requiredOutputHeadroom(body, "openai", "claude", "claude-sonnet-4-5", "claude");
  assert.equal(headroom, 49_152);
  assert.equal(162_000 >= 200_000 - headroom, true);
  assert.equal(requiredOutputHeadroom({ ...body, thinking: undefined }, "openai", "claude"), 0);
  assert.equal(
    requiredOutputHeadroom(
      { ...body, max_tokens: undefined },
      "openai",
      "claude",
      "claude-sonnet-4-5",
      "claude"
    ),
    64_000
  );
});

test("forced Claude tools do not reserve suppressed thinking output", () => {
  const body = {
    messages: [{ role: "user", content: "history" }],
    max_tokens: 32_768,
    thinking: { type: "enabled", budget_tokens: 16_384 },
  };
  for (const tool_choice of [
    "required",
    { type: "function", function: { name: "inspect" } },
    { type: "allowed_tools", allowed_tools: { mode: "required", tools: [] } },
  ]) {
    assert.equal(
      requiredOutputHeadroom(
        { ...body, tool_choice },
        "openai",
        "claude",
        "claude-sonnet-4-5",
        "claude"
      ),
      0,
      "the final gate caps explicit response tokens; the forced tool suppresses thinking"
    );
  }
});

test("Responses reasoning effort is reserved before the pivot promotes it", () => {
  // #21057 review: the headroom gate reads the pre-pivot Responses body, where the
  // effort still lives in `reasoning.effort`; the Responses→Chat pivot promotes it
  // to `reasoning_effort` only later, after the last-resort compaction decision.
  const body = {
    input: [{ role: "user", content: "history" }],
    // sanitizeChatRequestBody renames Responses `max_output_tokens` → `max_tokens`
    // for non-Responses targets before the gate runs.
    max_tokens: 32_768,
    reasoning: { effort: "medium" },
  };
  const headroom = requiredOutputHeadroom(
    body,
    "openai-responses",
    "claude",
    "claude-sonnet-4-5",
    "claude"
  );
  assert.equal(headroom, 43_008, "32,768 response + 10,240 medium thinking");
  assert.equal(
    162_000 >= 200_000 - headroom,
    true,
    "the review repro (162k input, effort medium) must trigger last-resort compaction"
  );
  assert.equal(
    requiredOutputHeadroom(
      { ...body, reasoning: undefined },
      "openai-responses",
      "claude",
      "claude-sonnet-4-5",
      "claude"
    ),
    0,
    "without Responses reasoning the explicit limit reserves nothing extra"
  );
});

test("Bedrock's OpenAI-format path reserves the executor's fitted thinking budget", () => {
  // #21057 review: Bedrock declares registry format "openai", but its Converse
  // executor (claudeThinkingFields → fitThinkingToMaxTokens) raises
  // inferenceConfig.maxTokens above the response limit after the budget gate.
  const body = {
    messages: [{ role: "user", content: "history" }],
    max_tokens: 32_768,
    thinking: { type: "enabled", budget_tokens: 16_384 },
  };
  const headroom = requiredOutputHeadroom(
    body,
    "openai",
    "openai",
    "anthropic.claude-sonnet-4-5",
    "bedrock"
  );
  assert.equal(headroom, 49_152, "the executor sends 49,152 output tokens for this body");
  assert.equal(
    162_000 >= 200_000 - headroom,
    true,
    "the review repro (162k input) must trigger last-resort compaction"
  );
  assert.equal(
    requiredOutputHeadroom(
      { ...body, thinking: undefined, reasoning_effort: "medium" },
      "openai",
      "openai",
      "anthropic.claude-sonnet-4-5",
      "bedrock"
    ),
    43_008,
    "an OpenAI reasoning_effort is reserved the same way"
  );
  assert.equal(
    requiredOutputHeadroom(body, "openai", "openai", "meta.llama4-scout-17b", "bedrock"),
    0,
    "non-Claude Bedrock models get no thinking reserve"
  );
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
