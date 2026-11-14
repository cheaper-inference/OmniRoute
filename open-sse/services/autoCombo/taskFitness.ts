/**
 * Task Fitness Lookup
 *
 * Maps model ids × task types → fitness score [0..1] from the synced
 * `model_intelligence` rows.
 *
 * Resolution chain (highest → lowest priority):
 * 1. User override — DB `model_intelligence` where source='user_override'
 * 2. Benchmark scores — DB `model_intelligence` where source='arena_elo' (OpenRouter
 *    Artificial Analysis / Design Arena / task benchmarks, or Arena AI ELO), matched to the
 *    model id by `modelIntelligenceMatching.ts`
 * 2b. Layers 1-2 retried against the base model this id inherits quality scores
 *     from, when `resolveScoresAs` resolves one (#11489). Reported as
 *     `<source>:inherited`.
 * 2c. If the request id or its scoresAs base is vendor-retired (#11625), layers
 *     1–3 are skipped so a leftover arena row cannot short-circuit the veto.
 * 3. Models.dev tier — the persisted `model_intelligence` rows where
 *     source='models_dev_tier' (rebuilt from `model_capabilities` on every capabilities
 *     sync), with a vendor-lifecycle veto (#11508: a retired id never earns a tier score)
 *     and the same base-model inheritance as layers 1–2 (`models_dev_tier:inherited`)
 * 4. Neutral 0.5 — "no evidence", NOT "mediocre model". There is no hand-maintained
 *    fitness table and no name-pattern boost any more, so a model's name never earns
 *    or loses score by itself.
 */

import {
  getModelIntelligenceBySource,
  setUserFitnessOverrideEntry,
  deleteUserFitnessOverrideEntry,
} from "../../../src/lib/db/modelIntelligence.ts";
import { resolveModelIntelligence } from "../../../src/lib/modelIntelligenceMatching.ts";

import { readFileSync } from "node:fs";
import { resolveScoresAs } from "./scoresAs.ts";
import {
  clearIntelligenceLookupCache,
  lookupIntelligenceCached,
} from "./intelligenceLookupCache.ts";
import { isVendorRetiredId } from "../modelLifecycle.ts";

// #11508 — vendor lifecycle snapshot (#11507). An id the vendor has retired
// must never earn a capability-derived tier score: models.dev keeps listing
// retired models with their capabilities, so without this veto layer 3
// recreates the ranking inversion that #11503 removed from layer 4.
const LIFECYCLE_JSON_URL = new URL("../../../config/quality/model-lifecycle.json", import.meta.url);
let _retiredModels: Set<string> | null = null;

function loadRetiredModels(): Set<string> {
  if (_retiredModels) return _retiredModels;
  const retired = new Set<string>();
  try {
    const parsed = JSON.parse(readFileSync(LIFECYCLE_JSON_URL, "utf8")) as {
      retired?: Record<string, { status?: string }>;
    };
    for (const [id, entry] of Object.entries(parsed.retired ?? {})) {
      if (entry?.status === "retired") retired.add(id.toLowerCase());
    }
  } catch {
    // Snapshot missing/unreadable → no lifecycle veto. Neutral by design:
    // the file is a curated aid, and its absence must not disable routing.
  }
  _retiredModels = retired;
  return retired;
}

const TASK_TYPES = ["coding", "review", "planning", "analysis", "debugging", "documentation"];

// ─── DB access helpers ──────────────────────────────────────────────────

function queryModelIntelligence(model: string, category: string, source: string): number | null {
  return lookupIntelligenceCached(`${model}:${category}:${source}`, () => {
    try {
      const match = resolveModelIntelligence(model, category, source);
      if (match !== null) return match.score;
      return getModelIntelligenceBySource(model, source, category)?.score ?? null;
    } catch {
      return null;
    }
  });
}

/** Test/ops hook retained for backwards compatibility. */
export function invalidateCapabilitiesCache(): void {
  // No-op: capabilities table is no longer used for task fitness derivation
}

/**
 * Layer 3: models_dev_tier with lifecycle veto and variant inheritance (#11508).
 * Scored strictly from DB model_intelligence records, never synthesized from capabilities.
 */
export function getModelsDevTierFitnessWithSource(
  model: string,
  taskType: string
): { score: number; source: string } | null {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();

  // Lifecycle veto runs before every other signal in this layer: a retired id
  // must fall through to the documented neutral baseline, never inherit a
  // score from data that outlived the vendor's support.
  if (loadRetiredModels().has(normalizedModel)) return null;

  const dbScore = queryModelIntelligence(normalizedModel, normalizedTask, "models_dev_tier");
  if (dbScore !== null) return { score: dbScore, source: "models_dev_tier" };

  return null;
}

export function getModelsDevTierFitness(model: string, taskType: string): number | null {
  const hit = getModelsDevTierFitnessWithSource(model, taskType);
  return hit ? hit.score : null;
}

