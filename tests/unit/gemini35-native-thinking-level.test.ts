import test from "node:test";
import assert from "node:assert/strict";

import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

interface NativeThinkingConfig {
  thinkingLevel?: string;
  includeThoughts?: boolean;
  thinkingBudget?: number;
}

function nativeThinking(request: Record<string, unknown> = {}): NativeThinkingConfig {
  const converted = openaiToGeminiRequest(
    "gemini-3.5-flash-lite",
    {
      messages: [{ role: "user", content: "Reply exactly OK" }],
      ...request,
    },
    false
  ) as unknown as { generationConfig: { thinkingConfig?: NativeThinkingConfig } };
  return converted.generationConfig.thinkingConfig ?? {};
}

test("Gemini 3.5 Flash-Lite uses native minimal thinking by default", () => {
  assert.deepEqual(nativeThinking(), {
    thinkingLevel: "minimal",
    includeThoughts: true,
  });
});

test("Gemini 3.5 Flash-Lite maps OpenAI effort to native levels", () => {
  const cases = [
    ["none", "minimal", false],
    ["minimal", "minimal", true],
    ["low", "low", true],
    ["medium", "medium", true],
    ["high", "high", true],
    ["xhigh", "high", true],
    ["auto", "high", true],
  ] as const;
  for (const [effort, level, includeThoughts] of cases) {
    assert.deepEqual(
      nativeThinking({ reasoning_effort: effort }),
      { thinkingLevel: level, includeThoughts },
      effort
    );
  }
});

test("Gemini 3.5 Flash-Lite maps numeric budgets without sending thinkingBudget", () => {
  assert.deepEqual(nativeThinking({ thinking: { type: "enabled", budget_tokens: 4096 } }), {
    thinkingLevel: "medium",
    includeThoughts: true,
  });
});

test("Gemini native level preserves summary opt-outs only when they win", () => {
  const cases: Array<{
    name: string;
    request: Record<string, unknown>;
    level: string;
    includeThoughts: boolean;
  }> = [
    { name: "disabled thinking", request: { thinking: { type: "disabled" } }, level: "minimal", includeThoughts: false },
    { name: "thinking false", request: { thinking: false }, level: "minimal", includeThoughts: false },
    { name: "zero budget", request: { thinking: { budget_tokens: 0 } }, level: "minimal", includeThoughts: false },
    { name: "negative budget", request: { thinking: { budget_tokens: -20 } }, level: "minimal", includeThoughts: false },
    { name: "effort overrides disabled", request: { reasoning_effort: "high", thinking: { type: "disabled" } }, level: "high", includeThoughts: true },
    { name: "effort overrides zero", request: { reasoning_effort: "low", thinking: { budget_tokens: 0 } }, level: "low", includeThoughts: true },
    { name: "explicit overrides none", request: { thinkingLevel: "high", reasoning_effort: "none" }, level: "high", includeThoughts: true },
    { name: "explicit overrides disabled", request: { thinkingLevel: "low", thinking: { type: "disabled" } }, level: "low", includeThoughts: true },
  ];
  for (const item of cases) {
    assert.deepEqual(
      nativeThinking(item.request),
      { thinkingLevel: item.level, includeThoughts: item.includeThoughts },
      item.name
    );
  }
});

test("Gemini native thinkingLevel wins over both default and OpenAI effort", () => {
  for (const [levelField, requested, expected] of [
    ["thinkingLevel", "LOW", "low"],
    ["thinking_level", "medium", "medium"],
  ] as const) {
    assert.deepEqual(
      nativeThinking({ [levelField]: requested, reasoning_effort: "high" }),
      { thinkingLevel: expected, includeThoughts: true }
    );
  }
  assert.deepEqual(
    nativeThinking({
      reasoning_effort: "high",
      generationConfig: { thinkingConfig: { thinkingLevel: "low" } },
    }),
    { thinkingLevel: "low", includeThoughts: true }
  );
});
