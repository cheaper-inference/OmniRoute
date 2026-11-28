import { recordProviderFailure } from "../accountFallback.ts";
import * as semaphore from "../rateLimitSemaphore.ts";
import { isInstanceDraining as isDraining } from "../../utils/drainStatus.ts";
import { isProviderProbeResponse } from "../../../src/shared/utils/providerProbeResult.ts";
import {
  TRANSIENT_FOR_SEMAPHORE,
  isProviderCircuitOpenResult,
  shouldRecordProviderBreakerFailure,
} from "./comboPredicates.ts";

export interface RoundRobinFailureTrackingArgs {
  provider: string | null | undefined;
  nextProvider: unknown;
  isStreamReadinessFailure: boolean;
  isStreamEarlyEof: boolean;
  trackStreamReadiness: boolean;
  result: Response;
  skipProviderBreaker?: boolean;
  requestScopedFailure: boolean;
  isTokenLimitBreach: boolean;
  errorText: string;
  structuredErrorCode?: string;
  connectionId?: string | null;
  profile: Parameters<typeof recordProviderFailure>[3];
  targetCooldownMs: number;
  semaphoreKey: string;
  modelStr: string;
  log: { warn: (tag: string, message: string) => void };
}

function maybeRecordRoundRobinBreakerFailure(args: RoundRobinFailureTrackingArgs): void {
  if (!args.trackStreamReadiness || !args.isStreamReadinessFailure || args.isStreamEarlyEof) {
    return;
  }
  if (!args.provider || args.provider === "unknown" || isDraining()) {
    return;
  }
  const sameProviderNext =
    typeof args.nextProvider === "string" && args.nextProvider === args.provider;
  const shouldRecord = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: args.isStreamReadinessFailure,
    isStreamEarlyEof: args.isStreamEarlyEof,
    trackStreamReadinessInCircuitBreaker: true,
    status: args.result.status,
    sameProviderNext,
    skipProviderBreaker: args.skipProviderBreaker,
    requestScopedFailure: args.requestScopedFailure,
    error: args.errorText,
    isProxyUnreachable: args.structuredErrorCode === "proxy_unreachable",
    providerCircuitOpen: isProviderCircuitOpenResult(args.result, args.errorText),
  });
  if (!shouldRecord) return;

  const isQueueTimeout =
    args.errorText.includes("RATE_LIMIT_QUEUE_TIMEOUT") ||
    args.errorText.includes("RATE_LIMIT_QUEUE_WEDGED");
  recordProviderFailure(args.provider, args.log, args.connectionId, args.profile, {
    isQueueTimeout,
    isNetworkError: args.structuredErrorCode === "proxy_unreachable",
    providerProbeSettled: isProviderProbeResponse(args.result),
  });
}

function maybeMarkRoundRobinSemaphoreCooldown(args: RoundRobinFailureTrackingArgs): void {
  if (args.isTokenLimitBreach || args.requestScopedFailure) return;
  if (!TRANSIENT_FOR_SEMAPHORE.includes(args.result.status)) return;

  const isOptedInReadinessTimeout =
    args.trackStreamReadiness && args.isStreamReadinessFailure && !args.isStreamEarlyEof;
  if (args.isStreamReadinessFailure && !isOptedInReadinessTimeout) return;

  const rrCooldownMs = isOptedInReadinessTimeout
    ? args.targetCooldownMs > 0
      ? args.targetCooldownMs
      : 5000
    : args.targetCooldownMs;
  if (rrCooldownMs <= 0) return;

  semaphore.markRateLimited(args.semaphoreKey, rrCooldownMs);
  args.log.warn(
    "COMBO-RR",
    `${args.modelStr} error ${args.result.status}, cooldown ${rrCooldownMs}ms`
  );
}

export function recordRoundRobinFailureTracking(args: RoundRobinFailureTrackingArgs): void {
  maybeRecordRoundRobinBreakerFailure(args);
  maybeMarkRoundRobinSemaphoreCooldown(args);
}
