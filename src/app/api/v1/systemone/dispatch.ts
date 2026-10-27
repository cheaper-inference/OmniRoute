/**
 * System One candidate dispatch — the attempt loop behind `POST /v1/systemone`.
 *
 * The route resolves a client model id into ordered candidates
 * (`resolveSystemOneCandidates`); this module decides, between credential
 * spends, which candidate and which connection to try next, and it is the only
 * place where a decision request could cross an account, a provider or a
 * free/paid tier boundary. Two bounded loops, outer-last:
 *
 *   for each candidate (bounded by SYSTEMONE_MAX_FALLBACK_CANDIDATES)
 *     for each connection (bounded by SYSTEMONE_MAX_CONNECTION_ATTEMPTS)
 *
 * so a retryable failure first rotates to another account of the same provider —
 * cheapest, same contract, same price — and only a bare alias then crosses to
 * another backend. A provider-qualified id and a free-tier alias resolve to a
 * single candidate upstream of here, which is what makes "pinned never crosses
 * providers" and "a free alias never reaches a paid backend" structural rather
 * than a rule this loop has to remember.
 *
 * Fallback is deliberately narrow: only upstream availability failures (408,
 * 5xx except 501) are retried. Authentication, access, billing and rate/quota
 * restrictions (401/402/403/429/451) are terminal; another identity must not
 * bypass the same restriction. A 502 must carry the proxy's `upstream_error` code to retry;
 * malformed success bodies carry `upstream_protocol_error` and fail closed, as
 * do unclassified 502s and caller-fault statuses that would repeat on every account.
 *
 * Every collaborator is injected: the route binds the real credential selector,
 * proxy and key-policy check, and the tests drive the loop with fakes. Nothing
 * here logs a request body — a decision `state` is routinely operator data.
 */

