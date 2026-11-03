import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";
import { WEB_FETCH_PROVIDERS } from "@omniroute/open-sse/config/webFetchProviders.ts";

export interface WebComboTarget {
  id: "web" | "fetch";
  name: string;
  apiFormat: "search" | "web-fetch";
  supportedEndpoints: Array<"search" | "web-fetch">;
}

/** Operation targets belong to combo pickers, not the chat model catalog. */
export function getWebComboTargets(providerId: string): WebComboTarget[] {
  const search =
    Object.hasOwn(SEARCH_PROVIDERS, providerId) && !SEARCH_PROVIDERS[providerId].disabled;
  const fetch = (WEB_FETCH_PROVIDERS as readonly string[]).includes(providerId);
  if (!search && !fetch) return [];
  return [
    {
      id: search ? "web" : "fetch",
      name: search ? (fetch ? "Web search / Page extraction" : "Web search") : "Page extraction",
      apiFormat: search ? "search" : "web-fetch",
      supportedEndpoints: [
        ...(search ? ["search" as const] : []),
        ...(fetch ? ["web-fetch" as const] : []),
      ],
    },
  ];
}
