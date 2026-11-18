/** Runtime executor inventory, shared by fetch dispatch and combo capability filtering. */
export const WEB_FETCH_PROVIDERS = Object.freeze([
  "firecrawl",
  "jina-reader",
  "tavily-search",
  "tinyfish",
  "anysearch-search",
  "context7",
  "nimble-search",
  "parallel-search",
  "keenable-search",
] as const);

export type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];
