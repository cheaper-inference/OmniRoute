import { handleProxyBatchDelete } from "@/lib/api/proxyDeletionHandlers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/** POST /api/settings/proxies/batch-delete preserves ordered per-item results. */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyBatchDelete(request);
}
