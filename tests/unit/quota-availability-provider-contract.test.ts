import test from "node:test";
import assert from "node:assert/strict";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage/fetcherProviders.ts";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";
import { parseCodexUsageResponse } from "../../open-sse/services/codexQuotaParser.ts";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { getQuotaCacheState } from "../../src/domain/quotaCacheState.ts";
import { isQuotaExhaustedForRequest } from "../../src/domain/quotaCache.ts";
import { evaluateQuotaLimitPolicy } from "../../src/sse/services/quotaLimitPolicy.ts";
import { toProviderConnection } from "../../src/lib/db/providers/lazyConnectionView.ts";

const providers = [
  ...new Set<string>([
    ...USAGE_FETCHER_PROVIDERS,
    "freemodel-dev",
    "v0-vercel",
    "grok-web",
    "devin-cli-agentic",
  ]),
];
const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
const resetAt = "2099-02-01T00:00:00Z";
const fetchedAt = "2099-01-01T00:00:00Z";
for (const provider of providers)
  for (const remainingPercentage of [80, 0]) {
    test(`${provider} cached ${remainingPercentage ? "healthy" : "exhausted"} agrees with dispatch predicates`, () => {
      const id = `synthetic-${provider}-${remainingPercentage}`;
      const quota = { remainingPercentage, resetAt };
      const usage = { fetchedAt, quotas: { session: quota, weekly: quota } };
      const connection = toProviderConnection({ id, provider, isActive: true });
      const state = getQuotaCacheState();
      state.cache.set(id, {
        connectionId: id,
        provider,
        quotas: usage.quotas,
        modelQuotas: {},
        fetchedAt: Date.parse(fetchedAt),
        exhausted: remainingPercentage === 0,
        nextResetAt: resetAt,
      });
      try {
        const info =
          provider === "codex"
            ? parseCodexUsageResponse({
                rate_limit: {
                  primary_window: {
                    used_percent: 100 - remainingPercentage,
                    reset_at: Date.parse(resetAt) / 1000,
                  },
                  secondary_window: {
                    used_percent: 100 - remainingPercentage,
                    reset_at: Date.parse(resetAt) / 1000,
                  },
                },
              })
            : convertUsageToQuotaInfo(usage, { provider });
        const permitted =
          !evaluateQuotaLimitPolicy(provider, connection).blocked &&
          !isQuotaExhaustedForRequest(id, provider, null, connection.providerSpecificData) &&
          evaluateQuotaCutoff(info, undefined, {
            provider,
            connectionId: id,
            providerSpecificData: {},
          }).proceed;
        const summary = buildConnectionQuotaAvailability(connection, usage, policy);
        assert.equal(summary.account.usable, permitted);
        assert.equal(summary.account.usable, remainingPercentage > 0);
        assert.equal(summary.account.fetchedAt, fetchedAt.replace("Z", ".000Z"));
      } finally {
        state.cache.delete(id);
      }
    });
  }
