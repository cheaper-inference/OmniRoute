"use client";

import { useCallback, useEffect, useState } from "react";

import {
  buildNextQuotaVisibility,
  getQuotaVisibilityKey,
  type QuotaVisibilityMap,
  type QuotaVisibilityScope,
} from "./utils";

type Translate = (key: string, fallback: string) => string;

interface NotifyLike {
  error: (message: string) => void;
}

/**
 * Per-operator quota row visibility (upstream 9router#2371 port). Keyed by
 * connection id → { hidden: [<quota visibility key>] } so accounts of the same
 * provider stay independent (9router#4767); legacy provider-id entries are still
 * read as a fallback until that account is changed. Persisted server-side
 * via PATCH /api/settings so it survives refresh/reload.
 *
 * Extracted from ProviderLimits/index.tsx to keep the container under the
 * frozen file-size budget — same pattern as useCodexResetCreditRedemption.
 */
export function useQuotaVisibility(tr: Translate, notify: NotifyLike) {
  const [quotaVisibility, setQuotaVisibility] = useState<QuotaVisibilityMap>({});

  // Load persisted per-operator quota row visibility once on mount. Best
  // effort — a fetch failure just leaves every row visible (safe default).
  useEffect(() => {
    let alive = true;
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((s: { quotaVisibility?: QuotaVisibilityMap }) => {
        if (alive) setQuotaVisibility(s?.quotaVisibility || {});
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const persistQuotaVisibility = useCallback(
    async (next: QuotaVisibilityMap, previous: QuotaVisibilityMap) => {
      setQuotaVisibility(next);
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotaVisibility: next }),
        });
        if (!response.ok) throw new Error("Failed to update quota visibility");
      } catch {
        setQuotaVisibility(previous);
        notify.error(tr("quotaVisibilityUpdateFailed", "Failed to update quota visibility"));
      }
    },
    [notify, tr]
  );

  const toggleQuotaKey = useCallback(
    (scope: QuotaVisibilityScope, quotaRow: any, hide: boolean) => {
      const key = getQuotaVisibilityKey(quotaRow);
      if (!key) return;
      const previous = quotaVisibility;
      const next = buildNextQuotaVisibility(previous, scope, key, hide);
      if (next === previous) return;
      persistQuotaVisibility(next, previous);
    },
    [quotaVisibility, persistQuotaVisibility]
  );

  const handleHideQuota = useCallback(
    (scope: QuotaVisibilityScope, quotaRow: any) => toggleQuotaKey(scope, quotaRow, true),
    [toggleQuotaKey]
  );

  const handleShowQuota = useCallback(
    (scope: QuotaVisibilityScope, quotaRow: any) => toggleQuotaKey(scope, quotaRow, false),
    [toggleQuotaKey]
  );

  return { quotaVisibility, handleHideQuota, handleShowQuota };
}
