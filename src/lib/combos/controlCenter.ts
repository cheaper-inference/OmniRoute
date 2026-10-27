import { normalizeComboModels, type ComboStep } from "./steps";
import { resolveProviderAlias } from "../../../open-sse/services/providerAlias.ts";

type JsonRecord = Record<string, unknown>;

export type ComboControlCenterHealthState = "healthy" | "warning" | "critical" | "idle";

export interface ComboControlCenterCombo {
  id?: string;
  name?: string;
  strategy?: string | null;
  models?: unknown[];
  isActive?: boolean | null;
  config?: JsonRecord | null;
  /**
   * #17393: connectionId → account display name, resolved server-side by the
   * combo route (the browser cannot read the connection table itself).
   */
  connectionLabels?: Record<string, string> | null;
}

export interface ComboControlCenterMetrics {
  totalRequests?: number;
  totalSuccesses?: number;
  totalFailures?: number;
  totalFallbacks?: number;
  avgLatencyMs?: number;
  successRate?: number;
  fallbackRate?: number;
  lastUsedAt?: string | null;
}

export interface ComboControlCenterHealth {
  performance?: {
    avgLatencyMs?: number;
    successRate?: number;
    totalRequests?: number;
  };
  quotaHealth?: {
    worstRemainingPct?: number | null;
    providers?: Array<{
      provider: string;
      remainingPct: number | null;
      isExhausted: boolean;
      trend: "improving" | "stable" | "declining";
    }>;
  };
  usageSkew?: {
    giniCoefficient?: number;
    modelDistribution?: Array<{ model: string; requestShare: number; tokenShare: number }>;
  };
  targetHealth?: ComboControlCenterTargetHealth[];
}

export interface ComboControlCenterTargetHealth {
  executionKey?: string;
  stepId?: string | null;
  model?: string;
  provider?: string;
  connectionId?: string | null;
  label?: string | null;
  requests?: number;
  successRate?: number;
  avgLatencyMs?: number;
  lastStatus?: "ok" | "error" | null;
  lastUsedAt?: string | null;
  quotaRemainingPct?: number | null;
  quotaIsExhausted?: boolean | null;
  quotaTrend?: "improving" | "stable" | "declining" | null;
  quotaScope?: "connection" | "provider" | "none";
}

export interface ComboControlCenterTarget {
  id: string;
  kind: "model" | "combo-ref" | "provider-wildcard";
  index: number;
  label: string;
  model: string;
  provider: string | null;
  connectionId: string | null;
  /**
   * #17393: the account this target is pinned to, rendered in full. `null`
   * means no connection is pinned (the UI shows the "dynamic" placeholder).
   */
  accountLabel: string | null;
  weight: number;
  tags: string[];
  health: ComboControlCenterTargetHealth | null;
}

