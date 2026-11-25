"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Notice from "@/shared/components/Notice";

interface HistoricSessionBannerProps {
  sessionName: string | null;
  onBackToLive: () => void;
}

export function HistoricSessionBanner({ sessionName, onBackToLive }: HistoricSessionBannerProps) {
  const t = useTranslations("trafficInspector");
  return (
    <Notice
      variant="warning"
      layout="inline"
      icon="history"
      actions={
        <Button variant="outline" size="sm" icon="sensors" onClick={onBackToLive}>
          {t("backToLive")}
        </Button>
      }
    >
      {t("viewingRecordedSession")} — <strong>{sessionName ?? t("untitledSession")}</strong>
    </Notice>
  );
}
