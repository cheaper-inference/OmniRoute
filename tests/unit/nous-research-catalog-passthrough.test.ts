import test from "node:test";
import assert from "node:assert/strict";
import { nous_researchProvider } from "../../open-sse/config/providers/registry/nous-research/index.ts";

test("nous-research pins the DeepSeek V4.1 Flash 1017 model in its fallback list", () => {
  assert.ok(
    nous_researchProvider.models.some((model) => model.id === "deepseek/deepseek-v4.1-flash-1017"),
    "deepseek/deepseek-v4.1-flash-1017 must be listed"
  );
});

test("nous-research uses its live /v1/models catalog instead of only the static list", () => {
  assert.equal(nous_researchProvider.passthroughModels, true);
});
