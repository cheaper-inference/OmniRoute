/**
 * Memo for model_intelligence lookups on the auto/* scoring path (#16814).
 *
 * Caches misses as well as hits: with an empty/partial table every candidate used to issue
 * up to three SELECTs per scoring pass. The cache is dropped whenever any model_intelligence
 * write happens (see getModelIntelligenceWriteGeneration), so a cached miss can never hide a
 * freshly synced arena_elo row or a user override.
 */
import { getModelIntelligenceWriteGeneration } from "../../../src/lib/db/modelIntelligenceGeneration.ts";

const cache = new Map<string, number | null>();
let seenGeneration = -1;

export function lookupIntelligenceCached(key: string, load: () => number | null): number | null {
  const generation = getModelIntelligenceWriteGeneration();
  if (generation !== seenGeneration) {
    cache.clear();
    seenGeneration = generation;
  }
  if (cache.has(key)) return cache.get(key)!;
  const value = load();
  cache.set(key, value);
  return value;
}

export function clearIntelligenceLookupCache(): void {
  cache.clear();
}
