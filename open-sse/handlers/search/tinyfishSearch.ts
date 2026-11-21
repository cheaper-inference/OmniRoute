/**
 * TinyFish Search (https://docs.tinyfish.ai/search-api) for the unified search gateway.
 *
 * GET https://api.search.tinyfish.ai with the key in the `X-API-Key` header. Parameters used:
 * `query`, `domain_type` (`web` or `news`), `after_date` (YYYY-MM-DD) and the include/exclude
 * domain lists. Results: `results[]` with `title`, `url`, `snippet`, and `date` / `publisher`
 * on news results.
 *
 * The key only goes to the fixed TinyFish host: no base URL override is honored, and redirects
 * are refused (`redirect: "error"`).
 */

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";
import { parallelAfterDate } from "./parallelSearch.ts";

export const TINYFISH_SEARCH_PROVIDER_ID = "tinyfish";
const SNIPPET_MAX_CHARS = 300;

interface TinyFishSearchParams {
  query: string;
  searchType?: string;
  maxResults: number;
  token?: string;
  timeRange?: string;
  domainFilter?: string[];
  /** Accepted for builder-signature compatibility; the first slice does not send it. */
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
    published_at?: string | null;
    author?: string | null;
    full_text?: string;
    text_format?: string;
  },
  index: number,
  now: string
) => SearchResult;

const nonEmptyString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

export function buildTinyFishSearchRequest(
  config: SearchProviderConfig,
  params: TinyFishSearchParams
): { url: string; init: RequestInit } {
  const domainType = params.searchType === "news" ? "news" : "web";
  const url = new URL(config.baseUrl);
  url.searchParams.set("query", params.query);
  url.searchParams.set("domain_type", domainType);

  const includes = (params.domainFilter ?? []).filter((d) => !d.startsWith("-"));
  const excludes = (params.domainFilter ?? [])
    .filter((d) => d.startsWith("-"))
    .map((d) => d.slice(1));
  if (includes.length > 0) url.searchParams.set("include_domains", includes.join(","));
  if (excludes.length > 0) url.searchParams.set("exclude_domains", excludes.join(","));

  // Same calendar-day mapping as Parallel's after_date (YYYY-MM-DD, UTC).
  const afterDate = parallelAfterDate(params.timeRange);
  if (afterDate) url.searchParams.set("after_date", afterDate);

  return {
    url: url.toString(),
    init: {
      method: "GET",
      redirect: "error",
      headers: params.token ? { "x-api-key": params.token } : {},
    },
  };
}

interface TinyFishSearchItem {
  url?: unknown;
  title?: unknown;
  snippet?: unknown;
  date?: unknown;
  publisher?: unknown;
}

export function normalizeTinyFishSearchResponse(
  data: unknown,
  makeResult: MakeResult
): { results: SearchResult[]; totalResults: number | null } {
  const rows = (data as { results?: unknown } | null)?.results;
  if (!Array.isArray(rows)) return { results: [], totalResults: null };
  const now = new Date().toISOString();
  const items = rows.filter(
    (row): row is TinyFishSearchItem & { url: string } =>
      !!row && typeof row === "object" && !Array.isArray(row) && !!nonEmptyString(row.url)
  );
  const results = items.map((item, idx) => {
    const text = nonEmptyString(item.snippet);
    const summary = text?.replace(/\s+/g, " ").trim().slice(0, SNIPPET_MAX_CHARS) ?? "";
    return makeResult(
      TINYFISH_SEARCH_PROVIDER_ID,
      {
        title: nonEmptyString(item.title) ?? item.url,
        url: item.url,
        snippet: summary,
        // The shared result shape stores the date as published_at and the publisher as author.
        published_at: nonEmptyString(item.date),
        author: nonEmptyString(item.publisher),
        full_text: text,
        text_format: "text",
      },
      idx,
      now
    );
  });
  return { results, totalResults: results.length };
}
