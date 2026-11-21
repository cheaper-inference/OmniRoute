/**
 * Quota Cache — Claude window predicates and scope-decision helpers.
 *
 * Split out of ./quotaCache to keep it under the file-size cap. The scope
 * decision entry points stay in ./quotaCache, which re-exports the public
 * helpers so callers keep their import path.
 *
 * @module domain/quotaCacheClaudeScope
 */

import {
  getClaudeHeader,
  parseClaudeHeaderNumber,
} from "@omniroute/open-sse/services/claudeLowPriority.ts";
import { SUBSCRIPTION_QUOTA_COOLDOWN_MS } from "@omniroute/open-sse/services/quotaTextCooldowns.ts";
import { parseDate, type QuotaInfo } from "./quotaCacheState";

function reportedClaudeQuotaRemaining(quota: QuotaInfo): boolean {
  return quota.fractionReported !== false && quota.remainingPercentage > 0;
}

export function isBlockingClaudeQuota(quota: QuotaInfo): boolean {
  const metadata = quota.claudeQuota;
  if (!metadata?.active) return false;
  const severity = metadata.severity?.trim().toLowerCase() || null;
  return severity === null || severity === "critical";
}

function isPreflightBlockingClaudeQuota(quota: QuotaInfo): boolean {
  // An active critical window with reported remaining quota is a predictive
  // warning. It must not skip the upstream request, but a later real 429
  // still classifies from the same active/critical metadata.
  return isBlockingClaudeQuota(quota) && !reportedClaudeQuotaRemaining(quota);
}

function activeClaudeResetMs(
  quota: QuotaInfo,
  now: number,
  blocking: (quota: QuotaInfo) => boolean = isBlockingClaudeQuota
): number | null {
  if (!blocking(quota) || !quota.resetAt) return null;
  const resetMs = parseDate(quota.resetAt);
  return resetMs !== null && resetMs > now ? resetMs : null;
}

export function isActiveClaudeExhaustion(quota: QuotaInfo, now: number): boolean {
  // Active critical limits can be predictive warnings while quota remains.
  // Explicit upstream 429s still use activeClaudeResetMs without this preflight guard.
  return activeClaudeResetMs(quota, now, isPreflightBlockingClaudeQuota) !== null;
}

export type ClaudeResponseHeaders = Headers | Record<string, string | undefined>;

export type ClaudeQuotaScopeDecision = {
  scope: "model" | "connection";
  // "headroom": fresh telemetry proves every account-wide window has quota left (#18296).
  evidence: "none" | "blocking" | "headroom";
  resetAt: string | null;
  cooldownMs: number | null;
};

export function resolveClaudeQuotaCooldownMs(
  decision: ClaudeQuotaScopeDecision,
  cachedQuotaCooldownMs: number | null,
  fallbackCooldownMs: number
): number {
  if (decision.cooldownMs !== null) return decision.cooldownMs;
  if (decision.evidence === "blocking") return fallbackCooldownMs;
  return cachedQuotaCooldownMs ?? fallbackCooldownMs;
}

export const CONNECTION_SCOPED_CLAUDE_QUOTA: ClaudeQuotaScopeDecision = {
  scope: "connection",
  evidence: "none",
  resetAt: null,
  cooldownMs: null,
};

export const BLOCKING_CONNECTION_SCOPED_CLAUDE_QUOTA: ClaudeQuotaScopeDecision = {
  scope: "connection",
  evidence: "blocking",
  resetAt: null,
  cooldownMs: null,
};

export const HEADROOM_MODEL_SCOPED_CLAUDE_QUOTA: ClaudeQuotaScopeDecision = {
  scope: "model",
  evidence: "headroom",
  resetAt: null,
  cooldownMs: null,
};

// #18296 — Anthropic does not always report a per-model weekly window (e.g. Fable). When the
// account-wide session AND weekly windows are both reported with quota left, an explicit quota
// 429 can only be about the requested model, so it must not take the whole connection out.
export function hasProvenClaudeAccountHeadroom(globalWindows: QuotaInfo[]): boolean {
  const kinds = new Set<string>();
  for (const quota of globalWindows) {
    if (quota.fractionReported === false || quota.remainingPercentage <= 0) return false;
    kinds.add(quota.claudeQuota?.kind ?? "");
  }
  return kinds.has("session") && kinds.has("weekly_all");
}

// A rejected unified status that blames an overage claim while the shared 7d window is allowed and
// the 5h window is not rejected (its utilization is absent or below 1.0) rejects one model (Fable),
// not the account. Anthropic omits the 5h headers when it did not evaluate that window.
export function isOverageOnlyClaudeRejection(
  headers: ClaudeResponseHeaders | null | undefined
): boolean {
  if (!headers) return false;
  const h = (name: string) =>
    getClaudeHeader(headers, `anthropic-ratelimit-unified-${name}`)?.trim().toLowerCase() ?? "";
  if (h("status") !== "rejected") return false;
  const status7d = h("7d-status");
  if (status7d !== "allowed" && status7d !== "allowed_warning") return false;
  const status5h = h("5h-status");
  if (status5h !== "" && status5h !== "allowed" && status5h !== "allowed_warning") return false;
  const overage =
    h("representative-claim").includes("overage") ||
    h("overage-status") === "rejected" ||
    h("7d_oi-status") === "rejected";
  if (!overage) return false;
  const utilization5h = parseClaudeHeaderNumber(
    headers,
    "anthropic-ratelimit-unified-5h-utilization"
  );
  return utilization5h === undefined ? h("5h-utilization") === "" : utilization5h < 1;
}

// An explicit Claude model-credit entitlement failure is model scoped even
// without a usable quota snapshot; never park unrelated sibling models.
export const MODEL_SCOPED_CLAUDE_CREDIT_ENTITLEMENT: ClaudeQuotaScopeDecision = {
  scope: "model",
  evidence: "blocking",
  resetAt: null,
  cooldownMs: SUBSCRIPTION_QUOTA_COOLDOWN_MS,
};

export function decisionForLatestClaudeReset(
  quotas: QuotaInfo[],
  scope: ClaudeQuotaScopeDecision["scope"],
  now: number
): ClaudeQuotaScopeDecision | null {
  let selected: { resetAt: string; resetMs: number } | null = null;
  for (const quota of quotas) {
    const resetMs = activeClaudeResetMs(quota, now);
    if (resetMs === null || !quota.resetAt) continue;
    if (!selected || resetMs > selected.resetMs) {
      selected = { resetAt: quota.resetAt, resetMs };
    }
  }
  return selected
    ? {
        scope,
        evidence: "blocking",
        resetAt: selected.resetAt,
        cooldownMs: selected.resetMs - now,
      }
    : null;
}
