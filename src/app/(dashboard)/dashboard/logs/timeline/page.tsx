"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import RequestTimeline from "@/shared/components/RequestTimeline";

function LogsTimelinePageContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  return (
    <div className="h-full min-h-0">
      <RequestTimeline initialSelectedId={initialId} />
    </div>
  );
}

export default function LogsTimelinePage() {
  const t = useTranslations("logs");
  const tSidebar = useTranslations("sidebar");
  return (
    // The header takes its own height and the timeline keeps the rest of the column.
    <div className="flex h-full min-h-0 flex-col gap-4">
      <PageHeader compact title={tSidebar("logsTimeline")} />
      <div className="min-h-0 flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12 text-text-muted text-sm">
              {t("loading")}
            </div>
          }
        >
          <LogsTimelinePageContent />
        </Suspense>
      </div>
    </div>
  );
}
