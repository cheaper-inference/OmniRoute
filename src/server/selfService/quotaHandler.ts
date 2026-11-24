/**
 * GET /api/v1/me/quota/{provider}: the self-service quota view of the calling API key.
 *
 * Flow: authenticate (flag, header key, self:usage) → validate the provider segment →
 * resolve its registry alias → build the view → `selfQuotaResponseSchema.parse()` as the last
 * step, so only contract fields reach the wire. A key outside every pool of the provider gets
 * 200 with `pools: []`.
 *
 * Any failure after the gate is reached (the gate itself, the settings lookup, the server secret,
 * the builder, the final parse) is one fixed 500 message; the real error is logged here, once,
 * and never reaches the body or a header. Every response of this handler carries
 * `Cache-Control: no-store`.
 */
import { getApiKeySelfServiceSettings } from "@/lib/db/apiKeySelfServiceSettings";
import { buildQuotaSelfView } from "@/lib/quota/selfView";
import type { QuotaSelfViewInput } from "@/lib/quota/selfViewTypes";
import { resolveProviderId } from "@/shared/constants/providers";
import {
  selfQuotaProviderSegmentSchema,
  selfQuotaResponseSchema,
} from "@/shared/schemas/selfQuota";
import { getApiKeySecret } from "@/shared/utils/apiKey";
import { createLogger } from "@/shared/utils/logger";

import {
  authenticateSelfServiceRequest,
  selfServiceError,
  selfServiceJson,
  type SelfServiceKey,
  type SelfServiceKeyStore,
} from "./auth";

const log = createLogger("self-service:quota");

const BUILD_FAILED_MESSAGE = "Failed to build quota view";
const MISSING_SCOPE_ERROR = "missing_self_usage_scope";

/** The gate itself is fixed; only the key store it reads can be replaced. */
export interface SelfQuotaHandlerDeps {
  buildView?: typeof buildQuotaSelfView;
  keyStore?: SelfServiceKeyStore;
}

export function toViewInput(key: SelfServiceKey, provider: string): QuotaSelfViewInput {
  return {
    apiKeyId: key.id,
    scopes: key.scopes,
    allowedQuotas: key.allowedQuotas,
    allowedConnections: key.allowedConnections,
    expiresAt: key.expiresAt,
    sharedQuotaProviders: getApiKeySelfServiceSettings(key.id).sharedQuotaProviders,
    provider,
  };
}

export function failureResponse(err: unknown): Response {
  if (err instanceof Error && err.message === MISSING_SCOPE_ERROR) {
    return selfServiceError(403, "API key lacks the self:usage scope");
  }
  log.error(
    { err: err instanceof Error ? err.message : String(err) },
    "self-service quota view: request failed"
  );
  return selfServiceError(500, BUILD_FAILED_MESSAGE);
}

export async function handleSelfQuotaGet(
  request: Request,
  rawProvider: string,
  deps: SelfQuotaHandlerDeps = {}
): Promise<Response> {
  const buildView = deps.buildView ?? buildQuotaSelfView;
  try {
    const auth = await authenticateSelfServiceRequest(request, deps.keyStore);
    if (!auth.ok) return auth.response;

    const segment = selfQuotaProviderSegmentSchema.safeParse(rawProvider);
    if (!segment.success) return selfServiceError(400, "Invalid provider");
    const provider = resolveProviderId(segment.data).toLowerCase();

    const view = await buildView(toViewInput(auth.key, provider), { secret: getApiKeySecret() });
    return selfServiceJson(selfQuotaResponseSchema.parse(view));
  } catch (err) {
    return failureResponse(err);
  }
}
