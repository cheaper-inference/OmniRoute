/**
 * arenaEloHfSource.ts — fallback Arena ELO source (#17922).
 *
 * The primary scraper API (api.wulong.dev) went empty on 2026-10-08. This module reads
 * the official `lmarena-ai/leaderboard-dataset` (CC-BY-4.0) through the Hugging Face
 * datasets-server and maps it to the same `ArenaLeaderboardMap` shape the sync engine
 * already consumes ("overall" → `text`, "coding" → `code`).
 *
 * Two HF endpoints are used:
 *   1. `/filter` — server-side category filter (preferred, fewer pages). It is subject
 *      to intermittent 500/429 rate limiting, so it retries with exponential backoff.
 *   2. `/rows`   — stable full-table pagination (secondary fallback). Used only when
 *      `/filter` fails for a category; rows are filtered client-side by category.
 */

import { z } from "zod";

import type { ArenaLeaderboardMap, ArenaModelEntry } from "./arenaEloSync";

const HF_FILTER_URL = "https://datasets-server.huggingface.co/filter";
const HF_ROWS_URL = "https://datasets-server.huggingface.co/rows";
const HF_DATASET = "lmarena-ai/leaderboard-dataset";
const PAGE_LENGTH = 100;
const MAX_PAGES = 10;

/**
 * Retry tuning for the datasets-server requests. Exported as a mutable object so tests
 * can shorten the backoff window; production callers should not modify it.
 */
export const HF_RETRY_CONFIG = {
  maxAttempts: 5,
  baseDelayMs: 500,
  maxDelayMs: 8000,
};

/** HF dataset category → Arena leaderboard name used by the sync engine. */
const HF_CATEGORY_MAP = { overall: "text", coding: "code" } as const;

const HfRowSchema = z.object({
  row: z.object({
    model_name: z.string().min(1),
    organization: z.string().nullish(),
    license: z.string().nullish(),
    rating: z.number(),
    rating_lower: z.number().nullish(),
    rating_upper: z.number().nullish(),
    vote_count: z.number().nullish(),
    rank: z.number().nullish(),
    leaderboard_publish_date: z.string().nullish(),
    category: z.string().nullish(),
  }),
});

const HfPageSchema = z.object({
  rows: z.array(HfRowSchema),
  num_rows_total: z.number(),
});

const EFFORT_WORDS = new Set(["high", "low", "medium", "xhigh", "max", "thinking"]);
const TRAILING_PAREN_RE = /\s*\(([^)]*)\)\s*$/;

/**
 * Turn an Arena display name ("Claude Opus 5.5 (High)") into a model id
 * ("claude-opus-5.5-high"). A recognised effort word in the trailing parentheses is
 * folded into the id; any other parenthetical (harness annotation) is dropped.
 */
export function slugifyArenaDisplayName(displayName: string): string {
  let name = displayName.trim();
  let effort = "";
  const match = TRAILING_PAREN_RE.exec(name);
  if (match) {
    const inner = match[1].trim().toLowerCase();
    if (EFFORT_WORDS.has(inner)) effort = inner;
    name = name.slice(0, match.index);
  }
  const base = name.trim().toLowerCase().replace(/\s+/g, "-");
  return effort ? `${base}-${effort}` : base;
}

class RetryableError extends Error {}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch a datasets-server URL with exponential backoff on retryable statuses.
 *
 * Retryable: 429 (rate limited) and 5xx (transient server error). Non-retryable 4xx
 * (e.g. 422 — the dataset config/split changed) fail immediately so a permanently
 * broken query does not burn the whole backoff window.
 */
async function fetchJsonWithRetry(
  url: string,
  label: string
): Promise<z.infer<typeof HfPageSchema>> {
  const { maxAttempts, baseDelayMs, maxDelayMs } = HF_RETRY_CONFIG;
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (response.status >= 500 || response.status === 429) {
        throw new RetryableError(`HF datasets-server "${label}" [${response.status}]`);
      }
      if (!response.ok) {
        throw new Error(`HF datasets-server "${label}" [${response.status}]`);
      }
      return HfPageSchema.parse(await response.json());
    } catch (err) {
      lastError = err;
      const retryable = err instanceof RetryableError || err instanceof TypeError;
      if (!retryable || attempt === maxAttempts) break;
      const delay = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs);
      await sleep(delay);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

/** Build the `/filter` URL for a category page. */
function filterUrl(category: string, offset: number): string {
  const where = encodeURIComponent(`"category"='${category}'`);
  return (
    `${HF_FILTER_URL}?dataset=${encodeURIComponent(HF_DATASET)}&config=text&split=latest` +
    `&where=${where}&offset=${offset}&length=${PAGE_LENGTH}`
  );
}

