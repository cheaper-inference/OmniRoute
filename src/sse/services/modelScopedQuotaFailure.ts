import { RateLimitReason } from "@omniroute/open-sse/config/constants.ts";
import {
  isExplicitModelCapacityFailure,
  isModelUnsupported401,
} from "@omniroute/open-sse/services/accountFallback/perModelFailureScope.ts";

type FallbackSignal = { permanent?: boolean; reason?: unknown; creditsExhausted?: boolean };

/** A quota / credit-exhaustion verdict from checkFallbackError (model-scoped for passthroughs). */
export function isQuotaExhaustedSignal(fallbackResult: FallbackSignal): boolean {
  return (
    fallbackResult.reason === RateLimitReason.QUOTA_EXHAUSTED ||
    Boolean(fallbackResult.creditsExhausted)
  );
}

/**
 * Statuses/classifications that lock out ONE model instead of cooling the whole connection:
 * 404, a 410 whose model the provider retired ("model gone" — NVIDIA #9833, OpenCode
 * family #17472), (#16380) a 401 whose body attributes the failure to the
 * model ("Model X is not supported" — delisted model on a healthy key), 429, 5xx,
 * and (#13548) a model-level quota/credit/rate-limit classification regardless of
 * HTTP status (e.g. a passthrough 400 "credit insufficient"). 402 keeps its
 * dedicated per-model billing branch (reason "credits") in markAccountUnavailable.
 */
export function isModelScopedFailure(
  status: number,
  isModelGone: boolean,
  fallbackResult: FallbackSignal,
  errorText?: unknown,
  model?: string | null
): boolean {
  if (isModelUnsupported401(status, errorText)) return true;
  if (isExplicitModelCapacityFailure(status, errorText, model)) return true;
  if (status === 404 || isModelGone || status === 429 || status >= 500) return true;
  return (
    !fallbackResult.permanent &&
    status !== 402 &&
    (isQuotaExhaustedSignal(fallbackResult) ||
      fallbackResult.reason === RateLimitReason.RATE_LIMIT_EXCEEDED)
  );
}
