"use client";

import { useTranslations } from "next-intl";

import Card from "@/shared/components/Card";
import type { Policy } from "@/lib/quota/dimensions";
import type { SelfQuotaSharedDimension } from "@/shared/schemas/selfQuota";

import { windowKey } from "../lib/quotaText";
import QuotaReading from "./QuotaReading";
import ShareReading from "./ShareReading";

interface SharedWindowCardProps {
  dimension: SelfQuotaSharedDimension;
  policy: Policy;
}

/** One pool window: the whole pool's use, when the key may see it, and the key's own share. */
export default function SharedWindowCard({ dimension, policy }: SharedWindowCardProps) {
  const t = useTranslations("quotaSelf");
  const { unit, limit, total, yourShare } = dimension;

  return (
    <Card padding="sm" title={t(windowKey(dimension.window))} className="min-w-0">
      <div className="flex min-w-0 flex-col gap-3">
        {total ? (
          <QuotaReading
            label={t("barPool")}
            unit={unit}
            limit={limit}
            used={total.used}
            status={total.status}
            reason={total.reason}
            resetAt={total.resetAt}
          />
        ) : null}
        <ShareReading share={yourShare} unit={unit} policy={policy} />
      </div>
    </Card>
  );
}
