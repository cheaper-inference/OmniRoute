import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isTrustedLoopbackInternalServiceRequest } from "@/lib/api/internalServiceAuth";
import {
  isModelSyncInternalRequest,
  isModelSyncLocalSpawnDenied,
} from "@/shared/services/modelSyncScheduler";
import { getRequestPeerLocality, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { resolveKeyConnectionScope } from "@/sse/services/keyConnectionScope";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

export async function requireRosebudAccess(request: Request, connectionId?: string) {
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) return denied;
  const key = extractApiKey(request, { allowUrl: false });
  if (!key) {
    // The internal hop proves only the transport, so a forwarded cookie must prove a real session.
    if (
      request.headers.has("cookie") &&
      isTrustedLoopbackInternalServiceRequest(request) &&
      !(await isDashboardSessionAuthenticated(request))
    )
      return errorResponse(401, "Rosebud requires an authenticated caller");
    return null; // authenticated dashboard / trusted management identity
  }
  const metadata = await getApiKeyMetadata(key);
  if (!metadata) return errorResponse(403, "Invalid management key");
  const scope = await resolveKeyConnectionScope(metadata);
  if (scope.rejection) return scope.rejection;
  if (
    scope.allowedConnections?.length &&
    (!connectionId || !scope.allowedConnections.includes(connectionId))
  )
    return errorResponse(403, "Rosebud connection is outside this API key's scope");
  return null;
}

const ROSEBUD_LOCAL_PEERS = new Set(["loopback", "lan"]);

/**
 * Rosebud discovery and sync run the local CLI, so its HTTP routes admit only loopback or LAN
 * peers. One helper keeps every route on the same peer verdict and the same allowed set.
 */
export function requireRosebudLocalPeer(request: Request): Response | null {
  if (ROSEBUD_LOCAL_PEERS.has(getRequestPeerLocality(request))) return null;
  return errorResponse(403, "Rosebud requires local or LAN access");
}

/** The scheduler's own loopback sync may refresh a catalog; everyone else needs normal access. */
export async function requireRosebudSyncAccess(request: Request, connectionId: string) {
  if (
    isModelSyncInternalRequest(request) &&
    !isModelSyncLocalSpawnDenied(request) &&
    getRequestPeerLocality(request) === "loopback"
  )
    return null;
  return requireRosebudAccess(request, connectionId);
}

export async function rosebudCallerScope(request: Request): Promise<string> {
  const key = extractApiKey(request, { allowUrl: false });
  if (!key) return "dashboard";
  const metadata = await getApiKeyMetadata(key);
  if (!metadata) throw new Error("Authenticated key metadata unavailable");
  return metadata.id;
}
