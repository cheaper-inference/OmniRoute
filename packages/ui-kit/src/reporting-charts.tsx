"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, DefaultTooltipContent, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
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

/** A series drawn as a line over the bars, on an axis of its own. */
export interface StackedBarLineSeries extends ChartSeries {
  /** Formats this series in the tooltip and in each point's accessible name. Defaults to the chart's `valueFormatter`. */
  valueFormatter?: (value: number) => string;
  /** Compact text for the 48px axis, such as `$1.2k`. Defaults to this series' `valueFormatter`. */
  yTickFormatter?: (value: number) => string;
}

export interface StackedBarChartProps extends Omit<ComponentProps<"figure">, "children" | "onSelect"> {
  ariaLabel: string;
  data: readonly StackedBarDatum[];
  series: readonly ChartSeries[];
  /**
   * One more series from the same `values`, drawn as a line on a second Y axis at the right of the plot:
   * a measure in another unit, such as cost over request bars. It is never part of the total.
   */
  lineSeries?: StackedBarLineSeries;
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
  /** Accessible name of the keyboard point group, from `ariaLabel`. Defaults to "… data points". */
  dataPointsLabel?: (ariaLabel: string) => string;
}

const defaultDataPointsLabel = (ariaLabel: string) => `${ariaLabel} data points`;
const formatNumber = (value: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
const measured = (value: number | null | undefined): value is number => typeof value === "number" && Number.isFinite(value);
const palette = ["var(--ci-chart-1)", "var(--ci-chart-2)", "var(--ci-chart-3)", "var(--ci-chart-4)", "var(--ci-chart-5)"];
const seriesColor = (series: ChartSeries, index: number) => series.color ?? palette[index % palette.length];
const tooltipStyle = chartTheme.tooltip.contentStyle;
const lineAxisId = "line";
// The second axis takes the place of the right margin, as the first one does on the left.
const lineAxisMargin = { ...chartTheme.margin, right: 0 };
// Over the keyboard hit areas, so a focused one's outline never crosses the pointer tooltip.
const pointerTooltipStyle = { zIndex: 1 };
// Keeps the pointer tooltip in series order: recharts 3 sorts its items by name unless told how.
const inSeriesOrder = () => 0;
// Drawn under the line in the surface colour, so the line stays legible where it crosses a bar.
const lineHalo = { stroke: "var(--ci-color-surface)", strokeWidth: chartTheme.line.strokeWidth + 2, dot: false, activeDot: false, legendType: "none", tooltipType: "none" } as const;
type ChartValues = { values: Readonly<Record<string, number | null | undefined>> };
// The plot's box inside the chart, in CSS: from the Y axis to `end`, the width kept free at its right.
const plotStart = chartTheme.margin.left + chartTheme.yAxis.width;
const plotEnd = chartTheme.margin.right;
const plotSpan = (ratio: number, end: number = plotEnd) => `(100% - ${plotStart + end}px) * ${ratio}`;
const plotX = (ratio: number, end: number = plotEnd) => `calc(${plotStart}px + ${plotSpan(ratio, end)})`;
const keyboardTooltipWidth = 220;

interface ChartPointZonesProps {
  points: readonly StackedBarDatum[];
  /** Width kept free at the right of the plot: the chart margin, or the line series' axis. */
  end: number;
  /** Already resolved name of the point group. */
  ariaLabel: string;
  rovingId?: string | null;
  selectedId?: string | null;
  /** The point whose keyboard tooltip is open. */
  describedId?: string | null;
  tooltipId: string;
  selectable: boolean;
  describe: (datum: StackedBarDatum) => string;
  onPointSelect?: StackedBarChartProps["onPointSelect"];
  onFocused: (id: string | null) => void;
  onTooltip: (id: string | null) => void;
}
/** One hit area per band of the X axis, placed from `chartTheme`'s plot geometry. */
function ChartPointZones({ points, end, ariaLabel, rovingId, selectedId, describedId, tooltipId, selectable, describe, onPointSelect, onFocused, onTooltip }: ChartPointZonesProps) {
  const zones = useRef<(HTMLDivElement | null)[]>([]);
  return <div className="ci-stacked-chart__zones" role="group" aria-label={ariaLabel}>{points.map((datum, index) => <div key={datum.id} ref={node => { zones.current[index] = node; }}
    className="ci-stacked-chart__zone" data-selected={selectedId === datum.id || undefined}
    style={{ left: plotX(index / points.length, end), width: `calc(${plotSpan(1 / points.length, end)})` }}
    role={selectable ? "button" : "img"} tabIndex={rovingId === datum.id ? 0 : -1}
    aria-label={describe(datum)} aria-pressed={selectable ? selectedId === datum.id : undefined}
    aria-describedby={describedId === datum.id ? tooltipId : undefined}
    onFocus={() => { onFocused(datum.id); onTooltip(datum.id); }}
    onBlur={() => { onFocused(null); onTooltip(null); }} onPointerMove={() => onTooltip(null)} onClick={() => onPointSelect?.(datum, index)}
    onKeyDown={event => {
      const next = event.key === "ArrowRight" ? (index + 1) % points.length : event.key === "ArrowLeft" ? (index + points.length - 1) % points.length : event.key === "Home" ? 0 : event.key === "End" ? points.length - 1 : null;
      if (next !== null) { event.preventDefault(); zones.current[next]?.focus(); }
      if ((event.key === "Enter" || event.key === " ") && onPointSelect) { event.preventDefault(); onPointSelect(datum, index); }
      if (event.key === "Escape") { event.preventDefault(); onTooltip(null); }
    }} />)}</div>;
}

/**
 * The approved preview's Recharts composition, with additive keyboard hit areas. The hit areas are
 * HTML placed from `chartTheme`'s plot geometry, as in `LineChart`, because recharts 3 gives a chart's
 * children no layout. They go inside the element recharts listens on, so its tooltip still follows
 * the pointer over them.
 */
export function StackedBarChart({
  ariaLabel, data, series, lineSeries, onPointSelect, selectedId, valueFormatter = formatNumber,
  height = 215, showLegend = true, showGrid = true, yTickCount = 5, allowDecimals = true,
  totalLabel = "Total", unavailableLabel = "Unavailable", emptyLabel, dataPointsLabel = defaultDataPointsLabel,
  className, ...props
}: StackedBarChartProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  // By id, not by position: the points can change while one of them has focus.
  const [describedId, setDescribedId] = useState<string | null>(null);
  // The element around the chart's <svg>: recharts 2 and 3 both size it to the chart and listen on it.
  const [chart, setChart] = useState<HTMLElement | null>(null);
  const anchor = useCallback((node: SVGGElement | null) => setChart(node?.ownerSVGElement?.parentElement ?? null), []);
  const tooltipId = `ci-stacked-tooltip-${useId().replace(/:/g, "")}`;
  const rovingId = data.some(datum => datum.id === focusedId) ? focusedId : data.some(datum => datum.id === selectedId) ? selectedId : data[0]?.id;
  const lineKey = lineSeries?.key;
  const safeData = useMemo(() => data.map(datum => ({ ...datum, values: Object.fromEntries([...series.map(item => item.key), ...(lineKey === undefined ? [] : [lineKey])].map(key => [key, measured(datum.values[key]) ? datum.values[key]! : null])) })), [data, series, lineKey]);
  // One accessor per key, so the pointer tooltip can tell the line's entry from a bar's.
  const lineValue = useMemo(() => lineKey === undefined ? undefined : (datum: ChartValues) => datum.values[lineKey], [lineKey]);
  const line = lineSeries && lineValue ? { ...lineSeries, color: seriesColor(lineSeries, series.length), value: lineValue, format: lineSeries.valueFormatter ?? valueFormatter } : null;
  const lineReading = (datum: ChartValues) => line ? measured(datum.values[line.key]) ? line.format(datum.values[line.key]!) : unavailableLabel : "";
  const Plot = line ? ComposedChart : BarChart;
  const describe = (datum: StackedBarDatum) => {
    const values = series.map(item => datum.values[item.key]);
    const sum = values.every(measured) ? values.reduce<number>((total, value) => total + value!, 0) : null;
    return `${datum.tooltipLabel ?? datum.label}: ${series.map(item => `${item.label} ${measured(datum.values[item.key]) ? valueFormatter(datum.values[item.key]!) : unavailableLabel}`).join(", ")}. ${totalLabel} ${sum === null || !Number.isFinite(sum) ? unavailableLabel : valueFormatter(sum)}${line ? `. ${line.label} ${lineReading(datum)}` : ""}${datum.hint ? `. ${datum.hint}` : ""}`;
  };
  const keyboardIndex = describedId === null ? -1 : data.findIndex(datum => datum.id === describedId);
  // The described point left the data: forget it, or its tooltip would reopen if the point came back.
  if (describedId !== null && keyboardIndex < 0) setDescribedId(null);
  const focused = keyboardIndex < 0 ? undefined : safeData[keyboardIndex];
  const end = line ? lineAxisMargin.right + chartTheme.yAxis.width : plotEnd;
  return <figure {...props} className={cn("ci-stacked-chart", className)} aria-label={ariaLabel}>
    {(!data.length || !series.length) && emptyLabel != null ? <EmptyState compact title={emptyLabel} /> : <>
      <div className="ci-stacked-chart__plot" style={{ height }}>
        <ResponsiveContainer width="100%" height={height}>
          <Plot data={safeData} margin={line ? lineAxisMargin : chartTheme.margin} stackOffset="sign" accessibilityLayer={false}>
            {showGrid && <CartesianGrid {...chartTheme.grid} />}
            <XAxis dataKey="label" {...chartTheme.xAxis} />
            <YAxis {...chartTheme.yAxis} tickCount={yTickCount} allowDecimals={allowDecimals} tickFormatter={valueFormatter} />
            {line && <YAxis yAxisId={lineAxisId} orientation="right" {...chartTheme.yAxis} tickCount={yTickCount} tickFormatter={line.yTickFormatter ?? line.format} />}
            <Tooltip active={focused ? false : undefined} filterNull={false} cursor={false} wrapperStyle={pointerTooltipStyle}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.tooltipLabel || label}
              content={properties => <DefaultTooltipContent {...properties} itemSorter={inSeriesOrder} payload={properties.payload?.map(entry => ({ ...entry, value: line && (entry.dataKey as unknown) === line.value && typeof entry.value === "number" ? line.format(entry.value) : entry.value ?? unavailableLabel }))} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} />}
              contentStyle={tooltipStyle} />
            {series.map((item, index) => <Bar key={item.key} dataKey={datum => datum.values[item.key]} name={item.label} stackId="usage" fill={seriesColor(item, index)} maxBarSize={32} isAnimationActive={false} />)}
            {line && <Line {...chartTheme.line} {...lineHalo} yAxisId={lineAxisId} dataKey={line.value} connectNulls={false} />}
            {line && <Line {...chartTheme.line} yAxisId={lineAxisId} dataKey={line.value} name={line.label} stroke={line.color} dot={seriesMarkers(safeData, { key: line.key, color: line.color, shape: "dot" })} activeDot={false} connectNulls={false} />}
            {/* A plain SVG child is the one thing recharts 2 and 3 both render in place. */}
            <g key="points" ref={anchor}>{chart && createPortal(<ChartPointZones points={data} end={end} ariaLabel={dataPointsLabel(ariaLabel)} rovingId={rovingId} selectedId={selectedId} describedId={describedId} tooltipId={tooltipId} selectable={!!onPointSelect} describe={describe}
              onPointSelect={onPointSelect} onFocused={setFocusedId} onTooltip={setDescribedId} />, chart)}</g>
          </Plot>
        </ResponsiveContainer>
        {focused && <div id={tooltipId} role="tooltip" className="ci-stacked-chart__keyboard-tooltip" style={{ left: `max(0px, min(${plotX((keyboardIndex + .5) / data.length, end)} + 10px, 100% - ${end + keyboardTooltipWidth}px))`, top: chartTheme.margin.top + 12 }}>
          <DefaultTooltipContent label={focused.tooltipLabel ?? focused.label} payload={[...series.map((item, index) => ({ name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index), graphicalItemId: item.key })), ...(line ? [{ name: line.label, value: lineReading(focused), color: line.color, graphicalItemId: `${lineAxisId}:${line.key}` }] : [])]} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} contentStyle={tooltipStyle} />
        </div>}
      </div>
      {showLegend && <figcaption className="ci-stacked-chart__legend">{series.map((item, index) => <span key={item.key}><i aria-hidden style={{ background: seriesColor(item, index) }} /><span className="ci-stacked-chart__series">{item.icon && <span aria-hidden>{item.icon}</span>}{item.label}</span></span>)}{line && <span data-kind="line"><i aria-hidden style={{ background: line.color }} /><span className="ci-stacked-chart__series">{line.icon && <span aria-hidden>{line.icon}</span>}{line.label}</span></span>}</figcaption>}
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
  /**
   * Fixed Y axis range, such as `[0, 100]` for a rate. Without it the axis fits the data.
   * A measurement outside the range widens the axis rather than being clipped.
   */
  yDomain?: readonly [number, number];
  /**
   * Draw each line across its unavailable values instead of breaking it. The gap still reads as
   * unavailable, and the measurements on each side of it are marked.
   */
  connectNulls?: boolean;
  unavailableLabel?: string;
  emptyLabel?: string;
}

