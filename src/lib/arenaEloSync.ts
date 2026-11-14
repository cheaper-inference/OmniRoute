/**
 * arenaEloSync.ts — Arena AI leaderboard ELO sync engine.
 *
 * Fetches model intelligence data from the Arena AI leaderboard API
 * (https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard) and stores
 * normalised task-fit scores in the `model_intelligence` DB table.
 *
 * Resolution order: user overrides > synced arena ELO > defaults
 *
 * On by default; opt out via Dashboard Feature Flags or ARENA_ELO_SYNC_ENABLED=false.
 */

import { resolveScoresAs } from "@omniroute/open-sse/services/autoCombo/scoresAs.ts";

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

import { isArenaEloSyncEnabled } from "@/shared/utils/featureFlags";

import { getDbInstance } from "./db/core";
import { backupDbFile } from "./db/backup";
import { fetchHuggingFaceLeaderboards } from "./arenaEloHfSource";
import { getProviderConnections } from "./db/providers";
import {
  applyArenaEloRefresh,
  deleteModelIntelligenceBySource,
  getLatestSyncedAt,
  type ModelIntelligenceEntry,
} from "./db/modelIntelligence";

// ─── Types ───────────────────────────────────────────────

/**
 * A single benchmark entry from OpenRouter's /api/v1/benchmarks endpoint.
 */
export interface OpenRouterBenchmarkEntry {
  source: string;
  model_permaslug: string;
  display_name?: string;
  intelligence_index?: number | null;
  coding_index?: number | null;
  agentic_index?: number | null;
  arena?: string;
  category?: string;
  elo?: number | null;
  win_rate?: number | null;
  tournament_stats?: {
    first_place?: number;
    second_place?: number;
    third_place?: number;
    fourth_place?: number;
    total?: number;
  };
  benchmark_type?: string;
  accuracy?: number | null;
  accuracy_stddev?: number | null;
  total_tasks?: number | null;
}

/**
 * Payload returned by OpenRouter's /api/v1/benchmarks endpoint.
 */
export interface OpenRouterBenchmarksResponse {
  data: OpenRouterBenchmarkEntry[];
  meta?: Record<string, unknown>;
}

/**
 * A single model entry from the Arena AI leaderboard.
 */
export interface ArenaModelEntry {
  /** Leaderboard rank (1-based). */
  rank: number;
  /** Model identifier (may include vendor prefix like "anthropic/claude-opus"). */
  model: string;
  /** Vendor / provider name (e.g. "Anthropic", "OpenAI"). */
  vendor: string;
  /** ELO score (higher = better). */
  score: number;
  /** Confidence interval half-width. */
  ci: number;
  /** Total number of human preference votes. */
  votes: number;
  /** License type (e.g. "proprietary", "open"). */
  license: string;
}

/**
 * Metadata + models for a single leaderboard category.
 */
export interface ArenaLeaderboardData {
  /** Leaderboard metadata. */
  meta: {
    /** Leaderboard category name (e.g. "text", "code"). */
    leaderboard: string;
    /** Total number of models in this leaderboard. */
    model_count: number;
    /** Publish date of the snapshot, when the source reports one (HF fallback). */
    dataset_date?: string;
  };
  /** Ranked model entries. */
  models: ArenaModelEntry[];
}

/**
 * Map of leaderboard category → leaderboard data.
 */
export interface ArenaLeaderboardMap {
  [category: string]: ArenaLeaderboardData;
}

/**
 * Result of a sync operation.
 */
export interface SyncResult {
  /** Whether the sync completed successfully. */
  success: boolean;
  /** Number of model intelligence entries stored. */
  modelCount: number;
  /** Source identifier (always "arena_elo"). */
  source: string;
  /** Error message if sync failed. */
  error?: string;
}

/**
 * Current status of the Arena ELO sync subsystem.
 */
export interface SyncStatus {
  /** Whether periodic sync is enabled via env var. */
  enabled: boolean;
  /** ISO timestamp of last successful sync, or null. */
  lastSync: string | null;
  /** Number of models stored in last successful sync. */
  lastSyncModelCount: number;
  /** ISO timestamp of next scheduled sync, or null. */
  nextSync: string | null;
  /** Configured sync interval in milliseconds. */
  intervalMs: number;
  /** Active data sources. */
  sources: string[];
  /** Message of the last failed sync (cleared on success), or null. */
  lastError: string | null;
  /** ISO timestamp of the last failed sync (cleared on success), or null. */
  lastFailedAt: string | null;
  /** Upstream that served the last successful sync, or null. */
  activeSource: "wulong" | "huggingface" | "openrouter" | null;
  /** Publish date of the last synced snapshot (HF fallback only), or null. */
  datasetDate: string | null;
}

// ─── Configuration ───────────────────────────────────────

const ARENA_ELO_API_BASE = "https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard";

/** OpenRouter Benchmarks API endpoint. */
export const OPENROUTER_BENCHMARKS_API = "https://openrouter.ai/api/v1/benchmarks";

/** Leaderboard categories to fetch from the Arena API. */
const FETCH_CATEGORIES = ["text", "code"] as const;

/**
 * Maps Arena leaderboard categories to OmniRoute task-type categories.
 *
 * - "text" leaderboard → default, review, documentation, debugging
 * - "code" leaderboard → coding
 * - "vision" leaderboard is intentionally skipped (not relevant for text fitness)
 */
const CATEGORY_TASK_MAP: Record<string, string[]> = {
  text: ["default", "review", "documentation", "debugging"],
  code: ["coding"],
};

/**
 * Known vendor prefixes to strip from model names.
 * E.g. "anthropic/claude-opus-4-6-thinking" → "claude-opus-4-6-thinking"
 */
