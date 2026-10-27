import { isFreeVariantModel } from "@omniroute/open-sse/services/openrouterFreeWindow.ts";
import {
  convertUsageToQuotaInfo,
  fetchGenericQuota,
} from "@omniroute/open-sse/services/genericQuotaFetcher.ts";
import {
  getQuotaFetcher,
  resolveDynamicQuotaFetcher,
} from "@omniroute/open-sse/services/quotaPreflight.ts";

/** Bespoke fetchers need their live response; never guess their wire semantics from usage rows. */
export function canEvaluateCachedCutoff(provider: string, connection: unknown = {}): boolean {
  const fetcher =
    getQuotaFetcher(provider) ||
    resolveDynamicQuotaFetcher(provider, connection as Record<string, unknown>);
  return provider === "codex" || !fetcher || fetcher === fetchGenericQuota;
}
import { parseCodexUsageResponse } from "@omniroute/open-sse/services/codexQuotaParser.ts";
import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
  CODEX_SPARK_DISPLAY_NAME,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";

/** Convert the cached percentage/count fields with routing's existing converter. */
function codexWindow(value: unknown) {
  const window = convertUsageToQuotaInfo({ quotas: { window: value } }, { provider: "codex" })
    ?.windows?.window;
  if (!window) return undefined;
  return {
    used_percent: window.percentUsed * 100,
    reset_at: window.resetAt ? Date.parse(window.resetAt) / 1000 : undefined,
  };
}
export function convertCachedUsageToQuotaInfo(
  provider: string,
  usage: Partial<ProviderLimitsCacheEntry>,
  requestedModel: string | null
) {
  // The dedicated OpenRouter fetcher only consults request counters for :free models.
  // Keep those display rows out of the paid-model conversion as well.
  if (provider === "openrouter" && !isFreeVariantModel(requestedModel))
    return convertUsageToQuotaInfo(
      {
        ...usage,
        quotas: Object.fromEntries(
          Object.entries(usage.quotas || {}).filter(
            ([name]) => !["free_daily", "free_rpm"].includes(name)
          )
        ),
      },
      { provider, requestedModel }
    );
  if (provider !== "codex") return convertUsageToQuotaInfo(usage, { provider, requestedModel });
  const quotas = usage.quotas || {};
  return parseCodexUsageResponse(
    {
      rate_limit_reached_type: usage.rateLimitReachedType,
      rate_limit: {
        limit_reached: usage.limitReached ?? false,
        primary_window: codexWindow(quotas.session),
        secondary_window: codexWindow(quotas.weekly),
      },
      additional_rate_limits: [
        {
          limit_name: CODEX_SPARK_DISPLAY_NAME,
          rate_limit: {
            limit_reached: usage.sparkLimitReached ?? false,
            primary_window: codexWindow(quotas[CODEX_SPARK_QUOTA_SESSION]),
            secondary_window: codexWindow(quotas[CODEX_SPARK_QUOTA_WEEKLY]),
          },
        },
      ],
      credits: usage.paidCredits,
    },
    requestedModel
  );
}
