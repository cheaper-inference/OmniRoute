"use client";

import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";

/**
 * Per-key access to the built-in `auto/*` combos, used by the API key
 * permissions modal.
 *
 * `auto/*` ids are virtual, so `allowedCombos` cannot constrain them — this is
 * the only per-key gate that reaches them. Enabled by default: a key that has
 * never been configured keeps the historical access.
 */
export function ApiKeyAutoCombosToggle({
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
        <p className="text-sm font-medium text-text-main">{tSettings("autoCombosTitle")}</p>
        <p className="text-xs text-text-muted">{tSettings("autoCombosDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={enabled}
        onChange={() => onToggle()}
        ariaLabel={tSettings("autoCombosTitle")}
      />
    </div>
  );
}
