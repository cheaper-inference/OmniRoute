/**
 * Kiro-owned Q Developer profiles that the Kiro IDE (1.4.178, `getFixedProfileArn`) uses for
 * Builder ID and GitHub/Google logins, which have no profile of their own. Copied from the IDE
 * bundle; they are resource identifiers, not credentials.
 *
 * Live 2026-11-16 (Builder ID token, US egress):
 *   - ListAvailableModels without a profileArn: 400 "Invalid profileArn."; with the BuilderId
 *     ARN: the free-tier catalog.
 *   - generateAssistantResponse without a profileArn: 400 "profileArn is required for this
 *     request." on runtime.us-east-1.kiro.dev, codewhisperer.us-east-1 and q.us-east-1, for
 *     KiroIDE-1.4.121 and 1.4.178 alike; with the BuilderId ARN the request passes that check.
 *   - The social ARN with a Builder ID token: 403 "Invalid token". The two are not interchangeable.
 *
 * If Kiro changes these ARNs, Builder ID / social catalogs and inference fail with the 400s above
 * until they are updated here.
 */
export const KIRO_BUILDER_ID_PROFILE_ARN =
  "arn:aws:codewhisperer:us-east-1:638616132270:profile/AAAACCCCXXXX";
export const KIRO_SOCIAL_PROFILE_ARN =
  "arn:aws:codewhisperer:us-east-1:699475941385:profile/EHGA3GRVQMUK";

/**
 * The fixed profileArn for a login that has none of its own, or null. Callers prefer a stored
 * profileArn (the IDE also prefers a social login's own).
 */
export function fixedKiroProfileArn(providerSpecificData: unknown): string | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const psd = providerSpecificData as Record<string, unknown>;
  if (psd.authMethod === "builder-id") return KIRO_BUILDER_ID_PROFILE_ARN;
  if (psd.authMethod === "imported") {
    const provider = String(psd.provider ?? "").toLowerCase();
    if (provider === "github" || provider === "google") return KIRO_SOCIAL_PROFILE_ARN;
  }
  return null;
}
