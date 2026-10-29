import assert from "node:assert/strict";
import test from "node:test";
import {
  FREE_MODEL_BUDGETS,
  computeFreeModelTotals,
} from "../../open-sse/config/freeModelCatalog.ts";
import { isFreeModel, selectModelsForImport } from "../../src/shared/utils/freeModels.ts";

const bytezPaidModels = ["meta-llama/Llama-3.3-70B-Instruct", "Qwen/Qwen2.5-72B-Instruct"];
const nousUnverifiedModels = ["Hermes-4-405B", "Hermes-4-70B"];
const mistral7B = "mistralai/Mistral-7B-Instruct-v0.3";

for (const [provider, models] of [
  ["bytez", bytezPaidModels],
  ["nous-research", nousUnverifiedModels],
] as const) {
  for (const id of models) {
    test(`${provider}/${id} does not receive free status from unsupported catalog evidence`, () => {
      assert.equal(isFreeModel(provider, { id }), false);
      assert.equal(
        isFreeModel(provider, { id, isFree: false, pricing: { prompt: 1, completion: 2 } }),
        false
      );
    });
  }
}

test("Bytez free-only import keeps the documented 7B tier and removes paid unlock tiers", () => {
  const fetched = [...bytezPaidModels, mistral7B].map((id) => ({ id }));
  const result = selectModelsForImport("bytez", fetched, true);
  assert.deepEqual(result.models, [{ id: mistral7B }]);
  assert.equal(result.freeFilterEmpty, false);
  assert.deepEqual(selectModelsForImport("bytez", fetched, false).models, fetched);
});

test("unverified Hermes rows cannot populate a Nous free-only import", () => {
  const fetched = nousUnverifiedModels.map((id) => ({ id }));
  const result = selectModelsForImport("nous-research", fetched, true);
  assert.deepEqual(result.models, []);
  assert.equal(result.freeFilterEmpty, true);
  assert.deepEqual(selectModelsForImport("nous-research", fetched, false).models, fetched);
});

test("Bytez recurring credits retain free access without an invented token allowance", () => {
  const entries = FREE_MODEL_BUDGETS.filter((entry) => entry.provider === "bytez");
  assert.equal(entries.length, 1);
  assert.equal(entries[0].modelId, mistral7B);
  assert.equal(entries[0].freeType, "recurring-credit");
  assert.equal(entries[0].monthlyTokens, 0);
  assert.equal(entries[0].creditTokens, 0);
  assert.equal(isFreeModel("bytez", { id: mistral7B }), true);
  const totals = computeFreeModelTotals({ entries });
  assert.equal(totals.steadyWithRecurringCreditsTokens, 0);
  assert.equal(totals.firstMonthRealisticTokens, 0);
});

test("verified free models on other providers keep their existing classification", () => {
  const entry = FREE_MODEL_BUDGETS.find((row) => row.provider === "groq");
  assert.ok(entry);
  assert.equal(isFreeModel(entry.provider, { id: entry.modelId }), true);
});
