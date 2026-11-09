import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";
import { selectModelsForImport } from "../../src/shared/utils/freeModels.ts";

// The authenticated Zen rows as shipped by the catalog refresh in #17345 (2026-10-22).
// Removing the anonymous provider must preserve unrestricted imports of discovered
// authenticated models, without granting client-restricted offers to generic proxies.
const zenModels = [
  "opencode/beam-free",
  "opencode/big-pickle",
  "opencode/deepseek-v4.1-flash-free",
  "opencode/glm-5.3-flash-free",
  "opencode/jev-1.13-free",
  "opencode/longcat-2.5-preview-free",
  "opencode/mimo-v2.6-flash-free",
  "opencode/minimax-m3.1-flash-free",
  "opencode/nemotron-3.5-lightning-free",
  "opencode/nemotron-3.5-super-vl-free",
];

test("removing Free preserves authenticated Zen imports without generic free grants", () => {
  const discovered = zenModels.map((id) => ({ id }));
  assert.deepEqual(selectModelsForImport("opencode-zen", discovered, false), {
    models: discovered,
    freeFilterEmpty: false,
  });
  assert.deepEqual(selectModelsForImport("opencode-zen", discovered, true), {
    models: [],
    freeFilterEmpty: true,
  });
  assert.deepEqual(
    FREE_MODEL_BUDGETS.filter((row) => row.provider === "opencode-zen"),
    []
  );
  const registeredIds = new Set(PROVIDER_MODELS["opencode-zen"].map((model) => model.id));
  for (const id of [
    "big-pickle",
    "deepseek-v4.1-flash-free",
    "mimo-v2.6-flash-free",
    "nemotron-3.5-lightning-free",
  ]) {
    assert.ok(registeredIds.has(id), `authenticated model remains registered: ${id}`);
  }
});

test("Free is absent while authenticated Zen and Go model registries remain", () => {
  assert.equal(Object.hasOwn(NOAUTH_PROVIDERS, "opencode"), false);
  assert.equal(
    FREE_MODEL_BUDGETS.some((row) => row.provider === "opencode"),
    false
  );
  assert.ok(PROVIDER_MODELS["opencode-zen"].length > 0);
  assert.ok(PROVIDER_MODELS["opencode-go"].length > 0);
});
