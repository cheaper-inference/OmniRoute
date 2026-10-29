"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12 text-text-muted text-sm">
          {t("loading")}
        </div>
      }
    >
      <LogsTimelinePageContent />
    </Suspense>
  );
}
