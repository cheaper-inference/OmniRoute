"use client";

import { useCallback } from "react";

export function useSaveQuotaWindowThresholds(refresh: () => Promise<void>) {
  return useCallback(
    async (id: string, patch: Record<string, number | null> | null) => {
      const response = await fetch(`/api/providers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quotaWindowThresholds: patch }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await refresh();
    },
    [refresh]
  );
}

/** A configuration write is not evidence that runtime restrictions recovered. */
export function useConfirmedAvailabilityChange(
  fetchConnections: () => Promise<unknown>,
  refreshAvailability: () => Promise<void>
) {
  return useCallback(async () => {
    try {
      await fetchConnections();
      await refreshAvailability();
    } catch {
      // Retain the last successful reads when a post-write refresh fails.
    }
  }, [fetchConnections, refreshAvailability]);
}
