"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader, SectionHeader } from "@omniroute/ui-kit/page-header";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { ConfirmModal } from "@/shared/components/Modal";
import { AddWebhookWizard } from "./components/AddWebhookWizard";
import { HowItWorksSidebar } from "./components/HowItWorksSidebar";
import { WebhooksList } from "./components/WebhooksList";
import type { WebhookItem } from "./components/WebhookCard";

type FeedbackState = { type: "success" | "error"; message: string } | null;

function getStatus(wh: WebhookItem): "active" | "inactive" | "errored" {
  if (!wh.enabled) return "inactive";
  if (wh.failure_count > 0 || (wh.last_status !== null && wh.last_status >= 400)) return "errored";
  return "active";
}

export function WebhooksPageClient() {
  const t = useTranslations("webhooks");

  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const tc = useTranslations("common");
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<WebhookItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WebhookItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/webhooks");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("loadFailed"));
      setWebhooks(Array.isArray(data.webhooks) ? data.webhooks : []);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("loadFailed"),
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void (async () => {
      await load();
    })();
  }, [load]);

  const stats = useMemo(
    () =>
      webhooks.reduce(
        (acc, wh) => {
          acc.total += 1;
          acc[getStatus(wh)] += 1;
          return acc;
        },
        { total: 0, active: 0, inactive: 0, errored: 0 }
      ),
    [webhooks]
  );

  const handleTest = async (wh: WebhookItem) => {
    setTestingId(wh.id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/webhooks/${wh.id}/test`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.delivered === false) throw new Error(data.error || t("testFailed"));
      setFeedback({ type: "success", message: t("testSuccess") });
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("testFailed"),
      });
    } finally {
      setTestingId(null);
    }
  };

  const handleToggleEnabled = async (wh: WebhookItem) => {
    setFeedback(null);
    try {
      const res = await fetch(`/api/webhooks/${wh.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !wh.enabled }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("saveFailed"));
      setWebhooks((prev) =>
        prev.map((item) => (item.id === wh.id ? { ...item, enabled: !wh.enabled } : item))
      );
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("saveFailed"),
      });
    }
  };

  const handleAddWebhook = () => {
    setEditingWebhook(null);
    setWizardOpen(true);
  };

  const handleEditWebhook = (webhook: WebhookItem) => {
    setEditingWebhook(webhook);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setEditingWebhook(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/webhooks/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("deleteFailed"));
      setWebhooks((prev) => prev.filter((w) => w.id !== deleteTarget.id));
      setDeleteTarget(null);
      setFeedback({ type: "success", message: t("deleteSuccess") });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("deleteFailed"),
      });
    } finally {
      setDeleting(false);
    }
  };

  const tFn = (key: string, opts?: Record<string, unknown>) =>
    opts ? t(key as any, opts as any) : t(key as any);

  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={t("title")}
        description={t("description")}
        actions={
          <Button variant="primary" icon="add" onClick={handleAddWebhook}>
            {t("addWebhook")}
          </Button>
        }
      />

      {feedback && (
        <Alert
          variant={feedback.type === "success" ? "success" : "critical"}
          description={feedback.message}
          dismissLabel={tc("dismissNotification")}
          onDismiss={() => setFeedback(null)}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t("total"), value: stats.total, icon: "webhook", tone: "text-primary" },
              {
                label: t("active"),
                value: stats.active,
                icon: "check_circle",
                tone: "text-success",
              },
              {
                label: t("inactive"),
                value: stats.inactive,
                icon: "pause_circle",
                tone: "text-text-muted",
              },
              { label: t("errored"), value: stats.errored, icon: "error", tone: "text-error" },
            ].map((stat) => (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-text-main">{stat.value}</p>
                  </div>
                  <Icon name={stat.icon} size={24} className={stat.tone} />
                </div>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div className="border-b border-border p-4">
              <SectionHeader
                title={t("configuredWebhooks")}
                description={t("configuredWebhooksDesc")}
                actions={
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => void load()}
                    disabled={loading}
                    title={t("refresh")}
                    aria-label={t("refresh")}
                  >
                    <Icon
                      name="refresh"
                      size={18}
                      className={loading ? "animate-spin" : undefined}
                    />
                  </Button>
                }
              />
            </div>
            <div className="p-4">
              <WebhooksList
                webhooks={webhooks}
                loading={loading}
                testingId={testingId}
                t={tFn}
                onTest={(wh) => void handleTest(wh)}
                onToggleEnabled={(wh) => void handleToggleEnabled(wh)}
                onEdit={handleEditWebhook}
                onDelete={setDeleteTarget}
              />
            </div>
          </Card>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <HowItWorksSidebar t={tFn} />
          </div>
        </aside>
      </div>

      <AddWebhookWizard
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        onCreated={async () => {
          await load();
        }}
        t={tFn}
        editingWebhook={editingWebhook}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={t("delete")}
        message={t("deleteConfirm")}
        confirmText={t("delete")}
        cancelText={t("wizard.cancel")}
        loading={deleting}
      />
    </div>
  );
}
