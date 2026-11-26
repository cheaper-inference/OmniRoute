import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  FREE_QUOTA_UNIT,
  FREE_QUOTA_UNIT_BY_POOL,
  RETIRED_FREE_ROWS,
  resolveFreeQuotaUnit,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";

// A set equality instead of a fixed count: each provider wave adds its unit in the same PR and
// no number test changes. A row that turns `discontinued` stays covered through the ledger.
test("providers with a quota unit are exactly the providers with quota in the catalog or the ledger", () => {
  const withQuota = new Set([
    ...FREE_MODEL_BUDGETS.filter((m) => m.monthlyTokens > 0).map((m) => m.provider),
    ...RETIRED_FREE_ROWS.map((r) => r.provider),
  ]);
  assert.deepEqual(new Set(Object.keys(FREE_QUOTA_UNIT)), withQuota);
});

test("pool overrides only name real pool keys", () => {
  const pools = new Set(FREE_MODEL_BUDGETS.map((m) => m.poolKey).filter(Boolean));
  for (const key of Object.keys(FREE_QUOTA_UNIT_BY_POOL)) {
    assert.ok(pools.has(key), `${key} is not a poolKey of the catalog`);
  }
});

test("resolveFreeQuotaUnit falls back to the provider and never invents a unit", () => {
  assert.equal(resolveFreeQuotaUnit({ provider: "groq", poolKey: null }), "tokens");
  assert.equal(
    resolveFreeQuotaUnit({ provider: "cloudflare-ai", poolKey: "cloudflare-ai" }),
    "neurons"
  );
  assert.equal(resolveFreeQuotaUnit({ provider: "unknown-provider", poolKey: null }), undefined);
});

test("initial unit map matches the November audit", () => {
  assert.equal(FREE_QUOTA_UNIT["cloudflare-ai"], "neurons");
  assert.equal(FREE_QUOTA_UNIT["api-airforce"], "requests");
  assert.equal(FREE_QUOTA_UNIT.kiro, "credits");
});
