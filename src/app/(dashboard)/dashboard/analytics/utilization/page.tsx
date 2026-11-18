"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ProviderUtilizationTab from "../ProviderUtilizationTab";

export default function AnalyticsUtilizationPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tSidebar("analyticsUtilization")}
        description={tHeader("analyticsUtilizationDescription")}
      />
      <ProviderUtilizationTab />
    </div>
  );
}
