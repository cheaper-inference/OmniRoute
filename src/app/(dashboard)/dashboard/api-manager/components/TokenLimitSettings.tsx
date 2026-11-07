"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { ConfirmModal } from "@/shared/components/Modal";
import { useTokenLimits, type TokenLimitReport } from "./useTokenLimits";
import TokenLimitForm from "./TokenLimitForm";

function TokenLimitCard({
  limit,
  busy,
  onEdit,
  onDelete,
}: {
  limit: TokenLimitReport;
  busy: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("tokenLimits");
  const locale = useLocale();
  const percent = Math.min(100, Math.max(0, (limit.tokensUsed / limit.tokenLimit) * 100));
  const formatDate = (time: number) => new Date(time).toLocaleString(locale);
  return (
    <article className="rounded-lg border border-border p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="min-w-0 text-sm font-medium break-words">
          {t(limit.scopeType)}
          {limit.scopeValue ? ` · ${limit.scopeValue}` : ""} · {t(limit.resetInterval)}
        </h3>
        <span
          className={
            limit.enabled
              ? limit.remaining === 0
                ? "text-error"
                : "text-success"
              : "text-text-muted"
          }
        >
          {t(!limit.enabled ? "disabled" : limit.remaining === 0 ? "exhausted" : "active")}
        </span>
      </div>
      <dl className="grid grid-cols-1 min-[390px]:grid-cols-3 gap-3 text-sm">
        {(
          [
            ["allowance", limit.tokenLimit],
            ["used", limit.tokensUsed],
            ["remaining", limit.remaining],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-text-muted">{t(label)}</dt>
            <dd className="font-medium tabular-nums">{value.toLocaleString(locale)}</dd>
          </div>
        ))}
      </dl>
      <progress
        className="w-full h-2 appearance-none overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-surface-2 [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary"
        max={100}
        value={percent}
        aria-label={t("consumption")}
      />
      <p className="text-xs text-text-muted">
        {t("percentUsed", { percent: Math.round(percent) })}
      </p>
      <p className="text-xs text-text-muted">
        {limit.nextResetAt === null
          ? t("noReset")
          : t("period", {
              start: formatDate(limit.periodStartAt),
              end: formatDate(limit.nextResetAt),
            })}
      </p>
      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={onEdit}>
          {t("edit")}
        </Button>
        <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={onDelete}>
          {t("delete")}
        </Button>
      </div>
    </article>
  );
}

export default function TokenLimitSettings({ apiKeyId }: { apiKeyId: string }) {
  const t = useTranslations("tokenLimits");
  const [draft, setDraft] = useState<TokenLimitReport | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<TokenLimitReport | null>(null);
  const state = useTokenLimits(apiKeyId, draft !== undefined || !!deleting);
  return (
    <section
      className="rounded-lg border border-border bg-surface/40 p-4 flex flex-col gap-4"
      aria-label={t("title")}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">{t("title")}</h2>
          <p className="text-xs text-text-muted">{t("description")}</p>
          <p className="text-xs text-text-muted">{t("independentSave")}</p>
          <p className="text-xs text-text-muted">{t("enforcementHint")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={state.busy || state.loading}
            onClick={() => void state.refresh()}
          >
            {t("refresh")}
          </Button>
          {!state.loading && !state.error && (
            <Button type="button" size="sm" disabled={state.busy} onClick={() => setDraft(null)}>
              {t("add")}
            </Button>
          )}
        </div>
      </div>
      {state.notice && (
        <p role="status" className="text-sm text-success">
          {state.notice}
        </p>
      )}
      {state.error && draft === undefined && (
        <p role="alert" className="text-sm text-error">
          {state.error}
        </p>
      )}
      {state.loading && (
        <p role="status" className="text-sm text-text-muted">
          {t("loading")}
        </p>
      )}
      {!state.loading && !state.error && state.limits.length === 0 && (
        <p className="text-sm text-text-muted">{t("empty")}</p>
      )}
      {state.limits.map((limit) => (
        <TokenLimitCard
          key={limit.id}
          limit={limit}
          busy={state.busy}
          onEdit={() => setDraft(limit)}
          onDelete={() => setDeleting(limit)}
        />
      ))}
      <Link
        className="text-sm text-primary underline underline-offset-4"
        href={`/dashboard/costs?range=all&apiKeyIds=${encodeURIComponent(apiKeyId)}&groupBy=model`}
      >
        {t("usageReport")}
      </Link>
      {draft !== undefined && (
        <TokenLimitForm
          apiKeyId={apiKeyId}
          limit={draft}
          busy={state.busy}
          error={state.error}
          onClose={() => setDraft(undefined)}
          onSave={(input) => state.mutate("POST", input)}
        />
      )}
      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => {
          if (!state.busy) setDeleting(null);
        }}
        title={t("delete")}
        message={t("deleteWarning")}
        confirmText={t("confirmDelete")}
        loading={state.busy}
        onConfirm={async () => {
          if (deleting && (await state.mutate("DELETE", deleting.id))) setDeleting(null);
        }}
      />
    </section>
  );
}
