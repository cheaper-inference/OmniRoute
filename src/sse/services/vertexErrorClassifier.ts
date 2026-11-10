/**
 * Google's google.rpc.ErrorInfo proto reliably distinguishes a connection-wide
 * PERMISSION_DENIED (API not enabled, or a project-level IAM denial) from a
 * model-specific one (IAM denial scoped to a .../models/<id> resource) — see
 * https://cloud.google.com/apis/design/errors#error_info. Only returns true on
 * POSITIVE evidence of a connection-wide cause; any other shape (including a
 * missing/malformed resource field) falls through to the existing per-model
 * lockout behavior, since that's the safer default and the actual bug this
 * plan fixes (avoid defaulting BACK toward the connection-wide cooldown this
 * plan exists to avoid).
 *
 * Parses the body as JSON and inspects each ErrorInfo-shaped detail object so
 * `reason` and `resource` are correlated within the SAME detail entry — a
 * multi-detail error body (unusual but possible) must not let one detail's
 * resource leak into another detail's reason check. Falls back to a permissive
 * regex scan (pre-JSON-parsing behavior) only when the body isn't parseable
 * JSON or doesn't contain a `details` array, since Vertex error bodies aren't
 * guaranteed to always be well-formed JSON.
 *
 * Extracted to its own module so the single call site in
 * `./auth.ts::markAccountUnavailable()` stays thin wiring, without growing the
 * frozen `auth.ts` file (`config/quality/file-size-baseline.json`).
 */
export function isVertexConnectionWidePermissionDenied(
  errorText: string | null | undefined
): boolean {
  if (!errorText) return false;

  try {
    const parsed = JSON.parse(errorText);
    const details: unknown[] =
      parsed?.error?.details ?? parsed?.details ?? (Array.isArray(parsed) ? parsed : []);
    if (Array.isArray(details) && details.length > 0) {
      for (const detail of details) {
        if (!detail || typeof detail !== "object") continue;
        const reason = (detail as Record<string, unknown>).reason;
        if (reason === "SERVICE_DISABLED") return true;
        if (reason === "IAM_PERMISSION_DENIED") {
          const metadata = (detail as Record<string, unknown>).metadata;
          const resource =
            metadata && typeof metadata === "object"
              ? (metadata as Record<string, unknown>).resource
              : undefined;
          if (typeof resource === "string" && !resource.includes("/models/")) return true;
        }
      }
      // Well-formed details array present but no detail matched a connection-wide
      // pattern (e.g. IAM_PERMISSION_DENIED with a /models/ resource, or no
      // recognized reason at all) — per-model lockout is correct, don't fall
      // through to the regex heuristic (it would just re-derive the same answer
      // less precisely, or worse, could false-positive on stray substrings).
      return false;
    }
  } catch {
    // Not parseable JSON — fall through to the regex heuristic below.
  }

  // Fallback for non-JSON or unexpected-shape error bodies (regex-based,
  // pre-JSON-parsing heuristic — kept for robustness against malformed bodies).
  if (/"reason"\s*:\s*"SERVICE_DISABLED"/.test(errorText)) return true;
  if (/"reason"\s*:\s*"IAM_PERMISSION_DENIED"/.test(errorText)) {
    const resourceMatch = errorText.match(/"resource"\s*:\s*"([^"]*)"/);
    if (resourceMatch && !resourceMatch[1].includes("/models/")) return true;
  }
  return false;
}

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
