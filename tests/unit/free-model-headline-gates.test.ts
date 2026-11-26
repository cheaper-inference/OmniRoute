import assert from "node:assert/strict";
import test from "node:test";

import {
  computeFreeModelTotals,
  computePublicFreeHeadline,
  formatTokenHeadline,
  FREE_MODEL_BUDGETS,
  FREE_TIER_BOOSTS,
  FREE_REGIME_TRAITS,
  grantsFreeAccess,
  isCountingGated,
  isSocialGated,
  type FreeModelBudget,
  type FreeModelFreeType,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { isCatalogFreeModel } from "@/shared/utils/freeModels.ts";
import { summarizeFreeTierBudget } from "../../scripts/docs/readmeFactsFreeTier.mjs";
import { buildBudgetCardModel } from "../../scripts/research/gen-budget-card-svg.mjs";

type Row = FreeModelBudget & { enabled?: boolean };

function row(p: Partial<Row> & { provider: string }): Row {
  return {
    modelId: `${p.provider}-model`,
    displayName: p.provider,
    monthlyTokens: 0,
    creditTokens: 0,
    freeType: "recurring-daily",
    poolKey: null,
    tos: "caution",
    ...p,
  };
}

// ── Task 1: counting gates ──────────────────────────────────────────────────

test("card gate leaves the real figure and lands in gatedRecurringTokens", () => {
  const t = computeFreeModelTotals({
    entries: [
      row({ provider: "a", poolKey: "a", monthlyTokens: 10e6 }),
      row({ provider: "b", poolKey: "b", monthlyTokens: 7e6, gates: ["card"] }),
    ],
  });
  assert.equal(t.steadyRecurringTokens, 10e6);
  assert.equal(t.gatedRecurringTokens, 7e6);
  assert.deepEqual(t.gatedProviders, ["b"]);
  assert.equal(t.socialGatedRecurringTokens, 0);
  assert.equal(t.poolCount, 1);
});

test("telegram gate leaves the real figure and lands in socialGatedRecurringTokens", () => {
  const t = computeFreeModelTotals({
    entries: [
      row({ provider: "a", poolKey: "a", monthlyTokens: 10e6 }),
      row({ provider: "t", poolKey: "t", monthlyTokens: 5e6, gates: ["telegram"] }),
      row({ provider: "t", modelId: "t-2", poolKey: "t", monthlyTokens: 5e6, gates: ["telegram"] }),
    ],
  });
  assert.equal(t.steadyRecurringTokens, 10e6);
  assert.equal(t.gatedRecurringTokens, 0);
  assert.deepEqual(t.gatedProviders, []);
  // pool-deduped, exactly like the real figure
  assert.equal(t.socialGatedRecurringTokens, 5e6);
});

test("an identity or payment gate wins over a social gate on the same row", () => {
  const r = row({ provider: "x", poolKey: "x", monthlyTokens: 3e6, gates: ["phone", "kyc"] });
  assert.equal(isCountingGated(r), true);
  assert.equal(isSocialGated(r), false);
  const t = computeFreeModelTotals({ entries: [r] });
  assert.equal(t.gatedRecurringTokens, 3e6);
  assert.equal(t.socialGatedRecurringTokens, 0);
});

test("card-gated signup credit leaves the first month", () => {
  const t = computeFreeModelTotals({
    entries: [
      row({ provider: "a", poolKey: "a", monthlyTokens: 10e6 }),
      row({
        provider: "c",
        freeType: "one-time-initial",
        creditTokens: 300e6,
        gates: ["card"],
      }),
    ],
  });
  assert.equal(t.firstMonthRealisticTokens, t.steadyRecurringTokens);
  assert.equal(t.firstMonthRealisticTokens, 10e6);
});

test("social boost is never a deposit boost", () => {
  const live = row({
    provider: "openrouter",
    poolKey: "openrouter-free",
    monthlyTokens: 1_200_000,
  });
  const t = computeFreeModelTotals({ entries: [live] });
  assert.equal(t.boostMonthlyTokens, FREE_TIER_BOOSTS["openrouter-free"].boostMonthlyTokens);
  assert.equal(t.socialGatedRecurringTokens, 0);
  // Every shipped boost without a gate is a deposit boost.
  for (const [pool, b] of Object.entries(FREE_TIER_BOOSTS)) {
    assert.ok(
      b.gate === undefined || ["deposit", "telegram", "discord", "phone"].includes(b.gate),
      pool
    );
  }
});

test("new-accounts-only is informational and keeps the row in the real figure", () => {
  const r = row({
    provider: "n",
    poolKey: "n",
    monthlyTokens: 4e6,
    gates: ["new-accounts-only"],
  });
  assert.equal(isCountingGated(r), false);
  assert.equal(isSocialGated(r), false);
  const t = computeFreeModelTotals({ entries: [r] });
  assert.equal(t.steadyRecurringTokens, 4e6);
  assert.equal(t.gatedRecurringTokens, 0);
  assert.equal(t.socialGatedRecurringTokens, 0);
});

test("the legacy eligibilityGate still counts as an identity gate", () => {
  const r = row({
    provider: "r",
    poolKey: "r",
    monthlyTokens: 6e6,
    eligibilityGate: "regional-identity",
  });
  assert.equal(isCountingGated(r), true);
  const t = computeFreeModelTotals({ entries: [r] });
  assert.equal(t.steadyRecurringTokens, 0);
  assert.equal(t.gatedRecurringTokens, 6e6);
});

test("gates affect counting only: grantsFreeAccess and isFreeModel ignore them", () => {
  for (const ft of Object.keys(FREE_REGIME_TRAITS) as FreeModelFreeType[]) {
    assert.equal(grantsFreeAccess(ft), FREE_REGIME_TRAITS[ft].grantsFreeAccess, ft);
  }
  assert.equal(grantsFreeAccess("recurring-daily"), true);
  const freeRow = FREE_MODEL_BUDGETS.find((m) => grantsFreeAccess(m.freeType));
  assert.ok(freeRow, "the shipped catalog has at least one free row");
  assert.equal(isCatalogFreeModel(freeRow.provider, freeRow.modelId), true);
});

/**
 * Frozen copy of the body of `computeFreeModelTotals` from
 * `git show origin/release/v3.8.55:open-sse/config/freeModelCatalog.ts` (lines 238-325, tip
 * 5ffa68e8354): the only gate it knows is `eligibilityGate`, and the boosts table is a parameter
 * here instead of the module constant. It proves "no data changes" by relation, so it never pins a
 * live catalog total and stays valid after the catalog is re-audited.
 */
function referenceTotalsV3855(
  entries: Row[],
  boosts: Record<string, { boostMonthlyTokens: number }>
) {
  const STEADY = new Set(["recurring-daily", "recurring-monthly", "keyless"]);
  const RECUR_CREDIT = new Set(["recurring-credit"]);
  const ONE_TIME = new Set(["one-time-initial"]);
  const UNCAP = new Set(["recurring-uncapped"]);
  const fmt = (n: number) => (n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M");
  const dedupedSum = (
    models: Row[],
    pick: (m: Row) => number,
    include: (m: Row) => boolean
  ): number => {
    const poolMax = new Map<string, number>();
    let loose = 0;
    for (const m of models) {
      if (!include(m)) continue;
      const key = m.poolKey;
      if (key) poolMax.set(key, Math.max(poolMax.get(key) ?? 0, pick(m)));
      else loose += pick(m);
    }
    for (const v of poolMax.values()) loose += v;
    return loose;
  };
  const models = entries.filter((m) => m.enabled !== false);
  const isGated = (m: Row) => m.eligibilityGate !== undefined;
  const steadyRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => STEADY.has(m.freeType) && !isGated(m)
  );
  const gatedRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => STEADY.has(m.freeType) && isGated(m)
  );
  const gatedProviders = [
    ...new Set(models.filter((m) => STEADY.has(m.freeType) && isGated(m)).map((m) => m.provider)),
  ].sort();
  const recurringCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => RECUR_CREDIT.has(m.freeType) && !isGated(m)
  );
  const oneTimeCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => ONE_TIME.has(m.freeType) && !isGated(m)
  );
  const steadyWithRecurringCreditsTokens = steadyRecurringTokens + recurringCredits;
  const firstMonthRealisticTokens = steadyWithRecurringCreditsTokens + oneTimeCredits;
  const livePools = new Set(
    models.filter((m) => STEADY.has(m.freeType) && m.poolKey && !isGated(m)).map((m) => m.poolKey)
  );
  const boostMonthlyTokens = Object.entries(boosts)
    .filter(([pool]) => livePools.has(pool))
    .reduce((s, [, b]) => s + b.boostMonthlyTokens, 0);
  const uncappedProviders = [
    ...new Set(models.filter((m) => UNCAP.has(m.freeType) && !isGated(m)).map((m) => m.provider)),
  ].sort();
  return {
    steadyRecurringTokens,
    steadyWithRecurringCreditsTokens,
    firstMonthRealisticTokens,
    boostMonthlyTokens,
    uncappedProviders,
    gatedRecurringTokens,
    gatedProviders,
    modelCount: models.length,
    poolCount: livePools.size,
    headline: `~${fmt(steadyRecurringTokens)} documented free tokens/month (steady), up to ~${fmt(firstMonthRealisticTokens)} in your first month with signup credits`,
  };
}

