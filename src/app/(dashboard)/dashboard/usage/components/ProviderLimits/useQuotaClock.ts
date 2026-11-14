"use client";

import { useCallback, useEffect, useState } from "react";

/** Coarse tick: the countdown text only has minute granularity. */
export const QUOTA_CLOCK_INTERVAL_MS = 30_000;

/**
 * Wall-clock epoch ms that advances on a coarse interval. Call it ONCE per card/page and pass the
 * value down, so every "Resets in" text depends on an explicit `now` input. Reading Date.now()
 * inside render is invisible to the React Compiler, which would memoize the text on `resetAt`
 * alone and freeze it (#18772).
 */
export interface QuotaClock {
  now: number;
  refresh: () => void;
}

export function useQuotaClock(intervalMs: number = QUOTA_CLOCK_INTERVAL_MS): QuotaClock {
  const [now, setNow] = useState(() => Date.now());
  const refresh = useCallback(() => setNow(Date.now()), []);
  useEffect(() => {
    const id = setInterval(refresh, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, refresh]);
  return { now, refresh };
}
