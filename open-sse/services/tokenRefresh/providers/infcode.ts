// InfCode (Token Infinity) OAuth token refresh.
//
// Verified live contract (2026-11-02, Tokfinity.infcode v2.8.0):
//   POST {base}/acode/v1/refresh_token
//     Content-Type: application/json
//     Body: { refresh_token: "<refreshToken>", rotate_refresh: true }
//   -> 200 { access_token, refresh_token }
//   -> 401/403: refresh token is dead (unrecoverable)
//
// Unlike standard form-urlencoded OAuth2, InfCode uses a JSON body and
// rotates the refresh token (rotate_refresh: true), so a reused refresh
// token is consumed and a new one issued on every refresh.
import { OAUTH_ENDPOINTS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { extractOAuthErrorCode, type RefreshLogger } from "../shared.ts";

/**
 * Remaining lifetime (seconds) of an InfCode access token, read from the JWT
 * `exp` claim.
 *
 * The refresh endpoint answers with ONLY { access_token, refresh_token } — no
 * `expires_in` (verified live 2026-11-05). The refresh writer
 * (`src/lib/usage/providerLimits/credentialRefresh.ts`) only rewrites
 * `expiresAt`/`tokenExpiresAt` when the result carries one of those, so
 * without this the connection keeps the PREVIOUS expiry forever:
 *
 *   - Provider Limits renders a red "Token expired" badge on a live
 *     connection (the badge is informational and reads the stored timestamp);
 *   - `needsRefresh()` keeps seeing a past expiry, so every quota sync
 *     refreshes again — rotating the single-use refresh token
 *     (rotate_refresh: true) on every sync.
 *
 * Expiry comes from our own token, fetched over TLS from the provider, so the
 * claim is metadata here — not an authorization decision — and does not need
 * signature verification. Returns undefined for non-JWT or already-expired
 * tokens so the caller keeps its previous behaviour.
 */
export function infCodeJwtExpiresIn(
  accessToken: unknown,
  nowMs: number = Date.now()
): number | undefined {
  if (typeof accessToken !== "string") return undefined;
  const parts = accessToken.split(".");
  if (parts.length < 2 || !parts[1]) return undefined;

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    const exp = Number((payload as { exp?: unknown } | null)?.exp);
    if (!Number.isFinite(exp)) return undefined;
    const remaining = Math.floor(exp - nowMs / 1000);
    return remaining > 0 ? remaining : undefined;
  } catch {
    return undefined;
  }
}

/** Positive whole seconds, or undefined for anything the token endpoint omits. */
function normalizeExpiresIn(value: unknown): number | undefined {
  const seconds = typeof value === "string" ? Number(value) : value;
  return typeof seconds === "number" && Number.isFinite(seconds) && seconds > 0
    ? Math.floor(seconds)
    : undefined;
}

/** Log a failed refresh and report whether the refresh token itself is dead. */
async function handleRefreshFailure(response: Response, log?: RefreshLogger) {
  const errorText = await response.text();
  log?.error?.("TOKEN_REFRESH", "Failed to refresh InfCode token", {
    status: response.status,
    error: errorText.slice(0, 300),
  });

  // 401/403 on the token endpoint means the refresh credential itself was
  // rejected (rotated away, expired, or invalid). Retrying with the same
  // dead refresh token will never succeed — surface re-auth.
  if (response.status === 401 || response.status === 403) {
    const code = extractOAuthErrorCode(errorText) || "unauthorized";
    return { error: "unrecoverable_refresh_error", code };
  }

  const code = extractOAuthErrorCode(errorText);
  if (code === "invalid_grant" || code === "invalid_request") {
    return { error: "unrecoverable_refresh_error", code };
  }

  return null;
}

/**
 * Specialized refresh for InfCode OAuth tokens.
 */
export async function refreshInfCodeToken(
  refreshToken: string,
  log?: RefreshLogger,
  proxyConfig: unknown = null
) {
  const endpoint = OAUTH_ENDPOINTS.infcode.token;
  if (!endpoint) {
    log?.warn?.("TOKEN_REFRESH", "InfCode OAuth refresh skipped: token endpoint is not configured");
    return null;
  }

  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          rotate_refresh: true,
        }),
      })
    );

    if (!response.ok) return await handleRefreshFailure(response, log);

    const tokens = await response.json();

    // The endpoint normally omits expires_in; fall back to the access token's
    // own exp claim so the stored expiry tracks the credential (see
    // infCodeJwtExpiresIn above).
    const expiresIn =
      normalizeExpiresIn(tokens.expires_in) ?? infCodeJwtExpiresIn(tokens.access_token);

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed InfCode token", {
      hasNewAccessToken: !!tokens.access_token,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log?.error?.("TOKEN_REFRESH", `Network error refreshing InfCode token: ${message}`);
    return null;
  }
}
