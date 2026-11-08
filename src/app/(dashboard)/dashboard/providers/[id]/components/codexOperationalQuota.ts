import type { ConnectionRowConnection } from "./connectionRowTypes";
import type { ProviderQuotaCacheEntry } from "../hooks/useProviderQuota";

export interface OperationalQuota {
  usedPercent: number | null;
  resetAt: string | null;
  period?: "monthly" | "weekly";
}

const finite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/** A primary window may be weekly; the API's keys describe position, not duration. */
export function codexOperationalWindows(
  cache: ProviderQuotaCacheEntry | null | undefined
): ("5h" | "7d")[] {
  const windows = (["5h", "7d"] as const).filter(
    (window) => cache?.quotas?.[window === "5h" ? "session" : "weekly"] != null
  );
  return windows.length ? windows : ["5h", "7d"];
}

type CodexPoolWindow = NonNullable<
  ConnectionRowConnection["codexAccountPool"]
>["children"][number]["quota"]["windows"]["5h"];

function cachedUsedPercent(cached: Record<string, unknown>): number | null {
  if (finite(cached.used) && finite(cached.total) && cached.total > 0) {
    return (cached.used / cached.total) * 100;
  }
  return finite(cached.remainingPercentage) ? 100 - cached.remainingPercentage : null;
}

function poolUsedPercent(pool: CodexPoolWindow | null | undefined): number | null {
  if (!pool) return null;
  if (finite(pool.usedPercentage)) return pool.usedPercentage;
  return finite(pool.usage) && finite(pool.limit) && pool.limit > 0
    ? (pool.usage / pool.limit) * 100
    : null;
}

function windowMatches(cached: Record<string, unknown>, minDays: number, label: RegExp): boolean {
  return (
    (finite(cached.windowSeconds) && cached.windowSeconds >= minDays * 86400) ||
    (typeof cached.displayName === "string" && label.test(cached.displayName))
  );
}

function cachedPeriod(cached: Record<string, unknown> | null): Pick<OperationalQuota, "period"> {
  if (!cached) return {};
  if (windowMatches(cached, 27, /month|mensal/i)) return { period: "monthly" };
  if (windowMatches(cached, 6, /weekly|semanal/i)) return { period: "weekly" };
  return {};
}

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
  const percent = cached ? cachedUsedPercent(cached) : poolUsedPercent(pool);
  const reset = source?.resetAt;
  return {
    usedPercent: percent === null ? null : Math.min(100, Math.max(0, Math.round(percent))),
    resetAt: typeof reset === "string" && Number.isFinite(Date.parse(reset)) ? reset : null,
    ...cachedPeriod(cached),
  };
}
