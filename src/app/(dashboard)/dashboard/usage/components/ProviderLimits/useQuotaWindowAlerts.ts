"use client";

/**
 * useQuotaWindowAlerts — wires the pure alert evaluators
 * (`quotaWindowAlerts.ts`) to the toast channel.
 *
 * Opt-in (`settings.codexQuotaAlerts.enabled`, default false). While it is off the
 * only cost is reading the setting once on mount: no latch read, no credit listing,
 * no toast, no write.
 *
 * While it is on:
 * - Window alerts run off the quota snapshot the dashboard already polls and add
 *   no request.
 * - Credit alerts need expiry dates, which the usage poll does not carry (it only
 *   has the banked count). So Codex accounts with banked credits are listed at most
 *   once per `RESET_CREDIT_LIST_INTERVAL_MS` while the page is visible. Listing is a
 *   read: it spends no quota and no credit.
 * - The latch is persisted whenever it changes, recovery included, so a window that
 *   recovered before a reload can alert again on its next drop.
 */

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { fetchWithTimeout } from "@/shared/utils/fetchTimeout";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import {
  evaluateQuotaAlerts,
  selectConnectionsWithBankedCredits,
  type ConnectionSnapshot,
  type QuotaAlertLatch,
  type ResetCreditLike,
} from "./quotaWindowAlerts";
import { formatQuotaLabel, getResetCreditEndpoint } from "./utils";

export const RESET_CREDIT_LIST_INTERVAL_MS = 60 * 60 * 1000;
const RESET_CREDIT_WAKE_INTERVAL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;
const QUOTA_ALERT_LATCH_URL = "/api/settings/quota-alert-latch";
/** Bounded retry for the latch read: a dedupe-cache miss must not silence alerts for a session. */
const LATCH_READ_ATTEMPTS = 3;

interface AlertConnection {
  id: string;
  provider?: string;
  isActive?: boolean;
  name?: string;
  displayName?: string;
  email?: string;
}

interface UseQuotaWindowAlertsOptions {
  quotaSnapshot: Record<string, ConnectionSnapshot>;
  connections: AlertConnection[];
  emailsVisible: boolean;
}

/**
 * `latch` stays null until the opt-in is confirmed, so a failed settings read keeps the alerts
 * silent (the operator never opted in as far as we know).
 *
 * The latch read is different: the operator DID opt in, so a failed read must not silence the
 * alerts for the whole session. It is retried, and after the last attempt it degrades to an empty
 * latch — the worst case is a single repeat toast, versus alerts that silently never fire
 * (#18631 review).
 */
function useQuotaAlertOptIn(): QuotaAlertLatch | null {
  const [latch, setLatch] = useState<QuotaAlertLatch | null>(null);

  useEffect(() => {
    let alive = true;
    const readLatch = async (): Promise<QuotaAlertLatch> => {
      for (let attempt = 0; attempt < LATCH_READ_ATTEMPTS; attempt += 1) {
        try {
          const response = await fetchWithTimeout(QUOTA_ALERT_LATCH_URL, {
            timeoutMs: REQUEST_TIMEOUT_MS,
          });
          if (!response.ok) continue;
          const data = await response.json();
          return data?.latch && typeof data.latch === "object" ? data.latch : {};
        } catch {
          /* try again: the latch is a dedupe cache, not a gate */
        }
      }
      return {};
    };

    const load = async () => {
      try {
        const settingsResponse = await fetchWithTimeout("/api/settings", {
          timeoutMs: REQUEST_TIMEOUT_MS,
        });
        const settings = settingsResponse.ok ? await settingsResponse.json() : null;
        if (settings?.codexQuotaAlerts?.enabled !== true) return;

        const persisted = await readLatch();
        if (alive) setLatch(persisted);
      } catch {
        /* keep the default: alerts stay off */
      }
    };
    void load();
    return () => {
      alive = false;
    };
  }, []);

  return latch;
}

