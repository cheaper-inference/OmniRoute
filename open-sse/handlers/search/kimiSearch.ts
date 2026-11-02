import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

export interface KimiSearchParams {
  query: string;
  maxResults: number;
  token?: string;
}

export type KimiNormalizedHit = {
  title?: string;
  url?: string;
  snippet?: string;
  published_at?: string;
  full_text?: string;
  text_format?: string;
};

interface KimiSearchItem {
  title?: string;
  url?: string;
  snippet?: string;
  text?: string;
  date?: string;
}

export interface KimiSearchEnvelope {
  search_results?: KimiSearchItem[];
}

export function buildKimiSearchRequest(
  config: SearchProviderConfig,
  params: KimiSearchParams
): { url: string; init: RequestInit } {
  if (!params.token) throw new Error("Kimi Search requires an API key");
  const body: Record<string, unknown> = {
    text_query: params.query,
    limit: Math.min(params.maxResults, config.maxMaxResults),
    include_content: true,
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

export function normalizeKimiSearchResponse<T>(
  data: unknown,
  makeResult: (providerId: string, item: KimiNormalizedHit, idx: number, now: string) => T
): { results: T[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const envelope = (data ?? {}) as KimiSearchEnvelope;
  if (!Array.isArray(envelope.search_results)) return { results: [], totalResults: null };
  const results = envelope.search_results.map((item, idx) =>
    makeResult(
      "kimi-search",
      {
        title: item.title,
        url: item.url,
        snippet: item.snippet || "",
        published_at: item.date,
        full_text: item.text || undefined,
        text_format: "text",
      },
      idx,
      now
    )
  );
  return { results, totalResults: results.length };
}
