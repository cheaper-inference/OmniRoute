import { test } from "node:test";
import assert from "node:assert/strict";

import { detectVisionInput, normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

test("upstream OpenAI-compatible proxy with snake_case context_window maps to window", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "deepseek-v4.1-flash",
      object: "model",
      owned_by: "verboo",
      context_window: 1_048_576,
      vision: true,
    },
  ]);

  assert.equal(model.id, "deepseek-v4.1-flash");
  assert.equal(model.inputTokenLimit, 1_048_576);
  assert.equal(model.supportsVision, true);
});

test("upstream with max_context_window_tokens or context_window_tokens maps to window", () => {
  const [m1] = normalizeDiscoveredModels([{ id: "model-a", max_context_window_tokens: 262_144 }]);
  assert.equal(m1.inputTokenLimit, 262_144);

  const [m2] = normalizeDiscoveredModels([{ id: "model-b", context_window_tokens: 131_072 }]);
  assert.equal(m2.inputTokenLimit, 131_072);
});

test("explicit max context fields beat a plain context_window", () => {
  const [withMaxContextWindow] = normalizeDiscoveredModels([
    { id: "model-max-context", context_window: 272000, max_context_window: 872000 },
  ]);
  assert.equal(withMaxContextWindow.inputTokenLimit, 872000);

  const [withMaxModelLen] = normalizeDiscoveredModels([
    { id: "model-max-len", context_window: 100000, max_model_len: 250000 },
  ]);
  assert.equal(withMaxModelLen.inputTokenLimit, 250000);
});

test("detectVisionInput recognizes top-level vision: true boolean", () => {
  assert.equal(detectVisionInput({ id: "test", vision: true }), true);
  assert.equal(detectVisionInput({ id: "test", vision: false }), false);
});
