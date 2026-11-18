// Pure helpers for the live (`/api/providers/<connId>/models`) catalog shown in
// ModelSelectModal. Kept free of React imports so node:test can exercise them.

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  AI_PROVIDERS,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

function isCustomCompatibleProvider(providerId: string): boolean {
  return isOpenAICompatibleProvider(providerId) || isAnthropicCompatibleProvider(providerId);
}

/**
 * A registered provider whose static catalog is intentionally empty and which is
 * discovered live via `modelsUrl` (e.g. zed-hosted). Providers the dashboard
 * marks as passthrough are excluded: the picker renders their alias/custom rows
 * instead, so a live fetch would never be shown.
 */
function isLiveOnlyCatalogProvider(providerId: string): boolean {
  const uiEntry = (AI_PROVIDERS as Record<string, { passthroughModels?: boolean }>)[providerId];
  if (!uiEntry || uiEntry.passthroughModels) return false;
  const entry = getRegistryEntry(providerId);
  return !!entry && entry.models.length === 0 && !!entry.modelsUrl;
}

/** Whether the picker should fetch this provider's live catalog when it opens. */
export function shouldFetchLiveModels(providerId: string): boolean {
  if (!providerId) return false;
  return isCustomCompatibleProvider(providerId) || isLiveOnlyCatalogProvider(providerId);
}

/**
 * Whether a fetched live catalog is worth keeping. Custom nodes keep the
 * historical "more than one model" heuristic; live-only providers have no other
 * source, so a single model is enough.
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
  const seen = new Set<string>(opts.existingIds);
  const entries: LiveModelEntry[] = [];
  for (const raw of opts.liveModels || []) {
    if (!raw || typeof raw !== "object") continue;
    const m = raw as Record<string, unknown>;
    const id = m.id || m.slug || m.model || m.name;
    if (typeof id !== "string" || !id || seen.has(id) || opts.isHidden(id)) continue;
    seen.add(id);
    const name = m.name || m.displayName || id;
    entries.push({
      id,
      name: typeof name === "string" ? name : id,
      value: `${opts.prefix}/${id}`,
      isFetched: true,
      source: "auto",
    });
  }
  return entries;
}
