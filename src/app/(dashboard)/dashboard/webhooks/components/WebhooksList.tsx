"use client";

import EmptyState from "@/shared/components/EmptyState";
import { WebhookCard, type WebhookItem } from "./WebhookCard";

interface WebhooksListProps {
  webhooks: WebhookItem[];
  loading: boolean;
  testingId: string | null;
  t: (key: string, opts?: Record<string, unknown>) => string;
  onTest: (wh: WebhookItem) => void;
  onToggleEnabled: (wh: WebhookItem) => void;
  onEdit: (wh: WebhookItem) => void;
  onDelete: (wh: WebhookItem) => void;
}

export function WebhooksList({
  webhooks,
  loading,
  testingId,
  t,
  onTest,
  onToggleEnabled,
  onEdit,
  onDelete,
}: WebhooksListProps) {
  if (loading) {
    return <p className="py-10 text-center text-sm text-text-muted">{t("loading")}</p>;
  }

  if (webhooks.length === 0) {
    return <EmptyState icon="webhook" title={t("noWebhooks")} />;
  }

  return (
    <div className="space-y-3">
      {webhooks.map((wh) => (
        <WebhookCard
          key={wh.id}
          webhook={wh}
          t={t}
          testingId={testingId}
          onTest={onTest}
          onToggleEnabled={onToggleEnabled}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
