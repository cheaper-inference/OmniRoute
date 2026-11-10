/** Project a stored combo onto a dispatch surface before credentials, scoring or attempts. */
import {
  resolveSearchProvider,
  SEARCH_PROVIDERS,
} from "@omniroute/open-sse/config/searchRegistry.ts";
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
import type { ComboCollectionLike, ComboLike } from "@omniroute/open-sse/services/combo/types.ts";
import { MAX_COMBO_DEPTH_HARD_CAP } from "@omniroute/open-sse/services/combo/comboPredicates.ts";
import type { ComboEndpoint } from "@/shared/constants/comboEndpoints";
import { getProviderByAlias, getProviderById } from "@/shared/constants/providers";
import { getComboModelString, normalizeComboStep, type ComboStep } from "./steps.ts";

export type { ComboEndpoint } from "@/shared/constants/comboEndpoints";

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
  const raw = hint || modelStr.split("/")[0];
  return (
    (getProviderById(raw) || getProviderByAlias(raw))?.id || resolveSearchProvider(raw)?.id || raw
  );
}

/** Check whether a provider/model target can serve the requested endpoint. */
export function targetSupportsEndpoint(
  modelStr: string,
  endpoint: ComboEndpoint,
  hint?: string | null
): boolean {
  const provider = targetProvider(modelStr, hint);
  const search = Object.hasOwn(SEARCH_PROVIDERS, provider) ? SEARCH_PROVIDERS[provider] : undefined;
  const fetch = (WEB_FETCH_PROVIDERS as readonly string[]).includes(provider);
  const modelId = modelStr.includes("/") ? modelStr.slice(modelStr.indexOf("/") + 1) : modelStr;
  const hasModel = (config: { models?: Array<{ id?: string }> } | null): boolean | null => {
    if (!config) return null;
    if (!Array.isArray(config.models) || config.models.length === 0) return true;
    return config.models.some((model) => model.id === modelId || model.id === modelStr);
  };
  if (endpoint === "search") return Boolean(search && !search.disabled);
  if (endpoint === "web-fetch") return fetch;
  // Dedicated web executors must never reach DefaultExecutor's OpenAI fallback.
  if (search || fetch) return false;
  if (endpoint === "images" || endpoint === "image-edits") {
    return Boolean(getImageModelEntry(modelStr));
  }
  if (endpoint === "videos") return hasModel(getVideoProvider(provider)) ?? true;
  if (endpoint === "music") return hasModel(getMusicProvider(provider)) ?? true;
  if (endpoint === "ocr") return hasModel(getOcrProvider(provider)) ?? true;
  if (endpoint === "audio-speech") return hasModel(getSpeechProvider(provider)) ?? true;
  if (endpoint === "audio-transcriptions" || endpoint === "audio-translations") {
    return hasModel(getTranscriptionProvider(provider)) ?? true;
  }
  if (endpoint === "audio-generation") return provider === "elevenlabs";
  const chatCatalogHasModel = getModelsByProviderId(provider).some(
    (model) => model.id === modelId || model.id === modelStr
  );
  const recognizedModalTarget =
    [
      hasModel(getVideoProvider(provider)),
      hasModel(getMusicProvider(provider)),
      hasModel(getOcrProvider(provider)),
      hasModel(getSpeechProvider(provider)),
      hasModel(getTranscriptionProvider(provider)),
      getImageModelEntry(modelStr) && isImageOnlyModel(modelStr) ? true : null,
    ].some((supported) => supported === true) && !chatCatalogHasModel;
  if (endpoint === "chat" && recognizedModalTarget) return false;
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
