/**
 * CodeBuddy International dated 429 → parse the unlock instant.
 *
 * Requirement: when the gateway answers 429 WITH an unlock date, the account is
 * frozen until that date, survives restarts and is never retried early. A 429
 * WITHOUT a date is a different, non-authoritative path that uses the ordinary
 * cooldown/backoff.
 *
 * This module deliberately only PARSES. The freeze itself is applied by the
 * shared resilience path — `parseDetailedRetryHintFromJsonBody`
 * (`open-sse/services/retryAfterJson.ts`) reads the same `data.resetTime`
 * envelope, and `accountFallback` persists it on
 * `provider_connections.rate_limited_until`, which `getProviderCredentials`
 * already honors. Implementing a second, executor-local freeze here would give
 * lockout two sources of truth that can disagree about when an account is
 * eligible again.
 *
 * VERIFIED live 2026-10-26: the real gateway does NOT send `data.resetTime`.
 * Its 429 states the unlock instant in prose inside `msg`
 * ("...your usage will reset at YYYY-MM-DD HH:MM:SS", zone-less, read as UTC),
 * which the shared text parser already understands. What blocked the freeze was
 * the resolved OAuth connection-cooldown profile (`useUpstreamRetryHints:
 * false` for every OAuth provider) plus the operator's `maxCooldownMs` cap;
 * `RegistryEntry.trustUpstreamResetDate` is the per-provider opt-in that fixes
 * both without touching the category-wide policy.
 */

export type LockoutSource = "body-date" | "retry-after" | "none";

export interface ParsedRateLimit {
  status: number;
  scope: "account" | "model" | "concurrency";
  resetAtMs: number | null;
  source: LockoutSource;
  /** True only when the provider gave a usable, still-future date. */
  authoritative: boolean;
  reason: string;
}

export interface ParseRateLimitInput {
  status: number;
  headers?: Record<string, string> | Headers | null;
  body?: string | null;
  now?: number;
}

function headerValue(
  headers: Record<string, string> | Headers | null | undefined,
  name: string
): string {
  if (!headers) return "";
  if (typeof (headers as Headers).get === "function") {
    return ((headers as Headers).get(name) || "").trim();
  }
  const obj = headers as Record<string, string>;
  const key = Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase());
  return key && typeof obj[key] === "string" ? obj[key].trim() : "";
}

/** Parse an absolute date or epoch seconds/ms into a timestamp. */
function parseAbsoluteMs(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    // Epoch seconds vs ms: anything below 1e12 cannot be a modern ms timestamp.
    return value < 1e12 ? Math.round(value * 1000) : Math.round(value);
  }
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw) return null;
  if (/^\d+$/.test(raw)) {
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) return null;
    return n < 1e12 ? n * 1000 : n;
  }
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

const RESET_KEYS = [
  "resetTime",
  "reset_time",
  "resetAt",
  "reset_at",
  "resetsAt",
  "resets_at",
  "retryAfterMs",
  "retry_after_ms",
  "unlockTime",
  "unlock_time",
  "availableAt",
] as const;

function findResetInBody(body: unknown): number | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;

  for (const key of RESET_KEYS) {
    const ms = parseAbsoluteMs(record[key]);
    if (ms !== null) return ms;
  }

  // CodeBuddy wraps its envelope in `data`: `{code, msg, data:{resetTime}}`.
  const data = record.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    for (const key of RESET_KEYS) {
      const ms = parseAbsoluteMs((data as Record<string, unknown>)[key]);
      if (ms !== null) return ms;
    }
  }

  return null;
}

export function parseCodeBuddyRateLimit(input: ParseRateLimitInput): ParsedRateLimit {
  const now = input.now ?? Date.now();
  const status = input.status;

  let resetAtMs: number | null = null;
  let source: LockoutSource = "none";

  // 1. `Retry-After` (delta seconds or HTTP date).
  const retryAfter = headerValue(input.headers, "retry-after");
  if (retryAfter) {
    if (/^\d+$/.test(retryAfter)) {
      resetAtMs = now + Number(retryAfter) * 1000;
      source = "retry-after";
    } else {
      const parsed = Date.parse(retryAfter);
      if (Number.isFinite(parsed)) {
        resetAtMs = parsed;
        source = "retry-after";
      }
    }
  }

  // 2. Structured provider envelope (absolute date, seconds or ms).
  if (resetAtMs === null && input.body) {
    try {
      const parsedBody: unknown = JSON.parse(input.body);
      const bodyReset = findResetInBody(parsedBody);
      if (bodyReset !== null) {
        resetAtMs = bodyReset;
        source = "body-date";
      }
    } catch {
      // Not JSON: no structured date available.
    }
  }

  const authoritative = resetAtMs !== null && Number.isFinite(resetAtMs) && resetAtMs > now;

  return {
    status,
    scope: "account",
    resetAtMs: authoritative ? resetAtMs : null,
    source: authoritative ? source : "none",
    authoritative,
    reason: authoritative ? "rate_limit" : "rate_limit_unparsed",
  };
}
