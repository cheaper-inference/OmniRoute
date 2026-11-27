// Regression: stealth/ox-alpha (Stealth Ox Alpha, free 0/0 pricing, 1M context) was kept in the
// openrouter free roster because the /v1/models synced-row filter drops pricing metadata (see
// #6328). The November 2026 re-audit found the id gone from https://openrouter.ai/api/v1/models
// (2026-11-23), so it stays in the roster only as discontinued: it no longer shows as free.
import { test } from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

test("stealth/ox-alpha stays in the roster as discontinued (id retired upstream)", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "openrouter" && m.modelId === "stealth/ox-alpha"
  );
  assert.ok(entry, "stealth/ox-alpha stays in the catalog for at least one release");
  assert.equal(entry!.poolKey, "openrouter-free");
  assert.equal(entry!.freeType, "discontinued");
  assert.equal(entry!.monthlyTokens, 0, "must not inflate the shared free-pool budget");
  assert.equal(entry!.creditTokens, 0);
});
