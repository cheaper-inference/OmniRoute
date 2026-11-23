import {
  isAccountDataPolicyNotFoundResponse,
  isResourceNotFoundResponse,
} from "@omniroute/open-sse/services/errorClassifier.ts";

type HealthLogger = {
  info(tag: string, message: string): void;
};

export type Resource404CooldownBypass = {
  /** True only for an account-scoped data-policy 404: another account may serve the request. */
  shouldFallback: boolean;
  cooldownMs: 0;
};

/**
 * Return a no-cooldown decision when a 404 belongs to this request's resource,
 * rather than to the selected model, endpoint, account, or provider.
 */
export function getResource404Bypass(
  status: number,
  errorText: string,
  connectionId: string,
  logger: HealthLogger
): Resource404CooldownBypass | null {
  if (status !== 404 || !isResourceNotFoundResponse(errorText)) return null;
  // The request body, privacy preferences included, is resent unchanged to the next account.
  if (isAccountDataPolicyNotFoundResponse(errorText)) {
    logger.info(
      "AUTH",
      `${connectionId.slice(0, 8)} account data-policy 404; trying another account without cooldown`
    );
    return { shouldFallback: true, cooldownMs: 0 };
  }
  logger.info(
    "AUTH",
    `${connectionId.slice(0, 8)} request-resource 404; skipping model/account cooldown`
  );
  return { shouldFallback: false, cooldownMs: 0 };
}
