/** Keyless Keenable web search integration for OmniRoute's /v1/search. */

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";

export const KEENABLE_SEARCH_PROVIDER_ID = "keenable-search";

type MakeResult = (
  providerId: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    published_at?: string;
    source_type?: string;
  },
  index: number,
  now: string
) => SearchResult;

export function buildKeenableSearchRequest(
  config: SearchProviderConfig,
  params: { query: string; maxResults: number }
): { url: string; init: RequestInit } {
  const maxResults = Math.min(50, Math.max(1, Math.trunc(params.maxResults) || 5));
  return {
    url: config.baseUrl,
    init: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Mandatory for anonymous requests to /v1/search/public.
        "X-Keenable-Title": "OmniRoute",
      },
      body: JSON.stringify({ query: params.query, max_results: maxResults }),
    },
  };
}

export function normalizeKeenableSearchResponse(
  data: unknown,
  makeResult: MakeResult,
  domainFilter?: string[]
): { results: SearchResult[]; totalResults: number | null } {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { results: [], totalResults: null };
  }
  const rows = (data as { results?: unknown }).results;
  if (!Array.isArray(rows)) return { results: [], totalResults: null };

  const now = new Date().toISOString();
  const results: SearchResult[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    const item = row as Record<string, unknown>;
    const url = typeof item.url === "string" ? item.url : "";
    if (!/^https?:\/\//i.test(url)) continue;
    const title = typeof item.title === "string" ? item.title : url;
    const snippet =
      typeof item.snippet === "string"
        ? item.snippet
        : typeof item.description === "string"
          ? item.description
          : "";
    results.push(
      makeResult(
        KEENABLE_SEARCH_PROVIDER_ID,
        {
          title,
          url,
          snippet,
          published_at: typeof item.published_at === "string" ? item.published_at : undefined,
          source_type: "web",
        },
        results.length,
        now
      )
    );
    if (results.length >= 50) break;
  }
  const filtered = applyKeenableDomainRestrictions(results, domainFilter);
  return { results: filtered, totalResults: filtered.length };
}

/**
 * Keenable's anonymous request envelope is {query, max_results} — the public
 * endpoint carries no include/exclude domain parameters, so filters requested
 * by a /v1/search caller are enforced on the normalized results. Client-side
 * enforcement guarantees adherence regardless of upstream support: a result
 * from a domain the caller excluded is never returned (CodeRabbit review,
 * PR #19028).
 */
export function applyKeenableDomainRestrictions(
  results: SearchResult[],
  domainFilter: string[] | undefined
): SearchResult[] {
  const includes: string[] = [];
  const excludes: string[] = [];
  for (const entry of domainFilter ?? []) {
    if (typeof entry !== "string") continue;
    const trimmed = entry.trim().toLowerCase();
    if (!trimmed) continue;
    if (trimmed.startsWith("-")) excludes.push(trimmed.slice(1));
    else includes.push(trimmed);
  }
  if (includes.length === 0 && excludes.length === 0) return results;

  const matchesDomain = (url: string, domain: string): boolean => {
    try {
      const host = new URL(url).hostname.toLowerCase();
      if (!host) return false;
      return host === domain || host.endsWith(`.${domain}`);
    } catch {
      return false;
    }
  };
  return results.filter(
    (item) =>
      (includes.length === 0 || includes.some((domain) => matchesDomain(item.url, domain))) &&
      !excludes.some((domain) => matchesDomain(item.url, domain))
  );
}
