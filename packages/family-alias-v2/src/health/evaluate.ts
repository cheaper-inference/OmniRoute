import type { HealthCacheEntry } from "./cache.ts";
import type { LocalEndpoint } from "../types.ts";
import { subscriptionEligibility } from "../policy.ts";

export type EndpointState =
  | { state: "eligible"; lastKnownGood: boolean }
  | { state: "temporarily_unavailable"; preserve: boolean; reason?: string }
  | { state: "permanently_unavailable"; reason?: string }
  | { state: "ineligible"; reason: string };

export function evaluateEndpoint(
  endpoint: LocalEndpoint,
  cache: HealthCacheEntry | undefined,
): EndpointState {
  const policy = subscriptionEligibility(endpoint);
  if (!policy.eligible) return { state: "ineligible", reason: policy.reason };
  if (!cache) return { state: "eligible", lastKnownGood: false };
  if (cache.status === "healthy") return { state: "eligible", lastKnownGood: true };
  if (cache.status === "permanent_failure") {
    return { state: "permanently_unavailable", reason: cache.reason };
  }
  return {
    state: "temporarily_unavailable",
    preserve: Boolean(cache.lastSuccessAt),
    reason: cache.reason,
  };
}

export function updateCacheFromProbe(opts: {
  previous?: HealthCacheEntry;
  key: string;
  now: number;
  result: {
    ok: boolean;
    statusCode?: number;
    rateLimited?: boolean;
    retryAfterSeconds?: number;
    error?: string;
  };
}): HealthCacheEntry {
  const previous = opts.previous;
  if (opts.result.ok) {
    return {
      key: opts.key,
      status: "healthy",
      checkedAt: opts.now,
      lastSuccessAt: opts.now,
      failureCount: 0,
    };
  }
  const permanent =
    opts.result.statusCode === 401 ||
    opts.result.statusCode === 403 ||
    opts.result.statusCode === 404 ||
    opts.result.statusCode === 400;
  return {
    key: opts.key,
    status: permanent ? "permanent_failure" : "temporary_failure",
    checkedAt: opts.now,
    lastSuccessAt: previous?.lastSuccessAt,
    failureCount: (previous?.failureCount ?? 0) + 1,
    retryAfter:
      opts.result.retryAfterSeconds != null
        ? opts.now + opts.result.retryAfterSeconds * 1000
        : undefined,
    reason: opts.result.error,
  };
}
