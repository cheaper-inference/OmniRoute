"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { SegmentedControl } from "@/shared/components";
import ChangelogViewer from "./components/ChangelogViewer";
import NewsViewer from "./components/NewsViewer";

export default function ChangelogPage() {
  const t = useTranslations("changelogPage");
  const [activeTab, setActiveTab] = useState<"news" | "changelog">("news");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={t("title")}
        description={t("description")}
        actions={
          <SegmentedControl
            aria-label={t("viewLabel")}
            options={[
              { label: t("newsTab"), value: "news" },
              { label: t("changelogTab"), value: "changelog" },
            ]}
            value={activeTab}
            onChange={(val) => setActiveTab(val as "news" | "changelog")}
          />
        }
      />

      {/* Each viewer renders its own kit Cards (one per announcement / release). */}
      <div className="min-h-[500px]">
        {activeTab === "news" ? <NewsViewer /> : <ChangelogViewer />}
      </div>
    </div>
  );
}
