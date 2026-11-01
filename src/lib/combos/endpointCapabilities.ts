/** Project a stored combo onto a dispatch surface before credentials, scoring or attempts. */
import {
  resolveSearchProvider,
  SEARCH_PROVIDERS,
} from "@omniroute/open-sse/config/searchRegistry.ts";
import { WEB_FETCH_PROVIDERS } from "@omniroute/open-sse/config/webFetchProviders.ts";
import type { ComboCollectionLike, ComboLike } from "@omniroute/open-sse/services/combo/types.ts";
import { MAX_COMBO_DEPTH_HARD_CAP } from "@omniroute/open-sse/services/combo/comboPredicates.ts";
import { getProviderByAlias, getProviderById } from "@/shared/constants/providers";
import { getComboModelString, normalizeComboStep, type ComboStep } from "./steps.ts";

export type ComboEndpoint =
  | "chat"
  | "search"
  | "web-fetch"
  | "embeddings"
  | "rerank"
  | "images"
  | "videos"
  | "music"
  | "audio-speech"
  | "audio-transcriptions";

export function targetProvider(modelStr: string, hint?: string | null): string {
  const raw = hint || modelStr.split("/")[0];
  return (
    (getProviderById(raw) || getProviderByAlias(raw))?.id || resolveSearchProvider(raw)?.id || raw
  );
}

export function targetSupportsEndpoint(
  modelStr: string,
  endpoint: ComboEndpoint,
  hint?: string | null
): boolean {
  const provider = targetProvider(modelStr, hint);
  const search = Object.hasOwn(SEARCH_PROVIDERS, provider) ? SEARCH_PROVIDERS[provider] : undefined;
  const fetch = (WEB_FETCH_PROVIDERS as readonly string[]).includes(provider);
  if (endpoint === "search") return Boolean(search && !search.disabled);
  if (endpoint === "web-fetch") return fetch;
  // Dedicated web executors must never reach DefaultExecutor's OpenAI fallback.
  if (search || fetch) return false;
  // Keep existing non-web endpoint guards and opt-in modality bridges authoritative.
  // Unknown/custom models cannot be rejected solely because a static catalog lacks them.
  return true;
}

export function projectComboForEndpoint(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  endpoint: ComboEndpoint
): {
  combo: ComboLike & { models: ComboStep[] };
  allCombos: Array<ComboLike & { models: ComboStep[] }>;
} {
  const collection = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const stored = collection.map((item) => ({
    ...item,
    name: String(item.name || ""),
    models: Array.isArray(item.models) ? item.models : [],
  }));
  const project = (item: ComboLike) => ({
    ...item,
    models: item.models
      .map((entry, index) =>
        normalizeComboStep(entry, { comboName: item.name, index, allCombos: stored })
      )
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
  const projected = project(combo);
  const children = stored.map(project);
  const byName = new Map([...children, projected].map((item) => [item.name, item]));
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
  return { combo: prune(projected), allCombos: children.map(prune) };
}
