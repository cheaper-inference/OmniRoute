import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn } from "./lib/utils";
import { ciChartSeriesOrder, type CiChartSlot } from "./tokens";

export type LegendMarkerShape = "dot" | "square" | "diamond";
export type LegendMarkerSize = "sm" | "md";
export const legendMarkerShapes = ["dot", "square", "diamond"] as const satisfies readonly LegendMarkerShape[];

export interface LegendMarkerProps extends Omit<ComponentProps<"span">, "color" | "children"> {
  /** Any CSS colour. Defaults to the first chart token; prefer `chartSeries(index).color`. */
  color?: string;
  /** Secondary encoding for series that share a colour. Defaults to "dot". */
  shape?: LegendMarkerShape;
  /** `sm` is an 8px marker (default); `md` is 10px. */
  size?: LegendMarkerSize;
  /** Visible text. Without it the marker is decorative unless `aria-label` is passed. */
  label?: ReactNode;
}

export function LegendMarker({
  color = "var(--ci-chart-1)",
  shape = "dot",
  size = "sm",
  label,
  className,
  style,
  ...props
}: LegendMarkerProps) {
  const standalone = label === undefined || label === null || label === false;
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  return (
    <span
      role={standalone && named ? "img" : undefined}
      aria-hidden={standalone && !named ? true : undefined}
      {...props}
      className={cn("ci-legend-marker", className)}
      data-size={size}
      style={{ "--ci-legend-marker-color": color, ...style } as CSSProperties}
    >
      <span aria-hidden="true" className="ci-legend-marker__swatch" data-shape={shape} />
      {standalone ? null : <span className="ci-legend-marker__label">{label}</span>}
    </span>
  );
}

// Spelled out so scripts/check-tokens.mjs can verify every chart reference.
const chartSeriesColors = {
  1: "var(--ci-chart-1)",
  2: "var(--ci-chart-2)",
  3: "var(--ci-chart-3)",
  4: "var(--ci-chart-4)",
  5: "var(--ci-chart-5)",
  6: "var(--ci-chart-6)",
  7: "var(--ci-chart-7)",
  8: "var(--ci-chart-8)",
} as const satisfies Record<CiChartSlot, string>;

export interface ChartSeriesStyle {
  token: CiChartSlot;
  color: (typeof chartSeriesColors)[CiChartSlot];
  shape: LegendMarkerShape;
}

/**
 * Colour and marker shape for the zero-based `index`-th series. Colours follow
 * ciChartSeriesOrder and the shape moves dot → square → diamond every eight
 * series, so the pattern repeats every 24 and series 0–7 all use the dot.
 * Non-finite or negative indexes map to series 0; fractional ones are floored.
 */
export function chartSeries(index: number): ChartSeriesStyle {
  const position = Number.isFinite(index) && index > 0 ? Math.floor(index) : 0;
  const token = ciChartSeriesOrder[position % ciChartSeriesOrder.length];
  const shape = legendMarkerShapes[Math.floor(position / ciChartSeriesOrder.length) % legendMarkerShapes.length];
  return { token, color: chartSeriesColors[token], shape };
}
