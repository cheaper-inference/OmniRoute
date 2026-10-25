// Regression for #16318: onomeo's free models must be in the free-model catalog,
// but as recurring-uncapped (30 calls per 5 h in a site-wide shared pool is not a
// token quantity), so they never inflate the steady-recurring headline totals.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "../../open-sse/config/freeModelCatalog.data.ts";

const onomeo = FREE_MODEL_BUDGETS.filter((m) => m.provider === "onomeo");

test("onomeo contributes its free models to the catalog", () => {
  // The live https://onomeo.com/api/info `freeModels` set minus the paused models.
  assert.ok(onomeo.length >= 13, `expected >= 13 onomeo entries, got ${onomeo.length}`);
  assert.ok(
    onomeo.some((m) => m.modelId === "auto"),
    "onomeo must expose the auto router"
  );
  const ids = onomeo.map((m) => m.modelId);
  assert.equal(new Set(ids).size, ids.length, "onomeo model ids must be unique");
});

test("onomeo entries are recurring-uncapped with no invented token figure", () => {
  for (const m of onomeo) {
    assert.equal(m.freeType, "recurring-uncapped", `${m.modelId} freeType`);
    assert.equal(m.monthlyTokens, 0, `${m.modelId} must not claim a monthly token budget`);
    assert.equal(m.creditTokens, 0, `${m.modelId} must not claim credits`);
    assert.equal(m.poolKey, "onomeo", `${m.modelId} must share the single onomeo pool`);
    assert.equal(m.tos, "caution", `${m.modelId} tos must match the upstream-training note`);
  }
});

test("the catalog curation date is bumped for the onomeo change", () => {
  assert.match(FREE_CATALOG_CURATED_AT, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(FREE_CATALOG_CURATED_AT >= "2026-10-25", `stale curated-at ${FREE_CATALOG_CURATED_AT}`);
});
