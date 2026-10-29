import assert from "node:assert/strict";
import test from "node:test";
import { stripGpt5ReasoningWhenTools } from "../../open-sse/services/gpt5SamplingGuard.ts";

const tools = [{ type: "function", function: { name: "read_file", parameters: {} } }];

for (const reasoning of [{}, { reasoning_effort: "high" }, { reasoning: { effort: "medium" } }]) {
  test(`Luna function calls explicitly disable reasoning: ${JSON.stringify(reasoning)}`, () => {
    const body: Record<string, unknown> = { model: "gpt-6-luna", tools, ...reasoning };
    const original = structuredClone(body);
    const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-6-luna", "openai");
    assert.equal(result.reasoning_effort, "none");
    assert.equal(result.reasoning, undefined);
    assert.deepEqual(result.tools, tools);
    assert.deepEqual(body, original, "normalization must not mutate the reusable combo body");
  });
}

test("explicit none remains compatible and drops no tool", () => {
  const body = { tools, reasoning_effort: "none" };
  assert.deepEqual(stripGpt5ReasoningWhenTools(body, "openai", "gpt-6-luna", "openai"), body);
});

test("Luna Responses and other providers preserve tools plus reasoning", () => {
  const body = { tools, reasoning_effort: "high" };
  assert.equal(stripGpt5ReasoningWhenTools(body, "openai", "gpt-6-luna", "openai-responses"), body);
  for (const provider of ["codex", "openrouter", "openai-compatible"]) {
    assert.equal(stripGpt5ReasoningWhenTools(body, provider, "gpt-6-luna", "openai"), body);
  }
});

test("tool-free Luna requests preserve active reasoning", () => {
  for (const toolList of [undefined, [], [{ type: "web_search" }]]) {
    const body = { tools: toolList, reasoning_effort: "high" };
    assert.equal(stripGpt5ReasoningWhenTools(body, "openai", "gpt-6-luna", "openai"), body);
  }
});

test("legacy model normalization is unchanged", () => {
  const body = { tools, reasoning_effort: "high" };
  for (const model of ["gpt-5.4-sol", "gpt-6-astra"]) {
    assert.equal(
      stripGpt5ReasoningWhenTools(body, "openai", model, "openai").reasoning_effort,
      undefined
    );
  }
});

test("canonical Luna registry routing keeps Responses reasoning", async () => {
  const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
  const format = getModelTargetFormat("openai", "gpt-6-luna");
  assert.equal(format, "openai-responses");
  const body = { tools, reasoning_effort: "high" };
  assert.equal(stripGpt5ReasoningWhenTools(body, "openai", "gpt-6-luna", format), body);
});
