/**
 * Process-wide singleton store shared across duplicated module copies.
 *
 * Bundled server chunks can load separate copies of the same module. State kept
 * in module scope then splits in two. Keying the store off `globalThis` through
 * `Symbol.for` keeps one shared value no matter which copy reads it.
 */

const PREFIX = "omniroute.";

/** Identity symbol for a shared key, stable across duplicated module copies. */
export function sharedSymbol(name: string): symbol {
  return Symbol.for(`${PREFIX}${name}`);
}

/**
 * Read the shared value for `name`, creating and remembering it on first use.
 * The factory runs at most once per process; an existing value wins untouched.
 */
export function getProcessStore<T>(name: string, create: () => T): T {
  const key = sharedSymbol(name);
  const holder = globalThis as unknown as Record<symbol, T | undefined>;
  const existing = holder[key];
  if (existing !== undefined) return existing;
  const value = create();
  holder[key] = value;
  return value;
}
