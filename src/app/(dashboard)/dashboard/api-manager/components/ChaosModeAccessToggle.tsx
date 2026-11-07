"use client";

import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";

/**
 * Chaos Mode access toggle for the API Key permissions modal — gates a single
 * API key's ability to call the Chaos Mode dispatch endpoints
 * (`POST /api/chaos/run`, `POST /api/skills/collect/chaos`) via the
 * `chaosModeEnabled` permission. Extracted out of ApiManagerPageClient.tsx
 * (frozen god-file — see config/quality/file-size-baseline.json) following the
 * same pattern as UsageLimitSettings.tsx.
 */
export function ChaosModeAccessToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const tChaos = useTranslations("chaosConfig");

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-warning/20 bg-warning/5">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tChaos("keyPermission")}</p>
        <p className="text-xs text-text-muted">{tChaos("keyPermissionDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={enabled}
        onChange={() => onToggle()}
        ariaLabel={tChaos("keyPermission")}
      />
    </div>
  );
}
