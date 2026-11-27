"use client";

import Card from "@/shared/components/Card";
import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";

/** Per-key prompt-compression policy used by the API key permissions modal. */
export function ApiKeyCompressionToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const tSettings = useTranslations("settings");

  return (
    <Card.Section className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tSettings("compressionTitle")}</p>
        <p className="text-xs text-text-muted">{tSettings("compressionDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={enabled}
        onChange={() => onToggle()}
        ariaLabel={tSettings("compressionTitle")}
      />
    </Card.Section>
  );
}
