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
