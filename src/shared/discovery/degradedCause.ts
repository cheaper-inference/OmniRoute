import { isDegradedDiscovery } from "@/app/api/providers/[id]/sync-models/degradedLocalCatalog";

/**
 * Why a model discovery fell back to a built-in catalog.
 *
 * The reason is reported with a closed vocabulary on purpose: a free-text
 * upstream message can carry an API key, a token, a raw body, a connection id
 * or an account id, and sanitizing it does not remove all of them. A reason
 * therefore holds either a code of the closed list below or an HTTP status —
 * never anything the upstream wrote.
 */
export type DiscoveryFailure = { status?: number; code?: string };

/**
 * The codes a reason may carry: the outbound-fetch codes of the repository
 * (a blocked redirect, a timeout, a blocked URL, a network error) and the
 * local conditions of a discovery that could not even be attempted (no
 * credential, no endpoint, a refused local request, an empty upstream
 * catalog, a client too old for the catalog, an upstream answer that is not
 * the JSON catalog).
 *
 * A code outside this list is ignored, so no upstream text can reach the
 * response through this channel.
 */
const CLOSED_FAILURE_CODES: readonly string[] = [
  "INVALID_URL",
  "URL_GUARD_BLOCKED",
  "TIMEOUT",
  "REDIRECT_BLOCKED",
  "NETWORK_ERROR",
  "NO_CREDENTIAL",
  "NO_ENDPOINT",
  "LOCALITY_REFUSED",
  "EMPTY_CATALOG",
  "CLIENT_TOO_OLD",
  "INVALID_RESPONSE",
];

/** The reason of a failure that was observed but carries no readable detail. */
const GENERIC_FAILURE_CODE = "UPSTREAM_ERROR";

const MIN_HTTP_STATUS = 100;
const MAX_HTTP_STATUS = 599;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readHttpStatus(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  if (value < MIN_HTTP_STATUS || value > MAX_HTTP_STATUS) return null;
  return value;
}

function readClosedCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim();
  if (!code || !CLOSED_FAILURE_CODES.includes(code)) return null;
  return code;
}

/**
 * The reportable reason of an observed failure, or `null` when nothing was
 * observed. A known code wins over an HTTP status; a status outside the HTTP
 * range is ignored; a failure without any readable detail is reported as a
 * generic upstream error.
 */
export function buildDegradedCause(failure: DiscoveryFailure | null | undefined): string | null {
  if (!isRecord(failure)) return null;
  const code = readClosedCode(failure.code);
  if (code) return code;
  const status = readHttpStatus(failure.status);
  if (status !== null) return `HTTP ${status}`;
  return GENERIC_FAILURE_CODE;
}

/**
 * Reduce an observed error to the closed vocabulary: its code when it holds
 * one, else its HTTP status, else nothing readable. The error message is
 * never read — it is where the upstream secrets would be.
 */
export function toDiscoveryFailure(error: unknown): DiscoveryFailure {
  if (!isRecord(error)) return {};
  const code = readClosedCode(error.code);
  if (code) return { code };
  const status = readHttpStatus(error.status) ?? readHttpStatus(error.statusCode);
  if (status !== null) return { status };
  return {};
}

/**
 * The structured failure a Copilot discovery reports (`kind` plus safe
 * diagnostics, published as `discoveryFailure`), reduced to the closed
 * vocabulary of this module — so a Copilot fallback states the same reason as
 * every other fallback instead of a generic upstream error.
 */
export type CopilotDiscoveryFailureLike = { kind?: unknown; upstreamStatus?: unknown };

export function fromCopilotDiscoveryFailure(
  failure: CopilotDiscoveryFailureLike | null | undefined
): DiscoveryFailure {
  if (!isRecord(failure)) return {};
  switch (failure.kind) {
    case "missing_token":
      return { code: "NO_CREDENTIAL" };
    case "empty_catalog":
      return { code: "EMPTY_CATALOG" };
    case "network":
      return { code: "NETWORK_ERROR" };
    case "invalid_json":
      return { code: "INVALID_RESPONSE" };
    case "http_status": {
      const status = readHttpStatus(failure.upstreamStatus);
      return status !== null ? { status } : {};
    }
    default:
      return {};
  }
}

/**
 * Read the degradation of a discovery response.
 *
 * The state is decided by the shared predicate — the same one the server and
 * the synchronization route use — and the reason is the value the server
 * published. Nothing is rebuilt here, so a screen and the server can never
 * disagree on what happened.
 */
export function readDiscoveryDegradation(payload: unknown): {
  degraded: boolean;
  cause?: string;
} {
  const data = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const degraded = isDegradedDiscovery({
    source: data.source,
    intentional: data.intentional,
    warning: data.warning,
  });
  const cause = typeof data.error === "string" && data.error.trim() ? data.error.trim() : undefined;
  return { degraded, ...(cause ? { cause } : {}) };
}

/**
 * The single place where a discovery response gets its public shape.
 *
 * The internal reason is removed from the body, and the response is flagged
 * as degraded — with the reason — only when the payload really is a degraded
 * discovery. A healthy payload stays exactly as it was, even when a reason
 * was observed on the way.
 */
export function applyDiscoveryDegradation<T extends Record<string, unknown>>(
  payload: T
): T & { degraded?: boolean; error?: string } {
  const { failure, ...rest } = payload as T & { failure?: DiscoveryFailure };
  if (
    !isDegradedDiscovery(rest as { source?: unknown; intentional?: unknown; warning?: unknown })
  ) {
    return rest as T & { degraded?: boolean; error?: string };
  }
  const cause = buildDegradedCause(failure);
  return {
    ...(rest as T & { degraded?: boolean; error?: string }),
    degraded: true,
    ...(cause ? { error: cause } : {}),
  };
}
