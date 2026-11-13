"use client";

// src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { StreamMetrics } from "@/shared/schemas/playground";
import { SegmentedPanel, SegmentedTabs } from "@/shared/components/SegmentedControl";
import StudioTopBar, { type StudioTab } from "./components/StudioTopBar";
import StudioConfigPane, { type ConfigState } from "./components/StudioConfigPane";
import { DEFAULT_PARAMS } from "./components/ParamSliders";
import CompareTab from "./components/tabs/CompareTab";

// Lazy-load tabs to reduce initial bundle size
const ChatTab = dynamic(() => import("./components/tabs/ChatTab"), { ssr: false });
const ApiTab = dynamic(() => import("./components/tabs/ApiTab"), { ssr: false });
const BuildTab = dynamic(() => import("./components/tabs/BuildTab"), { ssr: false });

const INITIAL_METRICS: StreamMetrics = {
  ttftMs: null,
  totalMs: null,
  tokensIn: 0,
  tokensOut: 0,
  tps: null,
  costUsd: null,
};

const INITIAL_CONFIG: ConfigState = {
  endpoint: "chat.completions",
  baseUrl: typeof window !== "undefined" ? window.location.origin : "http://localhost:20128",
  model: "",
  systemPrompt: "You are a helpful assistant.",
  params: DEFAULT_PARAMS,
};

function resolveTab(value: string | null): StudioTab {
  if (value === "chat" || value === "compare" || value === "api" || value === "build") {
    return value;
  }
  return "chat";
}

/**
 * PlaygroundStudio — orchestrator component for the Playground Studio.
 * - Manages active tab state (supports ?tab=chat|compare|api|build deep-link)
 * - Manages shared configState for all tabs
 * - Renders StudioTopBar + content + StudioConfigPane
 *
 * F7 SLOTS:
 * - SLOT_PRESETS: F7 will replace the comment in StudioConfigPane with PresetPicker
 * - SLOT_IMPROVE: F7 will replace the comment in StudioConfigPane with ImprovePromptButton
 */
export function PlaygroundStudio() {
  const searchParams = useSearchParams();
  // Derive active tab from URL — no effect needed, avoids setState-in-effect lint violation.
  // When URL changes (client nav), searchParams updates, component re-renders with new tab.
  const activeTab: StudioTab = resolveTab(searchParams.get("tab"));
  const [manualTab, setManualTab] = useState<StudioTab | null>(null);
  const effectiveTab = manualTab ?? activeTab;

  const [configState, setConfigState] = useState<ConfigState>(INITIAL_CONFIG);
  const [metrics, setMetrics] = useState<StreamMetrics>(INITIAL_METRICS);

  function handleTabChange(tab: StudioTab) {
    setManualTab(tab);
  }

  function handleMetricsUpdate(m: StreamMetrics) {
    setMetrics(m);
  }

  return (
    <SegmentedTabs
      value={effectiveTab}
      onChange={(tab) => handleTabChange(tab as StudioTab)}
      className="h-[calc(100vh-4rem)] gap-0 overflow-hidden"
    >
      {/* Top bar with tabs + token/cost counter + export button */}
      <StudioTopBar
        metrics={metrics}
        exportState={{
          endpoint: configState.endpoint,
          baseUrl: configState.baseUrl,
          model: configState.model,
          systemPrompt: configState.systemPrompt,
          params: configState.params,
        }}
      />

      {/* Main content area: tab content + config pane */}
      {/* Below md the pane stacks under the tab content (#18071): a side column at 390 px
          left the chat ~100 px wide. Stacked, the tab content keeps a 10rem minimum (the pane
          shrinks and scrolls instead) and scrolls itself, since ApiTab has no height of its own. */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Tab content */}
        <div className="min-h-40 flex-1 overflow-y-auto md:min-h-0 md:overflow-hidden">
          <SegmentedPanel value="chat" className="h-full">
            <ChatTab configState={configState} onMetricsUpdate={handleMetricsUpdate} />
          </SegmentedPanel>
          <SegmentedPanel value="compare" className="h-full">
            <CompareTab configState={configState} />
          </SegmentedPanel>
          <SegmentedPanel value="api" className="h-full">
            <ApiTab configState={configState} />
          </SegmentedPanel>
          <SegmentedPanel value="build" className="h-full">
            <BuildTab configState={configState} />
          </SegmentedPanel>
        </div>

        {/* Config pane — always visible, collapsible */}
        {/* SLOT_PRESETS and SLOT_IMPROVE are inside StudioConfigPane */}
        <StudioConfigPane configState={configState} setConfigState={setConfigState} />
      </div>
    </SegmentedTabs>
  );
}
