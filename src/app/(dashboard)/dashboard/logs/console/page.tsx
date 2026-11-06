"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ConsoleLogViewer from "@/shared/components/ConsoleLogViewer";

export default function LogsConsolePage() {
  const t = useTranslations("logs");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader compact title={t("console")} />
      <ConsoleLogViewer />
    </div>
  );
}
