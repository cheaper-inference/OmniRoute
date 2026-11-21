export type CachedHealthStatus = "healthy" | "temporary_failure" | "permanent_failure";

export type HealthCacheEntry = {
  key: string;
  status: CachedHealthStatus;
  checkedAt: number;
  lastSuccessAt?: number;
  failureCount: number;
  retryAfter?: number;
  reason?: string;
};

export type HealthCache = Record<string, HealthCacheEntry>;

export function endpointHealthKey(connectionId: string, modelId: string): string {
  return `${connectionId}\u0000${modelId}`;
}

export function nextRetryAt(entry: HealthCacheEntry): number {
  if (entry.status === "healthy") return entry.checkedAt + 24 * 60 * 60 * 1000;
  if (entry.status === "permanent_failure") return Number.POSITIVE_INFINITY;
  if (entry.retryAfter && entry.retryAfter > entry.checkedAt) return entry.retryAfter;
  const exponent = Math.min(Math.max(entry.failureCount - 1, 0), 8);
  return entry.checkedAt + 5 * 60 * 1000 * 2 ** exponent;
}

export function shouldProbe(entry: HealthCacheEntry | undefined, now: number): boolean {
  if (!entry) return true;
  return now >= nextRetryAt(entry);
}
