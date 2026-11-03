import { evaluateQuotaLimitPolicy, resolveQuotaLimitPolicy } from "@/sse/services/quotaLimitPolicy";
import {
  shouldApplyQuotaCutoff,
  resolveMinRemainingPercent,
  type QuotaPreflightPolicy,
} from "@/sse/services/quotaPreflightPolicy";
import {
  getQuotaCache,
  getQuotaSnapshotFetchedAt,
  getQuotaWindowStatus,
  isQuotaExhaustedForRequest,
  hydrateCodexQuotaCacheForRequest,
  normalizeConnectionQuotas,
  normalizeQuotas,
  isExhausted,
  earliestResetAt,
  capParkWindow,
} from "@/domain/quotaCache";
import { getRequestQuotaCacheState, withQuotaCacheReadView } from "@/domain/quotaCacheReadView";
import { isQuotaHealthy } from "@/domain/quotaCacheState";
import { toProviderConnection } from "@/lib/db/providers/lazyConnectionView";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import { isClaudeExtraUsageAllowed } from "@/lib/providers/claudeExtraUsage";
import { isCodexQuotaFilteringDisabled } from "@/lib/providers/codexQuotaFiltering";
import { hasCodexPaidCredits, isCodexPaidCreditsEnabled } from "@/lib/providers/codexPaidCredits";
import { hasOllamaPurchasedCredits } from "@omniroute/open-sse/services/ollamaPurchasedCredits.ts";
import { evaluateQuotaCutoff } from "@omniroute/open-sse/services/quotaPreflight.ts";
import {
  omitCodexDisplayOnlyQuotas,
  toCodexScopedQuotaWindowName,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import { formatQuotaWindowLabel } from "@omniroute/open-sse/services/quotaWindowLabel.ts";
import { availabilityScopes } from "./availabilityScopes";
import { appendSavedRouterScopes, savedRouterBlockers } from "./availabilityRouterFilters";
import { combineQuotaAlternatives } from "./availabilityAlternatives";
import { cutoffBlockingWindows, exhaustedBlockingWindows } from "./availabilityWindows";
import { canEvaluateCachedCutoff, convertCachedUsageToQuotaInfo } from "./cachedQuotaConversion";
import type {
  ConnectionQuotaAvailability,
  QuotaAvailabilityDecision,
  QuotaAvailabilityWindow,
  QuotaAllowanceReason,
} from "./availabilityTypes";

type Usage = Partial<ProviderLimitsCacheEntry>;
function timestamp(value: number | string | null | undefined): string | null {
  const date = new Date(value ?? NaN);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

/** Seed only a private read view, using precisely the routing cache's normalizers. */
function seedReadView(id: string, provider: string, usage: Usage) {
  if (getQuotaCache(id) || !usage.quotas) return;
  const fetchedAt = Date.parse(usage.fetchedAt || "");
  if (!Number.isFinite(fetchedAt)) return;
  const raw = provider === "codex" ? omitCodexDisplayOnlyQuotas(usage.quotas) : usage.quotas;
  const quotas = normalizeConnectionQuotas(raw, provider);
  const exhausted = isExhausted(quotas);
  getRequestQuotaCacheState().cache.set(id, {
    connectionId: id,
    provider,
    quotas,
    modelQuotas: normalizeQuotas(usage.modelQuotas || {}),
    fetchedAt,
    exhausted,
    nextResetAt: exhausted ? capParkWindow(earliestResetAt(quotas), fetchedAt) : null,
  });
}

function blockingWindow(
  name: string,
  resetAt: string | null,
  usage: Usage,
  remainingPercent?: number,
  cutoffPercent?: number
): QuotaAvailabilityWindow {
  const raw = (usage.quotas?.[name] || usage.modelQuotas?.[name] || {}) as {
    displayName?: string;
    windowSeconds?: number;
  };
  const label = formatQuotaWindowLabel({ key: name, ...raw });
  return {
    name,
    resetAt,
    kind:
      raw.windowSeconds && raw.windowSeconds > 0
        ? raw.windowSeconds <= 5 * 3600
          ? "fiveHour"
          : "overall"
        : /week|month|7d|overall/i.test(label)
          ? "overall"
          : /session|5h|five.hour|code_5h/i.test(label)
            ? "fiveHour"
            : "overall",
    ...(remainingPercent !== undefined ? { remainingPercent } : {}),
    ...(cutoffPercent !== undefined ? { cutoffPercent } : {}),
  };
}
function allowances(
  id: string,
  provider: string,
  psd: unknown,
  usage: Usage,
  model: string | null
): QuotaAllowanceReason[] {
  const reasons: QuotaAllowanceReason[] = [];
  if (isClaudeExtraUsageAllowed(provider, psd)) reasons.push("extraUsage");
  if (isCodexQuotaFilteringDisabled(provider, psd)) reasons.push("filteringDisabled");
  if (isCodexPaidCreditsEnabled(provider, psd, model) && hasCodexPaidCredits(usage.paidCredits))
    reasons.push("paidCredits");
  if (hasOllamaPurchasedCredits(usage, provider)) reasons.push("purchasedBalance");
  if (isQuotaHealthy(id)) reasons.push("recentSuccess");
  return reasons;
}

function readCachedUsage(
  id: string,
  provider: string,
  connection: ReturnType<typeof toProviderConnection>,
  persistedUsage: Usage | undefined,
  requestedModel: string | null
): Usage & { cached?: ReturnType<typeof getQuotaCache> } {
  getQuotaSnapshotFetchedAt(id);
  seedReadView(id, provider, persistedUsage || {});
  hydrateCodexQuotaCacheForRequest(connection, requestedModel);
  const cached = getQuotaCache(id);
  return {
    ...(persistedUsage ||
      (cached
        ? {
            quotas: cached.quotas,
            modelQuotas: cached.modelQuotas,
            fetchedAt: timestamp(cached.fetchedAt)!,
          }
        : {})),
    cached,
  };
}
function appendLimitPolicyBlockers(
  blockers: QuotaAvailabilityWindow[],
  id: string,
  provider: string,
  requestedModel: string | null,
  usage: Usage,
  connection: ReturnType<typeof toProviderConnection>
) {
  const local = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  for (const key of local.windows) {
    const name = provider === "codex" ? toCodexScopedQuotaWindowName(key, requestedModel) : key;
    const status = getQuotaWindowStatus(id, name, local.thresholdPercent);
    if (status?.reachedThreshold)
      blockers.push(
        blockingWindow(
          name,
          status.resetAt,
          usage,
          status.remainingPercentage,
          100 - local.thresholdPercent
        )
      );
  }
}
function appendCutoffBlockers(
  blockers: QuotaAvailabilityWindow[],
  quota: ReturnType<typeof convertCachedUsageToQuotaInfo>,
  cutoff: ReturnType<typeof evaluateQuotaCutoff>,
  provider: string,
  connection: ReturnType<typeof toProviderConnection>,
  policy: QuotaPreflightPolicy,
  requestedModel: string | null,
  id: string,
  usage: Usage
) {
  const complete = cutoffBlockingWindows(
    quota,
    {
      resolveMinRemainingPercent: (name) =>
        resolveMinRemainingPercent(provider, connection, policy, name),
    },
    {
      provider,
      requestedModel,
      providerSpecificData: connection.providerSpecificData,
      connectionId: id,
    }
  );
  for (const result of complete.length ? complete : [cutoff])
    blockers.push(
      blockingWindow(
        result.windowName || "quota",
        result.resetAt ?? null,
        usage,
        result.quotaPercent === undefined ? undefined : (1 - result.quotaPercent) * 100,
        resolveMinRemainingPercent(provider, connection, policy, result.windowName ?? null)
      )
    );
}
function appendExhaustedBlockers(
  blockers: QuotaAvailabilityWindow[],
  id: string,
  provider: string,
  requestedModel: string | null,
  providerSpecificData: unknown,
  usage: Usage,
  cached: ReturnType<typeof getQuotaCache>
) {
  for (const quota of exhaustedBlockingWindows(id, provider, requestedModel, providerSpecificData))
    if (!blockers.some((blocker) => blocker.name === quota.name))
      blockers.push(blockingWindow(quota.name, quota.resetAt, usage, quota.remainingPercentage, 0));
  if (!blockers.some((blocker) => !blocker.reason))
    blockers.push(blockingWindow("quota", cached?.nextResetAt ?? null, usage));
}

function evaluateCachedPredicates(
  id: string,
  provider: string,
  connection: ReturnType<typeof toProviderConnection>,
  usage: Usage,
  policy: QuotaPreflightPolicy,
  requestedModel: string | null
) {
  const limitPolicy = evaluateQuotaLimitPolicy(provider, connection, requestedModel);
  const exhausted = isQuotaExhaustedForRequest(
    id,
    provider,
    requestedModel,
    connection.providerSpecificData
  );
  const cutoffEnabled = shouldApplyQuotaCutoff(provider, connection, policy, requestedModel);
  const cutoffEvaluated = !cutoffEnabled || canEvaluateCachedCutoff(provider, connection);
  const quota =
    cutoffEnabled && cutoffEvaluated
      ? convertCachedUsageToQuotaInfo(provider, usage, requestedModel)
      : null;
  const cutoff =
    cutoffEnabled && cutoffEvaluated
      ? evaluateQuotaCutoff(
          quota,
          {
            resolveMinRemainingPercent: (name) =>
              resolveMinRemainingPercent(provider, connection, policy, name),
          },
          {
            provider,
            requestedModel,
            providerSpecificData: connection.providerSpecificData,
            connectionId: id,
          }
        )
      : { proceed: true };
  return { limitPolicy, exhausted, cutoffEnabled, cutoffEvaluated, quota, cutoff };
}
function appendCachedBlockers(
  blockers: QuotaAvailabilityWindow[],
  predicates: ReturnType<typeof evaluateCachedPredicates>,
  id: string,
  provider: string,
  connection: ReturnType<typeof toProviderConnection>,
  policy: QuotaPreflightPolicy,
  requestedModel: string | null,
  usage: Usage,
  cached: ReturnType<typeof getQuotaCache>
) {
  if (predicates.limitPolicy.blocked)
    appendLimitPolicyBlockers(blockers, id, provider, requestedModel, usage, connection);
  if (!predicates.cutoff.proceed)
    appendCutoffBlockers(
      blockers,
      predicates.quota,
      predicates.cutoff,
      provider,
      connection,
      policy,
      requestedModel,
      id,
      usage
    );
  if (predicates.exhausted)
    appendExhaustedBlockers(
      blockers,
      id,
      provider,
      requestedModel,
      connection.providerSpecificData,
      usage,
      cached
    );
}

export function evaluateCachedQuotaAvailability(
  input: unknown,
  persistedUsage: Usage | undefined,
  policy: QuotaPreflightPolicy,
  requestedModel: string | null = null
): QuotaAvailabilityDecision {
  return withQuotaCacheReadView(() => {
    const connection = toProviderConnection(input);
    const { id, provider, providerSpecificData } = connection;
    const { cached, ...readUsage } = readCachedUsage(
      id,
      provider,
      connection,
      persistedUsage,
      requestedModel
    );
    const usage: Usage = readUsage;
    const predicates = evaluateCachedPredicates(
      id,
      provider,
      connection,
      usage,
      policy,
      requestedModel
    );
    const routerBlockers = savedRouterBlockers(connection, requestedModel);
    const blockers: QuotaAvailabilityWindow[] = [...routerBlockers];
    appendCachedBlockers(
      blockers,
      predicates,
      id,
      provider,
      connection,
      policy,
      requestedModel,
      usage,
      cached
    );
    const observed = timestamp(usage.fetchedAt) || timestamp(cached?.fetchedAt);
    const blocked =
      routerBlockers.length > 0 ||
      predicates.limitPolicy.blocked ||
      predicates.exhausted ||
      !predicates.cutoff.proceed;
    return {
      usable: blocked ? false : observed ? true : null,
      blockers,
      allowanceReasons: blocked
        ? []
        : allowances(id, provider, providerSpecificData, usage, requestedModel),
      fetchedAt: observed,
      displayCutoffs: Object.fromEntries(
        Object.keys(usage.quotas || {}).map((name) => [
          name,
          predicates.cutoffEnabled
            ? resolveMinRemainingPercent(provider, connection, policy, name)
            : 0,
        ])
      ),
      ...(predicates.cutoffEnabled ? { cutoffEvaluated: predicates.cutoffEvaluated } : {}),
    };
  });
}

export function buildConnectionQuotaAvailability(
  input: unknown,
  usage: Usage | undefined,
  policy: QuotaPreflightPolicy
): ConnectionQuotaAvailability {
  const connection = toProviderConnection(input);
  const cachedUsage = withQuotaCacheReadView(() => {
    getQuotaSnapshotFetchedAt(connection.id);
    const cached = getQuotaCache(connection.id);
    return (
      usage ||
      (cached
        ? {
            quotas: cached.quotas,
            modelQuotas: cached.modelQuotas,
            fetchedAt: timestamp(cached.fetchedAt)!,
          }
        : {})
    );
  });
  const evaluated = appendSavedRouterScopes(
    connection,
    availabilityScopes(
      connection.provider,
      cachedUsage,
      connection.providerSpecificData?.antigravityFamilyRateLimitedUntil
    )
  ).map((scope) => ({
    ...scope,
    // Routing has no request-specific selector for this display-only window.
    decision:
      scope.id === "code_review" &&
      connection.provider === "codex" &&
      scope.windows.some((name) => {
        const q = normalizeQuotas(cachedUsage.quotas || {})[name];
        return q && q.fractionReported !== false && q.remainingPercentage <= 0;
      })
        ? {
            usable: null,
            blockers: [],
            allowanceReasons: [],
            fetchedAt: cachedUsage.fetchedAt || null,
          }
        : scope.models
          ? combineQuotaAlternatives(
              scope.models.map((model) =>
                evaluateCachedQuotaAvailability(input, usage, policy, model)
              ),
              evaluateCachedQuotaAvailability(input, usage, policy, scope.model)
            )
          : evaluateCachedQuotaAvailability(input, usage, policy, scope.model),
  }));
  const candidates = evaluated.filter((scope) => scope.id !== "code_review");
  // Ordinary requests define the account verdict. Only peer pools may use any-usable
  // aggregation; attached scopes remain visible without promoting a blocked account.
  const ordinary = evaluated.find((scope) => scope.kind === "account");
  const decisions = evaluated
    .filter((scope) => scope.kind === "group")
    .map((scope) => scope.decision);
  const fallback = evaluateCachedQuotaAvailability(input, usage, policy);
  const account = ordinary ? ordinary.decision : combineQuotaAlternatives(decisions, fallback);
  const payloadScopes = evaluated.flatMap((scope) =>
    scope.kind === "account"
      ? candidates.some((candidate) => candidate.kind !== "account")
        ? [{ ...scope, kind: "scoped" as const }]
        : []
      : [{ ...scope, kind: scope.kind }]
  );
  return {
    id: connection.id,
    account,
    scopes: payloadScopes,
  };
}
