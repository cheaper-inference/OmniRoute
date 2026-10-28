import test from "node:test";
import assert from "node:assert/strict";

import {
  isUserCallableAntigravityModelId,
  resolveAntigravityModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { vertexProvider } from "../../open-sse/config/providers/registry/vertex/index.ts";
import { isGemini38Model } from "../../open-sse/services/thinkingBudget.ts";

// The bare `gemini-4-argon` id is valid on the Gemini API provider, but Antigravity only
// serves the tier ids. Default the bare id to the medium tier (reasoning effort still
// travels as thinkingLevel), like the bare 3.8 Flash id defaults to its high tier.
test("antigravity resolves the bare gemini-4-argon id to the medium tier", () => {
  assert.equal(resolveAntigravityModelId("gemini-4-argon"), "gemini-4-argon-medium");
  assert.equal(isUserCallableAntigravityModelId("gemini-4-argon"), true);
});

test("antigravity keeps the explicit gemini-4-argon tiers verbatim", () => {
  for (const tier of ["high", "medium", "low"]) {
    assert.equal(resolveAntigravityModelId(`gemini-4-argon-${tier}`), `gemini-4-argon-${tier}`);
  }
});

test("vertex catalog lists gemini-4-argon on the Gemini transport", () => {
  const argon = vertexProvider.models.find((model) => model.id === "gemini-4-argon");
  assert.ok(argon, "vertex registry must include gemini-4-argon");
  assert.equal(argon.name, "Gemini 4 Argon (Vertex)");
  assert.equal("targetFormat" in argon, false);
});

test("vertex/gemini-4-argon is routed through thinkingLevel", () => {
  assert.equal(isGemini38Model("vertex/gemini-4-argon"), true);
});
