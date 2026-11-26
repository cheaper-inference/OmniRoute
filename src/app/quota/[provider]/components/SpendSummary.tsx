"use client";

import { useLocale, useTranslations } from "next-intl";
import { Stat, StatRow } from "@omniroute/ui-kit/stat";

import type { SelfUsageResponse } from "@/shared/schemas/selfUsage";

interface SpendSummaryProps {
  summary: SelfUsageResponse["summary"];
}

/** The period's totals: requests, tokens, and the billed cost next to the list price. */
export default function SpendSummary({ summary }: SpendSummaryProps) {
  const t = useTranslations("quotaSelf");
  const locale = useLocale();

  return (
    <StatRow columns={2}>
      <Stat
        label={t("spendRequests")}
        value={summary.requests}
        format="number"
        locale={locale}
        animate={false}
      />
      <Stat
        label={t("spendTokens")}
        value={summary.totalTokens}
        format="compact"
        locale={locale}
        animate={false}
      />
      <Stat
        label={t("spendCost")}
        value={summary.costUsd}
        format="currency"
        currency="USD"
        hint={t("spendCostHint")}
        locale={locale}
        animate={false}
      />
      <Stat
        label={t("spendListPrice")}
        value={summary.listPriceUsd}
        format="currency"
        currency="USD"
        hint={t("spendListPriceHint")}
        locale={locale}
        animate={false}
      />
    </StatRow>
  );
}
