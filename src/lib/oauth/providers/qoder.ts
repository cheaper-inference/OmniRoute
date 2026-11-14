import { randomUUID } from "node:crypto";
import { getQoderMachineId } from "@omniroute/open-sse/utils/qoderDevice.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  isQoderDeviceToken,
  QODER_DEVICE_AUTH_METHOD,
} from "@omniroute/open-sse/services/qoderCapabilities.ts";
import { QODER_CONFIG } from "../constants/oauth";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";

const QODER_DEVICE_DEFAULT_EXPIRES_IN = 2592000;

/** Poll statuses center.qoder.sh uses for a not-yet-successful device authorization. */
const QODER_POLL_STATUS_ERRORS: Record<number, { error: string; error_description?: string }> = {
  // While waiting for user approval in the browser, center.qoder.sh returns HTTP 404.
  404: { error: "authorization_pending" },
  429: { error: "slow_down" },
  403: { error: "access_denied", error_description: "Authorization denied by user" },
  410: { error: "expired_token", error_description: "Authorization code expired" },
};

function qoderPollStatusError(response: Response) {
  const known = QODER_POLL_STATUS_ERRORS[response.status];
  if (known) return { ...known };
  if (!response.ok) {
    return { error: "poll_failed", error_description: `Poll failed: ${response.status}` };
  }
  return null;
}

/** Qoder wraps most responses in `{ data: {...} }`; accept both shapes. */
function unwrapQoderData(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const nested = record.data;
  return nested && typeof nested === "object" ? (nested as Record<string, unknown>) : record;
}

function firstQoderField(record: Record<string, unknown> | null, keys: string[]): unknown {
  for (const key of keys) {
    const value = record?.[key];
    if (value) return value;
  }
  return null;
}

function toQoderPollResult(body: unknown) {
  const payload = unwrapQoderData(body);
  const accessToken = firstQoderField(payload, ["token", "access_token"]);
  if (!accessToken) return { ok: false, data: { error: "authorization_pending" } };
  return {
    ok: true,
    data: {
      access_token: accessToken as string,
      refresh_token: (firstQoderField(payload, ["refresh_token", "refreshToken"]) || "") as string,
      expires_in: (firstQoderField(payload, ["expires_in", "expiresIn"]) ||
        QODER_DEVICE_DEFAULT_EXPIRES_IN) as number,
      token_type: "Bearer",
      _userEmail: (firstQoderField(payload, ["email", "userEmail"]) || "") as string,
    },
  };
}

/**
 * Qoder account sign-in (device code). SIGN-IN ONLY: the resulting `dt-`/`drt-`
 * tokens identify the account, but no supported Qoder endpoint accepts them for
 * chat, so these connections are refused by the executor and skipped by
 * connection selection (open-sse/services/qoderCapabilities.ts). Chat needs a
 * Personal Access Token (local qodercli) or a DashScope API key.
 */
