import { test } from "node:test";
import assert from "node:assert/strict";

import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";

// OpenCode Go's Claude lane rejects `output_config.task_budget` with 400 "Extra inputs are
// not permitted" even when its own beta travels with the request. `output_config.effort`
// is required by the adaptive-thinking models there and must survive.

const TASK_BUDGET = { type: "tokens", total: 20000 };

for (const model of ["claude-haiku-5-5", "ocg/claude-haiku-5-5", "claude-sonnet-5"]) {
  test(`opencode-go ${model}: task_budget is dropped, effort is kept`, () => {
    const body: Record<string, unknown> = {
      model,
      output_config: { effort: "high", task_budget: TASK_BUDGET },
    };
    stripUnsupportedParams("opencode-go", model, body);
    assert.deepEqual(body.output_config, { effort: "high" });
  });
}

test("opencode-go Claude: output_config holding only task_budget is removed", () => {
  const body: Record<string, unknown> = {
    model: "claude-haiku-5-5",
    output_config: { task_budget: TASK_BUDGET },
  };
  stripUnsupportedParams("opencode-go", "claude-haiku-5-5", body);
  assert.equal("output_config" in body, false);
});

test("opencode-go Claude: the caller's original output_config object is not mutated", () => {
  const original = { effort: "medium", task_budget: TASK_BUDGET };
  const body: Record<string, unknown> = { model: "claude-haiku-5-5", output_config: original };
  stripUnsupportedParams("opencode-go", "claude-haiku-5-5", body);
  assert.deepEqual(body.output_config, { effort: "medium" });
  assert.deepEqual(original, { effort: "medium", task_budget: TASK_BUDGET });
});

test("opencode-go Claude: output_config without task_budget is left as is", () => {
  const outputConfig = { effort: "low" };
  const body: Record<string, unknown> = {
    model: "claude-haiku-5-5",
    output_config: outputConfig,
  };
  stripUnsupportedParams("opencode-go", "claude-haiku-5-5", body);
  assert.equal(body.output_config, outputConfig);
});

test("opencode-go non-Claude models keep task_budget", () => {
  const body: Record<string, unknown> = {
    model: "glm-5.2",
    output_config: { effort: "high", task_budget: TASK_BUDGET },
  };
  stripUnsupportedParams("opencode-go", "glm-5.2", body);
  assert.deepEqual(body.output_config, { effort: "high", task_budget: TASK_BUDGET });
});

for (const provider of ["claude", "anthropic", "opencode-zen"]) {
  test(`${provider} claude-haiku-5-5 keeps task_budget (rule is opencode-go only)`, () => {
    const body: Record<string, unknown> = {
      model: "claude-haiku-5-5",
      output_config: { effort: "high", task_budget: TASK_BUDGET },
    };
    stripUnsupportedParams(provider, "claude-haiku-5-5", body);
    assert.deepEqual(body.output_config, { effort: "high", task_budget: TASK_BUDGET });
  });
}
