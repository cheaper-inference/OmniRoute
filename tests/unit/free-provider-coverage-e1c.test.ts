import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  FREE_TIER_BOOSTS,
  grantsFreeAccess,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { isValidModel } from "@/shared/constants/models.ts";

import {
  assertCatalogWave,
  assertContributionsMatch,
  providerContribution,
} from "./_helpers/freeProviderWave.ts";
import { PROVIDER_EXPECTATIONS } from "./free-provider-coverage.expectations.ts";

const WAVE = ["byteplus", "nara", "openrouter", "xkiro"];

test("E1c rows match the per-provider expectations", () => assertCatalogWave(WAVE));

test("E1c contributions separate signup credit, social gates and recurring pools", () => {
  assertContributionsMatch(WAVE);
  assert.equal(providerContribution(new Set(["openrouter"])).rowSumLive, 0);
  assert.equal(providerContribution(new Set(["nara"])).socialGated, 210_000_000);
  assert.equal(FREE_TIER_BOOSTS["xkiro-free"].gate, "telegram");
  assert.equal(FREE_TIER_BOOSTS["xkiro-free"].boostMonthlyTokens, 15_000_000);
});

test("all E1c free ids can be routed by their registered provider", () => {
  for (const id of WAVE) {
    const provider = REGISTRY[id];
    assert.ok(provider, id);
    const rows = FREE_MODEL_BUDGETS.filter(
      (row) => row.provider === id && grantsFreeAccess(row.freeType)
    );
    assert.equal(rows.length, PROVIDER_EXPECTATIONS[id].live.length, id);
    for (const row of rows) {
      assert.ok(
        provider.passthroughModels || provider.models.some((model) => model.id === row.modelId),
        `${id}/${row.modelId}`
      );
      assert.ok(isValidModel(provider.alias ?? id, row.modelId), `${id}/${row.modelId}`);
    }
  }
});