const pointRatio = (index: number, count: number) => count > 1 ? index / (count - 1) : .5;

interface LineMarkerProps { cx?: number | null; cy?: number | null; index: number }

function LineMarker({ cx, cy, shape, color }: { cx: number; cy: number; shape: LegendMarkerShape; color: string }) {
  const paint = { fill: color, stroke: "var(--ci-color-surface)", strokeWidth: 2, "data-ci-line-marker": shape };
  if (shape === "dot") return <circle {...paint} cx={cx} cy={cy} r={5} />;
  return <rect {...paint} x={cx - 4.5} y={cy - 4.5} width={9} height={9} rx={1} transform={shape === "diamond" ? `rotate(45 ${cx} ${cy})` : undefined} />;
}

/**
 * The recharts `dot` of one series. A measurement with a gap on both sides draws no segment, so it is
 * always marked, as is every point of a series whose shape is not the plain dot. With `connectNulls`
 * the measurements at each end of a bridged gap are marked too.
 */
function seriesMarkers(rows: readonly ChartValues[], item: { key: string; color: string; shape: LegendMarkerShape }, { showPoints = false, connectNulls = false } = {}) {
  const known = rows.map(row => measured(row.values[item.key]));
  const first = known.indexOf(true);
  const last = known.lastIndexOf(true);
  return (dot: unknown) => {
    const { cx, cy, index } = dot as LineMarkerProps;
    const gapBefore = !known[index - 1];
    const gapAfter = !known[index + 1];
    const shown = showPoints || item.shape !== "dot" || (gapBefore && gapAfter) || (connectNulls && ((gapBefore && index > first) || (gapAfter && index < last)));
    return <g key={`${item.key}-${index}`}>{shown && typeof cx === "number" && typeof cy === "number" && known[index] ? <LineMarker cx={cx} cy={cy} shape={item.shape} color={item.color} /> : null}</g>;
  };
}

