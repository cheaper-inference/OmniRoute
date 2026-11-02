import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";

// The authenticated Zen rows as shipped by the catalog refresh in #17345 (2026-10-22).
// Keep this list in step with open-sse/config/freeModelCatalog.data.ts: the point of the
// guard is that removing the anonymous OpenCode Free provider (#16310) never drops them.
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

test("removing Free preserves every authenticated Zen catalog row", () => {
  const actual = FREE_MODEL_BUDGETS.filter((row) => row.provider === "opencode-zen");
  assert.deepEqual(actual.map((row) => row.modelId).sort(), [...zenModels].sort());
  assert.ok(actual.every((row) => row.poolKey === "opencode-zen-free"));
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
