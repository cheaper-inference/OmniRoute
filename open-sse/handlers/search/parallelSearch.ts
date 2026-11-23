/**
 * Parallel Search (https://parallel.ai) for the unified search gateway.
 *
 * POST https://api.parallel.ai/v1/search with an `x-api-key` header. Request:
 * `search_queries` + optional `objective`, a processor `mode`
 * (turbo | fast | basic | advanced) and `advanced_settings` (result count,
 * source policy, excerpt budget, location). Response: `results[]` with `url`,
 * `title`, `publish_date` and markdown `excerpts`.
 *
 * The operator's key only ever goes to the registry URL: no base URL override is
 * honored, and redirects are refused (`redirect: "error"`) so a 3xx can never
 * carry the key to another host.
 */

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";

const PARALLEL_SEARCH_PROVIDER_ID = "parallel-search";

const PARALLEL_MODES = new Set(["turbo", "fast", "basic", "advanced"]);
const DEFAULT_MODE = "fast";
const MAX_RESULTS = 20;
/** Queries longer than this become the `objective`; a shortened copy is the search query. */
const SEARCH_QUERY_MAX_CHARS = 200;
const OBJECTIVE_MAX_CHARS = 5000;
const SESSION_ID_MAX_CHARS = 1000;

interface ParallelSearchParams {
  query: string;
  searchType?: string;
  maxResults: number;
  token?: string;
  country?: string;
  timeRange?: string;
  domainFilter?: string[];
  contentOptions?: { max_characters?: number };
  providerOptions?: Record<string, unknown>;
  providerSpecificData?: Record<string, unknown>;
  /** Accepted for builder-signature compatibility; Parallel has no equivalent. */
  language?: string;
  offset?: number;
}

type MakeResult = (
  providerId: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    published_at?: string;
    full_text?: string;
    text_format?: string;
  },
  index: number,
  now: string
) => SearchResult;

