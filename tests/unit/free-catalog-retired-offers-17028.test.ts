import assert from "node:assert/strict";
import test from "node:test";
import {
  isCatalogFreeModel,
  isFreeModel,
  isModelFreeBadge,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// Official notices checked 2026-10-28, not inferred from missing /models entries:
// https://ollama.com/library/deepseek-v4-flash (retired 2026-08-27)
// https://ollama.com/library/glm-5.1 (retired 2026-09-25)
// https://cloud.tencent.com/document/product/1729/131925 (retired 2026-06-22)
const retiredOffers = [
  ["ollama-cloud", "deepseek-v4-flash"],
  ["ollama-cloud", "glm-5.1"],
  ["tencent", "hunyuan-pro"],
] as const;

for (const [provider, id] of retiredOffers) {
  test(`#17028 retired ${provider}/${id} grants no static free access`, () => {
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
