"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { chartTheme } from "@omniroute/ui-kit/chart-theme";

import { formatDateTime, formatLatency } from "./format";

export interface TimelinePoint {
  /** Epoch milliseconds. */
  t: number;
  latencyMs: number;
  ok: boolean;
  model: string;
}

export interface TimelineSeries {
  name: string;
  /** A `var(--color-chart-N)` token. */
  color: string;
  points: TimelinePoint[];
}

interface MarkerProps {
  cx?: number;
  cy?: number;
  payload?: TimelinePoint;
}

const CROSS = 4;

/** A dot in the model's colour; a failed request is a cross in the error colour. */
function marker(color: string) {
  return function Marker({ cx = 0, cy = 0, payload }: MarkerProps) {
    if (payload && !payload.ok) {
      return (
        <path
          d={`M${cx - CROSS},${cy - CROSS}L${cx + CROSS},${cy + CROSS}M${cx - CROSS},${cy + CROSS}L${cx + CROSS},${cy - CROSS}`}
          stroke="var(--color-error)"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          data-failed="true"
        />
      );
    }
    return <circle cx={cx} cy={cy} r={3} fill={color} fillOpacity={0.85} data-ok="true" />;
  };
}

export default function SessionTimelineChart({ series }: { series: TimelineSeries[] }) {
  const t = useTranslations("reports");
  const times = series.flatMap((entry) => entry.points.map((point) => point.t));
  const spansDays = Math.max(...times) - Math.min(...times) > 24 * 60 * 60 * 1000;
  const tick = (value: number) =>
    new Date(value).toLocaleString(
      undefined,
      spansDays ? { month: "short", day: "numeric", hour: "numeric" } : { timeStyle: "short" }
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={chartTheme.margin}>
        <CartesianGrid {...chartTheme.grid} />
        <XAxis
          {...chartTheme.xAxis}
          type="number"
          dataKey="t"
          scale="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={tick}
        />
        <YAxis
          {...chartTheme.yAxis}
          type="number"
          dataKey="latencyMs"
          width={56}
          tickFormatter={(value: number) => (value === 0 ? "0" : formatLatency(value))}
        />
        <Tooltip
          cursor={chartTheme.tooltip.cursor}
          wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
          content={({ active, payload }) => {
            const point = payload?.[0]?.payload as TimelinePoint | undefined;
            if (!active || !point) return null;
            return (
              <div className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs">
                <p className="text-text-muted">{formatDateTime(new Date(point.t).toISOString())}</p>
                <p className="font-mono">{point.model}</p>
                <p className="tabular-nums">
                  {t("colLatency")}: {formatLatency(point.latencyMs)}
                </p>
                {!point.ok && <p className="text-error">{t("timelineFailedRequest")}</p>}
              </div>
            );
          }}
        />
        {series.map((entry) => (
          <Scatter
            key={entry.name}
            name={entry.name}
            data={entry.points}
            fill={entry.color}
            shape={marker(entry.color)}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
