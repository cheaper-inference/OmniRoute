// Qwen Cloud Token Plan per-model reasoning_effort enums. Declaring them statically lets the
// sanitizer map an out-of-enum effort on the FIRST request, instead of waiting for one
// upstream 400 to teach the learned clamp. deepseek-v4-pro rejects "none"/"minimal".
import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";

import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";
import { getProviderModels } from "../../open-sse/config/providerModels.ts";
import { __test_resetLearnedReasoningEffortCaps } from "../../open-sse/services/learnedReasoningEffortCaps.ts";

const PROVIDER = "qwen-cloud-token-plan";
const FULL = ["none", "minimal", "low", "medium", "high", "xhigh", "max"];

beforeEach(() => __test_resetLearnedReasoningEffortCaps());
after(() => __test_resetLearnedReasoningEffortCaps());

function effortsOf(modelId: string): readonly string[] | undefined {
  return getProviderModels(PROVIDER).find((m) => m.id === modelId)?.supportedThinkingEfforts;
}

function sanitize(model: string, effort: string): unknown {
  return (
    sanitizeReasoningEffortForProvider({ reasoning_effort: effort }, PROVIDER, model) as {
      reasoning_effort?: unknown;
    }
  ).reasoning_effort;
}

test("registry declares the probed effort enums", () => {
  for (const id of ["qwen3.8-max", "qwen3.8-flash", "glm-5.2", "deepseek-v4-flash-0731"]) {
    assert.deepEqual(effortsOf(id), FULL, `${id} effort enum`);
  }
  assert.deepEqual(effortsOf("deepseek-v4-pro"), ["low", "medium", "high", "xhigh", "max"]);
});

test("deepseek-v4-pro: minimal and none are raised to low on the first request", () => {
  assert.equal(sanitize("deepseek-v4-pro", "minimal"), "low");
  assert.equal(sanitize("deepseek-v4-pro", "none"), "low");
  assert.equal(sanitize("deepseek-v4-pro", "medium"), "medium");
});

test("max passes through for qwen3.8-max and deepseek-v4-pro", () => {
  assert.equal(sanitize("qwen3.8-max", "max"), "max");
  assert.equal(sanitize("deepseek-v4-pro", "max"), "max");
});

test("full-enum models forward none/minimal unchanged", () => {
  assert.equal(sanitize("qwen3.8-max", "minimal"), "minimal");
  assert.equal(sanitize("qwen3.8-flash", "none"), "none");
  assert.equal(sanitize("deepseek-v4-flash-0731", "minimal"), "minimal");
});