export const VENDOR_PREFIXES = [
  "anthropic/",
  "openai/",
  "google/",
  "meta/",
  "meta-llama/",
  "mistral/",
  "mistralai/",
  "deepseek/",
  "deepseek-ai/",
  "xai/",
  "x-ai/",
  "cohere/",
  "coherelabs/",
  "qwen/",
  "alibaba/",
  "nvidia/",
  "01-ai/",
  "zerox/",
  "together/",
  "fireworks/",
  "perplexity/",
  "ai21/",
  "ai21labs/",
  "z-ai/",
  "zai-org/",
  "zai/",
  "thudm/",
  "moonshotai/",
  "moonshot/",
  "minimax/",
  "minimaxai/",
  "microsoft/",
  "amazon/",
  "baidu/",
  "tencent/",
  "bytedance/",
  "xiaomi/",
  "xiaomimimo/",
  "stepfun/",
  "stepfun-ai/",
  "nousresearch/",
  "liquid/",
  "writer/",
  "databricks/",
  "allenai/",
  "inclusionai/",
  "sensenova/",
  "upstage/",
  "aisingapore/",
  "swiss-ai/",
  "tiiuae/",
  "bigcode/",
  "openchat/",
  "cognitivecomputations/",
  "arcee-ai/",
  "poolside/",
  "eleutherai/",
  "stabilityai/",
  "black-forest-labs/",
  "ideogram/",
  "reka/",
  "internlm/",
  "sao10k/",
  "gryphe/",
] as const;

/** Votes threshold for "high" confidence. */
const HIGH_CONFIDENCE_VOTES = 5000;

/** Votes threshold for "medium" confidence. */
const MEDIUM_CONFIDENCE_VOTES = 1000;

/** Intelligence entry expiration: 7 days after sync. */
const EXPIRY_DAYS = 7;

const parsedInterval = parseInt(process.env.ARENA_ELO_SYNC_INTERVAL || "86400", 10);
const SYNC_INTERVAL_MS =
  Number.isFinite(parsedInterval) && parsedInterval > 0 ? parsedInterval * 1000 : 86400 * 1000;

// ─── Periodic sync state ─────────────────────────────────

let syncTimer: ReturnType<typeof setInterval> | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;
let lastSyncSource = "arena_elo";
let activeSyncIntervalMs = SYNC_INTERVAL_MS;
let firstSyncDone = false;
let syncInProgress = false;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// ─── Failure backoff (persisted in key_value) ────────────
// After a failed sync we stamp arena_elo/lastFailedAt so restarts and the
// periodic timer skip retrying a rate-limited/dead upstream within the
// window (remediation 2026-09-12: prevents boot-loop retry storms).
const BACKOFF_MS = SYNC_INTERVAL_MS / 4; // 6h for the default 24h interval

const KV_READ_SQL = `SELECT value FROM key_value WHERE namespace = ? AND key = ? LIMIT 1`;
const KV_WRITE_SQL = `INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)`;

function readLastFailedAt(source = "arena_elo"): number | null {
  try {
    const db = getDbInstance();
    const row = db.prepare(KV_READ_SQL).get(source, "lastFailedAt") as
      { value: string } | undefined;
    if (!row?.value) return null;
    const ts = Date.parse(row.value);
    return Number.isFinite(ts) ? ts : null;
  } catch {
    return null; // kv problems must never break the sync itself
  }
}

function writeLastFailedAt(ts: number, source = "arena_elo"): void {
  try {
    const db = getDbInstance();
    db.prepare(KV_WRITE_SQL).run(source, "lastFailedAt", new Date(ts).toISOString());
  } catch (err) {
    console.warn(`[ARENA_ELO_SYNC] Failed to persist lastFailedAt: ${getErrorMessage(err)}`);
  }
}

function clearLastFailedAt(source = "arena_elo"): void {
  try {
    const db = getDbInstance();
    db.prepare(`DELETE FROM key_value WHERE namespace = ? AND key = ?`).run(source, "lastFailedAt");
  } catch {
    // Swallow: a stuck kv row only costs one redundant fetch later.
  }
}

function readKv(key: string): string | null {
  try {
    const row = getDbInstance().prepare(KV_READ_SQL).get("arena_elo", key) as
      { value: string } | undefined;
    return row?.value || null;
  } catch {
    return null;
  }
}

function writeKv(key: string, value: string | null): void {
  try {
    const db = getDbInstance();
    if (value === null) {
      db.prepare(`DELETE FROM key_value WHERE namespace = ? AND key = ?`).run("arena_elo", key);
    } else {
      db.prepare(KV_WRITE_SQL).run("arena_elo", key, value);
    }
  } catch {
    // kv problems must never break the sync itself
  }
}

/** Which upstream served the most recent fetch (set by fetchArenaLeaderboards). */
let lastFetchSource: "wulong" | "huggingface" = "wulong";

/** `leaderboards` is null when OpenRouter served the sync (no Arena fetch happened). */
function recordSyncSuccess(leaderboards: ArenaLeaderboardMap | null): void {
  const datasetDate =
    leaderboards && lastFetchSource === "huggingface"
      ? (Object.values(leaderboards).find((b) => b.meta?.dataset_date)?.meta.dataset_date ?? null)
      : null;
  writeKv("lastError", null);
  writeKv("activeSource", leaderboards ? lastFetchSource : "openrouter");
  writeKv("datasetDate", datasetDate);
}

function countPersistedArenaEloModels(): number {
  try {
    const db = getDbInstance();
    const row = db
      .prepare(
        "SELECT COUNT(DISTINCT model) as cnt FROM model_intelligence WHERE source = 'arena_elo'"
      )
      .get() as { cnt: number } | undefined;
    return Number(row?.cnt ?? 0);
  } catch {
    return 0;
  }
}

function getEffectiveArenaEloSyncEnabled(): boolean {
  try {
    return isArenaEloSyncEnabled();
  } catch (error) {
    console.warn(
      `[ARENA_ELO_SYNC] Failed to resolve ARENA_ELO_SYNC_ENABLED feature flag: ${getErrorMessage(
        error
      )}`
    );
    return process.env.ARENA_ELO_SYNC_ENABLED !== "false";
  }
}

// ─── Model name normalization ────────────────────────────

/**
 * Trailing harness annotation the Arena leaderboard appends to some entries,
 * e.g. "gpt-5.6-sol-xhigh (codex-harness)". It describes the scaffold the model
 * was measured under, not the model id, so it never belongs in a stored key.
 */
const HARNESS_ANNOTATION_RE = /\s*\([^)]*\)\s*$/;

