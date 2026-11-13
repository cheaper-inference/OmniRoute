/**
 * Opt-in (OMNIROUTE_LOCK_PROVIDER_INDEX, default off): a provider index over the model-lockout
 * map. Lock keys read `<provider>:<connection>:<model>`, so the no-account cooldown scan
 * (scanTransientModelLock) can read the keys of one provider instead of every lock.
 *
 * A Map subclass, so every existing writer (set, delete, clear in accountFallback.ts,
 * exactModelLock.ts and lockoutEviction.ts) keeps the index right with no change. The index is
 * built on the first indexed read: with the flag off it never exists, and set/delete pay one
 * null check. The full scan stays the reference path.
 */

const providerOf = (key: string) => key.slice(0, Math.max(0, key.indexOf(":")));

export const isLockProviderIndexEnabled = (env: Record<string, string | undefined> = process.env) =>
  ["1", "true", "yes"].includes((env.OMNIROUTE_LOCK_PROVIDER_INDEX ?? "").toLowerCase());

export class ProviderIndexedMap<V> extends Map<string, V> {
  private index: Map<string, Set<string>> | null = null;

  get indexBuilt(): boolean {
    return this.index !== null;
  }

  private add(index: Map<string, Set<string>>, key: string) {
    const provider = providerOf(key);
    const keys = index.get(provider);
    if (keys) keys.add(key);
    else index.set(provider, new Set([key]));
  }

  set(key: string, value: V): this {
    super.set(key, value);
    if (this.index) this.add(this.index, key);
    return this;
  }

  delete(key: string): boolean {
    const had = super.delete(key);
    if (had && this.index) {
      const provider = providerOf(key);
      const keys = this.index.get(provider);
      keys?.delete(key);
      if (keys?.size === 0) this.index.delete(provider);
    }
    return had;
  }

  clear(): void {
    super.clear();
    this.index = null;
  }

  /** Entries whose key starts with `<provider>:`. A snapshot: the caller may delete while reading. */
  entriesOfProvider(provider: string): Array<[string, V]> {
    if (!this.index) {
      this.index = new Map();
      for (const key of super.keys()) this.add(this.index, key);
    }
    const keys = [...(this.index.get(provider) ?? [])];
    return keys.map((key) => [key, super.get(key) as V]);
  }
}
