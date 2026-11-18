/**
 * Keenable Search (https://keenable.ai) for the unified search gateway.
 *
 * Keyless by default: POST https://api.keenable.ai/v1/search/public. With a
 * configured key the same body goes to POST /v1/search with an `X-API-Key`
 * header; the key only lifts the keyless per-IP rate limits. Every call names
 * OmniRoute in `X-Keenable-Title` (required on the keyless endpoint).
 *
 * Request: `query`, `max_results` (1-50), optional `site` (one domain) and
 * `published_after` (YYYY-MM-DD). Response: `results[]` with `title`, `url` and
 * `snippet` (page text). `description` is returned empty, so the result text is
 * read from `snippet`.
 *
 * The key only ever goes to the fixed Keenable host: no base URL override is
 * honored, and redirects are refused (`redirect: "error"`).
 */

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import { KEENABLE_APP_TITLE, KEENABLE_TITLE_HEADER } from "../../config/keenable.ts";
import type { SearchResult } from "../search.ts";
import { parallelAfterDate } from "./parallelSearch.ts";

const KEENABLE_SEARCH_PROVIDER_ID = "keenable-search";
const MAX_RESULTS = 50;
const SNIPPET_MAX_CHARS = 300;

interface KeenableSearchParams {
  query: string;
  searchType?: string;
  maxResults: number;
  token?: string;
  timeRange?: string;
  domainFilter?: string[];
  /** Accepted for builder-signature compatibility; Keenable has no equivalent. */
  country?: string;
  language?: string;
  offset?: number;
  providerOptions?: Record<string, unknown>;
  providerSpecificData?: Record<string, unknown>;
}

type MakeResult = (
  providerId: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    full_text?: string;
    text_format?: string;
  },
  index: number,
  now: string
) => SearchResult;

/** Keenable takes a single `site`; a lone include domain maps to it, anything else is not sent. */
function singleIncludeDomain(domainFilter: string[] | undefined): string | undefined {
  const includes = (domainFilter ?? []).filter((d) => !d.startsWith("-"));
  if (includes.length !== 1) return undefined;
  const host = includes[0]
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "");
  return host || undefined;
}

export function buildKeenableSearchRequest(
  config: SearchProviderConfig,
  params: KeenableSearchParams
): { url: string; init: RequestInit } {
  if (params.searchType && params.searchType !== "web") {
    throw new Error('Keenable Search supports only search_type "web"');
  }
  const body: Record<string, unknown> = {
    query: params.query,
    max_results: Math.min(Math.max(Math.trunc(params.maxResults) || 1, 1), MAX_RESULTS),
  };
  const site = singleIncludeDomain(params.domainFilter);
  if (site) body.site = site;
  // Same calendar-day mapping as Parallel's after_date (YYYY-MM-DD, UTC).
  const publishedAfter = parallelAfterDate(params.timeRange);
  if (publishedAfter) body.published_after = publishedAfter;

  return {
    // Always the registry endpoint: a configured key never follows a caller- or
    // connection-supplied base URL. No key → the keyless /public endpoint.
    url: params.token ? config.baseUrl : `${config.baseUrl}/public`,
    init: {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        [KEENABLE_TITLE_HEADER]: KEENABLE_APP_TITLE,
        ...(params.token ? { "X-API-Key": params.token } : {}),
      },
      body: JSON.stringify(body),
    },
  };
}

interface KeenableSearchItem {
  url?: unknown;
  title?: unknown;
  description?: unknown;
  snippet?: unknown;
}

const nonEmptyString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

export function normalizeKeenableSearchResponse(
  data: unknown,
  makeResult: MakeResult
): { results: SearchResult[]; totalResults: number | null } {
  const rows = (data as { results?: unknown } | null)?.results;
  if (!Array.isArray(rows)) return { results: [], totalResults: null };
  const now = new Date().toISOString();
  const items = rows.filter(
    (row): row is KeenableSearchItem & { url: string } =>
      !!row && typeof row === "object" && !Array.isArray(row) && !!nonEmptyString(row.url)
  );
  const results = items.map((item, idx) => {
    const text = nonEmptyString(item.snippet);
    const summary =
      nonEmptyString(item.description) ??
      text?.replace(/\s+/g, " ").trim().slice(0, SNIPPET_MAX_CHARS) ??
      "";
    return makeResult(
      KEENABLE_SEARCH_PROVIDER_ID,
      {
        title: nonEmptyString(item.title) ?? item.url,
        url: item.url,
        snippet: summary,
        full_text: text,
        text_format: "text",
      },
      idx,
      now
    );
  });
  return { results, totalResults: results.length };
}
