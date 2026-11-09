"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/shared/components/EmptyState";
import { groupByDay } from "@/lib/audit/timeline";
import type { AuditLogEntry } from "@/lib/compliance/index";
import DayHeader from "./DayHeader";
import ActivityItem from "./ActivityItem";

interface ActivityFeedProps {
  entries: AuditLogEntry[];
  referenceNowMs?: number;
}

export default function ActivityFeed({ entries, referenceNowMs }: ActivityFeedProps) {
  const t = useTranslations("activity");

  if (!entries.length) {
    return (
      <div role="status" aria-live="polite" data-testid="activity-empty-state">
        <EmptyState
          icon="timeline"
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          className="border-0"
        />
      </div>
    );
  }

  const groups = groupByDay(entries, referenceNowMs);

  return (
    <div className="divide-y divide-border" data-testid="activity-feed">
      {groups.map((group) => (
        <section key={group.dayKey} aria-label={group.label}>
          <DayHeader label={group.label} dayKey={group.dayKey} />
          <ul className="divide-y divide-border">
            {group.entries.map((entry, idx) => (
              <ActivityItem
                key={typeof entry.id === "number" ? entry.id : `${group.dayKey}-${idx}`}
                entry={entry}
                referenceNowMs={referenceNowMs}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
