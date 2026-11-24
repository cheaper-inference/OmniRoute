"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuotaDimension } from "@/lib/quota/dimensions";
import QuotaBar from "@/shared/components/quota/QuotaBar";

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

  const resetMs = resetAt ? new Date(resetAt).getTime() - now : null;
  const countdown = resetMs !== null && resetMs > 0 ? fmtCountdown(resetMs) : null;

  return (
    <QuotaBar
      size="sm"
      label={`${dimension.unit} / ${dimension.window}`}
      percent={usedPct}
      valueLabel={`${Math.round(usedPct)}%`}
      caption={
        countdown ? (
          <>
            {t("dimensionResetIn")} {countdown}
          </>
        ) : null
      }
    />
  );
}
