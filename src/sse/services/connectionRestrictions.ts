import { constrainConnectionsToQuota, resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { comboPinAllowlist } from "@/lib/combos/steps.ts";
import { intersectAllowedConnectionIds } from "@/sse/handlers/chat/connectionConstraints.ts";
import { getConnectionRestrictionSources } from "./credentialSelectionDiagnostics.ts";

/** Pair the existing allowlist intersection with its diagnostic provenance. */
export function resolveConnectionRestrictions(
  key: { allowedConnections?: unknown; allowedQuotas?: unknown } | null | undefined,
  target:
    { connectionId?: string | null; allowedConnectionIds?: string[] | null } | null | undefined,
  isCombo: boolean
) {
  const routingAllowlist = comboPinAllowlist(
    isCombo,
    target?.connectionId,
    target?.allowedConnectionIds
  );
  return {
    allowedConnections: intersectAllowedConnectionIds(key?.allowedConnections, routingAllowlist),
    sources: getConnectionRestrictionSources({
      keyAllowlist: key?.allowedConnections,
      keyQuotas: key?.allowedQuotas,
      routingAllowlist,
      isCombo,
    }),
  };
}

/** Apply the same quota and optional native-model scope to preflight and dispatch. */
export async function resolveScopedConnectionRestrictions(
  restrictions: ReturnType<typeof resolveConnectionRestrictions>,
  allowedQuotas: readonly string[] | null | undefined,
  modelConnections?: readonly string[]
) {
  let allowedConnections = restrictions.allowedConnections;
  if (allowedQuotas?.length) {
    const quota = await resolveQuotaKeyScope([...allowedQuotas]);
    allowedConnections = constrainConnectionsToQuota(allowedConnections ?? [], quota.connectionIds);
  }
  if (modelConnections !== undefined) {
    const allowed = allowedConnections;
    allowedConnections = modelConnections.filter((id) => !allowed || allowed.includes(id));
  }
  return { ...restrictions, allowedConnections };
}
