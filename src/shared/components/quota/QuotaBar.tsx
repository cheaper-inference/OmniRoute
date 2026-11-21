"use client";

import type React from "react";

export interface QuotaBarProps {
  /** Visible label and accessible name of the bar. */
  label: string;
  /** 0..100. Values outside the range are clamped, and NaN counts as 0. */
  percent: number;
  /** Visible value on the right, for example "42%". */
  valueLabel: string;
  /** Text alternative of the value (aria-valuetext). Defaults to `valueLabel`. */
  valueText?: string;
  /** Line under the bar, such as a reset time or a note. */
  caption?: React.ReactNode;
  /** `auto` colours the fill by thresholds. `muted` draws a neutral fill for stale readings. */
  tone?: "auto" | "muted";
  /** `sm` is the compact dashboard bar. `md` is taller with larger text. */
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: { text: "text-[10px]", track: "h-1.5", header: "" },
  md: { text: "text-xs", track: "h-2.5", header: " gap-2" },
} as const;

function clampPercent(percent: number): number {
  if (Number.isNaN(percent)) return 0;
  return Math.min(Math.max(percent, 0), 100);
}

function autoFill(percent: number): string {
  if (percent >= 90) return "bg-error";
  if (percent >= 70) return "bg-warning";
  return "bg-primary";
}

function autoValueColor(percent: number): string {
  if (percent >= 90) return "text-error";
  if (percent >= 70) return "text-warning";
  return "";
}

/**
 * A labelled percentage bar with no text of its own. Every visible word comes from the props, so
 * the bar can be shared by pages that load different translation namespaces.
 */
export default function QuotaBar({
  label,
  percent,
  valueLabel,
  valueText,
  caption,
  tone = "auto",
  size = "sm",
}: QuotaBarProps): React.JSX.Element {
  const pct = clampPercent(percent);
  const sizes = SIZE_CLASSES[size];
  const fillColor = tone === "muted" ? "bg-border-strong" : autoFill(pct);
  const valueColor = tone === "muted" ? "" : autoValueColor(pct);

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div
        className={`flex items-center justify-between${sizes.header} ${sizes.text} text-text-muted`}
      >
        <span className="min-w-0 break-words font-semibold uppercase tracking-wide">{label}</span>
        <span className={`shrink-0 tabular-nums font-semibold ${valueColor}`}>{valueLabel}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-valuetext={valueText ?? valueLabel}
        className={`${sizes.track} overflow-hidden rounded-sm bg-border/60`}
      >
        <div
          className={`h-full rounded-sm transition-all ${fillColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption ? <div className={`${sizes.text} text-text-muted`}>{caption}</div> : null}
    </div>
  );
}
