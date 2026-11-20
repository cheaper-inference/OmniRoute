"use client";

import { useTranslations } from "next-intl";

import Card from "@/shared/components/Card";
import type { Policy } from "@/lib/quota/dimensions";
import type { SelfQuotaAccountDimension } from "@/shared/schemas/selfQuota";

import { windowKey } from "../lib/quotaText";
import QuotaReading from "./QuotaReading";
import ShareReading from "./ShareReading";

interface AccountWindowCardProps {
  dimension: SelfQuotaAccountDimension;
  policy: Policy;
}

/** One account window: how full the account is for everyone, and the key's own part of it. */
export default function AccountWindowCard({ dimension, policy }: AccountWindowCardProps) {
  const t = useTranslations("quotaSelf");
  const { unit, limit, account, yourShare } = dimension;

  return (
    <Card padding="sm" title={t(windowKey(dimension.window))} className="min-w-0">
      <div className="flex min-w-0 flex-col gap-3">
        {account ? (
          <QuotaReading
            label={t("barAccount")}
            unit={unit}
            limit={limit}
            used={account.used}
            status={account.status}
            reason={account.reason}
            resetAt={account.resetAt}
          />
        ) : null}
        <ShareReading share={yourShare} unit={unit} policy={policy} />
      </div>
    </Card>
  );
}