export interface ComboControlCenterSummary {
  strategy: string;
  isActive: boolean;
  targetCount: number;
  modelTargetCount: number;
  nestedComboCount: number;
  providerCount: number;
  totalRequests: number;
  successRate: number;
  avgLatencyMs: number;
  fallbackRate: number;
  worstQuotaRemainingPct: number | null;
  usageSkew: number;
  healthState: ComboControlCenterHealthState;
  healthReasons: string[];
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function providerFromModel(model: string | null | undefined): string | null {
  if (!model) return null;
  // Resolve through the general alias table that target resolution applies
  // before dispatch, so this label matches what actually executed upstream
  // instead of a raw, un-aliased prefix slice.
  const slashIndex = model.indexOf("/");
  if (slashIndex <= 0) return null;
  const prefix = model.slice(0, slashIndex);
  return resolveProviderAlias(prefix) || prefix;
}

function normalizeSuccessRate(value: unknown): number {
  const rate = toNumber(value, 0);
  if (rate <= 1) return Math.round(rate * 100);
  return Math.round(rate);
}

function getMetricRequests(metrics?: ComboControlCenterMetrics | null): number {
  return toNumber(metrics?.totalRequests, 0);
}

function getHealthRequests(health?: ComboControlCenterHealth | null): number {
  return toNumber(health?.performance?.totalRequests, 0);
}

function getStepTags(step: ComboStep): string[] {
  return step.kind === "model" && Array.isArray(step.tags) ? step.tags : [];
}

function getStepLabel(step: ComboStep): string {
  if (step.label) return step.label;
  if (step.kind === "combo-ref") return `Combo → ${step.comboName}`;
  if (step.kind === "provider-wildcard") {
    return `All ${step.providerId}/${step.modelPattern}`;
  }
  return step.model;
}

/**
 * #17393: the account a target is pinned to, rendered in full.
 *
 * Resolution order: the connection's display name (resolved server-side from
 * the connection row, so a renamed account shows its current name) → the
 * step's stored label (the combo builder stores the account label there) →
 * the full, untruncated connection id. `null` means the target is not pinned
 * to a connection at all.
 */
export function resolveComboTargetAccountLabel(input: {
  label?: string | null;
  connectionId?: string | null;
  connectionLabels?: Record<string, string> | null;
}): string | null {
  const connectionId = toString(input.connectionId);
  if (!connectionId) return null;
  const resolved = toString(input.connectionLabels?.[connectionId]);
  if (resolved) return resolved;
  const label = toString(input.label);
  if (label) return label;
  return connectionId;
}

export function getComboControlCenterTargets(
  combo: ComboControlCenterCombo,
  health?: ComboControlCenterHealth | null,
  connectionLabels?: Record<string, string> | null
): ComboControlCenterTarget[] {
  const steps = normalizeComboModels(combo.models || [], { comboName: combo.name || null });
  const healthByStepId = new Map<string, ComboControlCenterTargetHealth>();
  const healthByModel = new Map<string, ComboControlCenterTargetHealth>();

  for (const target of health?.targetHealth || []) {
    const stepId = toString(target.stepId);
    const model = toString(target.model);
    if (stepId) healthByStepId.set(stepId, target);
    if (model && !healthByModel.has(model)) healthByModel.set(model, target);
  }

  return steps.map((step, index) => {
    const model =
      step.kind === "combo-ref"
        ? step.comboName
        : step.kind === "provider-wildcard"
          ? `${step.providerId}/${step.modelPattern}`
          : step.model;
    const healthEntry = healthByStepId.get(step.id) || healthByModel.get(model) || null;
    const provider =
      step.kind === "model"
        ? step.providerId || providerFromModel(step.model) || healthEntry?.provider || null
        : step.kind === "provider-wildcard"
          ? step.providerId
          : null;
    const connectionId =
      step.kind === "model" || step.kind === "provider-wildcard" ? step.connectionId || null : null;

    return {
      id: step.id,
      kind: step.kind,
      index,
      label: getStepLabel(step),
      model,
      provider,
      connectionId,
      accountLabel: resolveComboTargetAccountLabel({
        label: step.label,
        connectionId,
        connectionLabels,
      }),
      weight: step.weight || 0,
      tags: getStepTags(step),
      health: healthEntry,
    };
  });
}

export function getResolvedComboControlCenterTargets(
  health?: ComboControlCenterHealth | null
): ComboControlCenterTargetHealth[] {
  return Array.isArray(health?.targetHealth) ? health.targetHealth : [];
}

export function summarizeComboControlCenter(
  combo: ComboControlCenterCombo,
  metrics?: ComboControlCenterMetrics | null,
  health?: ComboControlCenterHealth | null
): ComboControlCenterSummary {
  const targets = getComboControlCenterTargets(combo, health);
  const resolvedTargets = getResolvedComboControlCenterTargets(health);
  const providers = new Set<string>();
  for (const target of targets) {
    if (target.provider) providers.add(target.provider);
  }
  for (const target of resolvedTargets) {
    const provider = toString(target.provider);
    if (provider) providers.add(provider);
  }

  const healthRequests = getHealthRequests(health);
  const metricRequests = getMetricRequests(metrics);
  const totalRequests = healthRequests || metricRequests;
  const successRate =
    healthRequests > 0
      ? normalizeSuccessRate(health?.performance?.successRate)
      : normalizeSuccessRate(metrics?.successRate);
  const avgLatencyMs =
    toNumber(health?.performance?.avgLatencyMs, 0) || toNumber(metrics?.avgLatencyMs, 0);
  const fallbackRate = normalizeSuccessRate(metrics?.fallbackRate);
  const worstQuotaRemainingPct =
    typeof health?.quotaHealth?.worstRemainingPct === "number"
      ? health.quotaHealth.worstRemainingPct
      : null;
  const usageSkew = toNumber(health?.usageSkew?.giniCoefficient, 0);
  const hasExhaustedQuota = Boolean(
    health?.quotaHealth?.providers?.some((provider) => provider.isExhausted)
  );

  const healthReasons: string[] = [];
  if (totalRequests === 0) healthReasons.push("No recent combo traffic");
  if (successRate > 0 && successRate < 80) healthReasons.push("Low success rate");
  else if (successRate > 0 && successRate < 95) healthReasons.push("Success rate below target");
  if (fallbackRate >= 20) healthReasons.push("High fallback rate");
  else if (fallbackRate >= 10) healthReasons.push("Elevated fallback rate");
  if (hasExhaustedQuota) healthReasons.push("At least one quota is exhausted");
  else if (worstQuotaRemainingPct !== null && worstQuotaRemainingPct < 10) {
    healthReasons.push("Quota is nearly exhausted");
  } else if (worstQuotaRemainingPct !== null && worstQuotaRemainingPct < 25) {
    healthReasons.push("Quota is getting low");
  }
  if (usageSkew >= 0.5) healthReasons.push("Traffic distribution is highly skewed");

  let healthState: ComboControlCenterHealthState = "healthy";
  if (totalRequests === 0 && worstQuotaRemainingPct === null) {
    healthState = "idle";
  } else if (
    hasExhaustedQuota ||
    (successRate > 0 && successRate < 80) ||
    (worstQuotaRemainingPct !== null && worstQuotaRemainingPct < 10)
  ) {
    healthState = "critical";
  } else if (
    (successRate > 0 && successRate < 95) ||
    fallbackRate >= 10 ||
    (worstQuotaRemainingPct !== null && worstQuotaRemainingPct < 25) ||
    usageSkew >= 0.5
  ) {
    healthState = "warning";
  }

  return {
    strategy: combo.strategy || "priority",
    isActive: combo.isActive !== false,
    targetCount: targets.length,
    modelTargetCount: targets.filter(
      (target) => target.kind === "model" || target.kind === "provider-wildcard"
    ).length,
    nestedComboCount: targets.filter((target) => target.kind === "combo-ref").length,
    providerCount: providers.size,
    totalRequests,
    successRate,
    avgLatencyMs,
    fallbackRate,
    worstQuotaRemainingPct,
    usageSkew,
    healthState,
    healthReasons: healthReasons.length > 0 ? healthReasons : ["Combo looks healthy"],
  };
}

export function extractComboRuntimeConfig(combo: ComboControlCenterCombo): JsonRecord {
  return isRecord(combo.config) ? combo.config : {};
}