interface PlotPoint { id: string; label: string; tooltipLabel?: string; hint?: string }

interface PlotPointsProps<Point extends PlotPoint> {
  points: readonly Point[];
  describe: (point: Point) => string;
  /** The `<li>` rows of the tooltip for one point. */
  rows: (point: Point) => ReactNode;
  selectedId?: string | null;
  onSelect?: (index: number) => void;
}

/**
 * The HTML layer over a point-scale plot: one hit area per X position, the guide and the tooltip,
 * all placed from `chartTheme`'s plot geometry.
 */
function PlotPoints<Point extends PlotPoint>({ points, describe, rows, selectedId, onSelect }: PlotPointsProps<Point>) {
  const zones = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const indexOf = (id: string | null | undefined) => id == null ? -1 : points.findIndex(point => point.id === id);
  const selectedIndex = indexOf(selectedId);
  const focusedIndex = indexOf(focusedId);
  const activeIndex = indexOf(activeId);
  // A point that left the data is forgotten, so it takes back neither the tooltip nor the tab stop
  // if it comes back. Reset while rendering, as React allows for a component's own state: no effect, no loop.
  if (focusedId !== null && focusedIndex < 0) setFocusedId(null);
  if (activeId !== null && activeIndex < 0) setActiveId(null);
  const rovingId = focusedIndex >= 0 ? focusedId : selectedIndex >= 0 ? selectedId : points[0]?.id;
  const active = points[activeIndex];
  const activeRatio = pointRatio(activeIndex, points.length);
  const last = points.length - 1;
  return <>
    {selectedIndex >= 0 && <span aria-hidden className="ci-line-chart__guide" data-selected style={{ left: plotX(pointRatio(selectedIndex, points.length)) }} />}
    {active && <span aria-hidden className="ci-line-chart__guide" style={{ left: plotX(activeRatio) }} />}
    {points.map((point, index) => {
      const start = index === 0 ? 0 : (index - .5) / last;
      const end = index === last ? 1 : (index + .5) / last;
      return <div key={point.id} ref={node => { zones.current[index] = node; }} className="ci-line-chart__zone" role={onSelect ? "button" : "img"} aria-label={describe(point)} aria-pressed={onSelect ? selectedId === point.id : undefined} tabIndex={rovingId === point.id ? 0 : -1}
        style={{ left: plotX(start), right: `calc(${plotEnd}px + ${plotSpan(1 - end)})` }}
        onFocus={() => { setFocusedId(point.id); setActiveId(point.id); }} onBlur={() => setActiveId(null)}
        onPointerEnter={() => setActiveId(point.id)} onPointerLeave={event => { if (event.pointerType !== "touch") setActiveId(null); }} onPointerDown={() => setActiveId(point.id)}
        onClick={onSelect && (() => onSelect(index))}
        onKeyDown={event => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          const next = event.key === "ArrowRight" ? (index + 1) % points.length : event.key === "ArrowLeft" ? (index + last) % points.length : event.key === "Home" ? 0 : event.key === "End" ? last : null;
          if (next !== null) { event.preventDefault(); zones.current[next]?.focus(); }
          if ((event.key === "Enter" || event.key === " ") && onSelect) { event.preventDefault(); onSelect(index); }
          if (event.key === "Escape") { event.preventDefault(); setActiveId(null); }
        }} />;
    })}
    {active && <div role="tooltip" className="ci-line-chart__tooltip" data-side={activeRatio > .5 ? "start" : "end"} style={{ "--ci-line-chart-x": plotX(activeRatio) } as CSSProperties}>
      <span className="ci-line-chart__tooltip-label">{active.tooltipLabel ?? active.label}</span>
      <ul>{rows(active)}</ul>
      {active.hint && <small>{active.hint}</small>}
    </div>}
  </>;
}

