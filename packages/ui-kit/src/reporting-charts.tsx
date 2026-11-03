"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Customized, DefaultTooltipContent, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ComponentProps, MutableRefObject, ReactNode } from "react";
import { cn } from "./lib/utils";
import { EmptyState } from "./empty-state";

export interface ChartSeries {
  /** Stable key used to read each datum's values. */
  key: string;
  label: string;
  icon?: ReactNode;
  color?: string;
}

export interface StackedBarDatum {
  /** Stable, unique identity, independent of the formatted label. */
  id: string;
  label: string;
  tooltipLabel?: string;
  hint?: string;
  /** Finite measurements, including signed deltas. Null, missing and invalid values are unavailable, never zero. */
  values: Readonly<Record<string, number | null | undefined>>;
}

export interface StackedBarChartProps extends Omit<ComponentProps<"figure">, "children" | "onSelect"> {
  ariaLabel: string;
  data: readonly StackedBarDatum[];
  series: readonly ChartSeries[];
  /** The caller supplies already aggregated data and owns any filtering/navigation. */
  onPointSelect?: (datum: StackedBarDatum, index: number) => void;
  selectedId?: string | null;
  valueFormatter?: (value: number) => string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  yTickCount?: number;
  allowDecimals?: boolean;
  totalLabel?: string;
  unavailableLabel?: string;
  emptyLabel?: string;
}

