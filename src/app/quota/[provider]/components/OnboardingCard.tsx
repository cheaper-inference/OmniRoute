"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";

import Card from "@/shared/components/Card";

import { deriveOnboardingState, onboardingTextFingerprint } from "../lib/onboardingState";
import { useStoredApiKey } from "../lib/useStoredApiKey";
import OnboardingOptions from "./OnboardingOptions";
import OnboardingTabs from "./OnboardingTabs";

interface OnboardingCardProps {
  provider: string;
  providerName: string;
  /** Model ids the key may call, as the quota answer lists them. */
  availableModels: readonly string[];
  /** Public API origin the server publishes, or null when it publishes none. */
  apiBaseUrl: string | null;
}

/**
 * Shows the holder of the key how to point their tools at this gateway. The choices live only
 * in this component: the page mounts it while it has a quota answer for the current key, so a
 * forgotten or changed key, a refused or failed answer and a reload all start it over with the
 * key hidden. The key is read from the key store at render, and only while the holder asks.
 */
export default function OnboardingCard({
  provider,
  providerName,
  availableModels,
  apiBaseUrl,
}: OnboardingCardProps) {
  const t = useTranslations("quotaSelf");
  const titleId = useId();
  const { stored } = useStoredApiKey();
  const [includeKey, setIncludeKey] = useState(false);
  const [mainModel, setMainModel] = useState<string | null>(null);
  const [longContext, setLongContext] = useState(false);
  const [pageHostname] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hostname
  );

  const input = {
    provider,
    availableModels,
    apiBaseUrl,
    // With the choice off the builder gets no key at all and writes the placeholder.
    apiKey: includeKey ? (stored?.key ?? null) : null,
    pageHostname,
    choices: { includeKey, mainModel, longContext },
    texts: {
      keyPlaceholder: t("onboardingKeyPlaceholder"),
      baseUrlPlaceholder: t("onboardingBaseUrlPlaceholder"),
    },
  };
  const state = deriveOnboardingState(input);
  // The choice plus the texts without the key: any change of a generated text gives each tab a
  // fresh copy status, and the key never enters this value.
  const resetKey = `${includeKey}|${onboardingTextFingerprint(input)}`;
  const keyShown = includeKey && Boolean(stored?.key);

  return (
    <Card padding="md">
      <section aria-labelledby={titleId} className="min-w-0 space-y-4">
        <div className="min-w-0 space-y-1">
          <h2 id={titleId} className="ci-heading break-words">
            {t("onboardingTitle")}
          </h2>
          <p className="break-words text-sm text-text-muted">{t("onboardingIntro")}</p>
        </div>
        {state.baseUrlKnown ? null : (
          <Alert variant="warning" dismissible={false} description={t("onboardingNoBaseUrl")} />
        )}
        <OnboardingOptions
          state={state}
          includeKey={includeKey}
          onIncludeKey={setIncludeKey}
          onMainModel={setMainModel}
          onLongContext={setLongContext}
        />
        <OnboardingTabs
          state={state}
          providerName={providerName}
          resetKey={resetKey}
          includeKey={keyShown}
        />
      </section>
    </Card>
  );
}
