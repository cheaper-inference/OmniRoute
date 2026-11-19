"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import FreeBudgetCard from "@/app/(dashboard)/dashboard/usage/components/FreeBudgetCard";

export default function FreeTiersPage() {
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="flex flex-col gap-4">
      <PageHeader compact title={tSidebar("costsFreeTiers")} />
      <FreeBudgetCard />
    </div>
  );
}
