type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function remaining(value: JsonRecord | null): number | null {
  if (!value) return null;
  const candidate = value.remaining ?? value.remainingPercentage;
  const parsed = typeof candidate === "number" ? candidate : Number(candidate);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Kimi uses the same 403 wording for two different conditions:
 * a depleted weekly subscription and a temporary request window. The latter
 * must stay recoverable, otherwise a healthy subscription is marked terminal.
 */
export function getKimiTemporaryRateLimitResetAt(
  usage: unknown,
  nowMs = Date.now()
): string | null {
  const quotas = asRecord(asRecord(usage)?.quotas);
  const rateLimit = asRecord(quotas?.Ratelimit);
  const weekly = asRecord(quotas?.Weekly);
  const rateLimitRemaining = remaining(rateLimit);
  const weeklyRemaining = remaining(weekly);
  const resetAt = typeof rateLimit?.resetAt === "string" ? rateLimit.resetAt : null;
  const resetMs = resetAt ? new Date(resetAt).getTime() : NaN;

  if (
    rateLimitRemaining !== 0 ||
    weeklyRemaining === null ||
    weeklyRemaining <= 0 ||
    !Number.isFinite(resetMs) ||
    resetMs <= nowMs
  ) {
    return null;
  }

  return resetAt;
}
