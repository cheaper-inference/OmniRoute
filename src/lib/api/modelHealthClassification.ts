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
