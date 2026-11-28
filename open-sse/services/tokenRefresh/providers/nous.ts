import { buildFormParams, readRefreshErrorBody, type RefreshLogger } from "../shared.ts";
import { runCommittedWithProxyContext } from "../../../utils/proxyFetch.ts";

/**
 * Nous Research OAuth2 refresh.
 *
 * The Portal uses the same single POST endpoint for the device grant and for
 * refresh: `grant_type=refresh_token`, `client_id`, `refresh_token`.
 *
 * The refresh token is SINGLE USE and rotates — the response always carries a
 * replacement and the old one stops working at once. The caller must persist
 * the returned pair before the access token is used (getAccessToken's
 * per-connection mutex + onPersist already does this).
 *
 * `client_id` is the public Hermes Agent device client; Nous has no dynamic
 * registration. See NOUS_CONFIG in src/lib/oauth/constants/oauth.ts for the
 * identity note (the token carries `nous_client: hermes-agent`).
 */
const NOUS_TOKEN_URL = "https://portal.nousresearch.com/api/oauth/token";
const NOUS_CLIENT_ID = "hermes-cli";

/** Codes that mean the refresh token is dead and the user must sign in again. */
const TERMINAL_CODES = new Set([
  "invalid_grant",
  "invalid_request",
  "invalid_token",
  "expired_token",
]);

export async function refreshNousToken(
  refreshToken: string,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  try {
    const response = await runCommittedWithProxyContext(proxyConfig, () =>
      fetch(NOUS_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: buildFormParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: NOUS_CLIENT_ID,
        }),
      })
    );

    if (!response.ok) {
      const { rawText, code } = await readRefreshErrorBody(response);
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Nous token", {
        status: response.status,
        error: rawText.slice(0, 300),
      });
      if (code && TERMINAL_CODES.has(code)) {
        return { error: "unrecoverable_refresh_error", code };
      }
      return null;
    }

    const tokens = (await response.json()) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
    };

    if (!tokens.access_token) {
      log?.error?.("TOKEN_REFRESH", "Nous refresh returned no access token", {});
      return null;
    }

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Nous token", {
      hasNewAccessToken: true,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn: tokens.expires_in,
    };
  } catch (error) {
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing Nous token: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
