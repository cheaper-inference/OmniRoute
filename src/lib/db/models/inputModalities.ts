import { getDbInstance } from "../core";
import { getModelCatalogCacheVersion } from "../readCache";
import { normalizeSyncedAvailableModels } from "./synced";
import { getKeyValue } from "./shared";
import { CI_INPUT_MODALITIES } from "@/shared/constants/cheaperInferenceInputModalities";

export type InputModalityMap = ReadonlyMap<string, ReadonlyMap<string, readonly string[]>>;
let cache: { version: number; values: InputModalityMap } | undefined;

/** Read model input declarations with both account-specific and provider-wide lookup keys. */
export function listInputModalities(): InputModalityMap {
  const values = new Map<string, Map<string, string[]>>();
  const add = (key: string, id: string, inputs: string[]) => {
    const models = values.get(key) ?? new Map<string, string[]>();
    models.set(id, [...new Set([...(models.get(id) ?? []), ...inputs])]);
    values.set(key, models);
  };
  for (const row of getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels'")
    .all()) {
    const { key, value } = getKeyValue(row);
    if (!key || !value) continue;
    const provider = key.split(":")[0];
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      continue;
    }
    for (const model of normalizeSyncedAvailableModels(parsed, provider)) {
      if (!model.supportedInputTypes) continue;
      add(key, model.id, model.supportedInputTypes);
      add(provider, model.id, model.supportedInputTypes);
    }
  }
  return values;
}

/** Refresh the cached modality declarations when the model catalog changes. */
function cachedInputModalities(): InputModalityMap {
  const version = getModelCatalogCacheVersion();
  if (cache?.version !== version) cache = { version, values: listInputModalities() };
  return cache.values;
}

/** Resolve declarations for this model/account, preserving unknown-model capability fallback. */
export function getInputModalities(
  provider: string | null,
  model: string | null,
  bulk?: InputModalityMap,
  connectionId?: string | null
): readonly string[] | undefined {
  if (!provider || !model) return undefined;
  const values = bulk ?? cachedInputModalities();
  const found = connectionId
    ? values.get(`${provider}:${connectionId}`)?.get(model)
    : values.get(provider)?.get(model);
  if (found) return found;
  if (provider === "cheaperinference" || provider === "cinf")
    return Object.hasOwn(CI_INPUT_MODALITIES, model) ? CI_INPUT_MODALITIES[model] : undefined;
  if (connectionId && values.get(provider)?.has(model)) return [];
  return undefined;
}
