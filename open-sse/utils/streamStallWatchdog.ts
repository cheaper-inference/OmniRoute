/**
 * Byte-stall watchdog for `pipeWithDisconnect`: fires `onStall` when no upstream chunk arrived
 * for `stallTimeoutMs`. `arm()` is called on every raw upstream chunk.
 *
 * Two modes, selected per stream by `SSE_STALL_WATCHDOG`:
 * - `timer` (default): the legacy behavior — every `arm()` clears and re-creates a
 *   `setTimeout`, so the stall fires exactly `stallTimeoutMs` after the last chunk.
 * - `interval` (opt-in): `arm()` only stamps `Date.now()`; ONE unref'd `setInterval` per stream
 *   (period `clamp(stallTimeoutMs / 4, 1s, 5s)`) compares the stamp against the budget. That
 *   removes a timer allocation per chunk on long, chatty streams; the stall then fires within
 *   `stallTimeoutMs + period` of the last chunk instead of exactly at `stallTimeoutMs`.
 */

export type StallWatchdog = { arm: () => void; clear: () => void };

export function readStallWatchdogMode(): "timer" | "interval" {
  return process.env.SSE_STALL_WATCHDOG?.trim().toLowerCase() === "interval" ? "interval" : "timer";
}

export function stallWatchdogPeriodMs(stallTimeoutMs: number): number {
  return Math.min(5_000, Math.max(1_000, Math.floor(stallTimeoutMs / 4)));
}

/** `stallTimeoutMs <= 0` (or non-finite) disables the watchdog: `arm()` is a no-op. */
export function createStallWatchdog(
  stallTimeoutMs: number,
  onStall: () => void,
  mode: "timer" | "interval" = readStallWatchdogMode()
): StallWatchdog {
  const enabled = Number.isFinite(stallTimeoutMs) && stallTimeoutMs > 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;
  let lastChunkAt = 0;

  const clear = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    if (interval) clearInterval(interval);
    interval = null;
  };

  if (mode === "timer") {
    return {
      arm: () => {
        if (!enabled) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(onStall, stallTimeoutMs);
      },
      clear,
    };
  }

  return {
    arm: () => {
      if (!enabled) return;
      lastChunkAt = Date.now();
      if (interval) return;
      interval = setInterval(() => {
        if (Date.now() - lastChunkAt < stallTimeoutMs) return;
        clear();
        onStall();
      }, stallWatchdogPeriodMs(stallTimeoutMs));
      (interval as { unref?: () => void }).unref?.();
    },
    clear,
  };
}
