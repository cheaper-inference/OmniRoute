"use client";

import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { Spinner } from "@/shared/components/Loading";
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
        size="2xs"
        tone="muted"
        onClick={onRefresh}
        disabled={refreshing}
        aria-busy={!!refreshing}
        title={t("quotaRefreshCurrentHint")}
        className="hover:text-primary aria-disabled:opacity-60"
      >
        {refreshing ? <Spinner decorative size="xs" /> : <Icon name="refresh" size={13} />}
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
