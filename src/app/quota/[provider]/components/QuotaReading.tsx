"use client";

import { useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";
import QuotaBar from "@/shared/components/quota/QuotaBar";
import type { QuotaUnit } from "@/lib/quota/dimensions";
import type { SelfQuotaStatus } from "@/shared/schemas/selfQuota";

import { amountText, isDrawableReading, percentLabel, reasonKey, usedText } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";
import ReadingCaption from "./ReadingCaption";

interface QuotaReadingProps {
  label: string;
  unit: QuotaUnit;
  limit: number;
  used: number | null;
  status: SelfQuotaStatus;
  reason?: string;
  resetAt?: string | null;
  footnote?: string;
}

/**
 * One reading: a bar when it was read, otherwise its label, a "not available" badge and the
 * reason. An unread value, or one without a usable scale, is never drawn as zero.
 */
export default function QuotaReading(props: QuotaReadingProps) {
  const { label, unit, limit, used, status, reason, resetAt, footnote } = props;
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();

  if (status === "unavailable" || !isDrawableReading(limit, used)) {
    // A reading that was read but has no usable scale gets the generic sentence.
    const sentence = status === "unavailable" ? reasonKey(reason) : "reasonUnknown";
    return (
      <div className="flex min-w-0 flex-col gap-1 text-xs text-text-muted">
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="min-w-0 break-words font-semibold uppercase tracking-wide">{label}</span>
          <Badge size="sm">{t("unavailableBadge")}</Badge>
        </span>
        <p className="min-w-0 break-words">{t(sentence)}</p>
      </div>
    );
  }

  const percent = (used / limit) * 100;
  const valueText =
    unit === "percent"
      ? t("usedPercent", { percent: Math.round(percent) })
      : t("usedOf", {
          used: usedText(unit, used, t, number),
          limit: amountText(unit, limit, t, number),
        });

  const stale = status === "stale";
  return (
    <QuotaBar
      size="md"
      tone={stale ? "muted" : "auto"}
      label={label}
      percent={percent}
      valueLabel={percentLabel(percent, t)}
      valueText={valueText}
      caption={
        stale || resetAt || footnote ? (
          <ReadingCaption stale={stale} resetAt={resetAt} footnote={footnote} />
        ) : undefined
      }
    />
  );
}
