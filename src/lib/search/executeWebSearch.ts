import { getSettings } from "@/lib/db/settings";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import { getProviderCredentials } from "@/sse/services/auth";
import { COOLDOWN_MS, HTTP_STATUS, RateLimitReason } from "@omniroute/open-sse/config/constants.ts";
import { lockModel } from "@omniroute/open-sse/services/accountFallback.ts";
import { isCredentialDiagnosticSentinel } from "@/sse/services/credentialSentinel";
import { isModelLocked } from "@omniroute/open-sse/services/accountFallback.ts";
import { orderAutoSearchFallbacks } from "@/lib/search/codexSearchAutoFallback";
import { recordSearchUsageCost } from "@omniroute/open-sse/handlers/search/reportedCost.ts";
import * as defaultLog from "@/sse/utils/logger";
import {
  getAllSearchProviders,
  getSearchProvider,
  resolveSearchProvider,
  selectProvider,
  supportsSearchType,
  getSearchCredentialFallbacks,
  SEARCH_PROVIDERS,
  type SearchProviderConfig,
  autoSearchCandidates,
  admitsAutoCandidate,
} from "@omniroute/open-sse/config/searchRegistry.ts";
import { handleSearch, type SearchResponse } from "@omniroute/open-sse/handlers/search.ts";
import {
  computeCacheKey,
  getOrCoalesce,
  SEARCH_CACHE_DEFAULT_TTL_MS,
} from "@omniroute/open-sse/services/searchCache.ts";

type SearchLogger = typeof defaultLog;

export interface ExecuteWebSearchInput {
  query: string;
  provider?: string;
  max_results?: number;
  limit?: number;
  search_type?: "web" | "news" | "x";
  offset?: number;
  country?: string;
  language?: string;
  time_range?: "any" | "day" | "week" | "month" | "year";
  content?: {
    snippet?: boolean;
    full_page?: boolean;
    format?: "text" | "markdown";
    max_characters?: number;
  };
  filters?: {
    include_domains?: string[];
    exclude_domains?: string[];
    safe_search?: "off" | "moderate" | "strict";
  };
  provider_options?: Record<string, unknown>;
  strict_filters?: boolean;
  apiKeyId?: string | null;
  log?: SearchLogger;
}

export interface ExecuteWebSearchResult {
  cached: boolean;
  data: SearchResponse;
}

export class WebSearchExecutionError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * A search provider with no keys of its own borrows a chat key (SEARCH_CREDENTIAL_FALLBACKS).
 * A rate limit on that search says nothing about the key's chat health, so the failure is
 * recorded as a model lock on a synthetic model that only search asks for. Chat never selects
 * that model, so it keeps the key; search skips the key until the lock expires.
 */
export const searchKeyLockModel = (searchProviderId: string) => `websearch:${searchProviderId}`;

const SEARCH_KEY_LOCK_STATUSES = new Set<number>([
  HTTP_STATUS.PAYMENT_REQUIRED,
  HTTP_STATUS.RATE_LIMITED,
  HTTP_STATUS.PLAN_LIMIT_EXCEEDED,
]);

/** Lock the borrowed key for search after a rate-limit or quota failure. No-op for other keys. */
export function lockBorrowedSearchKey(
  searchProviderId: string,
  credentials: Record<string, any> | null | undefined,
  status: number | undefined
): void {
  const owner = credentials?.provider;
  const connectionId = credentials?.connectionId;
  if (typeof owner !== "string" || typeof connectionId !== "string") return;
  if (owner === searchProviderId || !status || !SEARCH_KEY_LOCK_STATUSES.has(status)) return;
  lockModel(
    owner,
    connectionId,
    searchKeyLockModel(searchProviderId),
    RateLimitReason.RATE_LIMIT_EXCEEDED,
    COOLDOWN_MS.rateLimit
  );
}

async function resolveSearchCredentials(providerId: string) {
  const creds = await getProviderCredentials(providerId).catch(() => null);
  if (creds && !isCredentialDiagnosticSentinel(creds)) {
    if (
      providerId === "codex-search" &&
      "connectionId" in creds &&
      typeof creds.connectionId === "string" &&
      isModelLocked(providerId, creds.connectionId, "web_search")
    )
      return null;
    return creds;
  }
  for (const fallbackId of getSearchCredentialFallbacks(providerId)) {
    const fallback = await getProviderCredentials(
      fallbackId,
      null,
      null,
      searchKeyLockModel(providerId)
    ).catch(() => null);
    if (fallback && !isCredentialDiagnosticSentinel(fallback)) {
      if (
        providerId === "codex-search" &&
        "connectionId" in fallback &&
        typeof fallback.connectionId === "string" &&
        isModelLocked(providerId, fallback.connectionId, "web_search")
      )
        return null;
      return fallback;
    }
  }
  return null;
}

