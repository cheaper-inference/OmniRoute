import { test } from "node:test";
import assert from "node:assert/strict";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

// Mistral retired Devstral 2 (devstral-2512, served as devstral-latest) on 2026-07-31.
test("mistral registry no longer offers the retired devstral-latest (#18755)", () => {
  const ids = getModelsByProviderId("mistral").map((model) => model.id);
  assert.equal(ids.includes("devstral-latest"), false);
  assert.ok(ids.includes("codestral-latest"));
});
