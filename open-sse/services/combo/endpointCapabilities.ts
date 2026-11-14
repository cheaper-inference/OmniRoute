/** Project a stored combo onto a dispatch surface before credentials, scoring or attempts. */
import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";
import { WEB_FETCH_PROVIDERS } from "@omniroute/open-sse/config/webFetchProviders.ts";
import { getImageModelEntry, isImageOnlyModel } from "@omniroute/open-sse/config/imageRegistry.ts";
import { getModelsByProviderId } from "@omniroute/open-sse/config/providerModels.ts";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
import { getMusicProvider } from "@omniroute/open-sse/config/musicRegistry.ts";
import { getOcrProvider } from "@omniroute/open-sse/config/ocrRegistry.ts";
import {
  getSpeechProvider,
  getTranscriptionProvider,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import type { ComboCollectionLike, ComboLike } from "./types.ts";
import { MAX_COMBO_DEPTH_HARD_CAP } from "./comboPredicates.ts";
import type { ComboEndpoint } from "../../config/comboEndpoints.ts";
import {
  getComboModelString,
  normalizeComboStep,
  resolveComboProviderId,
  type ComboStep,
} from "./comboStructure.ts";

export type { ComboEndpoint } from "../../config/comboEndpoints.ts";

type CapabilityRoute = {
  models?: unknown;
  strategy?: unknown;
  config?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

/** Resolve an endpoint-specific plan while keeping legacy combos byte-compatible. */
export function comboForEndpoint(combo: ComboLike, endpoint: ComboEndpoint): ComboLike {
  // The top-level fields remain the canonical Chat plan for legacy clients and
  // partial updates. routes.chat is a persistence mirror, never a second source
  // of truth that can retain targets removed from the top-level plan.
  if (endpoint === "chat") return combo;
  const routes = isRecord(combo.routes) ? combo.routes : null;
  const route = routes && isRecord(routes[endpoint]) ? (routes[endpoint] as CapabilityRoute) : null;
  if (!route) return combo;
  return {
    ...combo,
    models: Array.isArray(route.models) ? route.models : [],
    strategy: typeof route.strategy === "string" ? route.strategy : combo.strategy,
    config: isRecord(route.config) ? route.config : {},
    capabilityRoute: endpoint,
  };
}

/** Resolve aliases to the provider id used by capability registries. */
export function targetProvider(modelStr: string, hint?: string | null): string {
  return resolveComboProviderId(hint || modelStr.split("/")[0]);
}

type ModelCatalog = { models?: Array<{ id?: string }> } | null | undefined;

/** Registries that decide which provider/model pairs serve one media endpoint. */
const MEDIA_ENDPOINT_CATALOGS: Partial<Record<ComboEndpoint, (provider: string) => ModelCatalog>> =
  {
    videos: getVideoProvider,
    music: getMusicProvider,
    ocr: getOcrProvider,
    "audio-speech": getSpeechProvider,
    "audio-transcriptions": getTranscriptionProvider,
    "audio-translations": getTranscriptionProvider,
  };

/** Tell whether a catalog lists the model; null when the provider has no catalog. */
function catalogHasModel(catalog: ModelCatalog, modelId: string, modelStr: string): boolean | null {
  if (!catalog) return null;
  if (!Array.isArray(catalog.models) || catalog.models.length === 0) return true;
  return catalog.models.some((model) => model.id === modelId || model.id === modelStr);
}

/** Answer for dedicated web executors, which must never reach DefaultExecutor's OpenAI fallback. */
function webEndpointSupport(provider: string, endpoint: ComboEndpoint): boolean | null {
  const search = Object.hasOwn(SEARCH_PROVIDERS, provider) ? SEARCH_PROVIDERS[provider] : undefined;
  const fetch = (WEB_FETCH_PROVIDERS as readonly string[]).includes(provider);
  if (endpoint === "search") return Boolean(search && !search.disabled);
  if (endpoint === "web-fetch") return fetch;
  return search || fetch ? false : null;
}

/** A model served only by media registries must not be dispatched as chat. */
function isMediaOnlyTarget(provider: string, modelStr: string, modelId: string): boolean {
  if (getModelsByProviderId(provider).some((m) => m.id === modelId || m.id === modelStr)) {
    return false;
  }
  const inMediaCatalog = Object.values(MEDIA_ENDPOINT_CATALOGS).some(
    (lookup) => catalogHasModel(lookup(provider), modelId, modelStr) === true
  );
  return inMediaCatalog || Boolean(getImageModelEntry(modelStr) && isImageOnlyModel(modelStr));
}

/** Check whether a provider/model target can serve the requested endpoint. */
export function targetSupportsEndpoint(
  modelStr: string,
  endpoint: ComboEndpoint,
  hint?: string | null
): boolean {
  const provider = targetProvider(modelStr, hint);
  const webSupport = webEndpointSupport(provider, endpoint);
  if (webSupport !== null) return webSupport;
  if (endpoint === "images" || endpoint === "image-edits") {
    return Boolean(getImageModelEntry(modelStr));
  }
  const modelId = modelStr.includes("/") ? modelStr.slice(modelStr.indexOf("/") + 1) : modelStr;
  const mediaCatalog = MEDIA_ENDPOINT_CATALOGS[endpoint];
  if (mediaCatalog) return catalogHasModel(mediaCatalog(provider), modelId, modelStr) ?? true;
  if (endpoint === "audio-generation") return provider === "elevenlabs";
  if (endpoint === "chat") return !isMediaOnlyTarget(provider, modelStr, modelId);
  // Keep existing non-web endpoint guards and opt-in modality bridges authoritative.
  // Unknown/custom models cannot be rejected solely because a static catalog lacks them.
  return true;
}

/** Project a combo DAG onto one endpoint and prune empty nested branches. */
export function projectComboForEndpoint(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  endpoint: ComboEndpoint
): {
  combo: ComboLike & { models: ComboStep[] };
  allCombos: ComboLike[];
} {
  const collection = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const stored = collection.map((item) => {
    const normalized = {
      ...item,
      name: String(item.name || ""),
      models: Array.isArray(item.models) ? item.models : [],
    } as ComboLike;
    return comboForEndpoint(normalized, endpoint);
  });
  const storedByName = new Map(stored.map((item) => [item.name, item]));
  const comboNames = new Set(storedByName.keys());
  const project = (item: ComboLike) => ({
    ...item,
    models: item.models
      .map((entry, index) => normalizeComboStep(entry, { comboName: item.name, index, comboNames }))
      .filter((step): step is ComboStep => Boolean(step))
      .filter((step) => {
        if (step.kind === "combo-ref") return true; // DAG validation/expansion remains in combo engine.
        const model =
          step.kind === "provider-wildcard"
            ? `${step.providerId}/${step.modelPattern}`
            : getComboModelString(step);
        return Boolean(model && targetSupportsEndpoint(model, endpoint, step.providerId));
      }),
  });
  const projected = project(comboForEndpoint(combo, endpoint));
  // This runs on every chat request, so only the requested combo's own DAG is walked. Any other
  // saved combo keeps its route-selected steps for the engine to normalize if it is referenced.
  const byName = new Map([[projected.name, projected]]);
  const pending = [projected];
  for (let current = pending.pop(); current; current = pending.pop()) {
    for (const step of current.models) {
      if (step.kind !== "combo-ref" || byName.has(step.comboName)) continue;
      const child = storedByName.get(step.comboName);
      if (!child) continue;
      const projectedChild = project(child);
      byName.set(step.comboName, projectedChild);
      pending.push(projectedChild);
    }
  }
  const compatible = new Map<string, boolean>();
  const hasCompatibleTarget = (name: string, visiting = new Set<string>()): boolean => {
    // Unknown references, cycles and excessive depth stay visible to engine validation.
    if (visiting.size >= MAX_COMBO_DEPTH_HARD_CAP || visiting.has(name) || !byName.has(name))
      return true;
    if (compatible.has(name)) return compatible.get(name)!;
    const next = new Set(visiting).add(name);
    const result = byName
      .get(name)!
      .models.some(
        (step) => step.kind !== "combo-ref" || hasCompatibleTarget(step.comboName, next)
      );
    compatible.set(name, result);
    return result;
  };
  const prune = (item: typeof projected) => ({
    ...item,
    models: item.models.filter(
      (step) => step.kind !== "combo-ref" || hasCompatibleTarget(step.comboName)
    ),
  });
  return {
    combo: prune(projected),
    allCombos: stored.map((item) => {
      const reached = byName.get(item.name);
      return reached ? prune(reached) : item;
    }),
  };
}
