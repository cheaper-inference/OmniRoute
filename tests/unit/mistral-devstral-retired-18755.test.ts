import { test } from "node:test";
import assert from "node:assert/strict";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import {
  getModelLifecycleDecision,
  isModelSelectable,
} from "../../open-sse/services/modelLifecycle.ts";

// Mistral retired Devstral 2 (devstral-2512, served as devstral-latest) on 2026-07-31.
test("mistral registry no longer offers the retired devstral-latest (#18755)", () => {
  const ids = getModelsByProviderId("mistral").map((model) => model.id);
  assert.equal(ids.includes("devstral-latest"), false);
  assert.ok(ids.includes("codestral-latest"));
});

// The static registry is only one surface: Mistral's live /v1/models still lists
// retired ids, so discovery needs the lifecycle snapshot to drop them too.
test("retired Mistral ids are rejected by the lifecycle policy", () => {
  for (const id of ["pixtral-large-latest", "devstral-latest"]) {
    assert.equal(getModelLifecycleDecision("mistral", id).status, "shutdown", id);
    assert.equal(isModelSelectable("mistral", id), false, id);
  }
  assert.equal(isModelSelectable("mistral", "mistral-large-latest"), true);
});
