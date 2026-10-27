"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  buildProviderRankMap,
  moveProviderBlock,
  sanitizeQuotaProviderOrder,
} from "@/shared/utils/quotaProviderOrder";
import { PROVIDER_ORDER } from "./constants";

type Translate = (key: string, fallback: string) => string;

interface NotifyLike {
  error: (message: string) => void;
}

async function readSavedOrder(): Promise<string[] | null> {
  try {
    const response = await fetch("/api/settings", { cache: "no-store" });
    if (!response.ok) return null;
    const settings = (await response.json()) as { quotaProviderOrder?: unknown };
    return sanitizeQuotaProviderOrder(settings?.quotaProviderOrder);
  } catch {
    return null;
  }
}

/**
 * Per-operator provider group order on the Quota Tracker (drag-to-reorder).
 * Persisted as `settings.quotaProviderOrder` via PATCH /api/settings, same
 * pattern as useQuotaVisibility: load once on mount, optimistic update, and on
 * a failed save roll back, re-read the server's order and notify.
 *
 * Display-only — connection `priority` (account selection) is never written.
 */
export function useQuotaProviderOrder(tr: Translate, notify: NotifyLike) {
  const [order, setOrder] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const orderRef = useRef<string[]>([]);

  const applyOrder = useCallback((next: string[]) => {
    orderRef.current = next;
    setOrder(next);
  }, []);

  // Best effort — a failed load keeps the built-in PROVIDER_ORDER layout.
  useEffect(() => {
    let alive = true;
    readSavedOrder().then((saved) => {
      if (alive && saved) applyOrder(saved);
    });
    return () => {
      alive = false;
    };
  }, [applyOrder]);

  const persistOrder = useCallback(
    async (next: string[]) => {
      const previous = orderRef.current;
      applyOrder(next);
      setSaving(true);
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotaProviderOrder: next }),
        });
        if (!response.ok) throw new Error(`Provider order save failed (${response.status})`);
      } catch {
        applyOrder(previous);
        notify.error(tr("providerOrderSaveFailed", "Failed to save the provider order"));
        const saved = await readSavedOrder();
        if (saved) applyOrder(saved);
      } finally {
        setSaving(false);
      }
    },
    [applyOrder, notify, tr]
  );

  /**
   * Move `fromProvider` to the slot of `toProvider`. `sequence` is the full
   * provider sequence currently rendered (all providers, not only the filtered
   * ones), so the saved order covers every provider the operator can see.
   */
  const reorderProviders = useCallback(
    (sequence: string[], fromProvider: string, toProvider: string) => {
      const next = moveProviderBlock(sequence, fromProvider, toProvider);
      if (next === sequence) return;
      void persistOrder(next);
    },
    [persistOrder]
  );

  const resetProviderOrder = useCallback(() => {
    if (orderRef.current.length === 0) return;
    void persistOrder([]);
  }, [persistOrder]);

  const providerRankMap = useMemo(() => buildProviderRankMap(order, PROVIDER_ORDER), [order]);

  return {
    providerRankMap,
    hasCustomOrder: order.length > 0,
    savingProviderOrder: saving,
    reorderProviders,
    resetProviderOrder,
  };
}
