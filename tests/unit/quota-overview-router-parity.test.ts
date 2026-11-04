import assert from "node:assert/strict";
import { test } from "node:test";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";
import { fetchOpenrouterQuotaWithFreeWindowPreflight } from "../../open-sse/services/openrouterQuotaFetcher.ts";
import { fetchCodexQuota } from "../../open-sse/services/codexQuotaFetcher.ts";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";
import {
  getCodexQuotaWindowFilterForModel,
  omitCodexDisplayOnlyQuotas,
} from "../../open-sse/config/codexQuotaScopes.ts";
import { claudeQuotaMatchesModel } from "../../open-sse/services/usage/claudeQuota.ts";
import type { UsageQuota } from "../../open-sse/services/usage/quota.ts";
import {
  buildHealthAccount,
  type HealthConnection,
  type HealthData,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
  countDisplay,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { availabilityScopes } from "../../src/lib/usage/availabilityScopes.ts";
import type { ProviderLimitsCacheEntry } from "../../src/lib/db/providerLimits.ts";
import * as f from "./quota-overview-router-fixtures.ts";

type Raw = NonNullable<HealthData["raw"]> & {
  syntheticConnectionId?: string;
  modelQuotas?: Record<string, UsageQuota>;
  paidCredits?: ReturnType<typeof f.codex>["paidCredits"];
};
interface Fixture {
  name: string;
  provider: string;
  raw: () => Raw | Promise<Raw>;
  psd?: Record<string, unknown>;
  permitted: boolean;
  model?: string;
  restricted?: string;
  pool?: string;
  fill?: number;
  bypass?: string;
  cutoffs?: Record<string, number>;
}
// Evaluate receives the request-scoped snapshot, not every display-only/scoped row.
// The production selectors are used here; no replica of the cutoff evaluator.
async function route(
  provider: string,
  raw: Raw,
  model: string,
  psd = {},
  cutoffs: Record<string, number> = {}
) {
  if (provider === "openrouter" && raw.syntheticConnectionId) {
    const info = await fetchOpenrouterQuotaWithFreeWindowPreflight(raw.syntheticConnectionId, {
      apiKey: "synthetic-key",
      requestedModel: model,
    });
    assert.ok(info);
    return evaluateQuotaCutoff(info, undefined, { provider, requestedModel: model });
  }
  let quotas = raw.quotas || {};
  if (provider === "codex") {
    const filter = getCodexQuotaWindowFilterForModel(model)!;
    quotas = Object.fromEntries(
      Object.entries(omitCodexDisplayOnlyQuotas(quotas)).filter(([name]) => filter(name))
    );
  }
  if (provider === "claude") {
    const selected = Object.entries(raw.modelQuotas || {}).filter(
      ([, q]) => q.claudeQuota && claudeQuotaMatchesModel(q.claudeQuota, model)
    );
    quotas = { ...quotas, ...Object.fromEntries(selected) };
  }
  const info = convertUsageToQuotaInfo({ ...raw, quotas }, { provider, requestedModel: model });
  assert.ok(info, "fixture must provide measurable router evidence, not fail-open null");
  return evaluateQuotaCutoff(
    { ...info, ...(raw.paidCredits ? { paidCredits: raw.paidCredits } : {}) },
    { resolveMinRemainingPercent: (name) => (name ? cutoffs[name] : undefined) ?? 2 },
    { provider, providerSpecificData: psd, requestedModel: model }
  );
}
const table: Fixture[] = [];
for (const [provider, builder, model] of [
  ["openrouter", f.openrouter, "openai/gpt-5"],
  ["kiro", f.kiro, "claude-sonnet-4"],
  ["codex", f.codex, "gpt-5.4"],
  ["claude", f.claude, "claude-opus-4"],
  ["devin-cli", f.devin, "devin"],
  ["devin-cli-agentic", f.devin, "devin"],
  ["kimi-coding", f.kimi, "kimi-k2.5"],
  ["moonshot", f.kimi, "kimi-k2.5"],
  ["glm", f.glm, "glm-5"],
  ["glm-cn", f.glm, "glm-5"],
  ["glmt", f.glm, "glm-5"],
  ["zai", f.glm, "glm-5"],
  ["opencode-go", f.glm, "glm-5"],
  ["github", f.github, "gpt-5"],
  ["antigravity", f.antigravity, "gemini-3-flash"],
  ["agy", f.antigravity, "gemini-3-flash"],
] as const) {
  for (const pct of [80, 0])
    table.push({
      name: `${provider}: all ${pct ? "healthy" : "exhausted"}`,
      provider,
      raw: () => builder(pct),
      model,
      permitted: pct > 0,
    });
}
for (const [base, trial] of [
  [80, 0],
  [0, 80],
])
  table.push({
    name: `Kiro alternatives ${base}/${trial}`,
    provider: "kiro",
    raw: () => f.kiro(base, trial),
    permitted: true,
    fill: 80,
  });
table.push({
  name: "Kiro window-specific cutoff selects actually usable alternative",
  provider: "kiro",
  raw: () => f.kiro(80, 20),
  permitted: true,
  fill: 20,
  cutoffs: { agentic_request: 90 },
});
table.push({
  name: "Kiro another exhausted resource still blocks",
  provider: "kiro",
  raw: () => ({ quotas: { ...f.kiro(80, 0).quotas, storage: f.quota(0) } }),
  permitted: false,
});
const extra = { ...f.claude(0), extraUsage: { is_enabled: true, utilization: 10 } };
const paid = { has_credits: true, balance: "50" };
const exceptions: Fixture[] = [
  {
    name: "Claude extra usage",
    provider: "claude",
    raw: () => extra,
    psd: { blockExtraUsage: false },
    permitted: true,
    fill: 100,
    bypass: "extraUsage",
  },
  {
    name: "Codex filtering disabled",
    provider: "codex",
    raw: () => f.codex(0),
    psd: { quotaPreflightEnabled: false, limitPolicy: { enabled: false } },
    permitted: true,
    fill: 100,
    bypass: "filteringDisabled",
  },
  {
    name: "Codex paid credits",
    provider: "codex",
    raw: () => f.codex(0, null, 80, paid),
    psd: { allowPaidCredits: true },
    permitted: true,
    fill: 100,
    bypass: "paidCredits",
  },
];
table.push(...exceptions);
for (const psd of [{}, { quotaPreflightEnabled: false }, { limitPolicy: { enabled: false } }])
  table.push({
    name: `Codex no full opt-out ${JSON.stringify(psd)}`,
    provider: "codex",
    raw: () => f.codex(0, 80, 80),
    psd,
    permitted: false,
  });
for (const credits of [
  undefined,
  { has_credits: true, balance: 0 },
  { has_credits: true, balance: 50, overage_limit_reached: true },
])
  table.push({
    name: `Codex unusable credits ${JSON.stringify(credits)}`,
    provider: "codex",
    raw: () => f.codex(0, 80, 80, credits),
    psd: { allowPaidCredits: true },
    permitted: false,
  });
for (const [provider, raw] of [
  ["devin-cli", () => f.devin(0, 80)],
  ["kimi-coding", () => f.kimi(0, 80)],
  ["moonshot", () => f.kimi(80, 0)],
  ["glm", () => f.glm(80, 0, 80)],
  ["github", () => ({ quotas: { ...f.github(80).quotas, chat: f.quota(0) } })],
] as const)
  table.push({ name: `${provider} one blocking account window`, provider, raw, permitted: false });
table.push({
  name: "OpenRouter :free daily scope",
  provider: "openrouter",
  raw: () => f.openrouter(80, 0),
  model: "openai/gpt-5",
  restricted: "synthetic/model:free",
  permitted: true,
  fill: 80,
});
table.push({
  name: "Claude scoped weekly",
  provider: "claude",
  raw: () => f.claude(80, 0),
  model: "claude-opus-4",
  restricted: "claude-sonnet-4",
  permitted: true,
  fill: 80,
});
for (const provider of ["antigravity", "agy"] as const) {
  table.push({
    name: `${provider} independent pool`,
    provider,
    raw: () => f.antigravity(0, 80),
    model: "claude-sonnet-4",
    restricted: "gemini-3-flash",
    pool: "gemini",
    permitted: true,
  });
  table.push({
    name: `${provider} exact model`,
    provider,
    raw: async () => {
      const usage = await f.antigravityModels(provider, 0);
      const pools = f.antigravity(80);
      return {
        ...usage,
        quotaGroups: pools.quotaGroups,
        quotas: { ...usage.quotas, ...pools.quotas },
      };
    },
    model: "claude-sonnet-4-5",
    restricted: "gemini-3-flash",
    permitted: true,
  });
}
table.push({
  name: "Codex Spark scope",
  provider: "codex",
  raw: () => f.codex(80, 0, 80),
  model: "gpt-5.4",
  restricted: "gpt-5.3-codex-spark",
  permitted: true,
  fill: 80,
});
table.push({
  name: "Codex paid credits do not buy Spark quota",
  provider: "codex",
  raw: () => f.codex(0, 0, 80, paid),
  psd: { allowPaidCredits: true },
  model: "gpt-5.4",
  restricted: "gpt-5.3-codex-spark",
  permitted: true,
  fill: 0,
  bypass: "paidCredits",
});

table.push({
  name: "Codex paid credits retain the healthy Spark water level",
  provider: "codex",
  raw: () => f.codex(0, 60, 80, paid),
  psd: { allowPaidCredits: true },
  permitted: true,
  fill: 60,
  bypass: "paidCredits",
});
table.push({
  name: "Codex paid credits require billing consent",
  provider: "codex",
  raw: () => f.codex(0, 80, 80, paid),
  permitted: false,
});
table.push({
  name: "Claude explicit extra usage opt-out needs no invented billing gate",
  provider: "claude",
  raw: () => f.claude(0),
  psd: { blockExtraUsage: false },
  permitted: true,
  fill: 100,
  bypass: "extraUsage",
});
for (const fixture of table)
  test(fixture.name, async () => {
    const raw = await fixture.raw();
    const connection: HealthConnection = {
      id: "synthetic",
      provider: fixture.provider,
      isActive: true,
      testStatus: "active",
      providerSpecificData: fixture.psd,
      quotaWindowThresholds: fixture.cutoffs,
    };
    const account = buildHealthAccount(
      connection,
      { raw, quotas: parseQuotaData(fixture.provider, raw) },
      {},
      f.now,
      {
        availability: buildConnectionQuotaAvailability(
          connection,
          {
            ...raw,
            fetchedAt: new Date(f.now).toISOString(),
          } as Partial<ProviderLimitsCacheEntry>,
          f.policy
        ),
        availabilityObservedAt: f.now,
      }
    );
    const view = displayAccount(account, f.now);
    const router = await route(
      fixture.provider,
      raw,
      fixture.model || "test-model",
      fixture.psd,
      fixture.cutoffs
    );
    assert.equal(router.proceed, fixture.permitted, "router control");
    const scopes = availabilityScopes(fixture.provider, raw);
    const ordinary = scopes.find((scope) => scope.kind === "account");
    const representatives = ordinary
      ? [ordinary]
      : scopes.filter((scope) => scope.kind === "group");
    const routedScopes = await Promise.all(
      representatives.map((scope) =>
        route(fixture.provider, raw, scope.model, fixture.psd, fixture.cutoffs)
      )
    );
    assert.equal(
      account.quotaAvailability?.account.usable,
      routedScopes.length ? routedScopes.some((decision) => decision.proceed) : router.proceed,
      "account payload follows ordinary requests or independent pools"
    );
    assert.equal(view.kind === "ok", router.proceed, "overview must agree with real cutoff");
    assert.equal(countDisplay([view]).ok, Number(router.proceed), "availability count");
    if (fixture.restricted) {
      assert.equal(
        (await route(fixture.provider, raw, fixture.restricted, fixture.psd)).proceed,
        false
      );
      assert.ok(
        view.partial || (fixture.pool && displayPool(account, fixture.pool, f.now).kind !== "ok")
      );
    }
    if (fixture.fill !== undefined)
      assert.ok(
        Math.abs(view.fill! - fixture.fill) < 1e-9,
        `fill ${view.fill} must be ${fixture.fill}`
      );
    if (fixture.bypass)
      assert.ok(view.reasons.some((r) => r.type === "quotaBypass" && r.bypass === fixture.bypass));
  });
// Runtime cooldown / terminal classification are deliberately outside quota parity.
// These guard precedence only: quota opt-outs must never clear genuine runtime failures.
for (const fixture of exceptions)
  for (const state of ["cooldown", "terminal"])
    test(`${fixture.name} preserves ${state}`, async () => {
      const raw = await fixture.raw();
      const view = displayAccount(
        buildHealthAccount(
          {
            id: "synthetic",
            provider: fixture.provider,
            providerSpecificData: fixture.psd,
            isActive: true,
            testStatus: state === "terminal" ? "expired" : "unavailable",
            lastErrorAt: new Date(f.now).toISOString(),
            rateLimitedUntil: state === "cooldown" ? f.resetAt : null,
          },
          { raw, quotas: parseQuotaData(fixture.provider, raw) },
          {},
          f.now,
          { policy: f.policy }
        ),
        f.now
      );
      assert.equal(view.kind, state === "terminal" ? "act" : "cdw");
    });
// Quota predicates include the connection's recent-success override when it is present.
test("Codex code_review: generic evaluator has no request-specific review selector", async () => {
  const raw = f.codex(80, 80, 0);
  const view = displayAccount(
    buildHealthAccount(
      { id: "synthetic-review", provider: "codex", isActive: true },
      { raw, quotas: parseQuotaData("codex", raw) },
      {},
      f.now,
      {
        availability: buildConnectionQuotaAvailability(
          { id: "synthetic-review", provider: "codex", isActive: true },
          { ...raw, fetchedAt: new Date(f.now).toISOString() } as Partial<ProviderLimitsCacheEntry>,
          f.policy
        ),
        availabilityObservedAt: f.now,
      }
    ),
    f.now
  );
  assert.equal(view.kind, "ok");
  assert.equal(view.partial, true);
  // This is a recorded gap, NOT a passing scoped-parity claim: both models are
  // blocked by the generic snapshot, while the dedicated fetcher omits review.
  for (const requestedModel of ["gpt-5.4", "code_review"]) {
    const generic = convertUsageToQuotaInfo(raw, { provider: "codex", requestedModel });
    assert.ok(generic);
    assert.equal(
      evaluateQuotaCutoff(generic, undefined, { provider: "codex", requestedModel }).proceed,
      false
    );
    const dedicated = await f.withResponse(raw.payload, () =>
      fetchCodexQuota(`synthetic-review-${requestedModel}`, {
        accessToken: "synthetic-token",
        requestedModel,
      })
    );
    assert.ok(dedicated);
    assert.equal(
      evaluateQuotaCutoff(dedicated, undefined, { provider: "codex", requestedModel }).proceed,
      true
    );
    assert.equal(
      Object.keys(dedicated.windows!).some((key) => key.startsWith("code_review")),
      false
    );
  }
});
