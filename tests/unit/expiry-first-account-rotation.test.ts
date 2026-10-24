/**
 * `expiry-first`: a per-provider ACCOUNT fallback strategy that spends the quota
 * closest to being lost.
 *
 * Why a new strategy rather than reusing `reset-aware`: they answer different
 * questions. `scoreResetAwareQuota` ranks mostly on leftover and adds
 * `resetUrgency * (1 - remaining)`, a RECOVERY signal that favours a nearly empty
 * account about to refresh. Its urgency term is also relative to a nominal window
 * length (5h session / 7d weekly) and saturates to zero outside it, so on the
 * real four-account Codex pool below it scores the two 88% accounts IDENTICALLY
 * (0.341725 each) and cannot separate a reset 69h away from one 145h away.
 *
 * The pool, measured 2026-09-22:
 *
 *   priority 1   26% left, resets in ~145h   -> 0.26 / 145   = 0.0018 /h
 *   priority 2   88% left, resets in ~145h   -> 0.88 / 145   = 0.0061 /h
 *   priority 3    1% left, resets in ~8h     -> exhausted, excluded
 *   priority 4   88% left, resets in ~69h    -> 0.88 / 69.3  = 0.0127 /h
 *
 * fill-first picks priority 1 and lets priority 4's 88% expire. expiry-first
 * picks priority 4. Priority 3 must NOT win despite the nearest reset: there is
 * nothing left to spend, which is why ranking on the deadline alone (plain
 * earliest-deadline-first) is the wrong rule.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { __clearForTests, getQuotaCache, setQuotaCache } from "@/domain/quotaCache";
import { selectExpiryFirstConnection } from "@/sse/services/expiryFirstAccountSelection";
import {
  resolveExpiryFirstConfig,
  scoreExpiryFirstQuota,
} from "@omniroute/open-sse/services/combo/quotaScoring.ts";
import {
  getExpiryFirstQuotaMetrics,
  getExpiryFirstPlan,
  resolveExpiryFirstPlanWeight,
  selectExpiryFirstQuotaWindowNames,
} from "@/sse/services/expiryFirstMetrics";
import { updateQuotaBurnMetrics } from "@/domain/quotaBurnMetrics";

const HOUR = 60 * 60 * 1000;
const NOW = Date.UTC(2026, 8, 22, 11, 36);

type Account = {
  id: string;
  priority: number;
  lastUsedAt?: string | null;
  backoffLevel?: number | null;
  providerSpecificData?: Record<string, unknown> | null;
};

function view(remainingPercent: number, resetInHours: number) {
  return {
    windows: {
      session: {
        percentUsed: 1 - remainingPercent / 100,
        resetAt: new Date(NOW + resetInHours * HOUR).toISOString(),
      },
    },
  };
}

const POOL: Account[] = [
  { id: "prio1", priority: 1 },
  { id: "prio2", priority: 2 },
  { id: "prio3", priority: 3 },
  { id: "prio4", priority: 4 },
];
const VIEWS: Record<string, Record<string, unknown>> = {
  prio1: view(26, 144.8),
  prio2: view(88, 145.0),
  prio3: view(1, 7.7),
  prio4: view(88, 69.3),
};
const pick = (pool: Account[], views: Record<string, Record<string, unknown> | null>) =>
  selectExpiryFirstConnection(pool, null, (id) => views[id] ?? null, NOW);

describe("expiry-first account rotation", () => {
  it("prefers the account whose quota is closest to expiring unused", () => {
    assert.equal(pick(POOL, VIEWS)?.id, "prio4");
  });

  it("separates two equally full accounts by reset time", () => {
    const config = resolveExpiryFirstConfig(null);
    const sooner = scoreExpiryFirstQuota(view(88, 69.3), config, NOW).score;
    const later = scoreExpiryFirstQuota(view(88, 145.0), config, NOW).score;
    assert.ok(sooner > later, `${sooner} should exceed ${later}`);
  });

  it("does not pick a nearly empty account just because it resets first", () => {
    assert.notEqual(pick(POOL, VIEWS)?.id, "prio3");
  });

  it("scores an exhausted account at zero so it is never preferred", () => {
    const config = resolveExpiryFirstConfig(null);
    assert.equal(scoreExpiryFirstQuota(view(0, 2), config, NOW).score, 0);
  });

  it("is bound by the tightest window, not the roomiest", () => {
    const config = resolveExpiryFirstConfig(null);
    const both = {
      windows: {
        session: { percentUsed: 1 - 0.9, resetAt: new Date(NOW + 100 * HOUR).toISOString() },
        weekly: { percentUsed: 1 - 0.2, resetAt: new Date(NOW + 10 * HOUR).toISOString() },
      },
    };
    // usable is the weekly 20%, deadline the weekly 10h -> 0.02/h, not 0.009/h.
    assert.ok(Math.abs(scoreExpiryFirstQuota(both, config, NOW).score - 0.02) < 1e-9);
  });

  it("rotates accounts whose pressure ties, instead of pinning the first", () => {
    const twins: Account[] = [
      { id: "a", priority: 1, lastUsedAt: new Date(NOW - 1 * HOUR).toISOString() },
      { id: "b", priority: 2, lastUsedAt: new Date(NOW - 9 * HOUR).toISOString() },
    ];
    const same = view(80, 40);
    assert.equal(
      selectExpiryFirstConnection(twins, null, () => same, NOW)?.id,
      "b",
      "least-recently-used account should win a tie"
    );
  });

  it("skips an account in backoff when pressure ties", () => {
    const twins: Account[] = [
      {
        id: "hurt",
        priority: 1,
        lastUsedAt: new Date(NOW - 9 * HOUR).toISOString(),
        backoffLevel: 2,
      },
      {
        id: "ok",
        priority: 2,
        lastUsedAt: new Date(NOW - 1 * HOUR).toISOString(),
        backoffLevel: 0,
      },
    ];
    const same = view(80, 40);
    assert.equal(selectExpiryFirstConnection(twins, null, () => same, NOW)?.id, "ok");
  });

  it("falls back to the incoming priority order when no account reports quota", () => {
    assert.equal(pick(POOL, {})?.id, "prio1");
  });

  it("ranks on leftover when windows report no reset time", () => {
    const config = resolveExpiryFirstConfig(null);
    const noReset = { windows: { session: { percentUsed: 0.4, resetAt: null } } };
    assert.equal(scoreExpiryFirstQuota(noReset, config, NOW).score, 0.6);
  });

  it("returns null for an empty pool", () => {
    assert.equal(
      selectExpiryFirstConnection([], null, () => null, NOW),
      null
    );
  });

  it("scopes Antigravity expiry windows to the requested model family", () => {
    const names = selectExpiryFirstQuotaWindowNames(
      [
        "claude-opus-5-5-high",
        "claude_gpt_session",
        "claude_gpt_weekly",
        "gemini-3.7-flash-high",
        "gemini_session",
        "gemini_weekly",
      ],
      { provider: "agy", requestedModel: "agy/gemini-3.7-flash-high" }
    );

    assert.deepEqual(names, ["gemini-3.7-flash-high", "gemini_session", "gemini_weekly"]);
  });

  it("scopes Codex Spark expiry windows away from normal Codex windows", () => {
    const names = selectExpiryFirstQuotaWindowNames(
      ["session", "weekly", "gpt_5_3_codex_spark_session", "gpt_5_3_codex_spark_weekly"],
      { provider: "codex", requestedModel: "gpt-5.3-codex-spark" }
    );

    assert.deepEqual(names, ["gpt_5_3_codex_spark_session", "gpt_5_3_codex_spark_weekly"]);
  });

  it("weighs every plan 1 unless the operator opts in with planWeights", () => {
    for (const plan of [
      "Ultra",
      "Pro",
      "Claude Max",
      "default_claude_max_20x",
      "team",
      "unknown",
    ]) {
      assert.equal(resolveExpiryFirstPlanWeight(plan), 1, `${plan} must default to weight 1`);
    }
    assert.equal(resolveExpiryFirstPlanWeight(undefined, { ultra: 6 }), 1);
    assert.equal(resolveExpiryFirstPlanWeight("uLtRa", { ultra: 6 }), 6);
    assert.equal(resolveExpiryFirstPlanWeight("Ultra", { ultra: 0 }), 1);
    assert.equal(resolveExpiryFirstPlanWeight("Claude Max", { max: 5 }), 5);
    assert.equal(resolveExpiryFirstPlanWeight("promax", { pro: 2 }), 2);
    assert.equal(resolveExpiryFirstPlanWeight("Pro", { ultra: 6 }), 1);
    assert.equal(resolveExpiryFirstPlanWeight("Ultra", { ultra: 1000 }), 100);
  });

  it("reads plan labels from Antigravity, Codex, and Claude connection data", () => {
    assert.equal(getExpiryFirstPlan({ plan: "Ultra", tier: "legacy-tier" }), "Ultra");
    assert.equal(getExpiryFirstPlan({ workspacePlanType: "plus" }), "plus");
    assert.equal(getExpiryFirstPlan({ chatgptPlanType: "pro" }), "pro");
    assert.equal(
      getExpiryFirstPlan({ workspacePlanType: "team", chatgptPlanType: "plus" }),
      "plus"
    );
    assert.equal(getExpiryFirstPlan({ plan: "Max" }), "Max");
    assert.equal(getExpiryFirstPlan({ tier: "legacy-tier" }), undefined);
  });

  it("keeps the incoming order for equal quota pressure when no planWeights are configured", () => {
    const accounts: Account[] = [
      { id: "pro", priority: 1, providerSpecificData: { plan: "Pro" } },
      { id: "ultra", priority: 2, providerSpecificData: { plan: "Ultra" } },
    ];
    assert.equal(
      selectExpiryFirstConnection(accounts, null, () => view(50, 2), NOW, {
        provider: "agy",
        requestedModel: "agy/gemini-3.7-flash-high",
      })?.id,
      "pro"
    );
  });

  it("orders equal quota pressure by the operator-configured plan weights", () => {
    const accounts: Account[] = [
      { id: "pro", priority: 1, providerSpecificData: { plan: "Pro" } },
      { id: "ultra", priority: 2, providerSpecificData: { plan: "Ultra" } },
    ];
    assert.equal(
      selectExpiryFirstConnection(accounts, null, () => view(50, 2), NOW, {
        provider: "agy",
        requestedModel: "agy/gemini-3.7-flash-high",
        planWeights: { ultra: 4, pro: 2 },
      })?.id,
      "ultra"
    );
  });

  it("ranks exactly like the metric-free scorer when no burn data and no weights exist", () => {
    const accounts: Account[] = POOL.map((a) => ({
      ...a,
      providerSpecificData: { plan: "Ultra" },
    }));
    const scoped = selectExpiryFirstConnection(accounts, null, (id) => VIEWS[id] ?? null, NOW, {
      provider: "unknown-provider",
      requestedModel: "some-model",
    });
    assert.equal(scoped?.id, pick(POOL, VIEWS)?.id);
    const config = resolveExpiryFirstConfig(null);
    for (const quota of [
      view(88, 69.3),
      view(0, 2),
      view(26, 144.8),
      { windows: { session: { percentUsed: 0.4, resetAt: null } } },
      {
        windows: {
          session: { percentUsed: 0.5, resetAt: new Date(NOW + HOUR).toISOString() },
          weekly: { percentUsed: 0.25, resetAt: new Date(NOW + 50 * HOUR).toISOString() },
        },
      },
    ]) {
      assert.equal(
        scoreExpiryFirstQuota(quota, config, NOW, {
          capacityWeight: 1,
          burnFractionPerHourByWindow: {},
        }).score,
        scoreExpiryFirstQuota(quota, config, NOW).score
      );
    }
  });

  it("projects burn on the weekly deadline window and keeps the session cap-only", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = {
      windows: {
        session: { percentUsed: 0.5, resetAt: new Date(NOW + HOUR).toISOString() },
        weekly: { percentUsed: 0.25, resetAt: new Date(NOW + 10 * HOUR).toISOString() },
      },
    };
    // Deadline is the weekly reset (10h), not the 5h session reset (1h): the
    // session only caps what can be spent (usable = 50%). Session burn is ignored.
    const sessionBurnOnly = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 2,
      burnFractionPerHourByWindow: { session: 0.1 },
    }).score;
    assert.ok(Math.abs(sessionBurnOnly - (0.5 * 2) / 10) < 1e-9);
    // Weekly burn 1%/h x 10h = 10% -> 65% still projected, capped by session 50%.
    const weeklyBurn = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 2,
      burnFractionPerHourByWindow: { session: 0.1, weekly: 0.01 },
    }).score;
    assert.ok(Math.abs(weeklyBurn - (0.5 * 2) / 10) < 1e-9);
    // Weekly burn 5%/h x 10h = 50% -> 25% projected left.
    const heavy = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 1,
      burnFractionPerHourByWindow: { weekly: 0.05 },
    }).score;
    assert.ok(Math.abs(heavy - 0.25 / 10) < 1e-9);
  });

  it("applies Codex and Claude plan fields with configured weights when ranking equal quota pressure", () => {
    const sameQuota = view(50, 2);
    const codexAccounts: Account[] = [
      { id: "plus", priority: 1, providerSpecificData: { workspacePlanType: "plus" } },
      { id: "team", priority: 2, providerSpecificData: { chatgptPlanType: "team" } },
    ];
    const claudeAccounts: Account[] = [
      { id: "pro", priority: 1, providerSpecificData: { plan: "Pro" } },
      { id: "max", priority: 2, providerSpecificData: { plan: "Claude Max" } },
    ];

    assert.equal(
      selectExpiryFirstConnection(codexAccounts, null, () => sameQuota, NOW, {
        provider: "codex",
        requestedModel: "gpt-5-codex",
        planWeights: { plus: 1.5, team: 3 },
      })?.id,
      "team"
    );
    assert.equal(
      selectExpiryFirstConnection(claudeAccounts, null, () => sameQuota, NOW, {
        provider: "anthropic",
        requestedModel: "claude-sonnet",
        planWeights: { pro: 2, max: 4 },
      })?.id,
      "max"
    );
  });

  it("keeps burn-aware scoring bounded by the tightest quota window", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = {
      windows: {
        session: { percentUsed: 0.95, resetAt: new Date(NOW + HOUR).toISOString() },
        weekly: { percentUsed: 0.1, resetAt: new Date(NOW + 10 * HOUR).toISOString() },
      },
    };
    const score = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 1,
      burnFractionPerHourByWindow: { session: 0.01, weekly: 0 },
    }).score;

    // usable = the 5% session cap, deadline = weekly reset in 10h.
    assert.ok(Math.abs(score - 0.005) < 1e-9);
  });

  it("scores predicted waste with plan capacity and measured burn", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = view(50, 2);
    const score = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 2,
      burnFractionPerHourByWindow: { session: 0.1 },
    }).score;

    // Only window is the session (also the deadline): 50% - (10%/h * 2h) projected
    // burn = 30% expected waste; plan capacity 2 => 60 capacity-points / 2h = 0.3.
    assert.ok(Math.abs(score - 0.3) < 1e-9, `expected 0.3, received ${score}`);
  });

  it("matches scoped window names such as 'weekly (spark)' when looking up burn", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = {
      windows: {
        "weekly (spark)": { percentUsed: 0.2, resetAt: new Date(NOW + 10 * HOUR).toISOString() },
      },
    };
    const withBurn = scoreExpiryFirstQuota(quota, config, NOW, {
      burnFractionPerHourByWindow: { "weekly (spark)": 0.04 },
    }).score;
    assert.ok(Math.abs(withBurn - 0.4 / 10) < 1e-9);
  });

  it("keeps the prior score exactly when no metrics are supplied", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = view(50, 2);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW).score, 0.25);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW, { capacityWeight: 1 }).score, 0.25);
  });

  it("weights an explicitly supplied plan capacity and ignores invalid weights", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = view(50, 2);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW, { capacityWeight: 4 }).score, 1);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW, { capacityWeight: 0 }).score, 0.25);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW, { capacityWeight: -3 }).score, 0.25);
    assert.equal(
      scoreExpiryFirstQuota(quota, config, NOW, { capacityWeight: Number.NaN }).score,
      0.25
    );
  });

  it("tracks burn from the start of the same reset window, then smooths later samples", () => {
    const resetAt = new Date(NOW + 3 * HOUR).toISOString();
    const baseline = {
      gemini_session: { remainingPercentage: 80, resetAt },
    };
    const first = updateQuotaBurnMetrics(null, null, null, baseline, NOW - 2 * HOUR);
    assert.equal(first.rates.gemini_session, undefined, "first observation seeds the window");

    const second = updateQuotaBurnMetrics(
      baseline,
      NOW - 2 * HOUR,
      first,
      { gemini_session: { remainingPercentage: 60, resetAt } },
      NOW
    );
    assert.ok(Math.abs(second.rates.gemini_session.fractionPerHour - 0.1) < 1e-9);

    const resetCycle = updateQuotaBurnMetrics(
      { gemini_session: { remainingPercentage: 60, resetAt } },
      NOW,
      second,
      {
        gemini_session: {
          remainingPercentage: 100,
          resetAt: new Date(NOW + 8 * HOUR).toISOString(),
        },
      },
      NOW + HOUR
    );
    assert.equal(
      resetCycle.rates.gemini_session,
      undefined,
      "a new reset cycle resets burn history"
    );
  });

  it("stores observed burn on the connection quota cache used by expiry-first", () => {
    const connectionId = "expiry-first-burn-cache";
    const resetAt = new Date(NOW + 4 * HOUR).toISOString();
    const realNow = Date.now;
    __clearForTests();
    try {
      Date.now = () => NOW - 2 * HOUR;
      setQuotaCache(connectionId, "agy", {
        "gemini-3.7-flash-high": { remainingPercentage: 80, resetAt },
      });
      Date.now = () => NOW;
      setQuotaCache(connectionId, "agy", {
        "gemini-3.7-flash-high": { remainingPercentage: 60, resetAt },
      });

      const burn = getQuotaCache(connectionId)?.burnMetrics?.rates["gemini-3.7-flash-high"];
      assert.ok(burn);
      assert.ok(burn.fractionPerHour > 0);
    } finally {
      Date.now = realNow;
      __clearForTests();
    }
  });

  it("normalizes cached burn window names to match the scoring view", () => {
    const connectionId = "expiry-first-burn-window-case";
    const resetAt = new Date(NOW + 3 * HOUR).toISOString();
    const realNow = Date.now;
    __clearForTests();
    try {
      Date.now = () => NOW - HOUR;
      setQuotaCache(connectionId, "agy", { SESSION: { remainingPercentage: 80, resetAt } });
      Date.now = () => NOW;
      setQuotaCache(connectionId, "agy", { SESSION: { remainingPercentage: 60, resetAt } });

      const metrics = getExpiryFirstQuotaMetrics(connectionId, "Pro", {
        provider: "agy",
        requestedModel: null,
      });
      assert.ok(metrics.burnFractionPerHourByWindow.session > 0);
    } finally {
      Date.now = realNow;
      __clearForTests();
    }
  });

  it("keeps the previous burn baseline for small quota decreases", () => {
    const resetAt = new Date(NOW + 3 * HOUR).toISOString();
    const previousQuotas = { gemini_session: { remainingPercentage: 80, resetAt } };
    const previousMetrics = updateQuotaBurnMetrics(null, null, null, previousQuotas, NOW - HOUR);
    const next = updateQuotaBurnMetrics(
      previousQuotas,
      NOW - HOUR,
      previousMetrics,
      { gemini_session: { remainingPercentage: 79.9, resetAt } },
      NOW
    );

    assert.equal(next.observations.gemini_session.remainingPercentage, 80);
    assert.equal(next.rates.gemini_session, undefined);
  });

  it("clears burn observations with quota-cache test state", async () => {
    const { __clearForTests, getQuotaCache, setQuotaCache } = await import("@/domain/quotaCache");
    __clearForTests();
    setQuotaCache("burn-clear", "agy", {
      "gemini-3.7-flash-high": {
        remainingPercentage: 80,
        resetAt: new Date(NOW + 3 * HOUR).toISOString(),
      },
    });
    assert.ok(getQuotaCache("burn-clear")?.burnMetrics);
    __clearForTests();
    assert.equal(getQuotaCache("burn-clear"), null);
  });

  it("selects the Antigravity quota family before computing expiry urgency", () => {
    const mixed = {
      windows: {
        "gemini-3.7-flash-high": {
          percentUsed: 0.5,
          resetAt: new Date(NOW + 2 * HOUR).toISOString(),
        },
        gemini_weekly: { percentUsed: 0.2, resetAt: new Date(NOW + 100 * HOUR).toISOString() },
        "claude-opus-5-5-high": { percentUsed: 1, resetAt: new Date(NOW + HOUR).toISOString() },
      },
    };
    const scopedNames = selectExpiryFirstQuotaWindowNames(Object.keys(mixed.windows), {
      provider: "agy",
      requestedModel: "agy/gemini-3.7-flash-high",
    });
    const scoped = {
      windows: Object.fromEntries(
        scopedNames.map((name) => [name, mixed.windows[name as keyof typeof mixed.windows]])
      ),
    };

    const config = resolveExpiryFirstConfig(null);
    assert.ok(scopedNames.includes("gemini-3.7-flash-high"));
    assert.ok(!scopedNames.includes("claude-opus-5-5-high"));
    assert.ok(scoreExpiryFirstQuota(scoped, config, NOW).score > 0);
  });
});

/**
 * Claude subscription pool, measured 2026-10-12/13: a Team account whose week
 * resets on Friday and a Max account whose week resets on Wednesday, each with a
 * 5h session inside the weekly cap. Ranked on the nearest reset, the account
 * whose session happened to roll over next won every few hours, so the Max
 * account reached its Wednesday reset with 59% of the week unspent.
 */
