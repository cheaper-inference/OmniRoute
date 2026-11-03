// src/lib/db/providers.ts registers the connection store here, so open-sse can
// read and patch one connection without importing src/ (boundary ratchet,
// scripts/quality/measure-boundary.mjs). The store sits on a process-wide
// symbol so every module instance in the process sees the same registration.
const CONNECTION_STORE_KEY = Symbol.for("omniroute.providerConnectionStore");

export type RegisteredConnectionStore = {
  getProviderConnectionById: (id: string) => Promise<unknown>;
  mergeConnectionProviderSpecificData: (
    id: string,
    patch: Record<string, unknown>
  ) => Promise<void>;
};

export function registerConnectionStore(store: RegisteredConnectionStore): void {
  (globalThis as Record<symbol, unknown>)[CONNECTION_STORE_KEY] = store;
}

/** The registered store, or null when src/lib/db/providers.ts has not loaded. */
export function getRegisteredConnectionStore(): RegisteredConnectionStore | null {
  const store = (globalThis as Record<symbol, unknown>)[CONNECTION_STORE_KEY] as
    Partial<RegisteredConnectionStore> | undefined;
  if (
    typeof store?.getProviderConnectionById !== "function" ||
    typeof store?.mergeConnectionProviderSpecificData !== "function"
  ) {
    return null;
  }
  return store as RegisteredConnectionStore;
}
