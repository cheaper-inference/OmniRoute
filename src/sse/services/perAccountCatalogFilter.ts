import { isModelAdvertisedByConnection } from "@/domain/connectionModelRules";

/**
 * Hosted providers whose model entitlement differs PER ACCOUNT (plan/tier), so the
 * per-connection synced inventory is authoritative for routing. Antigravity: only
 * Ultra accounts are offered the 5.5 Claude models; the rest list 4.6 only and answer
 * 403/404/429 to a 5.5 request, burning a retry (and a cooldown) per account.
 * `agy` connections are served from the same account pool as `antigravity`, and a model can
 * be advertised only by them (Gemini 4 Argon), so both inventories are judged together.
 */
const PER_ACCOUNT_CATALOG_PROVIDERS = new Set(["antigravity", "agy"]);

export function isPerAccountCatalogProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && PER_ACCOUNT_CATALOG_PROVIDERS.has(providerId);
}

/**
 * Keep a provider's per-connection inventory only when at least one account really
 * advertises the requested model. If none does, the synced lists are stale or
 * incomplete (a hidden model, a sync that predates a plan upgrade): fail OPEN and
 * return an empty map so selection is unchanged instead of emptying the whole pool.
 */
export function inventoryOrFailOpen(
  requestedModel: string,
  inventory: Map<string, Set<string>>
): Map<string, Set<string>> {
  for (const models of inventory.values()) {
    if (models.size > 0 && isModelAdvertisedByConnection(requestedModel, models)) return inventory;
  }
  return new Map();
}
