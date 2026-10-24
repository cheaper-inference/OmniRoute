/**
 * Quota-window trend and plan-capacity hints for the account `expiry-first` picker.
 *
 * Plan capacity weights are OPT-IN: they come only from the operator's
 * `providerStrategies.<provider>.planWeights` setting. Without it every plan
 * weighs 1 and the score matches the plain weekly-deadline formula.
 */

import { getQuotaCache } from "@/domain/quotaCache";
import { filterQuotaBurnMetrics, type QuotaBurnMetrics } from "@/domain/quotaBurnMetrics";
import {
  isAntigravityQuotaProvider,
  selectAntigravityQuotaWindowNames,
} from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import { getCodexQuotaWindowFilterForModel } from "@omniroute/open-sse/config/codexQuotaScopes.ts";

export type ExpiryFirstScope = {
  provider: string;
  requestedModel: string | null;
  planWeights?: Record<string, number>;
};

export type ExpiryFirstQuotaMetrics = {
  capacityWeight: number;
  burnFractionPerHourByWindow: Record<string, number>;
};

type QuotaCacheEntryView = {
  quotas?: Record<
    string,
    { remainingPercentage?: number; resetAt?: string | null; windowSeconds?: number | null }
  >;
  burnMetrics?: QuotaBurnMetrics;
};

function normalizedPlan(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function canonicalPlan(value: string): string {
  const normalized = value.replace(/_/g, " ");
  if (/^pro(max|lite)$/.test(normalized)) return "pro";
  if (/\bultra\b/.test(normalized)) return "ultra";
  if (/\bmax\b/.test(normalized)) return "max";
  if (/\benterprise\b/.test(normalized)) return "enterprise";
  if (/\b(business|team)\b/.test(normalized)) return "business";
  if (/\bpro\b/.test(normalized)) return "pro";
  if (/\bplus\b/.test(normalized)) return "plus";
  if (/\blite\b/.test(normalized)) return "lite";
  if (/\bfree\b/.test(normalized)) return "free";
  return value;
}

export function resolveExpiryFirstPlanWeight(
  plan: unknown,
  overrides?: Record<string, number>
): number {
  const normalized = normalizedPlan(plan);
  if (!normalized) return 1;
  const canonical = canonicalPlan(normalized);

  for (const [name, weight] of Object.entries(overrides || {})) {
    if (
      (normalizedPlan(name) === normalized || canonicalPlan(normalizedPlan(name)) === canonical) &&
      Number.isFinite(weight) &&
      weight > 0
    ) {
      return Math.min(100, weight);
    }
  }

  // Opt-in: there is no built-in capacity table. A plan without an operator
  // override weighs 1, which leaves the expiry-first ordering unchanged.
  return 1;
}

export function getExpiryFirstPlan(connectionData: unknown): string | undefined {
  if (!connectionData || typeof connectionData !== "object") return undefined;
  const data = connectionData as Record<string, unknown>;
  const plan = [data.plan, data.chatgptPlanType, data.workspacePlanType].find(
    (value) => typeof value === "string" && value.trim()
  );
  return typeof plan === "string" ? plan : undefined;
}

export function selectExpiryFirstQuotaWindowNames(
  quotaNames: string[],
  scope: Pick<ExpiryFirstScope, "provider" | "requestedModel">
): string[] {
  if (!scope.requestedModel) return quotaNames;
  if (isAntigravityQuotaProvider(scope.provider)) {
    const scoped = selectAntigravityQuotaWindowNames(quotaNames, scope.requestedModel);
    return scoped.length > 0 ? scoped : quotaNames;
  }
  if (scope.provider === "codex") {
    const filterWindow = getCodexQuotaWindowFilterForModel(scope.requestedModel);
    const scoped = filterWindow ? quotaNames.filter(filterWindow) : quotaNames;
    return scoped.length > 0 ? scoped : quotaNames;
  }
  return quotaNames;
}

/** Reads cached quota trends and plan metadata; no database access on the hot path. */
export function getExpiryFirstQuotaMetrics(
  connectionId: string,
  plan: unknown,
  scope: ExpiryFirstScope
): ExpiryFirstQuotaMetrics {
  const entry = getQuotaCache(connectionId) as QuotaCacheEntryView | null;
  const quotas = entry?.quotas || {};
  const scopedNames = selectExpiryFirstQuotaWindowNames(Object.keys(quotas), scope);
  const cachedBurnMetrics = filterQuotaBurnMetrics(entry?.burnMetrics, scopedNames);
  const burnFractionPerHourByWindow: Record<string, number> = Object.fromEntries(
    Object.entries(cachedBurnMetrics?.rates || {}).map(([key, rate]) => [
      key.toLowerCase(),
      rate.fractionPerHour,
    ])
  );
  return {
    capacityWeight: resolveExpiryFirstPlanWeight(plan, scope.planWeights),
    burnFractionPerHourByWindow,
  };
}
