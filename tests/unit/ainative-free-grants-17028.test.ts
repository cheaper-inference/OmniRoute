import assert from "node:assert/strict";
import test from "node:test";
import {
  isCatalogFreeModel,
  isFreeModel,
  isModelFreeBadge,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// Official docs checked 2026-10-28 bind these IDs to the configured API:
// https://docs.ainative.studio/docs/api/models/ retires the nous-coder alias.
// https://docs.ainative.studio/docs/api/chat-completions/ assigns R1 to Enterprise.
// No claim about legacy account promotions; normal imports remain available.
const unsupportedGrants = [
  ["ainative", "nous-coder"],
  ["ainative", "deepseek-r1"],
] as const;

for (const [provider, id] of unsupportedGrants) {
  test(`#17028 unsupported ${provider}/${id} grants no static free access`, () => {
    const model = { id };
    assert.equal(isCatalogFreeModel(provider, id), false);
    assert.equal(isFreeModel(provider, model), false);
    assert.equal(isModelFreeBadge(provider, model), false);
    assert.equal(isModelFreeBadge(provider, model, { strict: true }), false);
    assert.deepEqual(selectModelsForImport(provider, [model], true), {
      models: [],
      freeFilterEmpty: true,
    });
    assert.deepEqual(selectModelsForImport(provider, [model], false), {
      models: [model],
      freeFilterEmpty: false,
    });
  });
}
