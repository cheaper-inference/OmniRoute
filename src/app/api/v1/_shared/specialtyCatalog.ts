import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";

type UnifiedModelEntry = Record<string, unknown>;

function fallbackCatalogRequest(request: Request | undefined, pathname: string) {
  return request || new Request(`http://localhost${pathname}`);
}

// Last filtered body per route. The unified catalog is already filtered for the caller's
// API key, so its raw text is the whole cache key: same text, same filtered result. Auth
// runs inside getUnifiedModelsResponse on every call, before this memo is read.
// shortcut: one entry per pathname, so alternating API keys re-filter; add an LRU if that shows up.
const filteredBodies = new Map<string, { raw: string; body: string }>();

/** `pathname` names the route and therefore its predicate: one predicate per pathname. */
export async function getSpecialtyModelsResponse(
  request: Request | undefined,
  pathname: string,
  predicate: (model: UnifiedModelEntry) => boolean
) {
  const catalogResponse = await getUnifiedModelsResponse(fallbackCatalogRequest(request, pathname));
  if (!catalogResponse.ok) return catalogResponse;

  const raw = await catalogResponse.text();
  let memo = filteredBodies.get(pathname);
  if (memo?.raw !== raw) {
    const payload = JSON.parse(raw) as { data?: UnifiedModelEntry[] };
    const data = Array.isArray(payload.data) ? payload.data.filter(predicate) : [];
    memo = { raw, body: JSON.stringify({ object: "list", data }) };
    filteredBodies.set(pathname, memo);
  }

  const headers = new Headers(catalogResponse.headers);
  headers.set("Content-Type", "application/json");
  headers.delete("content-length");

  return new Response(memo.body, {
    status: catalogResponse.status,
    headers,
  });
}
