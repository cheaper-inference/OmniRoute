import { isFreeModel } from "@/shared/utils/freeModels";
import { getRawProviderConnections } from "../providers";
import type { SyncedAvailableModel } from "./synced";
import { isSyncedAtFresh } from "./syncedCatalogFreshness";

/**
 * The import-free-models-only setting, applied where a provider's synced models
 * are READ for routing and pools.
 *
 * A model refresh keeps a free-only connection's full listing as cached
 * discovery, paid rows marked non-free (#17028), and only the scheduled sync
 * narrows the stored list to the free subset. Readers that took the stored rows
 * as callable therefore served paid models between a refresh and the next sync,
 * and a free-only connection whose provider lists no free model left nothing in
 * the catalog — which every reader treats as "no catalog" and answers with the
 * static (paid) one.
 *
 * Admission closes both: a free-only connection contributes only the rows the
 * sync's own predicate (`isFreeModel`) accepts, and "every active connection is
 * free-only, at least one was synced recently, and none admits a model" is a
 * state of its own (`freeOnlyExhausted`) instead of an empty catalog.
 */

type JsonRecord = Record<string, unknown>;

export interface ConnectionAdmissionRef {
  id: string;
  freeOnly: boolean;
  syncedModelsAt: string | null;
}

export interface AdmittedSyncedModels {
  /** The admitted rows of each stored connection, keyed by connection id. */
  byConnection: Record<string, SyncedAvailableModel[]>;
  /**
   * Every active connection imports free models only, at least one was synced
   * recently, and none admits a model: the provider has nothing callable, and
   * readers must not fall back to its static catalog.
   */
  freeOnlyExhausted: boolean;
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function readConnectionAdmissionRef(connection: unknown): ConnectionAdmissionRef | null {
  if (!isRecord(connection) || typeof connection.id !== "string" || !connection.id) return null;
  const settings = isRecord(connection.providerSpecificData) ? connection.providerSpecificData : {};
  return {
    id: connection.id,
    freeOnly: settings.importFreeModelsOnly === true,
    syncedModelsAt:
      typeof connection.syncedModelsAt === "string" ? connection.syncedModelsAt : null,
  };
}

/** The rows a connection may serve: all of them, or only free ones on a free-only connection. */
export function admitConnectionModels(
  providerId: string,
  models: readonly SyncedAvailableModel[],
  freeOnly: boolean
): SyncedAvailableModel[] {
  return freeOnly ? models.filter((model) => isFreeModel(providerId, model)) : [...models];
}

/**
 * Apply admission to a stored by-connection map. Only connections listed in
 * `activeConnections` and set to free-only are filtered; every other stored
 * entry is returned unchanged (callers restrict to active connections
 * themselves where they need to). `freeOnlyExhausted` is judged over the
 * active connections only.
 */
export function admitSyncedModelsByConnection(
  providerId: string,
  storedByConnection: Readonly<Record<string, SyncedAvailableModel[]>>,
  activeConnections: readonly ConnectionAdmissionRef[]
): AdmittedSyncedModels {
  const refs = new Map(activeConnections.map((connection) => [connection.id, connection]));
  const byConnection: Record<string, SyncedAvailableModel[]> = {};
  // Keep the stored map's markers (the malformed-rows flag is a symbol property).
  for (const marker of Object.getOwnPropertySymbols(storedByConnection)) {
    const descriptor = Object.getOwnPropertyDescriptor(storedByConnection, marker);
    if (descriptor) Object.defineProperty(byConnection, marker, descriptor);
  }
  for (const [connectionId, stored] of Object.entries(storedByConnection)) {
    if (!Array.isArray(stored)) continue;
    byConnection[connectionId] = admitConnectionModels(
      providerId,
      stored,
      refs.get(connectionId)?.freeOnly === true
    );
  }
  const freeOnlyExhausted =
    activeConnections.length > 0 &&
    activeConnections.every((connection) => connection.freeOnly) &&
    activeConnections.some((connection) => isSyncedAtFresh(connection.syncedModelsAt)) &&
    activeConnections.every((connection) => (byConnection[connection.id] ?? []).length === 0);
  return { byConnection, freeOnlyExhausted };
}

/** One row per model id across the admitted connections, first connection wins. */
export function unionAdmittedModels(admitted: AdmittedSyncedModels): SyncedAvailableModel[] {
  const models = new Map<string, SyncedAvailableModel>();
  for (const rows of Object.values(admitted.byConnection)) {
    for (const model of rows) {
      if (model?.id && !models.has(model.id)) models.set(model.id, model);
    }
  }
  return Array.from(models.values());
}

/** The admission references of a provider's active connections. */
export async function getActiveConnectionAdmissionRefs(
  providerId: string
): Promise<ConnectionAdmissionRef[]> {
  const rows = await getRawProviderConnections(
    { provider: providerId, isActive: true },
    undefined,
    undefined,
    ["id", "provider", "synced_models_at", "provider_specific_data"]
  );
  return rows
    .map(readConnectionAdmissionRef)
    .filter((ref): ref is ConnectionAdmissionRef => ref !== null);
}