const seriesLabel = (item: ChartSeries) => item.icon ? <span className="ci-stacked-chart__series"><span aria-hidden>{item.icon}</span>{item.label}</span> : item.label;

/**
 * Multi-series line or time-series chart. Recharts only draws the axes and lines; the hit areas,
 * guide and tooltip are HTML placed from `chartTheme`'s plot geometry, because a recharts 3 chart
 * gives `Customized` children no layout and recharts 2 has no hooks that expose it.
 */
export function LineChart({
  ariaLabel, data, series, valueFormatter = formatNumber, yTickFormatter = valueFormatter, height = 240, showLegend = series.length > 1,
  showGrid = true, showPoints = false, yTickCount = 5, allowDecimals = true, yDomain, connectNulls = false, unavailableLabel = "Unavailable", emptyLabel,
  className, ...props
}: LineChartProps) {
  const styled = series.map((item, index) => ({ ...item, color: item.color ?? chartSeries(index).color, shape: item.shape ?? chartSeries(index).shape }));
  const safeData = useMemo(() => data.map(datum => ({ ...datum, values: Object.fromEntries(series.map(item => [item.key, measured(datum.values[item.key]) ? datum.values[item.key]! : null])) })), [data, series]);
  const [low, high] = yDomain ?? [];
  const domain = measured(low) && measured(high) && low < high ? [low, high] : undefined;
  const reading = (value: number | null) => value === null ? unavailableLabel : valueFormatter(value);
  const describe = (datum: LineChartDatum) => `${datum.tooltipLabel ?? datum.label}: ${series.map(item => `${item.label} ${reading(datum.values[item.key] ?? null)}`).join(", ")}${datum.hint ? `. ${datum.hint}` : ""}`;
  return <figure {...props} className={cn("ci-line-chart", className)} aria-label={ariaLabel}>
    {(!data.length || !series.length) && emptyLabel != null ? <EmptyState compact title={emptyLabel} /> : <>
      <div className="ci-line-chart__plot" style={{ height }}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={safeData} margin={chartTheme.margin} accessibilityLayer={false}>
            {showGrid && <CartesianGrid {...chartTheme.grid} />}
            <XAxis dataKey="label" scale="point" {...chartTheme.xAxis} />
            <YAxis {...chartTheme.yAxis} {...(domain && { domain })} tickCount={yTickCount} allowDecimals={allowDecimals} tickFormatter={yTickFormatter} />
            {styled.map(item => <Line key={item.key} {...chartTheme.line} dataKey={datum => datum.values[item.key]} name={item.label} stroke={item.color} dot={seriesMarkers(safeData, item, { showPoints, connectNulls })} activeDot={false} connectNulls={connectNulls} />)}
          </RechartsLineChart>
        </ResponsiveContainer>
        <PlotPoints points={safeData} describe={describe} rows={active => styled.map(item => <li key={item.key}><LegendMarker color={item.color} shape={item.shape} label={item.label} /><strong>{reading(active.values[item.key])}</strong></li>)} />
      </div>
      {showLegend && <figcaption className="ci-line-chart__legend">{styled.map(item => <LegendMarker key={item.key} color={item.color} shape={item.shape} label={seriesLabel(item)} />)}</figcaption>}
    </>}
  </figure>;
}

