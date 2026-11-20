import { parseApiKeyInput } from "./apiKeyInput";

export type KeyPersistence = "memory" | "session" | "device";
/** `confirmed`: confirm() ran, or the key came from storage. */
export interface StoredKey {
  key: string;
  persistence: KeyPersistence;
  confirmed: boolean;
}
/** Either accessor may throw (blocked site data) or return null (no storage at all). */
export interface KeyStorageAreas {
  session(): Storage | null;
  device(): Storage | null;
}
export interface KeyStore {
  subscribe(listener: () => void): () => void;
  /** Same object until something changes. */
  getSnapshot(): StoredKey | null;
  /** Memory only; remembers where the key should go once accepted. */
  hold(key: string, remember: boolean): void;
  /** The server accepted the held key: write it where requested. Idempotent. */
  confirm(): void;
  /** The server rejected the key: remove it from both storages, keep it in memory. */
  unpersist(): void;
  /** Remove the key everywhere. */
  forget(): void;
  /** Re-read the storages (another tab changed them). */
  reload(): void;
}

type StorageArea = Exclude<KeyPersistence, "memory">;

const STORAGE_ENTRY = "omniroute:quota-self:api-key";

function sameKey(a: StoredKey | null, b: StoredKey | null): boolean {
  if (a === null || b === null) return a === b;
  return a.key === b.key && a.persistence === b.persistence && a.confirmed === b.confirmed;
}

/** Guarded reads and writes of the key entry. Nothing here throws. */
function storageAccess(areas: KeyStorageAreas) {
  const area = (name: StorageArea): Storage | null => {
    try {
      return areas[name]() ?? null;
    } catch {
      return null;
    }
  };

  const remove = (name: StorageArea): void => {
    try {
      area(name)?.removeItem(STORAGE_ENTRY);
    } catch {
      // Nothing to clean up when the area cannot be reached.
    }
  };

  const write = (name: StorageArea, key: string): boolean => {
    const storage = area(name);
    if (!storage) return false;
    try {
      storage.setItem(STORAGE_ENTRY, key);
      return true;
    } catch {
      return false;
    }
  };

  /** A stored value that is not a usable key is removed and ignored. */
  const read = (name: StorageArea): StoredKey | null => {
    let raw: string | null = null;
    try {
      raw = area(name)?.getItem(STORAGE_ENTRY) ?? null;
    } catch {
      return null;
    }
    if (raw === null) return null;
    const parsed = parseApiKeyInput(raw);
    if (!parsed.ok) {
      remove(name);
      return null;
    }
    return { key: parsed.key, persistence: name, confirmed: true };
  };

  const readStorage = (): StoredKey | null => read("device") ?? read("session");

  return { remove, write, readStorage };
}

/** Keeps the API key of the self-service page in memory, and in browser storage once accepted. */
export function createKeyStore(areas: KeyStorageAreas): KeyStore {
  const { remove, write, readStorage } = storageAccess(areas);
  const listeners = new Set<() => void>();
  let snapshot: StoredKey | null = null;
  let loaded = false;
  let remember = false;

  const current = (): StoredKey | null => {
    if (!loaded) {
      loaded = true;
      snapshot = readStorage();
    }
    return snapshot;
  };

  const commit = (next: StoredKey | null): void => {
    const previous = current();
    if (sameKey(previous, next)) return;
    snapshot = next;
    listeners.forEach((listener) => listener());
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: current,
    hold(key, keep) {
      remember = keep;
      commit({ key, persistence: "memory", confirmed: false });
    },
    confirm() {
      const held = current();
      if (!held || held.confirmed) return;
      const target: StorageArea = remember ? "device" : "session";
      remove(target === "device" ? "session" : "device");
      const saved = write(target, held.key);
      // A failed write must not leave an older key behind in that area.
      if (!saved) remove(target);
      commit({ key: held.key, persistence: saved ? target : "memory", confirmed: true });
    },
    unpersist() {
      remove("device");
      remove("session");
      const held = current();
      if (held) commit({ key: held.key, persistence: "memory", confirmed: true });
    },
    forget() {
      remove("device");
      remove("session");
      remember = false;
      commit(null);
    },
    reload() {
      // A key that lives only in this page's memory is not another tab's to change.
      if (current()?.persistence === "memory") return;
      commit(readStorage());
    },
  };
}
