/**
 * db/discoveryState.ts — Per-connection record of the last model discovery outcome.
 *
 * A discovery response only lives for the request that produced it: after a
 * failed discovery the next read looked exactly like a successful one, with no
 * trace of the failure left anywhere. This module stores the last outcome
 * (status, cause, date) of every connection in the `key_value` store, under the
 * namespace `discoveryState` and the key `<providerId>:<connectionId>` — the
 * same key convention as `syncedAvailableModels`.
 *
 * The record is display state only: it never touches the connection columns
 * that drive routing (`lastError`, `lastErrorType`, `testStatus`).
 *
 * Persistence lives behind DiscoveryStateRepository. The exports below stay
 * synchronous (SQLite-only legacy access) for the providers list route, the
 * discovery outcome recorder and the connection-deletion cleanup; this facade
 * stamps the attempt time.
 */

import type {
  DiscoveryStateEntry,
  DiscoveryStateRecord,
  DiscoveryStateRepository,
  DiscoveryStateStatus,
} from "@/domain/persistence/modelDiscoveryRepositories";
import { modelDiscoveryRepositories } from "./repositories/modelDiscoveryRepositories";

export type {
  DiscoveryStateEntry,
  DiscoveryStateRecord,
  DiscoveryStateStatus,
} from "@/domain/persistence/modelDiscoveryRepositories";

const legacy = modelDiscoveryRepositories.legacySync.discoveryState;

/** Async persistence contract; it stores records as given and never stamps the time. */
export function getDiscoveryStateRepository(): DiscoveryStateRepository {
  return modelDiscoveryRepositories.discoveryState;
}

/**
 * Store the outcome of the last discovery attempt for one connection. The
 * entry is replaced, never appended: the store keeps one row per connection.
 */
export function saveDiscoveryState(
  providerId: string,
  connectionId: string,
  outcome: { status: DiscoveryStateStatus; cause: string | null }
): void {
  const record: DiscoveryStateRecord = {
    status: outcome.status,
    cause: outcome.cause,
    at: new Date().toISOString(),
  };
  legacy.save(providerId, connectionId, record);
}

/**
 * Read the stored outcomes of a list of connections with a single query.
 * Returns a map keyed by `<providerId>:<connectionId>`; a connection without a
 * readable entry is simply absent from the map.
 */
export function getDiscoveryStatesForConnections(
  entries: DiscoveryStateEntry[]
): Map<string, DiscoveryStateRecord> {
  return legacy.findForConnections(entries);
}

/** Drop the stored outcomes of the given connections. */
export function deleteDiscoveryStatesForConnections(entries: DiscoveryStateEntry[]): number {
  return legacy.removeForConnections(entries);
}

/** Drop every stored outcome of a provider. */
export function deleteDiscoveryStatesForProvider(providerId: string): number {
  return legacy.removeForProvider(providerId);
}
