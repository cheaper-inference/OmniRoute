/**
 * freeProviderRankings.ts — Compute rankings for free providers based on model ELO scores.
 *
 * Joins free providers (no-auth, OAuth, API key) with their models from the registry
 * and their intelligence scores from the `model_intelligence` DB table.
 *
 * Uses flexible matching to bridge naming gaps between registry model IDs
 * and Arena-normalized model names (e.g., "kimi-k2.6" vs "kimi-k2").
 */

import { NOAUTH_PROVIDERS, OAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/providers";
import { providerHasFreeModels, isModelFreeBadge } from "@/shared/utils/freeModels";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { listModelIntelligence } from "./db/modelIntelligence";
import { getProviderConnections } from "./db/providers";
import { getProviderUsageSince, type ProviderUsageRow } from "./db/callLogStats";
import { familyCanonicalOf } from "./providerFamilyAgg";
import { getCustomModels, getSyncedAvailableModels } from "./db/models";
import { mergeModelsWithCustomPrecedence } from "./providers/modelMetadataPrecedence";
// Type-only: reuse the health vocabulary instead of forking it.
import { RANGE_MS } from "./monitoring/providerHealthMatrix";
import type {
  ProviderHealthState,
  ProviderHealthMatrixRange,
} from "./monitoring/providerHealthMatrix";
import type { ProviderAuthType } from "./freeProviderRankingsAuthType";

// Re-exported for backward-compat / same-module ergonomics (#6915) — the
// actual implementations live in `freeProviderRankingsAuthType.ts` (DB-free,
// safe to import from "use client" pages; see that file's header comment).
export type { ProviderAuthType } from "./freeProviderRankingsAuthType";
// Re-exported for consumers of `reliability`; the definition stays in monitoring.
export type { ProviderHealthState } from "./monitoring/providerHealthMatrix";
export {
  filterRankingsByAuthType,
  sortRankingsAuthTypeFirst,
} from "./freeProviderRankingsAuthType";

export interface ProviderModelScore {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  isFree?: boolean;
  permaslug?: string;
  metric?: string | null;
}

export interface FreeProviderRanking {
  id: string;
  name: string;
  icon: string;
  color: string;
  textIcon?: string;
  category: ProviderAuthType;
  topModel: ProviderModelScore | null;
  averageScore: number;
  modelCount: number;
  /** Present only when connection state was loaded (filters active). See `ProviderReliability`. */
  reliability?: ProviderReliability;
  /** Considered models for this provider, sorted by score descending */
  models?: ProviderModelScore[];
}

/**
 * Get all free providers from all categories.
 */
function getFreeProviders() {
  const providers: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    textIcon?: string;
    category: ProviderAuthType;
  }> = [];

  // No-auth providers are always free
  for (const [id, p] of Object.entries(NOAUTH_PROVIDERS)) {
    providers.push({
      id,
      name: p.name,
      icon: p.icon,
      color: p.color,
      textIcon: p.textIcon,
      category: "noauth",
    });
  }

  // OAuth providers with a documented free tier
  for (const [id, p] of Object.entries(OAUTH_PROVIDERS)) {
    if (providerHasFreeModels(id)) {
      providers.push({
        id,
        name: p.name,
        icon: p.icon,
        color: p.color,
        textIcon:
          typeof p === "object" && p !== null && "textIcon" in p
            ? ((p as { textIcon?: unknown }).textIcon as string | undefined)
            : undefined,
        category: "oauth",
      });
    }
  }

  // API key providers with a documented free tier
  for (const [id, p] of Object.entries(APIKEY_PROVIDERS)) {
    if (providerHasFreeModels(id)) {
      providers.push({
        id,
        name: p.name,
        icon: p.icon,
        color: p.color,
        textIcon:
          typeof p === "object" && p !== null && "textIcon" in p
            ? ((p as { textIcon?: unknown }).textIcon as string | undefined)
            : undefined,
        category: "apikey",
      });
    }
  }

  return providers;
}

/** Minimal shape shared by registry models, synced available models, and user-added custom models. */
export interface RankableModel {
  id: string;
  name: string;
  isFree?: boolean;
  free?: unknown;
  is_free?: unknown;
  pricing?: unknown;
  tags?: unknown;
  [key: string]: unknown;
}

