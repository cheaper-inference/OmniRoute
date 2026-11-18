/** True when the tab can show the result of a poll; always true outside a browser. */
export function isTabVisible(): boolean {
  return typeof document === "undefined" || document.visibilityState === "visible";
}

/**
 * Poll on an interval, skipping ticks while the tab is hidden, and catch up as soon as the tab
 * returns so a badge is never stale for up to a full interval. Returns the stop function.
 */
export function startVisiblePolling(
  poll: () => void | Promise<void>,
  intervalMs: number
): () => void {
  let stopped = false;
  const tick = () => {
    if (stopped || !isTabVisible()) return;
    void poll();
  };

  queueMicrotask(tick);
  const interval = setInterval(tick, intervalMs);
  if (typeof document !== "undefined") document.addEventListener("visibilitychange", tick);

  return () => {
    stopped = true;
    clearInterval(interval);
    if (typeof document !== "undefined") document.removeEventListener("visibilitychange", tick);
  };
}

const CACHE_POLL_INTERVAL_MS = 5000;
const CACHE_READ_TIMEOUT_MS = 15000;

/** Cached dashboard reads only: bounded, non-overlapping and suspended in hidden tabs. */
export function startVisibleCachePolling(
  read: (signal: AbortSignal) => Promise<void>,
  immediate = true
) {
  let disposed = false;
  let pending: AbortController | null = null;
  let deadline: ReturnType<typeof setTimeout> | undefined;

  const cancel = () => {
    pending?.abort();
    pending = null;
    clearTimeout(deadline);
  };
  const refresh = async (replacePending = false) => {
    if (disposed || document.visibilityState !== "visible") return;
    if (pending && !replacePending) return;
    if (replacePending) cancel();
    const controller = new AbortController();
    pending = controller;
    deadline = setTimeout(cancel, CACHE_READ_TIMEOUT_MS);
    try {
      await read(controller.signal);
    } catch {
      // Background cache reads are best effort; retain the last observation on failure.
    } finally {
      if (pending === controller) {
        clearTimeout(deadline);
        pending = null;
      }
    }
  };
  const visibilityChanged = () => {
    if (document.visibilityState === "visible") void refresh();
    else cancel();
  };
  const timer = setInterval(() => {
    void refresh();
  }, CACHE_POLL_INTERVAL_MS);
  document.addEventListener("visibilitychange", visibilityChanged);
  if (immediate) void refresh();
  return {
    refresh,
    cancel,
    dispose() {
      disposed = true;
      cancel();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibilityChanged);
    },
  };
}
