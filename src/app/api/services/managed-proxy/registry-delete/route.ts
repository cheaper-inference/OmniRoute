import { createErrorResponse } from "@/lib/api/errorResponse";
import { handleProxyBatchDelete, handleProxyDelete } from "@/lib/api/proxyDeletionHandlers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { deleteManagedRegistryProxy } from "@/lib/services/managedProxy/registryDeletion";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import { proxyDeletionAuthRequest } from "@/server/authz/managedProxyDeletionDispatch";

export const runtime = "nodejs";

async function handleDeletion(request: Request): Promise<Response> {
  const authRequest = proxyDeletionAuthRequest(request);
  if (request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) !== "loopback" || !authRequest)
    return createErrorResponse({
      status: 403,
      message: "Managed proxy deletion requires local pipeline dispatch",
      type: "invalid_request",
    });

  const denied = await requireManagementAuth(authRequest);
  if (denied) return denied;
  const remove = (_request: Request, id: string, force: boolean) =>
    deleteManagedRegistryProxy(authRequest, id, force);
  return request.method === "POST"
    ? handleProxyBatchDelete(request, remove)
    : handleProxyDelete(request, remove);
}

export const DELETE = handleDeletion;
export const POST = handleDeletion;
