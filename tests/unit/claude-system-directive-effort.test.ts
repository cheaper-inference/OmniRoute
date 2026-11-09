import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-claude-system-effort-"));

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { setThinkingBudgetConfig, ThinkingMode, DEFAULT_THINKING_CONFIG } =
  await import("../../open-sse/services/thinkingBudget.ts");

function turns(directive?: Record<string, unknown>) {
  return [
    { role: "user", content: "hi" },
    { role: "assistant", content: "ok" },
    ...(directive ? [{ role: "system", content: [], output_config: directive }] : []),
    { role: "user", content: "again" },
  ];
}

test("Claude to OpenAI takes reasoning effort from the last system directive", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    {
      max_tokens: 64,
      output_config: { effort: "low" },
      messages: [
        { role: "system", content: [], output_config: { effort: "medium" } },
        ...turns({ effort: "high" }),
      ],
    },
    false
  );

  assert.equal(out.reasoning_effort, "high");
});

test("Claude to OpenAI keeps the top-level effort without a system directive", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    { max_tokens: 64, output_config: { effort: "low" }, messages: turns() },
    false
  );

  assert.equal(out.reasoning_effort, "low");
});

test("Claude to OpenAI ignores a system directive that has no effort", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    {
      max_tokens: 64,
      output_config: { effort: "low" },
      messages: turns({ format: { type: "json_schema", schema: {} } }),
    },
    false
  );

  assert.equal(out.reasoning_effort, "low");
});

test("Claude to OpenAI treats a whitespace-only system effort as empty", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    {
      max_tokens: 64,
      output_config: { effort: "low" },
      messages: turns({ effort: " " }),
    },
    false
  );

  assert.equal(out.reasoning_effort, "low");
});

test("Claude to OpenAI trims and lowercases a system effort", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    {
      max_tokens: 64,
      output_config: { effort: "low" },
      messages: turns({ effort: " High " }),
    },
    false
  );

  assert.equal(out.reasoning_effort, "high");
});

// Full pipeline: the steps that run before the translator only read the top-level effort.
function pipelineEffort(model: string, provider: string, body: Record<string, unknown>) {
  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    model,
    { model, max_tokens: 64, ...body },
    false,
    {},
    provider
  ) as { reasoning_effort?: string };
  return out.reasoning_effort;
}

const forceRule = (targetEffort: string) => ({
  id: "rule-1",
  effortMode: "force",
  targetEffort,
  budgetAction: "preserve",
  budgetTokens: null,
});

test("pipeline: the system directive effort wins over the top-level effort", () => {
  const effort = pipelineEffort("gpt-5", "openai", {
    output_config: { effort: "low" },
    messages: turns({ effort: "high" }),
  });
  assert.equal(effort, "high");
});

test("pipeline: the directive effort survives role normalization for a no-system-role model", () => {
  const effort = pipelineEffort("glm-4.7", "zai", {
    output_config: { effort: "low" },
    messages: turns({ effort: "high" }),
  });
  assert.equal(effort, "high");
});

test("pipeline: Auto thinking mode drops the directive effort too", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });
  try {
    const effort = pipelineEffort("gpt-5", "openai", {
      messages: turns({ effort: "high" }),
    });
    assert.equal(effort, undefined);
  } finally {
    setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  }
});

test("pipeline: a forced reasoning rule beats the directive effort", () => {
  for (const forced of ["low", "none"]) {
    const effort = pipelineEffort("gpt-5", "openai", {
      _omnirouteReasoningRule: forceRule(forced),
      output_config: { effort: "high" },
      messages: turns({ effort: "high" }),
    });
    assert.equal(effort, forced, `forced ${forced}`);
  }
});

test("pipeline: a default reasoning rule keeps the directive effort", () => {
  const effort = pipelineEffort("gpt-5", "openai", {
    _omnirouteReasoningRule: { ...forceRule("low"), effortMode: "default" },
    messages: turns({ effort: "high" }),
  });
  assert.equal(effort, "high");
});

test("pipeline: the caller body keeps its directive and top-level effort", () => {
  const body = {
    model: "glm-4.7",
    max_tokens: 64,
    output_config: { effort: "low" },
    messages: turns({ effort: "high" }),
  };
  const before = JSON.stringify(body);
  translateRequest(FORMATS.CLAUDE, FORMATS.OPENAI, "glm-4.7", body, false, {}, "zai");
  assert.equal(JSON.stringify(body), before);
});
