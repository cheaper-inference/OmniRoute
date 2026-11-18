"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import EvalsTab from "../../usage/components/EvalsTab";

export default function AnalyticsEvalsPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tSidebar("analyticsEvals")}
        description={tHeader("analyticsEvalsDescription")}
      />
      <EvalsTab />
    </div>
  );
}
