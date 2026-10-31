"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

interface HistoricSessionBannerProps {
  sessionName: string | null;
  onBackToLive: () => void;
}

export function HistoricSessionBanner({ sessionName, onBackToLive }: HistoricSessionBannerProps) {
  const t = useTranslations("trafficInspector");
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-3 rounded-control border border-warning/40 bg-warning-bg px-3 py-2 text-sm text-text-main"
    >
      <div className="flex items-center gap-2">
        <Icon name="history" size={16} className="text-warning" />
        <span>
          {t("viewingRecordedSession")} — <strong>{sessionName ?? t("untitledSession")}</strong>
        </span>
      </div>
      <Button variant="outline" size="sm" icon="sensors" onClick={onBackToLive}>
        {t("backToLive")}
      </Button>
    </div>
  );
}
