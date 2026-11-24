/**
 * GET /api/v1/me/usage: the usage and cost series of the calling API key.
 *
 * Flow: authenticate (flag, header key, self:usage) → validate `range` (closed set, default
 * `30d`) → read the series of the key's own rows (built, or reused for 60 seconds per key id
 * and range by getApiKeySelfServiceUsage) → `selfUsageResponseSchema.parse()` as the last step,
 * so only contract fields reach the wire. Authentication runs first, so a caller
 * without a valid key learns nothing from the range check.
 *
 * Any failure after the request reaches the handler (the gate itself, the builder, the final
 * parse) is one fixed 500 message; the real error is logged here, once, and never reaches the
 * body or a header. Every response of this handler carries `Cache-Control: no-store`.
 */
import { getApiKeySelfServiceUsage } from "@/lib/usage/apiKeySelfServiceUsageCache";
import { selfUsageQuerySchema, selfUsageResponseSchema } from "@/shared/schemas/selfUsage";
import { createLogger } from "@/shared/utils/logger";

import {
  authenticateSelfServiceRequest,
  selfServiceError,
  selfServiceJson,
  type SelfServiceKeyStore,
} from "./auth";

const log = createLogger("self-service:usage");

const BUILD_FAILED_MESSAGE = "Failed to build usage";
const MISSING_SCOPE_ERROR = "missing_self_usage_scope";

/** The gate itself is fixed; only the key store it reads can be replaced. */
export interface SelfUsageHandlerDeps {
  buildUsage?: typeof getApiKeySelfServiceUsage;
  keyStore?: SelfServiceKeyStore;
}

/** `range` as sent: absent, one value, or every value when repeated (which fails the enum). */
function readRangeQuery(request: Request): { range?: string | string[] } {
  const values = new URL(request.url).searchParams.getAll("range");
  return { range: values.length > 1 ? values : values[0] };
}

function failureResponse(err: unknown): Response {
  if (err instanceof Error && err.message === MISSING_SCOPE_ERROR) {
    return selfServiceError(403, "API key lacks the self:usage scope");
  }
  log.error(
    { err: err instanceof Error ? err.message : String(err) },
    "self-service usage: request failed"
  );
  return selfServiceError(500, BUILD_FAILED_MESSAGE);
}

export async function handleSelfUsageGet(
  request: Request,
  deps: SelfUsageHandlerDeps = {}
): Promise<Response> {
  const buildUsage = deps.buildUsage ?? getApiKeySelfServiceUsage;
  try {
    const auth = await authenticateSelfServiceRequest(request, deps.keyStore);
    if (!auth.ok) return auth.response;

    const query = selfUsageQuerySchema.safeParse(readRangeQuery(request));
    if (!query.success) return selfServiceError(400, "Invalid range");

    const usage = await buildUsage({ id: auth.key.id, scopes: auth.key.scopes }, query.data.range);
    return selfServiceJson(selfUsageResponseSchema.parse(usage));
  } catch (err) {
    return failureResponse(err);
  }
}
