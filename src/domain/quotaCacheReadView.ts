import { AsyncLocalStorage } from "node:async_hooks";
import { getQuotaCacheState } from "./quotaCacheState";

type State = ReturnType<typeof getQuotaCacheState>;
const readView = new AsyncLocalStorage<State>();

export function getRequestQuotaCacheState(): State {
  return readView.getStore() ?? getQuotaCacheState();
}

/** Snapshot hydration and reset advancement stay private to this synchronous read. */
export function withQuotaCacheReadView<T>(read: () => T): T {
  const state = getQuotaCacheState();
  return readView.run(
    {
      ...state,
      cache: new Map([...state.cache].map(([id, entry]) => [id, structuredClone(entry)])),
      healthyUntil: new Map(state.healthyUntil),
      refreshingSet: new Set(),
    },
    read
  );
}