/**
 * Pure merge: combine a provider's static registry models with its
 * synced available models and user-added custom models, de-duplicating by `id`.
 *
 * Custom models take precedence on property collision (e.g. operator-configured
 * `isFree: true` or custom name override), while extra models from synced or
 * custom sources are additively included.
 */
export function mergeProviderModels(
  registryModels: RankableModel[],
  customModels: RankableModel[],
  syncedModels: RankableModel[] = []
): RankableModel[] {
  if (customModels.length === 0 && syncedModels.length === 0) {
    return registryModels;
  }

  // Combine static registry models with synced models (registry entry takes precedence on collision)
  const registryIds = new Set(registryModels.map((m) => m.id));
  const baseModels = registryModels.slice();
  for (const synced of syncedModels) {
    if (!synced?.id || registryIds.has(synced.id)) continue;
    registryIds.add(synced.id);
    baseModels.push(synced);
  }

  if (customModels.length === 0) {
    return baseModels;
  }

  // Custom models take precedence over base models for any matching ID
  return mergeModelsWithCustomPrecedence(baseModels, customModels);
}

/**
 * Get models for a provider: static registry models, live synced models from connections,
 * plus any user-added custom models for that provider.
 */
async function getProviderModels(providerId: string): Promise<RankableModel[]> {
  const entry = REGISTRY[providerId];
  const registryModels = (entry?.models ?? []) as RankableModel[];
  const customModels = (await getCustomModels(providerId)) as RankableModel[];
  let syncedModels: RankableModel[] = [];
  try {
    syncedModels = (await getSyncedAvailableModels(providerId)) as unknown as RankableModel[];
  } catch {
    // Non-fatal if DB or table unavailable
  }
  return mergeProviderModels(
    registryModels,
    Array.isArray(customModels) ? customModels : [],
    Array.isArray(syncedModels) ? syncedModels : []
  );
}

/**
 * Pure predicate: is a model marked as free?
 * Checks catalogued free models, free flag, :free suffix, or name heuristic via isModelFreeBadge.
 */
