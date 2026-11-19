import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isFreeModel,
  isModelFreeBadge,
  providerHasFreeModels,
  providerSupportsFreeOnlyImport,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// Entries copied from the public Nous inference /v1/models list: the free rows carry a
// `:free` id and a zero price; the paid row carries a positive price.
const free = {
  id: "upstage/solar-mini4:free",
  pricing: { prompt: "0", completion: "0", input_cache_read: "0" },
};
const freeLongPrecisionZero = {
  id: "meituan/longcat-2.5:free",
  pricing: { prompt: "0.0000000000", completion: "0.0000000000" },
};
const paid = {
  id: "google/gemini-4-neon",
  pricing: { prompt: "0.0000030000", completion: "0.0000150000", web_search: "0.0140000000" },
};
const noEvidence = { id: "Hermes-4-70B" };

test("nous-research offers the free-only import toggle", () => {
  assert.equal(providerHasFreeModels("nous-research"), true);
  assert.equal(providerHasFreeModels("nous"), true, "the alias resolves to the same provider");
  assert.equal(providerSupportsFreeOnlyImport("nous-research"), true);
});

test("nous-research is free only on live payload evidence", () => {
  assert.equal(isFreeModel("nous-research", free), true);
  assert.equal(isFreeModel("nous-research", freeLongPrecisionZero), true);
  assert.equal(isFreeModel("nous-research", paid), false);
  assert.equal(isFreeModel("nous-research", noEvidence), false, "no payload, no free verdict");
  assert.equal(isModelFreeBadge("nous-research", free), true);
  assert.equal(isModelFreeBadge("nous-research", noEvidence), false);
  assert.equal(isModelFreeBadge("nous-research", { id: "x", name: "Something Free" }), false);
});

test("free-only import keeps only the models Nous itself prices at zero", () => {
  const all = [free, paid, noEvidence, freeLongPrecisionZero];
  assert.deepEqual(selectModelsForImport("nous-research", all, true), {
    models: [free, freeLongPrecisionZero],
    freeFilterEmpty: false,
  });
  assert.deepEqual(selectModelsForImport("nous-research", [paid, noEvidence], true), {
    models: [],
    freeFilterEmpty: true,
  });
  assert.deepEqual(selectModelsForImport("nous-research", all, false), {
    models: all,
    freeFilterEmpty: false,
  });
});
