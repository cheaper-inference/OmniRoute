"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";

import ModalityBridgeAudioTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeAudioTab";
import ModalityBridgeVideoTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVideoTab";
import ModalityBridgeVisionTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVisionTab";

type TabId = "vision" | "audio" | "video";

const TABS: ReadonlyArray<{ id: TabId; labelKey: string }> = [
  { id: "vision", labelKey: "modalityBridgeVisionTab" },
  { id: "audio", labelKey: "modalityBridgeAudioTab" },
  { id: "video", labelKey: "modalityBridgeVideoTab" },
];

function ModalityBridgePageContent() {
  const t = useTranslations("settings");
  const tSidebar = useTranslations("sidebar");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo<TabId>(() => {
    const requested = searchParams.get("tab") as TabId | null;
    return requested && TABS.some((tab) => tab.id === requested) ? requested : "vision";
  }, [searchParams]);

  const handleTabChange = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        compact
        title={tSidebar("settingsModalityBridge")}
        description={t("modalityBridgeIntro")}
      />
      <Tabs
        variant="underline"
        value={activeTab}
        onValueChange={(next) => handleTabChange(next as TabId)}
      >
        <TabsList
          aria-label={t("modalityBridgeSubTabsAria")}
          className="max-w-full overflow-x-auto"
        >
          {TABS.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {t(tab.labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="pt-4">
            {tab.id === "vision" && <ModalityBridgeVisionTab />}
            {tab.id === "audio" && <ModalityBridgeAudioTab />}
            {tab.id === "video" && <ModalityBridgeVideoTab />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default function ModalityBridgePage() {
  return (
    <Suspense fallback={null}>
      <ModalityBridgePageContent />
    </Suspense>
  );
}
