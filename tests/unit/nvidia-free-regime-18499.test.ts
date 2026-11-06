import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateCatalogEvidence } from "../../scripts/check/freeCatalogEvidence.mjs";
import {
  FREE_MODEL_BUDGETS,
  computeFreeModelTotals,
  FREE_REGIME_TRAITS,
} from "../../open-sse/config/freeModelCatalog.ts";

test("#18499 NVIDIA free endpoints are rate-limited recurring access requiring a key", () => {
  // The retired GPT OSS endpoint is removed independently in #18443.
  const rows = FREE_MODEL_BUDGETS.filter(
    (row) =>
      row.provider === "nvidia" &&
      ["google/gemma-4-31b-it", "nvidia/nemotron-3.5-super-vl-120b-a12b"].includes(row.modelId)
  );
  assert.equal(rows.length, 2);
  for (const row of rows) {
    assert.equal(row.freeType, "recurring-uncapped");
    assert.equal(row.creditTokens, 0);
    assert.equal(row.monthlyTokens, 0);
    assert.equal(row.tos, "caution");
    assert.equal(FREE_REGIME_TRAITS[row.freeType].allowsNoAuthShortcut, false);
    assert.notEqual(row.hardStopGuaranteed, true);
  }
  assert.ok(computeFreeModelTotals().uncappedProviders.includes("nvidia"));
  const policy = JSON.parse(
    readFileSync(
      new URL("../../config/quality/free-catalog-evidence.json", import.meta.url),
      "utf8"
    )
  );
  assert.deepEqual(
    validateCatalogEvidence(
      rows,
      {
        schemaVersion: 1,
        debt: [],
        evidence: policy.evidence.filter(
          (entry: { provider: string }) => entry.provider === "nvidia"
        ),
      },
      { seed: [], previousDebt: [], today: new Date().toISOString().slice(0, 10) }
    ),
    []
  );
});
