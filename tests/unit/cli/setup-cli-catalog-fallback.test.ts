import test from "node:test";
import assert from "node:assert/strict";

import { buildContinueModels } from "../../../bin/cli/commands/setup-continue.mjs";
import { buildCrushProvider } from "../../../bin/cli/commands/setup-crush.mjs";

/**
 * categoriseModel() is a hardcoded regex table over legacy prefixes (kmc/, glm/,
 * opencode-go/) and returns null for everything else. setup-continue and setup-crush
 * did `const cfg = categoriseModel(id); if (!cfg) continue;`, so a catalog dominated by
 * newer prefixes (aug/, dva/, tllm/, oc/) produced ZERO models and the commands printed
 * "No matching curated models" with hundreds of models available. setup-codex already
 * guarded the same call with `?? fallbackCodexProfile(id, m)`.
 */
const UNKNOWN_PREFIX_IDS = ["aug/claude-sonnet-4.5", "dva/gpt-5.2", "tllm/qwen3-235b", "oc/grok-4"];

const API_BASE = "http://127.0.0.1:20128/v1";

test("buildContinueModels keeps ids whose prefix categoriseModel does not know", () => {
  const models = buildContinueModels(UNKNOWN_PREFIX_IDS, API_BASE);

  assert.equal(models.length, UNKNOWN_PREFIX_IDS.length);
  for (const model of models) {
    assert.equal(model.provider, "openai");
    assert.ok(Array.isArray(model.roles) && model.roles.includes("chat"), `${model.model} roles`);
  }
});

test("buildCrushProvider keeps unknown-prefix ids with a usable context_window", () => {
  const provider = buildCrushProvider(UNKNOWN_PREFIX_IDS, API_BASE);

  assert.equal(provider.models.length, UNKNOWN_PREFIX_IDS.length);
  for (const model of provider.models) {
    // crush writes cfg.ctx straight into the config — undefined would ship a broken file.
    assert.equal(typeof model.context_window, "number", `${model.id} context_window`);
    assert.ok(model.context_window > 0, `${model.id} context_window must be positive`);
  }
});

test("the fallback still drops non-text model ids", () => {
  const nonText = ["aug/image-gen-2", "aug/text-embedding-3-large", "dva/whisper-large"];

  assert.equal(buildCrushProvider(nonText, API_BASE).models.length, 0);
  assert.equal(buildContinueModels(nonText, API_BASE).length, 0);
});

test("known legacy prefixes keep their curated categoriseModel values", () => {
  const provider = buildCrushProvider(["glm/glm-5.2"], API_BASE);

  assert.equal(provider.models.length, 1);
  assert.equal(provider.models[0].context_window, 131072);
});
