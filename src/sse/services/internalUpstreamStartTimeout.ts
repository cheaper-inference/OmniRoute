import { isInternalAdmissionBypass } from "@/shared/middleware/chatAdmissionIdentity";

export const INTERNAL_UPSTREAM_START_TIMEOUT_HEADER = "x-omniroute-upstream-start-timeout-ms";
const MIN_INTERNAL_UPSTREAM_START_TIMEOUT_MS = 1_000;
const MAX_INTERNAL_UPSTREAM_START_TIMEOUT_MS = 15_000;

/**
 * Resolve a request-scoped upstream response-start cap for trusted loopback/internal callers.
 * The hint is deliberately ignored for ordinary API clients even when they know the header name.
 */
export function resolveInternalUpstreamStartTimeoutMs(request: Request | null | undefined): number | undefined {
  if (!request || !isInternalAdmissionBypass(request)) return undefined;
  const raw = request.headers.get(INTERNAL_UPSTREAM_START_TIMEOUT_HEADER)?.trim() ?? "";
  if (!/^\d+$/.test(raw)) return undefined;
  const parsed = Number(raw);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return undefined;
  return Math.min(
    MAX_INTERNAL_UPSTREAM_START_TIMEOUT_MS,
    Math.max(MIN_INTERNAL_UPSTREAM_START_TIMEOUT_MS, parsed)
  );
}
