export type ProviderFailureType =
  | "authentication_error"
  | "rate_limit"
  | "quota_exhausted"
  | "timeout"
  | "network_error"
  | "provider_5xx"
  | "invalid_request"
  | "model_unavailable"
  | "permission_error"
  | "unknown";

export interface ProviderFailure {
  type: ProviderFailureType;
  retryable: boolean;
  providerId: string;
  connectionId?: string;
  statusCode?: number;
  retryAfter?: number;
  message: string;
}

const AUTH_FAILURE = /invalid.*(key|token)|unauthori[sz]ed|forbidden/;
const TIMEOUT_FAILURE = /timeout|timed out|etimedout/;
const RATE_LIMIT_FAILURE = /rate.?limit|too many requests|retry.?after/;
const QUOTA_MESSAGE = /quota|insufficient balance|credits exhausted|balance is \$0/;
const INVALID_REQUEST_FAILURE = /invalid request|malformed|unsupported parameter/;
const MODEL_UNAVAILABLE_FAILURE = /model unavailable|model not found|unknown model/;
const NETWORK_FAILURE = /network|econnreset|econnrefused|enotfound|fetch failed|socket/;

function isAuthFailure(status: number | undefined, normalized: string): boolean {
  return status === 401 || status === 403 || AUTH_FAILURE.test(normalized);
}

function isTimeoutFailure(status: number | undefined, normalized: string): boolean {
  return status === 408 || status === 504 || TIMEOUT_FAILURE.test(normalized);
}

function isRateLimitFailure(status: number | undefined, normalized: string): boolean {
  return status === 429 || RATE_LIMIT_FAILURE.test(normalized);
}

function isInvalidRequestFailure(status: number | undefined, normalized: string): boolean {
  return status === 400 || INVALID_REQUEST_FAILURE.test(normalized);
}

function isModelUnavailableFailure(status: number | undefined, normalized: string): boolean {
  return status === 404 || MODEL_UNAVAILABLE_FAILURE.test(normalized);
}

/**
 * Status and message classification, in precedence order. A payment-required
 * response is out of credit for THIS provider's account, which is a quota
 * failure rather than a transient one (see shouldFailover).
 */
function classificationFor(
  status: number | undefined,
  normalized: string
): { type: ProviderFailureType; retryable: boolean } {
  if (isAuthFailure(status, normalized)) {
    return {
      type:
        status === 403 || normalized.includes("permission")
          ? "permission_error"
          : "authentication_error",
      retryable: false,
    };
  }
  if (isTimeoutFailure(status, normalized)) return { type: "timeout", retryable: true };
  if (status === 402) return { type: "quota_exhausted", retryable: false };
  if (isRateLimitFailure(status, normalized)) {
    return QUOTA_MESSAGE.test(normalized)
      ? { type: "quota_exhausted", retryable: false }
      : { type: "rate_limit", retryable: true };
  }
  if (status !== undefined && status >= 500) return { type: "provider_5xx", retryable: true };
  if (isInvalidRequestFailure(status, normalized)) {
    return { type: "invalid_request", retryable: false };
  }
  if (isModelUnavailableFailure(status, normalized)) {
    return { type: "model_unavailable", retryable: false };
  }
  if (NETWORK_FAILURE.test(normalized)) return { type: "network_error", retryable: true };
  return { type: "unknown", retryable: false };
}

export function classifyProviderFailure(input: {
  providerId: string;
  connectionId?: string;
  statusCode?: number;
  code?: string;
  message?: string;
  retryAfter?: number;
}): ProviderFailure {
  const message = input.message?.trim() || "Provider request failed";
  const normalized = `${input.code ?? ""} ${message}`.toLowerCase();
  const status = input.statusCode;
  const { type, retryable } = classificationFor(status, normalized);

  return {
    type,
    retryable,
    providerId: input.providerId,
    ...(input.connectionId ? { connectionId: input.connectionId } : {}),
    ...(status !== undefined ? { statusCode: status } : {}),
    ...(input.retryAfter !== undefined ? { retryAfter: input.retryAfter } : {}),
    message,
  };
}
