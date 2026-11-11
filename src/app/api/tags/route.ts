import { CORS_HEADERS } from "@/shared/utils/cors";
import { ollamaModels } from "@omniroute/open-sse/config/ollamaModels.ts";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

const JSON_HEADERS = { "Content-Type": "application/json", ...CORS_HEADERS };

type CatalogModel = { id?: unknown; created?: unknown };

/** Ollama tags entry for one catalog model. The catalog has no size or digest, so those are 0. */
function toOllamaTag({ id, created }: CatalogModel) {
  const name = String(id);
  const seconds = typeof created === "number" && created > 0 ? created : 0;
  return {
    name,
    model: name,
    modified_at: new Date(seconds * 1000).toISOString(),
    size: 0,
    digest: "",
    details: {},
  };
}

/**
 * OMNIROUTE_OLLAMA_REAL_TAGS=1: list the real catalog. It goes through the same builder as
 * GET /v1/models, so the catalog's own auth check applies; a refusal is returned as is.
 */
async function realTagsResponse(request: Request): Promise<Response> {
  const catalog = await getUnifiedModelsResponse(request, CORS_HEADERS);
  if (!catalog.ok) return catalog;
  const body = (await catalog.json()) as { data?: CatalogModel[] };
  const models = (body.data ?? []).filter((entry) => entry?.id).map(toOllamaTag);
  return new Response(JSON.stringify({ models }), { headers: JSON_HEADERS });
}

export async function GET(request: Request) {
  if (process.env.OMNIROUTE_OLLAMA_REAL_TAGS === "1") return realTagsResponse(request);
  return new Response(JSON.stringify(ollamaModels), { headers: JSON_HEADERS });
}
