import test from "node:test";
import assert from "node:assert/strict";
import { getCodexUsage, setCodexUsageFetchForTests } from "../../open-sse/services/usage/codex.ts";
import { parseCodexUsageResponse } from "../../open-sse/services/codexQuotaParser.ts";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { convertCachedUsageToQuotaInfo } from "../../src/lib/usage/cachedQuotaConversion.ts";
import {
  toProviderLimitsCacheEntry,
  mergeProviderLimitsCacheEntry,
} from "../../src/lib/usage/providerLimitsCache.ts";
import {
  getProviderLimitsCache,
  setProviderLimitsCache,
  setProviderLimitsCacheBatch,
  deleteProviderLimitsCache,
} from "../../src/lib/db/providerLimits.ts";
import {
  buildHealthAccount,
  type HealthQuota,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
test("Codex upstream limit flag survives cache writes and server reconstruction", async () => {
  const now = Date.now();
  const wire = {
    rate_limit: {
      limit_reached: true,
      primary_window: {
        used_percent: 20,
        reset_at: (now + 3600000) / 1000,
        limit_window_seconds: 18000,
      },
      secondary_window: {
        used_percent: 20,
        reset_at: (now + 144 * 3600000) / 1000,
        limit_window_seconds: 604800,
      },
    },
    rate_limit_reached_type: "weekly",
  };
  const connection = { id: "synthetic-codex-limit-flag", provider: "codex", isActive: true };
  setCodexUsageFetchForTests(async () => Response.json(wire));
  try {
    const usage = await getCodexUsage("synthetic-token");
    const routing = evaluateQuotaCutoff(parseCodexUsageResponse(wire, "gpt-5.4"), undefined, {
      provider: "codex",
      requestedModel: "gpt-5.4",
    });
    const next = toProviderLimitsCacheEntry(usage, "manual", new Date(now).toISOString());
    const merged = mergeProviderLimitsCacheEntry("codex", next, { ...next, limitReached: false });
    setProviderLimitsCache(connection.id, merged);
    const cached = getProviderLimitsCache(connection.id)!;
    const verdict = buildConnectionQuotaAvailability(connection, cached, policy);
    const display = displayAccount(
      buildHealthAccount(
        connection,
        {
          raw: {
            fetchedAt: cached.fetchedAt,
            quotas: cached.quotas as Record<string, Partial<HealthQuota>>,
          },
        },
        {},
        now,
        {
          availability: verdict,
          availabilityObservedAt: now,
        }
      ),
      now
    );
    assert.equal(routing.proceed, false);
    assert.equal(verdict.account.usable, false);
    assert.equal(cached.limitReached, true);
    assert.equal(cached.rateLimitReachedType, "weekly");
    assert.equal(convertCachedUsageToQuotaInfo("codex", cached, "gpt-5.4")?.limitReached, true);
    const reconstructed = convertCachedUsageToQuotaInfo("codex", cached, "gpt-5.4");
    assert.ok(reconstructed && "rateLimitReachedType" in reconstructed);
    assert.equal(reconstructed.rateLimitReachedType, "weekly");
    assert.notEqual(display.kind, "ok");
    setProviderLimitsCacheBatch([{ connectionId: connection.id, entry: merged }]);
    assert.deepEqual(getProviderLimitsCache(connection.id), cached);
    wire.rate_limit.limit_reached = false;
    const cleared = mergeProviderLimitsCacheEntry(
      "codex",
      toProviderLimitsCacheEntry(await getCodexUsage("synthetic-token"), "scheduled"),
      cached
    );
    setProviderLimitsCache(connection.id, cleared);
    assert.equal(getProviderLimitsCache(connection.id)?.limitReached, false);
    assert.equal(
      buildConnectionQuotaAvailability(connection, cleared, policy).account.usable,
      true
    );
    assert.equal(
      mergeProviderLimitsCacheEntry(
        "codex",
        toProviderLimitsCacheEntry({ message: "synthetic failure" }, "manual"),
        cached
      ),
      cached
    );
  } finally {
    setCodexUsageFetchForTests(null);
    deleteProviderLimitsCache(connection.id);
  }
});

for (const measuredWeekly of [false, true]) {
  test(`Codex neutral cached windows keep exhaustion evidence without invented slots, weekly ${measuredWeekly}`, () => {
    const cached = {
      quotas: {
        unknown_primary: {
          used: 100,
          total: 100,
          windowSeconds: null,
        },
        ...(measuredWeekly
          ? { weekly: { used: 20, total: 100, windowSeconds: 604800 } }
          : { unknown_secondary: { used: 20, total: 100, windowSeconds: 3600 } }),
      },
    };
    const quota = convertCachedUsageToQuotaInfo("codex", cached, "gpt-5.4");
    assert.ok(quota);
    assert.equal(quota.percentUsed, 1);
    assert.equal(quota.window5h, undefined);
    assert.equal(quota.window7d?.percentUsed, measuredWeekly ? 0.2 : undefined);
    assert.equal(Object.keys(quota.windows ?? {}).length, 2);
    assert.equal(quota.windows?.unknown_primary.percentUsed, 1);
  });
}

test("Codex neutral Spark cache evidence remains separate from the ordinary scope", () => {
  const cached = {
    quotas: {
      session: { used: 20, total: 100 },
      gpt_5_3_codex_spark_unknown_secondary: {
        used: 100,
        total: 100,
        windowSeconds: 3600,
      },
      gpt_5_3_codex_spark_session: { used: 30, total: 100 },
    },
  };
  const ordinary = convertCachedUsageToQuotaInfo("codex", cached, "gpt-5.4");
  const spark = convertCachedUsageToQuotaInfo("codex", cached, "gpt-5.3-codex-spark");
  assert.ok(ordinary);
  assert.ok(spark);
  assert.equal(ordinary.percentUsed, 0.2);
  assert.equal(spark.percentUsed, 1);
  assert.equal(spark.window5h?.percentUsed, 0.3);
  assert.equal(spark.window7d, undefined);
  assert.equal(evaluateQuotaCutoff(ordinary, policy, "codex").proceed, true);
  assert.equal(evaluateQuotaCutoff(spark, policy, "codex").proceed, false);
});

test("Codex legacy cache entries without a limit flag retain their existing eligibility", () => {
  const now = Date.now();
  const usage = toProviderLimitsCacheEntry(
    {
      quotas: {
        session: { remainingPercentage: 80, resetAt: new Date(now + 3600000).toISOString() },
      },
    },
    "manual"
  );
  const quota = convertCachedUsageToQuotaInfo("codex", usage, "gpt-5.4");
  assert.equal(quota?.limitReached, false);
  assert.equal(quota?.window5h?.percentUsed, 0.2);
  assert.equal(quota?.window7d, undefined);
  assert.equal(
    buildConnectionQuotaAvailability(
      { id: "synthetic-codex-legacy", provider: "codex" },
      usage,
      policy
    ).account.usable,
    true
  );
});
