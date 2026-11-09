import { inheritLocalProcessPressureResponse } from "@omniroute/open-sse/utils/localPressureResponse.ts";
import { inheritTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { inheritResponsePolicies } from "./responsePolicies.ts";

/**
 * Attach a selected connection ID and bounded routing metrics to the response.
 * Immutable headers require a wrapper that preserves trusted markers and response policies.
 */
export type AccountRoutingTelemetry = {
  accountFallbacks?: number;
  accountFallbackReasons?: readonly string[];
  selectedConnectionPlan?: string | null;
  sameAccountRetries?: number;
  routingWaitMs?: number;
};

function nonnegativeCount(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.min(1_000_000, Math.floor(value))
    : 0;
}

const SAFE_FALLBACK_REASONS = new Set([
  "capacity",
  "stream_early_eof",
  "stream_readiness",
  "empty_content_sibling",
  "pre_response_timeout",
  "upstream_error",
]);

function fallbackReasons(values: readonly string[] | undefined): string[] {
  if (!Array.isArray(values)) return [];
  return values
    .slice(0, 8)
    .map((reason) => String(reason).trim().toLowerCase())
    .filter((reason) => SAFE_FALLBACK_REASONS.has(reason) || /^http_[1-5][0-9]{2}$/.test(reason));
}

// Only explicitly enabled server operators can expose recognized subscription tiers.
// An arbitrary provider field is never copied into a response header.
const CODEX_PLAN_TIERS = new Set([
  "free",
  "go",
  "plus",
  "pro",
  "prolite",
  "promax",
  "team",
  "chatgptteam",
  "business",
  "enterprise",
  "edu",
  "education",
]);

function selectedCodexPlan(value: string | null | undefined): string | null {
  if (process.env.OMNIROUTE_CODEX_PLAN_RESPONSE_HEADER !== "1") return null;
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase().replace(/[\s_-]+/g, "");
  return CODEX_PLAN_TIERS.has(normalized) ? normalized : null;
}

export function withSelectedConnectionHeader(
  response: Response,
  connectionId: string | null | undefined,
  telemetry?: AccountRoutingTelemetry
): Response {
  if (!response) return response;
  const fallbacks = nonnegativeCount(telemetry?.accountFallbacks);
  const plan = selectedCodexPlan(telemetry?.selectedConnectionPlan);
  const retries = nonnegativeCount(telemetry?.sameAccountRetries);
  const waitMs = nonnegativeCount(telemetry?.routingWaitMs);
  const reasons = fallbackReasons(telemetry?.accountFallbackReasons);
  if (
    !connectionId &&
    fallbacks === 0 &&
    retries === 0 &&
    waitMs === 0 &&
    reasons.length === 0 &&
    !plan
  ) {
    return response;
  }

  const apply = (headers: Headers) => {
    if (connectionId) headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
    if (plan) headers.set(OMNIROUTE_RESPONSE_HEADERS.selectedConnectionPlan, plan);
    if (fallbacks > 0) headers.set(OMNIROUTE_RESPONSE_HEADERS.accountFallbacks, String(fallbacks));
    if (reasons.length) {
      headers.set(OMNIROUTE_RESPONSE_HEADERS.accountFallbackReasons, reasons.join(","));
    }
    if (retries > 0) headers.set(OMNIROUTE_RESPONSE_HEADERS.sameAccountRetries, String(retries));
    if (waitMs > 0) headers.set(OMNIROUTE_RESPONSE_HEADERS.routingWaitMs, String(waitMs));
  };

  try {
    apply(response.headers);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    apply(cloned.headers);
    // Response identity carries local-pressure, trusted rate-limit, provider-probe,
    // and empty-turn policies. Preserve all of them on the immutable-header wrapper.
    const trusted = inheritLocalProcessPressureResponse(
      response,
      inheritTrustedLocalRateLimitResponse(response, cloned)
    );
    return inheritResponsePolicies(response, trusted);
  }
}
