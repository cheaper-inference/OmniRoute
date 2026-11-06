"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import ExportCodeModal from "@/app/(dashboard)/dashboard/playground/components/ExportCodeModal";
import type { PlaygroundState } from "@/lib/playground/codeExport";

export type ActiveTab = "search" | "scrape" | "compare";

interface SearchToolsTopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  latencyMs?: number | null;
  costUsd?: number | null;
  exportState?: PlaygroundState;
}

const TABS: { id: ActiveTab; icon: string; labelKey: "tabSearch" | "tabScrape" | "tabCompare" }[] =
  [
    { id: "search", icon: "search", labelKey: "tabSearch" },
    { id: "scrape", icon: "description", labelKey: "tabScrape" },
    { id: "compare", icon: "balance", labelKey: "tabCompare" },
  ];

export default function SearchToolsTopBar({
  activeTab,
  onTabChange,
  latencyMs,
  costUsd,
  exportState,
}: SearchToolsTopBarProps) {
  const t = useTranslations("search");
  const tPlayground = useTranslations("playground");
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-alt"
        data-testid="search-tools-topbar"
      >
        {/* Tab switcher */}
        <Tabs
          variant="capsule"
          value={activeTab}
          onValueChange={(next) => onTabChange(next as ActiveTab)}
        >
          <TabsList aria-label={t("searchTools")}>
            {TABS.map((tab) => (
              // The panel is rendered by SearchToolsClient (id="tabpanel-<tab>"), not a TabsContent.
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                id={`tab-${tab.id}`}
                aria-controls={`tabpanel-${tab.id}`}
                data-testid={`tab-${tab.id}`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{t(tab.labelKey)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Metrics + export */}
        <div className="flex items-center gap-3">
          {latencyMs != null && (
            <span className="text-[11px] text-text-muted" data-testid="metric-latency">
              {latencyMs}ms
            </span>
          )}
          {costUsd != null && (
            <span className="text-[11px] text-text-muted" data-testid="metric-cost">
              ${costUsd.toFixed(4)}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportOpen(true)}
            aria-label={tPlayground("exportCode")}
            data-testid="export-code-button"
          >
            <span className="font-mono text-[11px]">{"/>"}</span>
            <span>{tPlayground("exportShort")}</span>
          </Button>
        </div>
      </div>

      {exportOpen && exportState != null && (
        <ExportCodeModal onClose={() => setExportOpen(false)} state={exportState} />
      )}
    </>
  );
}
