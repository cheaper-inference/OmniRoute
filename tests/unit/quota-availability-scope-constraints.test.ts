import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildConnectionQuotaAvailability,
  evaluateCachedQuotaAvailability,
} from "../../src/lib/usage/availability.ts";
import { availabilityScopes } from "../../src/lib/usage/availabilityScopes.ts";
import { convertCachedUsageToQuotaInfo } from "../../src/lib/usage/cachedQuotaConversion.ts";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";
import { normalizeClaudeUsageQuotas } from "../../open-sse/services/usage/claudeQuota.ts";
import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
} from "../../open-sse/config/codexQuotaScopes.ts";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import type { ProviderLimitsCacheEntry } from "../../src/lib/db/providerLimits.ts";

const now = Date.now();
const hour = 3600000;
const at = (hours: number) => new Date(now + hours * hour).toISOString();
const q = (remainingPercentage: number, hours = 1) => ({ remainingPercentage, resetAt: at(hours) });
const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };

for (const [normal, spark] of [
  [0, 80],
  [80, 0],
  [0, 0],
])
  test(`Codex account preserves independent scope eligibility ${normal}/${spark}`, () => {
    const c = { id: `codex-${normal}-${spark}`, provider: "codex", isActive: true };
    const usage = {
      fetchedAt: at(0),
      quotas: {
        session: q(normal),
        weekly: q(normal, 144),
        [CODEX_SPARK_QUOTA_SESSION]: q(spark),
        [CODEX_SPARK_QUOTA_WEEKLY]: q(spark, 144),
      },
    };
    const representatives = availabilityScopes(c.provider, usage);
    const decisions = representatives.map((scope) => ({
      model: scope.model,
      decision: evaluateCachedQuotaAvailability(c, usage, policy, scope.model),
    }));
    for (const { model, decision } of decisions) {
      const route = evaluateQuotaCutoff(
        convertCachedUsageToQuotaInfo(c.provider, usage, model),
        undefined,
        { provider: c.provider, requestedModel: model }
      );
      assert.equal(decision.usable, route.proceed);
    }
    const payload = buildConnectionQuotaAvailability(c, usage, policy);
    assert.equal(payload.account.usable, normal > 0);
    assert.deepEqual(
      payload.account,
      decisions.find(
        ({ model }) => model === representatives.find((s) => s.kind === "account")?.model
      )?.decision
    );
    assert.equal(payload.scopes.find((s) => s.id === "spark")?.decision.usable, spark > 0);
    assert.equal(payload.scopes.find((s) => s.id === "account")?.decision.usable, normal > 0);
    const view = displayAccount(
      buildHealthAccount(c, { raw: usage }, {}, now, {
        availability: payload,
        availabilityObservedAt: now,
      }),
      now
    );
    assert.equal(view.kind === "ok", normal > 0);
    if (normal > 0 && spark === 0) assert.equal(view.partial, true);
  });

for (const enabled of [true, false])
  for (const blockedWindow of ["session", "weekly", "both"])
    test(`Codex blocked ordinary window controls recovery with healthy Spark, preflight ${enabled}, window ${blockedWindow}`, () => {
      const weeklyBlocked = blockedWindow !== "session";
      const c = { id: `ordinary-${enabled}-${blockedWindow}`, provider: "codex", isActive: true };
      const usage = {
        fetchedAt: at(0),
        quotas: {
          session: { ...q(blockedWindow === "weekly" ? 80 : 0), windowSeconds: 18000 },
          weekly: { ...q(weeklyBlocked ? 0 : 80, 144), windowSeconds: 604800 },
          [CODEX_SPARK_QUOTA_SESSION]: q(80, 200),
          [CODEX_SPARK_QUOTA_WEEKLY]: q(80, 300),
        },
      };
      const payload = buildConnectionQuotaAvailability(c, usage, { ...policy, enabled });
      const ordinary = payload.scopes.find((s) => s.id === "account")!;
      assert.equal(payload.account.usable, false);
      assert.deepEqual(payload.account.blockers, ordinary.decision.blockers);
      assert.deepEqual(
        [...new Set(payload.account.blockers.map((b) => b.name))].sort(),
        blockedWindow === "both" ? ["session", "weekly"] : [blockedWindow]
      );
      assert.equal(payload.scopes.find((s) => s.id === "spark")?.decision.usable, true);
      const view = displayAccount(
        buildHealthAccount(c, { raw: usage }, {}, now, {
          availability: payload,
          availabilityObservedAt: now,
        }),
        now
      );
      assert.notEqual(view.kind, "ok");
      assert.equal(view.kind, weeklyBlocked ? "cdw" : "cd5");
      assert.equal(view.recoverAt, at(weeklyBlocked ? 144 : 1));
    });

