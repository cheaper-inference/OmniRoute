"use client";

import { useTranslations, useLocale } from "next-intl";
import Icon from "@/shared/components/Icon";
import { getActivityIcon } from "@/lib/audit/activityIcons";
import { relativeTime } from "@/lib/audit/timeline";
import type { AuditLogEntry } from "@/lib/compliance/index";

interface ActivityItemProps {
  entry: AuditLogEntry;
  referenceNowMs?: number;
}

export default function ActivityItem({ entry, referenceNowMs }: ActivityItemProps) {
  const t = useTranslations("activity");
  const locale = useLocale();

  const action = typeof entry.action === "string" ? entry.action : "";
  const actor = typeof entry.actor === "string" ? entry.actor : "system";
  const target = typeof entry.target === "string" ? entry.target : "";
  const timestamp = typeof entry.timestamp === "string" ? entry.timestamp : "";

  const { icon, i18nKeyVerb } = getActivityIcon(action);

  const safeLocale = locale === "pt-BR" ? "pt-BR" : "en";
  const timeAgo = timestamp ? relativeTime(timestamp, safeLocale, referenceNowMs) : "";

  // Build human phrase — fall back to raw action if key not found
  let phrase: string;
  try {
    phrase = t(`eventVerb.${i18nKeyVerb}`, { actor, target: target || action });
  } catch {
    phrase = `${actor} — ${action}`;
  }

  return (
    <li className="flex items-start gap-3 px-4 py-3 hover:bg-bg-subtle transition-colors">
      <Icon name={icon} size={20} className="flex-shrink-0 mt-0.5 text-primary" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-main truncate" title={phrase}>
          {phrase}
        </p>
        {target && <p className="text-xs text-text-muted truncate mt-0.5">{target}</p>}
      </div>
      <time
        dateTime={timestamp}
        className="flex-shrink-0 text-xs text-text-muted whitespace-nowrap mt-0.5"
        title={timestamp}
      >
        {timeAgo}
      </time>
    </li>
  );
}
