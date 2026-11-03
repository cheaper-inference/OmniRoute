// @ts-nocheck
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
import { extractOAuthErrorCode } from "../shared.ts";

/**
 * Specialized refresh for InfCode OAuth tokens.
 */
export async function refreshInfCodeToken(refreshToken, log, proxyConfig: unknown = null) {
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

    if (!response.ok) {
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

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed InfCode token", {
      hasNewAccessToken: !!tokens.access_token,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn: tokens.expires_in,
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Network error refreshing InfCode token: ${error.message}`);
    return null;
  }
}
