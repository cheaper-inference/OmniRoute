"use client";

import { useContext, useRef, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { cn } from "./lib/utils";
import { MetricMotionContext } from "./metric-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface MetricChartFrameProps extends ComponentProps<"figure"> {
  /** Set false for static charts. OS reduced-motion preferences always win. */
  animate?: boolean;
}
export function MetricChartFrame({ className, animate = true, ...props }: MetricChartFrameProps) {
  return <figure {...props} className={cn("ci-metric-chart", className)} data-animate={animate || undefined} />;
}

export interface MetricFunnelDatum {
  label: string;
  /** null is unavailable, distinct from a measured zero. Counts must be finite and nonnegative. */
  value: number | null;
  color?: string;
  opacity?: number;
}
export interface MetricFunnelProps extends Omit<MetricChartFrameProps, "children"> {
  label: string;
  data: MetricFunnelDatum[];
  note?: ReactNode;
  unavailableLabel?: string;
}

function measured(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value >= 0;
}

export function MetricFunnel({ data, label, note, unavailableLabel = "unavailable", className, ...props }: MetricFunnelProps) {
  const replay = useContext(MetricMotionContext);
  const baseline = data[0]?.value ?? 0;
  return <MetricChartFrame {...props} className={cn("ci-metric-funnel", className)}
    aria-label={`${label}: ${data.map((item) => `${item.label}: ${measured(item.value) ? item.value : unavailableLabel}`).join(", ")}`}>
    {data.map((item, index) => <div className="ci-metric-funnel__step" key={item.label}>
      <div className="ci-metric-funnel__label"><span>{item.label}</span><strong>{measured(item.value) ? item.value : "—"}</strong></div>
      {!measured(item.value) ? <div className="ci-metric-funnel__unavailable" aria-hidden /> :
        <div className="ci-metric-funnel__track" aria-hidden>
          <span key={replay} style={{
            width: `${measured(baseline) && baseline > 0 ? Math.min(100, item.value / baseline * 100) : 0}%`,
            "--ci-metric-bar-color": item.color ?? "var(--ci-chart-1)",
            animationDelay: `${index * 100}ms`,
            opacity: item.opacity === undefined ? 1 : Math.max(0, Math.min(1, item.opacity)),
          } as CSSProperties} />
        </div>}
    </div>)}
    {note && <figcaption className="ci-metric-chart__note">{note}</figcaption>}
  </MetricChartFrame>;
}

export interface MetricDonutDatum {
  key: string;
  label: string;
  value: number;
  color: string;
}
export interface MetricDonutProps extends Omit<MetricChartFrameProps, "children"> {
  label: string;
  data: MetricDonutDatum[];
  totalLabel?: string;
}
export function MetricDonut({ data, label, totalLabel = "total", className, ...props }: MetricDonutProps) {
  const replay = useContext(MetricMotionContext);
  const sum = data.reduce((value, item) => value + item.value, 0);
  const total = data.every((item) => measured(item.value)) && Number.isFinite(sum) ? sum : null;
  let offset = 0;
  return <MetricChartFrame {...props} className={cn("ci-metric-donut", className)}
    aria-label={`${label}: ${data.map((item) => `${item.label} ${measured(item.value) ? item.value : "unavailable"}`).join(", ")}`}>
    <div className="ci-metric-donut__summary">
      <div className="ci-metric-donut__chart">
        <svg key={replay} viewBox="0 0 160 160" aria-hidden>
          <circle cx="80" cy="80" r="60" fill="none" stroke="var(--ci-color-border-subtle)" strokeWidth="19" />
          {total !== null && total > 0 && data.filter((item) => item.value > 0).map((item) => {
            const sweep = item.value / total * 360;
            const gap = Math.min(2.4, sweep * 0.12);
            const start = offset + gap / 2;
            const end = offset + sweep - gap / 2;
            const style = { "--ci-segment-duration": `${sweep / 360 * 900}ms`, "--ci-segment-delay": `${offset / 360 * 900}ms` } as CSSProperties;
            offset += sweep;
            if (item.value === total) return <circle key={item.key} className="ci-metric-donut__segment" style={style}
              pathLength={1} strokeDasharray="1 1" transform="rotate(-90 80 80)"
              cx="80" cy="80" r="60" fill="none" stroke={item.color} strokeWidth="19" />;
            const point = (angle: number) => {
              const radians = (angle - 90) * Math.PI / 180;
              return `${(80 + 60 * Math.cos(radians)).toFixed(3)} ${(80 + 60 * Math.sin(radians)).toFixed(3)}`;
            };
            return <path key={item.key} className="ci-metric-donut__segment" style={style} pathLength={1} strokeDasharray="1 1"
              d={`M ${point(start)} A 60 60 0 ${end - start > 180 ? 1 : 0} 1 ${point(end)}`}
              fill="none" stroke={item.color} strokeWidth="19" strokeLinecap="butt" />;
          })}
        </svg>
      </div>
      <div className="ci-metric-donut__total"><strong>{total ?? "—"}</strong><span>{totalLabel}</span></div>
    </div>
    <figcaption className="ci-metric-donut__legend">
      {data.map((item) => <div key={item.key}><i aria-hidden style={{ background: item.color }} /><span>{item.label}</span><strong>{measured(item.value) ? item.value : "—"}</strong></div>)}
    </figcaption>
  </MetricChartFrame>;
}

