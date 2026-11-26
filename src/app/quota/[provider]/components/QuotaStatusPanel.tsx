"use client";

import { Alert } from "@omniroute/ui-kit/alert";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import type { SelfQuotaResponse } from "@/shared/schemas/selfQuota";

import type { SelfServiceQuery } from "../lib/useSelfServiceQuery";

interface QuotaStatusPanelProps {
  query: SelfServiceQuery<SelfQuotaResponse>;
  providerName: string;
  onRetry: () => void;
}

const REFUSED_TEXT = {
  "invalid-key": { title: "invalidKeyTitle", body: "invalidKeyBody" },
  "missing-scope": { title: "missingScopeTitle", body: "missingScopeBody" },
} as const;

const FAILED_TEXT = {
  network: "failedNetwork",
  server: "failedServer",
  "invalid-response": "failedInvalidResponse",
} as const;

/**
 * Every state of the page that has no quota to draw: no key yet, loading, key refused, failure,
 * and a valid key without a pool. Draws nothing once there is data to show.
 */
export default function QuotaStatusPanel({ query, providerName, onRetry }: QuotaStatusPanelProps) {
  const t = useTranslations("quotaSelf");

  switch (query.status) {
    case "idle":
      return (
        <Card padding="md">
          <h2 className="ci-heading break-words">{t("noKeyTitle")}</h2>
          <p className="text-sm text-text-muted">{t("noKeyBody")}</p>
        </Card>
      );
    case "loading":
      return query.data ? null : (
        <p role="status" className="text-sm text-text-muted">
          {t("loading")}
        </p>
      );
    case "refused": {
      const text = REFUSED_TEXT[query.reason];
      return (
        <Alert
          variant="warning"
          dismissible={false}
          title={t(text.title)}
          description={t(text.body)}
        />
      );
    }
    case "failed":
      return (
        <Alert
          variant="critical"
          dismissible={false}
          title={t("failedTitle")}
          description={t(FAILED_TEXT[query.reason])}
          actions={
            <Button variant="secondary" icon="refresh" onClick={onRetry}>
              {t("retry")}
            </Button>
          }
        />
      );
    case "ready":
      return query.data.pools.length === 0 ? (
        <Card padding="md">
          <h2 className="ci-heading break-words">
            {t("noPoolsTitle", { provider: providerName })}
          </h2>
          <p className="text-sm text-text-muted">{t("noPoolsBody", { provider: providerName })}</p>
        </Card>
      ) : null;
    default:
      return null;
  }
}
