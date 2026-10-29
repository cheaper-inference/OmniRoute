"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ResilienceTab from "../components/ResilienceTab";

export default function SettingsResiliencePage() {
  const t = useTranslations("settings");
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={tSidebar("settingsResilience")}
        description={`${t("resilienceSettingsIntro")} ${t("resilienceStructureDesc")}`}
      />
      <ResilienceTab />
    </div>
  );
}