import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { getTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  handleSystemOneProxy,
  isTerminalSystemOneProxyResponse,
  type SystemOneProxyOptions,
} from "@omniroute/open-sse/handlers/systemOne.ts";
import {
  SYSTEMONE_MAX_FALLBACK_CANDIDATES,
  isConnectionEligibleForTier,
  type SystemOneCandidate,
  type SystemOneTier,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";
import {
  validateSystemOneBackendBody,
  type SystemOneValidation,
} from "@omniroute/open-sse/services/typesafe/systemOneAnswers.ts";
import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import * as log from "@/sse/utils/logger";
import { getProviderConnections } from "@/lib/db/providers";
import { checkTokenLimits } from "@omniroute/open-sse/services/tokenLimitCounter.ts";

/**
 * Connections tried per candidate after retryable service failures. A call may
 * be billable even when it fails; this bound does not permit rotation after
 * authentication, access, billing or rate/quota restrictions.
 */
export const SYSTEMONE_MAX_CONNECTION_ATTEMPTS = 3;

export type SystemOneCredentialSelection = {
  provider: string;
  tier: SystemOneTier;
  /** Upstream model id — quota preflight scopes per-model cutoffs by it. */
  model: string;
  /** The calling key's connection allowlist, or null when it has none. */
  allowedConnections: string[] | null;
  /** Connections already attempted for this candidate. */
  excludeConnectionIds: string[];
};

export type SystemOneDispatchDeps = {
  selectCredentials: (selection: SystemOneCredentialSelection) => Promise<unknown>;
  dispatch: (options: SystemOneProxyOptions) => Promise<Response>;
  clearRecoveredProviderState: (credentials: unknown) => Promise<unknown>;
  /** Re-checks the key's model rules for one candidate's canonical id. */
  validateRoutingTarget: (canonicalModel: string) => Promise<Response | null>;
  validateBackendBody: (provider: string, body: Record<string, unknown>) => SystemOneValidation;
  /** Fresh non-consuming policy check before selection and after the capacity queue. */
  authorizeAttempt: (
    candidate: SystemOneCandidate,
    credentials?: SystemOneProxyOptions["credentials"]
  ) => Promise<Response | null>;
};

export const defaultSystemOneDispatchDeps: SystemOneDispatchDeps = {
  selectCredentials: async ({
    provider,
    model,
    tier,
    allowedConnections,
    excludeConnectionIds,
  }) => {
    const connections = await getProviderConnections({ provider, isActive: true });
    const eligibleIds = connections.flatMap((connection) => {
      const id = connection.id;
      if (typeof id !== "string") return [];
      return (!allowedConnections || allowedConnections.includes(id)) &&
        isConnectionEligibleForTier(tier, connection, provider)
        ? [id]
        : [];
    });
    // An empty allowlist means unrestricted to the shared selector.
    if (!eligibleIds.length) return null;
    return getProviderCredentialsWithQuotaPreflight(provider, null, eligibleIds, model, {
      excludeConnectionIds,
    });
  },
  dispatch: (options) => handleSystemOneProxy(options),
  clearRecoveredProviderState: (credentials) => clearRecoveredProviderState(credentials),
  // No key policy by default: a keyless (local/session) request has no rules to
  // re-check, and the route injects the real check whenever a key is present.
  validateRoutingTarget: async () => null,
  validateBackendBody: validateSystemOneBackendBody,
  authorizeAttempt: async () => null,
};

export type SystemOneDispatchInput = {
  candidates: readonly SystemOneCandidate[];
  /** Validated request envelope; `model` is replaced per candidate. */
  body: Record<string, unknown>;
  /** What the client asked for, kept for the call log. */
  requestedModel: string;
  allowedConnections?: string[] | null;
  apiKeyInfo?: { id?: string | null; name?: string | null } | null;
  correlationId?: string | null;
  signal?: AbortSignal;
  requestDeadlineSignal?: AbortSignal;
  /** Server-only budget; never taken from the caller body. */
  timeoutMs?: number;
};

/**
 * Whether another account (or another backend) is worth trying after this
 * status alone. A 502 needs the response-code check in `canRetryResponse`.
 */
export function isRetryableSystemOneStatus(status: number): boolean {
  if (status === 501 || status === 502) return false;
  if (status >= 500) return true;
  return status === HTTP_STATUS.REQUEST_TIMEOUT;
}

async function canRetryResponse(response: Response): Promise<boolean> {
  if (isTerminalSystemOneProxyResponse(response)) return false;
  if (getTrustedLocalRateLimitResponse(response)) return false;
  if (!isRetryableSystemOneStatus(response.status) && response.status !== 502) return false;
  const body = await response
    .clone()
    .json()
    .catch(() => null);
  if (body?.error?.code === "upstream_request_error") return false;
  if (
    body?.error?.code === "systemone_accounting_unavailable" ||
    body?.error?.code === "systemone_authorization_unavailable"
  )
    return false;
  return isRetryableSystemOneStatus(response.status) || body?.error?.code === "upstream_error";
}

function validateCandidateTokenBudget(
  apiKeyId: string | null | undefined,
  candidate: SystemOneCandidate
): Response | null {
  if (!apiKeyId) return null;
  try {
    const breach = checkTokenLimits(apiKeyId, candidate.provider, candidate.model);
    return breach
      ? errorResponse(429, "Token limit exceeded for this System One target", {
          code: "token_limit_exceeded",
          retryAfter: breach.nextResetAt,
        })
      : null;
  } catch {
    return errorResponse(503, "System One token limit policy unavailable");
  }
}

function connectionIdOf(credentials: unknown): string | null {
  const id = (credentials as { connectionId?: unknown } | null)?.connectionId;
  return typeof id === "string" && id.trim() ? id.trim() : null;
}

/**
 * Translate a non-credential selector answer into the response the client
 * should get for it, or `null` when the selection is usable.
 *
 * The selector returns a truthy diagnostic sentinel instead of credentials when
 * every connection of the provider is unusable (#13945), so a plain truthiness
 * test here would dispatch a request with no account at all.
 */
function describeUnusableSelection(provider: string, credentials: unknown): Response | null {
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(provider, credentials);
  }
  if (!credentials || typeof credentials !== "object") {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No active ${provider} connection is available for System One`
    );
  }

  const record = credentials as Record<string, unknown>;
  if (record.allExpired) {
    const status = typeof record.expiredStatus === "string" ? record.expiredStatus : "expired";
    const count = typeof record.expiredCount === "number" ? record.expiredCount : 1;
    // Credits exhausted is quota (402), not a broken credential (#12441).
    return status === "credits_exhausted"
      ? errorResponse(
          HTTP_STATUS.PAYMENT_REQUIRED,
          `[${provider}] All ${count} connection(s) have exhausted their credits`
        )
      : errorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          `[${provider}] All ${count} connection(s) need to be reconnected in the dashboard`
        );
  }
  if (record.blockedByKeyPolicy) {
    const count = typeof record.blockedCount === "number" ? record.blockedCount : 1;
    return errorResponse(
      HTTP_STATUS.FORBIDDEN,
      `[${provider}] ${count} connection(s) exist but are excluded by this API key's connection allowlist / quota scope`
    );
  }
  if (record.leaseConnectionMismatch || record.leaseFenceStale || record.leaseRequired) {
    return errorResponse(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      `[${provider}] The exclusive connection lease for this request is no longer valid`
    );
  }
  if (record.waitingForCapacity) {
    return errorResponse(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      `[${provider}] Every eligible connection is leased by another request`
    );
  }
  return null;
}

