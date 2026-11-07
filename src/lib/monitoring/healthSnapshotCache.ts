interface SnapshotEntry<T> {
  snapshot?: { value: T; expiresAt: number };
  pending?: Promise<T>;
}

/**
 * Small range-keyed cache: fresh for 30s, stale for at most 60s more.
 * Scheduling defers synchronous work; it does not move it off the event loop.
 * Only historical statistics belong here, never live routing or connection state.
 */
export function createHealthSnapshotCache<T>(
  options: {
    now?: () => number;
    ttlMs?: number;
    staleMs?: number;
    defer?: (run: () => void) => void;
    onError?: () => void;
  } = {}
) {
  const now = options.now ?? (() => Date.now());
  const ttlMs = options.ttlMs ?? 30_000;
  const staleMs = options.staleMs ?? 60_000;
  const defer =
    options.defer ??
    ((run: () => void) => {
      setImmediate(run);
    });
  const onError = options.onError ?? (() => console.warn("[health-matrix] Stats refresh failed"));
  const entries = new Map<string, SnapshotEntry<T>>();

  function refresh(key: string, load: () => T, entry: SnapshotEntry<T>): Promise<T> {
    if (entry.pending) return entry.pending;
    entries.set(key, entry);
    // Production keys are the four normalized time ranges; bound even accidental new keys.
    if (entries.size > 4) entries.delete(entries.keys().next().value!);
    const pending = new Promise<void>((resolve) => defer(resolve))
      .then(() => {
        if (entries.get(key) !== entry) throw new Error("Health snapshot invalidated");
        const value = load();
        if (entries.get(key) === entry) entry.snapshot = { value, expiresAt: now() + ttlMs };
        return value;
      })
      .finally(() => {
        entry.pending = undefined;
      });
    entry.pending = pending;
    // Report one failure per refresh, including background refreshes with no awaiting caller.
    void pending.catch(onError);
    return pending;
  }

  return {
    clear(): void {
      entries.clear();
    },
    get(key: string, load: () => T): Promise<T> {
      const entry: SnapshotEntry<T> = entries.get(key) ?? {};
      const snapshot = entry.snapshot;
      if (snapshot && now() < snapshot.expiresAt) return Promise.resolve(snapshot.value);
      const pending = refresh(key, load, entry);
      if (snapshot && now() < snapshot.expiresAt + staleMs) return Promise.resolve(snapshot.value);
      return pending;
    },
  };
}
