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

export function recordRoundRobinFailureTracking({
  provider,
  nextProvider,
  isStreamReadinessFailure,
  isStreamEarlyEof,
  trackStreamReadiness,
  result,
  skipProviderBreaker,
  requestScopedFailure,
  isTokenLimitBreach,
  errorText,
  structuredErrorCode,
  connectionId,
  profile,
  targetCooldownMs,
  semaphoreKey,
  modelStr,
  log,
}: RoundRobinFailureTrackingArgs): void {
  const sameProviderNext = typeof nextProvider === "string" && nextProvider === provider;
  if (
    provider &&
    provider !== "unknown" &&
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure,
      isStreamEarlyEof,
      trackStreamReadinessInCircuitBreaker: trackStreamReadiness,
      status: result.status,
      sameProviderNext,
      skipProviderBreaker,
      requestScopedFailure,
      error: errorText,
      isProxyUnreachable: structuredErrorCode === "proxy_unreachable",
      providerCircuitOpen: isProviderCircuitOpenResult(result, errorText),
    }) &&
    !isDraining()
  ) {
    const isQueueTimeout =
      errorText.includes("RATE_LIMIT_QUEUE_TIMEOUT") ||
      errorText.includes("RATE_LIMIT_QUEUE_WEDGED");
    recordProviderFailure(provider, log, connectionId, profile, {
      isQueueTimeout,
      isNetworkError: structuredErrorCode === "proxy_unreachable",
      providerProbeSettled: isProviderProbeResponse(result),
    });
  }

  if (
    (!isStreamReadinessFailure || trackStreamReadiness) &&
    !isTokenLimitBreach &&
    !requestScopedFailure &&
    TRANSIENT_FOR_SEMAPHORE.includes(result.status) &&
    (targetCooldownMs > 0 || isStreamReadinessFailure)
  ) {
    const rrCooldownMs = targetCooldownMs > 0 ? targetCooldownMs : 5000;
    semaphore.markRateLimited(semaphoreKey, rrCooldownMs);
    log.warn("COMBO-RR", `${modelStr} error ${result.status}, cooldown ${rrCooldownMs}ms`);
  }
}
