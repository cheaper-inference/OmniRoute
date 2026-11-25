"use client";

import { useState } from "react";
import { Progress } from "@omniroute/ui-kit/progress";

import { useTranslations } from "next-intl";
import type { QuotaDimension } from "@/lib/quota/dimensions";

interface DimensionBarProps {
  dimension: QuotaDimension;
  consumedTotal: number;
  /** ISO string for next reset, or null */
  resetAt?: string | null;
}

function fmtCountdown(ms: number): string {
  if (ms <= 0) return "now";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `${d}d ${h % 24}h`;
  }
  return `${h}h ${m}m`;
}

export default function DimensionBar({ dimension, consumedTotal, resetAt }: DimensionBarProps) {
  const t = useTranslations("quotaShare");
  // Capture mount time once — avoids impure Date.now() call on every render
  const [now] = useState(() => Date.now());
  const usedPct = dimension.limit > 0 ? Math.min((consumedTotal / dimension.limit) * 100, 100) : 0;

  const barTone = usedPct >= 90 ? "danger" : usedPct >= 70 ? "warning" : "default";

  const resetMs = resetAt ? new Date(resetAt).getTime() - now : null;
  const countdown = resetMs !== null && resetMs > 0 ? fmtCountdown(resetMs) : null;

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center justify-between text-3xs text-text-muted">
        <span className="ci-eyebrow" data-size="3xs" data-weight="medium">
          {dimension.unit} / {dimension.window}
        </span>
        <span
          className={`tabular-nums font-semibold ${
            usedPct >= 90 ? "text-error" : usedPct >= 70 ? "text-warning" : ""
          }`}
        >
          {Math.round(usedPct)}%
        </span>
      </div>
      <Progress
        value={usedPct}
        size="sm"
        tone={barTone}
        animate={false}
        aria-label={`${dimension.unit} / ${dimension.window}`}
      />
      {countdown && (
        <div className="text-3xs text-text-muted">
          {t("dimensionResetIn")} {countdown}
        </div>
      )}
    </div>
  );
}
