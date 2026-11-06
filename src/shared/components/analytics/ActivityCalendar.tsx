"use client";

import { useEffect, useMemo, useRef } from "react";
import { CalendarHeatmap } from "@omniroute/ui-kit/calendar-heatmap";

const DAYS_SHOWN = 365;

function localDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function lastYearOfActivity(activityMap: Record<string, number> | undefined) {
  const today = new Date();
  return Array.from({ length: DAYS_SHOWN }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (DAYS_SHOWN - 1 - index));
    const key = localDateKey(date);
    // A day with no entry had no activity: 0, which the kit draws apart from "unavailable".
    return { date: key, value: activityMap?.[key] || 0 };
  });
}

interface ActivityCalendarProps {
  ariaLabel: string;
  /** Tokens per local day, keyed `YYYY-MM-DD`. */
  activityMap?: Record<string, number>;
  lessLabel: string;
  moreLabel: string;
  locale: string;
  valueFormatter: (value: number) => string;
}

/** The last 365 days of activity on the kit calendar, opened at today on narrow screens. */
export function ActivityCalendar({
  ariaLabel,
  activityMap,
  lessLabel,
  moreLabel,
  locale,
  valueFormatter,
}: ActivityCalendarProps) {
  const figureRef = useRef<HTMLElement>(null);
  const data = useMemo(() => lastYearOfActivity(activityMap), [activityMap]);

  useEffect(() => {
    const scroller = figureRef.current?.querySelector(".ci-calendar-heatmap__scroll");
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, [data]);

  return (
    <CalendarHeatmap
      ref={figureRef}
      ariaLabel={ariaLabel}
      data={data}
      locale={locale}
      lessLabel={lessLabel}
      moreLabel={moreLabel}
      valueFormatter={valueFormatter}
    />
  );
}
