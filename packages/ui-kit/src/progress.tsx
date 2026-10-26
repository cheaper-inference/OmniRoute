"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { NumberTicker } from "./number-ticker";

export interface ProgressProps extends Omit<ComponentProps<"div">, "children"> {
  value: number;
  max?: number;
  label?: ReactNode;
  showValue?: boolean;
  /** Animate the bar and percentage after the component enters the viewport. */
  animate?: boolean;
  /** Delay before animation begins, in seconds. */
  delay?: number;
}

export function Progress({
  className,
  value,
  max = 100,
  label,
  showValue = false,
  animate = true,
  delay = 0,
  ...props
}: ProgressProps) {
  const safeMax = Math.max(max, 1);
  const percent = Math.min(Math.max((value / safeMax) * 100, 0), 100);
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

  return (
    <div ref={rootRef} className={cn("ci-progress", className)} {...props}>
      {(label != null || showValue) && (
        <div className="ci-progress__header">
          <span>{label}</span>
          {showValue && (
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
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.min(Math.max(value, 0), safeMax)}
        className="ci-progress__track"
      >
        <span
          className="ci-progress__indicator"
          style={{
            width: isVisible ? `${percent}%` : "0%",
            transitionDelay: isVisible ? `${delay}s` : "0s",
          }}
        />
      </div>
    </div>
  );
}
