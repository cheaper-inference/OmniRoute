/**
 * Persist a runtime-discovered Antigravity projectId back onto its connection row
 * (#8491).
 *
 * `ensureAntigravityProjectAssigned()` recovers a missing projectId via a
 * `loadCodeAssist` round-trip and hands it back to the caller for the in-flight
 * request only — nothing wrote it back to the connection record, so every
 * subsequent token refresh (or process restart) lost the discovery and forced a
 * fresh round-trip. This module is the single best-effort write path both call
 * sites (`open-sse/executors/antigravity.ts` and the models-discovery
 * normalizer) funnel through, mirroring the shape `mapAntigravityTokens()`
 * already persists at OAuth-exchange time (`src/lib/oauth/providers/antigravity.ts`).
 */

import { mergeConnectionProviderSpecificData, updateProviderConnection } from "@/lib/db/providers";
import { isUsableAntigravityProjectId } from "./antigravityProjectBootstrap.ts";

type AntigravityProjectConnectionLike = {
  projectId?: string | null;
  providerSpecificData?: unknown;
  errorCode?: string | null;
};

export function extractAntigravityProjectIdFromPayload(
  data: Record<string, unknown> | null | undefined
): string | null {
  if (!data || typeof data !== "object") return null;

  const raw = data.cloudaicompanionProject;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const id = (raw as Record<string, unknown>).id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }
  return null;
}

export function getStoredAntigravityProjectId(
  connection: Pick<AntigravityProjectConnectionLike, "projectId" | "providerSpecificData">
): string | null {
  const column = typeof connection.projectId === "string" ? connection.projectId.trim() : "";
  if (column) return column;

  const psd = connection.providerSpecificData as Record<string, unknown> | undefined;
  const fromPsd = typeof psd?.projectId === "string" ? psd.projectId.trim() : "";
  return fromPsd || null;
}

export function markAntigravityMissingCloudCodeProject(
  connectionId: string | null | undefined
): void {
  if (!connectionId) return;

  // #11284: a CONFIRMED missing Cloud Code project is not transient — disable
  // the row so selection rotates to healthy siblings instead of re-dispatching
  // into the same 422 every request. "unavailable" is deliberately NOT a
  // terminal status: discovery records the recovered project id without
  // re-enabling the row automatically.
  void updateProviderConnection(connectionId, {
    isActive: false,
    testStatus: "unavailable",
    errorCode: "missing_project_id",
    lastError:
      "Missing Google projectId for Antigravity account. Reconnect OAuth after completing Gemini Code Assist onboarding.",
    lastErrorType: "oauth_missing_project_id",
  }).catch(() => {});
}

/**
 * Write `discoveredProjectId` onto both the `projectId` column and
 * `providerSpecificData.projectId` for `connectionId`, preserving any other
 * `providerSpecificData` fields already on the connection.
 *
 * Best-effort / non-fatal by design: a persistence failure must never block
 * the in-flight request, which already has the discovered id in hand.
 */
/**
 * Selection-side companion of the persistence write path (#8894): given a pool
 * of Antigravity/AGY connections, prefer the ones that already carry a stored
 * projectId — they can serve a request without the `loadCodeAssist` discovery
 * round-trip. "Prefer", not "require": when NO connection has a stored project
 * the pool is returned unchanged, so a fresh install never empties its
 * candidate list.
 *
 * Sync on purpose (called inside the quota-strategy connection expansion, which
 * builds candidate lists without awaiting per-connection work). Tolerates
 * `providerSpecificData` arriving either parsed or as the raw DB JSON string.
 */
export function preferAntigravityConnectionsWithStoredProject<T extends object>(
  connections: T[]
): T[] {
  if (!Array.isArray(connections) || connections.length === 0) return connections;
  const hasStoredProject = (connection: T): boolean => {
    const record = connection as Record<string, unknown>;
    if (isUsableAntigravityProjectId(record.projectId)) return true;
    let psd = record.providerSpecificData;
    if (typeof psd === "string") {
      try {
        psd = JSON.parse(psd);
      } catch {
        return false;
      }
    }
    if (!psd || typeof psd !== "object") return false;
    return isUsableAntigravityProjectId((psd as Record<string, unknown>).projectId);
  };
  // #11284: rows whose missing Cloud Code project was CONFIRMED at request
  // time (errorCode="missing_project_id") are dead weight — drop them when a
  // healthier sibling exists. When every row is confirmed missing, keep the
  // pool so the typed 422 (not an empty-selection 404) explains what to fix.
  const hasHealthySibling = (connection: T): boolean =>
    connections.some(
      (other) =>
        other !== connection &&
        (other as Record<string, unknown>).errorCode !== "missing_project_id"
    );
  const candidates = connections.filter(
    (connection) =>
      (connection as Record<string, unknown>).errorCode !== "missing_project_id" ||
      !hasHealthySibling(connection) ||
      !hasStoredProject(connection)
  );
  const withStoredProject = candidates.filter(hasStoredProject);
  if (withStoredProject.length > 0) return withStoredProject;
  return candidates.length > 0 ? candidates : connections;
}

export async function persistDiscoveredAntigravityProjectId(
  connectionId: string | undefined | null,
  discoveredProjectId: string | undefined | null,
  _existingProviderSpecificData?: Record<string, unknown> | null
): Promise<void> {
  if (!connectionId || !isUsableAntigravityProjectId(discoveredProjectId)) return;
  try {
    // The column write keeps the other fields of the current row. Patch the
    // stored key from the value read inside the same write transaction: the
    // caller's snapshot may predate a concurrent metadata update and must not
    // replace the whole providerSpecificData object.
    await updateProviderConnection(connectionId, { projectId: discoveredProjectId });
    await mergeConnectionProviderSpecificData(connectionId, {
      projectId: discoveredProjectId,
    });
  } catch {
    // Non-fatal: persistence failure must never block the in-flight request.
  }
}
