"use client";

import { NumberTicker } from "@omniroute/ui-kit/number-ticker";

const defaultFormat = (n: number) => new Intl.NumberFormat().format(n);

/**
 * A number that eases toward its new value whenever `value` changes, so a counter that moved
 * is noticeable: the kit `NumberTicker`, counting on from the number on screen
 * (`from="previous"`) and showing the first value as it is (`initial="static"`).
 *
 * - `format` is applied to every frame, so the output keeps the caller's exact formatting.
 * - `integer` (default) rounds the in-flight value before formatting, so counters never show
 *   fractions mid-count. Pass `integer={false}` for money so cents are preserved.
 * - `duration` is in milliseconds; omitted, the count takes the kit's default time.
 * - A missing or non-finite value counts as zero.
 * - The kit names the ticker with the final value (`aria-label`), so assistive tech does not read
 *   the in-between frames. Pass `decorative` where an ancestor already carries the accessible
 *   value and hides this one (`aria-hidden`): the ticker then takes no name of its own.
 * - The kit honours `prefers-reduced-motion`: the new value is shown immediately.
 */
export default function AnimatedNumber({
  value,
  format = defaultFormat,
  duration,
  integer = true,
  decorative = false,
  className,
}: {
  value: number | null | undefined;
  format?: (n: number) => string;
  duration?: number;
  integer?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const target = Number.isFinite(Number(value)) ? Number(value) : 0;
  return (
    <NumberTicker
      className={className}
      value={target}
      from="previous"
      initial="static"
      duration={duration === undefined ? undefined : duration / 1000}
      valueFormatter={(n) => format(integer ? Math.round(n) : n)}
      {...(decorative ? { "aria-label": undefined } : undefined)}
    />
  );
}
