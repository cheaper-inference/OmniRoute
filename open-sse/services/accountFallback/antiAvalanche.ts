/**
 * open-sse/services/accountFallback/antiAvalanche.ts
 *
 * Anti-Avalanche Guard: opt-in cascading-failover protection
 * (OMNIROUTE_AVALANCHE_PROTECTION_ENABLED=true, off by default).
 *
 * Prevents domino exhaustion across multiple credentials when an upstream
 * rejection comes from a limit every sibling key would hit too:
 *  - an HTTP 429 that names a tokens-per-minute limit (e.g. Gemini
 *    generate_content_free_tier_input_token_count, or an OpenAI/Anthropic TPM
 *    limit). This stops 1 oversized request from knocking down all N keys and
 *    triggering escalated 1800s model lockouts on healthy accounts;
 *  - an HTTP 400 context-overflow rejection.
 *
 * Prompt size alone never suppresses failover: a quota-exhausted 429 with a large
 * prompt says nothing about the sibling accounts, so it fails over as usual.
 *
 * HTTP 413 is deliberately NOT handled here: accountFallback.ts treats
 * PAYLOAD_TOO_LARGE as a retryable fallback (#13350), so another account or
 * provider may still accept the payload.
 *
 * Tuning is env-only (OMNIROUTE_AVALANCHE_*, see docs/reference/ENVIRONMENT.md).
 */

import { classifyGeminiQuotaMetricFromText } from "../geminiRateLimitTracker.ts";
import { isContextOverflow400 } from "../combo/comboPredicates.ts";
import { isSubscriptionQuotaText } from "../quotaTextCooldowns.ts";

export const DEFAULT_AVALANCHE_BURST_COOLDOWN_MS = 60_000;

const EXPLICIT_TPM_PATTERNS = [
  /free_tier_input_token_count/i,
  /\bgenerate_content_.*_token_count\b/i,
  /\b(?:tpm|tokens?\s*per\s*minute)\b/i,
  /\btoken\s*rate\s*limit\b/i,
  /\brate_limit_exceeded.*tokens?\b/i,
];

// A window longer than a minute is a quota: sibling accounts keep their own, so it must fail over
// even when the body also carries a token wording (OpenAI "tokens per day", Gemini "...PerDay").
const LONG_WINDOW_QUOTA_PATTERNS = [
  /\b(?:tpd|rpd)\b/i,
  /per[\s_-]*(?:hour|day|week|month)/i,
  /\b(?:hourly|daily|weekly|monthly)\b/i,
  /\binsufficient_quota\b/i,
];

export type AvalancheFailureReason = "explicit_tpm_limit" | "context_length_exceeded";

export interface AvalancheEvaluationContext {
  status: number;
  errorText: string | null | undefined;
  provider?: string | null;
  model?: string | null;
  promptTokens?: number | null;
}

export interface AvalancheRiskResult {
  isAvalancheRisk: boolean;
  reason?: AvalancheFailureReason;
  shouldSuppressFallback: boolean;
  suggestedCooldownMs: number;
  promptTokens: number;
  explanation?: string;
}

export interface AvalancheSettings {
  enabled: boolean;
  burstCooldownMs: number;
}

