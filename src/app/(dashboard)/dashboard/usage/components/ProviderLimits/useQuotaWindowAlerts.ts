"use client";

/**
 * useQuotaWindowAlerts — wires the pure alert evaluators
 * (`quotaWindowAlerts.ts`) to the toast channel.
 *
 * Deliberately client-side and cheap: it runs off the quota snapshot the
 * dashboard already polls (every 5 min, cache-only), so it adds zero upstream
 * requests and no server work. Dedupe is a ref (per session) seeded from the
 * persisted latch, so a reload does not re-toast windows that already alerted.
 *
 * Opt-in: when `enabled` is false (the default) both evaluators return [] and
 * nothing is written to the store or the DB.
 */

import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import {
  collectQuotaWindowAlerts,
  collectResetCreditExpiryAlerts,
  type QuotaAlertLatch,
} from "./quotaWindowAlerts";

interface UseQuotaWindowAlertsOptions {
  enabled: boolean;
  quotaSnapshot: Record<string, { provider?: string; quotas?: unknown[] }>;
  expiringCredits: Record<string, Array<{ creditId?: unknown; expiresAt?: unknown }>>;
  /** Persisted latch, loaded once by the caller. */
  initialLatch?: QuotaAlertLatch;
  /** Persist the latch after each evaluation. */
  persistLatch?: (latch: QuotaAlertLatch) => void;
}

export function useQuotaWindowAlerts({
  enabled,
  quotaSnapshot,
  expiringCredits,
  initialLatch,
  persistLatch,
}: UseQuotaWindowAlertsOptions) {
  const t = useTranslations("usage");
  const notify = useNotificationStore();
  const latchRef = useRef<QuotaAlertLatch>({ ...(initialLatch ?? {}) });
  const seededRef = useRef(initialLatch !== undefined);
  const snapshotRef = useRef(quotaSnapshot);
  const creditsRef = useRef(expiringCredits);

  // `initialLatch` arrives asynchronously from GET /api/settings/quota-alert-latch.
  // Seed once when it lands, then let the ref own the state — re-seeding on every
  // render would resurrect entries the evaluator just cleared on recovery.
  if (!seededRef.current && initialLatch !== undefined) {
    latchRef.current = { ...initialLatch };
    seededRef.current = true;
  }

  // Keep the refs fresh without re-running the effect on every poll identity
  // change (the polling hooks return new objects each time).
  snapshotRef.current = quotaSnapshot;
  creditsRef.current = expiringCredits;

  const evaluate = useCallback(() => {
    if (!enabled) return;

    const latch = latchRef.current;
    const windowAlerts = collectQuotaWindowAlerts(snapshotRef.current as never, latch, {
      enabled: true,
    });
    const creditAlerts = collectResetCreditExpiryAlerts(creditsRef.current as never, latch, {
      enabled: true,
    });

    for (const alert of windowAlerts) {
      const message = t("quotaAlertWindowLow", {
        window: alert.windowName,
        remaining: Math.round(alert.remainingPercentage ?? 0),
      });
      if (alert.severity === "critical") notify.error(message, t("quotaAlertTitle"));
      else notify.warning(message, t("quotaAlertTitle"));
    }

    for (const alert of creditAlerts) {
      notify.warning(
        t("quotaAlertCreditExpiring", { credit: alert.creditId ?? "" }),
        t("quotaAlertTitle")
      );
    }

    if ((windowAlerts.length > 0 || creditAlerts.length > 0) && persistLatch) {
      persistLatch({ ...latch });
    }
  }, [enabled, notify, persistLatch, t]);

  useEffect(() => {
    evaluate();
  }, [evaluate, quotaSnapshot, expiringCredits]);
}
