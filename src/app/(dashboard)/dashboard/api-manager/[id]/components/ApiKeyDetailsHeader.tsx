"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Button } from "@/shared/components";
import type { SelfServiceView } from "../apiKeyDetailsData";
import { StatusBadge } from "./DetailsPrimitives";

/** Title, key id, refresh button and visibility badges at the top of the details page. */
export function ApiKeyDetailsHeader({
  keyId,
  name,
  generatedAt,
  view,
  hasData,
  refreshing,
  onReload,
}: {
  keyId: string;
  name: string;
  generatedAt: string | null;
  view: SelfServiceView | null;
  hasData: boolean;
  refreshing: boolean;
  onReload: () => void;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");

  return (
    <div className="space-y-3">
      <Link href="/dashboard/api-manager" className="text-sm text-primary hover:underline">
        ← {t("backToKeys")}
      </Link>
      <PageHeader
        compact
        className="break-words"
        title={name || t("pageTitle")}
        description={<span className="break-all font-mono">{t("keyIdLabel", { id: keyId })}</span>}
        actions={
          hasData ? (
            <Button
              variant="secondary"
              size="sm"
              icon="refresh"
              loading={refreshing}
              onClick={onReload}
            >
              {tc("refresh")}
            </Button>
          ) : undefined
        }
      />
      {generatedAt && (
        <p className="text-[11px] text-text-muted">{t("generatedAt", { date: generatedAt })}</p>
      )}
      {view && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t("visibilityTitle")}>
          <StatusBadge
            tone={view.visibility.selfUsage ? "good" : "neutral"}
            icon={view.visibility.selfUsage ? "visibility" : "visibility_off"}
          >
            {view.visibility.selfUsage ? t("badgeUsageVisible") : t("badgeUsageHidden")}
          </StatusBadge>
          <StatusBadge
            tone={view.visibility.accountQuota ? "warn" : "neutral"}
            icon={view.visibility.accountQuota ? "visibility" : "visibility_off"}
          >
            {view.visibility.accountQuota ? t("badgeQuotaVisible") : t("badgeQuotaHidden")}
          </StatusBadge>
        </div>
      )}
    </div>
  );
}