/**
 * Normalize a model name from the Arena leaderboard.
 *
 * Lowercases the name, drops a trailing harness annotation
 * ("gpt-5.6-sol-xhigh (codex-harness)" → "gpt-5.6-sol-xhigh") and strips known
 * vendor prefixes ("anthropic/claude-opus-4" → "claude-opus-4").
 *
 * @param rawName - The raw model name from the API response.
 * @returns The cleaned, lowercase model name.
 */
export function normalizeModelName(rawName: string): string {
  let name = rawName.toLowerCase().replace(HARNESS_ANNOTATION_RE, "");
  for (const prefix of VENDOR_PREFIXES) {
    if (name.startsWith(prefix)) {
      name = name.slice(prefix.length);
      break;
    }
  }
  return name;
}

// ─── Core: Fetch ─────────────────────────────────────────

/**
 * How many consecutive per-category fetch failures to let through to
 * `console.warn` before going quiet again. Timeouts against the Arena API
 * repeat every sync cycle (see `startPeriodicSync()`), so logging every
 * single one turns into log spam within a few hours (#11500). Mirrors the
 * once-per-label dedup pattern used by `warnEmptyAutoPoolOnce()`
 * (`open-sse/services/autoCombo/virtualFactory.ts`), except here the streak
 * resets on the next successful fetch so a genuinely new outage warns again.
 */
const ARENA_ELO_FETCH_WARN_STREAK_INTERVAL = 10;

/** Consecutive fetch-failure count per leaderboard category, since the last success. */
const categoryFetchFailureStreak = new Map<string, number>();

/** Test-only: reset the per-category fetch-failure streak dedup state. */
export function resetArenaEloFetchFailureStreaksForTests(): void {
  categoryFetchFailureStreak.clear();
}

/**
 * Fetch leaderboards from the Arena AI API for all configured categories.
 *
 * Fetches "text" and "code" leaderboards concurrently and returns
 * a map of category → leaderboard data.
 *
 * @returns Map of leaderboard category to its data.
 * @throws If all category fetches fail (individual failures are logged and skipped).
 */
async function fetchPrimaryArenaLeaderboards(): Promise<ArenaLeaderboardMap> {
  const result: ArenaLeaderboardMap = {};
  const errors: string[] = [];

  const fetches = FETCH_CATEGORIES.map(async (category) => {
    const url = `${ARENA_ELO_API_BASE}?name=${category}`;
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) {
        const body = (await response.text().catch(() => "")).trim().slice(0, 100);
        throw new Error(
          `Arena API fetch failed for "${category}" [${response.status}]: ${
            response.statusText || sanitizeErrorMessage(body)
          }`
        );
      }
      const text = await response.text();
      try {
        result[category] = JSON.parse(text) as ArenaLeaderboardData;
      } catch {
        throw new Error(
          `Arena API returned invalid JSON for "${category}" (${text.slice(0, 100)}...)`
        );
      }
      // Recovered: let the next failure streak warn from scratch again.
      categoryFetchFailureStreak.delete(category);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const streak = (categoryFetchFailureStreak.get(category) ?? 0) + 1;
      categoryFetchFailureStreak.set(category, streak);
      if (streak === 1 || streak % ARENA_ELO_FETCH_WARN_STREAK_INTERVAL === 0) {
        console.warn(
          `[ARENA_ELO_SYNC] Failed to fetch "${category}" leaderboard: ${message}` +
            (streak > 1 ? ` (${streak} consecutive failures; further warnings rate-limited)` : "")
        );
      }
      errors.push(message);
    }
  });

  await Promise.all(fetches);

  if (Object.keys(result).length === 0) {
    throw new Error(`All Arena leaderboard fetches failed: ${errors.join("; ") || "no models"}`);
  }

  return result;
}

/**
 * Fetch leaderboards: primary scraper API first, then (only when it yields no usable
 * board) the official lmarena-ai Hugging Face dataset (#17922). Sources are never
 * blended in one refresh.
 */
export async function fetchArenaLeaderboards(): Promise<ArenaLeaderboardMap> {
  let primaryEmpty: ArenaLeaderboardMap | null = null;
  try {
    const boards = await fetchPrimaryArenaLeaderboards();
    lastFetchSource = "wulong";
    const usable = Object.values(boards).some(
      (b) => Array.isArray(b?.models) && b.models.length > 0
    );
    if (usable) return boards;
    primaryEmpty = boards;
    throw new Error("Arena API returned only empty leaderboards");
  } catch (primaryErr) {
    try {
      const boards = await fetchHuggingFaceLeaderboards();
      lastFetchSource = "huggingface";
      console.warn(
        `[ARENA_ELO_SYNC] Primary source unusable, served from Hugging Face fallback: ${getErrorMessage(primaryErr)}`
      );
      return boards;
    } catch (fallbackErr) {
      // Primary answered (just empty): keep the old "0 entries" contract, no failure.
      if (primaryEmpty) return primaryEmpty;
      throw new Error(`${getErrorMessage(primaryErr)} | ${getErrorMessage(fallbackErr)}`);
    }
  }
}

// ─── Core: Transform ─────────────────────────────────────

/**
 * Compute confidence level based on vote count.
 *
 * @param votes - Number of human preference votes.
 * @returns "high" (≥5000), "medium" (≥1000), or "low" (<1000).
 */
function computeConfidence(votes: number): "high" | "medium" | "low" {
  if (votes >= HIGH_CONFIDENCE_VOTES) return "high";
  if (votes >= MEDIUM_CONFIDENCE_VOTES) return "medium";
  return "low";
}

/**
 * Transform raw Arena leaderboard data into model intelligence entries.
 *
 * For each leaderboard category, normalizes ELO scores into task-fit values
 * in the range [0.4, 0.98] using the formula:
 *
 *   taskFit = 0.4 + 0.58 * ((elo - minElo) / (maxElo - minElo || 1))
 *
 * This ensures scores never reach 0 or 1, leaving room for user overrides.
 * Models with fewer than 100 votes are marked as confidence="low".
 *
 * Leaderboard categories are mapped to OmniRoute task types:
 * - "text" → default, review, documentation, debugging
 * - "code" → coding
 *
 * The leaderboard scores harness × effort combinations as separate entries
 * ("claude-opus-5-high", "claude-opus-5-max"), so a request for the bare id
 * would miss every row. Each variant that `resolveScoresAs()` resolves to a
 * routable base id therefore also contributes a synthesized base row carrying
 * the BEST task fit among that base's variants (the per-effort entries measure
 * the same weights at different budgets — the model's ceiling is the max, and
 * cost/latency are separate factors in the 12-factor score). An explicitly
 * measured base row is never lowered by synthesis.
 *
 * @param data - Map of leaderboard category → Arena leaderboard data.
 * @param source - Upstream that served `data`; stored in `metric` as `<source>:elo`.
 * @returns Array of model intelligence entries ready for DB upsert.
 */
