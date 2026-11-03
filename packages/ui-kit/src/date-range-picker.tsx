"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { ComponentProps } from "react";
import {
  DayButton as DayPickerDayButton,
  DayPicker,
  Month as DayPickerMonth,
  type ChevronProps,
  type DateRange,
  type DayButtonProps,
  type MonthProps,
} from "react-day-picker";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Button, type ButtonSize } from "./button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "./lib/utils";

export interface DateRangeValue { from: string; to: string; }
export type DateRangePickerVariant = "default" | "capsule";
export type DateRangePreset = "today" | "yesterday" | "week" | "7days" | "28days" | "month" | "lastMonth" | "year";

export interface DateRangePickerProps extends Omit<ComponentProps<"button">, "value" | "defaultValue" | "onChange"> {
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onValueChange?: (value: DateRangeValue) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  numberOfMonths?: 1 | 2 | "responsive";
  /**
   * Authoritative local calendar date, formatted as YYYY-MM-DD, used for
   * relative presets, the initial empty month, and calendar "today" semantics.
   * Defaults to the user's current local date when omitted.
   */
  referenceDate?: string;
  /** Identifies the preset represented by the committed value when ranges overlap. */
  valuePreset?: DateRangePreset;
  /** Visual treatment for the trigger; capsule is a compact 36px opt-in control. */
  variant?: DateRangePickerVariant;
  /** Overrides the trigger height without changing the calendar popover. */
  triggerSize?: ButtonSize;
}

function parseIso(value: string) { return new Date(`${value}T00:00:00`); }
function toIso(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function startOfDay(date: Date) { const next = new Date(date); next.setHours(0, 0, 0, 0); return next; }
function addDays(date: Date, days: number) { const next = new Date(date); next.setDate(next.getDate() + days); return next; }
function startOfMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function parseReferenceDate(value: string) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = parseIso(value);
  const isValid = parts
    && !Number.isNaN(date.getTime())
    && date.getFullYear() === Number(parts[1])
    && date.getMonth() === Number(parts[2]) - 1
    && date.getDate() === Number(parts[3]);
  if (!isValid) {
    throw new RangeError(`DateRangePicker referenceDate must be a valid YYYY-MM-DD date; received "${value}".`);
  }
  return startOfDay(date);
}
function monthForValue(value: DateRangeValue, referenceDate = new Date()) {
  const initial = value.from || value.to;
  return initial ? startOfMonth(parseIso(initial)) : startOfMonth(referenceDate);
}
function clampIso(value: string, min?: string, max?: string) { return min && value < min ? min : max && value > max ? max : value; }
function normalizeRange(value: DateRangeValue, min?: string, max?: string): DateRangeValue {
  const from = value.from ? clampIso(value.from, min, max) : "";
  const to = value.to ? clampIso(value.to, min, max) : "";
  return from && to && to < from ? { from: to, to: from } : { from, to };
}
function selectDay(value: DateRangeValue, iso: string): DateRangeValue {
  if (!value.from || value.to) return { from: iso, to: "" };
  return iso < value.from ? { from: iso, to: value.from } : { from: value.from, to: iso };
}
function toCalendarRange(value: DateRangeValue): DateRange | undefined {
  if (!value.from) return undefined;
  return { from: parseIso(value.from), to: value.to ? parseIso(value.to) : undefined };
}

const compactQuery = "(max-width: 42rem)";
function getCompactSnapshot() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(compactQuery).matches
    : false;
}
function subscribeToCompactChange(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => undefined;
  const media = window.matchMedia(compactQuery);
  media.addEventListener?.("change", onChange);
  return () => media.removeEventListener?.("change", onChange);
}

const presetLabels: Array<[DateRangePreset, string]> = [["today", "Today"], ["yesterday", "Yesterday"], ["week", "This Week"], ["7days", "Last 7 Days"], ["28days", "Last 28 Days"], ["month", "This Month"], ["lastMonth", "Last Month"], ["year", "This Year"]];

function presetRange(preset: DateRangePreset, weekStartsOn: number, now = startOfDay(new Date())): DateRangeValue {
  if (preset === "today") return { from: toIso(now), to: toIso(now) };
  if (preset === "yesterday") { const date = addDays(now, -1); return { from: toIso(date), to: toIso(date) }; }
  if (preset === "7days") return { from: toIso(addDays(now, -6)), to: toIso(now) };
  if (preset === "28days") return { from: toIso(addDays(now, -27)), to: toIso(now) };
  if (preset === "week") { const offset = (now.getDay() - weekStartsOn + 7) % 7; return { from: toIso(addDays(now, -offset)), to: toIso(now) }; }
  if (preset === "month") return { from: toIso(new Date(now.getFullYear(), now.getMonth(), 1)), to: toIso(now) };
  if (preset === "lastMonth") return { from: toIso(new Date(now.getFullYear(), now.getMonth() - 1, 1)), to: toIso(new Date(now.getFullYear(), now.getMonth(), 0)) };
  return { from: toIso(new Date(now.getFullYear(), 0, 1)), to: toIso(now) };
}

