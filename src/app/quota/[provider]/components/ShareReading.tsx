"use client";

import { useTranslations } from "next-intl";

import type { Policy, QuotaUnit } from "@/lib/quota/dimensions";
import type { SelfQuotaShare } from "@/shared/schemas/selfQuota";

import { shareFootnote } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";
import QuotaReading from "./QuotaReading";

interface ShareReadingProps {
  share: SelfQuotaShare;
  unit: QuotaUnit;
  policy: Policy;
}

/** The key's own part of a window: its bar with what is left, or the "no reserved share" line. */
export default function ShareReading({ share, unit, policy }: ShareReadingProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const footnote = shareFootnote(share, unit, policy, t, number);

  if (share.fairShare <= 0) {
    return <p className="min-w-0 break-words text-xs text-text-muted">{footnote}</p>;
  }
  return (
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
}
