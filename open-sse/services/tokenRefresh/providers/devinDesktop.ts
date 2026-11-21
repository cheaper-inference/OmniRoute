// Devin Desktop / Windsurf token refresh.
//
// Devin Auth has no OAuth refresh_token: the long-lived credential is the
// `auth1_…` token captured at sign-in, and exchanging it re-derives every other
// token (cockpit-tools `full_refresh_from_auth1`). That exchange is already
// implemented once in src/lib/oauth/services/devinAuth.ts, so this provider
// delegates to it rather than duplicating the protobuf RPCs.
import { devinAuth } from "../../../../src/lib/oauth/services/devinAuth.ts";
import { opaqueTokenFingerprint } from "../../../utils/opaqueTokenFingerprint.ts";
import type { RefreshLogger } from "../shared.ts";

/**
 * True when this connection carries the long-lived `auth1_…` credential that a
 * Devin Auth password login stores. Such a connection refreshes without an OAuth
 * refresh_token; an `import_token` connection has no auth1 and cannot refresh.
 */
export function hasDevinAuth1Credential(
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  return devinAuth1From(providerSpecificData) !== null;
}

/** The stored `auth1_…` credential, or null when this connection has none. */
export function devinAuth1From(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  const auth1 = providerSpecificData?.devinAuth1Token;
  return typeof auth1 === "string" && auth1.startsWith("auth1_") ? auth1 : null;
}

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
  const auth1 = devinAuth1From(providerSpecificData);
  if (!auth1) {
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
      // Never log any part of the credential: `describeToken` returns short
      // tokens whole and the first 20 chars of longer ones, which is enough of
      // an `auth1_…` value to be a CWE-532 leak. A one-way fingerprint still
      // correlates the same credential across log lines.
      token: opaqueTokenFingerprint(auth1, { length: 16 }),
    });
    return null;
  }
}
