import {
  buildNativeReasoningFamilies,
  type NativeReasoningRow,
} from "@omniroute/open-sse/services/nativeReasoningFamilies.ts";
import type { ComboCatalogTarget, ComboTargetCatalogMetadata } from "./catalogHelpers";

/** Concrete tiers may use different accounts; their union is routable after early resolution. */
export function nativeReasoningComboMetadata(
  provider: string,
  model: string,
  target: ComboCatalogTarget,
  connections: ReadonlyArray<{ id: string }>,
  catalogs: Record<string, readonly NativeReasoningRow[]>,
  eligible: (connection: { id: string }, model: string) => boolean
): ComboTargetCatalogMetadata | null {
  const rows = connections
    .filter(
      (connection) =>
        (!target.connectionId || connection.id === target.connectionId) &&
        (!target.allowedConnectionIds?.length ||
          target.allowedConnectionIds.includes(connection.id))
    )
    .flatMap((connection) =>
      (catalogs[connection.id] || []).filter((row) => eligible(connection, row.id))
    );
  const family = buildNativeReasoningFamilies(provider, rows).find((row) => row.id === model);
  return family
    ? { capabilities: { reasoning: true, effort_tiers: family.supportedThinkingEfforts } }
    : null;
}
