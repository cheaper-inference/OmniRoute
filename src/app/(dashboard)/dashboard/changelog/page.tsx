"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { SegmentedControl, SegmentedPanel, SegmentedTabs } from "@/shared/components";
import ChangelogViewer from "./components/ChangelogViewer";
import NewsViewer from "./components/NewsViewer";

export default function ChangelogPage() {
  const t = useTranslations("changelogPage");
  const [activeTab, setActiveTab] = useState<"news" | "changelog">("news");

  return (
    <SegmentedTabs
      value={activeTab}
      onChange={(val) => setActiveTab(val as "news" | "changelog")}
      className="gap-6"
    >
      <PageHeader
        compact
        title={t("title")}
        description={t("description")}
        actions={
          <SegmentedControl
            semantics="tabs"
            aria-label={t("viewLabel")}
            options={[
              { label: t("newsTab"), value: "news" },
              { label: t("changelogTab"), value: "changelog" },
            ]}
          />
        }
      />

      {/* Each viewer renders its own kit Cards (one per announcement / release). */}
      <SegmentedPanel value="news" className="min-h-[500px]">
        <NewsViewer />
      </SegmentedPanel>
      <SegmentedPanel value="changelog" className="min-h-[500px]">
        <ChangelogViewer />
      </SegmentedPanel>
    </SegmentedTabs>
  );
}
