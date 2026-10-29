"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ProxyLogger from "@/shared/components/ProxyLogger";

export default function LogsProxyPage() {
  const t = useTranslations("logs");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader compact title={t("proxyLogs")} />
      <ProxyLogger />
    </div>
  );
}