export interface StackedAreaChartProps extends Omit<ComponentProps<"figure">, "children" | "onSelect"> {
  ariaLabel: string;
  /** One entry per X position, in axis order. The caller formats dates into `label`. */
  data: readonly StackedBarDatum[];
  /** Stacked in this order, from the axis up. Colours default to `chartSeries(index)`; pin `color` when a filter can remove series. */
  series: readonly ChartSeries[];
  /** The caller supplies already aggregated data and owns any filtering/navigation. */
  onPointSelect?: (datum: StackedBarDatum, index: number) => void;
  selectedId?: string | null;
  valueFormatter?: (value: number) => string;
  /** Compact Y axis text for the 48px axis, such as `1.2k`. Defaults to `valueFormatter`. */
  yTickFormatter?: (value: number) => string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  yTickCount?: number;
  allowDecimals?: boolean;
  totalLabel?: string;
  unavailableLabel?: string;
  emptyLabel?: string;
}

const areaShape = "square" satisfies LegendMarkerShape;

/**
 * Stacked areas over time: the `StackedBarChart` data, series and labels, with the `LineChart`
 * points, tooltip and legend. Areas read as parts of a whole, so keep the values non-negative and
 * use `StackedBarChart` for signed deltas.
 */
export function StackedAreaChart({
  ariaLabel, data, series, onPointSelect, selectedId, valueFormatter = formatNumber, yTickFormatter = valueFormatter,
  height = 240, showLegend = true, showGrid = true, yTickCount = 5, allowDecimals = true,
  totalLabel = "Total", unavailableLabel = "Unavailable", emptyLabel,
  className, ...props
}: StackedAreaChartProps) {
  const styled = series.map((item, index) => ({ ...item, color: item.color ?? chartSeries(index).color }));
  const safeData = useMemo(() => data.map(datum => ({ ...datum, values: Object.fromEntries(series.map(item => [item.key, measured(datum.values[item.key]) ? datum.values[item.key]! : null])) })), [data, series]);
  const reading = (value: number | null | undefined) => measured(value) ? valueFormatter(value) : unavailableLabel;
  const total = (datum: ChartValues) => {
    const values = series.map(item => datum.values[item.key]);
    return reading(values.every(measured) ? values.reduce<number>((sum, value) => sum + value, 0) : null);
  };
  const describe = (datum: StackedBarDatum) => `${datum.tooltipLabel ?? datum.label}: ${series.map(item => `${item.label} ${reading(datum.values[item.key])}`).join(", ")}. ${totalLabel} ${total(datum)}${datum.hint ? `. ${datum.hint}` : ""}`;
  return <figure {...props} className={cn("ci-line-chart ci-stacked-area-chart", className)} aria-label={ariaLabel}>
    {(!data.length || !series.length) && emptyLabel != null ? <EmptyState compact title={emptyLabel} /> : <>
      <div className="ci-line-chart__plot" style={{ height }}>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={safeData} margin={chartTheme.margin} accessibilityLayer={false}>
            {showGrid && <CartesianGrid {...chartTheme.grid} />}
            <XAxis dataKey="label" scale="point" {...chartTheme.xAxis} />
            <YAxis {...chartTheme.yAxis} tickCount={yTickCount} allowDecimals={allowDecimals} tickFormatter={yTickFormatter} />
            {styled.map(item => <Area key={item.key} {...chartTheme.line} dataKey={datum => datum.values[item.key]} name={item.label} stackId="stack" stroke={item.color} fill={item.color} fillOpacity={.3} dot={seriesMarkers(safeData, { ...item, shape: "dot" })} activeDot={false} connectNulls={false} />)}
          </AreaChart>
        </ResponsiveContainer>
        <PlotPoints points={safeData} describe={describe} selectedId={selectedId} onSelect={onPointSelect && (index => onPointSelect(data[index], index))}
          rows={active => <>
            {styled.map(item => <li key={item.key}><LegendMarker color={item.color} shape={areaShape} label={item.label} /><strong>{reading(active.values[item.key])}</strong></li>)}
            <li className="ci-line-chart__tooltip-total"><span>{totalLabel}</span><strong>{total(active)}</strong></li>
          </>} />
      </div>
      {showLegend && <figcaption className="ci-line-chart__legend">{styled.map(item => <LegendMarker key={item.key} color={item.color} shape={areaShape} label={seriesLabel(item)} />)}</figcaption>}
    </>}
  </figure>;
}

