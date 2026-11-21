import assert from "node:assert/strict";
import test from "node:test";

import {
  openaiToAntigravityRequest,
  openaiToGeminiRequest,
} from "../../open-sse/translator/request/openai-to-gemini.ts";
import { claudeToGeminiRequest } from "../../open-sse/translator/request/claude-to-gemini.ts";

const openaiBody = {
  messages: [{ role: "user", content: "ping" }],
  max_tokens: 65536,
};
const claudeBody = {
  ...openaiBody,
  messages: [{ role: "user", content: [{ type: "text", text: "ping" }] }],
};

test("Gemini 4 fixed tier IDs are the default thinking level across translators", () => {
  for (const model of [
    "gemini-4-argon-high",
    "gemini-4-carbon-low",
    "gemini-4-carbon-high",
    "gemini-4-hydrogen-medium",
    "gemini-4-hydrogen-xhigh",
    "gemini-4-neon-low",
    "gemini-4-neon-xhigh",
  ]) {
    const expected = { thinkingLevel: model.split("-").at(-1), includeThoughts: true };
    const direct = openaiToGeminiRequest(`gemini/${model}`, openaiBody, false);
    const agy = openaiToAntigravityRequest(model, openaiBody, false, { projectId: "test-project" });
    const claude = claudeToGeminiRequest(model, claudeBody, false);
    assert.deepEqual(direct.generationConfig.thinkingConfig, expected, model);
    assert.deepEqual(agy.request.generationConfig.thinkingConfig, expected, model);
    assert.deepEqual(claude.generationConfig.thinkingConfig, expected, model);
  }
});

for (const [name, thinking] of [
  ['thinking.type="disabled"', { type: "disabled" }],
  ["thinking=false", false],
] as const) {
  test(`Claude ${name} overrides the Gemini 4 Hydrogen xhigh default`, () => {
    const result = claudeToGeminiRequest(
      "gemini-4-hydrogen-xhigh",
      { ...claudeBody, thinking },
      false
    );
    assert.deepEqual(result.generationConfig.thinkingConfig, {
      thinkingLevel: "low",
      includeThoughts: false,
    });
  });
}

test("Claude explicit level, budget and effort retain priority over the Gemini 4 fixed-tier default", () => {
  const model = "gemini-4-hydrogen-xhigh";
  for (const [request, expected] of [
    [
      {
        thinkingLevel: "medium",
        thinking: { type: "disabled" },
        output_config: { effort: "high" },
      },
      { thinkingLevel: "medium", includeThoughts: true },
    ],
    [
      { thinking: { type: "disabled" }, output_config: { effort: "high" } },
      { thinkingLevel: "high", includeThoughts: true },
    ],
    [
      { thinking: { type: "enabled", budget_tokens: 0 }, output_config: { effort: "high" } },
      { thinkingLevel: "low" },
    ],
  ]) {
    const result = claudeToGeminiRequest(model, { ...claudeBody, ...request }, false);
    assert.deepEqual(result.generationConfig.thinkingConfig, expected, JSON.stringify(request));
  }
});

test("Gemini 4 native levels retain explicit overrides and distinguish none and minimal", () => {
  for (const family of ["argon", "carbon", "hydrogen", "neon"]) {
    const model = `gemini-4-${family}`;
    for (const effort of ["none", "minimal"]) {
      const expected = { thinkingLevel: "low", includeThoughts: effort !== "none" };
      const openai = openaiToGeminiRequest(
        model,
        { ...openaiBody, reasoning_effort: effort },
        false
      );
      const claude = claudeToGeminiRequest(
        model,
        { ...claudeBody, output_config: { effort } },
        false
      );
      assert.deepEqual(openai.generationConfig.thinkingConfig, expected, `${family}: ${effort}`);
      assert.deepEqual(claude.generationConfig.thinkingConfig, expected, `${family}: ${effort}`);
    }
    const override = openaiToGeminiRequest(
      `${model}-high`,
      { ...openaiBody, thinkingLevel: "low", reasoning_effort: "high" },
      false
    );
    assert.deepEqual(override.generationConfig.thinkingConfig, {
      thinkingLevel: "low",
      includeThoughts: true,
    });
  }
});

test("Gemini 4 uses xhigh only for supported models when effort or budget asks for it", () => {
  for (const family of ["argon", "carbon", "hydrogen", "neon"]) {
    const model = `gemini-4-${family}`;
    const requested = family === "hydrogen" || family === "neon" ? "xhigh" : "high";
    for (const extra of [
      { reasoning_effort: "xhigh" },
      { reasoning_effort: "max" },
      { thinking: { type: "enabled", budget_tokens: 24577 } },
    ]) {
      const result = openaiToGeminiRequest(model, { ...openaiBody, ...extra }, false);
      assert.deepEqual(
        result.generationConfig.thinkingConfig,
        {
          thinkingLevel: requested,
          includeThoughts: true,
        },
        model
      );
    }
    const result = openaiToGeminiRequest(
      model,
      { ...openaiBody, thinking: { type: "enabled", budget_tokens: 24576 } },
      false
    );
    assert.deepEqual(
      result.generationConfig.thinkingConfig,
      {
        thinkingLevel: "high",
        includeThoughts: true,
      },
      model
    );
  }
});

test("a distinct Gemini 4 variant does not acquire its base family's fixed-tier default", () => {
  const normal = openaiToGeminiRequest("gemini-4-hydrogen-xhigh", openaiBody, false);
  const sonar = openaiToGeminiRequest("gemini-4-hydrogen-sonar", openaiBody, false);
  assert.equal(normal.generationConfig.thinkingConfig?.thinkingLevel, "xhigh");
  assert.notEqual(sonar.generationConfig.thinkingConfig?.thinkingLevel, "xhigh");
});
