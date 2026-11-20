/**
 * Agent guard policy: canonical provider from a model string, and the
 * allow/flag/block decision for a classified client on that provider.
 *
 * Pure: no I/O, no state. Without an `enforcement` argument the decision never
 * blocks (`flag` only marks a request for observation); `block` is returned
 * only when the caller asks for enforcement.
 */

import { resolveProviderId } from "@/shared/constants/providers";
import { parseQuotaModelName } from "@/lib/quota/quotaModelNaming";
import type { AgentClassification } from "./classifier";

/** Providers the guard covers (canonical ids). Any other provider is always allowed. */
const GUARDED_PROVIDERS = new Set(["claude", "anthropic"]);

/**
 * Canonical provider id for a model string such as `cc/claude-sonnet-5` or
 * `qtSd/<group>/<provider>/<model>`. Returns null when the string carries no
 * provider prefix.
 */
export function providerFromModelString(model: string | null | undefined): string | null {
  const trimmed = (model ?? "").trim();
  if (!trimmed) return null;
  const quota = parseQuotaModelName(trimmed);
  let prefix: string;
  if (quota) {
    prefix = quota.provider;
  } else {
    const slash = trimmed.indexOf("/");
    if (slash === -1) return null;
    prefix = trimmed.slice(0, slash);
  }
  prefix = prefix.trim();
  return prefix ? resolveProviderId(prefix) : null;
}

/** True when the provider (id or alias, e.g. `cc`) is one the guard covers. */
export function isGuardedProvider(provider: string | null | undefined): boolean {
  if (!provider) return false;
  return GUARDED_PROVIDERS.has(resolveProviderId(provider));
}

/**
 * Decision for a classified client on a provider. With `enforcement.block`, a
 * known third-party agent is blocked, and an unidentified client is blocked
 * only with `enforcement.strict` (otherwise flagged).
 */
export function evaluateAgentPolicy(
  classification: AgentClassification,
  provider: string | null,
  enforcement?: { block: boolean; strict: boolean }
): { action: "allow" | "flag" | "block"; reason: string } {
  const canonical = provider ? resolveProviderId(provider) : null;
  if (canonical === null || !GUARDED_PROVIDERS.has(canonical)) {
    return { action: "allow", reason: "provider not observed" };
  }
  if (classification.official) {
    return { action: "allow", reason: `official agent ${classification.agent} on ${canonical}` };
  }
  const block = enforcement?.block === true;
  if (classification.thirdParty) {
    return block
      ? {
          action: "block",
          reason: `blocked third-party agent ${classification.agent} on ${canonical}`,
        }
      : { action: "flag", reason: `third-party agent ${classification.agent} on ${canonical}` };
  }
  if (block && enforcement?.strict === true) {
    return { action: "block", reason: `blocked unidentified agent on ${canonical}` };
  }
  return { action: "flag", reason: `unidentified agent on ${canonical}` };
}
