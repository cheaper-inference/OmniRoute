/**
 * catalogDiscovery.ts — response orchestration for the catalog discovery filters.
 *
 * Both surfaces load the regular, unfiltered catalog through the same loader the
 * `GET /v1/models` route uses (auth rejection, per-key filtering and the response
 * cache all apply unchanged), then narrow the rows with `filterCatalogModels`.
 * Filtering after the cache means a new filter combination never forces a fresh
 * catalog build, and the filter can only remove rows the key may already see.
 */

import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import {
  CATALOG_DISCOVERY_PARAMS,
  compareCatalogQueryRows,
  filterCatalogModels,
  parseCatalogDiscoveryQuery,
  type CatalogDiscoveryFilters,
} from "./catalogFilters";
import { applyCatalogPage, catalogJsonResponse, parseCatalogPage } from "./catalogPagination";

export type CatalogLoader = (request: Request) => Promise<Response>;

type CatalogBody = { data?: unknown } & Record<string, unknown>;

/** Headers recomputed for the filtered body, so they are not copied from the inner response. */
const RECOMPUTED_HEADERS = new Set(["content-length", "content-type", "content-encoding", "etag"]);

export function catalogBadRequest(message: string, headers: Record<string, string> = {}) {
  return Response.json(buildErrorBody(400, message), { status: 400, headers });
}

/**
 * Build the GET request for the full, unpaged catalog. Discovery and paging params
 * are dropped (paging is re-applied after filtering); every other param — `prefix`,
 * `configuredOnly`, … — and the caller's headers, including auth, are preserved.
 */
function buildUnfilteredCatalogRequest(request: Request): Request {
  const url = new URL(request.url);
  for (const name of [...CATALOG_DISCOVERY_PARAMS, "limit", "after"]) {
    url.searchParams.delete(name);
  }
  const headers = new Headers(request.headers);
  // The POST shortlist forwards its auth headers, not its body framing.
  for (const name of ["content-length", "content-type", "transfer-encoding"]) headers.delete(name);
  return new Request(url.toString(), { method: "GET", headers });
}

async function loadCatalogRows(
  request: Request,
  loadCatalog: CatalogLoader
): Promise<
  | {
      ok: true;
      body: CatalogBody;
      rows: Record<string, unknown>[];
      headers: Record<string, string>;
    }
  | { ok: false; response: Response }
> {
  const response = await loadCatalog(buildUnfilteredCatalogRequest(request));
  if (response.status !== 200) return { ok: false, response };
  const body = (await response.json()) as CatalogBody;
  const rows = Array.isArray(body?.data) ? (body.data as Record<string, unknown>[]) : [];
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    if (!RECOMPUTED_HEADERS.has(key.toLowerCase())) headers[key] = value;
  });
  return { ok: true, body, rows, headers };
}

/**
 * GET /v1/models with discovery params. Validation runs first (400 on a bad value),
 * then the filter, then the existing OpenAI-style `limit`/`after` paging.
 */
export async function getFilteredCatalogResponse(
  request: Request,
  loadCatalog: CatalogLoader
): Promise<Response> {
  const parsed = parseCatalogDiscoveryQuery(new URL(request.url).searchParams);
  // `=== false`, not `!ok`: without strictNullChecks only the literal comparison narrows.
  if (parsed.ok === false) return catalogBadRequest(parsed.message);

  const loaded = await loadCatalogRows(request, loadCatalog);
  if (loaded.ok === false) return loaded.response;

  const page = parseCatalogPage(request);
  const paged = applyCatalogPage(filterCatalogModels(loaded.rows, parsed.value), page);
  const body: Record<string, unknown> = { ...loaded.body, data: paged.models };
  if (page.limit != null || page.after) {
    body.has_more = paged.hasMore;
    if (paged.lastId) body.last_id = paged.lastId;
  }
  return catalogJsonResponse(body, loaded.headers);
}

/** POST /v1/models/query — filtered, deterministically ordered, bounded shortlist. */
export async function queryCatalogResponse(
  request: Request,
  filters: CatalogDiscoveryFilters,
  limit: number,
  loadCatalog: CatalogLoader
): Promise<Response> {
  const loaded = await loadCatalogRows(request, loadCatalog);
  if (loaded.ok === false) return loaded.response;

  const data = filterCatalogModels(loaded.rows, filters)
    .slice()
    .sort(compareCatalogQueryRows)
    .slice(0, limit);
  return catalogJsonResponse({ object: "list", data }, loaded.headers);
}
