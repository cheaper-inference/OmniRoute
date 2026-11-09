"use client";
import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import GlobalConfigTab from "./proxy/GlobalConfigTab";
import ProxyPoolTab from "./proxy/ProxyPoolTab";
import FreePoolTab from "./proxy/FreePoolTab";
import DocumentationTab from "./proxy/DocumentationTab";
import SubscriptionTab from "./proxy/SubscriptionTab";

type TabId = "global-config" | "proxy-pool" | "free-pool" | "documentation" | "subscriptions";

const TABS: Array<{ id: TabId; labelKey: string; fallback: string }> = [
  { id: "global-config", labelKey: "proxyGlobalConfigTab", fallback: "Global config" },
  { id: "proxy-pool", labelKey: "proxyPoolTab", fallback: "Proxy pool" },
  { id: "free-pool", labelKey: "freePoolTab", fallback: "Free pool" },
  { id: "documentation", labelKey: "proxyDocumentationTab", fallback: "Documentation" },
  { id: "subscriptions", labelKey: "proxySubscriptionsTab", fallback: "Subscriptions" },
];

export default function ProxyTab() {
  const t = useTranslations("settings");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const translateOrFallback = (key: string, fallback: string) =>
    typeof t.has === "function" && !t.has(key) ? fallback : t(key);

  const activeTab = useMemo<TabId>(() => {
    const tabParam = searchParams.get("tab") as TabId | null;
    return tabParam && TABS.some((tab) => tab.id === tabParam) ? tabParam : "global-config";
  }, [searchParams]);

  const handleTabChange = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      variant="underline"
      value={activeTab}
      onValueChange={(next) => handleTabChange(next as TabId)}
      className="flex flex-col gap-4"
    >
      <TabsList
        aria-label={translateOrFallback("proxySubTabsAria", "Proxy sections")}
        className="max-w-full overflow-x-auto"
      >
        {TABS.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="whitespace-nowrap">
            {translateOrFallback(tab.labelKey, tab.fallback)}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="global-config">
        <GlobalConfigTab />
      </TabsContent>
      <TabsContent value="proxy-pool">
        <ProxyPoolTab />
      </TabsContent>
      <TabsContent value="free-pool">
        <FreePoolTab />
      </TabsContent>
      <TabsContent value="documentation">
        <DocumentationTab />
      </TabsContent>
      <TabsContent value="subscriptions">
        <SubscriptionTab />
      </TabsContent>
    </Tabs>
  );
}
