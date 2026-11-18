import type { DateRangeValue } from "./date-range-picker";

/** A rolling elapsed duration, or an application-defined calendar range. */
export type DateRangeRelativePreset = {
  id: string;
  label: string;
  /** Optional compact duration badge, independent of the preset id. */
  shortLabel?: string;
} & (
  | { duration: { amount: number; unit: "minute" | "hour" | "day" | "week" }; resolve?: never }
  | { duration?: never; resolve: (context: DateRangePresetContext) => DateRangeValue }
);

export interface DateRangePresetContext {
  /** ISO instant including its UTC offset. */
  referenceTime: string;
  timeZone: string;
}

export const defaultDateRangeRelativePresets: readonly DateRangeRelativePreset[] = [
  { id: "15m", shortLabel: "15m", label: "Past 15 Minutes", duration: { amount: 15, unit: "minute" } },
  { id: "30m", shortLabel: "30m", label: "Past 30 Minutes", duration: { amount: 30, unit: "minute" } },
  { id: "1h", shortLabel: "1h", label: "Past 1 Hour", duration: { amount: 1, unit: "hour" } },
  { id: "3h", shortLabel: "3h", label: "Past 3 Hours", duration: { amount: 3, unit: "hour" } },
  { id: "1d", shortLabel: "1d", label: "Past 24 Hours", duration: { amount: 1, unit: "day" } },
  { id: "2d", shortLabel: "2d", label: "Past 48 Hours", duration: { amount: 2, unit: "day" } },
  { id: "1w", shortLabel: "1w", label: "Past 1 Week", duration: { amount: 1, unit: "week" } },
];

/** Parse an unambiguous instant; local datetime strings are deliberately rejected. */
export function parseDateRangeInstant(value: string, field = "value"): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.exec(value);
  const parsed = Date.parse(value);
  const date = match && new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`);
  if (!match || !Number.isFinite(parsed) || !date || date.getUTCFullYear() !== Number(match[1]) || date.getUTCMonth() !== Number(match[2]) - 1 || date.getUTCDate() !== Number(match[3])) {
    throw new RangeError(`DateRangePicker ${field} must be an ISO instant with a UTC offset; received "${value}".`);
  }
  return parsed;
}

export function dateInTimeZone(instant: number, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(instant);
  const part = (type: string) => parts.find((entry) => entry.type === type)!.value;
  return `${part("year").padStart(4, "0")}-${part("month")}-${part("day")}`;
}

export function nextCalendarDay(date: string): string {
  const next = new Date(`${date}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
}

/** Earliest instant of a civil date, including dates whose midnight is skipped by DST. */
export function calendarDayBoundary(date: string, timeZone: string): string {
  const target = Date.parse(`${date}T00:00:00Z`);
  if (!Number.isFinite(target) || new Date(target).toISOString().slice(0, 10) !== date) {
    throw new RangeError(`DateRangePicker calendar date must be YYYY-MM-DD; received "${date}".`);
  }
  let low = target - 36 * 60 * 60 * 1000;
  let high = target + 36 * 60 * 60 * 1000;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (dateInTimeZone(middle, timeZone) < date) low = middle + 1;
    else high = middle;
  }
  return new Date(low).toISOString();
}

export function normalizeTimestampRange(value: DateRangeValue, min?: string, max?: string): DateRangeValue {
  const lower = min ? parseDateRangeInstant(min, "min") : -Infinity;
  const upper = max ? parseDateRangeInstant(max, "max") : Infinity;
  if (lower >= upper) throw new RangeError("DateRangePicker min must precede max in timestamp mode.");
  const clamp = (entry: string) => entry ? new Date(Math.min(upper, Math.max(lower, parseDateRangeInstant(entry)))).toISOString() : "";
  const from = clamp(value.from);
  const to = clamp(value.to);
  if (from && to && from > to) return { from: to, to: from };
  return { from, to };
}

/** Resolve a preset without imposing any application retention or query policy. */
export function resolveDateRangePreset(preset: DateRangeRelativePreset, context: DateRangePresetContext): DateRangeValue {
  const end = parseDateRangeInstant(context.referenceTime, "referenceTime");
  // Validate the zone even for elapsed durations, whose arithmetic does not depend on DST.
  dateInTimeZone(end, context.timeZone);
  if (preset.resolve) {
    const resolved = preset.resolve({ ...context, referenceTime: new Date(end).toISOString() });
    if (!resolved.from || !resolved.to || parseDateRangeInstant(resolved.from) >= parseDateRangeInstant(resolved.to)) {
      throw new RangeError(`DateRangePicker preset "${preset.id}" must resolve to a non-empty ascending range.`);
    }
    return normalizeTimestampRange(resolved);
  }
  const { amount, unit } = preset.duration;
  if (!Number.isFinite(amount) || amount <= 0) throw new RangeError(`DateRangePicker preset "${preset.id}" duration must be positive.`);
  const minutes = { minute: 1, hour: 60, day: 1440, week: 10080 }[unit];
  const start = end - amount * minutes * 60_000;
  if (!Number.isFinite(start) || start >= end) throw new RangeError(`DateRangePicker preset "${preset.id}" duration is invalid.`);
  return { from: new Date(start).toISOString(), to: new Date(end).toISOString() };
}
