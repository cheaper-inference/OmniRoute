import test from "node:test";
import assert from "node:assert/strict";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { getQuotaCacheState } from "../../src/domain/quotaCacheState.ts";
import { isQuotaExhaustedForRequest } from "../../src/domain/quotaCache.ts";
import {
  convertUsageToQuotaInfo,
  fetchGenericQuota,
} from "../../open-sse/services/genericQuotaFetcher.ts";
import {
  evaluateQuotaCutoff,
  registerQuotaFetcher,
} from "../../open-sse/services/quotaPreflight.ts";
registerQuotaFetcher("antigravity", fetchGenericQuota);
registerQuotaFetcher("kimi-coding", fetchGenericQuota);
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
const now = Date.now();
const at = (offset: number) => new Date(now + offset).toISOString();
const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
function seed(
  id: string,
  quotas: Record<string, { remainingPercentage: number; resetAt: string; windowSeconds?: number }>
) {
  getQuotaCacheState().cache.set(id, {
    connectionId: id,
    provider: "antigravity",
    quotas,
    modelQuotas: {},
    fetchedAt: now,
    exhausted: Object.values(quotas).every((q) => q.remainingPercentage === 0),
    nextResetAt: at(1800000),
  });
}
test("AGY mixed independent pools retain a usable account and partial warning", () => {
  const c = { id: "probe-mixed", provider: "antigravity", isActive: true, testStatus: "active" };
  const q = (remainingPercentage: number) => ({ remainingPercentage, resetAt: at(3600000) });
  const usage = {
    fetchedAt: at(0),
    quotas: {
      gemini_session: q(0),
      gemini_weekly: q(0),
      claude_gpt_session: q(80),
      claude_gpt_weekly: q(80),
    },
    quotaGroups: [
      { id: "gemini", models: ["gemini-3-flash"] },
      { id: "claude_gpt", models: ["claude-sonnet-4-5"] },
    ],
  };
  seed(c.id, usage.quotas);
  try {
    const route = evaluateQuotaCutoff(
      convertUsageToQuotaInfo(usage, { provider: c.provider, requestedModel: "claude-sonnet-4-5" }),
      undefined,
      { provider: c.provider, requestedModel: "claude-sonnet-4-5" }
    );
    assert.equal(route.proceed, true);
    const verdict = buildConnectionQuotaAvailability(c, usage, policy);
    const a = buildHealthAccount(c, { raw: usage }, {}, now, {
      availability: verdict,
      availabilityObservedAt: now,
    });
    console.log(
      "mixed pools",
      JSON.stringify({
        verdict,
        account: displayAccount(a, now).kind,
        gemini: displayPool(a, "gemini", now).kind,
        claude: displayPool(a, "claude_gpt", now).kind,
      })
    );
    assert.equal(displayPool(a, "claude_gpt", now).kind, "ok");
    assert.equal(displayAccount(a, now).kind, "ok");
    assert.equal(displayAccount(a, now).partial, true);
  } finally {
    getQuotaCacheState().cache.delete(c.id);
  }
});
test("AGY scoped exhaustion explains only windows applicable to that pool", () => {
  const c = { id: "probe-reset", provider: "antigravity", isActive: true };
  const quotas = {
    gemini_session: { remainingPercentage: 0, resetAt: at(3600000), windowSeconds: 18000 },
    claude_gpt_weekly: { remainingPercentage: 0, resetAt: at(7 * 86400000), windowSeconds: 604800 },
  };
  const usage = {
    fetchedAt: at(0),
    quotas,
    quotaGroups: [
      { id: "gemini", models: ["gemini-3-flash"] },
      { id: "claude_gpt", models: ["claude-sonnet-4-5"] },
    ],
  };
  seed(c.id, quotas);
  try {
    assert.equal(isQuotaExhaustedForRequest(c.id, c.provider, "gemini-3-flash"), true);
    const verdict = buildConnectionQuotaAvailability(c, usage, {
      ...policy,
      enabled: false,
    });
    const a = buildHealthAccount(c, { raw: usage }, {}, now, {
      availability: verdict,
      availabilityObservedAt: now,
    });
    const view = displayPool(a, "gemini", now);
    console.log(
      "scoped reset",
      JSON.stringify({
        decision: verdict.scopes.find((s) => s.id === "gemini"),
        kind: view.kind,
        recoverAt: view.recoverAt,
      })
    );
    assert.equal(view.kind, "cd5");
    assert.equal(view.recoverAt, at(3600000));
  } finally {
    getQuotaCacheState().cache.delete(c.id);
  }
});
test("unchanged runtime deadline remains monotonic when lastErrorAt is updated", () => {
  const c = { id: "probe-cooldown", provider: "claude", isActive: true, testStatus: "active" };
  const verdict = {
    id: c.id,
    account: { usable: true, blockers: [], allowanceReasons: [], fetchedAt: at(0) },
    scopes: [],
  };
  const project = (offset: number, start: number) =>
    displayAccount(
      buildHealthAccount(c, undefined, {}, now + offset, {
        availability: verdict,
        availabilityObservedAt: now + offset,
        cooldown: {
          id: c.id,
          status: "cooling_down",
          testStatus: "unavailable",
          rateLimitedUntil: at(6 * 3600000),
          lastErrorAt: at(start),
          lockouts: [],
        },
        observedAt: now + offset,
        cooldownObservedAt: now,
        cooldownDeadline: now + 6 * 3600000,
      }),
      now + offset
    );
  const before = project(3600000, 0),
    after = project(3600001, 3600000);
  console.log(
    "same deadline",
    JSON.stringify({
      before: { kind: before.kind, fill: before.fill },
      after: { kind: after.kind, fill: after.fill },
    })
  );
  assert.equal(after.kind, before.kind);
  assert.ok(after.fill! >= before.fill!);
});
test("Kimi simultaneous 5h and weekly exhaustion waits for the weekly reset", () => {
  const c = { id: "probe-kimi", provider: "kimi-coding", isActive: true, testStatus: "active" };
  const usage = {
    fetchedAt: at(0),
    quotas: {
      code_5h: { remainingPercentage: 0, resetAt: at(3600000), windowSeconds: 18000 },
      code_7d: { remainingPercentage: 0, resetAt: at(6 * 86400000), windowSeconds: 604800 },
    },
  };
  getQuotaCacheState().cache.set(c.id, {
    connectionId: c.id,
    provider: c.provider,
    quotas: usage.quotas,
    modelQuotas: {},
    fetchedAt: now,
    exhausted: true,
    nextResetAt: at(1800000),
  });
  try {
    const verdict = buildConnectionQuotaAvailability(c, usage, policy);
    const a = buildHealthAccount(c, { raw: usage }, {}, now, {
      availability: verdict,
      availabilityObservedAt: now,
    });
    const view = displayAccount(a, now);
    console.log(
      "simultaneous windows",
      JSON.stringify({ decision: verdict.account, kind: view.kind, recoverAt: view.recoverAt })
    );
    assert.equal(view.kind, "cdw");
    assert.equal(view.recoverAt, at(6 * 86400000));
  } finally {
    getQuotaCacheState().cache.delete(c.id);
  }
});
test("control: healthy generic cached windows produce a usable account", () => {
  const c = { id: "control-healthy", provider: "kimi-coding", isActive: true };
  const usage = {
    fetchedAt: at(0),
    quotas: {
      code_5h: { remainingPercentage: 80, resetAt: at(3600000) },
      code_7d: { remainingPercentage: 80, resetAt: at(6 * 86400000) },
    },
  };
  const verdict = buildConnectionQuotaAvailability(c, usage, policy);
  assert.equal(verdict.account.usable, true);
  assert.equal(
    displayAccount(
      buildHealthAccount(c, { raw: usage }, {}, now, {
        availability: verdict,
        availabilityObservedAt: now,
      }),
      now
    ).kind,
    "ok"
  );
});
test("control: isolated weekly exhaustion identifies the weekly deadline", () => {
  const c = { id: "control-weekly", provider: "kimi-coding", isActive: true };
  const usage = {
    fetchedAt: at(0),
    quotas: {
      code_5h: { remainingPercentage: 80, resetAt: at(3600000) },
      code_7d: { remainingPercentage: 0, resetAt: at(6 * 86400000) },
    },
  };
  const verdict = buildConnectionQuotaAvailability(c, usage, policy);
  const view = displayAccount(
    buildHealthAccount(c, { raw: usage }, {}, now, {
      availability: verdict,
      availabilityObservedAt: now,
    }),
    now
  );
  assert.equal(view.kind, "cdw");
  assert.equal(view.recoverAt, at(6 * 86400000));
});
