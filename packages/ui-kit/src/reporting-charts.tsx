"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Customized, DefaultTooltipContent, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, usePlotArea } from "recharts";
import type { ComponentProps, CSSProperties, MutableRefObject, ReactNode } from "react";
import { chartTheme } from "./chart-theme";
import { cn } from "./lib/utils";
import { EmptyState } from "./empty-state";
import { chartSeries, LegendMarker, type LegendMarkerShape } from "./legend-marker";

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
const tooltipStyle = chartTheme.tooltip.contentStyle;

interface ChartPointZonesProps {
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
function ChartPointZones({ points, ariaLabel, rovingId, selectedId, keyboardIndex, tooltipId, zones, selectable, describe, onPointSelect, onFocused, onTooltip }: ChartPointZonesProps) {
  const plotArea = usePlotArea();
  if (!plotArea) return null;
  const offset = { top: plotArea.y, left: plotArea.x, width: plotArea.width, height: plotArea.height };
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
          <BarChart data={safeData} margin={chartTheme.margin} stackOffset="sign">
            {showGrid && <CartesianGrid {...chartTheme.grid} />}
            <XAxis dataKey="label" {...chartTheme.xAxis} />
            <YAxis {...chartTheme.yAxis} tickCount={yTickCount} allowDecimals={allowDecimals} tickFormatter={valueFormatter} />
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
          <DefaultTooltipContent label={focused.tooltipLabel ?? focused.label} payload={series.map((item, index) => ({ name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index), graphicalItemId: item.key }))} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} contentStyle={tooltipStyle} />
        </div>}
      </div>
      {showLegend && <figcaption className="ci-stacked-chart__legend">{series.map((item, index) => <span key={item.key}><i aria-hidden style={{ background: seriesColor(item, index) }} /><span className="ci-stacked-chart__series">{item.icon && <span aria-hidden>{item.icon}</span>}{item.label}</span></span>)}</figcaption>}
    </>}
  </figure>;
}

export interface LineChartSeries extends ChartSeries {
  /** Marker shape on the line and in the legend. Defaults to `chartSeries(index).shape`. */
  shape?: LegendMarkerShape;
}

export type LineChartDatum = StackedBarDatum;

export interface LineChartProps extends Omit<ComponentProps<"figure">, "children"> {
  ariaLabel: string;
  /** One entry per X position, in axis order. The caller formats dates into `label`. */
  data: readonly LineChartDatum[];
  /** Colours default to `chartSeries(index)`. Pin `color` when a filter can remove series, so survivors keep theirs. */
  series: readonly LineChartSeries[];
  valueFormatter?: (value: number) => string;
  /** Compact Y axis text for the 48px axis, such as `$1.2k`. Defaults to `valueFormatter`. */
  yTickFormatter?: (value: number) => string;
  height?: number;
  /** Defaults to on for two or more series; a single series is named by the chart's title. */
  showLegend?: boolean;
  showGrid?: boolean;
  /** Mark every measurement. Isolated measurements and repeated colours are always marked. */
  showPoints?: boolean;
  yTickCount?: number;
  allowDecimals?: boolean;
  unavailableLabel?: string;
  emptyLabel?: string;
}

const plotStart = chartTheme.margin.left + chartTheme.yAxis.width;
const plotEnd = chartTheme.margin.right;
const plotSpan = (ratio: number) => `(100% - ${plotStart + plotEnd}px) * ${ratio}`;
const plotX = (ratio: number) => `calc(${plotStart}px + ${plotSpan(ratio)})`;
const pointRatio = (index: number, count: number) => count > 1 ? index / (count - 1) : .5;

interface LineMarkerProps { cx?: number | null; cy?: number | null; index: number }

function LineMarker({ cx, cy, shape, color }: { cx: number; cy: number; shape: LegendMarkerShape; color: string }) {
  const paint = { fill: color, stroke: "var(--ci-color-surface)", strokeWidth: 2, "data-ci-line-marker": shape };
  if (shape === "dot") return <circle {...paint} cx={cx} cy={cy} r={5} />;
  return <rect {...paint} x={cx - 4.5} y={cy - 4.5} width={9} height={9} rx={1} transform={shape === "diamond" ? `rotate(45 ${cx} ${cy})` : undefined} />;
}

/**
 * Multi-series line or time-series chart. Recharts only draws the axes and lines; the hit areas,
 * guide and tooltip are HTML placed from `chartTheme`'s plot geometry, because a recharts 3 chart
 * gives `Customized` children no layout and recharts 2 has no hooks that expose it.
 */
