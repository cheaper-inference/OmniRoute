export interface QuotaRefreshState {
  status: "loading" | "fresh" | "partial" | "stale" | "error";
  missingWindows?: Array<"session" | "weekly">;
  connectionsRefreshFailed?: boolean;
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function finiteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function validWindow(value: unknown): boolean {
  const window = record(value);
  if (!window) return false;
  // The server's projection reports windows seen on inference responses as a percentage only.
  if (window.isPercentageOnly === true) return finiteNumber(window.remainingPercentage);
  return (
    finiteNumber(window.used) && window.used >= 0 && finiteNumber(window.total) && window.total > 0
  );
}

/**
 * Classifies a live read's outcome, never a decision to release a backend cooldown. The state
 * carries no upstream text, and the payload itself is not displayed: panels read the canonical
 * server projection, which already keeps a stale entry's original age.
 */
export function classifyQuotaObservation(value: unknown, providerId?: string): QuotaRefreshState {
  const usage = record(value);
  if (!usage) return { status: "error" };
  if (providerId !== "codex") return { status: "fresh" };
  if (usage._stale === true) return { status: "stale" };
  if (usage.error || usage.message) return { status: "error" };
  const quotas = record(usage.quotas) ?? {};
  const missingWindows = (["session", "weekly"] as const).filter(
    (name) => !validWindow(quotas[name])
  );
  if (missingWindows.length === 2) return { status: "error" };
  return missingWindows.length ? { status: "partial", missingWindows } : { status: "fresh" };
}
