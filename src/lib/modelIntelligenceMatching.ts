/**
 * modelIntelligenceMatching.ts — Shared model intelligence matching logic.
 *
 * Single source of truth for normalizing model IDs and matching them against
 * benchmark intelligence entries (Arena ELO, user overrides, etc.).
 *
 * Shared between the Free Provider Rankings dashboard (src/lib/freeProviderRankings.ts)
 * and the live routing engine (open-sse/services/autoCombo/taskFitness.ts).
 */

import { listModelIntelligence, type ModelIntelligenceEntry } from "./db/modelIntelligence";
import { getModelIntelligenceWriteGeneration } from "./db/modelIntelligenceGeneration";

/**
 * Strip trailing version suffixes from a model ID for fuzzy matching.
 * E.g., "kimi-k2.6" → "kimi-k2", "gpt-5.5" → "gpt-5"
 */
export function stripVersionSuffix(id: string): string {
  return id.replace(/\.\d+(\.\d+)*$/, "");
}

/**
 * Generate normalized candidate model keys for intelligence lookup.
 * Handles :free suffix and organization/provider slash prefixes
 * (e.g., "google/gemma-4-31b-it:free" -> ["google/gemma-4-31b-it:free", "google/gemma-4-31b-it", "gemma-4-31b-it:free", "gemma-4-31b-it"]).
 */
export function candidateIntelligenceKeys(rawId: string): string[] {
  const norm = rawId.toLowerCase().trim();
  const keys: string[] = [];
  const add = (k: string) => {
    if (k && !keys.includes(k)) keys.push(k);
  };

  add(norm);
  if (norm.endsWith(":free")) {
    add(norm.slice(0, -5));
  } else if (norm.endsWith("-free")) {
    add(norm.slice(0, -5));
  }

  if (norm.includes("/")) {
    const afterFirstSlash = norm.slice(norm.indexOf("/") + 1);
    add(afterFirstSlash);
    if (afterFirstSlash.endsWith(":free")) {
      add(afterFirstSlash.slice(0, -5));
    } else if (afterFirstSlash.endsWith("-free")) {
      add(afterFirstSlash.slice(0, -5));
    }

    const lastSlashIdx = norm.lastIndexOf("/");
    if (lastSlashIdx !== norm.indexOf("/")) {
      const afterLastSlash = norm.slice(lastSlashIdx + 1);
      add(afterLastSlash);
      if (afterLastSlash.endsWith(":free")) {
        add(afterLastSlash.slice(0, -5));
      } else if (afterLastSlash.endsWith("-free")) {
        add(afterLastSlash.slice(0, -5));
      }
    }
  }

  // Snapshot date-stripped forms (e.g. gemini-3.1-pro-preview-20260303 -> gemini-3.1-pro-preview)
  const snapshotDateRegex = /-(?:\d{8}|\d{4}-\d{2}-\d{2})$/;
  const baseKeys = keys.slice();
  for (const k of baseKeys) {
    if (snapshotDateRegex.test(k)) {
      add(k.replace(snapshotDateRegex, ""));
    }
  }

  // Preview-stripped forms (e.g. gemini-3.1-pro-preview -> gemini-3.1-pro)
  const keysWithDate = keys.slice();
  for (const k of keysWithDate) {
    if (k.includes("-preview")) {
      const withoutPreview = k.replace(/-preview(?=-|$)/, "");
      if (withoutPreview && withoutPreview !== k) {
        add(withoutPreview);
      }
    }
  }

  // Dot <-> hyphen version normalization (e.g. claude-opus-5-5 <-> claude-opus-5.5)
  const currentKeys = keys.slice();
  for (const k of currentKeys) {
    if (/(?:^|[a-z-])(\d+)-(\d+)(?:[a-z-]|$)/i.test(k)) {
      const dotted = k.replace(/(\b\d+)-(\d+\b)/g, "$1.$2");
      if (dotted !== k) add(dotted);
    }
    if (/\d+\.\d+/.test(k)) {
      const hyphenated = k.replace(/(\d+)\.(\d+)/g, "$1-$2");
      if (hyphenated !== k) add(hyphenated);
    }
  }

  // Claude inverted family/version forms (e.g. claude-opus-5-5 <-> claude-5-5-opus, claude-opus-5.5 <-> claude-5.5-opus)
  for (const k of keys.slice()) {
    const famFirst = k.match(/^claude-(sonnet|opus|haiku)-(\d+(?:[\.-]\d+)?)(.*)$/);
    if (famFirst) {
      const fam = famFirst[1];
      const ver = famFirst[2];
      const rest = famFirst[3] || "";
      add(`claude-${ver}-${fam}${rest}`);
    }
    const verFirst = k.match(/^claude-(\d+(?:[\.-]\d+)?)-(sonnet|opus|haiku)(.*)$/);
    if (verFirst) {
      const ver = verFirst[1];
      const fam = verFirst[2];
      const rest = verFirst[3] || "";
      add(`claude-${fam}-${ver}${rest}`);
    }
  }

  return keys;
}

