"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import BudgetTab from "../../usage/components/BudgetTab";

export default function CostsBudgetPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        compact
        title={tSidebar("costsBudget")}
        description={tHeader("costsBudgetDescription")}
      />
      <BudgetTab />
    </div>
  );
}
