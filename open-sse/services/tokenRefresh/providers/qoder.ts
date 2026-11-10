// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { PROVIDERS, OAUTH_ENDPOINTS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildFormParams, extractOAuthErrorCode } from "../shared.ts";
import { getQoderMachineId } from "../../../utils/qoderDevice.ts";

const QODER_DEVICE_DEFAULT_EXPIRES_IN = 2592000;
const QODER_DEVICE_UNRECOVERABLE_STATUSES = new Set([400, 401, 403, 404, 410]);

function toQoderDeviceCredentials(json, previousRefreshToken) {
  const nested = json?.data;
  const payload = (nested && typeof nested === "object" ? nested : json) || {};
  return {
    accessToken: payload.token || payload.access_token,
    refreshToken: payload.refresh_token || payload.refreshToken || previousRefreshToken,
    expiresIn: payload.expires_in || payload.expiresIn || QODER_DEVICE_DEFAULT_EXPIRES_IN,
  };
}

async function handleQoderDeviceRefreshFailure(response, log) {
  const errorText = await response.text();
  log?.error?.("TOKEN_REFRESH", "Failed to refresh Qoder device token", {
    status: response.status,
    error: errorText,
  });
  if (QODER_DEVICE_UNRECOVERABLE_STATUSES.has(response.status)) {
    return { error: "unrecoverable_refresh_error", code: "invalid_grant" };
  }
  return null;
}

async function refreshQoderDeviceToken(refreshToken, log, proxyConfig) {
  const refreshUrl =
    process.env.QODER_DEVICE_REFRESH_URL || "https://center.qoder.sh/api/v1/deviceToken/refresh";
  const machineId = getQoderMachineId();

  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          machine_id: machineId,
        }),
      })
    );

    if (!response.ok) return handleQoderDeviceRefreshFailure(response, log);

    const credentials = toQoderDeviceCredentials(await response.json(), refreshToken);
    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Qoder device token", {
      hasNewAccessToken: !!credentials.accessToken,
      hasNewRefreshToken: !!credentials.refreshToken,
      expiresIn: credentials.expiresIn,
    });
    return credentials;
  } catch (err: unknown) {
    log?.error?.("TOKEN_REFRESH", "Network error refreshing Qoder device token", {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

/** Legacy OAuth fallback with basic auth (operator-configured QODER_OAUTH_*). */
async function refreshQoderLegacyToken(refreshToken, log, proxyConfig) {
  if (!OAUTH_ENDPOINTS.qoder.token || !PROVIDERS.qoder.clientId || !PROVIDERS.qoder.clientSecret) {
    log?.warn?.(
      "TOKEN_REFRESH",
      "Qoder OAuth refresh skipped: browser OAuth is not configured in this environment"
    );
    return null;
  }

  const basicAuth = btoa(`${PROVIDERS.qoder.clientId}:${PROVIDERS.qoder.clientSecret}`);

  const response = await runWithProxyContext(proxyConfig, () =>
    fetch(OAUTH_ENDPOINTS.qoder.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: buildFormParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: PROVIDERS.qoder.clientId,
        client_secret: PROVIDERS.qoder.clientSecret,
      }),
    })
  );

  if (!response.ok) {
    const errorText = await response.text();
    log?.error?.("TOKEN_REFRESH", "Failed to refresh Qoder token", {
      status: response.status,
      error: errorText,
    });
    const code = extractOAuthErrorCode(errorText);
    if (code === "invalid_grant" || code === "invalid_request") {
      return { error: "unrecoverable_refresh_error", code };
    }
    return null;
  }

  const tokens = await response.json();

  log?.info?.("TOKEN_REFRESH", "Successfully refreshed Qoder token", {
    hasNewAccessToken: !!tokens.access_token,
    hasNewRefreshToken: !!tokens.refresh_token,
    expiresIn: tokens.expires_in,
  });

  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token || refreshToken,
    expiresIn: tokens.expires_in,
  };
}

/**
 * Specialized refresh for Qoder OAuth / Device Flow tokens.
 * Only device-flow refresh tokens (drt-) belong to the device endpoint; a legacy
 * OAuth refresh token must never be sent there, even without a client secret.
 */
export async function refreshQoderToken(refreshToken, log, proxyConfig: unknown = null) {
  const isDeviceToken = typeof refreshToken === "string" && refreshToken.startsWith("drt-");
  return isDeviceToken
    ? refreshQoderDeviceToken(refreshToken, log, proxyConfig)
    : refreshQoderLegacyToken(refreshToken, log, proxyConfig);
}
