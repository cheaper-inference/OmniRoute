import test from "node:test";
import assert from "node:assert/strict";

import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

type Config = { thinkingLevel?: string; includeThoughts?: boolean; thinkingBudget?: number };
const messages = [{ role: "user", content: "Reply exactly OK" }];

function thinkingConfig(
  body: Record<string, unknown>,
  model = "gemini-3.5-flash-lite"
): Config | undefined {
  const result = openaiToGeminiRequest(model, { messages, ...body }, false);
  return result.generationConfig?.thinkingConfig as Config | undefined;
}

test("Gemini 3.5 Flash-Lite uses native minimal instead of numeric budget by default", () => {
  assert.deepEqual(thinkingConfig({}), {
    thinkingLevel: "minimal",
    includeThoughts: true,
  });
});

test("native Gemini thinking levels respect effort and explicit opt-outs", () => {
  const cases: Array<[string, Record<string, unknown>, string, boolean]> = [
    ["none", { reasoning_effort: "none" }, "minimal", false],
    ["minimal", { reasoning_effort: "minimal" }, "minimal", true],
    ["low", { reasoning_effort: "low" }, "low", true],
    ["medium", { reasoning_effort: "medium" }, "medium", true],
    ["high", { reasoning_effort: "high" }, "high", true],
    ["xhigh", { reasoning_effort: "xhigh" }, "high", true],
    ["disabled", { thinking: { type: "disabled" } }, "minimal", false],
    ["false", { thinking: false }, "minimal", false],
    ["zero budget", { thinking: { budget_tokens: 0 } }, "minimal", false],
    ["negative budget", { thinking: { budget_tokens: -5 } }, "minimal", false],
    ["legacy 4096", { thinking: { type: "enabled", budget_tokens: 4096 } }, "medium", true],
    ["effort overrides disabled", {
      reasoning_effort: "high", thinking: { type: "disabled" },
    }, "high", true],
    ["explicit overrides none", {
      thinkingLevel: "low", reasoning_effort: "none",
    }, "low", true],
    ["explicit overrides disabled", {
      thinking_level: "medium", thinking: false,
    }, "medium", true],
  ];
  for (const [label, input, level, includeThoughts] of cases) {
    const actual = thinkingConfig(input);
    assert.deepEqual(actual, { thinkingLevel: level, includeThoughts }, label);
    assert.equal(actual?.thinkingBudget, undefined, label);
  }
});

test("Gemini native explicit level works with uppercase and nested overrides", () => {
  assert.deepEqual(thinkingConfig({
    reasoning_effort: "high",
    thinkingLevel: "LOW",
  }), { thinkingLevel: "low", includeThoughts: true });
  assert.deepEqual(thinkingConfig({
    reasoning_effort: "high",
    generationConfig: { thinkingConfig: { thinkingLevel: "medium" } },
  }), { thinkingLevel: "medium", includeThoughts: true });
});

test("legacy Gemini thinking budgets are preserved on models without enum metadata", () => {
  const legacy = thinkingConfig({ reasoning_effort: "low" }, "gemini-2.5-flash");
  assert.equal(legacy?.thinkingLevel, undefined);
  assert.equal(typeof legacy?.thinkingBudget, "number");
});