function matchingPreset(
  value: DateRangeValue,
  weekStartsOn: number,
  min?: string,
  max?: string,
  referenceDate?: Date,
): DateRangePreset | undefined {
  if (!value.from || !value.to) return undefined;
  return presetLabels.find(([preset]) => {
    const candidate = normalizeRange(presetRange(preset, weekStartsOn, referenceDate), min, max);
    return candidate.from === value.from && candidate.to === value.to;
  })?.[0];
}

function CalendarDayButton({ day, modifiers, ...props }: DayButtonProps) {
  const endpoint = Boolean(modifiers.range_start || modifiers.range_end || (modifiers.selected && !modifiers.range_middle));
  return (
    <DayPickerDayButton
      day={day}
      modifiers={modifiers}
      {...props}
      aria-current={modifiers.today ? "date" : undefined}
      data-ci-calendar-day={toIso(day.date)}
      data-endpoint={endpoint || undefined}
      data-in-range={modifiers.range_middle || undefined}
      data-outside={modifiers.outside || undefined}
    />
  );
}

function CalendarMonth({ displayIndex, ...props }: MonthProps) {
  return <DayPickerMonth displayIndex={displayIndex} {...props} data-secondary={displayIndex > 0 || undefined} />;
}

function CalendarChevron({ orientation = "left", className, size, style }: ChevronProps) {
  const Icon = orientation === "right"
    ? ChevronRight
    : orientation === "up"
      ? ChevronUp
      : orientation === "down"
        ? ChevronDown
        : ChevronLeft;

  return <Icon aria-hidden="true" className={className} size={size} style={style} />;
}

const calendarClassNames = {
  root: "ci-range-calendar-picker",
  chevron: "ci-range-calendar__chevron",
  months: "ci-range-calendar__months",
  month: "ci-range-calendar",
  nav: "ci-range-calendar__nav",
  button_previous: "ci-range-calendar__previous",
  button_next: "ci-range-calendar__next",
  month_caption: "ci-range-calendar__caption",
  caption_label: "ci-range-calendar__month",
  month_grid: "ci-range-calendar__grid",
  weekdays: "ci-range-calendar__weekdays",
  weekday: "ci-range-calendar__weekday",
  weeks: "ci-range-calendar__weeks",
  week: "ci-range-calendar__week",
  day: "ci-range-calendar__day",
  day_button: "ci-range-calendar__day-button",
  outside: "ci-range-calendar__day--outside",
  disabled: "ci-range-calendar__day--disabled",
  hidden: "ci-range-calendar__day--hidden",
  focused: "ci-range-calendar__day--focused",
  today: "ci-range-calendar__day--today",
  selected: "ci-range-calendar__day--selected",
  range_start: "ci-range-calendar__day--range-start",
  range_middle: "ci-range-calendar__day--range-middle",
  range_end: "ci-range-calendar__day--range-end",
} as const;