type Outcome = {
  /** Last answer from an upstream attempt — preferred over a diagnostic. */
  upstream: Response | null;
  /** Last reason a candidate never reached an upstream. */
  diagnostic: Response | null;
};

function recordRetryableFailure(
  candidate: SystemOneCandidate,
  outcome: Outcome,
  response: Response,
  connectionId: string | null
): void {
  outcome.upstream = response;
  log.warn("SYSTEMONE", "Decision attempt failed; considering another account", {
    provider: candidate.provider,
    model: candidate.canonicalModel,
    status: response.status,
    ...(connectionId ? { connectionId } : {}),
  });
}

/**
 * Run one candidate's bounded connection rotation.
 *
 * Returns a terminal `Response` (success, or a failure no other candidate can
 * improve on) or `null` to let the caller try the next candidate.
 */
async function attemptCandidate(
  candidate: SystemOneCandidate,
  input: SystemOneDispatchInput,
  deps: SystemOneDispatchDeps,
  outcome: Outcome
): Promise<Response | null> {
  const body = { ...input.body, model: candidate.model };
  const limits = deps.validateBackendBody(candidate.provider, body);
  if (limits.ok === false) {
    // A request shape this backend refuses is the caller's: another account or
    // backend would refuse the same bytes.
    return errorResponse(limits.status, limits.message);
  }

  const attempted = new Set<string>();
  for (let attempt = 0; attempt < SYSTEMONE_MAX_CONNECTION_ATTEMPTS; attempt++) {
    input.signal?.throwIfAborted();
    const admission = await authorizePhysicalAttempt(candidate, input, deps);
    if (admission) return admission;
    const credentials = await abortable(input.signal!, () =>
      deps.selectCredentials({
        provider: candidate.provider,
        tier: candidate.tier,
        model: candidate.model,
        allowedConnections: input.allowedConnections ?? null,
        excludeConnectionIds: [...attempted],
      })
    );
    input.signal?.throwIfAborted();

    const unusable = describeUnusableSelection(candidate.provider, credentials);
    if (unusable) {
      outcome.diagnostic = unusable;
      return null;
    }

    const connectionId = connectionIdOf(credentials);
    // A selector that ignored the exclusion list would otherwise re-dispatch to
    // the account that just failed until the attempt budget ran out.
    if (connectionId && attempted.has(connectionId)) return null;
    if (connectionId) attempted.add(connectionId);

    const response = await abortable(input.signal!, () =>
      deps.dispatch({
        provider: candidate.provider,
        body,
        canonicalModel: candidate.canonicalModel,
        requestedModel: input.requestedModel,
        tier: candidate.tier,
        credentials: credentials as SystemOneProxyOptions["credentials"],
        apiKeyInfo: input.apiKeyInfo ?? null,
        correlationId: input.correlationId ?? null,
        signal: input.signal,
        requestDeadlineSignal: input.requestDeadlineSignal,
        authorizeDispatch: () =>
          authorizePhysicalAttempt(
            candidate,
            input,
            deps,
            credentials as SystemOneProxyOptions["credentials"]
          ),
      })
    );
    input.signal?.throwIfAborted();

    if (response.ok) {
      void Promise.resolve()
        .then(() => deps.clearRecoveredProviderState(credentials))
        .catch(() => {
          // Recovery bookkeeping must never fail a successful decision.
        });
      return response;
    }
    if (!(await canRetryResponse(response))) return response;

    recordRetryableFailure(candidate, outcome, response, connectionId);
    // Nothing identifies the account that just failed, so there is nothing to
    // exclude and the selector would return it again.
    if (!connectionId) return null;
  }
  return null;
}

