"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";

import type { ConnectionRowConnection } from "../components/ConnectionRow";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface NotificationStore {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

/**
 * #11777: per-connection opt-in for the scheduled model health check
 * (`providerSpecificData.autoHealthCheck`). Mirrors useConnectionAutoSync.
 */
export function useConnectionHealthCheck(
  connections: ConnectionRowConnection[],
  setConnections: Dispatch<SetStateAction<ConnectionRowConnection[]>>,
  notify: NotificationStore,
  t: ProviderMessageTranslator
) {
  return useCallback(
    async (connectionId: string, enabled: boolean) => {
      try {
        const existingPsd = connections.find((c) => c.id === connectionId)?.providerSpecificData;
        const response = await fetch(`/api/providers/${connectionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerSpecificData: { ...(existingPsd || {}), autoHealthCheck: enabled },
          }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        setConnections((previous) =>
          previous.map((connection) =>
            connection.id === connectionId
              ? {
                  ...connection,
                  providerSpecificData: {
                    ...(connection.providerSpecificData || {}),
                    autoHealthCheck: enabled,
                  },
                }
              : connection
          )
        );
        notify[enabled ? "success" : "info"](
          enabled ? t("healthCheckEnabled") : t("healthCheckDisabled")
        );
      } catch (error) {
        console.error("Error toggling connection health check:", error);
        notify.error(t("healthCheckToggleFailed"));
      }
    },
    [notify, setConnections, t, connections]
  );
}
