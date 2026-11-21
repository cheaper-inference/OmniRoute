import { getDbInstance } from "../core";
import { createProxyAndAssign, updateProxyAndAssign, createProxy, updateProxy } from "../proxies";
import type { ProxyAssignmentPayload, ProxyPayload } from "./types";

type ManagedIdentity = { id: string; core: string; name: string; port: number };

/**
 * Create or update the loopback SOCKS5 row identified by serialized managed-core notes.
 * Apply an optional assignment through the registry's combined persistence helpers.
 * @throws When an existing row disappears or creation returns no registry entry.
 */
export async function commitManagedProxy(
  entry: ManagedIdentity,
  assignment?: ProxyAssignmentPayload
) {
  const db = getDbInstance();
  const notes = JSON.stringify({ managedProxyId: entry.id, managedCore: entry.core });
  const existing = db
    .prepare("SELECT id FROM proxy_registry WHERE notes = ? LIMIT 1")
    .get(notes) as { id: string } | undefined;
  const payload: ProxyPayload = {
    name: entry.name,
    type: "socks5",
    host: "127.0.0.1",
    port: entry.port,
    username: "",
    password: "",
    notes,
    status: "active",
    source: "dashboard-custom",
    family: "auto",
  };
  if (existing) {
    const result = assignment
      ? (await updateProxyAndAssign(existing.id, payload, assignment))?.proxy
      : await updateProxy(existing.id, payload);
    if (!result) throw new Error("Managed registry entry disappeared during save");
    return result;
  }
  const result = assignment
    ? (await createProxyAndAssign(payload, assignment)).proxy
    : await createProxy(payload);
  if (!result) throw new Error("Managed registry creation failed");
  return result;
}
