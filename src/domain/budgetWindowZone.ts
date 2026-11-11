/**
 * Budget windows in a configured IANA time zone (OMNIROUTE_BUDGET_TIMEZONE).
 *
 * Unset (default) or not an IANA name: callers keep their UTC windows. The reset time
 * ("HH:MM") is local wall-clock time in the zone, weekly windows start on local Monday and
 * monthly windows follow the local calendar month. Boundaries go through the DST-aware
 * converter the TPD reset clock already uses, so a daylight-saving day is 23 or 25 hours.
 *
 * @module domain/budgetWindowZone
 */
import {
  isValidIanaTimeZone,
  zonedLocalToUtcFirstOccurrence,
  zonedParts,
} from "@omniroute/open-sse/services/dailyQuotaReset.ts";

export interface ZonedBudgetWindow {
  periodStartAt: number;
  nextResetAt: number;
}

let zoneCache: { raw: string; zone: string | null } | null = null;

/** The configured zone, or null for UTC. A bad name warns once and means UTC ("Local" is refused: it differs per host). */
export function getBudgetTimeZone(env: Record<string, string | undefined> = process.env) {
  const raw = (env.OMNIROUTE_BUDGET_TIMEZONE ?? "").trim();
  if (zoneCache?.raw === raw) return zoneCache.zone;
  const zone = raw && isValidIanaTimeZone(raw) ? raw : null;
  if (raw && !zone) {
    console.warn(
      `[costRules] OMNIROUTE_BUDGET_TIMEZONE="${raw}" is not an IANA timezone; using UTC`
    );
  }
  zoneCache = { raw, zone };
  return zone;
}

// A window is a pair of fixed instants, so it stays valid until `nextResetAt`: reuse it and
// do the zone arithmetic once per window, not once per request.
// shortcut: unbounded by key, but a key is (zone, interval, reset time): a few entries.
const windowCache = new Map<string, ZonedBudgetWindow>();

export function getZonedBudgetWindow(
  zone: string,
  interval: "daily" | "weekly" | "monthly",
  hours: number,
  minutes: number,
  now: number
): ZonedBudgetWindow {
  const key = `${zone}|${interval}|${hours}:${minutes}`;
  const cached = windowCache.get(key);
  if (cached && now >= cached.periodStartAt && now < cached.nextResetAt) return cached;

  const { year, month, day } = zonedParts(now, zone);
  // Reset instant on a local calendar date. Date.UTC folds day/month overflow into a real date.
  const at = (y: number, m: number, d: number) => {
    const date = new Date(Date.UTC(y, m - 1, d));
    return zonedLocalToUtcFirstOccurrence(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      hours,
      minutes,
      0,
      zone
    );
  };

  let first = day; // day of the month the window starts on, in the local calendar
  let step = 1; // days per window
  if (interval === "weekly") {
    first = day - ((new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7);
    step = 7;
  }
  const monthly = interval === "monthly";
  const current = monthly ? at(year, month, 1) : at(year, month, first);
  const previous = monthly ? at(year, month - 1, 1) : at(year, month, first - step);
  const following = monthly ? at(year, month + 1, 1) : at(year, month, first + step);

  const window =
    now >= current
      ? { periodStartAt: current, nextResetAt: following }
      : { periodStartAt: previous, nextResetAt: current };
  windowCache.set(key, window);
  return window;
}
