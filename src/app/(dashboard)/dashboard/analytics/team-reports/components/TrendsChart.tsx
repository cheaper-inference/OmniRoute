"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartTheme } from "@omniroute/ui-kit/chart-theme";

import { formatMetric, type ReportTrendMetric } from "../reportViews";

export interface TrendChartSeries {
  name: string;
  /** A `var(--color-...)` token. */
  color: string;
  values: number[];
}

interface TrendsChartProps {
  /** Local days (YYYY-MM-DD); for weekly data, each week's Monday. */
  days: string[];
  series: TrendChartSeries[];
  metric: ReportTrendMetric;
}

/** "2026-03-09" as a short local date; the string is a calendar day, not an instant. */
export function formatDay(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  if (!year || !month || !date) return day;
  return new Date(year, month - 1, date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Stacked bars per day (or week): one segment per series, the "other" bucket last. */
export default function TrendsChart({ days, series, metric }: TrendsChartProps) {
  const data = days.map((day, index) => {
    const row: Record<string, number | string> = { day };
    series.forEach((entry, i) => {
      row[`s${i}`] = entry.values[index] ?? 0;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={chartTheme.margin} barCategoryGap="12%">
        <CartesianGrid {...chartTheme.grid} />
        <XAxis {...chartTheme.xAxis} dataKey="day" tickFormatter={formatDay} />
        <YAxis
          {...chartTheme.yAxis}
          width={56}
          tickFormatter={(value: number) => formatMetric(metric, value)}
        />
        <Tooltip
          cursor={{ fill: "var(--color-bg-subtle)", fillOpacity: 0.6 }}
          wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const rows = payload.filter((item) => Number(item.value) > 0).reverse();
            return (
              <div className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs">
                <p className="text-text-muted">{formatDay(String(label))}</p>
                {rows.map((item) => (
                  <p key={String(item.dataKey)} className="flex items-center gap-1.5 tabular-nums">
                    <span
                      aria-hidden="true"
                      className="inline-block size-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span>{item.name}</span>
                    <span className="ml-auto pl-3 font-mono">
                      {formatMetric(metric, Number(item.value))}
                    </span>
                  </p>
                ))}
              </div>
            );
          }}
        />
        {series.map((entry, index) => (
          <Bar
            key={`s${index}`}
            dataKey={`s${index}`}
            name={entry.name}
            stackId="trend"
            fill={entry.color}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
