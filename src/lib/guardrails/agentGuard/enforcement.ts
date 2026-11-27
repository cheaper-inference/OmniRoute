/**
 * Agent guard enforcement: the `block`-mode decision for a client on the
 * provider a request resolved to.
 *
 * `decideAgentEnforcement` assumes the caller already checked that the mode is
 * `block`; it reads no header for a provider the guard does not cover, and
 * reads `AGENT_GUARD_STRICT` only for an unidentified client.
 * `wouldRefuseAgent` checks the mode itself, never throws and keeps no state;
 * an internal error answers `false` and writes one `warn` line to the logger it
 * is given.
 */

import { resolveProviderId } from "@/shared/constants/providers";
import { classifyClientAgent, type AgentClassification } from "./classifier";
import { writeAgentGuardFailOpen, type AgentGuardLogger } from "./logLine";
import { evaluateAgentPolicy, isGuardedProvider } from "./policy";
import { isAgentGuardStrict, resolveAgentGuardMode } from "./settings";

type HeadersLike = Headers | Record<string, unknown> | null | undefined;

export type AgentEnforcementDecision = {
  action: "flag" | "block";
  reason: string;
  /** Canonical provider id (`cc` becomes `claude`). */
  provider: string;
  classification: AgentClassification;
};

export function decideAgentEnforcement(
  headers: HeadersLike,
  provider: string | null | undefined
): AgentEnforcementDecision | null {
  if (!provider || !isGuardedProvider(provider)) return null;
  if (!headers) return null;
  const classification = classifyClientAgent(headers);
  const unidentified = !classification.official && !classification.thirdParty;
  const strict = unidentified ? isAgentGuardStrict() : false;
  const decision = evaluateAgentPolicy(classification, provider, { block: true, strict });
  if (decision.action === "allow") return null;
  return {
    action: decision.action,
    reason: decision.reason,
    provider: resolveProviderId(provider),
    classification,
  };
}

/**
 * True when `block` mode would refuse this client on `provider`. Without a
 * provider, asks about the guarded providers (`claude`). Any error is `false`,
 * reported as one `warn` line to `log` when one is given.
 */
export function wouldRefuseAgent(input: {
  headers: HeadersLike;
  provider?: string | null;
  log?: AgentGuardLogger;
}): boolean {
  try {
    if (resolveAgentGuardMode() !== "block") return false;
    const provider = input.provider === undefined ? "claude" : input.provider;
    return decideAgentEnforcement(input.headers, provider)?.action === "block";
  } catch (error) {
    writeAgentGuardFailOpen(input.log, error);
    return false;
  }
}
