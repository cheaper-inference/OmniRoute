import { handleProxyAssignmentPut } from "@/lib/api/proxyAssignmentWrite";
import { getProxyAssignments } from "@/lib/db/proxies";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const proxyId = searchParams.get("proxyId");
    const scope = searchParams.get("scope");
    const scopeId = searchParams.get("scopeId");
    const resolveConnectionId = searchParams.get("resolveConnectionId");

    if (resolveConnectionId) {
      const resolved = await resolveProxyForConnection(resolveConnectionId);
      return Response.json(resolved);
    }

    const assignments = await getProxyAssignments({
      proxyId: proxyId || undefined,
      scope: scope || undefined,
    });
    const filtered = scopeId
      ? assignments.filter((entry) => entry.scopeId === scopeId)
      : assignments;
    return Response.json({ items: filtered, total: filtered.length });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy assignments");
  }
}

export async function PUT(request: Request) {
  return handleProxyAssignmentPut(request, "Failed to update assignment");
}
