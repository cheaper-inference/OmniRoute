"use client";

import { useTranslations } from "next-intl";

import OnboardingCodeBlock from "./OnboardingCodeBlock";

interface OnboardingClaudeCodeTabProps {
  /** The settings.json text built for the current choices. */
  settingsJson: string;
  /** No model came with the key: the settings ask the gateway for its models. */
  discovery: boolean;
  providerName: string;
}

/** The Claude Code tab: where the settings go and the settings themselves. */
export default function OnboardingClaudeCodeTab({
  settingsJson,
  discovery,
  providerName,
}: OnboardingClaudeCodeTabProps) {
  const t = useTranslations("quotaSelf");
  return (
    <div className="min-w-0 space-y-3">
      <p className="break-words text-sm text-text-muted">{t("onboardingSettingsHelp")}</p>
      {discovery ? (
        <p className="break-words text-sm text-text-muted">
          {t("onboardingNoModels", { provider: providerName })}
        </p>
      ) : null}
      <OnboardingCodeBlock
        text={settingsJson}
        label={t("onboardingSettingsBlockLabel")}
        copyLabel={t("onboardingCopySettings")}
      />
    </div>
  );
}