export function isRankableModelFree(providerId: string, model: RankableModel): boolean {
  return isModelFreeBadge(providerId, {
    id: model.id,
    name: model.name,
    free: (model as { free?: unknown }).free,
    isFree: (model as { isFree?: unknown }).isFree,
    is_free: (model as { is_free?: unknown }).is_free,
    pricing: (model as { pricing?: unknown }).pricing,
    tags: (model as { tags?: unknown }).tags,
  });
}

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
  }

  if (norm.includes("/")) {
    const afterSlash = norm.slice(norm.indexOf("/") + 1);
    add(afterSlash);
    if (afterSlash.endsWith(":free")) {
      add(afterSlash.slice(0, -5));
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

/**
 * Find the best matching intelligence entry for a model ID.
 *
 * Strategy (in order across candidates):
 * 1. Exact match on normalized candidate model ID (earlier candidate wins, highest score per candidate)
 * 2. Exact match on candidate model ID with version suffix stripped
 * 3. Preview-added fallback (provider ID lacks -preview, benchmark has -preview)
 * 4. Prefix match (intelligence entry model is a prefix of candidate ID)
 *
 * @param modelId - The model ID (e.g., "kimi-k2.6", "google/gemma-4-31b-it:free")
 * @param intelMap - Map of normalized model names → intelligence entries
 * @returns The best matching intelligence entry, or null
 */
export function findMatchingIntelligence(
  modelId: string,
  intelMap: Map<
    string,
    Array<{
      score: number;
      eloRaw: number | null;
      confidence: string | null;
      category: string;
      permaslug?: string | null;
      model?: string;
      metric?: string | null;
    }>
  >
): {
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  permaslug?: string | null;
  matchedModel?: string;
  metric?: string | null;
} | null {
  const candidates = candidateIntelligenceKeys(modelId);

  // Strategy 1: Exact match on any candidate key
  for (const cand of candidates) {
    const exactMatches = intelMap.get(cand);
    if (exactMatches && exactMatches.length > 0) {
      const best = exactMatches.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
      return {
        ...best,
        matchedModel: best.model,
        permaslug: best.permaslug || best.model || null,
        metric: best.metric || null,
      };
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
        return {
          ...best,
          matchedModel: best.model,
          permaslug: best.permaslug || best.model || null,
          metric: best.metric || null,
        };
      }
    }
  }

  // Strategy 3: Preview-added fallback (e.g. provider requests "gemini-3.1-pro", match "gemini-3.1-pro-preview")
  for (const cand of candidates) {
    if (!cand.includes("preview") && !cand.includes("/")) {
      const previewMatches = intelMap.get(`${cand}-preview`);
      if (previewMatches && previewMatches.length > 0) {
        const best = previewMatches.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
        return {
          ...best,
          matchedModel: best.model,
          permaslug: best.permaslug || best.model || null,
          metric: best.metric || null,
        };
      }
    }
  }

  // Strategy 4: Prefix match (intelligence entry model is a prefix of candidate ID)
  let bestPrefixMatch: {
    score: number;
    eloRaw: number | null;
    confidence: string | null;
    category: string;
    permaslug?: string | null;
    matchedModel?: string;
  } | null = null;

  for (const cand of candidates) {
    for (const [modelName, entries] of intelMap) {
      if (cand.startsWith(modelName + "-") || cand.startsWith(modelName + ".")) {
        // Prevent false-positive version prefix match where the remaining suffix starts with digits
        // (e.g., candidate "claude-opus-5-5" must NOT prefix-match model "claude-opus-5")
        const remainder = cand.slice(modelName.length + 1);
        if (/^\d/.test(remainder) && /\d$/.test(modelName)) {
          continue;
        }

        const best = entries.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
        if (!bestPrefixMatch || best.score > bestPrefixMatch.score) {
          bestPrefixMatch = {
            ...best,
            matchedModel: best.model,
            permaslug: best.permaslug || best.model || null,
            metric: best.metric || null,
          };
        }
      }
    }
    if (bestPrefixMatch) return bestPrefixMatch;
  }

  return null;
}

/**
 * Minimal shape of a provider connection needed to decide "configured" /
 * "non-exhausted". Matches the camelCase columns returned by
 * `getProviderConnections()` (`provider`, `testStatus`, `rateLimitedUntil`).
 */
export interface ConnectionState {
  provider: string;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
}

/**
 * Second, additive dimension exposed on each ranking when connection state is
 * loaded (configured/available filters active). Derived from data the ranking
 * builder already holds — zero extra query.
 *
 * States use `ProviderHealthState` (`src/lib/monitoring/providerHealthMatrix.ts`)
 * so both surfaces describe a provider the same way. The raw signals stay
 * verbatim next to the state: `testStatus` is written on failure paths only and
 * reset to `active` by an explicit connection test or a re-auth, so it can
 * outlive the actual recovery.
 */
export interface ProviderReliability {
  /** Same triplet `ProviderHealthMatrixAccount` exposes, one per connection. */
  connections: Array<{
    testStatus: string | null;
    rateLimitedUntil: string | null;
    state: ProviderHealthState;
  }>;
  /** Provider aggregate; absent entirely for providers with no loaded connection. */
  state: ProviderHealthState;
  /**
   * What the provider actually served over a window, from `call_logs`. Present
   * only when the caller asks for it (`withUsage`). Complements `state`, which
   * describes the connection right now and cannot see a provider that answers
   * every call with an error.
   */
  usage?: ProviderUsage;
}

export interface ProviderUsage {
  requests: number;
  successes: number;
  /** `null` below `MIN_USAGE_REQUESTS` — too small a sample to state a rate. */
  successRate: number | null;
  avgLatencyMs: number | null;
  lastRequestAt: string | null;
  windowHours: number;
}

/**
 * Below this many requests in the window, no rate is reported: 1 failure out of
 * 2 calls is not "50% broken", and a provider nobody called is not "0% healthy".
 */
const MIN_USAGE_REQUESTS = 5;

/**
 * Options controlling the additive "configured" / "available" filters.
 * Both default off (undefined/false) → output identical to current behavior.
 */
export interface FreeProviderRankingFilterOptions {
  /** Keep only providers that have ≥1 (active) connection configured. */
  configuredOnly?: boolean;
  /** Keep only providers that have ≥1 non-exhausted, non-rate-limited connection (implies configured). */
  availableOnly?: boolean;
  /**
   * Also report what each provider actually served (`reliability.usage`).
   * Off by default: it costs one aggregate query over `call_logs`, which a
   * caller that only needs the ranking should not pay.
   */
  withUsage?: boolean;
  /** Window for `withUsage`. Defaults to `24h`, the health matrix's own default. */
  usageRange?: ProviderHealthMatrixRange;
  /**
   * Ordering. `elo` (default) keeps the published behaviour: rank by the top
   * model's Arena score. `reliability` puts providers whose success rate can be
   * stated first, which requires the usage aggregate — hence the snapshot.
   */
  sortBy?: "elo" | "reliability";
  /** Keep only models marked 'free' (isModelFreeBadge) when computing scores and rankings. */
  freeModelsOnly?: boolean;
}

/**
 * PURE: does this request need the connection snapshot loaded?
 *
 * `usage` is grafted onto `reliability`, which only exists once the snapshot is
 * loaded — so `withUsage` on its own used to return rankings with no
 * `reliability` at all, silently. It now pulls the snapshot itself.
 * `filterFreeProviderRankings` is a no-op when neither filter is set, so an
 * unfiltered caller still gets every provider back.
 */
export function needsConnectionSnapshot(opts: FreeProviderRankingFilterOptions): boolean {
  return Boolean(
    opts.configuredOnly || opts.availableOnly || opts.withUsage || opts.sortBy === "reliability"
  );
}

/**
 * PURE: does this request need the served-call usage aggregate?
 * `withUsage` asks for it explicitly; `sortBy: "reliability"` needs it to
 * order providers by measured success rate.
 */
function needsUsageAggregate(opts: FreeProviderRankingFilterOptions): boolean {
  return Boolean(opts.withUsage) || opts.sortBy === "reliability";
}

/**
 * Apply the requested ordering. `elo` (default) keeps the list as ranked;
 * `reliability` re-orders by measured success rate via the usage module
 * (lazy import, only paid for when asked). Runs after enrichment and before
 * the slice, so `limit` still counts providers that survived the filters —
 * and so the caller gets the top N of the order they asked for, not the
 * top N of the ELO order re-sorted.
 */
async function applyRankingOrder(
  rankings: FreeProviderRanking[],
  sortBy: FreeProviderRankingFilterOptions["sortBy"]
): Promise<FreeProviderRanking[]> {
  if (sortBy !== "reliability") return rankings;
  return (await import("./freeProviderRankingsUsage")).sortRankingsByReliability(rankings);
}

/** Group connection states by provider id (shared by filter and reliability attach). */
function groupConnectionsByProvider(
  connections: ConnectionState[]
): Map<string, ConnectionState[]> {
  const byProvider = new Map<string, ConnectionState[]>();
  for (const conn of connections) {
    const list = byProvider.get(conn.provider);
    if (list) {
      list.push(conn);
    } else {
      byProvider.set(conn.provider, [conn]);
    }
  }
  return byProvider;
}

// Terminal connection statuses — mirrors `isTerminalConnectionStatus`
// (`src/sse/services/auth.ts`). A connection in one of these states stays
// unavailable until credentials/settings change; it never self-recovers.
const TERMINAL_CONNECTION_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/**
 * Pure predicate: is at least one of a provider's connections usable *right now*?
 *
 * A connection is usable when it is neither terminal (`testStatus` ∉
 * {credits_exhausted, banned, expired}) nor currently rate-limited
 * (`rateLimitedUntil` null or in the past — lazy recovery, matching the
 * Connection Cooldown rule in CLAUDE.md).
 *
 * NOTE: granularity is PROVIDER-level (connection = provider+account). Per-model
 * quota lockout (model lockout, `open-sse/services/accountFallback.ts`) is a
 * deferred Phase 3 and is intentionally NOT consulted here.
 */
export function isProviderUsable(
  connections: ConnectionState[],
  now: number = Date.now()
): boolean {
  return connections.some((conn) => classifyConnection(conn, now) === "healthy");
}

/**
 * One connection, classified as `classifyAccount` does (health matrix): terminal
 * status ⇒ `down`, live cooldown ⇒ `degraded`, else `healthy`. Model lockouts are
 * not loaded here, so — as in `isProviderUsable` — they are not consulted.
 * The filter reuses this, so it cannot drift from the reported state.
 */
function classifyConnection(conn: ConnectionState, now: number): ProviderHealthState {
  const status = (conn.testStatus || "").trim().toLowerCase();
  if (TERMINAL_CONNECTION_STATUSES.has(status)) return "down";
  if (conn.rateLimitedUntil) {
    const until = new Date(conn.rateLimitedUntil).getTime();
    if (Number.isFinite(until) && until > now) return "degraded";
  }
  return "healthy";
}

/** Mirrors `classifyProvider`, minus its circuit-breaker input (not loaded here). */
function classifyProviderConnections(states: ProviderHealthState[]): ProviderHealthState {
  if (states.length > 0 && states.every((state) => state === "down")) return "down";
  if (states.some((state) => state !== "healthy")) return "degraded";
  return "healthy";
}

/**
 * Pure filter over a ranking list + a snapshot of provider connections.
 *
 * - `configuredOnly`: keep only providers whose `id` appears in `connections`.
 * - `availableOnly` (implies configured): additionally require ≥1 usable
 *   connection per `isProviderUsable`.
 *
 * With both flags off/absent the input list is returned unchanged.
 * Fully synchronous + side-effect-free so it can be unit-tested without a DB.
 */
export function filterFreeProviderRankings(
  rankings: FreeProviderRanking[],
  connections: ConnectionState[],
  opts: FreeProviderRankingFilterOptions = {},
  now: number = Date.now()
): FreeProviderRanking[] {
  const { configuredOnly, availableOnly } = opts;
  if (!configuredOnly && !availableOnly) return rankings;

  const byProvider = groupConnectionsByProvider(connections);

  return rankings.filter((ranking) => {
    const conns = byProvider.get(ranking.id);
    if (!conns || conns.length === 0) return false; // not configured
    if (availableOnly) return isProviderUsable(conns, now);
    return true; // configuredOnly
  });
}

/**
 * Pure enrichment: attach `reliability` to every ranking with a loaded
 * connection. Rankings without one are returned unchanged, never mutated.
 */
export function attachProviderReliability(
  rankings: FreeProviderRanking[],
  connections: ConnectionState[],
  now: number = Date.now()
): FreeProviderRanking[] {
  const byProvider = groupConnectionsByProvider(connections);
  return rankings.map((ranking) => {
    const conns = byProvider.get(ranking.id);
    if (!conns || conns.length === 0) return ranking;
    const states = conns.map((c) => classifyConnection(c, now));
    return {
      ...ranking,
      reliability: {
        connections: conns.map((c, i) => ({
          testStatus: c.testStatus ?? null,
          rateLimitedUntil: c.rateLimitedUntil ?? null,
          state: states[i],
        })),
        state: classifyProviderConnections(states),
      },
    };
  });
}

/**
 * Pure enrichment: attach `usage` to the `reliability` of every ranking that has
 * a row in the windowed aggregate. Rankings without `reliability` (no connection
 * loaded) are returned unchanged, never mutated.
 */
export function attachProviderUsage(
  rankings: FreeProviderRanking[],
  usageRows: ProviderUsageRow[],
  windowHours: number
): FreeProviderRanking[] {
  const byProvider = new Map(usageRows.map((row) => [row.provider, row]));
  return rankings.map((ranking) => {
    const row = byProvider.get(ranking.id) ?? byProvider.get(familyCanonicalOf(ranking.id));
    if (!row || !ranking.reliability) return ranking;
    return {
      ...ranking,
      reliability: {
        ...ranking.reliability,
        usage: {
          requests: row.requests,
          successes: row.successes,
          successRate: row.requests >= MIN_USAGE_REQUESTS ? row.successes / row.requests : null,
          avgLatencyMs: row.avgLatencyMs ?? null,
          lastRequestAt: row.lastRequestAt ?? null,
          windowHours,
        },
      },
    };
  });
}

/**
 * Compute rankings for free providers based on ELO scores.
 *
 * @param category - Optional filter for task category (e.g., "coding", "default")
 * @param limit - Maximum number of providers to return
 * @param opts - Optional additive filters (configured-only / available-only).
 *   When set, live provider-connection state is read from the DB and providers
 *   with no configured / no usable connection are dropped. Both default off.
 */
export async function computeFreeProviderRankings(
  category?: string,
  limit: number = 50,
  opts: FreeProviderRankingFilterOptions = {}
): Promise<FreeProviderRanking[]> {
  const freeProviders = getFreeProviders();
  const intelligenceEntries = listModelIntelligence({
    source: "arena_elo",
    category: category || undefined,
  });

  // Create a map for fast lookup: model name → intelligence entries
  const intelMap = new Map<string, typeof intelligenceEntries>();
  for (const entry of intelligenceEntries) {
    const modelKey = entry.model.toLowerCase();
    if (!intelMap.has(modelKey)) {
      intelMap.set(modelKey, []);
    }
    intelMap.get(modelKey)!.push(entry);
  }

  const rankings: FreeProviderRanking[] = [];

  for (const provider of freeProviders) {
    const models = await getProviderModels(provider.id);
    if (models.length === 0) continue;

    const modelScores: ProviderModelScore[] = [];

    for (const model of models) {
      const isFree = isRankableModelFree(provider.id, model);

      if (opts.freeModelsOnly && !isFree) {
        continue;
      }

      const match = findMatchingIntelligence(model.id, intelMap);

      if (match) {
        modelScores.push({
          modelId: model.id,
          modelName: model.name,
          score: match.score,
          eloRaw: match.eloRaw,
          confidence: match.confidence,
          category: match.category,
          isFree,
          permaslug: match.permaslug || match.matchedModel || undefined,
          metric: match.metric || null,
        });
      }
    }

    if (modelScores.length === 0) continue;

    // Sort models by score descending
    modelScores.sort((a, b) => b.score - a.score);

    const topModel = modelScores[0];
    const averageScore = modelScores.reduce((sum, m) => sum + m.score, 0) / modelScores.length;

    rankings.push({
      ...provider,
      topModel,
      averageScore,
      modelCount: modelScores.length,
      models: modelScores,
    });
  }

  // Sort providers by top model score descending, then by average score
  rankings.sort((a, b) => {
    if (a.topModel && b.topModel) {
      return b.topModel.score - a.topModel.score;
    }
    if (a.topModel) return -1;
    if (b.topModel) return 1;
    return b.averageScore - a.averageScore;
  });

  // Apply the additive configured/available filters (if requested) BEFORE the
  // limit slice, so `limit` counts providers that survive the filter.
  let filtered = rankings;
  if (needsConnectionSnapshot(opts)) {
    // `getProviderConnections` returns a loose JsonRecord[]; ConnectionState is a
    // structural subset of it, so TS needs the explicit `unknown` hop (TS2352).
    const connections = (await getProviderConnections({
      isActive: true,
    })) as unknown as ConnectionState[];
    filtered = filterFreeProviderRankings(rankings, connections, opts);
    // Second dimension, same snapshot: annotation only, sort and scores untouched.
    // `availableOnly` already drops providers with no healthy connection, so under
    // it `state` is never `down`; `down` needs `configuredOnly` alone.
    filtered = attachProviderReliability(filtered, connections);

    // Third dimension, opt-in: what the provider actually served. `state` above
    // reads the connection as it stands now and cannot see a provider that
    // answers every call with an error — only the call log can.
    if (needsUsageAggregate(opts)) {
      const range = opts.usageRange ?? "24h";
      const windowMs = RANGE_MS[range];
      const since = new Date(Date.now() - windowMs).toISOString();
      filtered = attachProviderUsage(
        filtered,
        getProviderUsageSince(since),
        windowMs / (60 * 60 * 1000)
      );
    }
  }

  const ordered = await applyRankingOrder(filtered, opts.sortBy);

  return ordered.slice(0, limit);
}
