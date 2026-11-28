"use client";

import { useEffect, useState } from "react";

import { fetchNewsPayload, nextNewsTransitionMs } from "@/shared/utils/releaseNotes";

const SEVERITY_FLAG_KEY = "ANNOUNCEMENT_SEVERITY_ENABLED";
const ENABLED_VALUES = new Set(["true", "1", "yes"]);

type FeatureFlagList = { flags?: Array<{ key?: string; effectiveValue?: string }> };

export type NewsFeedState = {
  /** `loading` until the feed was fetched, `error` when no feed could be read at all. */
  status: "loading" | "ready" | "error";
  payload: unknown;
  /** Whether the severity reader (v3 feed, severity, expiry) is on for this installation. */
  severityEnabled: boolean;
  /** The instant to evaluate the feed at; it moves on by itself when an entry expires. */
  now: Date;
};

/** Budget for the flag lookup, request and body together; the public feed never waits longer. */
export const SEVERITY_FLAG_TIMEOUT_MS = 3000;

type FlagResponse = { ok: boolean; json: () => Promise<unknown> };
type FlagFetch = (url: string, init: { signal: AbortSignal }) => Promise<FlagResponse>;

/**
 * Reads the severity flag under its own deadline. When the deadline passes it returns `false`
 * (the v2 feed, as before the flag existed) and aborts only its own request, never `signal`,
 * so the feed request that follows is unaffected.
 */
export async function readSeverityFlag(
  signal: AbortSignal,
  timeoutMs: number = SEVERITY_FLAG_TIMEOUT_MS,
  fetchFlags: FlagFetch = fetch as FlagFetch
): Promise<boolean> {
  const own = new AbortController();
  const abort = () => own.abort();
  if (signal.aborted) abort();
  signal.addEventListener("abort", abort, { once: true });
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<false>((resolve) => {
    timer = setTimeout(() => {
      abort();
      resolve(false);
    }, timeoutMs);
  });
  const read = (async () => {
    try {
      const response = await fetchFlags("/api/settings/feature-flags", { signal: own.signal });
      if (!response.ok) return false;
      const list = (await response.json()) as FeatureFlagList;
      const flag = list.flags?.find((entry) => entry.key === SEVERITY_FLAG_KEY);
      return ENABLED_VALUES.has(flag?.effectiveValue ?? "");
    } catch {
      // A failed read keeps the reader on the v2 feed, as before the flag existed.
      return false;
    }
  })();
  try {
    return await Promise.race([read, deadline]);
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", abort);
  }
}

/**
 * Loads the public announcement feed for the dashboard readers. The severity flag is read first
 * so that a disabled flag never requests the v3 feed. While it is enabled, a timer moves `now`
 * to the next publish or expiry instant, so a time-limited announcement disappears from an open
 * page without a reload or a new request.
 */
export function useNewsFeed(): NewsFeedState {
  const [loaded, setLoaded] = useState<{
    status: NewsFeedState["status"];
    payload: unknown;
    severityEnabled: boolean;
  }>({ status: "loading", payload: null, severityEnabled: false });
  const [clock, setClock] = useState(() => new Date());
  const { payload, severityEnabled } = loaded;

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      const enabled = await readSeverityFlag(controller.signal);
      const fetched = await fetchNewsPayload(fetch, controller.signal, {
        severityEnabled: enabled,
      });
      if (controller.signal.aborted) return;
      setClock(new Date());
      setLoaded({
        status: fetched === null ? "error" : "ready",
        payload: fetched,
        severityEnabled: enabled,
      });
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!severityEnabled) return;
    const delay = nextNewsTransitionMs(payload, clock, true);
    if (delay === null) return;
    // One millisecond past the instant, so the re-evaluation lands on the far side of it.
    const timer = setTimeout(() => setClock(new Date()), delay + 1);
    return () => clearTimeout(timer);
  }, [payload, severityEnabled, clock]);

  return {
    status: loaded.status,
    payload,
    severityEnabled,
    // With the flag off the readers evaluate at render time, exactly as they did before.
    now: severityEnabled ? clock : new Date(),
  };
}