function readPositiveNumber(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function resolveAvalancheSettings(): AvalancheSettings {
  return {
    // Opt-in: it changes failover semantics, so only an explicit "true" enables it.
    enabled: process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED === "true",
    burstCooldownMs: readPositiveNumber(
      process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS,
      DEFAULT_AVALANCHE_BURST_COOLDOWN_MS
    ),
  };
}

/**
 * True only when the 429 itself names a tokens-per-minute limit. Local usage counters do not
 * count: they are per model across every key, so they cannot describe this key's rejection.
 */
export function isExplicitTokenRateLimitError(
  status: number,
  errorText: string | null | undefined,
  provider?: string | null
): boolean {
  if (status !== 429) return false;
  const text = String(errorText || "");

  if (
    isSubscriptionQuotaText(text.toLowerCase(), provider) ||
    LONG_WINDOW_QUOTA_PATTERNS.some((pattern) => pattern.test(text))
  ) {
    return false;
  }

  if (provider === "gemini") {
    const metric = classifyGeminiQuotaMetricFromText(text);
    if (metric) return metric === "tpm";
  }

  return EXPLICIT_TPM_PATTERNS.some((pattern) => pattern.test(text));
}

function nonNegativeOrZero(value: number | null | undefined): number {
  return typeof value === "number" && value >= 0 ? value : 0;
}

function noAvalancheRisk(promptTokens: number): AvalancheRiskResult {
  return {
    isAvalancheRisk: false,
    shouldSuppressFallback: false,
    suggestedCooldownMs: 0,
    promptTokens,
  };
}

export function evaluateAvalancheRisk(ctx: AvalancheEvaluationContext): AvalancheRiskResult {
  const settings = resolveAvalancheSettings();
  const promptTokens = nonNegativeOrZero(ctx.promptTokens);
  if (!settings.enabled) return noAvalancheRisk(promptTokens);

  const label = `${ctx.provider || "unknown"}/${ctx.model || "unknown"}`;

  // 1. HTTP 400: Context length / overflow
  if (ctx.status === 400 && isContextOverflow400(ctx.errorText)) {
    return {
      isAvalancheRisk: true,
      reason: "context_length_exceeded",
      shouldSuppressFallback: true,
      suggestedCooldownMs: 0,
      promptTokens,
      explanation: `[OmniRoute Anti-Avalanche] Context length exceeded for ${label}. Cascading fallback across same-model accounts suppressed.`,
    };
  }

  // 2. HTTP 429 naming a tokens-per-minute limit
  if (isExplicitTokenRateLimitError(ctx.status, ctx.errorText, ctx.provider)) {
    return {
      isAvalancheRisk: true,
      reason: "explicit_tpm_limit",
      shouldSuppressFallback: true,
      suggestedCooldownMs: settings.burstCooldownMs,
      promptTokens,
      explanation: `[OmniRoute Anti-Avalanche] Token rate limit (TPM/token count) hit for ${label}. Cascading fallback suppressed across remaining keys to protect pool.`,
    };
  }

  return noAvalancheRisk(promptTokens);
}

/** The guard's burst cooldown is a floor: it never shortens an upstream reset. */
export function resolveAvalancheCooldownMs(
  avalancheCooldownMs: number | null | undefined,
  upstreamResetMs: number | null | undefined
): number | null {
  if (typeof avalancheCooldownMs !== "number") return upstreamResetMs ?? null;
  return Math.max(avalancheCooldownMs, upstreamResetMs ?? 0);
}

export function formatAntiAvalancheMessage(
  provider: string,
  model: string,
  promptTokens: number,
  reason: string,
  originalError?: string
): string {
  const base = `[OmniRoute Anti-Avalanche] Request to ${provider}/${model} (~${promptTokens.toLocaleString()} tokens) triggered a payload-induced rate limit (${reason}). Cascading fallback across remaining credentials was suppressed to preserve pool availability.`;
  const suggestion =
    provider === "gemini"
      ? ` Tip: Large context requests (>50k tokens) with deep agent history should be routed to 'agy/*' (Antigravity OAuth) which has higher burst token limits, or wait 60s for the TPM sliding window to reset.`
      : ` Tip: Consider reducing context size or waiting for rate limit window to clear.`;
  const upstream = originalError ? ` Upstream error: ${originalError}` : "";
  return `${base}${suggestion}${upstream}`;
}

/**
 * Tags a suppressed failover on the client-facing response. Best-effort: the headers of
 * some Response objects (e.g. Response.error() or a response built by a fetch wrapper) are
 * immutable and .set() throws, which must never break the failover/error path.
 */
export function applyAvalancheSuppressionHeaders(
  response: Response | null | undefined,
  reason?: AvalancheFailureReason
): void {
  const headers = response?.headers;
  if (!headers) return;
  try {
    headers.set("x-omniroute-anti-avalanche", "suppressed");
    if (reason) headers.set("x-omniroute-avalanche-reason", reason);
  } catch {
    // immutable headers: the suppression is still enforced, only the debug tag is dropped.
  }
}
