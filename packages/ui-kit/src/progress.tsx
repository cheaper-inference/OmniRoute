"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { NumberTicker } from "./number-ticker";

export type ProgressTone = "default" | "success" | "warning" | "danger";

export interface ProgressSegment {
  value: number;
  /** Colour of this part. Defaults to the bar's `tone`. */
  tone?: ProgressTone;
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-valuetext": ariaValueText,
  ...props
}: ProgressProps) {
  const labelId = useId();
  const safeMax = Math.max(max, 1);
  const hasSegments = Boolean(segments?.length);
  const isIndeterminate = indeterminate || (value == null && !hasSegments);
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
  const percent = (current / safeMax) * 100;
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
    </div>
  );
}
