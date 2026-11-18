import test from "node:test";
import assert from "node:assert/strict";
import {
  createProviderConnection,
  deleteProviderConnection,
  getProviderConnectionById,
} from "../../src/lib/db/providers.ts";
import {
  getProviderCredentials,
  getProviderCredentialsWithQuotaPreflight,
} from "../../src/sse/services/auth.ts";
import { listConnectionCooldowns } from "../../src/lib/resilience/cooldownManager.ts";
import { GET } from "../../src/app/api/usage/availability/route.ts";
import {
  setProviderLimitsCache,
  deleteProviderLimitsCache,
} from "../../src/lib/db/providerLimits.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";
import { toProviderConnection } from "../../src/lib/db/providers/lazyConnectionView.ts";
import { getQuotaCacheState } from "../../src/domain/quotaCacheState.ts";
import { setQuotaCache } from "../../src/domain/quotaCache.ts";
import { updateSettings } from "../../src/lib/db/settings.ts";
import { registerQuotaFetcher } from "../../open-sse/services/quotaPreflight.ts";
import {
  fetchGenericQuota,
  __setGenericUsageFetcherForTests,
} from "../../open-sse/services/genericQuotaFetcher.ts";
import { lockExactModel, clearAllModelLockouts } from "../../open-sse/services/accountFallback.ts";
import { getProviderModels } from "../../open-sse/config/providerModels.ts";
import { CODEX_SPARK_QUOTA_SESSION } from "../../open-sse/config/codexQuotaScopes.ts";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  countDisplay,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const at = (ms: number) => new Date(Date.now() + ms).toISOString();
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };
interface Fixture {
  provider?: string;
  model?: string;
  psd?: Record<string, unknown>;
  fields?: Record<string, unknown>;
  remaining?: number;
  lock?: boolean;
  cutoff?: boolean;
  scoped?: boolean;
  reason?: string;
  windowKind?: string;
  omitSpark?: boolean;
}
async function exercise(f: Fixture, blocked: boolean) {
  const provider = f.provider || "openai";
  const model = f.model || "gpt-5.5";
  const until = at(600_000);
  const c = await createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    apiKey: "synthetic-key",
    accessToken: "synthetic-access",
    refreshToken: "synthetic-refresh",
    isActive: true,
    testStatus: "active",
    providerSpecificData: f.psd || {},
    ...f.fields,
  });
  const id = String(c.id);
  const quotas = {
    session: {
      used: 100 - (f.remaining ?? 80),
      total: 100,
      remainingPercentage: f.remaining ?? 80,
      resetAt: until,
    },
    ...(provider === "codex" && !f.omitSpark
      ? {
          [CODEX_SPARK_QUOTA_SESSION]: {
            used: 20,
            total: 100,
            remainingPercentage: 80,
            resetAt: until,
          },
        }
      : {}),
  };
  try {
    if (provider === "codex") {
      // A new healthy persisted snapshot would itself lift the child cooldown.
      getQuotaCacheState().cache.set(id, {
        connectionId: id,
        provider,
        quotas,
        modelQuotas: {},
        fetchedAt: Date.now(),
        exhausted: false,
        nextResetAt: null,
      });
    } else setQuotaCache(id, provider, quotas);
    setProviderLimitsCache(id, toProviderLimitsCacheEntry({ quotas }, "synthetic"));
    if (f.lock) lockExactModel(provider, id, model, "rate_limit", 600_000);
    await updateSettings({ quotaPreflight: { ...policy, enabled: f.cutoff === true } });
    if (f.cutoff) {
      registerQuotaFetcher(provider, fetchGenericQuota);
      __setGenericUsageFetcherForTests(async () => ({ quotas }));
    }
    if (provider === "codex") {
      const saved = toProviderConnection(await getProviderConnectionById(id));
      assert.deepEqual(
        saved.providerSpecificData.codexScopeRateLimitedUntil,
        f.psd?.codexScopeRateLimitedUntil,
        "synthetic child cooldown is persisted before selection"
      );
    }
    const router = (await (
      f.cutoff ? getProviderCredentialsWithQuotaPreflight : getProviderCredentials
    )(provider, null, [id], model)) as {
      allRateLimited?: boolean;
      allExpired?: boolean;
      connectionId?: string;
      retryAfter?: string;
    } | null;
    if (blocked)
      assert.ok(
        router === null || router.allRateLimited === true || router.allExpired === true,
        "real selector refuses"
      );
    else assert.equal(router?.connectionId, id, "real selector accepts the control");
    const response = await GET();
    assert.equal(response.status, 200);
    const payload = await response.json();
    const verdict = payload.connections.find((row: { id: string }) => row.id === id);
    assert.ok(verdict);
    if (f.reason === "peakHour" && blocked)
      assert.equal(
        verdict.account.blockers.find(
          (blocker: { reason?: string }) => blocker.reason === "peakHour"
        )?.resetAt,
        router?.retryAfter
      );
    const cooldown = (await listConnectionCooldowns()).find((row) => row.id === id);
    const row = toProviderConnection(await getProviderConnectionById(id));
    const now = Date.now();
    const view = displayAccount(
      buildHealthAccount(row, { raw: { quotas } }, {}, now, {
        availability: verdict,
        availabilityObservedAt: now,
        cooldown,
        observedAt: now,
      }),
      now
    );
    if (f.scoped && blocked) {
      assert.equal(view.kind, "ok");
      assert.equal(view.partial, true);
      assert.ok(view.reasons.some((reason) => reason.type === f.reason));
      if (f.reason !== "lockout")
        assert.equal(
          verdict.scopes.find((scope: { model: string }) => scope.model === model)?.decision.usable,
          false
        );
    } else {
      assert.equal(view.kind === "ok", !blocked);
      assert.equal(countDisplay([view]).ok, Number(!blocked));
      if (!blocked) assert.equal(view.partial, false);
    }
    if (f.windowKind && blocked) {
      assert.equal(view.kind, f.windowKind);
      assert.equal(
        verdict.account.blockers[0].resetAt,
        f.psd?.codexScopeRateLimitedUntil &&
          (f.psd.codexScopeRateLimitedUntil as Record<string, string>).codex
      );
    }
    if (f.reason && blocked && !f.scoped)
      assert.ok(view.reasons.some((reason) => reason.type === f.reason));
    return verdict;
  } finally {
    __setGenericUsageFetcherForTests(null);
    clearAllModelLockouts();
    getQuotaCacheState().cache.delete(id);
    deleteProviderLimitsCache(id);
    await deleteProviderConnection(id);
  }
}