export interface StatusMatrixItem { id: string; label: string; enabled: boolean }
export interface StatusMatrixProps extends Omit<MetricChartFrameProps, "children"> {
  label: string;
  items: StatusMatrixItem[];
  note?: ReactNode;
  enabledLabel?: string;
  disabledLabel?: string;
}
function StatusBlock({ item, index, label }: { item: StatusMatrixItem; index: number; label: string }) {
  const [open, setOpen] = useState(false);
  // Touch focus can open the tooltip between pointerup and click. Toggle
  // from the state before the gesture so the first tap still reveals it.
  const openBeforePointer = useRef<boolean | null>(null);
  const replay = useContext(MetricMotionContext);
  return <Tooltip className="ci-status-matrix__tooltip" open={open} onOpenChange={setOpen} delayDuration={150}>
    <TooltipTrigger type="button" className="ci-status-matrix__cell" data-enabled={item.enabled || undefined} aria-label={label}
      onPointerDown={(event) => { openBeforePointer.current = event.pointerType === "touch" ? open : null; }}
      onPointerCancel={() => { openBeforePointer.current = null; }}
      onKeyDown={() => { openBeforePointer.current = null; }}
      onClick={(event) => {
        event.preventDefault();
        const previous = openBeforePointer.current;
        openBeforePointer.current = null;
        setOpen((value) => !(previous ?? value));
      }}>
      {item.enabled && <span key={replay} aria-hidden className="ci-status-matrix__fill" style={{ animationDelay: `${index * 45}ms` }} />}
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>;
}

/** Read-only status overview; blocks reveal labels, never toggle settings. */
export function StatusMatrix({ label, items, note, enabledLabel = "Enabled", disabledLabel = "Off", className, ...props }: StatusMatrixProps) {
  return <MetricChartFrame {...props} className={cn("ci-status-matrix", className)} aria-label={label}>
    <ul className="ci-status-matrix__grid">
      {items.map((item, index) => <li key={item.id}>
        <StatusBlock item={item} index={index} label={`${item.label}: ${item.enabled ? enabledLabel : disabledLabel}`} />
      </li>)}
    </ul>
    <figcaption className="ci-status-matrix__legend">
      <span><i data-enabled aria-hidden /> {enabledLabel}</span>
      <span><i aria-hidden /> {disabledLabel}</span>
    </figcaption>
    {note && <p className="ci-metric-chart__note">{note}</p>}
  </MetricChartFrame>;
}
