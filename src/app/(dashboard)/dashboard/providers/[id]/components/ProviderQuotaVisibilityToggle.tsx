"use client";

import { Button } from "@/shared/components";

import { useTranslations } from "next-intl";

import { providerText } from "../providerPageHelpers";

interface ProviderQuotaVisibilityToggleProps {
  visible: boolean;
  onToggle: (visible: boolean) => void;
}

export default function ProviderQuotaVisibilityToggle({
  visible,
  onToggle,
}: ProviderQuotaVisibilityToggleProps) {
  const t = useTranslations("providers");
  const actionLabel = visible
    ? providerText(t, "hideConnectionFromProviderQuota", "Hide this account from Provider Quota")
    : providerText(t, "showConnectionInProviderQuota", "Show this account in Provider Quota");

  return (
    <>
      <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
      <Button
        variant="ghost"
        size="sm"
        icon={visible ? "visibility" : "visibility_off"}
        onClick={() => onToggle(!visible)}
        aria-pressed={visible}
        aria-label={actionLabel}
        className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
          visible
            ? "bg-info/15 text-info hover:bg-info/25"
            : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
        }`}
        title={actionLabel}
      >
        {providerText(t, "providerQuotaShort", "Quota")}
      </Button>
    </>
  );
}