for (const [name, f] of [
  ["inactive connection", { fields: { isActive: false } }],
  ["connection cooldown", { fields: { rateLimitedUntil: at(600_000) } }],
  ...["banned", "expired", "credits_exhausted"].map(
    (status) => [status, { fields: { testStatus: status } }] as const
  ),
  [
    "quota limit policy",
    { psd: { limitPolicy: { enabled: true, windows: ["session"], thresholdPercent: 10 } } },
  ],
  ["quota exhaustion", { remaining: 0 }],
  [
    "cached preflight cutoff",
    {
      provider: "kimi-coding",
      model: "kimi-k2.5",
      remaining: 1,
      cutoff: true,
      psd: { quotaPreflightEnabled: true },
    },
  ],
] as Array<[string, Fixture]>) {
  test(`${name} refusal is not available or counted`, () => exercise(f, true));
  test(`${name} absent permits selection and a green capsule`, () =>
    exercise({ provider: f.provider, model: f.model, cutoff: f.cutoff }, false));
}
for (const [scope, model] of [
  ["codex", "gpt-5.5"],
  ["spark", "gpt-5.3-codex-spark"],
]) {
  test(`persisted ${scope} child cooldown matches selection`, () =>
    exercise(
      {
        provider: "codex",
        model,
        psd: { codexScopeRateLimitedUntil: { [scope]: at(600_000) } },
        scoped: scope === "spark",
        reason: "scopeCooldown",
        ...(scope === "codex" ? { windowKind: "cd5" } : {}),
      },
      true
    ));
  test(`expired ${scope} child cooldown permits selection`, () =>
    exercise(
      { provider: "codex", model, psd: { codexScopeRateLimitedUntil: { [scope]: at(-600_000) } } },
      false
    ));
}
test("long ordinary child cooldown uses the weekly recovery capsule", () =>
  exercise(
    {
      provider: "codex",
      psd: { codexScopeRateLimitedUntil: { codex: at(2 * 86400_000) } },
      windowKind: "cdw",
    },
    true
  ));
for (const mode of ["block", "avoid"]) {
  // Two complementary windows cover every UTC minute without a clock-dependent gap.
  const windows = [
    { startUtc: "00:00", endUtc: "12:00" },
    { startUtc: "12:00", endUtc: "00:00" },
  ];
  test(`active peak-hour ${mode} blocks ordinary availability`, async () => {
    const verdict = await exercise(
      { psd: { peakHourProtection: { enabled: true, mode, windows } }, reason: "peakHour" },
      true
    );
    assert.ok(Date.parse(verdict.account.blockers[0].resetAt) > Date.now());
  });
  test(`disabled peak-hour ${mode} permits selection`, () =>
    exercise({ psd: { peakHourProtection: { enabled: false, mode, windows } } }, false));
}
const ordinary = getProviderModels("alibaba")[0].id;
for (const [name, model, scoped] of [
  ["ordinary", ordinary, false],
  ["attached", "synthetic-attached-model", true],
] as const) {
  test(`Alibaba ${name} drained model preserves routing restriction`, () =>
    exercise(
      {
        provider: "alibaba",
        model,
        psd: { alibabaFreeDrainedModels: [model] },
        scoped,
        reason: "lockout",
      },
      true
    ));
  test(`Alibaba ${name} model without drain remains available`, () =>
    exercise({ provider: "alibaba", model }, false));
}
test("model-only lock remains a visible scoped restriction", () =>
  exercise({ lock: true, scoped: true, reason: "lockout" }, true));
test("model without lock remains fully available", () => exercise({}, false));
for (const blocked of [true, false]) {
  test(`Spark without a usage window preserves saved cooldown ${blocked}`, () =>
    exercise(
      {
        provider: "codex",
        model: "gpt-5.3-codex-spark",
        omitSpark: true,
        psd: blocked ? { codexScopeRateLimitedUntil: { spark: at(600_000) } } : {},
        scoped: true,
        reason: "scopeCooldown",
      },
      blocked
    ));
  test(`persisted Antigravity family cooldown remains scoped ${blocked}`, () =>
    exercise(
      {
        provider: "antigravity",
        model: "gemini-3-flash",
        psd: blocked ? { antigravityFamilyRateLimitedUntil: { gemini: at(600_000) } } : {},
        scoped: true,
        reason: "lockout",
      },
      blocked
    ));
  test(`Codex filtering opt-out does not erase independent child cooldown ${blocked}`, () =>
    exercise(
      {
        provider: "codex",
        model: "gpt-5.5",
        psd: {
          quotaPreflightEnabled: false,
          limitPolicy: { enabled: false },
          ...(blocked ? { codexScopeRateLimitedUntil: { codex: at(600_000) } } : {}),
        },
        reason: "scopeCooldown",
      },
      blocked
    ));
}