export function DateRangePicker({
  className,
  value: controlled,
  defaultValue = { from: "", to: "" },
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  min,
  max,
  placeholder = "Select date range",
  locale,
  weekStartsOn = 0,
  numberOfMonths = "responsive",
  referenceDate,
  valuePreset,
  variant = "default",
  triggerSize: triggerSizeProp,
  ...props
}: DateRangePickerProps) {
  const referenceDateIso = referenceDate ?? toIso(startOfDay(new Date()));
  const referenceDateValue = useMemo(
    () => parseReferenceDate(referenceDateIso),
    [referenceDateIso],
  );
  const [uncontrolled, setUncontrolled] = useState(() => normalizeRange(defaultValue, min, max));
  const value = normalizeRange(controlled ?? uncontrolled, min, max);
  const committedPreset = valuePreset ?? matchingPreset(value, weekStartsOn, min, max, referenceDateValue);
  const [draft, setDraft] = useState(value);
  const [activePreset, setActivePreset] = useState<DateRangePreset | undefined>(committedPreset);
  const [month, setMonth] = useState(() => monthForValue(value, referenceDateValue));
  const isCompact = useSyncExternalStore(subscribeToCompactChange, getCompactSnapshot, () => false);

  useEffect(() => {
    setDraft(value);
    setMonth(monthForValue(value, referenceDateValue));
    setActivePreset(committedPreset);
  }, [committedPreset, referenceDateIso, value.from, value.to]);

  const resolvedLocale = useMemo(() => new Intl.DateTimeFormat(locale).resolvedOptions().locale, [locale]);
  const mediumDate = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: "medium" }), [locale]);
  const fullDate = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: "full" }), [locale]);
  const monthYear = useMemo(() => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }), [locale]);
  const weekdayShort = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: "short" }), [locale]);
  const weekdayLong = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: "long" }), [locale]);
  const dayNumber = useMemo(() => new Intl.DateTimeFormat(locale, { day: "numeric" }), [locale]);

  const label = value.from && value.to
    ? `${mediumDate.format(parseIso(value.from))} – ${mediumDate.format(parseIso(value.to))}`
    : placeholder;
  const update = (next: DateRangeValue) => {
    const normalized = normalizeRange(next, min, max);
    if (controlled === undefined) setUncontrolled(normalized);
    onValueChange?.(normalized);
  };
  const visibleMonths = numberOfMonths === 2 || (numberOfMonths === "responsive" && !isCompact) ? 2 : 1;
  const disabledDates = useMemo(() => {
    const matchers = [];
    if (min) matchers.push({ before: parseIso(min) });
    if (max) matchers.push({ after: parseIso(max) });
    return matchers;
  }, [max, min]);
  const selected = useMemo(() => toCalendarRange(draft), [draft.from, draft.to]);
  const selectionStatus = draft.from
    ? draft.to
      ? `Selected ${fullDate.format(parseIso(draft.from))} through ${fullDate.format(parseIso(draft.to))}.`
      : `${fullDate.format(parseIso(draft.from))} selected as the start date. Choose an end date.`
    : "Choose a start date.";
  const triggerSize = triggerSizeProp ?? (variant === "capsule" ? "sm" : "default");

  return (
    <Popover open={open} defaultOpen={defaultOpen} onOpenChange={(nextOpen) => {
      if (nextOpen) {
        setDraft(value);
        setMonth(monthForValue(value, referenceDateValue));
        setActivePreset(committedPreset);
      }
      onOpenChange?.(nextOpen);
    }}>
      <PopoverTrigger asChild><Button variant="outline" size={triggerSize} data-trigger-variant={variant} className={cn("ci-date-range-trigger", className)} {...props}><CalendarDays aria-hidden="true" /><span>{label}</span></Button></PopoverTrigger>
      <PopoverContent className="ci-date-range-popover" align="end" aria-label="Choose date range">
        <div className="ci-date-range-presets">
          {presetLabels.map(([preset, text]) => <button type="button" key={preset} aria-pressed={activePreset === preset} data-active={activePreset === preset || undefined} onClick={() => {
            const next = normalizeRange(presetRange(preset, weekStartsOn, referenceDateValue), min, max);
            setActivePreset(preset);
            setDraft(next);
            setMonth(monthForValue(next, referenceDateValue));
          }}>{text}</button>)}
        </div>
        <div className="ci-range-calendars" data-months={numberOfMonths}>
          <DayPicker
            aria-label="Date range calendar"
            classNames={calendarClassNames}
            components={{ Chevron: CalendarChevron, DayButton: CalendarDayButton, Month: CalendarMonth }}
            disabled={disabledDates}
            endMonth={max ? startOfMonth(parseIso(max)) : undefined}
            fixedWeeks
            footer={selectionStatus}
            formatters={{
              formatCaption: (date) => monthYear.format(date),
              formatDay: (date) => dayNumber.format(date),
              formatWeekdayName: (date) => weekdayShort.format(date),
            }}
            labels={{
              labelDayButton: (date, modifiers) => `${fullDate.format(date)}${modifiers.today ? ", today" : ""}${modifiers.range_start ? ", range start" : ""}${modifiers.range_middle ? ", in selected range" : ""}${modifiers.range_end ? ", range end" : ""}${modifiers.selected && !modifiers.range_start && !modifiers.range_middle && !modifiers.range_end ? ", selected" : ""}`,
              labelGrid: (date) => monthYear.format(date),
              labelNav: () => "Calendar navigation",
              labelNext: () => "Next month",
              labelPrevious: () => "Previous month",
              labelWeekday: (date) => weekdayLong.format(date),
            }}
            lang={resolvedLocale}
            mode="range"
            month={month}
            numberOfMonths={visibleMonths}
            onMonthChange={setMonth}
            onSelect={(_next, triggerDate) => { setActivePreset(undefined); setDraft(selectDay(draft, toIso(triggerDate))); }}
            selected={selected}
            showOutsideDays
            startMonth={min ? startOfMonth(parseIso(min)) : undefined}
            today={referenceDateValue}
            weekStartsOn={weekStartsOn}
          />
        </div>
        <div className="ci-date-range-popover__actions">
          <PopoverClose asChild><button type="button" onClick={() => { setActivePreset(undefined); setDraft({ from: "", to: "" }); update({ from: "", to: "" }); }}>Clear</button></PopoverClose>
          <PopoverClose asChild><Button size="sm" onClick={() => update(draft)} disabled={!draft.from || !draft.to}>Apply range</Button></PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