export interface IntelligenceEntryLike {
  score: number;
  eloRaw?: number | null;
  confidence?: string | null;
  category?: string;
  permaslug?: string | null;
  model?: string;
  metric?: string | null;
}

export interface MatchedIntelligenceResult {
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  permaslug?: string | null;
  matchedModel?: string;
  metric?: string | null;
}

/**
 * Find the best matching intelligence entry for a model ID from an in-memory map.
 *
 * Strategy (in order across candidates):
 * 1. Exact match on any normalized candidate model ID (earlier candidate wins, highest score per candidate)
 * 2. Exact match on candidate model ID with version suffix stripped (e.g. kimi-k2.6 -> kimi-k2)
 * 3. Preview-added fallback (provider ID lacks -preview, benchmark has -preview)
 * 4. Symmetrical stem match:
 *    4a. Intelligence entry model is a prefix of candidate ID (e.g. model "claude-3-5-sonnet", cand "claude-3-5-sonnet-20241022")
 *    4b. Candidate ID is a prefix of intelligence entry model (e.g. cand "nemotron-3-ultra", model "nemotron-3-ultra-550b-a55b-20260604")
 */
export function findMatchingIntelligence<T extends IntelligenceEntryLike>(
  modelId: string,
  intelMap: Map<string, T[]>
): MatchedIntelligenceResult | null {
  const candidates = candidateIntelligenceKeys(modelId);

  const toResult = (best: T, matchedModel: string): MatchedIntelligenceResult => ({
    score: best.score,
    eloRaw: best.eloRaw ?? null,
    confidence: best.confidence ?? null,
    category: best.category ?? "default",
    matchedModel: best.model ?? matchedModel,
    permaslug: best.permaslug || best.model || null,
    metric: best.metric || null,
  });

  // Strategy 1: Exact match on any candidate key
  for (const cand of candidates) {
    const exactMatches = intelMap.get(cand);
    if (exactMatches && exactMatches.length > 0) {
      const best = exactMatches.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
      return toResult(best, cand);
    }
  }

  // Strategy 2: Strip version suffix and match
  for (const cand of candidates) {
    const stripped = stripVersionSuffix(cand);
    if (stripped !== cand) {
      const strippedMatches = intelMap.get(stripped);
      if (strippedMatches && strippedMatches.length > 0) {
        const best = strippedMatches.reduce((prev, curr) =>
          curr.score > prev.score ? curr : prev
        );
        return toResult(best, stripped);
      }
    }
  }

  // Strategy 3: Preview-added fallback (e.g. provider requests "gemini-3.1-pro", match "gemini-3.1-pro-preview")
  for (const cand of candidates) {
    if (!cand.includes("preview") && !cand.includes("/")) {
      const previewMatches = intelMap.get(`${cand}-preview`);
      if (previewMatches && previewMatches.length > 0) {
        const best = previewMatches.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
        return toResult(best, `${cand}-preview`);
      }
    }
  }

  // Strategy 4: Symmetrical stem match
  let bestPrefixMatch: MatchedIntelligenceResult | null = null;

  for (const cand of candidates) {
    for (const [modelName, entries] of intelMap) {
      // 4a. Intelligence model is a prefix of candidate
      if (cand.startsWith(modelName + "-") || cand.startsWith(modelName + ".")) {
        // Prevent false-positive version prefix match when hyphen-separated (e.g. candidate "claude-opus-5-5" must NOT match model "claude-opus-5")
        if (cand.startsWith(modelName + "-")) {
          const remainder = cand.slice(modelName.length + 1);
          if (/^\d/.test(remainder) && /\d$/.test(modelName)) {
            continue;
          }
        }
        const best = entries.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
        if (!bestPrefixMatch || best.score > bestPrefixMatch.score) {
          bestPrefixMatch = toResult(best, modelName);
        }
      }

      // 4b. Candidate is a prefix of intelligence model (e.g. cand "nemotron-3-ultra" matches "nemotron-3-ultra-550b-a55b-20260604")
      if (modelName.startsWith(cand + "-") || modelName.startsWith(cand + ".")) {
        if (modelName.startsWith(cand + "-")) {
          const remainder = modelName.slice(cand.length + 1);
          if (/^\d/.test(remainder) && /\d$/.test(cand)) {
            continue;
          }
        }
        const best = entries.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
        if (!bestPrefixMatch || best.score > bestPrefixMatch.score) {
          bestPrefixMatch = toResult(best, modelName);
        }
      }
    }
    if (bestPrefixMatch) return bestPrefixMatch;
  }

  return null;
}

