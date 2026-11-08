import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { getProviderById } from "../../src/shared/constants/providers.ts";
import {
  isCatalogFreeModel,
  isFreeModel,
  isFreeForProvider,
  isModelFreeBadge,
  isPaidModelTarget,
  matchesOnlyPaidModels,
  providerHasFreeModels,
  providerSupportsFreeOnlyImport,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// Official endpoint eligibility, checked 2026-10-27:
// https://opencode.ai/v2/docs/console/models/#endpoints
// Public zero prices describe an OpenCode-only offer, not generic proxy eligibility.
const RESTRICTED_IDS = [
  "opencode/big-pickle",
  "opencode/beam-free",
  "opencode/mimo-v2.6-flash-free",
  "opencode/nemotron-3.5-super-vl-free",
  "opencode/nemotron-3.5-lightning-free",
  "opencode/jev-1.13-free",
  "opencode/longcat-2.5-preview-free",
  "opencode/deepseek-v4.1-flash-free",
  "opencode/glm-5.3-flash-free",
  "opencode/minimax-m3.1-flash-free",
];

describe("#17028 OpenCode client-restricted free offers", () => {
  it("does not grant the ten restricted offers through the generic free catalog", () => {
    assert.equal(
      FREE_MODEL_BUDGETS.some((row) => row.provider === "opencode-zen"),
      false
    );
    for (const id of RESTRICTED_IDS) {
      assert.equal(isCatalogFreeModel("opencode-zen", id), false, id);
      assert.equal(isFreeModel("opencode-zen", { id }), false, id);
      assert.equal(isFreeForProvider("opencode-zen", { id }), false, id);
    }
  });

  it("does not treat public pricing, flags, tags, or suffixes as client eligibility", () => {
    const candidates = [
      { id: RESTRICTED_IDS[0], pricing: { input: 0, output: 0 } },
      { id: "future-free", pricing: { prompt: "0", completion: "0" } },
      { id: "future-free", isFree: true },
      { id: "future-free", free: true },
      { id: "future-free", is_free: true },
      { id: "future-free", tags: ["free"] },
      { id: "future:free" },
      { id: "future-free", isFree: true, pricing: { input: 1, output: 2 } },
    ];
    for (const model of candidates) {
      assert.equal(isFreeModel("opencode-zen", model), false, JSON.stringify(model));
      assert.equal(isFreeForProvider("opencode-zen", model), false);
    }
    assert.deepEqual(selectModelsForImport("opencode-zen", candidates, true), {
      models: [],
      freeFilterEmpty: true,
    });
  });

  it("removes optimistic Free badges in both modes, including cached public free flags", () => {
    for (const strict of [false, true]) {
      for (const id of RESTRICTED_IDS) {
        assert.equal(
          isModelFreeBadge("opencode-zen", { id, name: "Free model" }, { strict }),
          false
        );
        assert.equal(
          isModelFreeBadge("opencode-zen", { id, isFree: true, free: true }, { strict }),
          false
        );
      }
      assert.equal(isModelFreeBadge("opencode-zen", { id: "future:free" }, { strict }), false);
    }
  });

  it("keeps unavailable eligibility unknown instead of asserting that the offers are paid", () => {
    for (const id of RESTRICTED_IDS) {
      assert.equal(isPaidModelTarget(`opencode-zen/${id}`), "unknown", id);
      assert.equal(isPaidModelTarget(`opencode-zen,${id}`), "unknown", id);
    }
    assert.equal(matchesOnlyPaidModels("opencode-zen/*"), false);
  });

  it("preserves the provider and unrestricted import, without offering free-only eligibility", () => {
    assert.ok(getProviderById("opencode-zen"));
    assert.equal(providerHasFreeModels("opencode-zen"), false);
    assert.equal(providerSupportsFreeOnlyImport("opencode-zen"), false);
    const models = [
      { id: RESTRICTED_IDS[0] },
      { id: "paid-model", pricing: { input: 1, output: 2 } },
    ];
    assert.deepEqual(selectModelsForImport("opencode-zen", models, false), {
      models,
      freeFilterEmpty: false,
    });
  });

  it("preserves unrelated free evidence and positive-price vetoes", () => {
    for (const provider of ["openrouter", "siliconflow"]) {
      const model = { id: "control:free", pricing: { prompt: "0", completion: "0" } };
      assert.equal(isFreeModel(provider, model), true);
      assert.equal(isModelFreeBadge(provider, { ...model, isFree: true }), true);
      assert.equal(isFreeModel(provider, { ...model, pricing: { input: 1, output: 2 } }), false);
    }
  });
});
