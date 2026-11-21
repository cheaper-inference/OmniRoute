import type { Dispatcher } from "undici";

const DISPATCHER_CACHE_KEY = Symbol.for("omniroute.proxyDispatcher.cache");
const DEFAULT_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.default");
const RETRY_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.retry");
// Local-egress dispatchers: separate cache for hostnames like
// host.docker.internal / *.internal / *.local, where Docker Desktop's NAT
// silently drops idle keep-alive sockets within the global pool's
// keepAliveMaxTimeout window. Kept on their own cache so a wider keep-alive
// for cloud upstreams cannot pull the .internal sockets down with it.
const LOCAL_DEFAULT_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.localDefault");
const LOCAL_RETRY_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.localRetry");

/** Upper bound on cached per-URL proxy dispatchers; oldest entries are evicted first. */
const MAX_DISPATCHER_CACHE_ENTRIES = 512;

type DispatcherCache = Map<string, Dispatcher>;
type GlobalWithDispatcherCache = typeof globalThis & {
  [DISPATCHER_CACHE_KEY]?: DispatcherCache;
  [DEFAULT_DISPATCHER_KEY]?: Dispatcher;
  [RETRY_DISPATCHER_KEY]?: Dispatcher;
  [LOCAL_DEFAULT_DISPATCHER_KEY]?: Dispatcher;
  [LOCAL_RETRY_DISPATCHER_KEY]?: Dispatcher;
};

/** undici keys `Agent.stats` by `URL.origin`; a dispatch may pass a URL or a string with a path. */
function statsOriginKey(origin: Dispatcher.DispatchOptions["origin"]): string {
  try {
    return new URL(String(origin)).origin;
  } catch {
    return String(origin);
  }
}

/**
 * Direct upstream fan-out dispatcher.
 *
 * A single Undici Agent configured with `connections > 1` should be enough in
 * theory, but real Codex `/backend-api/codex/responses` streams on Node 24 have
 * still been observed queuing every subsequent same-origin request until the
 * previous stream emits trailers. Using several one-connection Agents gives
 * each long SSE stream an independent pool/client and prevents one stream from
 * monopolizing the effective queue while keeping pipelining disabled.
 */
class RoundRobinDispatcher {
  private readonly dispatchers: Dispatcher[];
  private nextIndex = 0;

  constructor(dispatchers: Dispatcher[]) {
    this.dispatchers = dispatchers;
  }

  /**
   * Requests an agent holds right now for `origin`: running plus queued, from undici's public
   * `stats`, which keeps one entry per origin. Each origin has its own client in the agent, so a
   * stream to another origin does not queue this request. An agent without `stats` counts as
   * idle, which keeps plain rotation for it.
   */
  private load(dispatcher: Dispatcher, origin: string): number {
    const stats = (dispatcher as { stats?: Record<string, { running?: number; pending?: number }> })
      .stats;
    const entry = stats?.[origin];
    return (entry?.running ?? 0) + (entry?.pending ?? 0);
  }

  dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandler): boolean {
    // Least loaded agent, scanning from the one after the previous pick so equal loads still
    // rotate. A blind rotation could send a request to the agent that holds a long SSE stream
    // while the other agents were idle.
    const count = this.dispatchers.length;
    const origin = statsOriginKey(options.origin);
    let pick = this.nextIndex % count;
    let pickLoad = this.load(this.dispatchers[pick], origin);
    for (let step = 1; step < count && pickLoad > 0; step++) {
      const index = (this.nextIndex + step) % count;
      const load = this.load(this.dispatchers[index], origin);
      if (load < pickLoad) {
        pick = index;
        pickLoad = load;
      }
    }
    this.nextIndex = (pick + 1) % count;
    return this.dispatchers[pick].dispatch(options, handler);
  }

  close(callback?: () => void): Promise<void> | void {
    const done = Promise.all(this.dispatchers.map((dispatcher) => dispatcher.close())).then(
      () => undefined
    );
    if (callback) {
      done.then(callback);
      return;
    }
    return done;
  }

  destroy(
    errorOrCallback?: Error | null | (() => void),
    callback?: () => void
  ): Promise<void> | void {
    const callbackFn = typeof errorOrCallback === "function" ? errorOrCallback : callback;
    const error = typeof errorOrCallback === "function" ? null : (errorOrCallback ?? null);
    const done = Promise.all(this.dispatchers.map((dispatcher) => dispatcher.destroy(error))).then(
      () => undefined
    );
    if (callbackFn) {
      done.then(callbackFn);
      return;
    }
    return done;
  }
}

export function createRoundRobinDispatcher(dispatchers: Dispatcher[]): Dispatcher {
  return new RoundRobinDispatcher(dispatchers) as unknown as Dispatcher;
}

