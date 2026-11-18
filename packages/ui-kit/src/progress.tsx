"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { NumberTicker } from "./number-ticker";

export type ProgressTone = "default" | "success" | "warning" | "danger" | "info";

export interface ProgressSegment {
  value: number;
  /** Colour of this part. Defaults to the bar's `tone`. */
  tone?: ProgressTone;
}

/** One allocation band with its own track: `max` is its capacity, `value` the used part inside it. */
export interface ProgressBand {
  /** Stable identity of this band across renders. Defaults to `label`. */
  id?: string;
  /** Used amount inside this band, clamped to `[0, max]`. */
  value: number;
  /** Capacity of this band. Its track takes a share of the bar width proportional to it. Bands without capacity are dropped. */
  max: number;
  /** Accessible name of this band's progressbar, for example "Paid credit". */
  label: string;
  /** Spoken value of this band, for example "$12.00 of $19.00 used". */
  valueText?: string;
  /** Colour of this band's edge and fill. Defaults to the bar's `tone`. */
  tone?: ProgressTone;
  /** Visible caption under this band, aligned with its track. */
  legend?: ReactNode;
}

export interface ProgressProps extends Omit<ComponentProps<"div">, "children"> {
  /** Current value. Omit it (or pass `indeterminate`) when the amount of work is unknown. */
  value?: number;
  max?: number;
  label?: ReactNode;
  showValue?: boolean;
  /** Animate the bar and percentage after the component enters the viewport. */
  animate?: boolean;
  /** Delay before animation begins, in seconds. */
  delay?: number;
  /** Indicator colour. "default" keeps the accent gradient. */
  tone?: ProgressTone;
  /** Unknown amount of work: a looping sweep and no `aria-valuenow`. Wins over `value` and `segments`. */
  indeterminate?: boolean;
  /** Stacked parts of one total (for example completed + failed). Their sum is the bar value; `value` is ignored. */
  segments?: ProgressSegment[];
  /**
   * Allocation bands, each with its own track sized by its capacity and its own used fill
   * (for example a paid band and a bonus band). Each band is a named progressbar inside a group
   * named by `label`, `aria-label` or `aria-labelledby`. Wins over `segments` and `value`.
   */
  bands?: ProgressBand[];
}

// Only NaN has no meaningful position; ±Infinity is clamped to [0, max] below, as before.
const orZero = (value: number) => (Number.isNaN(value) ? 0 : value);

