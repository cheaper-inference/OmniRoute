import test from "node:test";
import assert from "node:assert/strict";
import {
  FREE_TIER_BUDGETS,
  FREE_TIER_TOS,
  computeFreeTierTotals,
} from "../../open-sse/config/freeTierCatalog.ts";

test("FREE_TIER_BUDGETS holds positive integer monthly-token budgets", () => {
  // 2026-09-02 re-audit: gemini + ollama-cloud left (no published cap), nara joined;
  // #12591 then dropped cerebras (one-time credit) → 17 legacy keys. 2026-11-23 re-audit: the map
  // mirrors the per-model catalog; ended offers and doubao (no recurring quota) left → 10 keys.
  assert.equal(Object.keys(FREE_TIER_BUDGETS).length, 10);
  for (const [id, tokens] of Object.entries(FREE_TIER_BUDGETS)) {
    assert.ok(Number.isInteger(tokens) && tokens > 0, `${id} must be a positive integer`);
  }
  // docs.mistral.ai usage-limits (2026-11-23): the free mode has no API access.
  assert.equal(FREE_TIER_BUDGETS.mistral, undefined);
  // 10,000 Neurons/day priced on glm-4.7-flash (Workers AI pricing page, 2026-11-23).
  assert.equal(FREE_TIER_BUDGETS["cloudflare-ai"], 22_700_000);
  // #11773: Cerebras is a one-time $5 signup credit, not a recurring monthly grant.
  assert.equal(FREE_TIER_BUDGETS.cerebras, undefined);
  // LongCat is excluded from this recurring-monthly catalog: its free tier is a
  // one-time 10M-token signup grant (not recurring), so it must not appear here.
  assert.equal(FREE_TIER_BUDGETS.longcat, undefined);
});

test("FREE_TIER_TOS marks proxy-prohibited providers as avoid", () => {
  for (const id of ["kiro", "amazon-q", "blackbox", "fireworks"]) {
    assert.equal(FREE_TIER_TOS[id], "avoid", `${id} must be flagged avoid`);
  }
});

test("computeFreeTierTotals sums the documented budgets", () => {
  const t = computeFreeTierTotals();
  // 2026-11-23 re-audit: 10 providers; 24 + 24 + 22.7 + 15 + 1.44 + 1.2 + 0.8 + 0.48 + 0.16 +
  // 0.025 = 89,805,000 (the legacy map now mirrors the per-model catalog, ToS-avoid kiro included).
  assert.equal(t.providerCount, 10);
  assert.equal(t.documentedMonthlyTokens, 89_805_000);
  assert.equal(typeof t.headline, "string");
  assert.match(t.headline, /over 90M /);
});

test("computeFreeTierTotals can exclude ToS-avoid providers", () => {
  const all = computeFreeTierTotals();
  const clean = computeFreeTierTotals({ excludeTosAvoid: true });
  assert.equal(all.documentedMonthlyTokens - clean.documentedMonthlyTokens, 25_000);
  assert.equal(clean.documentedMonthlyTokens, 89_780_000);
  // 2026-11-23 re-audit: 10 legacy providers, minus kiro (ToS avoid) → 9.
  assert.equal(clean.providerCount, 9);
});
