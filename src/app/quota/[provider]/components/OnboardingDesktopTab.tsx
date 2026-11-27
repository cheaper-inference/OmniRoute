"use client";

import { useTranslations } from "next-intl";

import OnboardingCodeBlock from "./OnboardingCodeBlock";
import OnboardingCopyButton from "./OnboardingCopyButton";

interface OnboardingDesktopTabProps {
  /** The published address, or the placeholder when there is none. */
  baseUrl: string;
  baseUrlKnown: boolean;
  /** The key while the holder asks for it, the placeholder otherwise. */
  credential: string;
  includeKey: boolean;
  /** The inferenceModels block, or null when the key came with no model. */
  modelsJson: string | null;
}

/**
 * The Claude Desktop tab: the values of the Gateway credentials card and the model list. A copy
 * button exists only for a real value, never for a placeholder.
 */
export default function OnboardingDesktopTab({
  baseUrl,
  baseUrlKnown,
  credential,
  includeKey,
  modelsJson,
}: OnboardingDesktopTabProps) {
  const t = useTranslations("quotaSelf");
  const rows = [
    { term: t("onboardingDesktopBaseUrl"), value: baseUrl },
    { term: t("onboardingDesktopApiKey"), value: credential },
    {
      term: t("onboardingDesktopCredentialKind"),
      value: t("onboardingDesktopCredentialKindValue"),
    },
    { term: t("onboardingDesktopAuthScheme"), value: t("onboardingDesktopAuthSchemeValue") },
  ];
  return (
    <div className="min-w-0 space-y-4">
      <p className="break-words text-sm text-text-muted">{t("onboardingDesktopHelp")}</p>
      <dl className="grid min-w-0 gap-3">
        {rows.map((row) => (
          <div key={row.term} className="min-w-0 space-y-0.5">
            <dt className="break-words text-sm text-text-muted">{row.term}</dt>
            <dd className="min-w-0 break-all font-mono text-xs text-text-main">{row.value}</dd>
          </div>
        ))}
      </dl>
      {baseUrlKnown || includeKey ? (
        <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-2">
          {baseUrlKnown ? (
            <OnboardingCopyButton text={baseUrl} label={t("onboardingCopyBaseUrl")} />
          ) : null}
          {includeKey ? (
            <OnboardingCopyButton text={credential} label={t("onboardingCopyApiKey")} />
          ) : null}
        </div>
      ) : null}
      {modelsJson === null ? null : (
        <div className="min-w-0 space-y-2">
          <p className="break-words text-sm text-text-muted">{t("onboardingDesktopModelsHelp")}</p>
          <OnboardingCodeBlock
            text={modelsJson}
            label={t("onboardingDesktopModelsBlockLabel")}
            copyLabel={t("onboardingCopyModels")}
          />
        </div>
      )}
    </div>
  );
}
