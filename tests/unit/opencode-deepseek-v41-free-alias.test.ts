import assert from "node:assert/strict";
import { test } from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { resolveModelAlias } from "../../open-sse/services/modelDeprecation.ts";

/**
 * OpenCode Zen delisted `deepseek-v4-flash-free` on 2026-10-18; the upstream
 * catalog now serves `deepseek-v4.1-flash-free` and answers the old id with
 * `400 Model is unavailable`. Pinned clients must be forwarded, and the stale
 * id must not stay in the advertised catalog.
 */
test("deprecated deepseek-v4-flash-free forwards to v4.1 for opencode-zen", () => {
  assert.equal(
    resolveModelAlias("deepseek-v4-flash-free", "opencode-zen"),
    "deepseek-v4.1-flash-free"
  );
  assert.equal(resolveModelAlias("deepseek-v4-flash-free", "opencode"), "deepseek-v4.1-flash-free");
  assert.equal(resolveModelAlias("deepseek-v4-flash-free"), "deepseek-v4.1-flash-free");
});

test("the replacement id is not rewritten", () => {
  assert.equal(
    resolveModelAlias("deepseek-v4.1-flash-free", "opencode-zen"),
    "deepseek-v4.1-flash-free"
  );
});

test("opencode-zen registry advertises v4.1 and keeps the old id as an alias", () => {
  const replacement = opencode_zenProvider.models.find(
    (model) => model.id === "deepseek-v4.1-flash-free"
  );
  assert.ok(replacement, "registry must list deepseek-v4.1-flash-free");
  assert.deepEqual(replacement.aliases, ["deepseek-v4-flash-free"]);
  assert.equal(
    opencode_zenProvider.models.some((model) => model.id === "deepseek-v4-flash-free"),
    false,
    "the delisted id must not remain a standalone catalog row"
  );
});

test("free-model catalog lists v4.1 instead of the delisted id", () => {
  assert.ok(
    FREE_MODEL_BUDGETS.some(
      (entry) =>
        entry.provider === "opencode-zen" && entry.modelId === "opencode/deepseek-v4.1-flash-free"
    )
  );
  assert.equal(
    FREE_MODEL_BUDGETS.some((entry) => entry.modelId === "opencode/deepseek-v4-flash-free"),
    false
  );
});