export function transformToModelIntelligence(
  data: ArenaLeaderboardMap,
  source: "wulong" | "huggingface" = "wulong"
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString();

  for (const [category, leaderboard] of Object.entries(data)) {
    const taskCategories = CATEGORY_TASK_MAP[category];
    if (!taskCategories) continue;

    const models = Array.isArray(leaderboard.models) ? leaderboard.models : [];
    if (models.length === 0) continue;

    // Compute ELO range for normalization
    const eloScores = models.map((m) => m.score);
    const minElo = Math.min(...eloScores);
    const maxElo = Math.max(...eloScores);
    const eloRange = maxElo - minElo || 1;

    for (const model of models) {
      const normalizedModel = normalizeModelName(model.model);
      const confidence = computeConfidence(model.votes);
      const taskFit = 0.4 + 0.58 * ((model.score - minElo) / eloRange);

      for (const taskCategory of taskCategories) {
        entries.push({
          model: normalizedModel,
          category: taskCategory,
          source: "arena_elo",
          score: Math.round(taskFit * 10000) / 10000,
          eloRaw: model.score,
          confidence,
          expiresAt,
          permaslug: model.model,
          metric: `${source}:elo`,
        });
      }
    }
  }

  return withSynthesizedBaseRows(entries);
}

/**
 * Add one synthesized base row per (base, category) for every leaderboard entry
 * that is an effort/alias variant of a routable catalog id.
 *
 * Runs as a pass over the finished variant rows so that all variants of a base
 * are visible at once: the winner is the highest task fit, and it contributes
 * its own `eloRaw` and `confidence` (no invented confidence label — the column's
 * vocabulary stays high/medium/low). A base that the leaderboard measured
 * directly keeps its own row unless a variant scored strictly higher.
 *
 * Resolution never guesses: `resolveScoresAs` returning `via: null` means the
 * stripped base is not a catalog id, so nothing is synthesized for it.
 *
 * @param entries - Variant rows, one per (leaderboard entry, task category).
 * @returns The same rows plus the synthesized base rows.
 */
function withSynthesizedBaseRows(
  entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">>
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const keyOf = (model: string, category: string) => `${model}|${category}`;
  const indexByKey = new Map<string, number>();
  entries.forEach((entry, index) => indexByKey.set(keyOf(entry.model, entry.category), index));

  const best = new Map<string, Omit<ModelIntelligenceEntry, "syncedAt">>();
  for (const entry of entries) {
    const { base, via } = resolveScoresAs(entry.model);
    if (via === null || base === entry.model) continue;

    const key = keyOf(base, entry.category);
    const existingIndex = indexByKey.get(key);
    if (existingIndex !== undefined) {
      // Base model was explicitly measured: variant can only overwrite if it shares the SAME score metric
      const existing = entries[existingIndex];
      if (entry.metric !== existing.metric || entry.score <= existing.score) {
        continue;
      }
    }

    const current = best.get(key);
    if (!current || entry.score > current.score) {
      best.set(key, { ...entry, model: base });
    }
  }

  const result = [...entries];
  for (const [key, candidate] of best) {
    const existingIndex = indexByKey.get(key);
    if (existingIndex === undefined) {
      result.push(candidate);
      continue;
    }
    // The leaderboard measured the base itself — only a strictly better variant with the same metric wins.
    const existing = result[existingIndex];
    if (candidate.metric === existing.metric && candidate.score > existing.score) {
      result[existingIndex] = candidate;
    }
  }

  return result;
}

// ─── OpenRouter Benchmarks Integration ───────────────────

/**
 * Normalizes an OpenRouter model slug into one or more candidate identifiers.
 *
 * Strips known vendor prefixes (via `normalizeModelName`), drops snapshot dates
 * (e.g. `-20260921`), and yields both the normalized versioned name and the base name.
 * Also maps common version-reversals (e.g. `claude-4.6-sonnet` → `claude-sonnet-4-6`).
 *
 * @param rawSlug - Raw model slug from OpenRouter benchmark data.
 * @returns Array of candidate normalized model identifiers.
 */
export function normalizeOpenRouterModelSlug(rawSlug: string): string[] {
  const normalized = normalizeModelName(rawSlug);
  const results = new Set<string>();
  results.add(normalized);

  // Strip trailing snapshot date e.g. -20260921 or -2024-05-13
  const withoutDate = normalized.replace(/-(?:\d{8}|\d{4}-\d{2}-\d{2})$/, "");
  if (withoutDate && withoutDate !== normalized) {
    results.add(withoutDate);
  }

  // Preview-stripped variant e.g. gemini-3.1-pro-preview -> gemini-3.1-pro
  for (const name of Array.from(results)) {
    if (name.includes("-preview")) {
      const withoutPreview = name.replace(/-preview(?=-|$)/, "");
      if (withoutPreview && withoutPreview !== name) {
        results.add(withoutPreview);
      }
    }
  }

  // Suffix-stripped base variants (e.g. llama-3.3-70b-instruct -> llama-3.3-70b, gemma-4-31b-it -> gemma-4-31b)
  for (const name of Array.from(results)) {
    if (/-(?:instruct|it|chat)(?=-|$)/i.test(name)) {
      const withoutSuffix = name.replace(/-(?:instruct|it|chat)(?=-|$)/gi, "");
      if (withoutSuffix && withoutSuffix !== name && withoutSuffix.length > 2) {
        results.add(withoutSuffix);
      }
    }
  }

  // Dot <-> hyphen version normalization (e.g. claude-opus-5.5 <-> claude-opus-5-5)
  for (const name of Array.from(results)) {
    if (/\d+\.\d+/.test(name)) {
      results.add(name.replace(/(\d+)\.(\d+)/g, "$1-$2"));
    }
    if (/(?:^|[a-z-])(\d+)-(\d+)(?:[a-z-]|$)/i.test(name)) {
      results.add(name.replace(/(\b\d+)-(\d+\b)/g, "$1.$2"));
    }
  }

  // Canonical alias mapping for inverted versioning e.g. claude-4.6-sonnet -> claude-sonnet-4-6
  for (const name of Array.from(results)) {
    const claudeMatch = name.match(/^claude-(\d+(?:[\.-]\d+)?)-(sonnet|opus|haiku)(.*)$/);
    if (claudeMatch) {
      const verHyphen = claudeMatch[1].replace(/\./g, "-");
      const verDot = claudeMatch[1].replace(/-/g, ".");
      const fam = claudeMatch[2];
      const rest = claudeMatch[3] || "";
      results.add(`claude-${fam}-${verHyphen}${rest}`);
      results.add(`claude-${fam}-${verDot}${rest}`);
    }
    const famFirstMatch = name.match(/^claude-(sonnet|opus|haiku)-(\d+(?:[\.-]\d+)?)(.*)$/);
    if (famFirstMatch) {
      const fam = famFirstMatch[1];
      const verHyphen = famFirstMatch[2].replace(/\./g, "-");
      const verDot = famFirstMatch[2].replace(/-/g, ".");
      const rest = famFirstMatch[3] || "";
      results.add(`claude-${verHyphen}-${fam}${rest}`);
      results.add(`claude-${verDot}-${fam}${rest}`);
    }
  }

  return Array.from(results);
}

