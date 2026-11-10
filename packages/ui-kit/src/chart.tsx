"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export interface ChartDatum {
  label: string;
  value: number;
  hint?: string;
  highlight?: boolean;
}

export type ChartVariant = "area" | "bar";
export type ChartTone = "accent" | "positive" | "ink";

export interface ChartProps extends Omit<ComponentProps<"figure">, "children"> {
  data: readonly ChartDatum[];
  variant?: ChartVariant;
  tone?: ChartTone;
  valueFormatter?: (value: number) => string;
  yTickCount?: number;
  xTickCount?: number;
  showGrid?: boolean;
  animate?: boolean;
  height?: number;
  ariaLabel: string;
}

const VIEWBOX_WIDTH = 720;
const PADDING = { top: 18, right: 18, bottom: 44, left: 58 };

function defaultFormatter(value: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
}

function niceExtent(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

function niceBounds(values: readonly number[]) {
  const finiteValues = values.filter(Number.isFinite);
  const rawMinimum = Math.min(0, ...(finiteValues.length ? finiteValues : [0]));
  const rawMaximum = Math.max(0, ...(finiteValues.length ? finiteValues : [0]));
  if (rawMinimum === rawMaximum) return { minimum: 0, maximum: 1 };
  const minimum = rawMinimum < 0 ? -niceExtent(Math.abs(rawMinimum)) : 0;
  const maximum = rawMaximum > 0 ? niceExtent(rawMaximum) : 0;
  return maximum === minimum ? { minimum, maximum: minimum + 1 } : { minimum, maximum };
}

export function Chart({
  className,
  data,
  variant = "area",
  tone = "accent",
  valueFormatter = defaultFormatter,
  yTickCount = 4,
  xTickCount = 6,
  showGrid = true,
  animate = true,
  height = 280,
  ariaLabel,
  ...props
}: ChartProps) {
  const figureRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(!animate);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradientId = `ci-chart-gradient-${useId().replace(/:/g, "")}`;
  const tooltipId = gradientId.replace("gradient", "tooltip");

  useEffect(() => {
    if (!animate) {
      setVisible(true);
      return;
    }

    const node = figureRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate, data]);

  const geometry = useMemo(() => {
    const safeData: readonly ChartDatum[] = data.length ? data : [{ label: "No data", value: 0 }];
    const chartHeight = Math.max(height, 180);
    const plotWidth = VIEWBOX_WIDTH - PADDING.left - PADDING.right;
    const plotHeight = chartHeight - PADDING.top - PADDING.bottom;
    const { minimum, maximum } = niceBounds(safeData.map((item) => item.value));
    const range = maximum - minimum;
    const yForValue = (next: number) => PADDING.top + ((maximum - next) / range) * plotHeight;
    const baseline = yForValue(0);
    const stepX = safeData.length > 1 ? plotWidth / (safeData.length - 1) : plotWidth / 2;
    const points = safeData.map((item, index) => ({
      ...item,
      x: safeData.length > 1 ? PADDING.left + index * stepX : PADDING.left + plotWidth / 2,
      y: yForValue(item.value),
    }));
    const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
    const lastPoint = points[points.length - 1];
    const areaPath = `${linePath} L${lastPoint?.x ?? PADDING.left},${baseline} L${points[0]?.x ?? PADDING.left},${baseline} Z`;
    const tickTotal = Math.max(yTickCount, 2);
    const ticks = Array.from({ length: tickTotal }, (_, index) => {
      const ratio = index / (tickTotal - 1);
      return { value: maximum - range * ratio, y: PADDING.top + plotHeight * ratio };
    });
    const labelEvery = Math.max(1, Math.ceil(safeData.length / Math.max(xTickCount, 1)));
    return { safeData, chartHeight, plotWidth, plotHeight, points, linePath, areaPath, ticks, labelEvery, baseline };
  }, [data, height, xTickCount, yTickCount]);

  const barSlot = geometry.plotWidth / geometry.safeData.length;
  const barWidth = Math.min(30, barSlot * 0.58);
  const baseline = geometry.baseline;
  const activePoint = activeIndex === null ? null : geometry.points[activeIndex];
  const activeX = activePoint
    ? variant === "bar"
      ? PADDING.left + activeIndex! * barSlot + barSlot / 2
      : activePoint.x
    : null;
  const tooltipAlignment = activeX === null ? "center" : activeX < 120 ? "start" : activeX > 600 ? "end" : "center";

  return (
    <figure
      ref={figureRef}
      className={cn("ci-chart", `ci-chart--${variant}`, `ci-chart--${tone}`, className)}
      data-visible={visible || undefined}
      data-animate={animate || undefined}
      aria-label={ariaLabel}
      {...props}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${geometry.chartHeight}`}
        role="group"
        aria-label={`${ariaLabel} interactive data points`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ci-chart-color)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--ci-chart-color)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {showGrid && geometry.ticks.map((tick) => (
          <g key={tick.y} className="ci-chart__grid-line">
            <line x1={PADDING.left} x2={VIEWBOX_WIDTH - PADDING.right} y1={tick.y} y2={tick.y} />
            <text x={PADDING.left - 10} y={tick.y + 4}>{valueFormatter(tick.value)}</text>
          </g>
        ))}

        {activePoint && activeX !== null ? (
          <line
            className="ci-chart__guide"
            x1={activeX}
            x2={activeX}
            y1={PADDING.top}
            y2={PADDING.top + geometry.plotHeight}
          />
        ) : null}

        {variant === "area" ? (
          <>
            <path className="ci-chart__area" d={geometry.areaPath} fill={`url(#${gradientId})`} />
            <path className="ci-chart__line" d={geometry.linePath} pathLength="1" />
            {geometry.points.map((point, index) => (
              <g
                key={point.label}
                className="ci-chart__point"
                data-active={activeIndex === index || undefined}
                transform={`translate(${point.x} ${point.y})`}
              >
                <title>{`${point.label}: ${valueFormatter(point.value)}${point.hint ? ` · ${point.hint}` : ""}`}</title>
                <circle r={point.highlight ? 5 : 3.5} data-highlight={point.highlight || undefined} />
              </g>
            ))}
          </>
        ) : geometry.points.map((point, index) => {
          const x = PADDING.left + index * barSlot + (barSlot - barWidth) / 2;
          const barHeight = Math.abs(baseline - point.y);
          const barY = Math.min(baseline, point.y);
          const sign = point.value < 0 ? "negative" : point.value > 0 ? "positive" : "zero";
          return (
            <g key={point.label} className="ci-chart__bar" data-active={activeIndex === index || undefined}>
              <title>{`${point.label}: ${valueFormatter(point.value)}${point.hint ? ` · ${point.hint}` : ""}`}</title>
              <rect
                x={x}
                y={barY}
                width={barWidth}
                height={barHeight}
                rx="2"
                data-sign={sign}
                data-highlight={point.highlight || undefined}
                style={{ animationDelay: `${index * 28}ms` }}
              />
            </g>
          );
        })}

        {geometry.points.map((point, index) => {
          const slotWidth = variant === "bar"
            ? barSlot
            : geometry.points.length > 1
              ? geometry.plotWidth / (geometry.points.length - 1)
              : geometry.plotWidth;
          const center = variant === "bar" ? PADDING.left + index * barSlot + barSlot / 2 : point.x;
          const x = Math.max(PADDING.left, center - slotWidth / 2);
          const width = Math.min(slotWidth, VIEWBOX_WIDTH - PADDING.right - x);
          const description = `${point.label}, ${valueFormatter(point.value)}${point.hint ? `, ${point.hint}` : ""}`;

          return (
            <rect
              key={`interaction-${point.label}`}
              className="ci-chart__interaction-zone"
              x={x}
              y={PADDING.top}
              width={Math.max(width, 1)}
              height={geometry.plotHeight}
              tabIndex={0}
              aria-label={description}
              aria-describedby={activeIndex === index ? tooltipId : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onPointerDown={() => setActiveIndex(index)}
            />
          );
        })}

        {geometry.points.map((point, index) => (
          index % geometry.labelEvery === 0 || index === geometry.points.length - 1 ? (
            <text
              key={point.label}
              className="ci-chart__x-label"
              data-numeric={/^[+\-−]?\p{N}[\p{N}\p{P}\p{Z}]*$/u.test(point.label.trim()) || undefined}
              x={variant === "bar" ? PADDING.left + index * barSlot + barSlot / 2 : point.x}
              y={PADDING.top + geometry.plotHeight + 26}
            >
              {point.label}
            </text>
          ) : null
        ))}
      </svg>
      {activePoint && activeX !== null ? (
        <div
          id={tooltipId}
          role="tooltip"
          className="ci-chart__tooltip"
          data-align={tooltipAlignment}
          style={{
            left: `${(activeX / VIEWBOX_WIDTH) * 100}%`,
            top: `${(activePoint.y / geometry.chartHeight) * 100}%`,
          }}
        >
          <span>{activePoint.label}</span>
          <strong>{valueFormatter(activePoint.value)}</strong>
          {activePoint.hint ? <small>{activePoint.hint}</small> : null}
        </div>
      ) : null}
      <table className="ci-sr-only" aria-hidden="true">
        <caption>{ariaLabel}</caption>
        <thead><tr><th>Label</th><th>Value</th></tr></thead>
        <tbody>{data.map((item) => <tr key={item.label}><td>{item.label}</td><td>{valueFormatter(item.value)}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}
