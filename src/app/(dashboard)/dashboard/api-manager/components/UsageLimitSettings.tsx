"use client";

import Toggle from "@/shared/components/Toggle";

import Input from "@/shared/components/Input";
import { useTranslations } from "next-intl";

export function UsageLimitSettings({
  enabled,
  dailyLimitUsd,
  weeklyLimitUsd,
  onEnabledChange,
  onDailyLimitUsdChange,
  onWeeklyLimitUsdChange,
}: {
  enabled: boolean;
  dailyLimitUsd: string;
  weeklyLimitUsd: string;
  /** Kept for callers; the switch state is conveyed by the kit Switch itself. */
  enabledLabel: string;
  disabledLabel: string;
  onEnabledChange: (enabled: boolean) => void;
  onDailyLimitUsdChange: (value: string) => void;
  onWeeklyLimitUsdChange: (value: string) => void;
}) {
  const t = useTranslations("usageLimits");
  return (
    <div className="mt-1 rounded-lg border border-success/20 bg-success/5 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("usdUsageQuota")}</p>
          <p className="text-xs text-text-muted">{t("usdUsageQuotaDescription")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={enabled}
          onChange={onEnabledChange}
          ariaLabel={t("usdUsageQuota")}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Input
          label={t("dailyQuotaUsd")}
          type="number"
          min={0}
          step="0.01"
          value={dailyLimitUsd}
          onChange={(event) => onDailyLimitUsdChange(event.target.value)}
          placeholder="0.00"
        />
        <Input
          label={t("weeklyQuotaUsd")}
          type="number"
          min={0}
          step="0.01"
          value={weeklyLimitUsd}
          onChange={(event) => onWeeklyLimitUsdChange(event.target.value)}
          placeholder="0.00"
        />
      </div>
      <p className="mt-2 text-[11px] text-text-muted">{t("quotaWindowDescription")}</p>
    </div>
  );
}
