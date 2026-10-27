"use client";

import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";

/**
 * Controls whether GET /v1/models adds `claude/...` compatibility mirrors for
 * this key. It only changes discovery output; the underlying model/combo
 * permissions remain authoritative for dispatch.
 */
export function ApiKeyCcDiscoveryAliasesToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const tSettings = useTranslations("settings");

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tSettings("ccDiscoveryAliasesTitle")}</p>
        <p className="text-xs text-text-muted">{tSettings("ccDiscoveryAliasesDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={enabled}
        onChange={() => onToggle()}
        ariaLabel={tSettings("ccDiscoveryAliasesTitle")}
      />
    </div>
  );
}
