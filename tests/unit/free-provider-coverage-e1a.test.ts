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
  assertRegistryWave,
  assertRiskNoticeWave,
  providerContribution,
} from "./_helpers/freeProviderWave.ts";
import { PROVIDER_EXPECTATIONS } from "./free-provider-coverage.expectations.ts";

const WAVE = ["zylo-api", "requesty", "routeway", "gitlawb", "onomeo", "dgrid", "naga-ac"];

test("E1a rows match the per-provider expectations", () => assertCatalogWave(WAVE));

test("E1a contributions are the sourced pools, one per provider", () => {
  assertContributionsMatch(WAVE);
});

test("request-metered pools add nothing to the row-sum reading", () => {
  for (const id of WAVE.filter((id) => id !== "zylo-api")) {
    assert.equal(providerContribution(new Set([id])).rowSumLive, 0, id);
  }
});

test("the DGrid deposit boost attaches to a live recurring pool", () => {
  assert.equal(FREE_TIER_BOOSTS.dgrid?.gate, "deposit");
  assert.ok(
    FREE_MODEL_BUDGETS.some(
      (row) =>
        row.provider === "dgrid" && row.poolKey === "dgrid" && row.freeType === "recurring-daily"
    )
  );
});

test("Zylo exposes the documented OpenAI-compatible routes", () => {
  assertRegistryWave([
    {
      id: "zylo-api",
      alias: "zylo",
      chatUrl: "https://api.zyloai.net/v1/chat/completions",
      modelsUrl: "https://api.zyloai.net/v1/models",
      executor: "default",
      aggregator: true,
      endpoint: "https://api.zyloai.net/v1/chat/completions",
    },
  ]);
});

test("all E1a free ids can be routed by their registered provider", () => {
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

test("E1a providers have the recorded risk classification", () => {
  assertRiskNoticeWave(WAVE.map((id) => ({ id, tos: id === "gitlawb" ? "ok" : "caution" })));
});
