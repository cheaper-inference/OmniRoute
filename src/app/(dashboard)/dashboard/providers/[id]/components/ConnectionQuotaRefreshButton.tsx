"use client";

import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components";
import type { QuotaRefreshState } from "../hooks/providerQuotaRefresh";

interface Props {
  refreshing?: boolean;
  state?: QuotaRefreshState;
  onRefresh: () => void;
}

const statusKeys = {
  loading: "quotaRefreshing",
  fresh: "quotaRefreshFresh",
  partial: "quotaRefreshPartial",
  stale: "quotaRefreshStale",
  error: "quotaRefreshFailed",
} as const;

/** One explicit read action. Availability and recovery remain server decisions. */
export default function ConnectionQuotaRefreshButton({ refreshing, state, onRefresh }: Props) {
  const t = useTranslations("providers");
  return (
    <span className="inline-flex flex-wrap items-center gap-1 text-xs">
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={refreshing}
        aria-busy={!!refreshing}
        title={t("quotaRefreshCurrentHint")}
        className="h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs text-text-muted hover:text-primary disabled:cursor-wait disabled:opacity-60"
      >
        <Icon name="refresh" size={13} className={refreshing ? "animate-spin" : undefined} />
        {t(refreshing ? "quotaRefreshing" : "quotaRefreshCurrent")}
      </Button>
      {state && (
        <span role="status" aria-live="polite" className="text-text-muted">
          {t(statusKeys[state.status])}
          {state.missingWindows?.map((window) => (
            <span key={window}>
              {" "}
              {t("quotaWindowUnavailable", { window: window === "session" ? "5h" : "7d" })}.
            </span>
          ))}
          {state.connectionsRefreshFailed && <span> {t("quotaConnectionRefreshFailed")}</span>}
        </span>
      )}
    </span>
  );
}
