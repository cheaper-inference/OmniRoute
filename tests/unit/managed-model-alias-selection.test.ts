import assert from "node:assert/strict";
import test from "node:test";
import { resolveManagedModelAlias } from "../../src/shared/utils/providerModelAliases.ts";

function resolve(existingAliases: Record<string, string>, providerDisplayAlias = "provider") {
  return resolveManagedModelAlias({
    modelId: "vendor/model",
    fullModel: "provider/model",
    providerDisplayAlias,
    existingAliases,
  });
}

test("alias selection preserves existing names and collision priority", () => {
  assert.equal(resolve({ custom: "provider/model", second: "provider/model" }), "custom");
  assert.equal(resolve({}), "model");
  assert.equal(resolve({ model: "other" }), "provider-model");
  assert.equal(resolve({ model: "other", "provider-model": "other" }), "provider-model-2");
  assert.equal(
    resolve({ model: "other", "provider-model": "other", "provider-model-2": "other" }),
    "model-2"
  );
  assert.equal(resolve({ model: "other" }, " "), "model-2");
});

test("alias selection honors inherited collisions and the suffix limit", () => {
  const inherited = Object.create({ model: "other" }) as Record<string, string>;
  assert.equal(resolve(inherited), "provider-model");
  const occupied: Record<string, string> = { model: "other", "provider-model": "other" };
  for (let suffix = 2; suffix <= 5000; suffix++) {
    occupied[`provider-model-${suffix}`] = "other";
    occupied[`model-${suffix}`] = "other";
  }
  assert.equal(resolve(occupied), null);
  delete occupied["model-5000"];
  assert.equal(resolve(occupied), "model-5000");
});