/** The blockedProviders policy /v1/search applies to everything auto-select may pick. */
async function loadAutoSelectPolicy() {
  const settings = await getSettings().catch(() => null);
  return (provider: SearchProviderConfig) =>
    !isProviderBlockedByIdOrAlias(provider.id, settings?.blockedProviders);
}

function buildDomainFilter(filters?: {
  include_domains?: string[];
  exclude_domains?: string[];
}): string[] | undefined {
  if (!filters) return undefined;
  const parts: string[] = [];
  if (filters.include_domains?.length) parts.push(...filters.include_domains);
  if (filters.exclude_domains?.length) parts.push(...filters.exclude_domains.map((d) => `-${d}`));
  return parts.length > 0 ? parts : undefined;
}

function normalizeMaxResults(input: ExecuteWebSearchInput, providerConfig: SearchProviderConfig) {
  const fromMaxResults =
    typeof input.max_results === "number"
      ? input.max_results
      : typeof input.max_results === "string"
        ? Number(input.max_results)
        : Number.NaN;
  const fromLimit =
    typeof input.limit === "number"
      ? input.limit
      : typeof input.limit === "string"
        ? Number(input.limit)
        : Number.NaN;
  const requested = Number.isFinite(fromMaxResults)
    ? fromMaxResults
    : Number.isFinite(fromLimit)
      ? fromLimit
      : providerConfig.defaultMaxResults;
  return Math.min(Math.max(1, requested), providerConfig.maxMaxResults);
}

function assertValidSearchInput(input: ExecuteWebSearchInput) {
  if (typeof input.query !== "string" || input.query.trim().length === 0) {
    throw new WebSearchExecutionError("Missing required field: query", 400);
  }
  if (input.query.trim().length > 500) {
    throw new WebSearchExecutionError("Query must be 500 characters or fewer", 400);
  }
  if (
    input.search_type &&
    input.search_type !== "web" &&
    input.search_type !== "news" &&
    input.search_type !== "x"
  ) {
    throw new WebSearchExecutionError(`Unsupported search_type: ${String(input.search_type)}`, 400);
  }
}

