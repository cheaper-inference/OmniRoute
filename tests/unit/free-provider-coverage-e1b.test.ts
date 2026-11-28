import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  grantsFreeAccess,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { isValidModel } from "@/shared/constants/models.ts";

import {
  assertCatalogWave,
  assertContributionsMatch,
  assertRiskNoticeWave,
  providerContribution,
} from "./_helpers/freeProviderWave.ts";
import { PROVIDER_EXPECTATIONS } from "./free-provider-coverage.expectations.ts";

const WAVE = ["meganova-ai", "free-ai", "aion", "kenari"];

test("E1b rows match the per-provider expectations", () => assertCatalogWave(WAVE));

test("E1b contributions are the sourced pools, one per provider", () => {
  assertContributionsMatch(WAVE);
});

test("request-metered pools add nothing to the row-sum reading", () => {
  for (const id of ["meganova-ai", "free-ai", "kenari"]) {
    assert.equal(providerContribution(new Set([id])).rowSumLive, 0, id);
  }
});

test("Aion's daily API allowance requires card verification", () => {
  const contribution = providerContribution(new Set(["aion"]));
  assert.equal(contribution.real, 0);
  assert.equal(contribution.firstMonth, 0);
  assert.equal(contribution.gated, 600_000);
});

test("credit allowances without a verified model conversion and the withdrawn keyless path stay out", () => {
  assert.ok(
    !FREE_MODEL_BUDGETS.some((row) =>
      ["electronhub", "openadapter", "megabrain"].includes(row.provider)
    )
  );
});

test("all E1b free ids can be routed by their registered provider", () => {
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

test("Kenari carries the unofficial service risk notice", () => {
  assertRiskNoticeWave([{ id: "kenari", tos: "caution", riskNotice: "unofficial-service" }]);
});
