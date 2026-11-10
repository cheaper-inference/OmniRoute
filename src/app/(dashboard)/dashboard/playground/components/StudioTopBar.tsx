"use client";

import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import SegmentedControl from "@/shared/components/SegmentedControl";

// src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import TokenCostCounter from "./TokenCostCounter";
import ExportCodeModal from "./ExportCodeModal";
import type { StreamMetrics } from "@/shared/schemas/playground";
import type { PlaygroundState } from "@/lib/playground/codeExport";

export type StudioTab = "chat" | "compare" | "api" | "build";

interface StudioTopBarProps {
  activeTab: StudioTab;
  onTabChange: (tab: StudioTab) => void;
  metrics: StreamMetrics;
  /** Optional playground state for the Export code modal. If omitted, a minimal state is used. */
  exportState?: PlaygroundState;
}

interface TabConfig {
  id: StudioTab;
  labelKey: "tabChat" | "tabCompare" | "tabApi" | "tabBuild";
  icon: string;
}

const TABS: TabConfig[] = [
  { id: "chat", labelKey: "tabChat", icon: "chat" },
  { id: "compare", labelKey: "tabCompare", icon: "compare" },
  { id: "api", labelKey: "tabApi", icon: "api" },
  { id: "build", labelKey: "tabBuild", icon: "build" },
];

/**
 * Top bar with tab switcher, token/cost counter, and export code button.
 * Export code modal uses ExportCodeModal (F7) when exportState is provided.
 */
export default function StudioTopBar({
  activeTab,
  onTabChange,
  metrics,
  exportState,
}: StudioTopBarProps) {
  const t = useTranslations("playground");
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-border bg-bg-alt shrink-0">
        {/* Tabs (kit capsule tabs via the SegmentedControl adapter) */}
        <SegmentedControl
          options={TABS.map((tab) => ({ value: tab.id, label: t(tab.labelKey), icon: tab.icon }))}
          value={activeTab}
          onChange={(value) => onTabChange(value as StudioTab)}
          aria-label={t("playgroundTabs")}
          size="sm"
        />

        {/* Right side: token counter + export button */}
        <div className="flex items-center gap-3">
          <TokenCostCounter
            tokensIn={metrics.tokensIn}
            tokensOut={metrics.tokensOut}
            costUsd={metrics.costUsd}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportOpen(true)}
            className="gap-1 text-xs text-text-muted"
            title={t("exportCode")}
            aria-label={t("exportCode")}
          >
            <span className="font-mono text-[11px]" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span>{t("exportShort")}</span>
          </Button>
        </div>
      </div>

      {/* Export code modal — uses ExportCodeModal (F7) */}
      {exportOpen && exportState != null && (
        <ExportCodeModal state={exportState} onClose={() => setExportOpen(false)} />
      )}
      <Modal
        isOpen={exportOpen && exportState == null}
        onClose={() => setExportOpen(false)}
        title={t("exportCodeTitle")}
      >
        <p className="text-sm text-text-muted">{t("noStateToExport")}</p>
      </Modal>
    </>
  );
}
