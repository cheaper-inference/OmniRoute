export interface RefreshLoopOptions {
  intervalMs: number;
  refresh: () => Promise<void>;
  logger: { warn: (message: string) => void; debug?: (message: string) => void };
}

/**
 * Run `refresh` on a fixed interval without overlapping invocations.
 *
 * Returns a `stop` function that sets the stopped flag and clears the
 * interval. `unref()` is guarded so the timer never keeps the process
 * alive and works on both Node 22 and Node 24.
 */
export function startRefreshLoop(options: RefreshLoopOptions): () => void {
  const { intervalMs, refresh, logger } = options;
  let stopped = false;
  let inFlight = false;

  const tick = async (): Promise<void> => {
    if (stopped) return;
    if (inFlight) return;
    inFlight = true;
    try {
      await refresh();
    } catch (err) {
      logger.warn(
        `[omniroute-v2] background refresh failed: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      inFlight = false;
    }
  };

  const timer = setInterval(() => {
    void tick();
  }, intervalMs);
  if (typeof timer.unref === "function") timer.unref();

  return () => {
    stopped = true;
    clearInterval(timer);
  };
}
