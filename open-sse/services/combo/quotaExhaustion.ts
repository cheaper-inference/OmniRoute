import { checkFallbackError, type ProviderProfile } from "../accountFallback.ts";
import { classifyGeminiQuotaMetricFromText } from "../geminiRateLimitTracker.ts";
import { readAttemptFailure, type AttemptFailure } from "./attemptFailure.ts";

const TERMINAL_QUOTA_CODES = new Set([
  "billing_hard_limit_reached",
  "credits_exhausted",
  "insufficient_quota",
  "quota_exhausted",
  // #10966: durable wallet/balance exhaustion signalled on a 403 (not 402/429) by
  // some upstreams — e.g. AUTHZ_INSUFFICIENT_BALANCE, "Insufficient account balance.
  // Top up your account at …".
  "authz_insufficient_balance",
]);

const trustedClassifications = new WeakMap<Response, boolean>();

export function recordQuotaExhaustionClassification(response: Response, exhausted: boolean): void {
  trustedClassifications.set(response, exhausted);
}

export function withQuotaExhaustionClassification(
  response: Response,
  exhausted: boolean | null
): Response {
  if (exhausted !== null) recordQuotaExhaustionClassification(response, exhausted);
  return response;
}

export async function isQuotaExhaustionResponse(
  response: Response,
  provider: string | null,
  model: string | null,
  profile: ProviderProfile | null = null
): Promise<boolean> {
  const trusted = trustedClassifications.get(response);
  if (trusted !== undefined) return trusted;

  if (!isQuotaStatus(response.status)) return false;
  return isQuotaExhaustionFailure(await readAttemptFailure(response), provider, model, profile);
}

function isQuotaStatus(status: number): boolean {
  // Durable quota depletion can be reported as 403; auth-only 403 still needs
  // an actual quota signal. Other statuses never imply quota exhaustion.
  return status === 402 || status === 429 || status === 403;
}

/** Classify the same decoded facts used by the combo retry/fallback policy. */
export function isQuotaExhaustionFailure(
  failure: AttemptFailure,
  provider: string | null,
  model: string | null,
  profile: ProviderProfile | null = null
): boolean {
  const { response, quota } = failure;
  const trusted = trustedClassifications.get(response);
  if (trusted !== undefined) return trusted;
  if (!isQuotaStatus(response.status)) return false;
  const { text, structuredError } = quota;
  if (provider === "gemini" && response.status === 429) {
    const metric = classifyGeminiQuotaMetricFromText(text);
    if (metric === "rpm" || metric === "tpm") return false;
    if (metric === "rpd") return true;
  }
  const normalizedCode = structuredError?.code?.toLowerCase();
  const normalizedType = structuredError?.type?.toLowerCase();
  if (
    (normalizedCode && TERMINAL_QUOTA_CODES.has(normalizedCode)) ||
    (normalizedType && TERMINAL_QUOTA_CODES.has(normalizedType))
  ) {
    return true;
  }

  if (
    /\b(?:billing hard limit reached|credits? exhausted|subscription quota exhausted)\b/i.test(text)
  ) {
    return true;
  }

  if (
    provider?.startsWith("openai-compatible-") ||
    provider?.startsWith("openai-compatible-chat-")
  ) {
    return false;
  }

  return (
    checkFallbackError(
      response.status,
      text,
      0,
      model,
      provider,
      response.headers,
      profile,
      structuredError
    ).reason === "quota_exhausted"
  );
}
