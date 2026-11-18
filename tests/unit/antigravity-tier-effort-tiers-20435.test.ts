import test from "node:test";
import assert from "node:assert/strict";

import {
  enrichCatalogModelEntry,
  isAntigravityTierSuffixedModel,
} from "../../src/lib/modelMetadataRegistry.ts";
import { getThinkingCapabilityFields } from "../../src/app/api/v1/models/catalogHelpers.ts";

test("#20435 isAntigravityTierSuffixedModel matches only Antigravity tier-suffixed IDs", () => {
  assert.equal(isAntigravityTierSuffixedModel("antigravity", "gemini-3.8-flash-low"), true);
  assert.equal(isAntigravityTierSuffixedModel("antigravity", "gemini-3.8-flash-medium"), true);
  assert.equal(isAntigravityTierSuffixedModel("antigravity", "gemini-3.8-flash-high"), true);
  assert.equal(isAntigravityTierSuffixedModel("agy", "gemini-3.8-flash-high"), true);
  assert.equal(isAntigravityTierSuffixedModel(null, "antigravity/gemini-3.8-flash-medium"), true);

  assert.equal(isAntigravityTierSuffixedModel("antigravity", "gemini-3.8-flash"), false);
  assert.equal(isAntigravityTierSuffixedModel("antigravity", "claude-opus-4-6-thinking"), false);
  assert.equal(isAntigravityTierSuffixedModel("openai", "gpt-5-high"), false);
  assert.equal(isAntigravityTierSuffixedModel("codex", "gpt-6.1-sol-high"), false);
});

test("#20435 getThinkingCapabilityFields omits generic effort_tiers on Antigravity tier-suffixed models", () => {
  for (const provider of ["antigravity", "agy"]) {
    for (const tier of ["low", "medium", "high"]) {
      const modelId = `gemini-3.8-flash-${tier}`;
      const fields = getThinkingCapabilityFields(provider, modelId, true);
      assert.equal(fields.thinking, true, `${provider}/${modelId} should preserve thinking=true`);
      assert.equal(
        fields.supportsThinking,
        true,
        `${provider}/${modelId} should preserve supportsThinking=true`
      );
      assert.equal(
        "effort_tiers" in fields,
        false,
        `${provider}/${modelId} must not synthesize generic 6-tier effort_tiers`
      );
    }
  }

  // Base non-tier Antigravity model still falls back when appropriate
  const baseFields = getThinkingCapabilityFields("antigravity", "gemini-3.8-flash", true);
  assert.equal(Array.isArray(baseFields.effort_tiers), true);

  // Explicit declared tiers still win even on tier-suffixed IDs if a registry declares them
  const explicitFields = getThinkingCapabilityFields("antigravity", "gemini-3.8-flash-high", true, [
    "high",
  ]);
  assert.deepEqual(explicitFields.effort_tiers, ["high"]);
});

test("#20435 enrichCatalogModelEntry omits generic effort_tiers for Antigravity tier-suffixed models", () => {
  for (const provider of ["antigravity", "agy"]) {
    for (const tier of ["low", "medium", "high"]) {
      const id = `${provider}/gemini-3.8-flash-${tier}`;
      const enriched = enrichCatalogModelEntry({
        id,
        root: `gemini-3.8-flash-${tier}`,
        owned_by: provider,
      }) as { capabilities?: { effort_tiers?: string[] } };

      assert.equal(
        enriched.capabilities?.effort_tiers,
        undefined,
        `${id} must not advertise synthetic generic effort_tiers`
      );
    }
  }
});
