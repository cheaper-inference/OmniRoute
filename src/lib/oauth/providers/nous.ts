import { NOUS_CONFIG } from "../constants/oauth";

/**
 * Nous Research — OAuth 2.0 Device Authorization Grant (RFC 8628).
 *
 * Flow:
 *   1. POST {initiateUrl}  form: client_id, scope
 *      -> device_code, user_code, verification_uri, verification_uri_complete,
 *         expires_in, interval
 *   2. The user opens verification_uri_complete in any browser and approves.
 *   3. POST {tokenUrl}  form: grant_type=…device_code, client_id, device_code
 *      -> access_token, refresh_token, expires_in   (while pending: an OAuth
 *         error envelope with error=authorization_pending or slow_down)
 *
 * Differences from the Kilo/MegaBrain device flows this file is modelled on:
 *   - The token endpoint is a single POST for both polling and refresh; the
 *     device code travels in the form body, not as a URL path segment.
 *   - The access token lives ~1 hour and the refresh token is SINGLE USE and
 *     rotates on every refresh. Losing a rotated refresh token means the user
 *     must sign in again, so persistence must happen before the token is used.
 *   - An expired or already-consumed device code answers
 *     `{"error":"invalid_grant","error_description":"Invalid device code"}`,
 *     not the RFC's `expired_token`.
 */
const DEVICE_CODE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";

/** Errors that mean "keep polling": the user simply has not approved yet. */
const KEEP_POLLING = new Set(["authorization_pending", "slow_down"]);

type NousConfig = typeof NOUS_CONFIG;

function form(fields: Record<string, string>): URLSearchParams {
  return new URLSearchParams(fields);
}

async function postForm(url: string, body: URLSearchParams): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

/** The token endpoint answers JSON on success and an OAuth error envelope otherwise. */
async function readOAuthResponse(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { error: "invalid_response", error_description: text.slice(0, 200) };
  }
}

export const nous = {
  config: NOUS_CONFIG,
  flowType: "device_code",

  requestDeviceCode: async (config: NousConfig = NOUS_CONFIG) => {
    const response = await postForm(
      config.initiateUrl,
      form({ client_id: config.clientId, scope: config.scope })
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "Nous is rate-limiting device authorization requests. Wait a moment and try again."
        );
      }
      const detail = await response.text();
      throw new Error(
        `Nous device authorization failed (${response.status}): ${detail.slice(0, 200)}`
      );
    }

    const data = (await response.json()) as Record<string, unknown>;
    const deviceCode = String(data.device_code ?? "");
    if (!deviceCode) {
      throw new Error("Nous device authorization returned no device_code.");
    }

    const verificationUri = String(data.verification_uri ?? "");
    return {
      device_code: deviceCode,
      user_code: String(data.user_code ?? ""),
      verification_uri: verificationUri,
      verification_uri_complete: String(data.verification_uri_complete ?? verificationUri),
      expires_in: Number(data.expires_in ?? 600),
      // The server's interval is advisory; the client clamps its own minimum.
      interval: Number(data.interval ?? 5),
    };
  },

  pollToken: async (config: NousConfig, deviceCode: string) => {
    let response: Response;
    try {
      response = await postForm(
        config.tokenUrl,
        form({
          grant_type: DEVICE_CODE_GRANT,
          client_id: config.clientId,
          device_code: deviceCode,
        })
      );
    } catch (error) {
      // A transport blip is not a denial — keep the ticket alive.
      return {
        ok: false,
        data: { error: "authorization_pending", error_description: String(error).slice(0, 200) },
      };
    }

    const data = await readOAuthResponse(response);

    if (response.ok && data.access_token) {
      return {
        ok: true,
        data: {
          access_token: String(data.access_token),
          refresh_token: data.refresh_token ? String(data.refresh_token) : null,
          expires_in: Number(data.expires_in ?? 3599),
          token_type: String(data.token_type ?? "Bearer"),
          scope: data.scope ? String(data.scope) : config.scope,
        },
      };
    }

    const code = String(data.error ?? "");
    if (KEEP_POLLING.has(code)) {
      return { ok: false, data: { error: code } };
    }

    // 408 / 429 / 5xx with a non-OAuth body: transient, so keep polling rather
    // than burning the user's ticket on a provider hiccup.
    if (!code && (response.status === 408 || response.status === 429 || response.status >= 500)) {
      return { ok: false, data: { error: "authorization_pending" } };
    }

    return {
      ok: false,
      data: {
        // The Portal answers `invalid_grant` for an expired or reused device
        // code; surface it as the RFC name so the UI messaging is right.
        error: code === "invalid_grant" ? "expired_token" : code || "poll_failed",
        error_description: String(data.error_description ?? `poll failed (${response.status})`),
      },
    };
  },

  mapTokens: (tokens: Record<string, unknown>) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? null,
    expiresIn: tokens.expires_in ?? null,
    email: null,
  }),
};

export default nous;
