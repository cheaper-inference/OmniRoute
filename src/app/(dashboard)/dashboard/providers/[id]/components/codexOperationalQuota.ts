import type { ConnectionRowConnection } from "./connectionRowTypes";
import type { ProviderQuotaCacheEntry } from "../hooks/useProviderQuota";

export interface OperationalQuota {
  usedPercent: number | null;
  resetAt: string | null;
  period?: "monthly";
}

const finite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/** Only observed numeric values count as usage. Missing usage must never become zero. */
export function codexOperationalQuota(
  connection: ConnectionRowConnection,
  cache: ProviderQuotaCacheEntry | null | undefined,
  window: "5h" | "7d"
): OperationalQuota {
  const entry = cache?.quotas?.[window === "5h" ? "session" : "weekly"];
  const cached = entry && typeof entry === "object" ? (entry as Record<string, unknown>) : null;
  const pool = connection.codexAccountPool?.children.find((child) => child.key.scope === "codex")
    ?.quota.windows[window];
  // The cache updates after the row's refresh action; it takes precedence over the pool snapshot.
  const source = cached ?? pool;
  let percent: number | null = null;
  if (cached) {
    if (finite(cached.used) && finite(cached.total) && cached.total > 0) {
      percent = (cached.used / cached.total) * 100;
    } else if (finite(cached.remainingPercentage)) {
      percent = 100 - cached.remainingPercentage;
    }
  } else if (pool) {
    if (finite(pool.usedPercentage)) percent = pool.usedPercentage;
    else if (finite(pool.usage) && finite(pool.limit) && pool.limit > 0) {
      percent = (pool.usage / pool.limit) * 100;
    }
  }
  const reset = source?.resetAt;
  return {
    usedPercent: percent === null ? null : Math.min(100, Math.max(0, Math.round(percent))),
    resetAt: typeof reset === "string" && Number.isFinite(Date.parse(reset)) ? reset : null,
    ...(cached &&
    ((finite(cached.windowSeconds) && cached.windowSeconds >= 27 * 86400) ||
      (typeof cached.displayName === "string" && /month|mensal/i.test(cached.displayName)))
      ? { period: "monthly" as const }
      : {}),
  };
}