export const qoder = {
  config: QODER_CONFIG,
  flowType: "device_code",

  /**
   * Request device authorization code and URL for Qoder device flow.
   * Direct native implementation reverse-engineered from Qoder CLI (`qodercli`).
   */
  requestDeviceCode: async (config: typeof QODER_CONFIG, codeChallenge?: string) => {
    const challenge = codeChallenge || generateCodeChallenge(generateCodeVerifier());
    const nonce = randomUUID();
    const machineId = getQoderMachineId();
    const clientId = config?.clientId || QODER_CONFIG.clientId;
    const authUrl =
      config?.deviceAuthUrl || config?.authorizeUrl || "https://qoder.com/device/selectAccounts";

    const params = new URLSearchParams({
      challenge,
      challenge_method: "S256",
      nonce,
      machine_id: machineId,
      client_id: clientId,
    });

    const verification_uri = authUrl;
    const verification_uri_complete = `${authUrl}?${params.toString()}`;

    return {
      device_code: nonce,
      user_code: nonce.slice(0, 8).toUpperCase(),
      verification_uri,
      verification_uri_complete,
      expires_in: 300,
      interval: 3,
    };
  },

  /**
   * Poll for approval of the device authorization code.
   */
  pollToken: async (config: typeof QODER_CONFIG, deviceCode: string, codeVerifier?: string) => {
    const pollBase = config?.pollUrl || "https://center.qoder.sh/api/v1/deviceToken/poll";
    const verifier = codeVerifier || "";
    const params = new URLSearchParams({
      nonce: deviceCode,
      verifier,
      challenge_method: "S256",
    });

    try {
      const response = await fetch(`${pollBase}?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const statusError = qoderPollStatusError(response);
      if (statusError) return { ok: false, data: statusError };

      return toQoderPollResult(await response.json());
    } catch (err: unknown) {
      // Hard Rule #12: the route returns error_description to the browser verbatim.
      const errorMsg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
      return {
        ok: false,
        data: { error: "network_error", error_description: errorMsg || "Network error" },
      };
    }
  },

  /**
   * After token approval, fetch user profile information using the access token.
   */
  postExchange: async (tokens: { access_token?: string }) => {
    const accessToken = tokens?.access_token;
    if (!accessToken) return null;
    try {
      const userInfoUrl = QODER_CONFIG.userInfoUrl || "https://center.qoder.sh/api/v1/userinfo";
      const response = await fetch(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) return null;
      const data = await response.json();
      return data?.data || data || null;
    } catch {
      return null;
    }
  },

  /**
   * Map token response and optional profile metadata to OmniRoute connection format.
   */
  mapTokens: (tokens: Record<string, unknown>, extra: Record<string, unknown> | null = null) => {
    const user = unwrapQoderData(extra);
    const email =
      (firstQoderField(user, ["email", "mail"]) as string) ||
      (typeof tokens._userEmail === "string" ? tokens._userEmail : null);
    const name =
      (firstQoderField(user, ["nickname", "name", "username"]) as string) || email || "Qoder User";
    // #18737: never mirror the device access token into apiKey — the executor
    // sends apiKey upstream as a Bearer credential. The device token stays in
    // accessToken/refreshToken (encrypted at rest) for refresh and identity only.
    const reportedApiKey = firstQoderField(user, ["apiKey", "api_key"]) as string | null;
    const apiKey = reportedApiKey && !isQoderDeviceToken(reportedApiKey) ? reportedApiKey : null;

    return {
      accessToken: tokens.access_token as string | undefined,
      refreshToken: tokens.refresh_token as string | undefined,
      expiresIn: tokens.expires_in as number | undefined,
      tokenType: (tokens.token_type as string) || "Bearer",
      apiKey,
      email,
      name,
      displayName: name,
      providerSpecificData: {
        userId: firstQoderField(user, ["id", "userId"]) as string | null,
        email,
        name,
        accountType: firstQoderField(user, ["accountType", "type"]) as string | null,
        // Sign-in only: connection selection and the executor refuse chat for it.
        authMethod: QODER_DEVICE_AUTH_METHOD,
        chatSupported: false,
      },
    };
  },

  /**
   * Backward-compatibility helper for buildAuthUrl.
   */
  buildAuthUrl: (
    config: typeof QODER_CONFIG,
    _redirectUri?: string,
    _state?: string,
    codeChallenge?: string
  ) => {
    const challenge = codeChallenge || generateCodeChallenge(generateCodeVerifier());
    const nonce = randomUUID();
    const machineId = getQoderMachineId();
    const clientId = config?.clientId || QODER_CONFIG.clientId;
    const authUrl =
      config?.authorizeUrl || config?.deviceAuthUrl || "https://qoder.com/device/selectAccounts";

    const params = new URLSearchParams({
      challenge,
      challenge_method: "S256",
      nonce,
      machine_id: machineId,
      client_id: clientId,
    });
    return `${authUrl}?${params.toString()}`;
  },

  /**
   * Backward-compatibility helper for exchangeToken.
   */
  exchangeToken: async (config: typeof QODER_CONFIG, code: string, redirectUri: string) => {
    if (!config?.tokenUrl) {
      throw new Error("Qoder tokenUrl not configured");
    }
    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };

    if (config.clientSecret) {
      const basicAuth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
      headers.Authorization = `Basic ${basicAuth}`;
    }

    const bodyParams: Record<string, string> = {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: config.clientId,
    };

    if (config.clientSecret) {
      bodyParams.client_secret = config.clientSecret;
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers,
      body: new URLSearchParams(bodyParams),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
};
