"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Switch } from "@omniroute/ui-kit/switch";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import MemoryConceptCard from "./components/MemoryConceptCard";
import MemoriesTab from "./components/tabs/MemoriesTab";
import PlaygroundTab from "./components/tabs/PlaygroundTab";
import EngineTab from "./components/tabs/EngineTab";
import { useMemorySettings } from "./hooks/useMemorySettings";

type TabId = "memories" | "playground" | "engine";

const TABS: TabId[] = ["memories", "engine", "playground"];

function MemoryPageContent() {
  const t = useTranslations("memory");
  const tSidebar = useTranslations("sidebar");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { settings, save } = useMemorySettings();
  const memoryEnabled = settings?.enabled ?? true;

  const rawTab = searchParams.get("tab") ?? "";
  const activeTab: TabId = TABS.includes(rawTab as TabId) ? (rawTab as TabId) : "memories";

  const setTab = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Page title (lote 7 pendência 12): the shell title hides when a PageHeader is present. */}
      <PageHeader compact title={tSidebar("memory")} description={tSidebar("memorySubtitle")} />
      {/* Concept card */}
      <MemoryConceptCard />

      {/* Tab navigation + memory enable toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs variant="capsule" value={activeTab} onValueChange={(next) => setTab(next as TabId)}>
          <TabsList aria-label={t("title")}>
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-testid={`tab-${tab}`}
                // The panels below are rendered by this page, not by TabsContent.
                aria-controls={undefined}
              >
                {t(`tabs.${tab}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Switch
          data-testid="memory-enabled-toggle"
          label={t("memoryEnabled")}
          side="right"
          checked={memoryEnabled}
          onCheckedChange={() => void save({ enabled: !memoryEnabled })}
        />
      </div>

      {/* Tab content */}
      {activeTab === "memories" && <MemoriesTab />}
      {activeTab === "playground" && <PlaygroundTab />}
      {activeTab === "engine" && <EngineTab />}
    </div>
  );
}

export default function MemoryPage() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center" />}>
      <MemoryPageContent />
    </Suspense>
  );
}
