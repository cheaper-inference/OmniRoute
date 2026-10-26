"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import SecurityTab from "../components/SecurityTab";

export default function SettingsSecurityPage() {
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={tSidebar("settingsSecurity")}
        description={tSidebar("settingsSecuritySubtitle")}
      />
      <SecurityTab />
    </div>
  );
}
