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

function hasExhaustedQuotaEvidence(headers: unknown): boolean {
  for (const window of ["5h", "7d"]) {
    const usageRaw = headerValue(headers, `x-codex-${window}-usage`);
    const limitRaw = headerValue(headers, `x-codex-${window}-limit`);
    if (usageRaw === null || limitRaw === null || !usageRaw.trim() || !limitRaw.trim()) continue;
    const usage = Number(usageRaw);
    const limit = Number(limitRaw);
    if (Number.isFinite(usage) && Number.isFinite(limit) && limit > 0 && usage >= limit) {
      return true;
    }
  }
  for (const windowName of ["primary", "secondary"]) {
    const raw = headerValue(headers, `x-codex-${windowName}-used-percent`);
    if (!raw?.trim()) continue;
    const usedPercent = Number(raw);
    if (Number.isFinite(usedPercent) && usedPercent >= 100) return true;
  }
  for (const name of [
    "x-ratelimit-remaining",
    "x-ratelimit-remaining-requests",
    "x-ratelimit-remaining-tokens",
  ]) {
    const raw = headerValue(headers, name);
    if (!raw?.trim()) continue;
    const remaining = Number(raw);
    if (Number.isFinite(remaining) && remaining <= 0) return true;
  }
  return false;
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
