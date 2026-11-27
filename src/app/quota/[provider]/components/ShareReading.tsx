"use client";

import { useTranslations } from "next-intl";

import type { Policy, QuotaUnit } from "@/lib/quota/dimensions";
import type { SelfQuotaShare } from "@/shared/schemas/selfQuota";

import { amountText, isDrawableReading, shareFootnote } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";
import QuotaReading from "./QuotaReading";

interface ShareReadingProps {
  share: SelfQuotaShare;
  unit: QuotaUnit;
  policy: Policy;
}

/**
 * The key's own part of a window: its bar with what is left, or the "no reserved share" line. A
 * percent share that was read also says it is an estimate and, when both are known, its two parts.
 */
export default function ShareReading({ share, unit, policy }: ShareReadingProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const footnote = shareFootnote(share, unit, policy, t, number);

  if (share.fairShare <= 0) {
    return <p className="min-w-0 break-words text-xs text-text-muted">{footnote}</p>;
  }
  const reading = (
    <QuotaReading
      label={t("barYourShare")}
      unit={unit}
      limit={share.fairShare}
      used={share.consumed}
      status={share.status}
      reason={share.reason}
      footnote={footnote}
    />
  );
  const estimate =
    unit === "percent" &&
    share.status !== "unavailable" &&
    isDrawableReading(share.fairShare, share.consumed);
  if (!estimate) return reading;

  const { attributed, external } = share;
  const parts =
    typeof attributed === "number" &&
    typeof external === "number" &&
    Number.isFinite(attributed) &&
    Number.isFinite(external);
  return (
    <div className="flex min-w-0 flex-col gap-1">
      {reading}
      <p className="min-w-0 break-words text-xs text-text-muted">{t("sharePercentEstimate")}</p>
      {parts ? (
        <p className="min-w-0 break-words text-xs text-text-muted">
          {t("sharePercentParts", {
            own: amountText("percent", attributed, t, number),
            external: amountText("percent", external, t, number),
          })}
        </p>
      ) : null}
    </div>
  );
}