for (const provider of ["agy", "antigravity"])
  for (const otherRemaining of [0, 80])
    test(`${provider} independent pools determine the account with other pool ${otherRemaining}`, () => {
      const usage = {
        fetchedAt: at(0),
        quotas: {
          gemini_session: q(0),
          gemini_weekly: q(0, 144),
          claude_gpt_session: q(otherRemaining),
          claude_gpt_weekly: q(otherRemaining, 144),
        },
        quotaGroups: [
          { id: "gemini", models: ["gemini-3-flash"] },
          { id: "claude_gpt", models: ["claude-sonnet-4-5"] },
        ],
      };
      const c = { id: `${provider}-${otherRemaining}`, provider, isActive: true };
      const payload = buildConnectionQuotaAvailability(c, usage, policy);
      assert.equal(payload.account.usable, otherRemaining > 0);
      assert.deepEqual(
        payload.account.blockers,
        otherRemaining > 0 ? [] : payload.scopes.flatMap((s) => s.decision.blockers)
      );
      const view = displayAccount(
        buildHealthAccount(c, { raw: usage }, {}, now, {
          availability: payload,
          availabilityObservedAt: now,
        }),
        now
      );
      assert.equal(view.kind, otherRemaining > 0 ? "ok" : "cdw");
      if (otherRemaining > 0) assert.equal(view.partial, true);
    });

test("Claude scoped metadata explains only the requested model", () => {
  const usage = {
    ...normalizeClaudeUsageQuotas({
      five_hour: { utilization: 20, resets_at: at(1) },
      seven_day: { utilization: 20, resets_at: at(144) },
      seven_day_sonnet: { utilization: 100, resets_at: at(168) },
    }),
    fetchedAt: at(0),
  };
  const c = { id: "claude-scoped", provider: "claude" };
  const payload = buildConnectionQuotaAvailability(c, usage, policy);
  assert.equal(payload.account.usable, true);
  assert.equal(evaluateCachedQuotaAvailability(c, usage, policy, "claude-opus-4").usable, true);
  const scoped = evaluateCachedQuotaAvailability(c, usage, policy, "claude-sonnet-4");
  assert.equal(scoped.usable, false);
  assert.ok(scoped.blockers.every((b) => b.name.includes("sonnet")));
});

for (const enabled of [true, false])
  test(`Kiro usable alternative is not an exhausted constraint with preflight ${enabled}`, () => {
    const usage = {
      fetchedAt: at(0),
      quotas: { requests: q(0, 168), requests_freetrial: q(80), storage: q(0) },
    };
    const c = { id: `kiro-${enabled}`, provider: "kiro" };
    const payload = buildConnectionQuotaAvailability(c, usage, { ...policy, enabled });
    if (enabled) {
      assert.equal(payload.account.usable, false);
      assert.deepEqual(
        payload.account.blockers.map((b) => b.name),
        ["storage"]
      );
    } else {
      assert.equal(payload.account.usable, true);
      assert.deepEqual(payload.account.blockers, []);
    }
  });

test("all exhausted alternative budgets form one constraint at their first recovery", () => {
  const payload = buildConnectionQuotaAvailability(
    { id: "kiro-alternatives-blocked", provider: "kiro" },
    { fetchedAt: at(0), quotas: { requests: q(0, 168), requests_freetrial: q(0) } },
    policy
  );
  assert.equal(payload.account.usable, false);
  assert.equal(payload.account.blockers.length, 1);
  assert.equal(payload.account.blockers[0].resetAt, at(1));
});

test("limit-policy and cutoff blockers are both retained", () => {
  const usage: Partial<ProviderLimitsCacheEntry> = {
    fetchedAt: at(0),
    quotas: { session: q(5), weekly: q(0, 144) },
  };
  const payload = buildConnectionQuotaAvailability(
    {
      id: "combined-constraints",
      provider: "kimi-coding",
      providerSpecificData: {
        limitPolicy: { enabled: true, windows: ["session"], thresholdPercent: 90 },
      },
    },
    usage,
    policy
  );
  assert.equal(payload.account.usable, false);
  assert.deepEqual(payload.account.blockers.map((b) => b.name).sort(), ["session", "weekly"]);
});