/**
 * Resolve the OpenRouter API key if configured.
 *
 * Checks:
 * 1. An active connection in `provider_connections` for provider "openrouter" with an apiKey.
 * 2. The `OPENROUTER_API_KEY` environment variable.
 *
 * @returns The resolved API key, or null if none is configured.
 */
export async function resolveOpenRouterApiKey(): Promise<string | null> {
  try {
    const conns = await getProviderConnections({ provider: "openrouter", isActive: true });
    for (const conn of conns) {
      if (typeof conn.apiKey === "string" && conn.apiKey.trim().length > 0) {
        return conn.apiKey.trim();
      }
    }
  } catch (err) {
    console.warn(
      `[ARENA_ELO_SYNC] Failed to query openrouter connections: ${getErrorMessage(err)}`
    );
  }
  const envKey = process.env.OPENROUTER_API_KEY?.trim();
  if (envKey) return envKey;
  return null;
}

/**
 * Fetch benchmarks from the OpenRouter Benchmarks API.
 *
 * @param apiKey - OpenRouter API key for authentication.
 * @param signal - Optional AbortSignal (defaults to 30s timeout).
 * @returns Parsed OpenRouter benchmarks response.
 */
export async function fetchOpenRouterBenchmarks(
  apiKey: string,
  signal?: AbortSignal
): Promise<OpenRouterBenchmarksResponse> {
  const timeoutSignal = signal ?? AbortSignal.timeout(30000);
  const response = await fetch(OPENROUTER_BENCHMARKS_API, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "User-Agent": "OmniRoute/1.0",
    },
    signal: timeoutSignal,
  });

  if (!response.ok) {
    throw new Error(
      `OpenRouter Benchmarks API fetch failed [${response.status}]: ${response.statusText}`
    );
  }

  const text = await response.text();
  try {
    const json = JSON.parse(text) as OpenRouterBenchmarksResponse;
    if (!json || !Array.isArray(json.data)) {
      throw new Error(
        "OpenRouter Benchmarks API returned invalid payload structure (missing data array)"
      );
    }
    return json;
  } catch (err) {
    throw new Error(
      `OpenRouter Benchmarks API returned invalid JSON: ${getErrorMessage(err)} (${text.slice(0, 100)}...)`
    );
  }
}

/**
 * Transform OpenRouter benchmark data into OmniRoute model intelligence entries.
 *
 * Prioritizes Artificial Analysis indices (intelligence_index, coding_index, agentic_index),
 * and supplements with Design Arena ELO scores and OpenRouter task-benchmark metrics.
 *
 * Normalizes all metrics into task-fit values in [0.4, 0.98] and persists under
 * source "arena_elo" for seamless downstream consumption.
 *
 * @param data - Raw OpenRouter benchmark payload.
 * @returns Array of model intelligence entries ready for DB upsert.
 */
