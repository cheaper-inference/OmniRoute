/**
 * Opt-in model discovery for a connection that was just created.
 *
 * A provider whose catalog is authoritative only advertises what the account
 * returned on its last sync, so a connection added between scheduler ticks
 * contributes nothing to /v1/models until the next six-hour cycle. The create
 * paths call this so a connection that takes part in auto-sync refreshes right
 * away instead of sitting active with an empty catalog.
 *
 * Eligibility is the scheduler's own predicate. `autoSync` is the field the
 * provider handlers write at OAuth time (antigravity and agy default to it), so
 * gating on autoFetchModels alone would make this a no-op for exactly the
 * connections that need it. autoFetchModels stays honoured for API-key
 * providers, where it is the only opt-in.
 *
 * Fire-and-forget by design: the sync takes seconds and must not delay the
 * create response. The follow-up registry keeps shutdown and tests from racing
 * it. The sync goes through the same loopback helper the scheduler and the
 * reactive trigger use, so the origin stays pinned to the trusted internal base
 * URL rather than anything derived from the request Host header.
 */
import {
  getModelSyncInternalBaseUrl,
  isAutoSyncEnabled,
  syncConnectionModels,
} from "@/shared/services/modelSyncScheduler";
import { runConnectionFollowUp } from "@/lib/providers/connectionFollowUps";
import { isAutoFetchModelsEnabled } from "./modelDiscovery";

export type SyncConnectionModels = typeof syncConnectionModels;

export interface AutoModelSyncOptions {
  /** Value of the caller's X-Skip-Model-Sync header, when it runs its own sync. */
  skipHeaderValue?: string | null;
  /** Test seam; defaults to the shared loopback sync. */
  syncFn?: SyncConnectionModels;
  /** Override for the per-connection window; 0 disables deduplication. */
  dedupeWindowMs?: number;
  /** `import` keeps the catalog-import semantics of the API-key create path. */
  mode?: "import" | "sync";
}

/**
 * One sync per connection per window.
 *
 * A single sign-in can reach the create paths more than once (exchange, poll,
 * retry, a dashboard refresh), and every pass pulls the whole upstream catalog.
 * The sync is idempotent, so a second pass seconds later only multiplies
 * upstream /models traffic, and two concurrent passes can write the same
 * connection from stale snapshots.
 */
const DEFAULT_DEDUPE_WINDOW_MS = 5 * 60_000;
const inFlight = new Set<string>();
/** Insertion order is time order, so expired entries sit at the front. */
const lastStartedAt = new Map<string, number>();

function pruneExpired(now: number, windowMs: number): void {
  if (windowMs <= 0) {
    lastStartedAt.clear();
    return;
  }
  for (const [key, startedAt] of lastStartedAt) {
    if (now - startedAt < windowMs) break;
    lastStartedAt.delete(key);
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readTarget(
  connection: { id?: unknown; provider?: unknown } | null
): { id: string; provider: string } | null {
  const id = typeof connection?.id === "string" ? connection.id : "";
  const provider = typeof connection?.provider === "string" ? connection.provider : "";
  return id && provider ? { id, provider } : null;
}

function takesPartInAutoSync(provider: string, providerSpecificData: unknown): boolean {
  const data = asRecord(providerSpecificData);
  return isAutoSyncEnabled(provider, data) || isAutoFetchModelsEnabled(data);
}

/** Claim the connection's slot, or return false when a sync is already due or running. */
function claimSyncSlot(id: string, windowMs: number): boolean {
  const now = Date.now();
  pruneExpired(now, windowMs);
  if (inFlight.has(id)) return false;
  if (windowMs > 0 && now - (lastStartedAt.get(id) ?? 0) < windowMs) return false;
  inFlight.add(id);
  lastStartedAt.set(id, now);
  return true;
}

function startFollowUp(id: string, provider: string, options: AutoModelSyncOptions): void {
  const syncFn = options.syncFn ?? syncConnectionModels;
  const baseUrl = getModelSyncInternalBaseUrl();
  runConnectionFollowUp(`Auto-sync error for ${id}`, () =>
    Promise.resolve()
      .then(() => syncFn(id, provider, baseUrl, { mode: options.mode }))
      .finally(() => inFlight.delete(id))
  );
}

/**
 * Start a model sync for `connection` when it takes part in auto-sync.
 *
 * Returns true when a sync was started. Never throws: an error here must not
 * turn an already successful create into a failure, and provider data is
 * caller-supplied, so its accessors are evaluated inside the guard too.
 */
export function triggerAutoModelSync(
  connection: { id?: unknown; provider?: unknown; providerSpecificData?: unknown } | null,
  options: AutoModelSyncOptions = {}
): boolean {
  try {
    if (options.skipHeaderValue === "true") return false;
    const target = readTarget(connection);
    if (!target) return false;
    if (!takesPartInAutoSync(target.provider, connection?.providerSpecificData)) return false;
    if (!claimSyncSlot(target.id, options.dedupeWindowMs ?? DEFAULT_DEDUPE_WINDOW_MS)) {
      return false;
    }
    startFollowUp(target.id, target.provider, options);
    return true;
  } catch (error) {
    // Reading provider data or resolving the origin failed. The connection is
    // already persisted, and the scheduler will still reach it on its own.
    console.log(
      "[providers] Auto-sync setup failed:",
      (error as { message?: string } | null)?.message || error
    );
    return false;
  }
}
