import { getCachedProviderNodes } from "@/lib/db/readCache";
import { collapseProviderPrefix, resolveProviderNodePrefix } from "@/shared/utils/modelIdPrefix";

/**
 * Normalize a model id for storage on a compatible-provider node: strip any
 * stacked copy of the node's own prefix from an id pasted from a prefixed
 * listing (e.g. `strata/strata/qwen-…` → `qwen-…`).
 *
 * Scoped to compatible nodes on purpose — a canonical provider's ids may
 * legitimately begin with the provider's own name (`nvidia/nemotron-…`) and
 * must be stored verbatim. Fail-open by design: if the node lookup is
 * unavailable, the id is stored as submitted rather than failing the write.
 */
export async function normalizeNodeModelId(provider: string, modelId: string): Promise<string> {
  try {
    const nodes = await getCachedProviderNodes();
    const node = nodes.find((n) => n && n.id === provider);
    const nodePrefix = resolveProviderNodePrefix(node);
    if (!nodePrefix) return modelId;
    return collapseProviderPrefix(`${nodePrefix}/${modelId}`, [nodePrefix]);
  } catch {
    return modelId;
  }
}