type WindowReading = [remainingPercent: number, resetInHours: number | null];

function claudeView(session: WindowReading, weekly: WindowReading, now: number) {
  const reading = ([remaining, resetIn]: WindowReading) => ({
    percentUsed: 1 - remaining / 100,
    resetAt: resetIn === null ? null : new Date(now + resetIn * HOUR).toISOString(),
  });
  return { windows: { "session (5h)": reading(session), "weekly (7d)": reading(weekly) } };
}

describe("expiry-first with a 5h session inside a weekly cap", () => {
  const pool: Account[] = [
    { id: "team", priority: 1 },
    { id: "max", priority: 2 },
  ];
  const pickAt = (now: number, views: Record<string, Record<string, unknown>>) =>
    selectExpiryFirstConnection(pool, null, (id) => views[id] ?? null, now)?.id;
  const config = resolveExpiryFirstConfig(null);

  it("ranks on the weekly reset, not on whichever session rolls over first", () => {
    const t1 = Date.UTC(2026, 9, 12, 12);
    const t2 = Date.UTC(2026, 9, 13, 22);
    assert.equal(
      pickAt(t1, {
        team: claudeView([95, 3.5], [93, 96], t1),
        max: claudeView([98, 4.33], [70, 47], t1),
      }),
      "max"
    );
    assert.equal(
      pickAt(t2, {
        team: claudeView([59, 0.5], [69, 62], t2),
        max: claudeView([92, 1.67], [61, 13], t2),
      }),
      "max"
    );
  });

  it("hands over to the other account once a weekly window has reset", () => {
    assert.equal(
      pickAt(NOW, {
        team: claudeView([100, 4], [63, 49], NOW),
        max: claudeView([100, 5], [100, 168], NOW),
      }),
      "team"
    );
  });

  it("still lets a nearly spent session cap what the account can take now", () => {
    const score = scoreExpiryFirstQuota(claudeView([2, 1], [60, 2], NOW), config, NOW).score;
    assert.ok(Math.abs(score - 0.01) < 1e-9, `${score} should be 0.02 / 2h`);
  });

  it("treats a session whose reset has passed as refilled, not as a deadline", () => {
    const score = scoreExpiryFirstQuota(claudeView([10, -0.5], [60, 5], NOW), config, NOW).score;
    assert.ok(Math.abs(score - 0.12) < 1e-9, `${score} should be 0.6 / 5h`);
  });

  it("falls back to the session reset when the weekly window reports none", () => {
    const score = scoreExpiryFirstQuota(claudeView([50, 2], [80, null], NOW), config, NOW).score;
    assert.ok(Math.abs(score - 0.25) < 1e-9, `${score} should be 0.5 / 2h`);
  });
});
