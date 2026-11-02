// @ts-nocheck
// Devin Desktop / Windsurf token refresh.
//
// Devin Auth has no OAuth refresh_token: the long-lived credential is the
// `auth1_…` token captured at sign-in, and exchanging it re-derives every other
// token (cockpit-tools `full_refresh_from_auth1`). That exchange is already
// implemented once in src/lib/oauth/services/devinAuth.ts, so this provider
// delegates to it rather than duplicating the protobuf RPCs.
import { devinAuth } from "../../../../src/lib/oauth/services/devinAuth.ts";
import type { RefreshLogger } from "../shared.ts";

/**
 * Refresh a Devin Desktop connection from its stored auth1 token.
 *
 * The auth1 token is persisted in providerSpecificData by the password-login
 * action. A connection created through plain `import_token` has no auth1 token
 * and therefore cannot be refreshed — return null so the caller marks the
 * connection expired instead of silently retrying a token that will never work.
 */
export async function refreshDevinDesktopToken(
  providerSpecificData: Record<string, unknown> | null | undefined,
  log?: RefreshLogger
): Promise<{ accessToken: string; providerSpecificData?: Record<string, unknown> } | null> {
  const auth1 = providerSpecificData?.devinAuth1Token;
  if (typeof auth1 !== "string" || !auth1.startsWith("auth1_")) {
    return null;
  }

  try {
    const result = await devinAuth.refreshFromAuth1(auth1);
    return {
      accessToken: result.ideToken,
      providerSpecificData: {
        ...(providerSpecificData ?? {}),
        devinSessionToken: result.sessionToken,
        devinAccountId: result.accountId ?? undefined,
        devinOrgId: result.orgId ?? undefined,
        devinIdeToken: result.ideToken,
      },
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", "Devin Desktop auth1 refresh failed", {
      code: error?.code ? String(error.code) : "unknown",
      token: devinAuth.describeToken(auth1),
    });
    return null;
  }
}
