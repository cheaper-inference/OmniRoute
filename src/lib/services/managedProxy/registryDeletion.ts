import { getProxyById, deleteProxyById } from "@/lib/db/proxies";
import { managedProxyIdentity } from "@/lib/api/managedProxyRegistry";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import { removeManagedProxy } from "./remove";

/** Only the guarded services deletion endpoint supplies this process-owning adapter. */
export async function deleteManagedRegistryProxy(
  request: Request,
  id: string,
  force: boolean
): Promise<boolean> {
  if (request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) !== "loopback")
    throw new Error("Managed proxy deletion requires local access");
  const proxy = await getProxyById(id, { includeSecrets: false });
  const identity = managedProxyIdentity(proxy?.notes);
  if (!identity) return deleteProxyById(id, { force });
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) throw new Error("Managed proxy deletion requires authenticated management access");
  return removeManagedProxy(identity.core, identity.id, async () => {
    const deleted = await deleteProxyById(id, { force });
    if (!deleted) throw new Error("Managed proxy registry entry disappeared");
    return deleted;
  });
}
