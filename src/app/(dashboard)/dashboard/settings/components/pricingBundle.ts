import { collectConnectedProviderIds } from "./pricingTabFilters";

export type PricingSource = "default" | "litellm" | "modelsDev" | "user";

export interface SyncStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  nextSync: string | null;
  intervalMs: number;
  sources: string[];
}

export interface PricingCatalogModel {
  id: string;
  name: string;
  custom?: boolean;
}

export interface PricingCatalogProvider {
  id: string;
  alias: string;
  authType: string;
  format: string;
  modelCount: number;
  models: PricingCatalogModel[];
  /** Original pricing namespace (e.g. public prefix) when it differs from `alias`. */
  pricingKey?: string;
}

export type PricingBundle = {
  catalog?: Record<string, PricingCatalogProvider>;
  pricing?: Record<string, Record<string, Record<string, number>>>;
  sources?: Record<string, Record<string, PricingSource>>;
  sync?: SyncStatus;
  connectedProviderIds?: Set<string>;
  blockedProviders?: string[];
};

/** The JSON object of an optional response, or null when it failed or is not an object. */
async function optionalJsonObject(res: Response | null): Promise<Record<string, unknown> | null> {
  if (!res?.ok) return null;
  try {
    const body: unknown = await res.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/**
 * Loads Costs > Pricing. The connections and settings requests only feed the Configured
 * filter, so a request that fails outright, or answers with something other than a JSON
 * object, is read as "not loaded" instead of failing the whole tab.
 */
export async function fetchPricingBundle(): Promise<PricingBundle> {
  const [catalogRes, pricingRes, syncRes, connectionsRes, settingsRes] = await Promise.all([
    fetch("/api/pricing/models"),
    fetch("/api/pricing?includeSources=1"),
    fetch("/api/pricing/sync"),
    fetch("/api/providers").catch(() => null),
    fetch("/api/settings", { cache: "no-store" }).catch(() => null),
  ]);
  const bundle: PricingBundle = {};
  if (catalogRes.ok) {
    bundle.catalog = (await catalogRes.json()) as Record<string, PricingCatalogProvider>;
  }
  if (pricingRes.ok) {
    const pricingPayload = (await pricingRes.json()) as {
      pricing?: Record<string, Record<string, Record<string, number>>>;
      sourceMap?: Record<string, Record<string, PricingSource>>;
    };
    bundle.pricing = pricingPayload.pricing || {};
    bundle.sources = pricingPayload.sourceMap || {};
  }
  if (syncRes.ok) {
    bundle.sync = (await syncRes.json()) as SyncStatus;
  }
  const connectionsBody = await optionalJsonObject(connectionsRes);
  if (connectionsBody) {
    const { connections } = connectionsBody;
    bundle.connectedProviderIds = collectConnectedProviderIds(
      Array.isArray(connections) ? connections : []
    );
  }
  const settingsBody = await optionalJsonObject(settingsRes);
  if (settingsBody) {
    const { blockedProviders } = settingsBody;
    bundle.blockedProviders = Array.isArray(blockedProviders) ? blockedProviders : [];
  }
  return bundle;
}

/**
 * Whether the bundle carries both inputs of the Configured filter. Without the connections
 * it would list nothing, and without the block list it would count turned-off no-auth
 * providers as configured, so the filter is only offered once both have loaded.
 */
export function hasPricingConfiguration(bundle: PricingBundle): boolean {
  return Boolean(bundle.connectedProviderIds && bundle.blockedProviders);
}
