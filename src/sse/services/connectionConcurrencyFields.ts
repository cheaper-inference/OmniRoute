/**
 * Concurrency fields copied from a stored connection onto the selected
 * credentials (#13700). Shared by `auth.ts` materializeConnection and the
 * optional no-auth key path so both propagate the same caps. The per-model
 * map is normalized fail-open: a missing or malformed map yields null, which
 * the chat core treats as "no model gate".
 */
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { normalizeModelConcurrencyMap } from "@/lib/db/providers/columns";

export function resolveConnectionConcurrencyCeiling(
  provider: string | null | undefined
): number | null {
  return provider === "copilot-m365-web" ? 1 : null;
}

export function buildConnectionConcurrencyFields(connection: ProviderConnectionView): {
  maxConcurrent: number | null;
  rateLimitMaxConcurrent: number | null;
  modelConcurrency: Record<string, number> | null;
} {
  // M365 admits one turn per account, across all models. Use the existing
  // account semaphore via credentials; overrides must not reopen parallel turns.
  const concurrencyCeiling = resolveConnectionConcurrencyCeiling(connection.provider);
  return {
    maxConcurrent: concurrencyCeiling ?? connection.maxConcurrent,
    rateLimitMaxConcurrent: concurrencyCeiling ?? connection.rateLimitMaxConcurrent,
    modelConcurrency: normalizeModelConcurrencyMap(connection.rateLimitOverrides?.modelConcurrency),
  };
}

export function resolveAccountConcurrencyLimit(
  configured: number | null,
  override: number | null,
  protectionEnabled: boolean
): number | null {
  return protectionEnabled && override != null && override > 0 ? override : configured;
}
