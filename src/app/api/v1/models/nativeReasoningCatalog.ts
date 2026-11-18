import {
  buildNativeReasoningFamilies,
  type NativeReasoningRow,
} from "@omniroute/open-sse/services/nativeReasoningFamilies.ts";
import type { ComboCatalogTarget, ComboTargetCatalogMetadata } from "./catalogHelpers";

function positiveLimit(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

/**
 * Concrete tiers may use different accounts; their union is routable after early resolution.
 * The family's own limits (the smallest across its tiers) and its vision evidence are kept, so
 * the combo aggregation can never advertise a wider window than a native tier allows.
 */
export function nativeReasoningComboMetadata<C extends { id: string }>(
  provider: string,
  model: string,
  target: ComboCatalogTarget,
  connections: ReadonlyArray<C>,
  catalogs: Record<string, readonly NativeReasoningRow[]>,
  eligible: (connection: C, model: string) => boolean
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
  if (!family) return null;
  const metadata: ComboTargetCatalogMetadata = {
    capabilities: { reasoning: true, effort_tiers: family.supportedThinkingEfforts },
  };
  const inputLimit = positiveLimit(family.inputTokenLimit);
  if (inputLimit !== undefined) {
    metadata.contextLength = inputLimit;
    metadata.maxInputTokens = inputLimit;
  }
  const outputLimit = positiveLimit(family.outputTokenLimit);
  if (outputLimit !== undefined) metadata.maxOutputTokens = outputLimit;
  if (family.supportsVision === true) {
    metadata.capabilities.vision = true;
    metadata.inputModalities = ["text", "image"];
    metadata.outputModalities = ["text"];
  }
  return metadata;
}
