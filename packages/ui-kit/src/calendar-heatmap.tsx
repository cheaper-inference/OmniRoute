"use client";

import { useMemo, useRef, useState } from "react";
import type { ComponentProps, CSSProperties, KeyboardEvent } from "react";
import { EmptyState } from "./empty-state";
import { cn } from "./lib/utils";

export interface CalendarHeatmapDatum {
  /** Calendar day as `YYYY-MM-DD`, read without a timezone. Invalid dates are ignored. */
  date: string;
  /** Null and non-finite values are unavailable, never zero. */
  value: number | null;
  hint?: string;
}

export interface CalendarHeatmapProps extends Omit<ComponentProps<"figure">, "children"> {
  ariaLabel: string;
  data: readonly CalendarHeatmapDatum[];
  /** First and last day shown, as `YYYY-MM-DD`. Default to the earliest and latest date in `data`. */
  startDate?: string;
  endDate?: string;
  /** 0 is Sunday. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Six ascending lower bounds for levels 2 to 7. Defaults to even steps up to the highest value. */
  thresholds?: readonly number[];
  /** Locale for the default month, weekday and date text. */
  locale?: string;
  /** Seven names, starting on Sunday. Default to the locale's short names. */
  weekdayLabels?: readonly string[];
  /** Twelve names, starting in January. Default to the locale's short names. */
  monthLabels?: readonly string[];
  formatDate?: (date: string) => string;
  valueFormatter?: (value: number) => string;
  lessLabel?: string;
  moreLabel?: string;
  unavailableLabel?: string;
  emptyLabel?: string;
}

interface CalendarDay {
  date: string;
  time: number;
  value: number | null;
  hint?: string;
  level: number;
}

const DAY = 86_400_000;
const LEVELS = [0, 1, 2, 3, 4, 5, 6, 7];
const SUNDAY = Date.UTC(2023, 0, 1);

function dayTime(date: string | undefined) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const time = Date.parse(`${date}T00:00:00Z`);
  // Date.parse rolls 2026-02-31 forward, so the round trip is what rejects it.
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === date ? time : null;
}

function levelFor(value: number | null, maximum: number, thresholds?: readonly number[]) {
  if (value === null || value <= 0) return 0;
  if (thresholds) return Math.min(7, 1 + thresholds.filter(bound => value >= bound).length);
  return Math.max(1, Math.min(7, Math.ceil((value / maximum) * 7)));
}

function buildDays(data: readonly CalendarHeatmapDatum[], startDate?: string, endDate?: string, thresholds?: readonly number[]) {
  const valid = data.flatMap(datum => {
    const time = dayTime(datum.date);
    return time === null ? [] : [{ ...datum, time, value: typeof datum.value === "number" && Number.isFinite(datum.value) ? datum.value : null }];
  });
  const start = dayTime(startDate) ?? (valid.length ? Math.min(...valid.map(datum => datum.time)) : null);
  const end = dayTime(endDate) ?? (valid.length ? Math.max(...valid.map(datum => datum.time)) : null);
  if (start === null || end === null || start > end) return [];
  const byTime = new Map(valid.filter(datum => datum.time >= start && datum.time <= end).map(datum => [datum.time, datum]));
  const maximum = Math.max(0, ...[...byTime.values()].map(datum => datum.value ?? 0));
  return Array.from({ length: (end - start) / DAY + 1 }, (_, index): CalendarDay => {
    const time = start + index * DAY;
    const datum = byTime.get(time);
    const value = datum?.value ?? null;
    return { date: new Date(time).toISOString().slice(0, 10), time, value, hint: datum?.hint, level: levelFor(value, maximum, thresholds) };
  });
}

function Mark({ day }: { day: CalendarDay }) {
  return <span aria-hidden className="ci-calendar-heatmap__mark" data-level={day.value === null ? undefined : day.level} data-unavailable={day.value === null || undefined} />;
}

