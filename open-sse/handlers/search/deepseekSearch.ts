import { z } from "zod";
import { DEEPSEEK_SEARCH_URL } from "../../config/deepseekSearch.ts";
import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";

interface DeepSeekSearchParams {
  query: string;
  maxResults: number;
  token?: string;
  searchType?: string;
  country?: string;
  language?: string;
  timeRange?: string;
  offset?: number;
  domainFilter?: string[];
  contentOptions?: { full_page?: boolean; max_characters?: number };
  providerOptions?: Record<string, unknown>;
}

const shortText = z
  .string()
  .trim()
  .min(1)
  .refine((s) => Array.from(s).length <= 128);
const optionsSchema = z.object({
  need_content: z.boolean().optional(),
  ori_question: shortText.optional(),
  localization: z.union([z.ipv4(), z.ipv6()]).optional(),
});

function domainOperator(value: string): string {
  const excluded = value.startsWith("-");
  const domain = excluded ? value.slice(1) : value;
  if (!/^[a-z0-9.-]+(?::[0-9]+)?$/i.test(domain) || !domain.includes(".")) {
    throw new Error("DeepSeek Search domain filters must be hostnames");
  }
  return `${excluded ? "-site:" : "site:"}${domain}`;
}

/** DeepSeek accepts dates, not an hourly time window. Preserve user operators verbatim. */
export function deepseekAfterDate(range: string, now = new Date()): string {
  const date = new Date(now);
  if (range === "day" || range === "week") {
    date.setUTCDate(date.getUTCDate() - (range === "day" ? 1 : 7));
  } else if (range === "month" || range === "year") {
    const day = date.getUTCDate();
    date.setUTCDate(1);
    if (range === "month") date.setUTCMonth(date.getUTCMonth() - 1);
    else date.setUTCFullYear(date.getUTCFullYear() - 1);
    const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
    date.setUTCDate(Math.min(day, last));
  } else throw new Error("DeepSeek Search does not support this time_range");
  return date.toISOString().slice(0, 10);
}

export function buildDeepSeekSearchRequest(
  _config: SearchProviderConfig,
  params: DeepSeekSearchParams
): { url: string; init: RequestInit } {
  if (!params.token) throw new Error("DeepSeek Search requires an API key");
  if (params.searchType && params.searchType !== "web") {
    throw new Error('DeepSeek Search supports only search_type "web"');
  }
  if (params.country || (params.offset ?? 0) !== 0) {
    throw new Error(
      "DeepSeek Search does not support country or offset; use localization for an IP"
    );
  }
  if (params.contentOptions?.max_characters !== undefined) {
    throw new Error("DeepSeek Search does not support content_options.max_characters");
  }
  const parsed = optionsSchema.safeParse(params.providerOptions ?? {});
  if (!parsed.success) throw new Error("Invalid DeepSeek Search provider_options");
  const options = parsed.data;
  const includes = (params.domainFilter ?? []).filter((s) => !s.startsWith("-"));
  const excludes = (params.domainFilter ?? []).filter((s) => s.startsWith("-"));
  const parts = [params.query.trim()];
  if (includes.length) parts.push(includes.map(domainOperator).join(" OR "));
  parts.push(...excludes.map(domainOperator));
  if (params.language) {
    if (!/^[a-z]{2,3}(?:-[a-z]{2})?$/i.test(params.language)) {
      throw new Error("Invalid DeepSeek Search language");
    }
    parts.push(`lang:${params.language}`);
  }
  if (params.timeRange && params.timeRange !== "any") {
    parts.push(`after:${deepseekAfterDate(params.timeRange)}`);
  }
  const query = parts.join(" ");
  if (!shortText.safeParse(query).success) {
    throw new Error(
      "DeepSeek Search query including filters must contain 1 to 128 Unicode characters"
    );
  }
  return {
    url: DEEPSEEK_SEARCH_URL,
    init: {
      method: "POST",
      redirect: "error",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      body: JSON.stringify({
        query,
        count: Math.min(50, Math.max(1, Math.trunc(params.maxResults) || 1)),
        need_content: options.need_content ?? params.contentOptions?.full_page ?? false,
        ...(options.ori_question ? { ori_question: options.ori_question } : {}),
        ...(options.localization ? { localization: options.localization } : {}),
      }),
    },
  };
}

const responseSchema = z.object({
  results: z.array(
    z.object({
      title: z.string(),
      url: z
        .string()
        .url()
        .refine((s) => /^https?:\/\//i.test(s)),
      snippet: z.string().optional(),
      summary: z.string().optional(),
      content: z.string().optional(),
      rerank_score: z.number().min(0).max(3).optional(),
      authority: z.number().int().min(-1).max(4).optional(),
      site_name: z.string().nullable().optional(),
      site_icon: z.string().nullable().optional(),
      date: z.string().nullable().optional(),
    })
  ),
});

type MakeResult = (
  provider: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    score?: number;
    full_text?: string;
    text_format?: string;
    published_at?: string;
    favicon_url?: string;
    provider_raw?: Record<string, unknown>;
  },
  index: number,
  now: string
) => SearchResult;

export function normalizeDeepSeekSearchResponse(data: unknown, makeResult: MakeResult) {
  const parsed = responseSchema.safeParse(data);
  if (!parsed.success) throw new Error("DeepSeek Search returned an invalid response");
  const now = new Date().toISOString();
  const results = parsed.data.results.map((item, index) =>
    makeResult(
      "deepseek-search",
      {
        title: item.title,
        url: item.url,
        snippet: item.snippet || item.summary,
        full_text: item.content,
        text_format: "text",
        published_at: item.date ?? undefined,
        favicon_url: item.site_icon ?? undefined,
        score: item.rerank_score === undefined ? undefined : item.rerank_score / 3,
        provider_raw: {
          rerank_score: item.rerank_score,
          authority: item.authority,
          site_name: item.site_name,
          summary: item.summary,
        },
      },
      index,
      now
    )
  );
  return { results, totalResults: results.length };
}
