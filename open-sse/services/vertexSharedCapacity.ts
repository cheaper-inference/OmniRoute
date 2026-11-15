/**
 * Vertex shared-capacity 429 classification. Lives in open-sse so both the combo engine
 * (`combo/executeTargetAttempt.ts`) and the account path (`src/sse/services/auth.ts`) can use it
 * without an open-sse -> src import.
 */

function sharedCapacityMessage(message: unknown): boolean {
  return (
    typeof message === "string" &&
    /resource exhausted/i.test(message) &&
    /try again later/i.test(message) &&
    !/quota|provisioned throughput/i.test(message)
  );
}

function errorObjectOf(body: unknown): Record<string, unknown> | null {
  const first = Array.isArray(body) ? body[0] : body;
  const error = (first as { error?: unknown } | null | undefined)?.error;
  return error && typeof error === "object" ? (error as Record<string, unknown>) : null;
}

function parseJsonOrNull(text: string | null | undefined): unknown {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

/**
 * Vertex answers a shared-capacity 429 (the whole region is busy) with a bare `RESOURCE_EXHAUSTED`
 * "Resource exhausted. Please try again later." and no `details`. It says nothing about this
 * account's quota, so the account and the model must stay in rotation. Quota wording, provisioned
 * throughput and any body with `details` (RetryInfo, QuotaFailure) are not matched.
 *
 * `body` is either the upstream JSON (names `status`) or the client-safe projection a combo gets
 * from handleChat (no `status`, no `details`; a parsed retry hint rides the Retry-After header, so
 * `retryHinted` stands in for `details` there).
 */
export function isVertexSharedCapacityBody(
  provider: string | null | undefined,
  status: number,
  body: unknown,
  retryHinted = false
): boolean {
  if (status !== 429 || (provider !== "vertex" && provider !== "vertex-partner")) return false;
  const error = errorObjectOf(body);
  if (!error || !sharedCapacityMessage(error.message)) return false;
  if (Array.isArray(error.details) && error.details.length > 0) return false;
  return error.status === "RESOURCE_EXHAUSTED" || (error.status === undefined && !retryHinted);
}

/** Account path: the upstream body when the pipeline passed it, else `errorText` as JSON. */
export function isVertexSharedCapacity429(
  provider: string | null | undefined,
  status: number,
  errorText: string,
  upstreamErrorBody?: unknown
): boolean {
  return isVertexSharedCapacityBody(
    provider,
    status,
    upstreamErrorBody ?? parseJsonOrNull(errorText)
  );
}

/** Combo path: the failed response body text and whether its headers carry a retry hint. */
export function isVertexSharedCapacityResponse(
  provider: string | null | undefined,
  status: number,
  bodyText: string | null | undefined,
  retryHinted: boolean
): boolean {
  return isVertexSharedCapacityBody(provider, status, parseJsonOrNull(bodyText), retryHinted);
}
