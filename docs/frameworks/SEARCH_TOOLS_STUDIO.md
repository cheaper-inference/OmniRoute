---
title: "Search Tools Studio"
version: 3.8.53
lastUpdated: 2026-10-21
---

# Search Tools Studio

> **Feature:** Search Tools Studio — unified web tools workspace for `/dashboard/search-tools`.
> **Plans:** `18-search-tools-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Released in v3.8.6

---

## Overview

Search Tools Studio transforms `/dashboard/search-tools` from a basic search playground into a
three-tab Studio unifying web search, web scraping, and side-by-side provider comparison.

```
┌ Search Tools ──────────────────────────────────────────────────────────┐
│ [🔍 Search] [📄 Scrape] [⚖ Compare]             142ms · $0.001  </>    │
│ ⓘ [Modalities guide]                                                    │
├──────────────────────────────────────────┬─────────────────────────────┤
│  {active tab content}                    │ ─ Config                    │
│                                          │ Provider [auto ∨]           │
│                                          │   🟢 Serper  $0.001         │
│                                          │   🟢 Tavily  $0.008         │
│                                          │   🔥 Firecrawl (fetch)      │
│                                          │ Type   [web | news]         │
│                                          │ Full page [ ] (scrape)      │
│                                          │ Format [md|text|html]       │
│                                          │ Rerank model [∨]            │
└──────────────────────────────────────────┴─────────────────────────────┘
```

---

## Tabs

### Search Tab

Evolves the existing `SearchForm` + `ResultsPanel` + `RerankPanel` into a tab:

- Query → results (title, URL, snippet, relevance score).
- Provider metadata in Config pane (cost, quota, status).
- Rerank section: pick a rerank model, reorder results, show `positionDelta`.
- Empty state with CTA when no search providers are configured.
- Search history via `SearchHistory.tsx`.
- Calls `POST /v1/search` (existing endpoint, no changes).

### Scrape Tab

New tab for extracting content from a URL via `POST /v1/web/fetch` (created in plan 05):

- Input: URL + full-page toggle + format selector (markdown / text / HTML).
- Submit → fetch → render `ScrapeResult.tsx`.
- `ScrapeResult` renders markdown preview + raw toggle.
- Cap: if response body > **256 KB**, UI shows `(truncated, view raw)` and opens raw in a Monaco modal (D21).
- Metadata panel: provider (firecrawl/jina-reader/tavily-search/tinyfish/nimble-search/anysearch-search/parallel-search), latency, cost, response size, links count.
- Uses `useScrapeFetch.ts` hook.

### Compare Tab

Runs the same query/URL across up to **4 providers in parallel** (D22):

- Side-by-side columns per provider.
- Metrics: latency, cost, result count, response size.
- URL overlap calculation for search (number of shared URLs vs initial result).
- Calls `POST /v1/search` (search) or `POST /v1/web/fetch` (scrape) per provider.

---

## Config Pane (Shared)

`SearchToolsConfigPane.tsx` — always visible, collapsible.

| Field        | Notes                                                            |
| ------------ | ---------------------------------------------------------------- |
| Provider     | Dropdown with status badge (configured / missing / rate limited) |
| Type         | `web` or `news` (search only)                                    |
| Full page    | Toggle for scrape — fetches entire page vs first visible content |
| Format       | `markdown`, `text`, or `html` (scrape only)                      |
| Rerank model | Optional model for post-search reranking                         |
| History      | Collapsible search history section                               |

---

## SearchConceptCard

`SearchConceptCard.tsx` — always visible, collapsible accordion. Explains:

| Concept             | One-liner                                                            |
| ------------------- | -------------------------------------------------------------------- |
| **Search**          | Fetches a list of web results (title, URL, snippet, relevance score) |
| **Scrape**          | Extracts the full content of a URL (markdown, text or HTML)          |
| **Compare**         | Runs the same query in N providers side-by-side                      |
| **Rerank**          | Reorders results via LLM to improve query relevance                  |
| **Auto (cheapest)** | Picks the cheapest available provider automatically                  |

---

## Provider Catalog

### DeepSeek Search and Fetch

The **DeepSeek Search** card belongs under **Search Providers** at `/dashboard/providers`,
with both Search and Fetch capabilities. It uses the standalone DeepSeek tools APIs,
independently of the DeepSeek chat model. Add a DeepSeek API key to `deepseek-search`,
or let the search and fetch routes reuse an active `deepseek` chat connection. API-key
connection restrictions still apply to that fallback.

Use `provider: "deepseek-search"` with `POST /v1/search` or `POST /v1/web/fetch`
(also available through the existing MCP web tools). Search additionally accepts the
request alias `deepseek`. Search supports web results, 1–50 results, and queries of
1–128 Unicode characters including filters. `domain_filter`, `language`, and
day/week/month/year `time_range` map to query operators. Existing query operators are
preserved. `provider_options` supports `need_content`, `ori_question`, and IP-based
`localization`; `content_options.full_page` also enables `need_content`.

Country, pagination offset, hourly ranges, and `content_options.max_characters` are
rejected rather than silently ignored. Fetch accepts HTTP(S) URLs without embedded
credentials, returns Markdown only, caps returned content at 100,000 characters, and
does not support crawl depth or waiting for selectors. Both upstream endpoints are
fixed and redirects are disabled to protect the API key.

Each successful non-empty upstream request costs **$0.00075**, independent of result
count. Empty search results and failures cost zero; cached search responses do not
make another upstream call. This is standalone API pricing; the temporary free
server-side tools promotion in DeepSeek coding clients is a separate offer.
See the [official Search & Fetch guide](https://api-docs.deepseek.com/guides/search/).

### Catalog response

`ProviderCatalog.tsx` exposes the full provider list from `GET /api/search/providers`
(extended in F4 to include fetch providers):

| `kind` | `"search"` (20 providers) or `"fetch"` (firecrawl, jina-reader, tavily-search, tinyfish, nimble-search, anysearch-search, parallel-search) |

The status is **derived at request time** by checking whether credentials exist and whether
all keys are currently in cooldown.

---

## Export Code

`ExportCodeModal` (imported from Playground Studio) + `codeExport.ts` generate
curl / Python / TypeScript snippets for both `/v1/search` and `/v1/web/fetch` calls.
API key placeholder is always `$OMNIROUTE_API_KEY` (D11, shared with Playground Studio).

---

## Backend Changes

Only one backend change was needed for this feature:

### Extended `GET /api/search/providers`

`src/app/api/search/providers/route.ts` was extended to:

- Include every fetch provider (`firecrawl`, `jina-reader`, `tavily-search`, `tinyfish`, `nimble-search`, `anysearch-search`, `parallel-search`) in the array.
- Add `kind: "search" | "fetch"` to every item.
- Add `status: "configured" | "missing" | "rate_limited"` derived from live credential state.
- Maintain backward compatibility — existing fields (`id`, `name`, etc.) unchanged.

---

## Key Files

| Path                                                                              | Purpose                                           |
| --------------------------------------------------------------------------------- | ------------------------------------------------- |
| `src/app/(dashboard)/dashboard/search-tools/SearchToolsClient.tsx`                | Studio shell, tab orchestrator                    |
| `src/app/(dashboard)/dashboard/search-tools/components/SearchToolsTopBar.tsx`     | Tabs + metrics + export button                    |
| `src/app/(dashboard)/dashboard/search-tools/components/SearchToolsConfigPane.tsx` | Shared config panel                               |
| `src/app/(dashboard)/dashboard/search-tools/components/SearchConceptCard.tsx`     | Explainer cards (always visible)                  |
| `src/app/(dashboard)/dashboard/search-tools/components/ProviderCatalog.tsx`       | Provider list with metadata                       |
| `src/app/(dashboard)/dashboard/search-tools/components/ScrapeResult.tsx`          | Markdown preview + raw toggle                     |
| `src/app/(dashboard)/dashboard/search-tools/components/tabs/SearchTab.tsx`        | Search + rerank tab                               |
| `src/app/(dashboard)/dashboard/search-tools/components/tabs/ScrapeTab.tsx`        | Scrape tab                                        |
| `src/app/(dashboard)/dashboard/search-tools/components/tabs/CompareTab.tsx`       | Multi-provider compare tab                        |
| `src/app/(dashboard)/dashboard/search-tools/hooks/useScrapeFetch.ts`              | Scrape fetch hook                                 |
| `src/app/api/search/providers/route.ts`                                           | Extended with `kind` + `status` + fetch providers |
| `open-sse/config/searchRegistry.ts`                                               | Source of truth for search provider metadata      |

---

## Troubleshooting

| Symptom                                   | Cause                      | Fix                                                                             |
| ----------------------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| Scrape tab shows "endpoint not available" | `/v1/web/fetch` not wired  | Verify plan 05 is merged; check `src/app/api/v1/web/fetch/route.ts` exists      |
| Provider catalog shows all as "missing"   | Credentials not configured | Add credentials in `/dashboard/providers`                                       |
| Scrape content is truncated               | Response > 256 KB cap      | Expected behavior (D21). Use "view raw" button for full content                 |
| Compare tab only shows 2 providers        | Rate limit active          | Two or more providers may be in cooldown — check provider status in Config pane |
| "Size" shown as raw key in table          | Missing i18n key           | Verify `search.size` exists in the locale file; rebuild i18n                    |

---

## References

- Master plan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Feature plan: `_tasks/features-v3.8.6/refactorpages/18-search-tools-studio-redesign.plan.md`
- Search provider registry: `open-sse/config/searchRegistry.ts`
- Playground Studio (shared `ExportCodeModal` + `codeExport.ts`): `docs/frameworks/PLAYGROUND_STUDIO.md`
- Web fetch backend: `src/app/api/v1/web/fetch/route.ts`
