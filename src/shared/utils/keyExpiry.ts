/**
 * API key expiry helpers: quick presets and "end of the local day" arithmetic.
 *
 * Pure and dependency-free so it runs in the browser and on the server. All day arithmetic uses
 * the local setters of Date, so a daylight-saving change between today and the target day keeps
 * the wall-clock time (23:59 stays 23:59).
 */

/** Quick expiry presets, in days. */
export const KEY_EXPIRY_PRESET_DAYS = [7, 15, 30] as const;

const SECONDS_PER_DAY = 86_400;

/** Server-side maximum for a relative key TTL (3650 days). */
const MAX_TTL_SECONDS = 315_360_000;

/** Whole days in a TTL, or null unless it is a positive whole multiple of one day. */
export function wholeDaysFromTtlSeconds(ttlSeconds: number | null | undefined): number | null {
  if (typeof ttlSeconds !== "number" || !(ttlSeconds > 0)) return null;
  const days = ttlSeconds / SECONDS_PER_DAY;
  return Number.isInteger(days) ? days : null;
}

/** 23:59:00.000 in the local time zone of the calendar day `days` after `now`. */
export function endOfLocalDayAfterDays(days: number, now: Date): Date {
  const end = new Date(now.getTime());
  end.setDate(end.getDate() + days);
  end.setHours(23, 59, 0, 0);
  return end;
}

/**
 * Stretches a whole-day TTL so it ends at 23:59 local time on its last day. Any other TTL, or one
 * whose aligned value would pass the server maximum or is not a finite number, is returned
 * unchanged.
 */
export function alignTtlSecondsToEndOfLocalDay(ttlSeconds: number, now: Date): number {
  const days = wholeDaysFromTtlSeconds(ttlSeconds);
  if (days === null) return ttlSeconds;
  const end = endOfLocalDayAfterDays(days, now);
  const aligned = Math.ceil((end.getTime() - now.getTime()) / 1000);
  return !Number.isFinite(aligned) || aligned > MAX_TTL_SECONDS ? ttlSeconds : aligned;
}
