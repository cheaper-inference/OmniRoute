export type TrendRange = "1d" | "7d" | "30d" | "90d" | "ytd" | "all" | "custom";

export interface TrendWindow {
  startDate: string;
  endDate: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const FIXED_DAYS: Partial<Record<TrendRange, number>> = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 };

/**
 * The window of equal length that ends where the selected range starts.
 * `all` has nothing before it; an invalid custom range or a reversed one has no window.
 */
export function previousWindow(
  range: TrendRange,
  custom: { start: string; end: string },
  now: Date = new Date()
): TrendWindow | null {
  let start: Date;
  let end: Date;

  if (range === "all") return null;

  if (range === "custom") {
    start = new Date(custom.start);
    end = new Date(custom.end);
  } else if (range === "ytd") {
    end = new Date(now);
    start = new Date(now);
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
  } else {
    const days = FIXED_DAYS[range];
    if (!days) return null;
    end = new Date(now);
    start = new Date(now.getTime() - days * DAY_MS);
  }

  const length = end.getTime() - start.getTime();
  if (!Number.isFinite(length) || length <= 0) return null;

  return {
    startDate: new Date(start.getTime() - length).toISOString(),
    endDate: start.toISOString(),
  };
}

/** Percent change from `previous` to `current`, or null when there is no baseline to compare. */
export function percentChange(current: number, previous: number): number | null {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

/** "+12%", "-3%", "0%"; one decimal below 10% so small changes do not all read as 0%. */
export function formatPercentChange(change: number): string {
  const abs = Math.abs(change);
  const digits = abs < 10 ? 1 : 0;
  const rounded = Number(change.toFixed(digits));
  if (rounded === 0) return "0%";
  return `${rounded > 0 ? "+" : "-"}${Math.abs(rounded).toFixed(digits)}%`;
}
