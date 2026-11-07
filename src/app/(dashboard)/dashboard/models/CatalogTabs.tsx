"use client";

import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import type { CatalogTab } from "./catalogUrlState";

const TAB_ORDER: CatalogTab[] = ["models", "combos"];

export function catalogTabId(tab: CatalogTab): string {
  return `tab-${tab}`;
}

export function catalogPanelId(tab: CatalogTab): string {
  return `panel-${tab}`;
}

/**
 * Kit underline Tabs (WAI-ARIA tablist; the kit owns roving tabindex and Arrow/Home/End).
 * The tab/panel ids stay the page's own (`tab-*` / `panel-*`) because the panels are
 * rendered by the page, outside this component.
 */
export default function CatalogTabs({
  activeTab,
  onSelect,
  labels,
  ariaLabel,
}: {
  activeTab: CatalogTab;
  onSelect: (tab: CatalogTab) => void;
  labels: Record<CatalogTab, string>;
  ariaLabel: string;
}) {
  return (
    <Tabs
      variant="underline"
      value={activeTab}
      onValueChange={(next) => onSelect(next as CatalogTab)}
      className="mt-2"
    >
      <TabsList aria-label={ariaLabel}>
        {TAB_ORDER.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            id={catalogTabId(tab)}
            aria-controls={tab === activeTab ? catalogPanelId(tab) : undefined}
          >
            {labels[tab]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
