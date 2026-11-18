"use client";

import { cn } from "@/shared/utils/cn";
import { getBarColor } from "./utils";

interface Props {
  /** Remaining percentage (0-100). Lower = worse. */
  percent: number;
  /** Accessible name of the bar: the quota it measures. */
  label: string;
  /** Visual height — h-1 (4px, default) or h-1.5 (6px). */
  size?: "xs" | "sm";
  className?: string;
}

export default function QuotaMiniBar({ percent, label, size = "xs", className }: Props) {
  const colors = getBarColor(percent);
  const heightCls = size === "sm" ? "h-1.5" : "h-1";
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("rounded-full overflow-hidden bg-surface-2", heightCls, className)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-300 ease-out"
        style={{
          width: `${clamped}%`,
          background: colors.bar,
        }}
      />
    </div>
  );
}