test("gate-less rows aggregate exactly as the v3.8.55 algorithm did", () => {
  const plain = FREE_MODEL_BUDGETS.map(({ gates: _gates, ...m }) => m as Row);
  const depositOnly = Object.fromEntries(
    Object.entries(FREE_TIER_BOOSTS).filter(([, b]) => (b.gate ?? "deposit") === "deposit")
  );
  const ref = referenceTotalsV3855(plain, depositOnly);
  const now = computeFreeModelTotals({ entries: plain });
  for (const k of [
    "steadyRecurringTokens",
    "steadyWithRecurringCreditsTokens",
    "firstMonthRealisticTokens",
    "boostMonthlyTokens",
    "gatedRecurringTokens",
    "poolCount",
    "modelCount",
    "headline",
  ] as const) {
    assert.equal(now[k], ref[k], k);
  }
  assert.deepEqual(now.uncappedProviders, ref.uncappedProviders);
  assert.deepEqual(now.gatedProviders, ref.gatedProviders);
  // Gate-less rows add nothing social; only a socially-gated boost on a live pool does (the xKiro
  // Telegram bonus since the November 2026 re-audit). FREE_TIER_BOOSTS is module state, so the
  // expected value is read from it rather than stripped.
  const livePools = new Set(now.perModel.map((m) => m.poolKey));
  const socialBoosts = Object.entries(FREE_TIER_BOOSTS)
    .filter(([pool, b]) => (b.gate ?? "deposit") !== "deposit" && livePools.has(pool))
    .reduce((s, [, b]) => s + b.boostMonthlyTokens, 0);
  assert.equal(now.socialGatedRecurringTokens, socialBoosts);
});

