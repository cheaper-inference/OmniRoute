/**
 * A Codex capacity 429 is pressure on the attempted model/request, not proof
 * that the account's entire Codex quota scope has been exhausted (#18221).
 */
const CAPACITY_MESSAGE = /\bcodex is at capacity\b/i;
const QUOTA_EXHAUSTED_MESSAGE =
  /\b(?:quota|credits?|balance|usage|billing)\b.{0,50}\b(?:exhausted|depleted|reached|exceeded|insufficient|used up)\b|\b(?:exhausted|insufficient|out of)\b.{0,50}\b(?:quota|credits?|balance)\b/is;

function headerValue(headers: unknown, name: string): string | null {
  if (!headers || typeof headers !== "object") return null;
  try {
    const getter = (headers as { get?: (key: string) => unknown }).get;
    if (typeof getter === "function") {
      const value = getter.call(headers, name);
      return typeof value === "string" ? value : null;
    }
    const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === name);
    const value = entry?.[1];
    if (typeof value === "string") return value;
    return Array.isArray(value) && typeof value[0] === "string" ? value[0] : null;
  } catch {
    // Untrusted or malformed header objects cannot crash error handling.
    return null;
  }
}

function readNonEmptyNumber(headers: unknown, name: string): number | null {
  const raw = headerValue(headers, name);
  if (!raw?.trim()) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function hasExhaustedUsageWindow(headers: unknown): boolean {
  return ["5h", "7d"].some((window) => {
    const usage = readNonEmptyNumber(headers, `x-codex-${window}-usage`);
    const limit = readNonEmptyNumber(headers, `x-codex-${window}-limit`);
    return usage !== null && limit !== null && limit > 0 && usage >= limit;
  });
}

function hasExhaustedUsedPercent(headers: unknown): boolean {
  return ["primary", "secondary"].some((windowName) => {
    const usedPercent = readNonEmptyNumber(headers, `x-codex-${windowName}-used-percent`);
    return usedPercent !== null && usedPercent >= 100;
  });
}

function hasZeroRateLimitRemaining(headers: unknown): boolean {
  return [
    "x-ratelimit-remaining",
    "x-ratelimit-remaining-requests",
    "x-ratelimit-remaining-tokens",
  ].some((name) => {
    const remaining = readNonEmptyNumber(headers, name);
    return remaining !== null && remaining <= 0;
  });
}

function hasExhaustedQuotaEvidence(headers: unknown): boolean {
  return (
    hasExhaustedUsageWindow(headers) ||
    hasExhaustedUsedPercent(headers) ||
    hasZeroRateLimitRemaining(headers)
  );
}

/** Unknown or mixed quota/capacity evidence remains under normal 429 protections. */
export function isTransientCodexCapacity429(
  status: number,
  body: unknown,
  headers?: unknown
): boolean {
  return (
    status === 429 &&
    typeof body === "string" &&
    CAPACITY_MESSAGE.test(body) &&
    !QUOTA_EXHAUSTED_MESSAGE.test(body) &&
    !hasExhaustedQuotaEvidence(headers)
  );
}
