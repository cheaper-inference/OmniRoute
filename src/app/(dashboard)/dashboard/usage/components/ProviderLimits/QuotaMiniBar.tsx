"use client";

import { Progress } from "@omniroute/ui-kit/progress";
import { getBarColor } from "./utils";

interface Props {
  /** Remaining percentage (0-100). Lower = worse. */
  percent: number;
  /** Accessible name of the bar: the quota it measures. */
  label: string;
  /** Track height: `xs` (4px, default) or `sm` (6px). */
  size?: "xs" | "sm";
  className?: string;
}

/** The thin quota bar: the kit Progress in the quota status colour. */
export default function QuotaMiniBar({ percent, label, size = "xs", className }: Props) {
  return (
    <Progress
      semantics="meter"
      value={percent}
      size={size}
      color={getBarColor(percent).bar}
      animate={false}
      aria-label={label}
      className={className}
    />
  );
}
