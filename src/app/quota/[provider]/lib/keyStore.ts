import { parseApiKeyInput } from "./apiKeyInput";

export type KeyPersistence = "memory" | "session" | "device";
/** `confirmed`: confirmKey() ran, or the key came from storage. */
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
  confirmKey(): void;
  /**
   * The server rejected the key: remove it from the storages that hold it, keep it in memory.
   * A different key another tab stored is left in place.
   */
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

  const readRaw = (name: StorageArea): string | null => {
    try {
      return area(name)?.getItem(STORAGE_ENTRY) ?? null;
    } catch {
      return null;
    }
  };

  // Areas holding a value that is not a usable key, removed later by sweep(), outside render.
  const unusable = new Set<StorageArea>();

  /** A stored value that is not a usable key reads as absent. Reading never writes. */
  const read = (name: StorageArea): StoredKey | null => {
    const raw = readRaw(name);
    if (raw === null) return null;
    const parsed = parseApiKeyInput(raw);
    if (!parsed.ok) {
      unusable.add(name);
      return null;
    }
    return { key: parsed.key, persistence: name, confirmed: true };
  };

  /** Removes the unusable values found by earlier reads, unless another tab replaced them. */
  const sweep = (): void => {
    for (const name of unusable) {
      const raw = readRaw(name);
      if (raw !== null && !parseApiKeyInput(raw).ok) remove(name);
    }
    unusable.clear();
  };

  const readStorage = (): StoredKey | null => read("device") ?? read("session");

  /** Removes the entry of `name` only when it holds `key`. */
  const removeKey = (name: StorageArea, key: string): void => {
    const raw = readRaw(name);
    if (raw === null) return;
    const parsed = parseApiKeyInput(raw);
    if ("key" in parsed && parsed.key === key) remove(name);
  };

  return { remove, removeKey, write, read, readStorage, sweep };
}

/** Keeps the API key of the self-service page in memory, and in browser storage once accepted. */
export function createKeyStore(areas: KeyStorageAreas): KeyStore {
  const { remove, removeKey, write, read, readStorage, sweep } = storageAccess(areas);
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

  const reload = (): void => {
    const held = current();
    // A key kept only in memory or in this tab's session is not another tab's to change.
    if (held && held.persistence !== "device") return;
    // A device key follows the device entry; a tab without a key picks one up from it.
    commit(read("device"));
    sweep();
  };

  return {
    subscribe(listener) {
      // Subscribing runs outside render: the first read may have found values to clean up.
      current();
      sweep();
      listeners.add(listener);
      // Another tab may have changed the device entry while nothing listened.
      reload();
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: current,
    hold(key, keep) {
      current();
      sweep();
      remember = keep;
      commit({ key, persistence: "memory", confirmed: false });
    },
    confirmKey() {
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
      const held = current();
      if (!held) return;
      removeKey("device", held.key);
      removeKey("session", held.key);
      commit({ key: held.key, persistence: "memory", confirmed: true });
    },
    forget() {
      remove("device");
      remove("session");
      remember = false;
      commit(null);
      sweep();
    },
    reload,
  };
}
