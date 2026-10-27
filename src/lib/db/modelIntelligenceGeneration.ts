/**
 * Write-generation counter for the model_intelligence table (#16814).
 *
 * Bumped by every write in modelIntelligence.ts so in-memory readers (auto-combo task fitness)
 * can drop cached lookups, including cached misses. Kept in its own leaf module so it carries
 * no DB dependency.
 */
let generation = 0;

export function bumpModelIntelligenceWriteGeneration(): void {
  generation++;
}

export function getModelIntelligenceWriteGeneration(): number {
  return generation;
}