export function transformOpenRouterBenchmarksToModelIntelligence(
  data: OpenRouterBenchmarksResponse
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const items = Array.isArray(data?.data) ? data.data : [];
  if (items.length === 0) return [];

  const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString();

  // 1. Gather ranges for Artificial Analysis
  const aaItems = items.filter((d) => d.source === "artificial-analysis");
  const intScores = aaItems
    .map((d) => d.intelligence_index)
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  const codeScores = aaItems
    .map((d) => d.coding_index)
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  const agentScores = aaItems
    .map((d) => d.agentic_index)
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));

  const minInt = intScores.length > 0 ? Math.min(...intScores) : 0;
  const maxInt = intScores.length > 0 ? Math.max(...intScores) : 100;

  const minCode = codeScores.length > 0 ? Math.min(...codeScores) : 0;
  const maxCode = codeScores.length > 0 ? Math.max(...codeScores) : 100;

  const minAgent = agentScores.length > 0 ? Math.min(...agentScores) : 0;
  const maxAgent = agentScores.length > 0 ? Math.max(...agentScores) : 100;

  // 2. Gather ranges for Design Arena
  const daItems = items.filter((d) => d.source === "design-arena");
  const daEloScores = daItems
    .map((d) => d.elo)
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  const minDaElo = daEloScores.length > 0 ? Math.min(...daEloScores) : 800;
  const maxDaElo = daEloScores.length > 0 ? Math.max(...daEloScores) : 1600;

  const scale = (val: number, min: number, max: number): number => {
    return 0.4 + 0.58 * ((val - min) / (max - min || 1));
  };

  const entryMap = new Map<string, Omit<ModelIntelligenceEntry, "syncedAt">>();

  const setEntry = (
    model: string,
    category: string,
    score: number,
    eloRaw: number | null,
    confidence: "high" | "medium" | "low",
    permaslug?: string,
    metric?: string
  ) => {
    const key = `${model}|${category}`;
    const existing = entryMap.get(key);
    if (!existing || score > existing.score) {
      entryMap.set(key, {
        model,
        category,
        source: "arena_elo",
        score: Math.round(score * 10000) / 10000,
        eloRaw,
        confidence,
        expiresAt,
        permaslug: permaslug || model,
        metric: metric || null,
      });
    }
  };

  // Phase 1: Artificial Analysis (primary source)
  for (const item of aaItems) {
    if (!item.model_permaslug) continue;
    const modelNames = normalizeOpenRouterModelSlug(item.model_permaslug);

    for (const m of modelNames) {
      // Coding
      if (typeof item.coding_index === "number" && Number.isFinite(item.coding_index)) {
        const s = scale(item.coding_index, minCode, maxCode);
        setEntry(
          m,
          "coding",
          s,
          Math.round(item.coding_index),
          "high",
          item.model_permaslug,
          "artificial-analysis:coding"
        );
      } else if (
        typeof item.intelligence_index === "number" &&
        Number.isFinite(item.intelligence_index)
      ) {
        const s = scale(item.intelligence_index, minInt, maxInt);
        setEntry(
          m,
          "coding",
          s,
          Math.round(item.intelligence_index),
          "medium",
          item.model_permaslug,
          "artificial-analysis:intelligence"
        );
      }

      // Default, Review, Documentation
      if (typeof item.intelligence_index === "number" && Number.isFinite(item.intelligence_index)) {
        const s = scale(item.intelligence_index, minInt, maxInt);
        setEntry(
          m,
          "default",
          s,
          Math.round(item.intelligence_index),
          "high",
          item.model_permaslug,
          "artificial-analysis:intelligence"
        );
        setEntry(
          m,
          "review",
          s,
          Math.round(item.intelligence_index),
          "high",
          item.model_permaslug,
          "artificial-analysis:intelligence"
        );
        setEntry(
          m,
          "documentation",
          s,
          Math.round(item.intelligence_index),
          "high",
          item.model_permaslug,
          "artificial-analysis:intelligence"
        );
      }

      // Debugging
      if (typeof item.agentic_index === "number" && Number.isFinite(item.agentic_index)) {
        const s = scale(item.agentic_index, minAgent, maxAgent);
        setEntry(
          m,
          "debugging",
          s,
          Math.round(item.agentic_index),
          "high",
          item.model_permaslug,
          "artificial-analysis:agentic"
        );
      } else if (
        typeof item.intelligence_index === "number" &&
        Number.isFinite(item.intelligence_index)
      ) {
        const s = scale(item.intelligence_index, minInt, maxInt);
        setEntry(
          m,
          "debugging",
          s,
          Math.round(item.intelligence_index),
          "medium",
          item.model_permaslug,
          "artificial-analysis:intelligence"
        );
      }
    }
  }

  // Phase 2: Design Arena (supplements models/categories lacking AA entries)
  // Permanent 0.85 discount applied to Design Arena fallback scores
  const PHASE_2_DISCOUNT = 0.85;

  for (const item of daItems) {
    if (!item.model_permaslug || typeof item.elo !== "number" || !Number.isFinite(item.elo))
      continue;
    const modelNames = normalizeOpenRouterModelSlug(item.model_permaslug);
    const s = scale(item.elo, minDaElo, maxDaElo) * PHASE_2_DISCOUNT;
    const isCode = ["codecategories", "website", "gamedev", "uicomponent"].includes(
      item.category ?? ""
    );
    const categories = isCode ? ["coding"] : ["default", "review", "documentation", "debugging"];

    const votes = item.tournament_stats?.total ?? 0;
    const conf = computeConfidence(votes);

    for (const m of modelNames) {
      for (const cat of categories) {
        if (!entryMap.has(`${m}|${cat}`)) {
          setEntry(m, cat, s, Math.round(item.elo), conf, item.model_permaslug, "design-arena:elo");
        }
      }
    }
  }

  // Phase 3: OpenRouter task benchmarks
  // Permanent 0.70 discount applied to task benchmark fallback scores
  const PHASE_3_DISCOUNT = 0.7;

  const orItems = items.filter(
    (d) =>
      d.source === "openrouter" &&
      typeof d.accuracy === "number" &&
      Number.isFinite(d.accuracy) &&
      Boolean(d.model_permaslug)
  );

  // 1. Gather (max - min) ranges per benchmark_type across models
  const benchRanges = new Map<string, { min: number; max: number }>();
  for (const item of orItems) {
    const bType = item.benchmark_type || "default";
    const rawAcc = item.accuracy as number;
    const acc = rawAcc > 1 ? rawAcc / 100 : rawAcc;
    const curr = benchRanges.get(bType);
    if (!curr) {
      benchRanges.set(bType, { min: acc, max: acc });
    } else {
      curr.min = Math.min(curr.min, acc);
      curr.max = Math.max(curr.max, acc);
    }
  }

  // 2. Aggregate multiple benchmarks for each (model, category)
  interface BenchAccumulator {
    model: string;
    category: string;
    permaslug: string;
    weightedScoreSum: number;
    rawAccWeightedSum: number;
    totalWeight: number;
    totalTasks: number;
    benchCount: number;
    firstBenchType: string;
  }

  const accumulators = new Map<string, BenchAccumulator>();

  for (const item of orItems) {
    const modelNames = normalizeOpenRouterModelSlug(item.model_permaslug);
    const bType = item.benchmark_type || "default";
    const range = benchRanges.get(bType);
    const rawAcc = item.accuracy as number;
    const acc = rawAcc > 1 ? rawAcc / 100 : rawAcc;

    // Normalization with (max score - min score), fallback to clamped accuracy if single model
    let normScore: number;
    if (range && range.max > range.min) {
      normScore = (acc - range.min) / (range.max - range.min);
    } else {
      normScore = Math.max(0, Math.min(1, acc));
    }

    const isCode =
      (item.benchmark_type ?? "").includes("code") || (item.benchmark_type ?? "").includes("tau");
    const categories = isCode
      ? ["coding", "debugging"]
      : ["default", "review", "documentation", "debugging"];

    const taskCount =
      typeof item.total_tasks === "number" && item.total_tasks > 0 ? item.total_tasks : 0;
    const weight = taskCount > 0 ? taskCount : 1;

    for (const m of modelNames) {
      for (const cat of categories) {
        const key = `${m}|${cat}`;
        if (entryMap.has(key)) continue;

        let accEntry = accumulators.get(key);
        if (!accEntry) {
          accEntry = {
            model: m,
            category: cat,
            permaslug: item.model_permaslug,
            weightedScoreSum: 0,
            rawAccWeightedSum: 0,
            totalWeight: 0,
            totalTasks: 0,
            benchCount: 0,
            firstBenchType: bType,
          };
          accumulators.set(key, accEntry);
        }

        accEntry.weightedScoreSum += normScore * weight;
        accEntry.rawAccWeightedSum += acc * weight;
        accEntry.totalWeight += weight;
        accEntry.totalTasks += taskCount;
        accEntry.benchCount += 1;
      }
    }
  }

  // 3. Finalize aggregated benchmarks with 0.70 discount
  for (const acc of accumulators.values()) {
    const avgNormScore = acc.totalWeight > 0 ? acc.weightedScoreSum / acc.totalWeight : 0;
    const avgRawAcc = acc.totalWeight > 0 ? acc.rawAccWeightedSum / acc.totalWeight : 0;
    const baseScore = 0.4 + 0.58 * Math.max(0, Math.min(1, avgNormScore));
    const s = baseScore * PHASE_3_DISCOUNT;
    const conf = acc.totalTasks >= 1000 ? "high" : acc.totalTasks >= 100 ? "medium" : "low";
    const metricTag =
      acc.benchCount > 1 ? "openrouter:multi-bench" : `openrouter:${acc.firstBenchType}`;
    // Store percentage accuracy (e.g. 75% or 82%) so table can display Acc 75% (OpenRouter)
    const rawPercent = Math.round(avgRawAcc * 100);

    setEntry(acc.model, acc.category, s, rawPercent, conf, acc.permaslug, metricTag);
  }

  return withSynthesizedBaseRows(Array.from(entryMap.values()));
}

