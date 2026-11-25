"use client";

import type React from "react";
import { Progress } from "@omniroute/ui-kit/progress";
import type { ProgressTone } from "@omniroute/ui-kit/progress";

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
  sm: { text: "text-3xs", eyebrow: "3xs", header: "" },
  md: { text: "text-xs", eyebrow: undefined, header: " gap-2" },
} as const;

/** Neutral fill for a stale reading. It is the same token as the border-strong utility. */
const MUTED_FILL = "var(--color-border-strong)";

function clampPercent(percent: number): number {
  if (Number.isNaN(percent)) return 0;
  return Math.min(Math.max(percent, 0), 100);
}

function autoTone(percent: number): ProgressTone {
  if (percent >= 90) return "danger";
  if (percent >= 70) return "warning";
  return "default";
}

function autoValueColor(percent: number): string {
  if (percent >= 90) return "text-error";
  if (percent >= 70) return "text-warning";
  return "";
}

/**
 * A labelled percentage bar with no text of its own. Every visible word comes from the props, so
 * the bar can be shared by pages that load different translation namespaces. The track and fill
 * are the kit Progress, exposed as a named meter from 0 to 100.
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
  const muted = tone === "muted";
  const valueColor = muted ? "" : autoValueColor(pct);

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div
        className={`flex items-center justify-between${sizes.header} ${sizes.text} text-text-muted`}
      >
        <span
          className="ci-eyebrow min-w-0 break-words"
          data-size={sizes.eyebrow}
          data-weight="medium"
        >
          {label}
        </span>
        <span className={`shrink-0 tabular-nums font-semibold ${valueColor}`}>{valueLabel}</span>
      </div>
      <Progress
        value={Math.round(pct)}
        max={100}
        size={size}
        semantics="meter"
        animate={false}
        tone={muted ? "default" : autoTone(pct)}
        color={muted ? MUTED_FILL : undefined}
        aria-label={label}
        aria-valuetext={valueText ?? valueLabel}
      />
      {caption ? <div className={`${sizes.text} text-text-muted`}>{caption}</div> : null}
    </div>
  );
}