/**
 * Dispatch a validated System One request across its resolved candidates.
 *
 * Returns the first successful decision, or the most informative failure: the
 * last real upstream answer (which carries its own `Retry-After`) in preference
 * to a selector diagnostic, mirroring the chat path's credential-exhaustion
 * handling in `src/sse/handlers/chatHelpers.ts::handleNoCredentials`.
 */
async function dispatchWithinBudget(
  input: SystemOneDispatchInput,
  overrides: Partial<SystemOneDispatchDeps> = {}
): Promise<Response> {
  const deps: SystemOneDispatchDeps = { ...defaultSystemOneDispatchDeps, ...overrides };
  const candidates = input.candidates.slice(0, SYSTEMONE_MAX_FALLBACK_CANDIDATES);
  const outcome: Outcome = { upstream: null, diagnostic: null };

  for (const candidate of candidates) {
    // Routing may have widened the key's access: the request-level policy saw
    // the client's id (a bare alias), so each candidate is re-checked against
    // the canonical `<provider>/<model>` id before a credential is selected.
    input.signal?.throwIfAborted();
    const rejection = await abortable(input.signal!, () =>
      deps.validateRoutingTarget(candidate.canonicalModel)
    );
    if (rejection) {
      outcome.diagnostic = rejection;
      continue;
    }

    const response = await attemptCandidate(candidate, input, deps, outcome);
    if (response) return response;
  }

  return (
    outcome.upstream ??
    outcome.diagnostic ??
    errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No System One backend is available for ${input.requestedModel}`
    )
  );
}

async function authorizePhysicalAttempt(
  candidate: SystemOneCandidate,
  input: SystemOneDispatchInput,
  deps: SystemOneDispatchDeps,
  credentials?: SystemOneProxyOptions["credentials"]
): Promise<Response | null> {
  input.signal?.throwIfAborted();
  const tokenRejection = validateCandidateTokenBudget(input.apiKeyInfo?.id, candidate);
  if (tokenRejection) return tokenRejection;
  try {
    const rejection = await abortable(input.signal!, () =>
      deps.authorizeAttempt(candidate, credentials)
    );
    input.signal?.throwIfAborted();
    return rejection;
  } catch (error) {
    if (input.signal?.aborted) throw error;
    return errorResponse(503, "System One authorization policy unavailable", {
      code: "systemone_authorization_unavailable",
    });
  }
}

/** Dispatch budget includes canonical target checks, selection, queuing and every attempt. */
export const SYSTEMONE_REQUEST_TIMEOUT_MS = 30_000;

async function abortable<T>(signal: AbortSignal, run: () => Promise<T>): Promise<T> {
  signal.throwIfAborted();
  let onAbort: () => void;
  const aborted = new Promise<never>((_resolve, reject) => {
    onAbort = () => reject(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    return await Promise.race([run(), aborted]);
  } finally {
    signal.removeEventListener("abort", onAbort!);
  }
}

export async function dispatchSystemOne(
  input: SystemOneDispatchInput,
  overrides: Partial<SystemOneDispatchDeps> = {}
): Promise<Response> {
  const requested = input.timeoutMs;
  const timeoutMs =
    typeof requested === "number" && Number.isFinite(requested) && requested > 0
      ? Math.min(SYSTEMONE_REQUEST_TIMEOUT_MS, requested)
      : SYSTEMONE_REQUEST_TIMEOUT_MS;
  const deadline = AbortSignal.timeout(timeoutMs);
  const signal = input.signal ? AbortSignal.any([input.signal, deadline]) : deadline;
  try {
    return await dispatchWithinBudget(
      { ...input, signal, requestDeadlineSignal: deadline },
      overrides
    );
  } catch (error) {
    if (!signal.aborted) throw error;
    return input.signal?.aborted
      ? errorResponse(499, "System One request aborted by caller")
      : errorResponse(504, "System One request deadline exceeded", { code: "upstream_timeout" });
  }
}
