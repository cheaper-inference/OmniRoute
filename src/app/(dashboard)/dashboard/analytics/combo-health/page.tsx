"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ComboHealthTab from "../ComboHealthTab";

export default function AnalyticsComboHealthPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tSidebar("analyticsComboHealth")}
        description={tHeader("analyticsComboHealthDescription")}
      />
      <ComboHealthTab />
    </div>
  );
}
