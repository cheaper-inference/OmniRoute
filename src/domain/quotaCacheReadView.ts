import { AsyncLocalStorage } from "node:async_hooks";
import { getQuotaCacheState } from "./quotaCacheState";

type State = ReturnType<typeof getQuotaCacheState>;
const readView = new AsyncLocalStorage<State>();

export function getRequestQuotaCacheState(): State {
  return readView.getStore() ?? getQuotaCacheState();
}

/**
 * Snapshot hydration and reset advancement stay private to this synchronous read.
 * With `connectionId` only that connection's cache entry is cloned (the 30-second availability
 * poll evaluates one account at a time); without it every entry is cloned. A call nested inside
 * an active read view reuses that view and adds the requested connection to it.
 */
export function withQuotaCacheReadView<T>(read: () => T, connectionId?: string): T {
  const currentStore = readView.getStore();
  if (currentStore) {
    if (connectionId !== undefined && !currentStore.cache.has(connectionId)) {
      const state = getQuotaCacheState();
      const entry = state.cache.get(connectionId);
      if (entry) {
        currentStore.cache.set(connectionId, structuredClone(entry));
      }
    }
    return read();
  }

  const state = getQuotaCacheState();
  // Availability evaluates one account at a time. Cloning every account for every model
  // makes the 30-second dashboard poll quadratic; keep the same isolation with one entry.
  const entries =
    connectionId === undefined
      ? [...state.cache]
      : state.cache.has(connectionId)
        ? [[connectionId, state.cache.get(connectionId)!] as const]
        : [];
  return readView.run(
    {
      ...state,
      cache: new Map(entries.map(([id, entry]) => [id, structuredClone(entry)])),
      healthyUntil: new Map(state.healthyUntil),
      refreshingSet: new Set(),
    },
    read
  );
}
