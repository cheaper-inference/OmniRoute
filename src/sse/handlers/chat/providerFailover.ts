/**
 * Provider failover for a bare model id that several active providers serve.
 *
 * Provider inference ranks the active candidates for an unprefixed id; it used to
 * hand dispatch only the first, so that provider's quota, outage or timeout failed
 * the request while another connected provider served the same model. Here the
 * request is dispatched as the same direct request pinned to the next candidate.
 *
 * - Which failures move on is the failover policy's call (`shouldFailover`):
 *   rate limits, timeouts, network errors, 5xx and exhausted quota; never auth,
 *   permission or invalid-request errors. At most `maxProviderAttempts` providers.
 * - Only a failed response moves on, so nothing fails over after the first
 *   streamed byte (a started stream is a 2xx response), a request that
 *   continues another provider's session is pinned to it, and a session-ownership
 *   fail-close (`markProviderBoundResponse`) is returned unchanged.
 * - Every attempt but the last runs with `providerFailoverPending`: no
 *   cooldown-wait restart, no same-account transport retry and no emergency
 *   model swap while another provider of the requested model is still queued.
 * - An alternate is authorized as if inference had picked it: the dispatch's own
 *   resolved-model gate, the bare id as request context, no combo grant. A
 *   target the key does not admit is skipped before any upstream call.
 */

import {
  DEFAULT_FAILOVER_POLICY,
  shouldFailover,
  type FailoverPolicy,
} from "@/lib/routing/adaptiveRouting";
import { classifyProviderFailure } from "@/lib/resilience/failureClassification";
import { getModelInfo } from "../../services/model";
import * as log from "../../utils/logger";
import { isProviderBoundResponse } from "./providerBoundResponse.ts";
import { createVisibleResolvedModelGate } from "./resolvedModelPolicy.ts";

export interface ProviderFailoverAttemptOptions {
  /** Another provider of the requested model is queued after this attempt. */
  providerFailoverPending?: boolean;
  /** The admitted request identity: the bare id the client asked for. */
  authorizationContextModel?: string;
  /** Providers tried before this one (response attribution). */
  fallbackAttempts?: number;
}

/** Why a request must stay on the route inference picked. */
export interface ProviderFailoverPins {
  forcedConnectionId?: string | null;
  managedLease?: unknown;
  comboLiveTest?: boolean;
  /**
   * The body continues a session that another provider served: opaque reasoning,
   * continuation ids, a response id, or a Muse session that already has an owner.
   * Replaying it on another provider would move provider-bound state across accounts.
   */
  boundContinuation?: boolean;
}

function isPinned(pins: ProviderFailoverPins): boolean {
  const connection =
    typeof pins.forcedConnectionId === "string" ? pins.forcedConnectionId.trim() : "";
  return connection.length > 0 || Boolean(pins.managedLease) || pins.comboLiveTest === true;
}

async function admittedAlternates(opts: {
  modelStr: string;
  apiKeyInfo: unknown;
  request: Request | null | undefined;
  limit: number;
}): Promise<string[]> {
  const info = (await getModelInfo(opts.modelStr).catch(() => null)) as {
    failoverTargets?: unknown;
  } | null;
  const targets = Array.isArray(info?.failoverTargets)
    ? info.failoverTargets.filter((t): t is string => typeof t === "string")
    : [];
  const admitted: string[] = [];
  for (const target of targets) {
    if (admitted.length >= opts.limit) break;
    const resolved = (await getModelInfo(target).catch(() => null)) as {
      provider?: string | null;
      model?: string | null;
    } | null;
    if (!resolved?.provider || !resolved.model) continue;
    const gate = createVisibleResolvedModelGate({
      apiKeyInfo: opts.apiKeyInfo,
      request: opts.request,
      contextModel: opts.modelStr,
      comboGrantsTargets: false,
      provider: resolved.provider,
      model: resolved.model,
      modelStr: target,
    });
    if (await gate([`${resolved.provider}/${resolved.model}`])) {
      log.debug("ROUTING", `${opts.modelStr}: failover target ${target} not admitted for this key`);
      continue;
    }
    admitted.push(target);
  }
  return admitted;
}

async function failureOf(response: Response, target: string) {
  let message = "";
  try {
    message = (await response.clone().text()).slice(0, 2000);
  } catch {
    // An unreadable body still classifies by status.
  }
  return classifyProviderFailure({ providerId: target, statusCode: response.status, message });
}

/** How many further providers may serve the request (0 keeps the single dispatch). */
function failoverTargetBudget(
  policy: FailoverPolicy,
  modelStr: string,
  pins: ProviderFailoverPins
): number {
  if (!policy.allowCrossProviderFallback) return 0;
  if (policy.maxProviderAttempts <= 1) return 0;
  if (modelStr.includes("/")) return 0;
  if (isPinned(pins)) return 0;
  if (pins.boundContinuation === true) return 0;
  return policy.maxProviderAttempts - 1;
}

/** The options an attempt gets: pending flag while queued, attribution after the first. */
function attemptOptions(
  attempts: readonly string[],
  index: number,
  modelStr: string
): ProviderFailoverAttemptOptions {
  const last = index === attempts.length - 1;
  return {
    ...(last ? {} : { providerFailoverPending: true }),
    ...(index > 0 ? { authorizationContextModel: modelStr, fallbackAttempts: index } : {}),
  };
}

/**
 * Dispatches `modelStr` as inference routes it and, when that fails in a way the
 * policy fails over on, as the same request pinned to the next active provider.
 * A prefixed id, a pinned request or a single candidate is dispatched exactly once.
 */
export async function dispatchWithProviderFailover(opts: {
  modelStr: string;
  apiKeyInfo: unknown;
  request: Request | null | undefined;
  signal?: AbortSignal | null;
  pins: ProviderFailoverPins;
  dispatch: (modelStr: string, options: ProviderFailoverAttemptOptions) => Promise<Response>;
  policy?: FailoverPolicy;
}): Promise<Response> {
  const policy = opts.policy ?? DEFAULT_FAILOVER_POLICY;
  const budget = failoverTargetBudget(policy, opts.modelStr, opts.pins);
  const alternates = budget > 0 ? await admittedAlternates({ ...opts, limit: budget }) : [];
  if (alternates.length === 0) return opts.dispatch(opts.modelStr, {});

  const attempts = [opts.modelStr, ...alternates];
  for (let index = 0; ; index++) {
    const response = await opts.dispatch(
      attempts[index],
      attemptOptions(attempts, index, opts.modelStr)
    );
    if (response.ok || index === attempts.length - 1 || opts.signal?.aborted) return response;
    // A session-ownership fail-close refuses this body on purpose: never replay it.
    if (isProviderBoundResponse(response)) return response;
    const failure = await failureOf(response, attempts[index]);
    if (!shouldFailover(failure, policy)) return response;
    log.warn(
      "ROUTING",
      `${opts.modelStr}: ${attempts[index]} failed (${response.status} ${failure.type}), failing over to ${attempts[index + 1]}`
    );
    await response.body?.cancel().catch(() => {});
  }
}
