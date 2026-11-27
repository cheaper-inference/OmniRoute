/**
 * Shared failure classification for model probes (#11777).
 *
 * Used by the manual "Test all models" batch (`POST /api/models/test-all`) and the
 * scheduled model health check (`modelHealthCheckScheduler.ts`) so the two paths
 * cannot drift on what counts as a hide-worthy failure or when to stop probing.
 */

/** Stop a batch after this many rate-limited results in a row (429 storm). */
export const CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD = 3;
/** Web-session providers (esp. Arena/CF) ban burst probes — pause between models. */
export const SLOW_PROBE_PROVIDERS: ReadonlySet<string> = new Set(["lmarena", "lma"]);
/** Fixed inter-model delay for SLOW_PROBE_PROVIDERS (no env — avoids doc-sync drift). */
export const SLOW_PROBE_DELAY_MS = 3500;
/** Stop a slow-probe batch after this many bot/Cloudflare blocks in a row. */
export const CONSECUTIVE_BOT_STOP_THRESHOLD = 2;

export interface ProbeOutcome {
  status: "ok" | "error" | "slow";
  statusCode?: number;
  /** Runner-level HTTP status; set even when no upstream status exists (e.g. a thrown fetch error is 500). */
  httpStatus?: number;
  error?: string;
  rateLimited?: boolean;
  isTransient?: boolean;
  isQuota?: boolean;
  isTimeout?: boolean;
  skipped?: boolean;
}

const BOT_BLOCK_PATTERN = /cloudflare|bot management|recaptcha|cf-chl|just a moment/i;

/**
 * #9511: quota entries (403 with "insufficient balance" etc.) are NOT bot-blocks —
 * they must not count toward the bot-block stop threshold.
 */
export function isBotBlockedOutcome(entry: ProbeOutcome): boolean {
  return (
    !entry.isQuota &&
    (entry.statusCode === 403 ||
      (typeof entry.error === "string" && BOT_BLOCK_PATTERN.test(entry.error)))
  );
}

/**
 * A hard, non-transient failure: the only kind that may hide a model. Rate limits,
 * timeouts, transient upstream errors, quota exhaustion and skipped probes (#14780:
 * a web-session probe that never ran) are not evidence the model is broken.
 */
export function isHideWorthyFailure(entry: ProbeOutcome): boolean {
  return (
    entry.status === "error" &&
    !entry.rateLimited &&
    !entry.isTimeout &&
    !entry.isTransient &&
    !entry.isQuota &&
    !entry.skipped
  );
}

/** A probe that proves the model works (a slow answer is still an answer). */
export function isHealthyOutcome(entry: ProbeOutcome): boolean {
  return entry.status === "ok" || entry.status === "slow";
}

/** Stop a scheduled pass after this many consecutive same-class connection-level failures. */
export const CONSECUTIVE_CONNECTION_FAILURE_STOP_THRESHOLD = 3;

export type ConnectionFailureClass = "auth" | "server";

/**
 * Failures that say something about the connection or the provider, not about one
 * model: auth/billing rejections (401/402/403) and 5xx. A thrown runner error carries
 * no upstream status but an `httpStatus` of 500, so it lands here too. Rate limits,
 * timeouts and skipped probes have their own handling and are never classified here.
 */
export function classifyConnectionFailure(entry: ProbeOutcome): ConnectionFailureClass | null {
  if (entry.status !== "error" || entry.rateLimited || entry.isTimeout || entry.skipped) {
    return null;
  }
  const code = entry.statusCode ?? entry.httpStatus;
  if (code === undefined) return null;
  if (code === 401 || code === 402 || code === 403) return "auth";
  if (code === 408 || (code >= 500 && code <= 599)) return "server";
  return null;
}

/**
 * Hide rule for the UNATTENDED scheduler: stricter than Test-all's `isHideWorthyFailure`.
 * A connection-level failure (expired key, provider outage) must never hide a model,
 * because the next healthy pass would have to flip the whole catalog back.
 */
export function isSchedulerHideWorthyFailure(entry: ProbeOutcome): boolean {
  return isHideWorthyFailure(entry) && classifyConnectionFailure(entry) === null;
}

export interface ConnectionFailureStreak {
  failureClass: ConnectionFailureClass | null;
  count: number;
}

/** Fold one probe outcome into the running run of same-class connection-level failures. */
export function advanceConnectionFailureStreak(
  streak: ConnectionFailureStreak,
  entry: ProbeOutcome
): ConnectionFailureStreak {
  const failureClass = classifyConnectionFailure(entry);
  if (failureClass === null) return { failureClass: null, count: 0 };
  return {
    failureClass,
    count: streak.failureClass === failureClass ? streak.count + 1 : 1,
  };
}
