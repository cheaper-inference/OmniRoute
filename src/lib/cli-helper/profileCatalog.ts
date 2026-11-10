import {
  fetchModelSyncInternal,
  getModelSyncInternalBaseUrl,
} from "../../shared/services/modelSyncScheduler";

function forwardAuthHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");
  if (cookie) headers.cookie = cookie;
  if (authorization) headers.authorization = authorization;
  return headers;
}

export async function loadProfileCatalog(
  request: Request,
  fetchCatalog: typeof fetch = fetchModelSyncInternal,
  getBaseUrl = getModelSyncInternalBaseUrl
): Promise<{ ok: true; models: unknown[]; baseUrl: string } | { ok: false; reason: string }> {
  const baseUrl = getBaseUrl().replace(/\/$/, "");
  const res = await fetchCatalog(`${baseUrl}/v1/models`, {
    headers: forwardAuthHeaders(request),
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    return { ok: false, reason: `catalog_http_${res.status}` };
  }

  const body = await res.json();
  const candidateModels = Array.isArray(body) ? body : body.data || body.models || [];
  const models = Array.isArray(candidateModels) ? candidateModels : [];
  return { ok: true, models, baseUrl };
}