test("no catalog row uses the deposit gate (deposits are boosts)", () => {
  for (const m of FREE_MODEL_BUDGETS) {
    assert.ok(!(m.gates ?? []).includes("deposit"), `${m.provider}/${m.modelId}`);
  }
});

// ── Task 2: public headline and the single formatter ────────────────────────

test("public headline is the ToS-avoid-free reading of the same catalog", () => {
  assert.deepEqual(computePublicFreeHeadline(), computeFreeModelTotals({ excludeTosAvoid: true }));
  const e = [
    row({ provider: "a", poolKey: "a", monthlyTokens: 9e6, tos: "avoid" }),
    row({ provider: "b", poolKey: "b", monthlyTokens: 4e6 }),
  ];
  assert.equal(computePublicFreeHeadline({ entries: e }).steadyRecurringTokens, 4e6);
});

test("formatTokenHeadline edges", () => {
  assert.equal(formatTokenHeadline(92_780_000), "~93M");
  assert.equal(formatTokenHeadline(162_000_000), "~162M");
  assert.equal(formatTokenHeadline(11_502_500_000), "~11.5B");
  assert.equal(formatTokenHeadline(11_352_500_000), "~11.4B");
  assert.equal(formatTokenHeadline(999_600_000), "~1.0B");
  assert.equal(formatTokenHeadline(999_400_000), "~999M");
  assert.equal(formatTokenHeadline(0), "~0M");
  assert.throws(() => formatTokenHeadline(-1), RangeError);
  assert.throws(() => formatTokenHeadline(Number.NaN), RangeError);
  assert.throws(() => formatTokenHeadline(Number.POSITIVE_INFINITY), RangeError);
});

// ── Task 6: gate consumers read the single predicate ────────────────────────

test("budget summaries drop card-gated credit and social-gated pools", () => {
  const t = computeFreeModelTotals({
    entries: [
      row({ provider: "a", poolKey: "a", monthlyTokens: 10e6 }),
      row({ provider: "s", poolKey: "s", monthlyTokens: 8e6, gates: ["telegram"] }),
      row({
        provider: "c",
        freeType: "one-time-initial",
        creditTokens: 300e6,
        gates: ["card"],
      }),
      row({ provider: "d", freeType: "one-time-initial", creditTokens: 5e6 }),
    ],
  });
  const summary = summarizeFreeTierBudget(t, (id: string) => id);
  assert.deepEqual(
    summary.pools.map((p: { provider: string }) => p.provider),
    ["a"]
  );
  assert.deepEqual(
    summary.oneTime.map((o: { provider: string }) => o.provider),
    ["d"]
  );

  const card = buildBudgetCardModel(t);
  assert.deepEqual(
    card.grid.map((r: { provider: string }) => r.provider),
    ["a"]
  );
  assert.deepEqual(card.copy.chips, ["d 5M"]);
});
