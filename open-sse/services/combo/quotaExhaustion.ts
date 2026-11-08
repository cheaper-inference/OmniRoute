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

/** Gemini 429s: per-minute limits are transient, per-day limits are terminal, else undecided. */
function geminiQuotaVerdict(provider: string | null, status: number, text: string): boolean | null {
  if (provider !== "gemini" || status !== 429) return null;
  const metric = classifyGeminiQuotaMetricFromText(text);
  if (metric === "rpm" || metric === "tpm") return false;
  return metric === "rpd" ? true : null;
}

function hasTerminalQuotaCode(
  structuredError: AttemptFailure["quota"]["structuredError"]
): boolean {
  const code = structuredError?.code?.toLowerCase();
  const type = structuredError?.type?.toLowerCase();
  return Boolean(
    (code && TERMINAL_QUOTA_CODES.has(code)) || (type && TERMINAL_QUOTA_CODES.has(type))
  );
}

function hasTerminalQuotaText(text: string): boolean {
  return /\b(?:billing hard limit reached|credits? exhausted|subscription quota exhausted)\b/i.test(
    text
  );
}

function isOpenAiCompatibleProvider(provider: string | null): boolean {
  return Boolean(
    provider?.startsWith("openai-compatible-") || provider?.startsWith("openai-compatible-chat-")
  );
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
  const gemini = geminiQuotaVerdict(provider, response.status, text);
  if (gemini !== null) return gemini;
  if (hasTerminalQuotaCode(structuredError) || hasTerminalQuotaText(text)) return true;
  if (isOpenAiCompatibleProvider(provider)) return false;

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
