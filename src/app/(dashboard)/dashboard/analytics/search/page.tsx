"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import SearchAnalyticsTab from "../SearchAnalyticsTab";

export default function AnalyticsSearchPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tSidebar("analyticsSearch")}
        description={tHeader("analyticsSearchDescription")}
      />
      <SearchAnalyticsTab />
    </div>
  );
}
