"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Icon, Modal, Spinner } from "@/shared/components";

interface NewModelsInboxModel {
  modelId: string;
  isFree: boolean;
  firstSeenAt: string;
}

interface NewModelsInboxGroup {
  provider: string;
  providerName: string;
  models: NewModelsInboxModel[];
}

interface NewModelsInboxResponse {
  totalUnseen?: number;
  groups?: NewModelsInboxGroup[];
}

async function fetchInbox(): Promise<{ totalUnseen: number; groups: NewModelsInboxGroup[] }> {
  const res = await fetch("/api/models/new", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as NewModelsInboxResponse;
  return {
    totalUnseen: typeof data.totalUnseen === "number" ? data.totalUnseen : 0,
    groups: Array.isArray(data.groups) ? data.groups : [],
  };
}

async function acknowledge(body: Record<string, unknown>): Promise<void> {
  const res = await fetch("/api/models/new/acknowledge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

type Translator = ReturnType<typeof useTranslations>;

function useNewModelsInbox() {
  const [unseenCount, setUnseenCount] = useState(0);
  const [groups, setGroups] = useState<NewModelsInboxGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const inbox = await fetchInbox();
      setGroups(inbox.groups);
      setUnseenCount(inbox.totalUnseen);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchInbox()
      .then((inbox) => {
        if (!cancelled) setUnseenCount(inbox.totalUnseen);
      })
      .catch(() => {
        // Badge is best-effort; the modal surfaces load errors.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const markRead = async (body: Record<string, unknown>) => {
    try {
      await acknowledge(body);
    } catch {
      setError(true);
      return;
    }
    await load();
  };

  return { unseenCount, groups, loading, error, load, markRead };
}

function NewModelsGroupCard({
  group,
  t,
  onMarkRead,
}: {
  group: NewModelsInboxGroup;
  t: Translator;
  onMarkRead: (group: NewModelsInboxGroup) => void;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-bg-subtle border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-text-main truncate">{group.providerName}</span>
          <Badge size="sm">{group.models.length}</Badge>
        </div>
        <Button size="sm" variant="ghost" onClick={() => onMarkRead(group)}>
          {t("newModelsMarkProviderRead")}
        </Button>
      </div>
      <div className="divide-y divide-border">
        {group.models.map((model) => (
          <div key={model.modelId} className="flex items-center gap-2 px-3 py-1.5">
            {model.isFree && (
              <Badge variant="success" size="sm" className="shrink-0">
                {t("freeBadge")}
              </Badge>
            )}
            <code className="text-xs font-mono text-text-muted truncate flex-1">
              {model.modelId}
            </code>
            <span className="text-xs text-text-muted shrink-0">
              {t("newModelsFirstSeen", { date: formatDate(model.firstSeenAt) })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewModelsModalBody({
  groups,
  loading,
  error,
  t,
  tc,
  onRetry,
  onMarkProviderRead,
}: {
  groups: NewModelsInboxGroup[];
  loading: boolean;
  error: boolean;
  t: Translator;
  tc: Translator;
  onRetry: () => void;
  onMarkProviderRead: (group: NewModelsInboxGroup) => void;
}) {
  if (loading && groups.length === 0) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-sm text-text-muted">
        <Spinner size="sm" decorative />
        {tc("loading")}
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-sm text-error">
        <span>{t("newModelsLoadError")}</span>
        <Button size="sm" variant="secondary" icon="refresh" onClick={onRetry}>
          {tc("retry")}
        </Button>
      </div>
    );
  }
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-sm text-text-muted text-center">
        <Icon name="new_releases" size={28} />
        <span className="font-medium text-text-main">{t("newModelsEmpty")}</span>
        <span className="text-xs">{t("newModelsEmptyDesc")}</span>
      </div>
    );
  }
  return groups.map((group) => (
    <NewModelsGroupCard key={group.provider} group={group} t={t} onMarkRead={onMarkProviderRead} />
  ));
}

/**
 * Providers-page button for the "New models" inbox: models that a model sync found
 * for the first time. Shows an unread badge and opens a modal grouped by provider.
 */
export default function NewModelsButton() {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const { unseenCount, groups, loading, error, load, markRead } = useNewModelsInbox();

  const handleOpen = () => {
    setOpen(true);
    void load();
  };

  const markProviderRead = (group: NewModelsInboxGroup) =>
    void markRead({
      models: group.models.map((m) => ({ provider: group.provider, modelId: m.modelId })),
    });

  const badgeLabel = t("newModelsBadgeAria", { count: unseenCount });

  return (
    <>
      <span className="relative inline-flex">
        <Button
          size="sm"
          variant="secondary"
          icon="new_releases"
          onClick={handleOpen}
          title={t("newModelsButtonTitle")}
          aria-label={unseenCount > 0 ? `${t("newModelsButton")} (${badgeLabel})` : undefined}
          data-testid="new-models-button"
        >
          {t("newModelsButton")}
        </Button>
        {unseenCount > 0 && (
          <Badge
            variant="error"
            size="sm"
            className="pointer-events-none absolute -top-1.5 -right-1.5"
            aria-hidden="true"
            data-testid="new-models-badge"
          >
            {unseenCount > 99 ? "99+" : unseenCount}
          </Badge>
        )}
      </span>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={t("newModelsTitle")}
        size="lg"
        footer={
          groups.length > 0 ? (
            <Button
              size="sm"
              variant="secondary"
              icon="done_all"
              onClick={() => void markRead({ all: true })}
            >
              {t("newModelsMarkAllRead")}
            </Button>
          ) : undefined
        }
      >
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          <NewModelsModalBody
            groups={groups}
            loading={loading}
            error={error}
            t={t}
            tc={tc}
            onRetry={() => void load()}
            onMarkProviderRead={markProviderRead}
          />
        </div>
      </Modal>
    </>
  );
}
