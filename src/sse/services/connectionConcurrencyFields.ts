/**
 * Concurrency fields copied from a stored connection onto the selected
 * credentials (#13700). Shared by `auth.ts` materializeConnection and the
 * optional no-auth key path so both propagate the same caps. The per-model
 * map is normalized fail-open: a missing or malformed map yields null, which
 * the chat core treats as "no model gate".
 */
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { normalizeModelConcurrencyMap } from "@/lib/db/providers/columns";

export function buildConnectionConcurrencyFields(connection: ProviderConnectionView): {
  maxConcurrent: number | null;
  rateLimitMaxConcurrent: number | null;
  modelConcurrency: Record<string, number> | null;
  newSessionMaxConcurrent: number | null;
} {
  // M365 admits one turn per account, across all models. Use the existing
  // account semaphore via credentials; overrides must not reopen parallel turns.
  const serialM365 = connection.provider === "copilot-m365-web";
  return {
    maxConcurrent: serialM365 ? 1 : connection.maxConcurrent,
    rateLimitMaxConcurrent: serialM365 ? 1 : connection.rateLimitMaxConcurrent,
    modelConcurrency: normalizeModelConcurrencyMap(connection.rateLimitOverrides?.modelConcurrency),
    newSessionMaxConcurrent: connection.rateLimitOverrides?.newSessionMaxConcurrent ?? null,
  };
}
