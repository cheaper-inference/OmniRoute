import { after } from "next/server";

import { getUnifiedModelsResponse } from "../catalog";
import { catalogBadRequest, queryCatalogResponse } from "../catalogDiscovery";
import {
  catalogQueryBodySchema,
  describeCatalogFilterIssue,
  normalizeCatalogQueryBody,
} from "../catalogFilters";
import { handleGetModelById } from "../modelById";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * This static segment shadows the `[...model]` catch-all for `/v1/models/query`,
 * so GET/HEAD keep the single-model retrieval behavior a model id `query` had.
 */
export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export async function GET(request: Request) {
  return handleGetModelById(request, "query", getUnifiedModelsResponse);
}

/**
 * POST /v1/models/query — filtered model shortlist over the caller's catalog.
 *
 * Body (all optional): `capabilities`, `min_context`, `max_output`, `kind`, `q`,
 * `owned_by`, `exclude`, `limit` (default 20, capped at 100). Same auth and per-key
 * visibility as GET /v1/models; results are ordered by `owned_by`, then `id`.
 */
export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return catalogBadRequest("Request body must be valid JSON");
  }
  const parsed = catalogQueryBodySchema.safeParse(rawBody);
  if (!parsed.success) return catalogBadRequest(describeCatalogFilterIssue(parsed.error));
  const { filters, limit } = normalizeCatalogQueryBody(parsed.data);

  return queryCatalogResponse(request, filters, limit, (catalogRequest) =>
    getUnifiedModelsResponse(
      catalogRequest,
      {},
      { scheduleBackgroundRefresh: (task) => after(task) }
    )
  );
}
