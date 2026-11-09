"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import Icon from "@/shared/components/Icon";
import { UsageAnalytics, CardSkeleton } from "@/shared/components";
import EvalsTab from "../usage/components/EvalsTab";
import CacheHealthTab from "./CacheHealthTab";
import ComboHealthTab from "./ComboHealthTab";
import ProviderUtilizationTab from "./ProviderUtilizationTab";
import RouteExplainabilityTab from "./RouteExplainabilityTab";
import SearchAnalyticsTab from "./SearchAnalyticsTab";
import DiversityScoreCard from "./components/DiversityScoreCard";

type AnalyticsTab =
  "overview" | "evals" | "search" | "utilization" | "combo-health" | "cache-health" | "route-trace";

const ANALYTICS_TABS: Array<{
  id: AnalyticsTab;
  labelKey: string;
  label: string;
  icon: string;
}> = [
  { id: "overview", labelKey: "overview", label: "Overview", icon: "analytics" },
  { id: "evals", labelKey: "evals", label: "Evals", icon: "science" },
  { id: "search", labelKey: "search", label: "Search", icon: "travel_explore" },
  { id: "utilization", labelKey: "utilization", label: "Utilization", icon: "monitoring" },
  {
    id: "combo-health",
    labelKey: "comboHealth",
    label: "Combo Health",
    icon: "health_and_safety",
  },
  {
    id: "cache-health",
    labelKey: "cacheHealth",
    label: "Cache Health",
    icon: "database",
  },
  { id: "route-trace", labelKey: "routeTrace", label: "Route Trace", icon: "alt_route" },
];

type AnalyticsTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function analyticsText(t: AnalyticsTranslator, key: string, fallback: string) {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

function normalizeTab(tab: string | null): AnalyticsTab {
  if (tab === "route-trace" || tab === "route-explain") return "route-trace";
  if (
    tab === "evals" ||
    tab === "search" ||
    tab === "utilization" ||
    tab === "combo-health" ||
    tab === "cache-health"
  ) {
    return tab;
  }
  return "overview";
}

function AnalyticsPageContent() {
  const t = useTranslations("analytics") as AnalyticsTranslator;
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AnalyticsTab>(normalizeTab(searchParams.get("tab")));
  const [initialRequestId] = useState(searchParams.get("id") || "");

  useEffect(() => {
    if (searchParams.get("tab") !== "route-explain") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "route-trace");
    window.history.replaceState(null, "", url.toString());
  }, [searchParams]);

  const handleTabChange = (tab: AnalyticsTab) => {
    setActiveTab(tab);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (tab === "overview") url.searchParams.delete("tab");
    else url.searchParams.set("tab", tab);
    if (tab !== "route-trace") url.searchParams.delete("id");
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(next) => handleTabChange(next as AnalyticsTab)}
      className="flex flex-col gap-6"
    >
      <TabsList aria-label={t("sectionsAria")} className="flex-wrap">
        {ANALYTICS_TABS.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="gap-1.5">
            <Icon name={tab.icon} size={16} />
            {analyticsText(t, tab.labelKey, tab.label)}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="flex flex-col gap-6 focus-visible:outline-none">
        <Suspense fallback={<CardSkeleton />}>
          {activeTab === "overview" ? (
            <>
              <UsageAnalytics />
              <DiversityScoreCard />
            </>
          ) : null}
          {activeTab === "evals" ? <EvalsTab /> : null}
          {activeTab === "search" ? <SearchAnalyticsTab /> : null}
          {activeTab === "utilization" ? <ProviderUtilizationTab /> : null}
          {activeTab === "combo-health" ? <ComboHealthTab /> : null}
          {activeTab === "cache-health" ? <CacheHealthTab /> : null}
          {activeTab === "route-trace" ? (
            <RouteExplainabilityTab initialRequestId={initialRequestId} />
          ) : null}
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <AnalyticsPageContent />
    </Suspense>
  );
}
