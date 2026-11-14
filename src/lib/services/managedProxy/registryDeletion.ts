import { getProxyById, deleteProxyById, getProxyWhereUsed } from "@/lib/db/proxies";
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
    throw Object.assign(new Error("Managed proxy deletion requires local access"), { status: 403 });
  const proxy = await getProxyById(id, { includeSecrets: false });
  const identity = managedProxyIdentity(proxy?.notes);
  if (!identity) return deleteProxyById(id, { force });
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied)
    throw Object.assign(
      new Error("Managed proxy deletion requires authenticated management access"),
      {
        status: denied.status,
      }
    );
  const usage = await getProxyWhereUsed(id);
  if (!force && usage.count > 0)
    throw Object.assign(
      new Error(
        "Proxy is still in use. Remove assignments or account references first, or use force=true"
      ),
      {
        status: 409,
        code: "proxy_in_use",
        details: usage,
      }
    );
  return removeManagedProxy(identity.core, identity.id, async () => {
    const deleted = await deleteProxyById(id, { force });
    if (!deleted) throw new Error("Managed proxy registry entry disappeared");
    return deleted;
  });
}