// ─── Resolution chain ───────────────────────────────────────────────────

export function getStaticFitnessTableScore(_model: string, _taskType: string): number | null {
  return null;
}

function lookupStaticFitnessTable(
  _normalizedModel: string,
  _normalizedTask: string
): number | null {
  return null;
}

function lookupWildcardBoosts(_normalizedModel: string, _normalizedTask: string): number {
  return 0.5;
}

export function getTaskFitness(model: string, taskType: string): number {
  return getTaskFitnessWithSource(model, taskType).score;
}

function isFitnessRetired(modelId: string): boolean {
  if (isVendorRetiredId(modelId)) return true;
  const { base, via } = resolveScoresAs(modelId);
  return via !== null && isVendorRetiredId(base);
}

export function getTaskFitnessWithSource(
  model: string,
  taskType: string
): { score: number; source: string } {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();
  const fitnessRetired = isFitnessRetired(normalizedModel);

  if (!fitnessRetired) {
    const userOverride = queryModelIntelligence(normalizedModel, normalizedTask, "user_override");
    if (userOverride !== null) {
      return { score: userOverride, source: "user_override" };
    }

    const { via } = resolveScoresAs(normalizedModel);
    if (via === null) {
      const arenaElo = queryModelIntelligence(normalizedModel, normalizedTask, "arena_elo");
      if (arenaElo !== null) {
        return { score: arenaElo, source: "arena_elo" };
      }
    } else {
      const literalArenaElo =
        getModelIntelligenceBySource(normalizedModel, "arena_elo", normalizedTask)?.score ?? null;
      if (literalArenaElo !== null) {
        return { score: literalArenaElo, source: "arena_elo" };
      }
    }

    // Layers 1-2, retried against the base model this id inherits quality from
    // (#11489). Every DB-backed source publishes scores for BASE models only, so
    // a variant id — an effort suffix (`gpt-5.6-sol-xhigh`), a vendor alias
    // (`gpt-5.6`), a `-free` tier marker (`mimo-v2.5-free`, #4517) — misses both
    // literal lookups and inherits from the benchmarked base.
    const inherited = lookupInheritedFitness(normalizedModel, normalizedTask);
    if (inherited !== null) {
      return inherited;
    }

    const tierScore = getModelsDevTierFitness(normalizedModel, normalizedTask);
    if (tierScore !== null) {
      return { score: tierScore, source: "models_dev_tier" };
    }

    const staticScore = lookupStaticFitnessTable(normalizedModel, normalizedTask);
    if (staticScore !== null) {
      return { score: staticScore, source: "fitness_table" };
    }

    return {
      score: lookupWildcardBoosts(normalizedModel, normalizedTask),
      source: "wildcard_boost",
    };
  }

  // Retired: 0.5 is "no evidence", never a quality claim and never a *codex boost.
  return { score: 0.5, source: "wildcard_boost" };
}

/**
 * Re-run the two DB-backed layers against the base model `normalizedModel`
 * inherits quality scores from (#11489). Returns `null` when the id resolves to
 * itself (nothing to inherit) or when the base has no row either.
 *
 * This subsumes the former `-free` arena_elo special case (#4517) and extends
 * it: the `-free` base is now consulted for `user_override` too, and the same
 * indirection now covers effort suffixes and vendor aliases. `resolveScoresAs`
 * is catalog-anchored, so a base that is not a routable id is never queried.
 */
function lookupInheritedFitness(
  normalizedModel: string,
  normalizedTask: string
): { score: number; source: string } | null {
  const { base, via } = resolveScoresAs(normalizedModel);
  if (via === null || base === normalizedModel) return null;
  const normalizedBase = base.toLowerCase();
  if (isVendorRetiredId(normalizedBase)) return null;

  for (const source of ["user_override", "arena_elo"] as const) {
    const score = queryModelIntelligence(normalizedBase, normalizedTask, source);
    if (score !== null) return { score, source: `${source}:inherited` };
  }
  return null;
}

export function setUserFitnessOverride(model: string, category: string, score: number): void {
  try {
    setUserFitnessOverrideEntry(model.toLowerCase(), category.toLowerCase(), score);
    invalidateFitnessCache();
  } catch (err) {
    throw new Error(
      `Failed to set user fitness override for ${model}/${category}: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export function clearUserFitnessOverride(model: string, category: string): void {
  try {
    deleteUserFitnessOverrideEntry(model.toLowerCase(), category.toLowerCase());
    invalidateFitnessCache();
  } catch (err) {
    throw new Error(
      `Failed to clear user fitness override for ${model}/${category}: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export function getTaskTypes(): string[] {
  return [...TASK_TYPES];
}

export function invalidateFitnessCache(): void {
  clearIntelligenceLookupCache();
}
