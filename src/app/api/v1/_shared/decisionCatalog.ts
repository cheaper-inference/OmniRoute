/**
 * GET /v1/systemone/models — the decision-model catalog (#18838).
 *
 * One list for both decision wire formats, each row naming its own `api_format`:
 *   - `systemone`: the rows /v1/systemone serves (TypeSafe, OpenRouter, Cloudflare, Ollama);
 *   - `decisions`: native OpenAI Decisions models (`openai/gpt-6-luna`) present in the
 *     caller's catalog, served by POST /v1/decisions.
 *
 * Both come from the caller's authorized unified catalog (API-key model allowlist and
 * connection scope already applied there), so this route reads no credential and calls no
 * upstream. `limit` / `after` page the final, deduplicated list; a stale or failed catalog
 * is reported as `partial`, or 503 `unavailable` when nothing survives.
 */
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { projectOpenAiDecisionRows } from "@omniroute/open-sse/services/decision/native/openaiDecisions.ts";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { applyCatalogPage, parseCatalogPage } from "@/app/api/v1/models/catalogPagination";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { isSystemOneCatalogModel } from "@/app/api/v1/_shared/systemOneRoute";

type CatalogRow = Record<string, unknown>;

export type DecisionCatalogStatus = "complete" | "partial" | "unavailable";

/** System One rows annotated with their wire format, then the native rows; sorted by id. */
export function buildDecisionCatalogRows(rows: readonly CatalogRow[]): CatalogRow[] {
  const merged = new Map<string, CatalogRow>();
  for (const row of rows) {
    if (typeof row.id !== "string" || !isSystemOneCatalogModel(row)) continue;
    merged.set(row.id, { ...row, api_format: "systemone" });
  }
  for (const row of projectOpenAiDecisionRows(rows)) {
    if (!merged.has(row.id as string)) merged.set(row.id as string, row);
  }
  return [...merged.values()].sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

/** The unified catalog without the client's paging: paging applies to the final list. */
function unpagedCatalogRequest(request: Request): Request {
  const url = new URL(request.url);
  url.searchParams.delete("limit");
  url.searchParams.delete("after");
  return new Request(url, { method: "GET", headers: request.headers });
}

function catalogWasDegraded(response: Response): boolean {
  const marker = response.headers.get("x-omniroute-catalog") || "";
  return (
    ["last-good", "stale", "build-timeout"].includes(marker) ||
    response.headers.get("X-OmniRoute-Catalog-Status") === "partial"
  );
}

export function decisionCatalogResponse(
  request: Request,
  rows: CatalogRow[],
  degraded: boolean
): Response {
  const status: DecisionCatalogStatus =
    degraded && rows.length === 0 ? "unavailable" : degraded ? "partial" : "complete";
  const page = parseCatalogPage(request);
  const paged = applyCatalogPage(rows, page);
  const paging =
    page.limit !== null || page.after
      ? { has_more: paged.hasMore, ...(paged.lastId ? { last_id: paged.lastId } : {}) }
      : {};
  const body =
    status === "unavailable"
      ? { object: "list", data: [], ...buildErrorBody(503, "Decision model catalog unavailable") }
      : { object: "list", data: paged.models, ...paging };
  return Response.json(body, {
    status: status === "unavailable" ? 503 : 200,
    headers: { "Cache-Control": "no-store", "X-OmniRoute-Catalog-Status": status },
  });
}

export async function getDecisionCatalog(request: Request): Promise<Response> {
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  const catalog = await getUnifiedModelsResponse(unpagedCatalogRequest(request));
  // An auth or validation answer from the catalog is the caller's answer too.
  if (!catalog.ok && catalog.status < 500) return catalog;
  if (!catalog.ok) return decisionCatalogResponse(request, [], true);

  const payload = (await catalog.json()) as { data?: unknown };
  const rows = Array.isArray(payload.data) ? (payload.data as CatalogRow[]) : [];
  return decisionCatalogResponse(
    request,
    buildDecisionCatalogRows(rows),
    catalogWasDegraded(catalog)
  );
}
