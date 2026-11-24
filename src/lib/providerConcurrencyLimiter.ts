/**
 * Runs async tasks with at most `limit` in flight per key (here: per provider).
 * `limit <= 0` or NaN means no limit. A failing task frees its slot. Waiters run in
 * arrival order. State is per limiter, so create one per sweep.
 */
export function createProviderLimiter(limit: number) {
  const lanes = new Map<string, { active: number; waiting: Array<() => void> }>();
  return async function run<T>(key: string, fn: () => Promise<T>): Promise<T> {
    if (!(limit > 0)) return fn();
    const lane = lanes.get(key) ?? { active: 0, waiting: [] };
    lanes.set(key, lane);
    if (lane.active >= limit) await new Promise<void>((resolve) => lane.waiting.push(resolve));
    else lane.active++;
    try {
      return await fn();
    } finally {
      const next = lane.waiting.shift();
      if (next)
        next(); // hand the slot straight to the next waiter
      else if (--lane.active === 0) lanes.delete(key);
    }
  };
}
