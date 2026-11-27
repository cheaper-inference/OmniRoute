"use client";

import { useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";
import type { NewsSeverity } from "@/shared/utils/releaseNotes";

const BADGE_VARIANT = { info: "info", warning: "warning", critical: "error" } as const;

const LABEL_KEY = {
  info: "announcementSeverityInfo",
  warning: "announcementSeverityWarning",
  critical: "announcementSeverityCritical",
} as const;

/** Names an announcement's severity in text, so the level never depends on color alone. */
export default function NewsSeverityBadge({
  severity,
  className,
}: {
  severity: NewsSeverity;
  className?: string;
}) {
  const t = useTranslations("common");
  return (
    <Badge variant={BADGE_VARIANT[severity]} size="sm" className={className}>
      {t(LABEL_KEY[severity])}
    </Badge>
  );
}
