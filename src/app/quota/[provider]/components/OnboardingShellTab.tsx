"use client";

import { useTranslations } from "next-intl";

import OnboardingCodeBlock from "./OnboardingCodeBlock";

interface OnboardingShellTabProps {
  /** Export lines for the published address, or for the placeholder when there is none. */
  publicExports: string;
  /** The same lines with this page's host, or null when no local network address applies. */
  localExports: string | null;
}

/** The Shell tab: the settings as export lines, one block per network profile. */
export default function OnboardingShellTab({
  publicExports,
  localExports,
}: OnboardingShellTabProps) {
  const t = useTranslations("quotaSelf");
  return (
    <div className="min-w-0 space-y-4">
      <p className="break-words text-sm text-text-muted">{t("onboardingShellHelp")}</p>
      <div className="min-w-0 space-y-2">
        <h3 className="break-words text-sm">{t("onboardingProfilePublic")}</h3>
        <OnboardingCodeBlock
          text={publicExports}
          label={t("onboardingShellPublicBlockLabel")}
          copyLabel={t("onboardingCopyShellPublic")}
        />
      </div>
      {localExports === null ? null : (
        <div className="min-w-0 space-y-2">
          <h3 className="break-words text-sm">{t("onboardingProfileLocal")}</h3>
          <p className="break-words text-sm text-text-muted">{t("onboardingProfileLocalHint")}</p>
          <OnboardingCodeBlock
            text={localExports}
            label={t("onboardingShellLocalBlockLabel")}
            copyLabel={t("onboardingCopyShellLocal")}
          />
        </div>
      )}
    </div>
  );
}
