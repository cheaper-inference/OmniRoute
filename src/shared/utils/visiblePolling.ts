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
