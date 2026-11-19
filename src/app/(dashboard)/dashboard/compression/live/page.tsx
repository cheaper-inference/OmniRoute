"use client";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { CompressionCockpit } from "../studio/CompressionCockpit";
import { useLiveCompression } from "@/hooks/useLiveCompression";
export default function CompressionLivePage() {
  const t = useTranslations("compressionStudio");
  const { lastRun } = useLiveCompression();
  return (
    // The route is not in the sidebar, so the shell never had a title for it: the page names
    // itself. The cockpit keeps the rest of the fixed-height column.
    <div className="flex h-[calc(100dvh-6rem)] min-h-[480px] flex-col gap-4 p-4">
      <PageHeader compact title={t("liveTitle")} />
      <div className="min-h-0 flex-1">
        <CompressionCockpit run={lastRun} />
      </div>
    </div>
  );
}