export function LineChart({
  ariaLabel, data, series, valueFormatter = formatNumber, yTickFormatter = valueFormatter, height = 240, showLegend = series.length > 1,
  showGrid = true, showPoints = false, yTickCount = 5, allowDecimals = true, unavailableLabel = "Unavailable", emptyLabel,
  className, ...props
}: LineChartProps) {
  const zones = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const styled = series.map((item, index) => ({ ...item, color: item.color ?? chartSeries(index).color, shape: item.shape ?? chartSeries(index).shape }));
  const safeData = useMemo(() => data.map(datum => ({ ...datum, values: Object.fromEntries(series.map(item => [item.key, measured(datum.values[item.key]) ? datum.values[item.key]! : null])) })), [data, series]);
  const rovingId = safeData.some(datum => datum.id === focusedId) ? focusedId : safeData[0]?.id;
  const activeIndex = safeData.findIndex(datum => datum.id === activeId);
  const active = safeData[activeIndex];
  const reading = (value: number | null) => value === null ? unavailableLabel : valueFormatter(value);
  const describe = (datum: LineChartDatum) => `${datum.tooltipLabel ?? datum.label}: ${series.map(item => `${item.label} ${reading(datum.values[item.key] ?? null)}`).join(", ")}${datum.hint ? `. ${datum.hint}` : ""}`;
  const marker = (item: (typeof styled)[number]) => (dot: unknown) => {
    const { cx, cy, index } = dot as LineMarkerProps;
    const value = (offset: number) => safeData[index + offset]?.values[item.key] ?? null;
    const shown = showPoints || item.shape !== "dot" || (value(-1) === null && value(1) === null);
    return <g key={`${item.key}-${index}`}>{shown && typeof cx === "number" && typeof cy === "number" && value(0) !== null ? <LineMarker cx={cx} cy={cy} shape={item.shape} color={item.color} /> : null}</g>;
  };
  const activeRatio = pointRatio(activeIndex, safeData.length);
  return <figure {...props} className={cn("ci-line-chart", className)} aria-label={ariaLabel}>
    {(!data.length || !series.length) && emptyLabel != null ? <EmptyState compact title={emptyLabel} /> : <>
      <div className="ci-line-chart__plot" style={{ height }}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={safeData} margin={chartTheme.margin} accessibilityLayer={false}>
            {showGrid && <CartesianGrid {...chartTheme.grid} />}
            <XAxis dataKey="label" scale="point" {...chartTheme.xAxis} />
            <YAxis {...chartTheme.yAxis} tickCount={yTickCount} allowDecimals={allowDecimals} tickFormatter={yTickFormatter} />
            {styled.map(item => <Line key={item.key} {...chartTheme.line} dataKey={datum => datum.values[item.key]} name={item.label} stroke={item.color} dot={marker(item)} activeDot={false} connectNulls={false} />)}
          </RechartsLineChart>
        </ResponsiveContainer>
        {active && <span aria-hidden className="ci-line-chart__guide" style={{ left: plotX(activeRatio) }} />}
        {safeData.map((datum, index) => {
          const last = safeData.length - 1;
          const start = index === 0 ? 0 : (index - .5) / last;
          const end = index === last ? 1 : (index + .5) / last;
          return <div key={datum.id} ref={node => { zones.current[index] = node; }} className="ci-line-chart__zone" role="img" aria-label={describe(datum)} tabIndex={rovingId === datum.id ? 0 : -1}
            style={{ left: plotX(start), right: `calc(${plotEnd}px + ${plotSpan(1 - end)})` }}
            onFocus={() => { setFocusedId(datum.id); setActiveId(datum.id); }} onBlur={() => setActiveId(null)}
            onPointerEnter={() => setActiveId(datum.id)} onPointerLeave={event => { if (event.pointerType !== "touch") setActiveId(null); }} onPointerDown={() => setActiveId(datum.id)}
            onKeyDown={event => {
              if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
              const next = event.key === "ArrowRight" ? (index + 1) % safeData.length : event.key === "ArrowLeft" ? (index + last) % safeData.length : event.key === "Home" ? 0 : event.key === "End" ? last : null;
              if (next !== null) { event.preventDefault(); zones.current[next]?.focus(); }
              if (event.key === "Escape") { event.preventDefault(); setActiveId(null); }
            }} />;
        })}
        {active && <div role="tooltip" className="ci-line-chart__tooltip" data-side={activeRatio > .5 ? "start" : "end"} style={{ "--ci-line-chart-x": plotX(activeRatio) } as CSSProperties}>
          <span className="ci-line-chart__tooltip-label">{active.tooltipLabel ?? active.label}</span>
          <ul>{styled.map(item => <li key={item.key}><LegendMarker color={item.color} shape={item.shape} label={item.label} /><strong>{reading(active.values[item.key])}</strong></li>)}</ul>
          {active.hint && <small>{active.hint}</small>}
        </div>}
      </div>
      {showLegend && <figcaption className="ci-line-chart__legend">{styled.map(item => <LegendMarker key={item.key} color={item.color} shape={item.shape} label={item.icon ? <span className="ci-stacked-chart__series"><span aria-hidden>{item.icon}</span>{item.label}</span> : item.label} />)}</figcaption>}
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