// ──────────────── In-Memory Cache with Generation Invalidation ────────────────

const _cachedMaps = new Map<string, Map<string, ModelIntelligenceEntry[]>>();
let _cachedGeneration = -1;

/**
 * Returns an in-memory Map of model intelligence rows keyed by lowercase model name.
 * Cached in RAM and automatically invalidated when `bumpModelIntelligenceWriteGeneration()` is called.
 */
export function getSharedIntelligenceMap(
  category: string,
  source = "arena_elo"
): Map<string, ModelIntelligenceEntry[]> {
  const currentGen = getModelIntelligenceWriteGeneration();
  if (currentGen !== _cachedGeneration) {
    _cachedMaps.clear();
    _cachedGeneration = currentGen;
  }

  const cacheKey = `${category}:${source}`;
  let map = _cachedMaps.get(cacheKey);
  if (!map) {
    map = new Map<string, ModelIntelligenceEntry[]>();
    const entries = listModelIntelligence({ category, source });
    for (const entry of entries) {
      const key = entry.model.toLowerCase();
      const list = map.get(key) || [];
      list.push(entry);
      map.set(key, list);
    }
    _cachedMaps.set(cacheKey, map);
  }
  return map;
}

/**
 * Resolves a model's intelligence using the unified matching algorithm.
 *
 * @param modelId Model identifier (e.g. "qwen/qwen3.8-max:free", "ollama-cloud/nemotron-3-ultra")
 * @param category Task category (e.g. "coding")
 * @param source Intelligence source (e.g. "arena_elo", "user_override")
 * @returns Score and metadata, or null if unbenchmarked
 */
export function resolveModelIntelligence(
  modelId: string,
  category: string,
  source = "arena_elo"
): MatchedIntelligenceResult | null {
  const map = getSharedIntelligenceMap(category, source);
  return findMatchingIntelligence(modelId, map);
}

/** Ops/test hook to explicitly invalidate the shared intelligence map cache */
export function invalidateSharedIntelligenceMapCache(): void {
  _cachedMaps.clear();
  _cachedGeneration = -1;
}
