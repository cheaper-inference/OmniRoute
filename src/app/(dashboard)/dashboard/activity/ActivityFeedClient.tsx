"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { Skeleton } from "@/shared/components/Loading";
import type { AuditLogEntry } from "@/lib/compliance/index";
import ActivityFeed from "./components/ActivityFeed";
import EventTypeFilter, { type EventCategory, matchesCategory } from "./components/EventTypeFilter";

const FEED_LIMIT = 200;

export default function ActivityFeedClient() {
  const t = useTranslations("activity");
  const [allEntries, setAllEntries] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<EventCategory>("all");
  // State (not a ref) because it is rendered: refs cannot be read during
  // render, and Date.now() cannot run there either — the fetch settles it.
  const [referenceNowMs, setReferenceNowMs] = useState<number>(0);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        level: "high",
        limit: String(FEED_LIMIT),
      });
      const res = await fetch(`/api/compliance/audit-log?${params.toString()}`);
      if (!res.ok) {
        throw new Error(t("description"));
      }
      const data = (await res.json()) as AuditLogEntry[];
      // Reset reference time on fresh load so relative timestamps are stable
      setReferenceNowMs(Date.now());
      setAllEntries(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t("fetchFailed");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void (async () => {
      await fetchEntries();
    })();
  }, [fetchEntries]);

  const filtered =
    category === "all"
      ? allEntries
      : allEntries.filter((e) => {
          const action = typeof e.action === "string" ? e.action : "";
          return matchesCategory(action, category);
        });

  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={t("title")}
        description={t("description")}
        actions={
          <Button
            variant="outline"
            icon="refresh"
            loading={loading}
            onClick={() => fetchEntries()}
            aria-label={t("refreshAria")}
          >
            {loading ? t("loading") : t("refresh")}
          </Button>
        }
      />

      {/* Filter */}
      <EventTypeFilter value={category} onChange={setCategory} />

      {/* Error */}
      {error && (
        <Alert
          variant="critical"
          icon={<Icon name="error" size={16} />}
          dismissLabel={t("dismissError")}
          onDismiss={() => setError(null)}
          description={error}
        />
      )}

      {/* Feed */}
      <Card padding="none" className="overflow-hidden">
        {loading ? (
          <div className="flex flex-col gap-3 p-4" aria-busy="true">
            <span className="ci-sr-only">{t("loadingActivity")}</span>
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <ActivityFeed entries={filtered} referenceNowMs={referenceNowMs} />
        )}
      </Card>
    </div>
  );
}
