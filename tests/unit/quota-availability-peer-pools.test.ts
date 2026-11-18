import test from "node:test";
import assert from "node:assert/strict";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import {
  buildHealthAccount,
  type HealthData,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import { getQuotaCacheState } from "../../src/domain/quotaCacheState.ts";
import { isQuotaExhaustedForRequest } from "../../src/domain/quotaCache.ts";
import {
  evaluateQuotaCutoff,
  registerQuotaFetcher,
} from "../../open-sse/services/quotaPreflight.ts";
import {
  convertUsageToQuotaInfo,
  fetchGenericQuota,
} from "../../open-sse/services/genericQuotaFetcher.ts";

const now = Date.now();
const at = (hours: number) => new Date(now + hours * 3600000).toISOString();
const q = (remainingPercentage: number, hours = 1) => ({
  remainingPercentage,
  resetAt: at(hours),
  windowSeconds: hours > 5 ? 604800 : 18000,
});
const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
registerQuotaFetcher("antigravity", fetchGenericQuota);
function view(usage: NonNullable<HealthData["raw"]>, id = "peer-pools") {
  const connection = { id, provider: "antigravity", isActive: true };
  const verdict = buildConnectionQuotaAvailability(connection, usage, policy);
  const account = buildHealthAccount(connection, { raw: usage }, {}, now, {
    availability: verdict,
    availabilityObservedAt: now,
  });
  return { verdict, account, display: displayAccount(account, now) };
}

test("a healthy exact model keeps its peer pool usable in either model order", () => {
  const connection = { id: "exact-model-alternatives", provider: "antigravity", isActive: true };
  const usage = {
    fetchedAt: at(0),
    quotas: {
      gemini_session: q(80),
      gemini_weekly: q(80, 144),
      "gemini-3-pro-high": q(0),
      "gemini-3-flash": q(80),
    },
    quotaGroups: [{ id: "gemini", models: ["gemini-3-pro-high", "gemini-3-flash"] }],
  };
  getQuotaCacheState().cache.set(connection.id, {
    connectionId: connection.id,
    provider: connection.provider,
    quotas: usage.quotas,
    modelQuotas: {},
    fetchedAt: now,
    exhausted: false,
    nextResetAt: at(1),
  });
  try {
    assert.equal(
      isQuotaExhaustedForRequest(connection.id, connection.provider, "gemini-3-flash"),
      false
    );
    assert.equal(
      evaluateQuotaCutoff(
        convertUsageToQuotaInfo(usage, {
          provider: connection.provider,
          requestedModel: "gemini-3-flash",
        }),
        undefined,
        { provider: connection.provider, requestedModel: "gemini-3-flash" }
      ).proceed,
      true
    );
    const forward = view(usage, connection.id);
    const reversed = view(
      {
        ...usage,
        quotaGroups: [{ id: "gemini", models: [...usage.quotaGroups[0].models].reverse() }],
      },
      connection.id
    );
    assert.equal(forward.verdict.account.usable, true);
    assert.deepEqual(forward.verdict, reversed.verdict);
    assert.equal(displayPool(forward.account, "gemini", now).kind, "ok");
    assert.equal(displayPool(forward.account, "gemini", now).partial, true);
    assert.equal(forward.verdict.scopes.find((s) => s.id === "gemini-3-pro-high")?.kind, "scoped");
    assert.equal(
      forward.verdict.scopes.find((s) => s.id === "gemini-3-pro-high")?.decision.usable,
      false
    );
  } finally {
    getQuotaCacheState().cache.delete(connection.id);
  }
});

test("a pool with all exact models exhausted is blocked in either model order", () => {
  const usage = {
    fetchedAt: at(0),
    quotas: {
      gemini_session: q(80),
      gemini_weekly: q(80, 144),
      "gemini-3-pro-high": q(0, 2),
      "gemini-3-flash": q(0),
    },
    quotaGroups: [{ id: "gemini", models: ["gemini-3-pro-high", "gemini-3-flash"] }],
  };
  const forward = view(usage);
  const reversed = view({
    ...usage,
    quotaGroups: [{ id: "gemini", models: [...usage.quotaGroups[0].models].reverse() }],
  });
  assert.equal(forward.verdict.account.usable, false);
  assert.equal(forward.verdict.scopes.find((s) => s.id === "gemini")?.decision.usable, false);
  assert.deepEqual(forward.verdict, reversed.verdict);
  assert.equal(forward.display.recoverAt, at(1));
});

test("account recovery uses the first peer pool while pool cards keep their own deadlines", () => {
  const usage = {
    fetchedAt: at(0),
    quotas: {
      gemini_session: q(0),
      gemini_weekly: q(80, 144),
      claude_gpt_session: q(80),
      claude_gpt_weekly: q(0, 144),
    },
    quotaGroups: [
      { id: "gemini", models: ["gemini-3-flash"] },
      { id: "claude_gpt", models: ["claude-sonnet-4-5"] },
    ],
  };
  const { verdict, account, display } = view(usage);
  assert.equal(verdict.account.usable, false);
  assert.equal(display.recoverAt, at(1));
  assert.equal(display.kind, "cd5");
  assert.equal(displayPool(account, "gemini", now).kind, "cd5");
  assert.equal(displayPool(account, "gemini", now).recoverAt, at(1));
  assert.equal(displayPool(account, "claude_gpt", now).kind, "cdw");
  assert.equal(displayPool(account, "claude_gpt", now).recoverAt, at(144));
  const reversed = view({ ...usage, quotaGroups: [...usage.quotaGroups].reverse() });
  assert.equal(reversed.display.recoverAt, display.recoverAt);
  assert.equal(reversed.display.kind, display.kind);
});

test("each peer pool must clear all of its blocking windows before it can recover", () => {
  const { account, display } = view({
    fetchedAt: at(0),
    quotas: {
      gemini_session: q(0),
      gemini_weekly: q(0, 144),
      claude_gpt_session: q(0, 2),
      claude_gpt_weekly: q(80, 168),
    },
    quotaGroups: [
      { id: "gemini", models: ["gemini-3-flash"] },
      { id: "claude_gpt", models: ["claude-sonnet-4-5"] },
    ],
  });
  assert.equal(display.kind, "cd5");
  assert.equal(display.recoverAt, at(2));
  assert.equal(displayPool(account, "gemini", now).recoverAt, at(144));
});

test("an unknown peer deadline does not hide another pool's known recovery", () => {
  const { account, display } = view({
    fetchedAt: at(0),
    quotas: {
      gemini_session: q(0),
      claude_gpt_weekly: { remainingPercentage: 0, resetAt: null, windowSeconds: 604800 },
    },
    quotaGroups: [
      { id: "gemini", models: ["gemini-3-flash"] },
      { id: "claude_gpt", models: ["claude-sonnet-4-5"] },
    ],
  });
  assert.equal(display.kind, "cd5");
  assert.equal(display.recoverAt, at(1));
  assert.equal(displayPool(account, "claude_gpt", now).recoverAt, undefined);
});
