import assert from "node:assert/strict";
import test from "node:test";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { normalizeOpenAiLikeModelsResponse } from "../../src/app/api/providers/[id]/models/discovery/normalizers.ts";
import {
  isCatalogFreeModel,
  isFreeForProvider,
  isFreeModel,
  isPaidModelTarget,
  providerHasFreeModels,
  providerSupportsFreeOnlyImport,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// #19562: Nous Portal's live /models list marks free models with `isFree: true` and a `:free`
// id. The shipped catalog has no Nous rows (#16781/#16791 removed the unsupported Hermes-4
// claims), so the free-only import option was never offered and live evidence was never read.
const PROVIDER = "nous-research";
const liveFreeIds = [
  "upstage/solar-mini4:free",
  "stepfun/step-3.7-flash:free",
  "meituan/longcat-2.5:free",
  "reflection/beam-1.0-501b-a23b:free",
];
const hermes4Ids = ["Hermes-4-405B", "Hermes-4-70B"];
const paidPricing = { prompt: "0.000001", completion: "0.000002" };

/** Runs a raw Nous /models payload through the same normalizer discovery uses. */
function discover(data: unknown[]) {
  return normalizeOpenAiLikeModelsResponse({ data }, PROVIDER);
}

test("#19562 Nous offers the free-only import option", () => {
  assert.equal(providerHasFreeModels(PROVIDER), true);
  assert.equal(providerSupportsFreeOnlyImport(PROVIDER), true);
});

test("#19562 (a) the four live :free Nous models are accepted by free-only import", () => {
  const fetched = discover([
    ...liveFreeIds.map((id) => ({ id, isFree: true, pricing: { prompt: "0", completion: "0" } })),
    { id: "Hermes-4-405B", pricing: paidPricing },
  ]);
  const result = selectModelsForImport(PROVIDER, fetched, true);
  assert.deepEqual(
    result.models.map((m) => m.id),
    liveFreeIds
  );
  assert.equal(result.freeFilterEmpty, false);
  for (const id of liveFreeIds) {
    assert.equal(isFreeModel(PROVIDER, { id, isFree: true }), true, id);
    assert.equal(isFreeForProvider(PROVIDER, { id }), true, id);
  }
});

test("#19562 (b) a paid flag or a positive price vetoes a :free id", () => {
  const id = liveFreeIds[0];
  const vetoed = [
    { id, isFree: false },
    { id, isFree: true, free: false },
    { id, pricing: { isFree: false } },
    { id, pricing: paidPricing },
    { id, isFree: true, pricing: paidPricing },
  ];
  for (const model of vetoed) {
    assert.equal(isFreeModel(PROVIDER, model), false, JSON.stringify(model));
  }
  // The veto survives discovery normalization and the import filter.
  const fetched = discover(vetoed);
  assert.equal(fetched.length, vetoed.length);
  const result = selectModelsForImport(PROVIDER, fetched, true);
  assert.deepEqual(result.models, []);
  assert.equal(result.freeFilterEmpty, true);
});

test("#19562 (c) Hermes-4 is not treated as free and stays out of the shipped catalog", () => {
  const nousRows = FREE_MODEL_BUDGETS.filter((row) => row.provider === PROVIDER);
  assert.deepEqual(nousRows, []);
  for (const id of hermes4Ids) {
    assert.equal(isCatalogFreeModel(PROVIDER, id), false, id);
    assert.equal(isFreeModel(PROVIDER, { id }), false, id);
    assert.equal(isFreeModel(PROVIDER, { id, pricing: paidPricing }), false, id);
    assert.equal(isFreeForProvider(PROVIDER, { id }), false, id);
    assert.equal(isPaidModelTarget(`${PROVIDER}/${id}`), "paid", id);
  }
  const fetched = discover(hermes4Ids.map((id) => ({ id, pricing: paidPricing })));
  const result = selectModelsForImport(PROVIDER, fetched, true);
  assert.deepEqual(result.models, []);
  assert.equal(result.freeFilterEmpty, true);
});

test("#19562 without the free-only option every Nous model is still imported", () => {
  const fetched = discover([...liveFreeIds, ...hermes4Ids].map((id) => ({ id })));
  assert.equal(selectModelsForImport(PROVIDER, fetched, false).models.length, 6);
});