/** Build the `/rows` URL for a page (full-table pagination, no server filter). */
function rowsUrl(offset: number): string {
  return (
    `${HF_ROWS_URL}?dataset=${encodeURIComponent(HF_DATASET)}&config=text&split=latest` +
    `&offset=${offset}&length=${PAGE_LENGTH}`
  );
}

async function fetchPage(category: string, offset: number): Promise<z.infer<typeof HfPageSchema>> {
  return fetchJsonWithRetry(filterUrl(category, offset), category);
}

function mapRowToModel(
  row: z.infer<typeof HfRowSchema>["row"],
  fallbackRank: number
): ArenaModelEntry {
  const lower = row.rating_lower ?? row.rating;
  const upper = row.rating_upper ?? row.rating;
  return {
    rank: row.rank ?? fallbackRank,
    model: slugifyArenaDisplayName(row.model_name),
    vendor: row.organization ?? "",
    score: row.rating,
    ci: (upper - lower) / 2,
    votes: row.vote_count ?? 0,
    license: row.license ?? "",
  };
}

/**
 * Fetch one category through `/filter` (server-side category filter).
 * Returns the mapped models or throws on total failure.
 */
async function fetchCategoryViaFilter(
  hfCategory: string
): Promise<{ models: ArenaModelEntry[]; datasetDate?: string }> {
  const models: ArenaModelEntry[] = [];
  let datasetDate: string | undefined;
  let total = Infinity;
  for (let page = 0; page < MAX_PAGES && models.length < total; page++) {
    const data = await fetchPage(hfCategory, page * PAGE_LENGTH);
    total = data.num_rows_total;
    if (data.rows.length === 0) break;
    for (const { row } of data.rows) {
      datasetDate ??= row.leaderboard_publish_date ?? undefined;
      models.push(mapRowToModel(row, models.length + 1));
    }
  }
  if (models.length === 0) throw new Error(`HF dataset returned no rows for "${hfCategory}"`);
  return { models, datasetDate };
}

/**
 * Fetch one category through `/rows` (stable full-table pagination, client-side filter).
 * Fallback used when `/filter` is rate-limited. Scans pages until the target category
 * is exhausted; caps the scan to avoid unbounded reads on a large dataset.
 */
async function fetchCategoryViaRows(
  hfCategory: string
): Promise<{ models: ArenaModelEntry[]; datasetDate?: string }> {
  const models: ArenaModelEntry[] = [];
  let datasetDate: string | undefined;
  let offset = 0;
  let total = Infinity;
  let pages = 0;
  const maxPages = MAX_PAGES * 4;
  while (offset < total && pages < maxPages) {
    const data = await fetchJsonWithRetry(rowsUrl(offset), `rows(${hfCategory})`);
    total = data.num_rows_total;
    if (data.rows.length === 0) break;
    for (const { row } of data.rows) {
      if (row.category === hfCategory) {
        datasetDate ??= row.leaderboard_publish_date ?? undefined;
        models.push(mapRowToModel(row, models.length + 1));
      }
    }
    offset += data.rows.length;
    pages++;
  }
  if (models.length === 0) {
    throw new Error(`HF /rows returned no "${hfCategory}" rows`);
  }
  return { models, datasetDate };
}

/**
 * Fetch a category with `/filter` first and `/rows` as the secondary fallback.
 */
async function fetchCategory(
  hfCategory: string,
  leaderboard: string
): Promise<ArenaLeaderboardMap[string]> {
  let result: { models: ArenaModelEntry[]; datasetDate?: string };
  try {
    result = await fetchCategoryViaFilter(hfCategory);
  } catch (filterErr) {
    // `/filter` is intermittently rate-limited (429/500) — fall through to `/rows`.
    console.warn(
      `[ARENA_ELO_SYNC] HF /filter failed for "${hfCategory}", trying /rows: ${filterErr instanceof Error ? filterErr.message : String(filterErr)}`
    );
    result = await fetchCategoryViaRows(hfCategory);
  }
  return {
    meta: {
      leaderboard,
      model_count: result.models.length,
      dataset_date: result.datasetDate ?? null,
    },
    models: result.models,
  };
}

/**
 * Fetch the Arena leaderboards from the Hugging Face dataset. Throws when no
 * category produced any model.
 */
export async function fetchHuggingFaceLeaderboards(): Promise<ArenaLeaderboardMap> {
  const result: ArenaLeaderboardMap = {};
  const errors: string[] = [];
  await Promise.all(
    Object.entries(HF_CATEGORY_MAP).map(async ([hfCategory, leaderboard]) => {
      try {
        const board = await fetchCategory(hfCategory, leaderboard);
        if (board.models.length > 0) result[leaderboard] = board;
        else errors.push(`HF dataset returned no rows for "${hfCategory}"`);
      } catch (err) {
        errors.push(err instanceof Error ? err.message : String(err));
      }
    })
  );
  if (Object.keys(result).length === 0) {
    throw new Error(`Hugging Face fallback failed: ${errors.join("; ")}`);
  }
  return result;
}
