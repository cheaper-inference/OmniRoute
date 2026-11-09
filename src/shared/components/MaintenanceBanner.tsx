"use client";

/**
 * Maintenance Banner — Phase 8.4
 *
 * Shows a warning banner at the top of the dashboard when the server
 * is restarting or in maintenance mode. Auto-dismisses when the server
 * comes back online.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Icon from "./Icon";
import { startVisiblePolling } from "@/shared/utils/visiblePolling";

export default function MaintenanceBanner() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const consecutiveFailuresRef = useRef(0);
  const dismissedUntilRecoveryRef = useRef(false);
  const t = useTranslations("common");

  useEffect(() => {
    const checkHealth = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort("Health check timeout"), 8000);
      try {
        // Use lightweight liveness probe (single SELECT 1) instead of the
        // heavy /api/monitoring/health observability endpoint. The heavy
        // endpoint can exceed the 8s client timeout under normal load
        // (e.g. Logs page 3s polling), causing false-positive banners.
        const res = await fetch("/api/health/ping", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (res.ok) {
          consecutiveFailuresRef.current = 0;
          dismissedUntilRecoveryRef.current = false;
          setShow(false);
          setMessage("");
        } else {
          consecutiveFailuresRef.current += 1;
          // Require at least 2 failed checks to avoid transient false positives.
          if (consecutiveFailuresRef.current >= 2 && !dismissedUntilRecoveryRef.current) {
            setShow(true);
            setMessage(t("maintenanceServerIssues"));
          }
        }
      } catch {
        consecutiveFailuresRef.current += 1;
        if (consecutiveFailuresRef.current >= 2 && !dismissedUntilRecoveryRef.current) {
          setShow(true);
          setMessage(t("maintenanceServerUnreachable"));
        }
      } finally {
        clearTimeout(timeoutId);
      }
    };

    // Run on mount, then every 10 seconds while the tab is visible
    return startVisiblePolling(checkHealth, 10000);
  }, [t]);

  const dismiss = useCallback(() => {
    dismissedUntilRecoveryRef.current = true;
    setShow(false);
  }, []);

  if (!show) return null;

  // Kit warning Alert (role="status"), inline layout. Square, side-less and top-less so it stays
  // a strip under the Header rather than a card.
  return (
    <Alert
      variant="warning"
      layout="inline"
      icon={<Icon name="warning" size={16} />}
      description={message}
      dismissLabel={t("close")}
      onDismiss={dismiss}
      className="rounded-none border-x-0 border-t-0"
    />
  );
}
