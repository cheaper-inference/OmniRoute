import { getProxyById, deleteProxyById } from "@/lib/db/proxies";
import { createErrorResponse } from "./errorResponse";
import type { ManagedCore } from "@/lib/services/managedProxy/config";

export function managedProxyIdentity(
  notes: string | null | undefined
): { id: string; core: ManagedCore } | null {
  if (!notes) return null;
  try {
    const value = JSON.parse(notes);
    if (typeof value.managedProxyId === "string" && ["singbox", "xray"].includes(value.managedCore))
      return { id: value.managedProxyId, core: value.managedCore };
  } catch {
    /* Ordinary proxy notes are free text. */
  }
  return null;
}

export async function rejectManagedEndpointEdit(
  id: string,
  changes: Record<string, unknown>
): Promise<Response | null> {
  const proxy = await getProxyById(id, { includeSecrets: false });
  if (!managedProxyIdentity(proxy?.notes)) return null;
  if (
    ["type", "host", "port", "username", "password", "notes", "source"].some(
      (key) => key in changes
    )
  )
    return createErrorResponse({
      status: 400,
      message: "Edit managed proxy source through the local managed-core endpoint",
      type: "invalid_request",
    });
  return null;
}

export async function deleteProxyWithManagedCleanup(
  _request: Request,
  id: string,
  force: boolean
): Promise<boolean> {
  const proxy = await getProxyById(id, { includeSecrets: false });
  if (managedProxyIdentity(proxy?.notes))
    throw new Error(
      "Managed proxy deletion requires the authenticated local managed-core endpoint"
    );
  return deleteProxyById(id, { force });
}
