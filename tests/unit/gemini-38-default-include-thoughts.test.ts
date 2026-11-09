import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest, openaiToAntigravityRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { gemini38ThinkingConfig } = await import("../../open-sse/services/thinkingBudget.ts");

type ThinkingConfig = {
  thinkingBudget?: number;
  thinkingLevel?: string;
  includeThoughts?: boolean;
};

type GeminiReq = {
  generationConfig?: {
    maxOutputTokens?: number;
    thinkingConfig?: ThinkingConfig;
  };
};

type EnvelopeReq = {
  request?: {
    generationConfig?: {
      maxOutputTokens?: number;
      thinkingConfig?: ThinkingConfig;
    };
  };
};

test("gemini38ThinkingConfig defaults includeThoughts to true for positive budget", () => {
  const config = gemini38ThinkingConfig("gemini-4-argon", 8192, {});
  assert.deepEqual(config, { thinkingLevel: "medium", includeThoughts: true });
});

test("gemini38ThinkingConfig honors include_thoughts: false opt-out", () => {
  const configSnake = gemini38ThinkingConfig("gemini-4-argon", 8192, {
    include_thoughts: false,
  });
  assert.deepEqual(configSnake, { thinkingLevel: "medium", includeThoughts: false });

  const configCamel = gemini38ThinkingConfig("gemini-4-argon", 8192, {
    includeThoughts: false,
  });
  assert.deepEqual(configCamel, { thinkingLevel: "medium", includeThoughts: false });
});

test("openaiToGeminiRequest defaults includeThoughts to true on thinking-level models (#19302)", () => {
  const models = ["gemini-3.8-flash-high", "gemini-4-argon", "vertex/gemini-4-argon"];
  for (const model of models) {
    const res = openaiToGeminiRequest(
      model,
      {
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 4096,
      },
      false
    ) as GeminiReq;

    const tc = res.generationConfig?.thinkingConfig;
    assert.ok(tc?.thinkingLevel, `model ${model} should have thinkingLevel`);
    assert.equal(
      tc?.includeThoughts,
      true,
      `model ${model} should default includeThoughts to true`
    );
  }
});

test("openaiToAntigravityRequest defaults includeThoughts to true on gemini-4-argon-high (#19302)", () => {
  const res = openaiToAntigravityRequest(
    "gemini-4-argon-high",
    {
      messages: [{ role: "user", content: "solve equation" }],
      reasoning_effort: "high",
    },
    false,
    { projectId: "test-proj" }
  ) as EnvelopeReq;

  const tc = res.request?.generationConfig?.thinkingConfig;
  assert.equal(tc?.thinkingLevel, "high");
  assert.equal(tc?.includeThoughts, true);
});

test("claudeToGeminiRequest defaults includeThoughts to true on gemini-3.8-flash-high (#19302)", () => {
  const res = claudeToGeminiRequest(
    "gemini-3.8-flash-high",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
      max_tokens: 4096,
      output_config: { effort: "high" },
    },
    false
  ) as GeminiReq;

  const tc = res.generationConfig?.thinkingConfig;
  assert.equal(tc?.thinkingLevel, "high");
  assert.equal(tc?.includeThoughts, true);
});
