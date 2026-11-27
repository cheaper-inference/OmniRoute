"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ExclusionsPanel from "./ExclusionsPanel";

export default function CompressionExclusionsPage() {
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader compact title={tSidebar("compressionExclusions")} />
      <ExclusionsPanel />
    </div>
  );
}