/** Activity calendar on the `--ci-scale-seq` ramp. Mark size repeats the level, so it never depends on colour alone. */
export function CalendarHeatmap({
  ariaLabel, data, startDate, endDate, weekStartsOn = 0, thresholds, locale, weekdayLabels, monthLabels, formatDate, valueFormatter,
  lessLabel = "Less", moreLabel = "More", unavailableLabel = "Unavailable", emptyLabel, className, ...props
}: CalendarHeatmapProps) {
  const cells = useRef<(HTMLTableCellElement | null)[]>([]);
  const [rovingDate, setRovingDate] = useState<string | null>(null);
  const [active, setActive] = useState<{ date: string; x: number; y: number } | null>(null);
  const days = useMemo(() => buildDays(data, startDate, endDate, thresholds), [data, startDate, endDate, thresholds]);

  const dateText = (day: CalendarDay) => formatDate?.(day.date) ?? new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(day.time);
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const valueText = (day: CalendarDay) => day.value === null ? unavailableLabel : (valueFormatter ?? number.format)(day.value);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const month = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" });
  const weekdayText = (index: number) => weekdayLabels?.[index] ?? weekday.format(SUNDAY + index * DAY);
  const monthText = (index: number) => monthLabels?.[index] ?? month.format(Date.UTC(2023, index, 1));

  const lead = days.length ? (new Date(days[0].time).getUTCDay() - weekStartsOn + 7) % 7 : 0;
  const weeks = Math.ceil((lead + days.length) / 7);
  const months: { key: string; month: number; span: number }[] = [];
  for (let week = 0; week < weeks; week += 1) {
    const first = new Date(days[Math.max(0, week * 7 - lead)].time);
    const runKey = `${first.getUTCFullYear()}-${first.getUTCMonth()}`;
    const run = months[months.length - 1];
    if (run?.key === runKey) run.span += 1;
    else months.push({ key: runKey, month: first.getUTCMonth(), span: 1 });
  }

  const rovingIndex = Math.max(0, days.findIndex(day => day.date === rovingDate));
  const activeDay = days.find(day => day.date === active?.date);
  const show = (day: CalendarDay, cell: HTMLElement) => {
    const origin = cell.closest("figure")?.getBoundingClientRect();
    const box = cell.getBoundingClientRect();
    setActive({ date: day.date, x: box.left + box.width / 2 - (origin?.left ?? 0), y: box.top - (origin?.top ?? 0) });
  };
  const move = (event: KeyboardEvent<HTMLTableCellElement>, index: number) => {
    const forward = getComputedStyle(event.currentTarget).direction === "rtl" ? -7 : 7;
    const steps: Record<string, number> = { ArrowRight: index + forward, ArrowLeft: index - forward, ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: days.length - 1 };
    if (event.key === "Escape") { event.preventDefault(); setActive(null); }
    if (event.altKey || event.ctrlKey || event.metaKey || !(event.key in steps)) return;
    event.preventDefault();
    cells.current[steps[event.key]]?.focus();
  };

  const hasUnavailable = days.some(day => day.value === null);
  return <figure {...props} className={cn("ci-calendar-heatmap", className)} aria-label={ariaLabel}>
    {!days.length ? emptyLabel != null && <EmptyState compact title={emptyLabel} /> : <>
      <div className="ci-calendar-heatmap__scroll">
        <table role="grid" aria-label={ariaLabel} className="ci-calendar-heatmap__grid">
          <thead><tr><td />{months.map(run => run.span > 1 ? <th key={run.key} scope="col" colSpan={run.span}>{monthText(run.month)}</th> : <td key={run.key} />)}</tr></thead>
          <tbody>{Array.from({ length: 7 }, (_, row) => <tr key={row}>
            <th scope="row">{weekdayText((row + weekStartsOn) % 7)}</th>
            {Array.from({ length: weeks }, (_, week) => {
              const index = week * 7 + row - lead;
              const day = days[index];
              if (!day) return <td key={week} />;
              return <td key={week} ref={node => { cells.current[index] = node; }} className="ci-calendar-heatmap__day" role="gridcell" tabIndex={index === rovingIndex ? 0 : -1}
                aria-label={`${dateText(day)}: ${valueText(day)}${day.hint ? `. ${day.hint}` : ""}`}
                onFocus={event => { setRovingDate(day.date); show(day, event.currentTarget); }} onBlur={() => setActive(null)}
                onPointerEnter={event => show(day, event.currentTarget)} onPointerLeave={() => setActive(null)} onPointerDown={event => show(day, event.currentTarget)}
                onKeyDown={event => move(event, index)}><Mark day={day} /></td>;
            })}
          </tr>)}</tbody>
        </table>
      </div>
      {activeDay && active && <div role="tooltip" className="ci-calendar-heatmap__tooltip" style={{ "--ci-calendar-heatmap-x": `${active.x}px`, "--ci-calendar-heatmap-y": `${active.y}px` } as CSSProperties}>
        <span>{dateText(activeDay)}</span>
        <strong>{valueText(activeDay)}</strong>
        {activeDay.hint && <small>{activeDay.hint}</small>}
      </div>}
      <figcaption className="ci-calendar-heatmap__legend">
        <span className="ci-calendar-heatmap__key">{lessLabel}{LEVELS.map(level => <span key={level} className="ci-calendar-heatmap__key-swatch"><span aria-hidden className="ci-calendar-heatmap__mark" data-level={level} /></span>)}{moreLabel}</span>
        {hasUnavailable && <span className="ci-calendar-heatmap__key"><span className="ci-calendar-heatmap__key-swatch"><span aria-hidden className="ci-calendar-heatmap__mark" data-unavailable /></span>{unavailableLabel}</span>}
      </figcaption>
    </>}
  </figure>;
}
