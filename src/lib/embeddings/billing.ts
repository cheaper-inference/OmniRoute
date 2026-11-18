import { recordEmbeddingRequest } from "@/lib/usage/specialtyRequestAccounting";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";

/** Finalize one successful physical embedding batch; combo wrappers do not bill. */
export async function embeddingSuccessResponse(
  data: Record<string, unknown>,
  headers: Headers,
  identity: Parameters<typeof recordEmbeddingRequest>[0]
): Promise<Response> {
  headers.set("Content-Type", "application/json");
  const requestId = generateRequestId();
  const costUsd = await recordEmbeddingRequest({ ...identity, requestId });
  attachOmniRouteMetaHeaders(headers, {
    provider: identity.provider,
    model: identity.model,
    usage: data.usage as Record<string, number> | null,
    costUsd,
    latencyMs: Date.now() - identity.startTime,
    requestId,
  });
  if (costUsd === null) headers.delete("X-OmniRoute-Response-Cost");
  return new Response(JSON.stringify(data), { headers });
}