const formatNumber = (value: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
const measured = (value: number | null | undefined): value is number => typeof value === "number" && Number.isFinite(value);
const palette = ["var(--ci-chart-1)", "var(--ci-chart-2)", "var(--ci-chart-3)", "var(--ci-chart-4)", "var(--ci-chart-5)"];
const seriesColor = (series: ChartSeries, index: number) => series.color ?? palette[index % palette.length];
const tooltipStyle = { background: "var(--ci-color-surface)", border: "1px solid var(--ci-color-border)", borderRadius: 8, fontSize: 12 };

interface ChartPointZonesProps {
  offset?: { top: number; left: number; width: number; height: number };
  points: readonly StackedBarDatum[];
  ariaLabel: string;
  rovingId?: string | null;
  selectedId?: string | null;
  keyboardIndex?: number;
  tooltipId: string;
  zones: MutableRefObject<(SVGRectElement | null)[]>;
  selectable: boolean;
  describe: (datum: StackedBarDatum) => string;
  onPointSelect?: StackedBarChartProps["onPointSelect"];
  onFocused: (id: string | null) => void;
  onTooltip: (point: { index: number; x: number; y: number } | null) => void;
}
function ChartPointZones({ offset, points, ariaLabel, rovingId, selectedId, keyboardIndex, tooltipId, zones, selectable, describe, onPointSelect, onFocused, onTooltip }: ChartPointZonesProps) {
  if (!offset) return null;
  const slot = offset.width / points.length;
  return <g role="group" aria-label={`${ariaLabel} data points`}>{points.map((datum, index) => <rect key={datum.id} ref={node => { zones.current[index] = node; }}
    className="ci-stacked-chart__zone" data-selected={selectedId === datum.id || undefined}
    x={offset.left + index * slot} y={offset.top} width={slot} height={offset.height}
    role={selectable ? "button" : "img"} tabIndex={rovingId === datum.id ? 0 : -1}
    aria-label={describe(datum)} aria-pressed={selectable ? selectedId === datum.id : undefined}
    aria-describedby={keyboardIndex === index ? tooltipId : undefined}
    onFocus={() => { onFocused(datum.id); onTooltip({ index, x: Math.max(0, Math.min(offset.left + (index + .5) * slot + 10, offset.left + offset.width - 220)), y: offset.top + 12 }); }}
    onBlur={() => { onFocused(null); onTooltip(null); }} onPointerMove={() => onTooltip(null)} onClick={() => onPointSelect?.(datum, index)}
    onKeyDown={event => {
      const next = event.key === "ArrowRight" ? (index + 1) % points.length : event.key === "ArrowLeft" ? (index + points.length - 1) % points.length : event.key === "Home" ? 0 : event.key === "End" ? points.length - 1 : null;
      if (next !== null) { event.preventDefault(); zones.current[next]?.focus(); }
      if ((event.key === "Enter" || event.key === " ") && onPointSelect) { event.preventDefault(); onPointSelect(datum, index); }
      if (event.key === "Escape") { event.preventDefault(); onTooltip(null); }
    }} />)}</g>;
}

/** The approved preview's Recharts composition, with additive keyboard hit areas. */
export function StackedBarChart({
  ariaLabel, data, series, onPointSelect, selectedId, valueFormatter = formatNumber,
  height = 215, showLegend = true, showGrid = true, yTickCount = 5, allowDecimals = true,
  totalLabel = "Total", unavailableLabel = "Unavailable", emptyLabel,
  className, ...props
}: StackedBarChartProps) {
  const zones = useRef<(SVGRectElement | null)[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [keyboardTooltip, setKeyboardTooltip] = useState<{ index: number; x: number; y: number } | null>(null);
  const tooltipId = `ci-stacked-tooltip-${useId().replace(/:/g, "")}`;
  const rovingId = data.some(datum => datum.id === focusedId) ? focusedId : data.some(datum => datum.id === selectedId) ? selectedId : data[0]?.id;
  const safeData = useMemo(() => data.map(datum => ({ ...datum, values: Object.fromEntries(series.map(item => [item.key, measured(datum.values[item.key]) ? datum.values[item.key] : null])) })), [data, series]);
  const describe = (datum: StackedBarDatum) => {
    const values = series.map(item => datum.values[item.key]);
    const sum = values.every(measured) ? values.reduce<number>((total, value) => total + value!, 0) : null;
    return `${datum.tooltipLabel ?? datum.label}: ${series.map(item => `${item.label} ${measured(datum.values[item.key]) ? valueFormatter(datum.values[item.key]!) : unavailableLabel}`).join(", ")}. ${totalLabel} ${sum === null || !Number.isFinite(sum) ? unavailableLabel : valueFormatter(sum)}${datum.hint ? `. ${datum.hint}` : ""}`;
  };
  const focused = keyboardTooltip ? safeData[keyboardTooltip.index] : undefined;
  return <figure {...props} className={cn("ci-stacked-chart", className)} aria-label={ariaLabel}>
    {(!data.length || !series.length) && emptyLabel != null ? <EmptyState compact title={emptyLabel} /> : <>
      <div className="ci-stacked-chart__plot" style={{ height }}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={safeData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} stackOffset="sign">
            {showGrid && <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--ci-color-border)" />}
            <XAxis dataKey="label" tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={24} tick={{ fontSize: 11, fill: "var(--ci-color-text-muted)" }} />
            <YAxis width={48} tickLine={false} axisLine={false} tickCount={yTickCount} allowDecimals={allowDecimals} tickFormatter={valueFormatter} tick={{ fontSize: 11, fill: "var(--ci-color-text-muted)" }} />
            <Tooltip active={keyboardTooltip ? false : undefined} filterNull={false} cursor={false}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.tooltipLabel || label}
              content={properties => <DefaultTooltipContent {...properties} payload={properties.payload?.map(entry => ({ ...entry, value: entry.value ?? unavailableLabel }))} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} />}
              contentStyle={tooltipStyle} />
            {series.map((item, index) => <Bar key={item.key} dataKey={datum => datum.values[item.key]} name={item.label} stackId="usage" fill={seriesColor(item, index)} maxBarSize={32} isAnimationActive={false} />)}
            <Customized component={<ChartPointZones points={data} ariaLabel={ariaLabel} rovingId={rovingId} selectedId={selectedId} keyboardIndex={keyboardTooltip?.index} tooltipId={tooltipId} zones={zones} selectable={!!onPointSelect} describe={describe}
              onPointSelect={onPointSelect} onFocused={id => setFocusedId(id)} onTooltip={setKeyboardTooltip} />} />
          </BarChart>
        </ResponsiveContainer>
        {focused && keyboardTooltip && <div id={tooltipId} role="tooltip" className="ci-stacked-chart__keyboard-tooltip" style={{ left: keyboardTooltip.x, top: keyboardTooltip.y }}>
          <DefaultTooltipContent label={focused.tooltipLabel ?? focused.label} payload={series.map((item, index) => ({ graphicalItemId: item.key, name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index) }))} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} contentStyle={tooltipStyle} />
        </div>}
      </div>
      {showLegend && <figcaption className="ci-stacked-chart__legend">{series.map((item, index) => <span key={item.key}><i aria-hidden style={{ background: seriesColor(item, index) }} /><span className="ci-stacked-chart__series">{item.icon && <span aria-hidden>{item.icon}</span>}{item.label}</span></span>)}</figcaption>}
    </>}
  </figure>;
}

export interface SparklineProps extends Omit<ComponentProps<"div">, "children"> {
  /** Non-finite and null values make gaps instead of implying zero. */
  values: readonly (number | null)[];
  /** A label makes the sparkline informative; omit it for a decorative duplicate of nearby data. */
  ariaLabel?: string;
  color?: string;
}

export function Sparkline({ values, ariaLabel, color = "var(--ci-color-success)", className, style, ...props }: SparklineProps) {
  const gradientId = `ci-sparkline-${useId().replace(/:/g, "")}`;
  const hasMeasurements = values.some(value => value !== null && Number.isFinite(value));
  return <div className={cn("ci-sparkline", className)} role={ariaLabel ? "img" : undefined} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} style={{ color, ...style }} {...props}>
    {hasMeasurements && <ResponsiveContainer width="100%" height={52}>
      <AreaChart data={values.map(value => ({ value: value !== null && Number.isFinite(value) ? value : null }))} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={.25} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
        <YAxis hide domain={["dataMin * 0.9", "dataMax * 1.1"]} />
        <Area type="monotone" dataKey="value" stroke={color} fill={`url(#${gradientId})`} strokeWidth={2} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>}
  </div>;
}
