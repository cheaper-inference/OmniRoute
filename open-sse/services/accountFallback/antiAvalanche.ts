/**
 * open-sse/services/accountFallback/antiAvalanche.ts
 *
 * Payload-aware cascading failover protection (Anti-Avalanche Guard).
 *
 * Prevents domino exhaustion across multiple credentials when an upstream
 * rate limit (HTTP 429) or context-overflow rejection (HTTP 400) is
 * triggered by the payload size, prompt token volume, or TPM/burst limits
 * rather than transient per-key exhaustion.
 *
 * HTTP 413 is deliberately NOT handled here: accountFallback.ts treats
 * PAYLOAD_TOO_LARGE as a retryable fallback (#13350), so another account or
 * provider may still accept the payload.
 *
 * When a request fails with 429 and:
 *  1. Upstream explicitly indicates token rate / TPM exhaustion (e.g. Gemini
 *     generate_content_free_tier_input_token_count, or OpenAI/Anthropic TPM limit), OR
 *  2. The payload is abnormally large (e.g. > 50,000 tokens) and exceeds the
 *     allowed retry threshold (at most 1 retry for 50k-100k, 0 retries for >= 100k),
 *
 * the guard suppresses cascading fallback across the remaining active credentials
 * in the pool. This prevents 1 oversized request from knocking down all N keys
 * and triggering escalated 1800s model lockouts on healthy accounts.
 *
 * Tuning is env-only (OMNIROUTE_AVALANCHE_*, see docs/reference/ENVIRONMENT.md).
 */

import { classifyGeminiQuotaMetricFromText, isTpmExhausted } from "../geminiRateLimitTracker.ts";
import { isContextOverflow400 } from "../combo/comboPredicates.ts";

export const DEFAULT_AVALANCHE_TOKEN_THRESHOLD = 50_000;
export const MASSIVE_PAYLOAD_TOKEN_THRESHOLD = 100_000;
export const DEFAULT_AVALANCHE_MAX_RETRIES = 1;
export const DEFAULT_AVALANCHE_BURST_COOLDOWN_MS = 60_000;

const EXPLICIT_TPM_PATTERNS = [
  /free_tier_input_token_count/i,
  /\bgenerate_content_.*_token_count\b/i,
  /\b(?:tpm|tokens?\s*per\s*minute)\b/i,
  /\btoken\s*rate\s*limit\b/i,
  /\binput\s*tokens?\s*exceed(?:ed)?\b/i,
  /\brate_limit_exceeded.*tokens?\b/i,
  /\btoken\s*limit\s*reached\b/i,
];

export type AvalancheFailureReason =
  "explicit_tpm_limit" | "oversized_payload_rate_limit" | "context_length_exceeded";

export interface AvalancheEvaluationContext {
  status: number;
  errorText: string | null | undefined;
  provider?: string | null;
  model?: string | null;
  promptTokens?: number | null;
  fallbackAttemptCount?: number;
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
  tokenThreshold: number;
  massiveThreshold: number;
  maxRetries: number;
  burstCooldownMs: number;
}

function readPositiveNumber(raw: string | undefined, fallback: number, allowZero = false): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return fallback;
  return (allowZero ? parsed >= 0 : parsed > 0) ? parsed : fallback;
}

export function resolveAvalancheSettings(): AvalancheSettings {
  const envEnabled = process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED;
  const enabled = !(envEnabled === "false" || envEnabled === "0");

  return {
    enabled,
    tokenThreshold: readPositiveNumber(
      process.env.OMNIROUTE_AVALANCHE_TOKEN_THRESHOLD,
      DEFAULT_AVALANCHE_TOKEN_THRESHOLD
    ),
    massiveThreshold: MASSIVE_PAYLOAD_TOKEN_THRESHOLD,
    maxRetries: readPositiveNumber(
      process.env.OMNIROUTE_AVALANCHE_MAX_RETRIES,
      DEFAULT_AVALANCHE_MAX_RETRIES,
      true
    ),
    burstCooldownMs: readPositiveNumber(
      process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS,
      DEFAULT_AVALANCHE_BURST_COOLDOWN_MS
    ),
  };
}

export function isExplicitTokenRateLimitError(
  status: number,
  errorText: string | null | undefined,
  provider?: string | null,
  model?: string | null
): boolean {
  if (status !== 429) return false;
  const text = String(errorText || "");

  if (provider === "gemini") {
    if (classifyGeminiQuotaMetricFromText(text) === "tpm") return true;
    if (model && isTpmExhausted(model)) return true;
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

/** HTTP 429 branch: explicit TPM limit, massive payload, or oversized payload past the retry budget. */
function evaluateRateLimitAvalanche(
  ctx: AvalancheEvaluationContext,
  settings: AvalancheSettings,
  promptTokens: number,
  label: string
): AvalancheRiskResult | null {
  // 2a. Explicit TPM / Token Limit in error body or metric
  if (isExplicitTokenRateLimitError(ctx.status, ctx.errorText, ctx.provider, ctx.model)) {
    return {
      isAvalancheRisk: true,
      reason: "explicit_tpm_limit",
      shouldSuppressFallback: true,
      suggestedCooldownMs: settings.burstCooldownMs,
      promptTokens,
      explanation: `[OmniRoute Anti-Avalanche] Token rate limit (TPM/token count) hit for ${label}. Cascading fallback suppressed across remaining keys to protect pool.`,
    };
  }

  // 2b. Massive payload (>= 100k tokens)
  if (promptTokens >= settings.massiveThreshold) {
    return {
      isAvalancheRisk: true,
      reason: "oversized_payload_rate_limit",
      shouldSuppressFallback: true,
      suggestedCooldownMs: settings.burstCooldownMs,
      promptTokens,
      explanation: `[OmniRoute Anti-Avalanche] Massive payload (~${promptTokens} tokens) hit rate limit on ${label}. Cascading fallback suppressed to prevent key exhaustion.`,
    };
  }

  // 2c. Oversized payload (>= 50k tokens) with bounded retry limit
  if (promptTokens >= settings.tokenThreshold) {
    const attempt = nonNegativeOrZero(ctx.fallbackAttemptCount);
    const shouldSuppress = attempt >= settings.maxRetries;
    return {
      isAvalancheRisk: true,
      reason: "oversized_payload_rate_limit",
      shouldSuppressFallback: shouldSuppress,
      suggestedCooldownMs: settings.burstCooldownMs,
      promptTokens,
      explanation: shouldSuppress
        ? `[OmniRoute Anti-Avalanche] Large payload (~${promptTokens} tokens) hit rate limit on ${label} across ${attempt + 1} attempt(s). Cascading fallback suppressed.`
        : undefined,
    };
  }

  return null;
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

  // 2. HTTP 429: Rate limited
  if (ctx.status === 429) {
    const rateLimitRisk = evaluateRateLimitAvalanche(ctx, settings, promptTokens, label);
    if (rateLimitRisk) return rateLimitRisk;
  }

  return noAvalancheRisk(promptTokens);
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