export function Progress({
  className,
  value,
  max = 100,
  label,
  showValue = false,
  animate = true,
  delay = 0,
  tone = "default",
  indeterminate = false,
  segments,
  bands,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-valuetext": ariaValueText,
  ...props
}: ProgressProps) {
  const labelId = useId();
  const safeMax = Math.max(max, 1);
  const bandParts = (bands ?? [])
    .filter((band) => Number.isFinite(band.max) && band.max > 0)
    .map((band) => {
      const amount = Math.min(Math.max(orZero(band.value), 0), band.max);
      return { ...band, tone: band.tone ?? tone, amount, percent: (amount / band.max) * 100 };
    });
  const hasBands = !indeterminate && bandParts.length > 0;
  const hasSegments = Boolean(segments?.length);
  const isIndeterminate = indeterminate || (value == null && !hasSegments && !hasBands);
  const sourceParts: ProgressSegment[] = segments?.length ? segments : [{ value: value ?? 0, tone }];
  // Each part is capped so the stacked total never exceeds max. Empty segments
  // are dropped so they do not draw a seam; a plain bar always keeps its indicator.
  let used = 0;
  const parts = sourceParts
    .map((part) => {
      const amount = Math.min(Math.max(orZero(part.value), 0), safeMax - used);
      used += amount;
      return { tone: part.tone ?? tone, amount, percent: (amount / safeMax) * 100 };
    })
    .filter((part) => !hasSegments || part.amount > 0);
  const current = used;
  const bandCapacity = bandParts.reduce((sum, band) => sum + band.max, 0);
  // Growth factors that total less than 1 leave part of the row empty, so fractional capacities scale up.
  const growScale = bandCapacity > 0 && bandCapacity < 1 ? 1 / bandCapacity : 1;
  // Bands keep their identity (and their legend state) when an earlier band is dropped or reordered.
  const seenBandKeys = new Set<string>();
  const bandKeys = bandParts.map((band, index) => {
    const base = band.id ?? band.label;
    const key = seenBandKeys.has(base) ? `${base}#${index}` : base;
    seenBandKeys.add(key);
    return key;
  });
  const percent = hasBands
    ? (bandParts.reduce((sum, band) => sum + band.amount, 0) / bandCapacity) * 100
    : (current / safeMax) * 100;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) {
      setIsVisible(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate, value]);

  const roundedPercent = Math.round(percent);
  // The progressbar, not the wrapper, owns the accessible name: explicit
  // aria-labelledby wins, then aria-label, then the visible `label`.
  const hasVisibleLabel = label != null && label !== false && label !== "";
  const labelledBy = ariaLabelledBy ?? (ariaLabel == null && hasVisibleLabel ? labelId : undefined);

  return (
    <div
      ref={rootRef}
      className={cn("ci-progress", className)}
      {...props}
      // After the forwarded props, so a consumer data-state cannot switch the sweep off.
      {...(isIndeterminate ? { "data-state": "indeterminate" } : null)}
      {...(hasBands ? { "data-layout": "bands" } : null)}
    >
      {(label != null || (showValue && !isIndeterminate)) && (
        <div className="ci-progress__header">
          <span id={hasVisibleLabel ? labelId : undefined}>{label}</span>
          {showValue && !isIndeterminate && (
            <span className="ci-progress__value">
              {animate ? (
                <NumberTicker value={roundedPercent} delay={delay} duration={0.9} formatOptions={{ maximumFractionDigits: 0 }} />
              ) : roundedPercent}
              %
            </span>
          )}
        </div>
      )}
      {hasBands ? (
        <div
          role="group"
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          aria-describedby={ariaDescribedBy}
          className="ci-progress__bands"
        >
          {bandParts.map((band, index) => (
            <div
              key={bandKeys[index]}
              className="ci-progress__band"
              data-tone={band.tone === "default" ? undefined : band.tone}
              style={{ flexGrow: band.max * growScale }}
            >
              <div
                role="progressbar"
                aria-label={band.label}
                aria-valuetext={band.valueText}
                aria-valuemin={0}
                aria-valuemax={band.max}
                aria-valuenow={band.amount}
                className="ci-progress__track"
              >
                <span
                  className="ci-progress__indicator"
                  style={{
                    width: isVisible ? `${band.percent}%` : "0%",
                    transitionDelay: isVisible ? `${delay}s` : "0s",
                  }}
                />
              </div>
              {band.legend != null && band.legend !== false && band.legend !== "" ? (
                <div className="ci-progress__band-legend">{band.legend}</div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div
          role="progressbar"
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          aria-describedby={ariaDescribedBy}
          aria-valuetext={isIndeterminate ? undefined : ariaValueText}
          aria-valuemin={0}
          aria-valuemax={safeMax}
          aria-valuenow={isIndeterminate ? undefined : current}
          className="ci-progress__track"
          data-segmented={hasSegments && !isIndeterminate ? "" : undefined}
        >
          {isIndeterminate ? (
            <span className="ci-progress__indicator" data-tone={tone === "default" ? undefined : tone} />
          ) : (
            parts.map((part, index) => (
              <span
                key={index}
                className={cn("ci-progress__indicator", hasSegments && "ci-progress__segment")}
                data-tone={part.tone === "default" ? undefined : part.tone}
                style={{
                  width: isVisible ? `${part.percent}%` : "0%",
                  transitionDelay: isVisible ? `${delay}s` : "0s",
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
