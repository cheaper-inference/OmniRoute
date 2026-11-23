/**
 * Account-level Codex quota observed on a successful hosted image response.
 *
 * This is NOT an image-credit balance: Codex quota windows may be shared with
 * other workloads. Never derive per-image cost or a before/after delta here.
 * Never surface an internal connection ID or raw upstream quota headers.
 */
import { parseCodexQuotaHeaders } from "../executors/codex/quota.ts";

export const CODEX_IMAGE_QUOTA_REQUEST_HEADER = "x-omniroute-codex-quota-telemetry";

export type CodexImageQuotaSnapshot = {
  fiveHourRemainingPercent?: number;
  fiveHourResetAt?: string;
  sevenDayRemainingPercent?: number;
  sevenDayResetAt?: string;
};

function remainingPercent(used: number, limit: number): number | undefined {
  if (!Number.isFinite(used) || used < 0 || !Number.isFinite(limit) || limit <= 0) {
    return undefined;
  }
  return Math.max(0, Math.min(100, (1 - used / limit) * 100));
}

function safeResetAt(input: string | null): string | undefined {
  if (!input) return undefined;
  const timestamp = Date.parse(input);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
}

/** No follow-up quota API request: accept only the response that actually delivered the image. */
export function parseCodexImageQuotaSnapshot(
  responseHeaders: Headers,
  model: string
): CodexImageQuotaSnapshot | null {
  const raw: Record<string, string> = {};
  responseHeaders.forEach((value, name) => {
    raw[name.toLowerCase()] = value;
  });
  const quota = parseCodexQuotaHeaders(raw, model);
  if (!quota) return null;
  const five = remainingPercent(quota.usage5h, quota.limit5h);
  const seven = remainingPercent(quota.usage7d, quota.limit7d);
  if (five === undefined && seven === undefined) return null;
  const fiveReset = five === undefined ? undefined : safeResetAt(quota.resetAt5h);
  const sevenReset = seven === undefined ? undefined : safeResetAt(quota.resetAt7d);
  return {
    ...(five === undefined ? {} : { fiveHourRemainingPercent: five }),
    ...(fiveReset === undefined ? {} : { fiveHourResetAt: fiveReset }),
    ...(seven === undefined ? {} : { sevenDayRemainingPercent: seven }),
    ...(sevenReset === undefined ? {} : { sevenDayResetAt: sevenReset }),
  };
}

/**
 * Public API keys, even keys with a broad connection allowlist, do not own the
 * selected provider account. Restrict account quota disclosure to an authenticated
 * admin-scope key requesting this metadata explicitly; default is silent.
 */
export function canExposeCodexImageQuota(
  provider: string,
  requestHeaders: Headers,
  authenticatedKeyScopes: readonly string[] | null | undefined
): boolean {
  return (
    provider === "codex" &&
    requestHeaders.get(CODEX_IMAGE_QUOTA_REQUEST_HEADER) === "1" &&
    Array.isArray(authenticatedKeyScopes) &&
    authenticatedKeyScopes.includes("admin")
  );
}

function cleanPercent(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
    return null;
  }
  return value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

export function attachCodexImageQuotaHeaders(
  responseHeaders: Headers,
  snapshot: CodexImageQuotaSnapshot | null | undefined,
  authorized: boolean
): void {
  if (!authorized || !snapshot) return;
  const five = cleanPercent(snapshot.fiveHourRemainingPercent);
  const seven = cleanPercent(snapshot.sevenDayRemainingPercent);
  if (five !== null) {
    responseHeaders.set("X-OmniRoute-Codex-5H-Remaining", five);
    if (snapshot.fiveHourResetAt) {
      const reset = safeResetAt(snapshot.fiveHourResetAt);
      if (reset) responseHeaders.set("X-OmniRoute-Codex-5H-Reset-At", reset);
    }
  }
  if (seven !== null) {
    responseHeaders.set("X-OmniRoute-Codex-7D-Remaining", seven);
    if (snapshot.sevenDayResetAt) {
      const reset = safeResetAt(snapshot.sevenDayResetAt);
      if (reset) responseHeaders.set("X-OmniRoute-Codex-7D-Reset-At", reset);
    }
  }
}
