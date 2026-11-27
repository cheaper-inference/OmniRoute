"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Chart } from "@omniroute/ui-kit/chart";

import type { SelfUsageResponse } from "@/shared/schemas/selfUsage";

import { USAGE_DAY_FORMAT } from "../lib/quotaFormat";
import { useFormatNumber } from "../lib/useFormatNumber";

interface SpendDailyChartProps {
  daily: SelfUsageResponse["daily"];
}

/** Tokens per day of the period; a single day is no series and draws nothing. */
export default function SpendDailyChart({ daily }: SpendDailyChartProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const number = useFormatNumber();
  if (daily.length < 2) return null;

  const data = daily.map((day) => ({
    label: format.dateTime(new Date(day.date), USAGE_DAY_FORMAT),
    value: day.totalTokens,
  }));

  return (
    <div className="min-w-0 space-y-2">
      <h3 className="text-sm">{t("spendDailyTitle")}</h3>
      <Chart
        variant="bar"
        data={data}
        ariaLabel={t("spendDailyAria")}
        valueFormatter={(value) => number(value, { maximumFractionDigits: 0 })}
        animate={false}
        height={200}
      />
    </div>
  );
}
