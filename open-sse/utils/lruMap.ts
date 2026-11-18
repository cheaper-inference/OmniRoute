/**
 * Size-capped Map for engine caches keyed by client input (model names): over the cap the
 * least-recently-used key goes first. Engine code must not import from `src/` (boundary
 * ratchet), so this stays local instead of reusing `src/lib/quota/boundedMap.ts`.
 */
export interface LruMap<V> {
  get(key: string): V | undefined;
  set(key: string, value: V): void;
  clear(): void;
  readonly size: number;
  /** Walks entries without refreshing recency. */
  [Symbol.iterator](): IterableIterator<[string, V]>;
}

export function lruMap<V>(limit: number): LruMap<V> {
  const inner = new Map<string, V>();
  return {
    get(key) {
      if (!inner.has(key)) return undefined;
      const value = inner.get(key) as V;
      inner.delete(key);
      inner.set(key, value);
      return value;
    },
    set(key, value) {
      inner.delete(key);
      inner.set(key, value);
      if (inner.size > limit) inner.delete(inner.keys().next().value as string);
    },
    clear: () => inner.clear(),
    get size() {
      return inner.size;
    },
    [Symbol.iterator]: () => inner.entries(),
  };
}
