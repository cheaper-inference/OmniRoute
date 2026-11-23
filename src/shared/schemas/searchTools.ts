// src/shared/schemas/searchTools.ts
import { z } from "zod";

/** Item exposed by /api/search/providers (extended in F4). */
export const SearchProviderCatalogItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** "search" for the 20 search providers; "fetch" for firecrawl/jina-reader/tavily-search/tinyfish/nimble-search/anysearch-search. */
  kind: z.enum(["search", "fetch"]),
  costPerQuery: z.number().nonnegative(),
  freeMonthlyQuota: z.number().int().nonnegative(),
  searchTypes: z.array(z.string()).optional(), // search only
  fetchFormats: z.array(z.string()).optional(), // fetch only
  /** "configured" = creds present; "missing" = no creds; "rate_limited" = all keys in cooldown. */
  status: z.enum(["configured", "missing", "rate_limited"]),
  /** Link to configure the provider. */
  configureHref: z.string().default("/dashboard/providers"),
});
export type SearchProviderCatalogItem = z.infer<typeof SearchProviderCatalogItemSchema>;

export const SearchProviderCatalogResponseSchema = z.object({
  providers: z.array(SearchProviderCatalogItemSchema),
});

/** ScrapeResult shown in the Scrape tab (already the /v1/web/fetch response, but typed). */
export const ScrapeResultSchema = z.object({
  provider: z.string(),
  url: z.string(),
  content: z.string(),
  links: z.array(z.string()),
  metadata: z
    .object({
      title: z.string().nullable(),
      description: z.string().nullable(),
    })
    .nullable(),
  screenshot_url: z.string().nullable(),
});
export type ScrapeResult = z.infer<typeof ScrapeResultSchema>;
