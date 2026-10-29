import assert from "node:assert/strict";
import { test } from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { resolveModelAlias } from "../../open-sse/services/modelDeprecation.ts";

/**
 * OpenCode Zen deprecated `mimo-v2.5-free`: the upstream answers the old id
 * with `410 Model mimo-v2.5-free has been deprecated. Use mimo-v2.6-flash-free
 * instead.` Pinned clients must be forwarded to the replacement, and the
 * deprecated id must not stay in the advertised candidate catalog.
 */
test("deprecated mimo-v2.5-free forwards to mimo-v2.6-flash-free for opencode-zen", () => {
  assert.equal(resolveModelAlias("mimo-v2.5-free", "opencode-zen"), "mimo-v2.6-flash-free");
  assert.equal(resolveModelAlias("mimo-v2.5-free", "opencode"), "mimo-v2.6-flash-free");
  assert.equal(resolveModelAlias("mimo-v2.5-free"), "mimo-v2.6-flash-free");
});

test("the replacement id is not rewritten", () => {
  assert.equal(resolveModelAlias("mimo-v2.6-flash-free", "opencode-zen"), "mimo-v2.6-flash-free");
});

test("opencode-zen registry advertises v2.6 flash and keeps the old id as an alias", () => {
  const replacement = opencode_zenProvider.models.find(
    (model) => model.id === "mimo-v2.6-flash-free"
  );
  assert.ok(replacement, "registry must list mimo-v2.6-flash-free");
  assert.deepEqual(replacement.aliases, ["mimo-v2.5-free"]);
  assert.equal(
    opencode_zenProvider.models.some((model) => model.id === "mimo-v2.5-free"),
    false,
    "the deprecated id must not remain a standalone catalog row"
  );
});

test("free-model catalog lists v2.6 flash instead of the deprecated id", () => {
  assert.ok(
    FREE_MODEL_BUDGETS.some(
      (entry) =>
        entry.provider === "opencode-zen" && entry.modelId === "opencode/mimo-v2.6-flash-free"
    )
  );
  assert.equal(
    FREE_MODEL_BUDGETS.some((entry) => entry.modelId === "opencode/mimo-v2.5-free"),
    false
  );
});
