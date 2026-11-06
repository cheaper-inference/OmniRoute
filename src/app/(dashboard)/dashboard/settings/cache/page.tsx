"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import CacheSettingsTab from "../components/CacheSettingsTab";

export default function SettingsCachePage() {
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={tSidebar("settingsCache")}
        description={tSidebar("settingsCacheSubtitle")}
      />
      <CacheSettingsTab />
    </div>
  );
}
