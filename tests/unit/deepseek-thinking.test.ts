import test from "node:test";
import assert from "node:assert/strict";

const { isDeepSeekThinkingActive, isDeepSeekThinkingModel, shouldDropForcedToolChoiceForDeepSeek } =
  await import("../../open-sse/services/deepseekThinking.ts");
const { isForcedToolChoice } = await import("../../src/shared/constants/modelSpecs.ts");

const NAMED = { type: "function", function: { name: "lookup" } };

test("isForcedToolChoice flags required, any and named-tool choices only", () => {
  for (const choice of [
    "required",
    "any",
    NAMED,
    { type: "tool", name: "lookup" },
    { type: "any" },
  ]) {
    assert.equal(isForcedToolChoice(choice), true, JSON.stringify(choice));
  }
  for (const choice of ["auto", "none", undefined, null, [], {}]) {
    assert.equal(isForcedToolChoice(choice), false, JSON.stringify(choice));
  }
});

test("thinking models are native DeepSeek V4, V4.1 and the deepseek-flash alias", () => {
  for (const model of [
    "deepseek-v4-pro",
    "deepseek-v4-flash",
    "deepseek-v4.1-flash",
    "deepseek-flash",
    "deepseek/deepseek-v4-pro",
  ]) {
    assert.equal(isDeepSeekThinkingModel("deepseek", model), true, model);
  }
  assert.equal(isDeepSeekThinkingModel("deepseek", "deepseek-chat"), false);
  assert.equal(isDeepSeekThinkingModel("openrouter", "deepseek-v4-pro"), false);
  assert.equal(isDeepSeekThinkingModel("deepseek", undefined), false);
});

test("thinking is on unless a thinking object disables it or reasoning_effort is none", () => {
  assert.equal(isDeepSeekThinkingActive({}), true);
  assert.equal(isDeepSeekThinkingActive({ reasoning_effort: "high" }), true);
  assert.equal(isDeepSeekThinkingActive({ thinking: { type: "enabled" } }), true);
  assert.equal(isDeepSeekThinkingActive({ thinking: null, reasoning_effort: "max" }), true);
  assert.equal(isDeepSeekThinkingActive({ thinking: { type: "disabled" } }), false);
  assert.equal(isDeepSeekThinkingActive({ reasoning_effort: "none" }), false);
  assert.equal(isDeepSeekThinkingActive({ reasoning_effort: " None " }), false);
  assert.equal(isDeepSeekThinkingActive({ thinking: null, reasoning_effort: "none" }), false);
});

test("a thinking object outranks reasoning_effort", () => {
  assert.equal(
    isDeepSeekThinkingActive({ thinking: { type: "enabled" }, reasoning_effort: "none" }),
    true
  );
  assert.equal(
    isDeepSeekThinkingActive({ thinking: { type: "disabled" }, reasoning_effort: "high" }),
    false
  );
});

test("drops only a forced choice with thinking on for a DeepSeek V4 target", () => {
  const model = "deepseek-v4-pro";
  const drop = (body: Record<string, unknown>, provider = "deepseek") =>
    shouldDropForcedToolChoiceForDeepSeek(body, provider, model);
  assert.equal(drop({ tool_choice: "required" }), true);
  assert.equal(drop({ tool_choice: NAMED }), true);
  assert.equal(drop({ tool_choice: "auto" }), false);
  assert.equal(drop({ tool_choice: "none" }), false);
  assert.equal(drop({}), false);
  assert.equal(drop({ tool_choice: "required", reasoning_effort: "none" }), false);
  assert.equal(drop({ tool_choice: "required" }, "openrouter"), false);
});
