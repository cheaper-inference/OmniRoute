"use client";

import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";

/**
 * "Bypass provider quota cutoffs" toggle for the API Key permissions modal.
 * Extracted out of ApiManagerPageClient.tsx (frozen god-file — see
 * config/quality/file-size-baseline.json) following the same pattern as
 * UsageLimitSettings.tsx — pure UI move, no behavior change.
 */
export function BypassProviderQuotaToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-warning/20 bg-warning/5">
      <div className="flex flex-col gap-1 pr-2">
        <p className="text-sm font-medium text-text-main">{t("bypassProviderQuota")}</p>
        <p className="text-xs text-text-muted">{t("bypassProviderQuotaDescription")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={enabled}
        onChange={() => onToggle()}
        ariaLabel={t("bypassProviderQuota")}
      />
    </div>
  );
}