// ─── Main sync function ──────────────────────────────────

/**
 * Fetch, transform, and store Arena ELO intelligence data.
 *
 * Pipeline: delete expired → fetch leaderboards → transform → bulk upsert.
 * All errors are caught and logged — sync is never fatal.
 *
 * @param dryRun - If true, fetches and transforms but does not write to DB.
 * @returns Sync result with model count and success status.
 */
export async function syncArenaElo(dryRun = false, force = false): Promise<SyncResult> {
  if (syncInProgress) {
    return {
      success: false,
      modelCount: 0,
      source: "arena_elo",
      error: "Sync already in progress",
    };
  }
  syncInProgress = true;
  try {
    // Backup DB before first sync (same pattern as pricingSync)
    if (!firstSyncDone && !dryRun) {
      backupDbFile("pre-arena-elo-sync");
      firstSyncDone = true;
    }

    const openRouterApiKey = await resolveOpenRouterApiKey();

    if (!dryRun && !force) {
      // Freshness guard: a non-empty dataset synced within the interval is
      // still good — skip the fetch entirely (cheap fast path on boot).
      const latest = getLatestSyncedAt("arena_elo");
      if (latest) {
        const age = Date.now() - Date.parse(latest);
        if (Number.isFinite(age) && age >= 0 && age < SYNC_INTERVAL_MS) {
          const count = lastSyncModelCount || countPersistedArenaEloModels();
          if (count > 0) {
            lastSyncModelCount = count;
            return {
              success: true,
              modelCount: count,
              source: "arena_elo",
            };
          }
        }
      }

      // Failure backoff: a recent failed sync means the active upstream is probably
      // still rate-limited or down — skip instead of hammering it.
      // If an OpenRouter key is configured, check openrouter failure; otherwise check arena_elo.
      const primarySource = openRouterApiKey ? "openrouter" : "arena_elo";
      const failedAt = readLastFailedAt(primarySource);
      if (failedAt !== null && Date.now() - failedAt < BACKOFF_MS) {
        return {
          success: false,
          modelCount: 0,
          source: "arena_elo",
          error: `Skipping sync: recent ${primarySource} failure within backoff window`,
        };
      }
    }

    // Fetch benchmarks: prefer OpenRouter if an API key is configured,
    // falling back to Arena AI leaderboards if unconfigured or on failure.
    let entries: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
    let syncedSource = "arena_elo";
    let leaderboards: ArenaLeaderboardMap | null = null;

    if (openRouterApiKey) {
      try {
        const orData = await fetchOpenRouterBenchmarks(openRouterApiKey);
        entries = transformOpenRouterBenchmarksToModelIntelligence(orData);
        syncedSource = "openrouter";
      } catch (err) {
        const message = getErrorMessage(err);
        writeLastFailedAt(Date.now(), "openrouter");
        console.warn(
          `[ARENA_ELO_SYNC] OpenRouter benchmark fetch failed: ${message}. Falling back to Arena AI leaderboards.`
        );
      }
    }

    if (entries.length === 0) {
      leaderboards = await fetchArenaLeaderboards();
      entries = transformToModelIntelligence(leaderboards, lastFetchSource);
      syncedSource = "arena_elo";
    }

    if (!dryRun && entries.length > 0) {
      try {
        // Atomic replace: upsert all + prune not-in-refreshed-set in one tx.
        applyArenaEloRefresh(entries);
        clearLastFailedAt("arena_elo");
        clearLastFailedAt("openrouter");
        recordSyncSuccess(leaderboards);
      } catch (err) {
        const message = getErrorMessage(err);
        console.warn(`[ARENA_ELO_SYNC] Failed to apply intelligence refresh: ${message}`);
        return {
          success: false,
          modelCount: 0,
          source: "arena_elo",
          error: message,
        };
      }
    }

    if (!dryRun) {
      lastSyncTime = new Date().toISOString();
      lastSyncModelCount = entries.length;
      lastSyncSource = syncedSource;
    }

    const countLabel = dryRun ? "would sync" : "synced";
    const sourceLabel =
      syncedSource === "openrouter" ? "OpenRouter benchmarks" : "Arena leaderboards";
    console.log(
      `[ARENA_ELO_SYNC] ${countLabel} ${entries.length} model intelligence entries from ${sourceLabel}`
    );

    return {
      success: true,
      modelCount: entries.length,
      source: "arena_elo",
    };
  } catch (err) {
    const message = getErrorMessage(err);
    console.warn("[ARENA_ELO_SYNC] Sync failed:", message);
    if (!dryRun) {
      // Persist the failure so restarts/periodic ticks back off instead of
      // retrying a dead upstream in a loop.
      writeLastFailedAt(Date.now(), "arena_elo");
      writeKv("lastError", sanitizeErrorMessage(message).slice(0, 500));
    }
    return {
      success: false,
      modelCount: 0,
      source: "arena_elo",
      error: message,
    };
  } finally {
    syncInProgress = false;
  }
}

