import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isFreeModel,
  isModelFreeBadge,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

test("Kilo's variable-price auto router is not an unconditional free model (#17028)", () => {
  // The public Kilo /models API uses -1, not zero, for this router's prices.
  // Neither an ID-only response nor unknown/positive prices certify free access.
  const id = "openrouter/auto-beta";
  for (const model of [
    { id },
    { id, pricing: { prompt: "-1", completion: "-1" } },
    { id, pricing: { prompt: "0.000003", completion: "0.000015" } },
  ]) {
    assert.equal(isFreeModel("kilo-gateway", model), false);
    assert.equal(isModelFreeBadge("kilo-gateway", model), false);
    assert.deepEqual(selectModelsForImport("kilo-gateway", [model], true).models, []);
  }

  const free = { id: "kilo-auto/free", pricing: { prompt: "0", completion: "0" } };
  assert.equal(isFreeModel("kilo-gateway", free), true);
  assert.deepEqual(selectModelsForImport("kilo-gateway", [free], true).models, [free]);
});
