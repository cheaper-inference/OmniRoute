import assert from "node:assert/strict";
import test, { after } from "node:test";
import { getCodexUsage, setCodexUsageFetchForTests } from "../../open-sse/services/usage/codex.ts";
import { parseCodexUsageResponse } from "../../open-sse/services/codexQuotaParser.ts";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { convertCachedUsageToQuotaInfo } from "../../src/lib/usage/cachedQuotaConversion.ts";
import {
  getAllProviderLimitsCache,
  getProviderLimitsCache,
  setProviderLimitsCache,
  setProviderLimitsCacheBatch,
  deleteProviderLimitsCache,
} from "../../src/lib/db/providerLimits.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  buildHealthAccount,
  type HealthQuota,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  countDisplay,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
after(() => resetDbInstance());

for (const flagName of ["limit_reached", "limitReached"]) {
  for (const reached of [true, false]) {
    test(`Spark ${flagName}=${reached} survives extraction, both cache writes and JSON reads`, async () => {
      const now = Date.now();
      const window = { used_percent: 20, reset_at: (now + 3600000) / 1000 };
      const wire = {
        rate_limit: { limit_reached: false, primary_window: window },
        additional_rate_limits: [
          {
            limit_name: "GPT-5.3-Codex-Spark",
            rate_limit: { [flagName]: reached, primary_window: window },
          },
        ],
      };
      const connection = { id: "synthetic-spark-limit", provider: "codex", isActive: true };
      setCodexUsageFetchForTests(async () => Response.json(wire));
      try {
        const usage = await getCodexUsage("synthetic-token");
        const entry = toProviderLimitsCacheEntry(usage, "manual", new Date(now).toISOString());
        const verdict = buildConnectionQuotaAvailability(connection, entry, policy);
        const routing = evaluateQuotaCutoff(
          parseCodexUsageResponse(wire, "gpt-5.3-codex-spark"),
          undefined,
          { provider: "codex", requestedModel: "gpt-5.3-codex-spark" }
        );
        const display = displayAccount(
          buildHealthAccount(
            connection,
            {
              raw: {
                fetchedAt: entry.fetchedAt,
                quotas: entry.quotas as Record<string, Partial<HealthQuota>>,
              },
            },
            {},
            now,
            {
              availability: verdict,
              availabilityObservedAt: now,
              cooldown: { id: connection.id, status: "healthy", lockouts: [] },
              observedAt: now,
            }
          ),
          now
        );
        assert.equal(routing.proceed, !reached);
        assert.equal(verdict.scopes.find((s) => s.id === "spark")?.decision.usable, !reached);
        assert.equal(verdict.account.usable, true);
        assert.equal(display.kind, "ok");
        assert.equal(display.partial, reached);
        assert.equal(countDisplay([display]).ok, 1);
        assert.equal(entry.sparkLimitReached, reached);
        assert.equal(entry.limitReached, false);
        setProviderLimitsCache(connection.id, entry);
        assert.equal(getProviderLimitsCache(connection.id)?.sparkLimitReached, reached);
        setProviderLimitsCacheBatch([{ connectionId: connection.id, entry }]);
        assert.equal(getAllProviderLimitsCache()[connection.id]?.sparkLimitReached, reached);
        const cached = getProviderLimitsCache(connection.id)!;
        assert.equal(
          convertCachedUsageToQuotaInfo("codex", cached, "gpt-5.3-codex-spark")?.limitReached,
          reached
        );
        assert.equal(
          buildConnectionQuotaAvailability(connection, cached, policy).scopes.find(
            (s) => s.id === "spark"
          )?.decision.usable,
          !reached
        );
      } finally {
        setCodexUsageFetchForTests(null);
        deleteProviderLimitsCache(connection.id);
      }
    });
  }
}

test("a legacy cache without a Spark flag treats healthy Spark windows as unrestricted", () => {
  const now = Date.now();
  const window = { remainingPercentage: 80, resetAt: new Date(now + 3600000).toISOString() };
  const entry = toProviderLimitsCacheEntry(
    { quotas: { session: window, gpt_5_3_codex_spark_session: window } },
    "manual"
  );
  assert.equal(entry.sparkLimitReached, undefined);
  assert.equal(
    convertCachedUsageToQuotaInfo("codex", entry, "gpt-5.3-codex-spark")?.limitReached,
    false
  );
  assert.equal(
    buildConnectionQuotaAvailability(
      { id: "synthetic-legacy-spark", provider: "codex" },
      entry,
      policy
    ).scopes.find((s) => s.id === "spark")?.decision.usable,
    true
  );
});
