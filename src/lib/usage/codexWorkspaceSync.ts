import {
  fetchCodexWorkspaceInfo,
  type CodexWorkspaceInfo,
} from "@omniroute/open-sse/services/usage/codexWorkspace.ts";

// Workspace names and seats change rarely; one lookup a week per connection.
export const CODEX_WORKSPACE_INFO_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// A failed lookup (blocked endpoint, 403, proxy) is not retried on every usage
// refresh: the label is display-only and each attempt can wait for the timeout.
export const CODEX_WORKSPACE_INFO_FAILURE_BACKOFF_MS = 60 * 60 * 1000;

const lastFailureAt = new Map<string, number>();

/** Test hook: forget every recorded lookup failure. */
export function resetCodexWorkspaceInfoBackoff(): void {
  lastFailureAt.clear();
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

interface CodexConnectionLike {
  id: string;
  provider?: string;
  accessToken?: string | null;
  providerSpecificData?: unknown;
}

export interface CodexWorkspaceSyncDeps {
  /**
   * Merges the workspace keys into the connection's stored providerSpecificData.
   * It receives only those keys, never the snapshot read before the lookup, so a
   * field another path stored while the request was in flight is kept.
   */
  persist: (connectionId: string, workspaceFields: Record<string, unknown>) => Promise<unknown>;
  fetchInfo?: (
    accessToken: string,
    workspaceId: string | null,
    options: { connectionId?: string }
  ) => Promise<CodexWorkspaceInfo | null>;
  now?: () => number;
}

/**
 * Stores the ChatGPT workspace name, structure and role of a Codex connection
 * on providerSpecificData so the provider dashboard can tell a personal plan
 * from a Business seat. Runs after a successful usage fetch (the access token
 * is known to work), at most once per TTL, and never fails the usage refresh.
 */
export async function syncCodexWorkspaceInfoIfNeeded<T extends CodexConnectionLike>(
  connection: T,
  deps: CodexWorkspaceSyncDeps
): Promise<T> {
  if (connection.provider !== "codex" || !connection.accessToken) return connection;
  const psd = asRecord(connection.providerSpecificData);
  const now = (deps.now ?? Date.now)();
  const fetchedAt =
    typeof psd.workspaceInfoFetchedAt === "string" ? Date.parse(psd.workspaceInfoFetchedAt) : NaN;
  if (Number.isFinite(fetchedAt) && now - fetchedAt < CODEX_WORKSPACE_INFO_TTL_MS) {
    return connection;
  }
  const failedAt = lastFailureAt.get(connection.id);
  if (
    failedAt !== undefined &&
    Math.abs(now - failedAt) < CODEX_WORKSPACE_INFO_FAILURE_BACKOFF_MS
  ) {
    return connection;
  }

  const workspaceId = typeof psd.workspaceId === "string" ? psd.workspaceId : null;
  const info = await (deps.fetchInfo ?? fetchCodexWorkspaceInfo)(
    connection.accessToken,
    workspaceId,
    { connectionId: connection.id }
  );
  if (!info) {
    lastFailureAt.set(connection.id, now);
    return connection;
  }
  lastFailureAt.delete(connection.id);

  const workspaceFields: Record<string, unknown> = {
    workspaceName: info.workspaceName,
    workspaceStructure: info.workspaceStructure,
    workspaceRole: info.workspaceRole,
    workspaceInfoFetchedAt: new Date(now).toISOString(),
  };
  try {
    await deps.persist(connection.id, workspaceFields);
  } catch (error) {
    console.warn(
      "[ProviderLimits] Could not store Codex workspace info for %s: %s",
      connection.id,
      error instanceof Error ? error.message : String(error)
    );
    return connection;
  }
  return { ...connection, providerSpecificData: { ...psd, ...workspaceFields } };
}
