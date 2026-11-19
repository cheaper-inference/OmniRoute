"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ApiEndpointsTab from "../endpoint/ApiEndpointsTab";

export default function ApiEndpointsPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        compact
        title={tSidebar("apiEndpoints")}
        description={tHeader("apiEndpointsDescription")}
      />
      <ApiEndpointsTab />
    </div>
  );
}
