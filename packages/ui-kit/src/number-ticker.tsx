"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export interface NumberTickerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number;
  /**
   * Where each count starts. A number (default 0) restarts the count from that number on
   * every value change. `"previous"` counts the first value up from 0, then counts every
   * later change from the number on screen, also when a change interrupts a running count.
   */
  from?: number | "previous";
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before counting begins, in seconds. With `from="previous"` it applies to the first count only. */
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
    // True once a count has drawn its first frame (or reduced motion showed a value).
    const hasCounted = useRef(false);
    const followsPrevious = from === "previous";
    const origin = followsPrevious ? 0 : from;
    const [displayValue, setDisplayValue] = useState(origin);
    // The number on screen, read when a live value interrupts or follows a count.
    const shownValue = useRef(origin);
    // With from="previous", when the first delayed count is due (performance.now() clock). A
    // live value that arrives before then keeps this deadline instead of restarting the delay.
    const firstCountAt = useRef<number | null>(null);

    useEffect(() => {
      const show = (next: number) => {
        shownValue.current = next;
        setDisplayValue(next);
      };
      // Live mode: once the first count has started, later values count on from the screen.
      const continues = followsPrevious && hasCounted.current;
      const startValue = continues ? shownValue.current : origin;
      hasAnimated.current = false;
      if (!followsPrevious) firstCountAt.current = null;
      if (!continues) {
        hasCounted.current = false;
        show(origin);
      }

      const node = localRef.current;
      if (!node) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        hasCounted.current = true;
        show(value);
        return;
      }

      let frame = 0;
      let timer = 0;
      let observer: IntersectionObserver | undefined;

      const run = (startDelay: number) => {
        hasAnimated.current = true;
        let startedAt = 0;
        const durationMs = Math.max(duration, 0.01) * 1000;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          show(startValue + (value - startValue) * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        timer = window.setTimeout(() => {
          hasCounted.current = true;
          // The duration starts after the delay, so a long delay still shows the full count.
          startedAt = performance.now();
          frame = requestAnimationFrame(tick);
        }, Math.max(startDelay, 0) * 1000);
      };

      const start = () => {
        if (hasAnimated.current) return;
        if (followsPrevious) firstCountAt.current = performance.now() + Math.max(delay, 0) * 1000;
        run(delay);
      };

      if (continues) {
        run(0);
      } else if (followsPrevious && firstCountAt.current !== null) {
        // The first count was already scheduled: wait only for what is left of its delay, and
        // count toward the latest value when it is due.
        run(Math.max(firstCountAt.current - performance.now(), 0) / 1000);
      } else if (animateOnView && "IntersectionObserver" in window) {
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
    }, [animateOnView, delay, duration, followsPrevious, origin, value]);

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
