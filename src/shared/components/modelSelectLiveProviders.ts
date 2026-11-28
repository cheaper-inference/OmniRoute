// Pure helpers for the live (`/api/providers/<connId>/models`) catalog shown in
// ModelSelectModal. Kept free of React imports so node:test can exercise them.

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  AI_PROVIDERS,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { collapseProviderPrefix } from "@/shared/utils/modelIdPrefix";

function isCustomCompatibleProvider(providerId: string): boolean {
  return isOpenAICompatibleProvider(providerId) || isAnthropicCompatibleProvider(providerId);
}

/**
 * Registered providers whose picker catalogs come from discovery, including
 * Nous Research, which keeps a static fallback. The picker only renders alias
 * and custom rows for passthrough providers.
 */
function isLiveCatalogProvider(providerId: string): boolean {
  const uiEntry = (AI_PROVIDERS as Record<string, { passthroughModels?: boolean }>)[providerId];
  if (!uiEntry || uiEntry.passthroughModels) return false;
  const entry = getRegistryEntry(providerId);
  return (
    !!entry && (providerId === "nous-research" || (entry.models.length === 0 && !!entry.modelsUrl))
  );
}

/** Whether the picker should fetch this provider's live catalog when it opens. */
export function shouldFetchLiveModels(providerId: string): boolean {
  if (!providerId) return false;
  return isCustomCompatibleProvider(providerId) || isLiveCatalogProvider(providerId);
}

/**
 * Whether a fetched live catalog is worth keeping. Custom nodes keep the
 * historical "more than one model" heuristic. A single model is enough for
 * registered live catalogs.
 */
export function hasUsableLiveModels(providerId: string, models: unknown[] | null): boolean {
  if (!Array.isArray(models)) return false;
  return isCustomCompatibleProvider(providerId) ? models.length > 1 : models.length > 0;
}

export type LiveModelEntry = {
  id: string;
  name: string;
  value: string;
  isFetched: true;
  source: "auto";
};

function readLiveModel(raw: unknown): { id: string; name?: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const model = raw as Record<string, unknown>;
  const id = model.id || model.slug || model.model || model.name;
  if (typeof id !== "string" || !id) return null;
  const name = model.name || model.displayName;
  return { id, name: typeof name === "string" ? name : undefined };
}

/**
 * Map live models to picker rows tagged `source: "auto"`. Rows whose id is already
 * provided by another source (`existingIds`) win over the live duplicate, hidden
 * ids are dropped, and repeated live ids are collapsed so `value` stays unique.
 */
export function buildLiveModelEntries(opts: {
  liveModels: unknown[];
  prefix: string;
  existingIds: Iterable<string>;
  isHidden: (modelId: string) => boolean;
}): LiveModelEntry[] {
  // Catalogs cached before normalization can still carry the Nous prefix.
  const legacyPrefixes = opts.prefix === "nous" ? ["nous", "nous-research"] : [];
  const normalizeId = (id: string) =>
    legacyPrefixes.length > 0 ? collapseProviderPrefix(id, legacyPrefixes) : id;
  const isHidden = (id: string, rawId: string) =>
    opts.isHidden(id) ||
    (id !== rawId && opts.isHidden(rawId)) ||
    legacyPrefixes.some((prefix) => opts.isHidden(`${prefix}/${id}`));
  const seen = new Set(Array.from(opts.existingIds, normalizeId));
  const entries: LiveModelEntry[] = [];
  for (const raw of opts.liveModels || []) {
    const model = readLiveModel(raw);
    if (!model) continue;
    const id = normalizeId(model.id);
    if (seen.has(id) || isHidden(id, model.id)) continue;
    seen.add(id);
    entries.push({
      id,
      name: model.name || id,
      value: `${opts.prefix}/${id}`,
      isFetched: true,
      source: "auto",
    });
  }
  return entries;
}
