// #16318, updated per owner answer to Q22, 2026-11-27: count the recurring per-account cap.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "../../open-sse/config/freeModelCatalog.data.ts";

const onomeo = FREE_MODEL_BUDGETS.filter((m) => m.provider === "onomeo");

test("onomeo contributes its free models to the catalog", () => {
  // The live https://onomeo.com/api/info `freeModels` set minus the paused models.
  assert.ok(onomeo.length >= 17, `expected >= 17 onomeo entries, got ${onomeo.length}`);
  assert.ok(
    onomeo.some((m) => m.modelId === "auto"),
    "onomeo must expose the auto router"
  );
  const ids = onomeo.map((m) => m.modelId);
  assert.equal(new Set(ids).size, ids.length, "onomeo model ids must be unique");
});

test("onomeo entries use one daily recurring pool with a documented per-account cap", () => {
  // https://onomeo.com/api/info and https://onomeo.com/models (2026-11-27).
  // 30 calls per 5 hours × (24/5) × 800 × 30 = 3,456,000. The 11 discontinued rows stay at zero.
  const live = onomeo.filter((m) => m.freeType !== "discontinued").map((m) => m.modelId);
  assert.deepEqual(live.sort(), [
    "auto",
    "gemma-4-31b",
    "glm-4.7-flash",
    "glm-5.3",
    "llama-4-scout",
    "mistral-small-3.1",
  ]);
  for (const m of onomeo) {
    assert.ok(
      m.freeType === (live.includes(m.modelId) ? "recurring-daily" : "discontinued"),
      `${m.modelId} freeType`
    );
    assert.equal(
      m.monthlyTokens,
      live.includes(m.modelId) ? 3_456_000 : 0,
      `${m.modelId} monthly budget`
    );
    assert.equal(m.creditTokens, 0, `${m.modelId} must not claim credits`);
    assert.equal(m.poolKey, "onomeo", `${m.modelId} must share the single onomeo pool`);
    assert.equal(m.tos, "caution", `${m.modelId} tos must match the upstream-training note`);
  }
});

test("the catalog curation date is bumped for the onomeo change", () => {
  assert.match(FREE_CATALOG_CURATED_AT, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(FREE_CATALOG_CURATED_AT >= "2026-10-25", `stale curated-at ${FREE_CATALOG_CURATED_AT}`);
});
