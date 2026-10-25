import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";

const zenModels = [
  "opencode/big-pickle",
  "opencode/deepseek-v4.1-flash-free",
  "opencode/nemotron-3-super-free",
  "opencode/mimo-v2.5-free",
  "opencode/north-mini-code-free",
  "opencode/nemotron-3-ultra-free",
];

test("removing Free preserves all six authenticated Zen catalog rows", () => {
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
