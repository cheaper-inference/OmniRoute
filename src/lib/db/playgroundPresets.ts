/**
 * db/playgroundPresets.ts — Playground Studio preset persistence facade.
 *
 * CRUD operations for the playground_presets table (migration 084).
 * Routes use getPlaygroundPresetRepository() for the Promise-based domain API.
 * Existing function exports remain synchronous, SQLite-only legacy helpers,
 * delegating through legacySync to the same SQL implementation.
 *
 * @module lib/db/playgroundPresets
 */

import type {
  PlaygroundPresetRecord,
  PlaygroundPresetRepository,
} from "@/domain/persistence/playgroundPresetRepository";
import { playgroundRepositories } from "./repositories/playgroundRepositories";

export type PlaygroundPresetListItem = PlaygroundPresetRecord;

/** Route-facing async persistence contract; callers await its operations. */
export function getPlaygroundPresetRepository(): PlaygroundPresetRepository {
  return playgroundRepositories.presets;
}

/**
 * Returns all presets ordered by created_at descending (newest first).
 * Accepts optional limit/offset for pagination.
 */
export function listPlaygroundPresets(options?: { limit?: number; offset?: number }): {
  items: PlaygroundPresetListItem[];
  total: number;
} {
  return playgroundRepositories.legacySync.listPlaygroundPresets(options);
}

/**
 * Returns a single preset by id, or null when not found.
 */
export function getPlaygroundPreset(id: string): PlaygroundPresetListItem | null {
  return playgroundRepositories.legacySync.getPlaygroundPreset(id);
}

/**
 * Creates a new preset. Generates a UUID v4 for the id.
 * Returns the persisted row via getPlaygroundPreset.
 */
export function createPlaygroundPreset(input: {
  name: string;
  endpoint: string;
  model: string;
  system: string | null | undefined;
  params: Record<string, unknown>;
}): PlaygroundPresetListItem {
  return playgroundRepositories.legacySync.createPlaygroundPreset(input);
}

/**
 * Updates only the supplied fields on an existing preset.
 * Returns the updated row, or null when the id does not exist.
 */
export function updatePlaygroundPreset(
  id: string,
  patch: Partial<{
    name: string;
    endpoint: string;
    model: string;
    system: string | null;
    params: Record<string, unknown>;
  }>
): PlaygroundPresetListItem | null {
  return playgroundRepositories.legacySync.updatePlaygroundPreset(id, patch);
}

/**
 * Deletes a preset by id.
 * Returns true when a row was deleted, false when the id did not exist.
 */
export function deletePlaygroundPreset(id: string): boolean {
  return playgroundRepositories.legacySync.deletePlaygroundPreset(id);
}
