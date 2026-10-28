"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { QuotaLayout } from "./healthOverview";

/** Gate at execution, not scheduling: async Full responses may finish in Overview. */
export function useAutomaticQuotaRequests(layoutMode: QuotaLayout) {
  const layout = useRef(layoutMode);
  const mounted = useRef(false);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  useLayoutEffect(() => {
    layout.current = layoutMode;
    mounted.current = true;
    const pending = timers.current;
    return () => {
      mounted.current = false;
      for (const timer of pending) clearTimeout(timer);
      pending.clear();
    };
  }, [layoutMode]);
  const canRequestLive = useCallback(() => mounted.current && layout.current !== "overview", []);
  const scheduleLiveRetry = useCallback(
    (retry: () => void) => {
      if (!canRequestLive()) return;
      const timer = setTimeout(() => {
        timers.current.delete(timer);
        if (canRequestLive()) retry();
      }, 5000);
      timers.current.add(timer);
    },
    [canRequestLive]
  );
  return { canRequestLive, scheduleLiveRetry };
}