function readSetting(params: ParallelSearchParams, key: string): string | undefined {
  for (const source of [params.providerOptions, params.providerSpecificData]) {
    const value = source?.[key];
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

/** The mode a request will run in: a known `provider_options.mode`, else "fast". */
function resolveParallelMode(params: ParallelSearchParams): string {
  const requested = readSetting(params, "mode");
  return requested && PARALLEL_MODES.has(requested) ? requested : DEFAULT_MODE;
}

/**
 * Map an OmniRoute `time_range` onto Parallel's `source_policy.after_date`
 * (YYYY-MM-DD, UTC). Parallel filters by calendar day, so "hour" uses the
 * previous day. Month/year subtraction clamps to the target month's last day
 * (Mar 31 − 1 month = Feb 28/29).
 */
export function parallelAfterDate(
  timeRange: string | undefined,
  now: Date = new Date()
): string | undefined {
  if (!timeRange || timeRange === "any") return undefined;
  const from = new Date(now.getTime());
  if (timeRange === "hour" || timeRange === "day") {
    from.setUTCDate(from.getUTCDate() - 1);
  } else if (timeRange === "week") {
    from.setUTCDate(from.getUTCDate() - 7);
  } else if (timeRange === "month" || timeRange === "year") {
    const day = from.getUTCDate();
    from.setUTCDate(1);
    if (timeRange === "month") from.setUTCMonth(from.getUTCMonth() - 1);
    else from.setUTCFullYear(from.getUTCFullYear() - 1);
    const lastDay = new Date(
      Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + 1, 0)
    ).getUTCDate();
    from.setUTCDate(Math.min(day, lastDay));
  } else {
    return undefined;
  }
  return from.toISOString().slice(0, 10);
}

/** `https://example.com:443/docs/` → `example.com/docs` (Parallel takes host + optional path prefix). */
function toParallelDomain(entry: string): string {
  let parsed: URL;
  try {
    parsed = new URL(`https://${entry.trim().replace(/^https?:\/\//i, "")}`);
  } catch {
    throw new Error("Invalid Parallel domain filter");
  }
  if (!parsed.hostname) throw new Error("Invalid Parallel domain filter");
  return `${parsed.hostname}${parsed.pathname.replace(/\/+$/, "")}`;
}

/** Cut a long query at the last word boundary within the search-query limit. */
function shortenQuery(query: string): string {
  if (query.length <= SEARCH_QUERY_MAX_CHARS) return query;
  const head = query.slice(0, SEARCH_QUERY_MAX_CHARS);
  if (/\s/.test(query.charAt(SEARCH_QUERY_MAX_CHARS))) return head.trim();
  const lastSpace = head.lastIndexOf(" ");
  return lastSpace > 0 ? head.slice(0, lastSpace).trim() : head;
}

function buildSourcePolicy(
  params: ParallelSearchParams,
  mode: string
): Record<string, unknown> | undefined {
  const filters = params.domainFilter ?? [];
  const includes = filters.filter((d) => !d.startsWith("-")).map(toParallelDomain);
  const excludes = filters
    .filter((d) => d.startsWith("-"))
    .map((d) => toParallelDomain(d.slice(1)));
  if (mode === "turbo" && [...includes, ...excludes].some((d) => d.includes("/"))) {
    throw new Error("Parallel turbo mode does not support path-prefix domain filters");
  }
  const afterDate = parallelAfterDate(params.timeRange);
  const policy: Record<string, unknown> = {
    ...(includes.length ? { include_domains: includes } : {}),
    ...(excludes.length ? { exclude_domains: excludes } : {}),
    ...(afterDate ? { after_date: afterDate } : {}),
  };
  return Object.keys(policy).length ? policy : undefined;
}

export function buildParallelSearchRequest(
  config: SearchProviderConfig,
  params: ParallelSearchParams
): { url: string; init: RequestInit } {
  if (!params.token) throw new Error("Parallel Search requires an API key");
  if (params.searchType && params.searchType !== "web") {
    throw new Error('Parallel Search supports only search_type "web"');
  }
  const mode = resolveParallelMode(params);
  const objective =
    readSetting(params, "objective") ??
    (params.query.length > SEARCH_QUERY_MAX_CHARS ? params.query : undefined);
  if (objective && objective.length > OBJECTIVE_MAX_CHARS) {
    throw new Error(`Parallel objective must not exceed ${OBJECTIVE_MAX_CHARS} characters`);
  }
  const sessionId = readSetting(params, "session_id");
  if (sessionId && sessionId.length > SESSION_ID_MAX_CHARS) {
    throw new Error(`Parallel session_id must not exceed ${SESSION_ID_MAX_CHARS} characters`);
  }

  const advanced: Record<string, unknown> = {
    max_results: Math.min(Math.max(Math.trunc(params.maxResults) || 1, 1), MAX_RESULTS),
  };
  const sourcePolicy = buildSourcePolicy(params, mode);
  if (sourcePolicy) advanced.source_policy = sourcePolicy;
  const maxChars = params.contentOptions?.max_characters;
  if (maxChars !== undefined) {
    if (!Number.isInteger(maxChars) || maxChars < 1) {
      throw new Error("Parallel max_characters must be a positive integer");
    }
    advanced.excerpt_settings = { max_chars_per_result: maxChars };
  }
  if (params.country) {
    const location = params.country.toLowerCase();
    advanced.location = location === "uk" ? "gb" : location;
  }

  const body: Record<string, unknown> = {
    search_queries: [shortenQuery(params.query)],
    ...(objective ? { objective } : {}),
    mode,
    advanced_settings: advanced,
    ...(sessionId ? { session_id: sessionId } : {}),
  };

  return {
    // Always the registry endpoint: the operator key never follows a caller- or
    // connection-supplied base URL.
    url: config.baseUrl,
    init: {
      method: "POST",
      redirect: "error",
      headers: { "Content-Type": "application/json", "x-api-key": params.token },
      body: JSON.stringify(body),
    },
  };
}

interface ParallelSearchItem {
  url?: unknown;
  title?: unknown;
  publish_date?: unknown;
  excerpts?: unknown;
}

function nonEmptyExcerpts(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((e): e is string => typeof e === "string" && e.trim().length > 0);
}

const optionalString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

export function normalizeParallelSearchResponse(
  data: unknown,
  makeResult: MakeResult
): { results: SearchResult[]; totalResults: number | null } {
  const rows = (data as { results?: unknown } | null)?.results;
  if (!Array.isArray(rows)) return { results: [], totalResults: null };
  const now = new Date().toISOString();
  const items = rows.filter(
    (row): row is ParallelSearchItem => !!row && typeof row === "object" && !Array.isArray(row)
  );
  const results = items.map((item, idx) => {
    const excerpts = nonEmptyExcerpts(item.excerpts);
    return makeResult(
      PARALLEL_SEARCH_PROVIDER_ID,
      {
        title: optionalString(item.title),
        url: optionalString(item.url),
        snippet: excerpts[0] || "",
        published_at: optionalString(item.publish_date),
        full_text: excerpts.join("\n\n"),
        text_format: "markdown",
      },
      idx,
      now
    );
  });
  return { results, totalResults: results.length };
}
