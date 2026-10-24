"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import EmptyState from "@/shared/components/EmptyState";
import Icon from "@/shared/components/Icon";
import { HeadersTab } from "./tabs/HeadersTab";
import { RequestBodyTab } from "./tabs/RequestBodyTab";
import { ResponseBodyTab } from "./tabs/ResponseBodyTab";
import { TimingTab } from "./tabs/TimingTab";
import { LlmDetailsTab } from "./tabs/LlmDetailsTab";
import { ConversationTab } from "./tabs/ConversationTab";
import { StatsTab } from "./tabs/StatsTab";
import { AnnotationField } from "./shared/AnnotationField";

type TabId = "conversation" | "headers" | "request" | "response" | "timing" | "llm" | "stats";

interface Tab {
  id: TabId;
  labelKey: string;
  icon: string;
  llmOnly?: boolean;
}

const TABS: Tab[] = [
  { id: "conversation", labelKey: "tabConversation", icon: "chat_bubble" },
  { id: "headers", labelKey: "tabHeaders", icon: "list" },
  { id: "request", labelKey: "tabRequest", icon: "upload" },
  { id: "response", labelKey: "tabResponse", icon: "download" },
  { id: "timing", labelKey: "tabTiming", icon: "timer" },
  { id: "llm", labelKey: "tabLlm", icon: "psychology", llmOnly: true },
  { id: "stats", labelKey: "tabStats", icon: "bar_chart" },
];

interface DetailsPanelProps {
  request: InterceptedRequest | null;
  allRequests: InterceptedRequest[];
}

export function DetailsPanel({ request, allRequests }: DetailsPanelProps) {
  const t = useTranslations("trafficInspector");
  const [activeTab, setActiveTab] = useState<TabId>("conversation");

  if (!request) {
    return (
      <div data-testid="details-panel" className="h-full flex items-center justify-center p-4">
        <EmptyState icon="info" title={t("selectRequest")} />
      </div>
    );
  }

  const isLlm = request.detectedKind === "llm";
  const visibleTabs = TABS.filter((t) => !t.llmOnly || isLlm);

  // Ensure active tab is valid
  const currentTab = visibleTabs.find((t) => t.id === activeTab) ? activeTab : "conversation";

  return (
    <div data-testid="details-panel" className="h-full flex flex-col overflow-hidden">
      {/* Tab bar + panels: kit Tabs; TabsContent renders only the selected panel, with
          role="tabpanel" wired to its trigger. */}
      <Tabs
        variant="underline"
        value={currentTab}
        onValueChange={(next) => setActiveTab(next as TabId)}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="shrink-0 border-b border-border bg-bg-subtle px-2 pt-1">
          <TabsList aria-label={t("requestDetails")} className="flex-wrap">
            {visibleTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-1 text-xs">
                <Icon name={tab.icon} size={13} />
                {t(tab.labelKey)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="conversation" className="flex-1 overflow-hidden">
          <ConversationTab request={request} />
        </TabsContent>
        <TabsContent value="headers" className="flex-1 overflow-hidden">
          <HeadersTab request={request} />
        </TabsContent>
        <TabsContent value="request" className="flex-1 overflow-hidden">
          <RequestBodyTab request={request} />
        </TabsContent>
        <TabsContent value="response" className="flex-1 overflow-hidden">
          <ResponseBodyTab request={request} />
        </TabsContent>
        <TabsContent value="timing" className="flex-1 overflow-hidden">
          <TimingTab request={request} />
        </TabsContent>
        {isLlm && (
          <TabsContent value="llm" className="flex-1 overflow-hidden">
            <LlmDetailsTab request={request} />
          </TabsContent>
        )}
        <TabsContent value="stats" className="flex-1 overflow-hidden">
          <StatsTab requests={allRequests} />
        </TabsContent>
      </Tabs>

      {/* Annotation footer */}
      <div className="shrink-0 border-t border-border px-3 py-2 bg-bg-subtle">
        <AnnotationField requestId={request.id} initialValue={request.annotation ?? ""} />
      </div>
    </div>
  );
}
