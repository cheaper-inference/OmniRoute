/**
 * codexWakeupSchedule.ts — when does a scheduled Codex wakeup run next?
 *
 * Pure (no timers, no DB). Daily schedules are evaluated in the task's IANA timezone, so
 * "08:30 on weekdays" stays 08:30 local across DST changes. Interval schedules count
 * from the moment they are evaluated, which is also how a run missed while the server
 * was down is handled: it runs once on the next tick and the next slot is counted from
 * then — missed slots are never replayed.
 */
import type { CodexWakeupSchedule } from "@/shared/validation/codexWakeupSchemas";

type ZonedParts = { year: number; month: number; day: number; hour: number; minute: number };

const formatters = new Map<string, Intl.DateTimeFormat>();

function zonedFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    formatters.set(timeZone, formatter);
  }
  return formatter;
}

function zonedParts(timeZone: string, ms: number): ZonedParts {
  const parts: Record<string, number> = {};
  for (const { type, value } of zonedFormatter(timeZone).formatToParts(ms)) {
    if (type !== "literal") parts[type] = Number(value);
  }
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour % 24,
    minute: parts.minute,
  };
}

/** Wall-clock offset of `timeZone` from UTC at instant `ms`, in ms (minute precision). */
function zoneOffsetMs(timeZone: string, ms: number): number {
  const p = zonedParts(timeZone, ms);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute) - Math.floor(ms / 60_000) * 60_000;
}

/**
 * UTC instant of a local wall-clock time, or null when that time does not exist in the
 * zone (skipped by a DST jump) — that day is then skipped rather than shifted.
 */
function zonedWallTimeToUtc(timeZone: string, wall: ZonedParts): number | null {
  const asUtc = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute);
  let guess = asUtc - zoneOffsetMs(timeZone, asUtc);
  guess = asUtc - zoneOffsetMs(timeZone, guess);
  const check = zonedParts(timeZone, guess);
  const matches =
    check.year === wall.year &&
    check.month === wall.month &&
    check.day === wall.day &&
    check.hour === wall.hour &&
    check.minute === wall.minute;
  return matches ? guess : null;
}

function nextDailyAt(
  schedule: Extract<CodexWakeupSchedule, { kind: "daily" }>,
  after: number
): number | null {
  const [hour, minute] = schedule.time.split(":").map(Number);
  const today = zonedParts(schedule.timezone, after);
  // 0..14 days: one full week plus margin for a DST-skipped slot on the only chosen day.
  for (let offset = 0; offset <= 14; offset += 1) {
    const calendarDay = new Date(Date.UTC(today.year, today.month - 1, today.day + offset));
    if (!schedule.days.includes(calendarDay.getUTCDay())) continue;
    const at = zonedWallTimeToUtc(schedule.timezone, {
      year: calendarDay.getUTCFullYear(),
      month: calendarDay.getUTCMonth() + 1,
      day: calendarDay.getUTCDate(),
      hour,
      minute,
    });
    if (at !== null && at > after) return at;
  }
  return null;
}

/** ISO timestamp of the next run strictly after `after`, or null when none exists. */
export function nextWakeupAt(
  schedule: CodexWakeupSchedule,
  after: number = Date.now()
): string | null {
  if (schedule.kind === "interval") {
    return new Date(after + schedule.minutes * 60_000).toISOString();
  }
  const at = nextDailyAt(schedule, after);
  return at === null ? null : new Date(at).toISOString();
}
