"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export interface NumberTickerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number;
  /** Number displayed before the animation begins. Defaults to 0. */
  from?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before counting begins, in seconds. */
  delay?: number;
  /** Intl.NumberFormat options used for the rendered value. */
  formatOptions?: Intl.NumberFormatOptions;
  /** Locale passed to Intl.NumberFormat. */
  locale?: string;
  /** Animate only after the number enters the viewport. */
  animateOnView?: boolean;
}

export const NumberTicker = forwardRef<HTMLSpanElement, NumberTickerProps>(
  function NumberTicker(
    {
      className,
      value,
      from = 0,
      duration = 1.2,
      delay = 0,
      formatOptions,
      locale,
      animateOnView = true,
      ...props
    },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLSpanElement | null>(null);
    const hasAnimated = useRef(false);
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
      hasAnimated.current = false;
      setDisplayValue(from);

      const node = localRef.current;
      if (!node) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        setDisplayValue(value);
        return;
      }

      let frame = 0;
      let timer = 0;
      let observer: IntersectionObserver | undefined;

      const start = () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const startedAt = performance.now();
        const durationMs = Math.max(duration, 0.01) * 1000;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(from + (value - from) * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        timer = window.setTimeout(() => {
          frame = requestAnimationFrame(tick);
        }, Math.max(delay, 0) * 1000);
      };

      if (animateOnView && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              start();
              observer?.disconnect();
            }
          },
          { threshold: 0.25 },
        );
        observer.observe(node);
      } else {
        start();
      }

      return () => {
        observer?.disconnect();
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }, [animateOnView, delay, duration, from, value]);

    const formatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
      ...formatOptions,
    });

    return (
      <span
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("ci-number-ticker", className)}
        aria-label={formatter.format(value)}
        {...props}
      >
        {formatter.format(displayValue)}
      </span>
    );
  },
);
