"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import SystemStorageTab from "../components/SystemStorageTab";
import StorageIntegrityCheckControl from "../components/StorageIntegrityCheckControl";

export default function SettingsStoragePage() {
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={tSidebar("settingsGeneral")}
        description={tSidebar("settingsGeneralSubtitle")}
      />
      <StorageIntegrityCheckControl />
      <SystemStorageTab />
    </div>
  );
}
