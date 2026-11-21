import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

export interface DeepseekSearchParams {
  query: string;
  maxResults: number;
  token?: string;
}

export type DeepseekNormalizedHit = {
  title?: string;
  url?: string;
  snippet?: string;
  published_at?: string;
};

interface DeepseekSearchItem {
  title?: string;
  url?: string;
  snippet?: string;
  summary?: string;
  date?: string | null;
}

export interface DeepseekSearchEnvelope {
  results?: DeepseekSearchItem[];
}

const QUERY_MAX_CHARS = 128;

export function buildDeepseekSearchRequest(
  config: SearchProviderConfig,
  params: DeepseekSearchParams
): { url: string; init: RequestInit } {
  if (!params.token) throw new Error("DeepSeek Search requires an API key");
  const query = params.query.trim();
  if (query.length === 0 || query.length > QUERY_MAX_CHARS) {
    throw new Error(`DeepSeek Search query must be 1 to ${QUERY_MAX_CHARS} characters`);
  }
  const body: Record<string, unknown> = {
    query,
    count: Math.max(1, Math.min(params.maxResults, config.maxMaxResults)),
  };
  return {
    url: config.baseUrl,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      body: JSON.stringify(body),
    },
  };
}

export function normalizeDeepseekSearchResponse<T>(
  data: unknown,
  makeResult: (providerId: string, item: DeepseekNormalizedHit, idx: number, now: string) => T
): { results: T[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const envelope = (data ?? {}) as DeepseekSearchEnvelope;
  if (!Array.isArray(envelope.results)) return { results: [], totalResults: null };
  const results = envelope.results.map((item, idx) =>
    makeResult(
      "deepseek-search",
      {
        title: item.title,
        url: item.url,
        // summary is the long form meant for a model; snippet is the short UI form.
        snippet: item.summary || item.snippet || "",
        published_at: item.date ?? undefined,
      },
      idx,
      now
    )
  );
  return { results, totalResults: results.length };
}
