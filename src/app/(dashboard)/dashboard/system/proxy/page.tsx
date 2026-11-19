"use client";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ProxyTab from "@/app/(dashboard)/dashboard/settings/components/ProxyTab";

export default function ProxyPage() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-4">
      <PageHeader compact title={tSidebar("proxy")} description={tHeader("proxyDescription")} />
      <ProxyTab />
    </div>
  );
}