export async function executeWebSearch(
  input: ExecuteWebSearchInput
): Promise<ExecuteWebSearchResult> {
  assertValidSearchInput(input);

  const log = input.log || defaultLog;
  if (input.provider === "x_search") input.provider = "x-search";
  if (input.provider === "xquik" || input.provider === "xquik_search") {
    input.provider = "xquik-search";
  }
  if (input.provider === "anysearch" || input.provider === "anysearch_search") {
    input.provider = "anysearch-search";
  }
  if (input.provider === "x-search" || input.provider === "xquik-search") input.search_type = "x";
  const searchType = input.search_type || "web";

  if (input.provider) {
    const explicitProvider = resolveSearchProvider(input.provider);
    if (!explicitProvider) {
      throw new WebSearchExecutionError(`Unknown search provider: ${input.provider}`, 400);
    }
    if (!supportsSearchType(explicitProvider, searchType)) {
      throw new WebSearchExecutionError(
        `Search provider ${input.provider} does not support search_type: ${searchType}`,
        400
      );
    }
  }

  let providerConfig = selectProvider(input.provider, searchType);
  if (!providerConfig) {
    throw new WebSearchExecutionError(
      input.provider
        ? `Unknown search provider: ${input.provider}`
        : `No search providers available. Add an API key for a search provider (${getAllSearchProviders()
            .map((provider) => provider.id)
            .join(", ")}) in the dashboard.`,
      400
    );
  }

  let credentials: Record<string, any> | null = null;
  let alternateProviderId: string | undefined;
  let alternateCredentials: Record<string, any> | null = null;

  if (input.provider) {
    credentials = await resolveSearchCredentials(providerConfig.id);
    if (
      !credentials &&
      providerConfig.authType === "none" &&
      typeof input.provider_options?.baseUrl === "string" &&
      input.provider_options.baseUrl.trim().length > 0
    ) {
      credentials = {
        providerSpecificData: { baseUrl: input.provider_options.baseUrl.trim() },
      };
    }
    if (!credentials) {
      throw new WebSearchExecutionError(
        providerConfig.authType === "none"
          ? `Search provider ${providerConfig.id} is not configured. Set its base URL in the dashboard or pass provider_options.baseUrl.`
          : `No credentials configured for search provider: ${providerConfig.id}. Add an API key for "${providerConfig.id}" in the dashboard.`,
        400
      );
    }
  } else {
    // Auto-select: prefer the cheapest admitted provider that actually has
    // credentials. Fallback-only free providers are a last resort, so a
    // configured paid provider is never skipped just because a cheaper
    // no-credentials provider appears first in the cost sort (issue #11524).
    const isAllowed = await loadAutoSelectPolicy();
    const candidateProviders = autoSearchCandidates(searchType).filter(isAllowed);

    for (const candidate of candidateProviders) {
      const candidateCredentials = await resolveSearchCredentials(candidate.id);
      if (admitsAutoCandidate(candidate, candidateCredentials)) {
        providerConfig = candidate;
        credentials = candidateCredentials;
        break;
      }
    }

    if (!credentials) {
      // Last resort: fallback-only providers so out-of-the-box search
      // still works when no credentialed provider is configured.
      // Codex's subscription fallback is only included when opted in (#17933).
      const fallbackProviders = orderAutoSearchFallbacks(
        Object.values(SEARCH_PROVIDERS)
          .filter((provider) => provider.fallbackOnly && supportsSearchType(provider, searchType))
          .filter(isAllowed),
        (a, b) => a.costPerQuery - b.costPerQuery
      );

      for (const fallbackProvider of fallbackProviders) {
        providerConfig = fallbackProvider;
        if (fallbackProvider.id === "duckduckgo-free") {
          credentials = {};
          break;
        }
        const fallbackCredentials = await resolveSearchCredentials(fallbackProvider.id);
        if (fallbackCredentials) {
          credentials = fallbackCredentials;
          break;
        }
      }
    }

    if (!credentials) {
      throw new WebSearchExecutionError(
        `No credentials configured for any search provider. Add an API key for a search provider (${Object.keys(
          SEARCH_PROVIDERS
        ).join(", ")}) in the dashboard.`,
        400
      );
    }

    // Alternates come from the same unblocked candidates. The other fallback-only
    // providers are reserved for last-resort primary selection.
    const otherIds = candidateProviders
      .map((provider) => provider.id)
      .filter((providerId) => providerId !== providerConfig!.id);

    for (const providerId of otherIds) {
      const altConfig = getSearchProvider(providerId);
      const altCreds = await resolveSearchCredentials(providerId);
      if (altConfig && admitsAutoCandidate(altConfig, altCreds)) {
        alternateProviderId = providerId;
        alternateCredentials = altCreds;
        break;
      }
    }
  }

  const clampedMaxResults = normalizeMaxResults(input, providerConfig);
  const cacheKey = computeCacheKey(
    input.query.trim(),
    providerConfig.id,
    searchType,
    clampedMaxResults,
    input.country,
    input.language,
    {
      filters: input.filters,
      offset: input.offset,
      time_range: input.time_range,
    }
  );
  const ttl = providerConfig.cacheTTLMs ?? SEARCH_CACHE_DEFAULT_TTL_MS;

  const { data, cached } = await getOrCoalesce(cacheKey, ttl, async () => {
    const result = await handleSearch({
      query: input.query.trim(),
      provider: providerConfig.id,
      maxResults: clampedMaxResults,
      searchType,
      country: input.country,
      language: input.language,
      timeRange: input.time_range,
      offset: input.offset,
      domainFilter: buildDomainFilter(input.filters),
      contentOptions: input.content,
      strictFilters: input.strict_filters,
      providerOptions: input.provider_options,
      credentials,
      alternateProvider: alternateProviderId,
      alternateCredentials,
      log,
      connectionId: credentials?.connectionId || undefined,
      apiKeyId: input.apiKeyId || undefined,
    });

    if (!result.success || !result.data) {
      lockBorrowedSearchKey(providerConfig.id, credentials, result.status);
      throw new WebSearchExecutionError(result.error || "Search failed", result.status || 502);
    }

    return result.data;
  });

  if (!cached) {
    try {
      const apiKeyId = input.apiKeyId === "local" ? null : input.apiKeyId;
      recordSearchUsageCost(apiKeyId, data.provider, data.usage);
    } catch (error: unknown) {
      log.warn(
        "SEARCH",
        `Cost recording failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return { data, cached };
}
