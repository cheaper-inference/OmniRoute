import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { extractApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { resolveKeyConnectionScope } from "@/sse/services/keyConnectionScope";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

export async function requireRosebudAccess(request: Request, connectionId?: string) {
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) return denied;
  const key = extractApiKey(request, { allowUrl: false });
  if (!key) return null; // authenticated dashboard / trusted management identity
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

export async function rosebudCallerScope(request: Request): Promise<string> {
  const key = extractApiKey(request, { allowUrl: false });
  if (!key) return "dashboard";
  const metadata = await getApiKeyMetadata(key);
  if (!metadata) throw new Error("Authenticated key metadata unavailable");
  return metadata.id;
}
