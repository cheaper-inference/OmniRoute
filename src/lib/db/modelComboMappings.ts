/**
 * Compatibility facade for model-to-combo mapping persistence.
 */

import type {
  CreateModelComboMappingInput,
  ModelComboMapping,
  ModelComboMappingPage,
  UpdateModelComboMappingInput,
} from "@/domain/persistence/comboRepositories";
import { routingConfigRepositories } from "./repositories/routingConfigRepositories";
import { invalidateDbCache } from "./readCache";

export type { ModelComboMapping } from "@/domain/persistence/comboRepositories";

const repository = routingConfigRepositories.modelComboMappings;

export function getModelComboMappings(options?: {
  limit?: number;
  offset?: number;
}): Promise<ModelComboMappingPage> {
  return repository.list(options);
}

export function getModelComboMappingById(id: string): Promise<ModelComboMapping | null> {
  return repository.findById(id);
}

export async function createModelComboMapping(
  data: CreateModelComboMappingInput
): Promise<ModelComboMapping> {
  const mapping = await repository.create(data);
  // Bust the version-keyed combo lookup caches (readCache) so
  // resolveComboForModel / combo-name policy checks see the new mapping.
  invalidateDbCache("combos");
  return mapping;
}

export async function updateModelComboMapping(
  id: string,
  data: UpdateModelComboMappingInput
): Promise<ModelComboMapping | null> {
  const mapping = await repository.update(id, data);
  if (mapping) invalidateDbCache("combos");
  return mapping;
}

export async function deleteModelComboMapping(id: string): Promise<boolean> {
  const deleted = await repository.deleteById(id);
  if (deleted) invalidateDbCache("combos");
  return deleted;
}

export function resolveComboForModel(model: string): Promise<Record<string, unknown> | null> {
  return repository.resolveForModel(model);
}
