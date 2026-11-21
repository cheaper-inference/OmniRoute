"use client";

import type { ReactNode } from "react";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { useFormatter, useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

import { UPDATED_AT_FORMAT } from "../lib/quotaFormat";

interface QuotaHeaderProps {
  providerName: string;
  /** `generatedAt` of the answer on screen; the page's reference clock. */
  generatedAt: string | null;
  /** The key expiry badge, or nothing. */
  expiry: ReactNode;
  refreshing: boolean;
  /** Null while there is nothing on screen to refresh. */
  onRefresh: (() => void) | null;
}

/** Brand, title and the actions of the page: expiry, the age of the answer, and Refresh. */
export default function QuotaHeader({
  providerName,
  generatedAt,
  expiry,
  refreshing,
  onRefresh,
}: QuotaHeaderProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const updatedAt = generatedAt
    ? t("updatedAt", {
        time: format.dateTime(new Date(generatedAt), UPDATED_AT_FORMAT),
      })
    : null;
  const hasActions = expiry != null || updatedAt !== null || onRefresh !== null;

  return (
    <div className="min-w-0 space-y-4">
      <OmniRouteLockup />
      <PageHeader
        className="min-w-0"
        title={<span className="break-words">{t("heading", { provider: providerName })}</span>}
        description={t("intro")}
        actions={
          hasActions ? (
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              {expiry}
              {updatedAt && <span className="text-sm text-text-muted">{updatedAt}</span>}
              {onRefresh && (
                <Button variant="secondary" icon="refresh" loading={refreshing} onClick={onRefresh}>
                  {t("refresh")}
                </Button>
              )}
            </div>
          ) : null
        }
      />
    </div>
  );
}