function useExpiringResetCredits(
  active: boolean,
  connections: AlertConnection[],
  quotaSnapshot: Record<string, ConnectionSnapshot>
): Record<string, ResetCreditLike[]> {
  const [credits, setCredits] = useState<Record<string, ResetCreditLike[]>>({});
  const lastListedAtRef = useRef<Record<string, number>>({});
  // A joined key, so a new snapshot object holding the same accounts does not restart the timer.
  const eligibleKey = active
    ? selectConnectionsWithBankedCredits(connections, quotaSnapshot).join("\n")
    : "";

  useEffect(() => {
    if (!eligibleKey) return;
    let alive = true;
    const listDueConnections = async () => {
      if (document.visibilityState === "hidden") return;
      for (const connectionId of eligibleKey.split("\n")) {
        const lastListedAt = lastListedAtRef.current[connectionId] ?? 0;
        if (Date.now() - lastListedAt < RESET_CREDIT_LIST_INTERVAL_MS) continue;
        lastListedAtRef.current[connectionId] = Date.now();
        try {
          const response = await fetchWithTimeout(
            `${getResetCreditEndpoint("codex")}?connectionId=${encodeURIComponent(connectionId)}`,
            { timeoutMs: REQUEST_TIMEOUT_MS, cache: "no-store" }
          );
          const data = response.ok ? await response.json() : null;
          if (alive && Array.isArray(data?.credits)) {
            setCredits((previous) => ({ ...previous, [connectionId]: data.credits }));
          }
        } catch {
          /* the account is listed again after the interval */
        }
      }
    };
    void listDueConnections();
    const timer = setInterval(() => void listDueConnections(), RESET_CREDIT_WAKE_INTERVAL_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [eligibleKey]);

  return credits;
}

function persistLatch(latch: QuotaAlertLatch): void {
  void fetch(QUOTA_ALERT_LATCH_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latch }),
  }).catch(() => {
    /* persistence is best-effort; the in-memory latch still dedupes this session */
  });
}

export function useQuotaWindowAlerts({
  quotaSnapshot,
  connections,
  emailsVisible,
}: UseQuotaWindowAlertsOptions): void {
  const t = useTranslations("usage");
  const notifyError = useNotificationStore((store) => store.error);
  const notifyWarning = useNotificationStore((store) => store.warning);
  const persistedLatch = useQuotaAlertOptIn();
  const expiringCredits = useExpiringResetCredits(
    persistedLatch !== null,
    connections,
    quotaSnapshot
  );
  // Seeded once from the persisted copy, then this ref owns the state: re-seeding would
  // resurrect entries the evaluator just cleared on recovery.
  const latchRef = useRef<QuotaAlertLatch | null>(null);

  useEffect(() => {
    if (persistedLatch === null) return;
    latchRef.current ??= { ...persistedLatch };
    const latch = latchRef.current;

    const { windowAlerts, creditAlerts, changed } = evaluateQuotaAlerts({
      latch,
      quotaSnapshot,
      expiringCredits,
      liveConnectionIds: connections.map((connection) => connection.id),
    });

    const titleFor = (connectionId: string) => {
      const connection = connections.find((candidate) => candidate.id === connectionId);
      const account = connection
        ? pickDisplayValue(
            [connection.name, connection.displayName, connection.email],
            emailsVisible,
            connection.provider
          )
        : null;
      return account ? `${t("quotaAlertTitle")} · ${account}` : t("quotaAlertTitle");
    };

    for (const alert of windowAlerts) {
      const message = t("quotaAlertWindowLow", {
        window: alert.displayName || formatQuotaLabel(alert.windowName),
        remaining: Math.round(alert.remainingPercentage ?? 0),
      });
      if (alert.severity === "critical") notifyError(message, titleFor(alert.connectionId));
      else notifyWarning(message, titleFor(alert.connectionId));
    }

    for (const alert of creditAlerts) {
      notifyWarning(t("quotaAlertCreditExpiring"), titleFor(alert.connectionId));
    }

    if (changed) persistLatch({ ...latch });
  }, [
    connections,
    emailsVisible,
    expiringCredits,
    notifyError,
    notifyWarning,
    persistedLatch,
    quotaSnapshot,
    t,
  ]);
}
