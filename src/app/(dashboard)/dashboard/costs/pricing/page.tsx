"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import PricingTab from "../../settings/components/PricingTab";

export default function CostsPricingPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        compact
        title={tSidebar("costsPricing")}
        description={tHeader("costsPricingDescription")}
      />
      <PricingTab />
    </div>
  );
}
