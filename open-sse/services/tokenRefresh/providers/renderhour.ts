import { OAUTH_ENDPOINTS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildFormParams, type RefreshLogger } from "../shared.ts";

const UNRECOVERABLE_CODES = new Set(["invalid_grant", "invalid_token", "token_expired"]);

function readErrorCode(errorText: string): string | null {
  try {
    const parsed = JSON.parse(errorText);
    return parsed?.error?.code || (typeof parsed?.error === "string" ? parsed.error : null);
  } catch {
    return null;
  }
}

// A refused refresh: a used or expired refresh token (or a 401) needs a new sign-in; anything
// else is transient and retried with backoff.
async function refreshFailure(response: Response, log: RefreshLogger) {
  const errorText = await response.text();
  const errorCode = readErrorCode(errorText);
  if ((errorCode && UNRECOVERABLE_CODES.has(errorCode)) || response.status === 401) {
    const code = errorCode || "unauthorized";
    log?.error?.(
      "TOKEN_REFRESH",
      "RenderHour refresh token already used or expired. Sign in again.",
      {
        status: response.status,
        errorCode: code,
      }
    );
    return { error: "unrecoverable_refresh_error", code };
  }
  log?.error?.("TOKEN_REFRESH", "Failed to refresh RenderHour token", {
    status: response.status,
    error: errorText,
  });
  return null;
}

/**
 * Specialized refresh for RenderHour OAuth tokens. RenderHour rotates refresh tokens
 * (rhrt_*): each refresh returns a new pair and the old one stops working at once. Access
 * tokens (rhat_*) last an hour, refresh tokens 30 days.
 */
export async function refreshRenderhourToken(
  refreshToken: string,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(OAUTH_ENDPOINTS.renderhour.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: buildFormParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: OAUTH_ENDPOINTS.renderhour.clientId,
        }),
      })
    );
    if (!response.ok) return await refreshFailure(response, log);

    const tokens = (await response.json()) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
    };
    log?.info?.("TOKEN_REFRESH", "Successfully refreshed RenderHour token", {
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
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing RenderHour token: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
