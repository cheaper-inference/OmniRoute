/** Shared classification for image, video, and TTS combo fallback. */

export interface MediaComboFallbackTarget {
  connectionId?: string | null;
}

export interface ResolvedMediaComboFallbackTarget {
  target: MediaComboFallbackTarget;
  provider: string | null;
}

export function pinnedConnectionIds(target: {
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
}): string[] | null {
  if (typeof target.connectionId === "string" && target.connectionId.trim()) {
    return [target.connectionId.trim()];
  }
  const allowed = Array.isArray(target.allowedConnectionIds)
    ? target.allowedConnectionIds.filter(
        (id): id is string => typeof id === "string" && id.trim().length > 0
      )
    : [];
  return allowed.length > 0 ? allowed : null;
}

const NO_ELIGIBLE_CONNECTION_ID = "__omniroute_key_scope_no_connection__";

/**
 * Intersect the caller key's connection scope with a media target's explicit
 * account pin without importing the app layer into the open-sse engine. A
 * disjoint pair must stay restrictive: an empty array is interpreted as
 * unscoped by credential selection, so use an impossible sentinel instead.
 */
export function narrowMediaConnectionScope(
  keyScope: string[] | null | undefined,
  targetScope: string[] | null | undefined
): string[] | null {
  const keyIds = Array.isArray(keyScope) ? keyScope : null;
  const targetIds = Array.isArray(targetScope) ? targetScope : null;
  if (!keyIds) return targetIds;
  if (!targetIds) return keyIds;

  const allowed = new Set(targetIds);
  const narrowed = keyIds.filter((id) => allowed.has(id));
  return narrowed.length > 0 ? narrowed : [NO_ELIGIBLE_CONNECTION_ID];
}

/**
 * 400/401/403 from an upstream media dispatch is target-local when a later
 * target can move the request onto a different provider or an explicitly
 * different provider account. An unpinned target on the same provider is not
 * enough: credential selection could simply choose the account that just
 * failed, turning fallback into a duplicate paid/slow request.
 *
 * Client schema validation and API-key policy errors never reach this helper;
 * routes reject those before combo dispatch.
 */
export function hasDistinctMediaFallback({
  currentProvider,
  currentConnectionId,
  remaining,
}: {
  currentProvider: string;
  currentConnectionId?: string | null;
  remaining: ResolvedMediaComboFallbackTarget[];
}): boolean {
  for (const candidate of remaining) {
    if (!candidate.provider) continue;
    if (candidate.provider !== currentProvider) return true;

    const candidateConnectionId = candidate.target.connectionId?.trim();
    if (
      currentConnectionId &&
      candidateConnectionId &&
      candidateConnectionId !== currentConnectionId
    ) {
      return true;
    }
  }
  return false;
}

export function isTargetLocalMediaStatus(status: number): boolean {
  return status === 400 || status === 401 || status === 403;
}

function credentialConnectionIdOf(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object") return null;
  const id = (credentials as { connectionId?: unknown }).connectionId;
  return id ? String(id) : null;
}

/**
 * Single decision point shared by the image and speech combos: a failed
 * dispatch is terminal unless it is a target-local 400/401/403 AND a later
 * target moves the request onto a distinct provider/account.
 */
export function isTerminalMediaFailure({
  status,
  provider,
  credentials,
  target,
  remaining,
}: {
  status: number;
  provider: string;
  credentials: unknown;
  target: MediaComboFallbackTarget;
  remaining: ResolvedMediaComboFallbackTarget[];
}): boolean {
  if (!isTargetLocalMediaStatus(status)) return false;
  return !hasDistinctMediaFallback({
    currentProvider: provider,
    currentConnectionId: credentialConnectionIdOf(credentials) || target.connectionId || null,
    remaining,
  });
}
