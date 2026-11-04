import { getApiKeyRequestScope, resolveEffectiveApiKeyId } from "./apiKeyScope";
import { createMediaSink } from "@/lib/media/mediaStore";
import { resolveMediaOrigin } from "@/server/origin/mediaOrigin";

/**
 * Media sink for one generation request (#16372): media is stored under the same owner the
 * files API would record for this caller (`resolveEffectiveApiKeyId`) — the API key, the shared
 * anonymous-owner sentinel under REQUIRE_API_KEY=false, or none for a dashboard session — and
 * served from the caller-facing origin. Injected into the open-sse video handlers.
 */
export async function createRequestMediaSink(
  request: Request,
  policyApiKeyInfo: { id: string } | null | undefined
) {
  const scope = await getApiKeyRequestScope(request);
  return createMediaSink({
    origin: resolveMediaOrigin(request),
    ownerId: resolveEffectiveApiKeyId(scope, policyApiKeyInfo ?? null),
  });
}
