import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcherCache.ts";

/**
 * Host wake recovery (opt-in, OMNIROUTE_WAKE_RECOVERY=1).
 *
 * A sleeping host runs no timers, so a heartbeat that sees a much larger wall-clock gap than its
 * period knows the host just woke. Pooled upstream sockets are dead by then; flushing the
 * dispatcher cache makes the first requests after resume open fresh sockets instead of failing.
 */

const HEARTBEAT_MS = 5_000;
const DRIFT_THRESHOLD_MS = 30_000;
const TRUTHY = new Set(["1", "true", "yes", "on"]);

type WakeWatcherOptions = {
  now: () => number;
  onWake: () => void;
  heartbeatMs: number;
  driftThresholdMs: number;
};

export function createWakeWatcher({
  now,
  onWake,
  heartbeatMs,
  driftThresholdMs,
}: WakeWatcherOptions) {
  let last = now();
  return {
    /** Returns true when this tick detected a wake. Each gap fires once: `last` always advances. */
    tick(): boolean {
      const current = now();
      const woke = current - last - heartbeatMs > driftThresholdMs;
      last = current;
      if (woke) {
        try {
          onWake();
        } catch (error) {
          console.warn("[WAKE] recovery failed:", error instanceof Error ? error.message : error);
        }
      }
      return woke;
    },
  };
}

export function startWakeRecovery({
  env = process.env,
  onWake = () => {
    clearDispatcherCache();
    console.log("[WAKE] host resume detected; upstream connection pools flushed");
  },
}: {
  env?: Readonly<Record<string, string | undefined>>;
  onWake?: () => void;
} = {}): NodeJS.Timeout | null {
  if (!TRUTHY.has((env.OMNIROUTE_WAKE_RECOVERY ?? "").trim().toLowerCase())) return null;
  const watcher = createWakeWatcher({
    now: Date.now,
    onWake,
    heartbeatMs: HEARTBEAT_MS,
    driftThresholdMs: DRIFT_THRESHOLD_MS,
  });
  const timer = setInterval(() => watcher.tick(), HEARTBEAT_MS);
  timer.unref();
  return timer;
}