export function getDispatcherCache(): DispatcherCache {
  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  if (!globalWithCache[DISPATCHER_CACHE_KEY]) {
    globalWithCache[DISPATCHER_CACHE_KEY] = new Map();
  }
  return globalWithCache[DISPATCHER_CACHE_KEY];
}

export function getDefaultCachedDispatcher(): Dispatcher | undefined {
  return (globalThis as GlobalWithDispatcherCache)[DEFAULT_DISPATCHER_KEY];
}

export function setDefaultCachedDispatcher(dispatcher: Dispatcher): void {
  (globalThis as GlobalWithDispatcherCache)[DEFAULT_DISPATCHER_KEY] = dispatcher;
}

export function getRetryCachedDispatcher(): Dispatcher | undefined {
  return (globalThis as GlobalWithDispatcherCache)[RETRY_DISPATCHER_KEY];
}

export function setRetryCachedDispatcher(dispatcher: Dispatcher): void {
  (globalThis as GlobalWithDispatcherCache)[RETRY_DISPATCHER_KEY] = dispatcher;
}

export function getLocalDefaultCachedDispatcher(): Dispatcher | undefined {
  return (globalThis as GlobalWithDispatcherCache)[LOCAL_DEFAULT_DISPATCHER_KEY];
}

export function setLocalDefaultCachedDispatcher(dispatcher: Dispatcher): void {
  (globalThis as GlobalWithDispatcherCache)[LOCAL_DEFAULT_DISPATCHER_KEY] = dispatcher;
}

export function getLocalRetryCachedDispatcher(): Dispatcher | undefined {
  return (globalThis as GlobalWithDispatcherCache)[LOCAL_RETRY_DISPATCHER_KEY];
}

export function setLocalRetryCachedDispatcher(dispatcher: Dispatcher): void {
  (globalThis as GlobalWithDispatcherCache)[LOCAL_RETRY_DISPATCHER_KEY] = dispatcher;
}

function closeDispatcher(dispatcher: Dispatcher | undefined): void {
  if (!dispatcher) return;
  try {
    const result = dispatcher.close();
    if (result && typeof (result as Promise<void>).catch === "function") {
      void (result as Promise<void>).catch(() => {});
    }
  } catch {}
}

/**
 * Clear all cached proxy dispatchers.
 * Call this when proxy configuration changes to avoid stale connections.
 */
export function clearDispatcherCache(): void {
  const cache = getDispatcherCache();
  for (const dispatcher of cache.values()) {
    closeDispatcher(dispatcher);
  }
  cache.clear();

  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  closeDispatcher(globalWithCache[DEFAULT_DISPATCHER_KEY]);
  closeDispatcher(globalWithCache[RETRY_DISPATCHER_KEY]);
  closeDispatcher(globalWithCache[LOCAL_DEFAULT_DISPATCHER_KEY]);
  closeDispatcher(globalWithCache[LOCAL_RETRY_DISPATCHER_KEY]);
  delete globalWithCache[DEFAULT_DISPATCHER_KEY];
  delete globalWithCache[RETRY_DISPATCHER_KEY];
  delete globalWithCache[LOCAL_DEFAULT_DISPATCHER_KEY];
  delete globalWithCache[LOCAL_RETRY_DISPATCHER_KEY];
}

/**
 * Pool scope for a selective dispatcher eviction.
 */
export type DispatcherPoolScope = "local" | "cloud";

/**
 * Close and drop the slots of one pool, leaving the other pool untouched.
 * Never throws: the failure path that calls this is already handling an
 * error, so a failed close must not replace it. Slots are dropped even when
 * closing fails, so a broken dispatcher is never served again.
 */
export function evictDispatcherPool(scope: DispatcherPoolScope): void {
  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  const keys =
    scope === "local"
      ? ([LOCAL_DEFAULT_DISPATCHER_KEY, LOCAL_RETRY_DISPATCHER_KEY] as const)
      : ([DEFAULT_DISPATCHER_KEY, RETRY_DISPATCHER_KEY] as const);
  for (const key of keys) {
    try {
      closeDispatcher(globalWithCache[key]);
    } finally {
      delete globalWithCache[key];
    }
  }
}

export function __cacheProxyDispatcherForTest(key: string, dispatcher: Dispatcher): void {
  getDispatcherCache().set(key, dispatcher);
}

/**
 * Insert a dispatcher into the per-URL cache, evicting the oldest entry (and
 * closing it) first when the cache is at capacity. This keeps the cache bounded
 * on proxies that rotate through many URLs while guaranteeing that
 * `clearDispatcherCache()` can still close every registered dispatcher.
 */
export function setDispatcherCacheEntry(key: string, dispatcher: Dispatcher): void {
  const cache = getDispatcherCache();
  if (cache.size >= MAX_DISPATCHER_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) {
      const evicted = cache.get(oldest);
      cache.delete(oldest);
      closeDispatcher(evicted);
    }
  }
  cache.set(key, dispatcher);
}
