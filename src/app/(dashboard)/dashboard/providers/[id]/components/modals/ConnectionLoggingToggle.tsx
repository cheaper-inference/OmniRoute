"use client";

import { useTranslations } from "next-intl";
import { Toggle } from "@/shared/components";

/**
 * Per-connection "Logging" switch. When off, every request routed through this
 * connection withholds its message content from call logs (metadata — timestamp,
 * model, provider, status, duration, token counts, errors — is still recorded).
 * Mirrors CommandCodeZdrToggle's shape; the persisted key is
 * providerSpecificData.noLog (default unset = logging ON).
 */
export default function ConnectionLoggingToggle({
  checked,
  onChange,
}: {
  checked: boolean | undefined;
  onChange: (checked: boolean) => void;
}) {
  const t = useTranslations("providers");
  return (
    <Toggle
      checked={checked !== false}
      onChange={onChange}
      label={t("loggingToggle")}
      description={t("loggingDescription")}
    />
  );
}
