/**
 * Agent guard policy: canonical provider from a model string, and the
 * allow/flag decision for a classified client on that provider.
 *
 * Pure: no I/O, no state. The decision never blocks; `flag` only marks a
 * request for observation.
 */

import { resolveProviderId } from "@/shared/constants/providers";
import { parseQuotaModelName } from "@/lib/quota/quotaModelNaming";
import type { AgentClassification } from "./classifier";

/** Providers whose requests are observed. Any other provider is always allowed. */
const OBSERVED_PROVIDERS = new Set(["claude", "anthropic"]);

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

export function evaluateAgentPolicy(
  classification: AgentClassification,
  provider: string | null
): { action: "allow" | "flag"; reason: string } {
  if (provider === null || !OBSERVED_PROVIDERS.has(provider)) {
    return { action: "allow", reason: "provider not observed" };
  }
  if (classification.official) {
    return { action: "allow", reason: `official agent ${classification.agent} on ${provider}` };
  }
  if (classification.thirdParty) {
    return {
      action: "flag",
      reason: `third-party agent ${classification.agent} on ${provider}`,
    };
  }
  return { action: "flag", reason: `unidentified agent on ${provider}` };
}
