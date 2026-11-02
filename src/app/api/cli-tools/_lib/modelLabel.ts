import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { resolveModelDisplayName } from "@/shared/utils/modelDisplayName";

/**
 * Picker label for a model id written into a CLI tool's config (`name` next to
 * `id`). Uses the provider's registry name for an exact id match (the name
 * `/v1/models` publishes for the same row) and derives a readable one from the id
 * when the registry has none. Only for fields that are pure labels: never for a
 * field the tool reads back as a model id.
 */
export function cliModelLabel(model: string): string {
  const slash = model.indexOf("/");
  if (slash <= 0) return resolveModelDisplayName(model);
  const prefix = model.slice(0, slash);
  const modelId = model.slice(slash + 1);
  const alias = PROVIDER_ID_TO_ALIAS[prefix] || prefix;
  const registryModels = PROVIDER_MODELS[alias] || PROVIDER_MODELS[prefix] || [];
  const registryName = registryModels.find((entry) => entry?.id === modelId)?.name;
  return resolveModelDisplayName(modelId, registryName);
}
