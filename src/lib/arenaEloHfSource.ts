/**
 * arenaEloHfSource.ts — fallback Arena ELO source (#17922).
 *
 * The primary scraper API (api.wulong.dev) went empty on 2026-10-08. This module reads
 * the official `lmarena-ai/leaderboard-dataset` (CC-BY-4.0) through the Hugging Face
 * datasets-server and maps it to the same `ArenaLeaderboardMap` shape the sync engine
 * already consumes ("overall" → `text`, "coding" → `code`).
 */

import { z } from "zod";

import type { ArenaLeaderboardMap, ArenaModelEntry } from "./arenaEloSync";

const HF_FILTER_URL = "https://datasets-server.huggingface.co/filter";
const HF_DATASET = "lmarena-ai/leaderboard-dataset";
const PAGE_LENGTH = 100;
const MAX_PAGES = 10;
const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 500;

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

async function fetchPage(category: string, offset: number): Promise<z.infer<typeof HfPageSchema>> {
  const where = encodeURIComponent(`"category"='${category}'`);
  const url =
    `${HF_FILTER_URL}?dataset=${encodeURIComponent(HF_DATASET)}&config=text&split=latest` +
    `&where=${where}&offset=${offset}&length=${PAGE_LENGTH}`;
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (response.status >= 500) {
        throw new RetryableError(`HF datasets-server "${category}" [${response.status}]`);
      }
      if (!response.ok) {
        throw new Error(`HF datasets-server "${category}" [${response.status}]`);
      }
      return HfPageSchema.parse(await response.json());
    } catch (err) {
      lastError = err;
      const retryable = err instanceof RetryableError || err instanceof TypeError;
      if (!retryable || attempt === MAX_ATTEMPTS) break;
      await sleep(RETRY_BASE_DELAY_MS * attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function fetchCategory(
  hfCategory: string,
  leaderboard: string
): Promise<ArenaLeaderboardMap[string]> {
  const models: ArenaModelEntry[] = [];
  let datasetDate: string | undefined;
  let total = Infinity;
  for (let page = 0; page < MAX_PAGES && models.length < total; page++) {
    const data = await fetchPage(hfCategory, page * PAGE_LENGTH);
    total = data.num_rows_total;
    if (data.rows.length === 0) break;
    for (const { row } of data.rows) {
      datasetDate ??= row.leaderboard_publish_date ?? undefined;
      const lower = row.rating_lower ?? row.rating;
      const upper = row.rating_upper ?? row.rating;
      models.push({
        rank: row.rank ?? models.length + 1,
        model: slugifyArenaDisplayName(row.model_name),
        vendor: row.organization ?? "",
        score: row.rating,
        ci: (upper - lower) / 2,
        votes: row.vote_count ?? 0,
        license: row.license ?? "",
      });
    }
  }
  return {
    meta: { leaderboard, model_count: models.length, dataset_date: datasetDate },
    models,
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
