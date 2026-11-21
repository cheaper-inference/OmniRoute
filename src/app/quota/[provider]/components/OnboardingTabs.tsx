"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";

import type { OnboardingState } from "../lib/onboardingState";
import OnboardingClaudeCodeTab from "./OnboardingClaudeCodeTab";
import OnboardingDesktopTab from "./OnboardingDesktopTab";
import OnboardingShellTab from "./OnboardingShellTab";

interface OnboardingTabsProps {
  state: OnboardingState;
  providerName: string;
  /** Choices and shape only, never the key: a new value gives each tab a fresh copy status. */
  resetKey: string;
  includeKey: boolean;
}

/** One tab per tool. Only the active panel is in the page, each built from the same state. */
export default function OnboardingTabs({
  state,
  providerName,
  resetKey,
  includeKey,
}: OnboardingTabsProps) {
  const t = useTranslations("quotaSelf");
  return (
    <Tabs defaultValue="claude-code" className="min-w-0">
      <TabsList aria-label={t("onboardingTabsLabel")} className="max-w-full flex-wrap">
        <TabsTrigger value="claude-code">{t("onboardingTabClaudeCode")}</TabsTrigger>
        <TabsTrigger value="shell">{t("onboardingTabShell")}</TabsTrigger>
        <TabsTrigger value="desktop">{t("onboardingTabDesktop")}</TabsTrigger>
      </TabsList>
      <TabsContent value="claude-code" className="min-w-0 pt-3">
        <OnboardingClaudeCodeTab
          key={resetKey}
          settingsJson={state.settingsJson}
          discovery={state.models.length === 0}
          providerName={providerName}
        />
      </TabsContent>
      <TabsContent value="shell" className="min-w-0 pt-3">
        <OnboardingShellTab
          key={resetKey}
          publicExports={state.publicExports}
          localExports={state.localExports}
        />
      </TabsContent>
      <TabsContent value="desktop" className="min-w-0 pt-3">
        <OnboardingDesktopTab
          key={resetKey}
          baseUrl={state.baseUrl}
          baseUrlKnown={state.baseUrlKnown}
          credential={state.credential}
          includeKey={includeKey}
          modelsJson={state.desktopModelsJson}
        />
      </TabsContent>
    </Tabs>
  );
}
