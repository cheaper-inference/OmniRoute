/**
 * Limits and endpoint rules shared by the deciders: timeout default and ceiling, base-URL
 * validation (#18555), self-gateway detection (#15641) and the per-endpoint failure cooldown.
 */

/** Default decision timeout (ms). */
export const DEFAULT_DECISION_TIMEOUT_MS = 2_000;
/** Hard ceiling (ms): a decision must never stall dispatch longer than this. */
export const MAX_DECISION_TIMEOUT_MS = 5_000;
export const MIN_DECISION_TIMEOUT_MS = 100;
/** After a failed call, the endpoint is not called again for this long. */
export const DECISION_FAILURE_COOLDOWN_MS = 30_000;

/** Timeout in ms: the default for anything unusable, clamped to [100, 5000]. */
export function clampDecisionTimeout(value: unknown): number {
  const n = typeof value === "number" ? value : Number.NaN;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_DECISION_TIMEOUT_MS;
  return Math.min(MAX_DECISION_TIMEOUT_MS, Math.max(MIN_DECISION_TIMEOUT_MS, Math.round(n)));
}

/** Absolute http(s) URL without credentials, query or fragment; `undefined` otherwise. */
export function normalizeDecisionBaseUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return undefined;
    }
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return undefined;
  }
}

/**
 * True when a URL points at this OmniRoute (loopback + the server port): a decision call
 * there would re-enter the gateway and route again (#15641 `isSelfGatewayBaseUrl`).
 */
export function isSelfGatewayUrl(baseUrl: string): boolean {
  try {
    const url = new URL(baseUrl);
    const host = url.hostname.toLowerCase();
    const loopback =
      host === "127.0.0.1" || host === "localhost" || host === "::1" || host === "[::1]";
    if (!loopback) return false;
    const port = url.port || (url.protocol === "https:" ? "443" : "80");
    return port === (process.env.PORT?.trim() || "20128");
  } catch {
    return false;
  }
}

export interface DecisionCooldown {
  /** Remaining cooldown in ms for `key` (0 = callable). */
  remainingMs(key: string): number;
  trip(key: string): void;
}

/** Per-endpoint cooldown table (#18555); `now` is a clock seam for tests. */
export function createDecisionCooldown(now: () => number = Date.now): DecisionCooldown {
  const until = new Map<string, number>();
  return {
    remainingMs(key) {
      const end = until.get(key) ?? 0;
      const left = end - now();
      if (left <= 0) until.delete(key);
      return Math.max(0, left);
    },
    trip(key) {
      until.set(key, now() + DECISION_FAILURE_COOLDOWN_MS);
    },
  };
}

/** Process-wide table used by the live deciders. */
export const sharedDecisionCooldown = createDecisionCooldown();
