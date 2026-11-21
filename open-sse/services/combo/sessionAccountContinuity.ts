import { getSessionAffinityStore } from "../../../src/lib/db/sessionAccountAffinity";
import { getCachedProviderConnectionById } from "../../../src/lib/db/readCache";
import { resolveSessionAffinityConnection } from "../../../src/lib/db/sessionAffinity/accountIdentity";
import {
  resolveSessionAffinityTtlMs,
  type AffinityPinSettings,
} from "../../../src/sse/services/sessionAffinityPin";
import type { ResolvedComboTarget } from "./types";

/**
 * Auto targets carry singleton account scopes. Preserve a session before entering
 * those scopes, rather than letting a fresh score erase its existing binding.
 * Only reorder existing candidates for the chosen provider/model: ACL, excluded
 * accounts, capability filters and dispatch-time eligibility still apply.
 */
export async function preferSessionAccountTarget(
  targets: ResolvedComboTarget[],
  sessionKey: string | null | undefined,
  settings: AffinityPinSettings | null | undefined
): Promise<ResolvedComboTarget[]> {
  const head = targets[0];
  if (!head || !sessionKey || targets.length < 2) return targets;
  const provider = head.providerId || head.provider;
  const ttl = resolveSessionAffinityTtlMs(provider, {}, settings || {});
  if (ttl <= 0) return targets;
  const record = await getSessionAffinityStore().get(sessionKey, provider, ttl);
  if (!record || Date.parse(record.expiresAt) <= Date.now()) return targets;
  const candidate = targets.find(
    (target) =>
      (target.providerId || target.provider) === provider &&
      target.modelStr === head.modelStr &&
      target.connectionId === record.connectionId &&
      (!target.allowedConnectionIds || target.allowedConnectionIds.includes(record.connectionId))
  );
  if (!candidate || candidate === head) return targets;
  // State read through the shared read cache (invalidated on every connection
  // write): this only reorders candidates, dispatch still selects and leases.
  const connection = await getCachedProviderConnectionById(record.connectionId);
  if (
    !connection ||
    !connection.isActive ||
    !resolveSessionAffinityConnection(
      record,
      [{ ...connection, id: record.connectionId }],
      provider
    )
  )
    return targets;
  return [candidate, ...targets.filter((target) => target !== candidate)];
}
