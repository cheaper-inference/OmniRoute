"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import CompressionPanel from "./CompressionPanel";
import CompressionStylesTile from "../CompressionStylesTile";

export default function CompressionSettingsPage() {
  const tSidebar = useTranslations("sidebar");
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader compact title={tSidebar("contextSettings")} />
      <CompressionPanel />
      {/* D0: read-only telemetry tile (output-token savings + applied styles) */}
      <CompressionStylesTile />
    </div>
  );
}
