import { getCodexModelScope, type CodexQuotaScope } from "../../config/codexQuotaScopes.ts";
import { getProviderConnectionById, updateCodexScopeCooldown } from "@/lib/db/providers";

// Single seam to the connection table for Codex engine code: the passive refresh reread
// (tokenRefresh/passiveCodex.ts) loads this lazily instead of importing src/ itself
// (open-sse → src boundary ratchet, quality-baseline.json).
export { getProviderConnectionById };

export interface PersistCodexChildCooldownResult {
  readonly scope: CodexQuotaScope;
  readonly providerSpecificData: Record<string, unknown>;
}

/** Persist one virtual child's cooldown without mutating parent-level health state. */
export async function persistCodexChildCooldown(params: {
  connectionId: string;
  model: string;
  rateLimitedUntil: string;
}): Promise<PersistCodexChildCooldownResult | null> {
  if (params.model.trim().length === 0) return null;
  const scope = getCodexModelScope(params.model);
  const providerSpecificData = await updateCodexScopeCooldown(
    params.connectionId,
    scope,
    params.rateLimitedUntil
  );
  return providerSpecificData ? { scope, providerSpecificData } : null;
}
