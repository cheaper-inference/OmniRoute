"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

type PingStatus = "succeeded" | "failed" | "skipped";
type PingOutcome = { status: PingStatus; message: string };

// Reason codes returned by POST /api/providers/{id}/ping → i18n key under providers.pingNow.
const REASON_KEYS: Record<string, string> = {
  completed: "completed",
  busy: "busy",
  inactive: "inactive",
  unavailable: "unavailable",
  no_model: "noModel",
  auth_failed: "authFailed",
  no_token: "authFailed",
  quota_unavailable: "quotaUnavailable",
  quota_exhausted: "quotaExhausted",
  not_completed: "notCompleted",
  timeout: "timeout",
};

const STATUS_CLASS: Record<PingStatus, string> = {
  succeeded: "text-success",
  skipped: "text-warning",
  failed: "text-error",
};

/**
 * Manual "Ping now" for one Codex OAuth connection: sends a tiny request so the
 * account's quota window starts now. Consumes quota; does not change Auto-Ping.
 */
export default function CodexPingNowButton({
  connectionId,
  disabled,
}: {
  connectionId: string;
  disabled?: boolean;
}) {
  const t = useTranslations("providers");
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<PingOutcome | null>(null);
  const inFlight = useRef(false);

  async function ping() {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setOutcome(null);
    let status: PingStatus = "failed";
    let reason = "error";
    try {
      const response = await fetch(`/api/providers/${encodeURIComponent(connectionId)}/ping`, {
        method: "POST",
      });
      const data = await response.json().catch(() => ({}));
      if (typeof data?.reason === "string") reason = data.reason;
      if (response.ok && ["succeeded", "failed", "skipped"].includes(data?.status)) {
        status = data.status;
      }
    } catch {
      // Network failure: keep the generic failed message.
    } finally {
      const key = REASON_KEYS[reason] ?? "failed";
      setOutcome({ status, message: t(`pingNow.${key}`) });
      inFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-1">
      <Button
        size="sm"
        variant="ghost"
        icon="play_arrow"
        loading={busy}
        disabled={disabled || busy}
        onClick={ping}
        className="!h-7 !px-2 text-xs"
        title={t("pingNow.title")}
      >
        {t("pingNow.label")}
      </Button>
      {outcome && (
        <span role="status" className={`text-[11px] ${STATUS_CLASS[outcome.status]}`}>
          {outcome.message}
        </span>
      )}
    </span>
  );
}