export interface SparklineProps extends Omit<ComponentProps<"div">, "children"> {
  /** Non-finite and null values make gaps instead of implying zero. */
  values: readonly (number | null)[];
  /** A label makes the sparkline informative; omit it for a decorative duplicate of nearby data. */
  ariaLabel?: string;
  color?: string;
  /** Plot height in pixels. Defaults to 52. */
  height?: number;
  /** `area` (default) is the monotone line with a fading fill. `bar` draws one column per value from a zero baseline. */
  variant?: SparklineVariant;
}

export type SparklineVariant = "area" | "bar";

const SPARKLINE_HEIGHT = 52;
/** Pixels a measured zero still gets in the bar variant, so it is not read as a missing value. */
const SPARKLINE_ZERO_MARK = 2;
const sparklineMargin = { top: 4, right: 2, bottom: 0, left: 2 };

export function Sparkline({ values, ariaLabel, color = "var(--ci-color-success)", height, variant = "area", className, style, ...props }: SparklineProps) {
  const gradientId = `ci-sparkline-${useId().replace(/:/g, "")}`;
  const sized = typeof height === "number" && Number.isFinite(height) && height > 0;
  const plotHeight = sized ? height : SPARKLINE_HEIGHT;
  const data = values.map(value => ({ value: value !== null && Number.isFinite(value) ? value : null }));
  const measurements = data.flatMap(point => point.value === null ? [] : [point.value]);
  // reduce, not a spread: a long series would pass one argument per value to Math.min and Math.max.
  const low = measurements.reduce((min, value) => Math.min(min, value), 0);
  const high = measurements.reduce((max, value) => Math.max(max, value), 0);
  return <div className={cn("ci-sparkline", className)} data-variant={variant === "bar" ? "bar" : undefined} role={ariaLabel ? "img" : undefined} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} style={{ color, ...(sized && { height }), ...style }} {...props}>
    {measurements.length > 0 && <ResponsiveContainer width="100%" height={plotHeight}>
      {variant === "bar" ? <BarChart data={data} margin={sparklineMargin} barCategoryGap="20%">
        <YAxis hide domain={low === high ? [0, 1] : [low, high]} />
        <Bar dataKey="value" fill={color} isAnimationActive={false} minPointSize={value => value === null || value === undefined ? 0 : SPARKLINE_ZERO_MARK} />
      </BarChart> : <AreaChart data={data} margin={sparklineMargin}>
        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={.25} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
        <YAxis hide domain={["dataMin * 0.9", "dataMax * 1.1"]} />
        <Area type="monotone" dataKey="value" stroke={color} fill={`url(#${gradientId})`} strokeWidth={2} dot={false} isAnimationActive={false} />
      </AreaChart>}
    </ResponsiveContainer>}
  </div>;
}