// ─── Clear synced data ───────────────────────────────────

/**
 * Clear all synced intelligence data (arena_elo source).
 *
 * Iterates through all arena_elo entries and deletes them one by one,
 * since the DB module provides per-key deletion. This is used by the
 * DELETE /api/intelligence/sync endpoint.
 */
export function clearSyncedIntelligence(): void {
  const deleted = deleteModelIntelligenceBySource("arena_elo");
  console.log(`[ARENA_ELO_SYNC] Cleared ${deleted} arena_elo intelligence entries`);
}

// ─── Periodic sync ───────────────────────────────────────

/**
 * Start periodic Arena ELO sync (non-blocking).
 *
 * Performs an initial sync immediately, then schedules periodic syncs
 * at the configured interval. The timer is unref'd so it won't prevent
 * the Node.js process from exiting.
 *
 * @param intervalMs - Override interval in milliseconds (defaults to env or 86400s).
 */
function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer) return; // Already running

  const interval = intervalMs ?? SYNC_INTERVAL_MS;
  activeSyncIntervalMs = interval;
  console.log(`[ARENA_ELO_SYNC] Starting periodic sync every ${interval / 1000}s`);

  // Initial sync (non-blocking)
  syncArenaElo()
    .then((result) => {
      if (result.success) {
        console.log(
          `[ARENA_ELO_SYNC] Initial sync complete: ${result.modelCount} model intelligence entries`
        );
      }
    })
    .catch((err) => {
      console.warn(
        "[ARENA_ELO_SYNC] Initial sync error:",
        err instanceof Error ? err.message : err
      );
    });

  syncTimer = setInterval(() => {
    syncArenaElo()
      .then((result) => {
        if (result.success) {
          console.log(`[ARENA_ELO_SYNC] Periodic sync complete: ${result.modelCount} entries`);
        }
      })
      .catch((err) => {
        console.warn(
          "[ARENA_ELO_SYNC] Periodic sync error:",
          err instanceof Error ? err.message : err
        );
      });
  }, interval);

  // Prevent the timer from keeping the process alive
  if (syncTimer && typeof syncTimer === "object" && "unref" in syncTimer) {
    (syncTimer as { unref?: () => void }).unref?.();
  }
}

/**
 * Stop periodic Arena ELO sync and clean up the timer.
 */
export function stopArenaEloSync(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[ARENA_ELO_SYNC] Periodic sync stopped");
  }
}

/**
 * Get the current Arena ELO sync status.
 *
 * @returns Sync status including enabled flag, last sync time, model count,
 *   next scheduled sync time, interval, and active sources.
 */
export function getArenaEloSyncStatus(): SyncStatus {
  const enabled = getEffectiveArenaEloSyncEnabled();
  // Stored synced_at comes from SQLite datetime('now'): UTC "YYYY-MM-DD HH:MM:SS"
  // without a timezone suffix. Date.parse reads that as local time, which
  // shifts the served date under non-UTC TZ, so normalize to ISO UTC here.
  let persisted: string | null = null;
  try {
    const persistedRaw = getLatestSyncedAt("arena_elo");
    const persistedMs = persistedRaw
      ? Date.parse(persistedRaw.includes("T") ? persistedRaw : `${persistedRaw.replace(" ", "T")}Z`)
      : NaN;
    persisted = Number.isFinite(persistedMs) ? new Date(persistedMs).toISOString() : null;
  } catch (error) {
    console.warn(`[ARENA_ELO_SYNC] Failed to read persisted sync time: ${getErrorMessage(error)}`);
  }
  return {
    enabled,
    lastSync: persisted ?? lastSyncTime,
    lastSyncModelCount,
    nextSync:
      syncTimer && lastSyncTime
        ? new Date(new Date(lastSyncTime).getTime() + activeSyncIntervalMs).toISOString()
        : null,
    intervalMs: activeSyncIntervalMs,
    sources: lastSyncSource === "openrouter" ? ["arena_elo", "openrouter"] : ["arena_elo"],
    lastError: readKv("lastError"),
    lastFailedAt: readKv("lastFailedAt"),
    activeSource:
      readKv("activeSource") === "huggingface"
        ? "huggingface"
        : readKv("activeSource") === "wulong"
          ? "wulong"
          : readKv("activeSource") === "openrouter"
            ? "openrouter"
            : null,
    datasetDate: readKv("datasetDate"),
  };
}

/** Test-only: reset periodic sync state for deterministic tests. */
export function resetArenaEloSyncStateForTests(): void {
  lastSyncSource = "arena_elo";
  lastSyncTime = null;
  lastSyncModelCount = 0;
  categoryFetchFailureStreak.clear();
}

// ─── Init (called from instrumentation-node.ts) ───────────────────

/**
 * Initialize Arena ELO sync if enabled via feature flag configuration.
 *
 * Reads `ARENA_ELO_SYNC_ENABLED` (default: true; set to `false` to opt out)
 * through the feature flag resolver, so DB overrides from the dashboard apply.
 * When enabled, starts periodic sync with the interval from `ARENA_ELO_SYNC_INTERVAL`
 * (default: 86400 seconds / daily).
 *
 * All errors during initialization or the initial sync are caught and logged
 * — initialization is never fatal.
 */
export async function initArenaEloSync(): Promise<boolean> {
  if (!getEffectiveArenaEloSyncEnabled()) {
    console.log(
      "[ARENA_ELO_SYNC] Disabled by the effective ARENA_ELO_SYNC_ENABLED feature flag. Enable it from Dashboard Feature Flags, unset the env var, or set it to true to enable."
    );
    return false;
  }
  startPeriodicSync();
  return true;
}
