/**
 * MiniMax Code account protocol — shared constants.
 *
 * The MiniMax Code CLI and the desktop app authenticate against the MiniMax
 * account service with the OAuth2 device-code grant (RFC 8628) plus PKCE
 * (S256). The dashboard's device-code login speaks the same protocol, so the
 * endpoint shapes live here and are shared by both writers of the credential.
 *
 * The account host depends on the region of the account: the global service
 * lives on account.minimax.io, the Chinese one on account.minimax.cn. The
 * region is the same one the local profile lives in (see
 * open-sse/executors/minimaxCodeGateway.ts), so a credential written by the
 * dashboard is refreshed by the same host the CLI talks to.
 */

export const MINIMAX_CODE_ACCOUNT_BASES: Readonly<Record<string, string>> = {
  en: "https://account.minimax.io",
  cn: "https://account.minimax.cn",
};

export const MINIMAX_CODE_DEFAULT_REGION = "en";

/** OAuth2 device-code grant (RFC 8628). */
export const MINIMAX_CODE_DEVICE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";

/** Scope the MiniMax Code agent requests. */
export const MINIMAX_CODE_SCOPE = "agent.default";

/** Audience the access token is issued for. */
export const MINIMAX_CODE_AUDIENCE = "agent-backend";

/** User agent the account endpoints expect from the CLI. */
export const MINIMAX_CODE_USER_AGENT = "minimax-code-cli";

/** PKCE code challenge method of the device-code grant. */
export const MINIMAX_CODE_CODE_CHALLENGE_METHOD = "S256";

/** Normalize a region key ("EN", " cn ") to its canonical form. */
export function normalizeMinimaxCodeRegion(region?: string | null): string {
  const normalized = (region || "").trim().toLowerCase();
  return normalized || MINIMAX_CODE_DEFAULT_REGION;
}

/** Account host of a region; an unknown region falls back to the global one. */
export function resolveMinimaxCodeAccountBase(region?: string | null): string {
  const normalized = normalizeMinimaxCodeRegion(region);
  return MINIMAX_CODE_ACCOUNT_BASES[normalized] || MINIMAX_CODE_ACCOUNT_BASES.en;
}
