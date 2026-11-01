import { randomUUID } from "node:crypto";
import { getQoderMachineId } from "@omniroute/open-sse/utils/qoderDevice.ts";
import { QODER_CONFIG } from "../constants/oauth";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";

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
   * While waiting for user approval in the browser, center.qoder.sh returns HTTP 404.
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

      if (response.status === 404) {
        return { ok: false, data: { error: "authorization_pending" } };
      }

      if (response.status === 429) {
        return { ok: false, data: { error: "slow_down" } };
      }

      if (response.status === 403) {
        return {
          ok: false,
          data: { error: "access_denied", error_description: "Authorization denied by user" },
        };
      }

      if (response.status === 410) {
        return {
          ok: false,
          data: { error: "expired_token", error_description: "Authorization code expired" },
        };
      }

      if (!response.ok) {
        return {
          ok: false,
          data: { error: "poll_failed", error_description: `Poll failed: ${response.status}` },
        };
      }

      const data = (await response.json()) as Record<string, unknown>;
      const payload =
        data &&
        typeof data === "object" &&
        "data" in data &&
        data.data &&
        typeof data.data === "object"
          ? (data.data as Record<string, unknown>)
          : data;

      const accessToken = (payload?.token || payload?.access_token) as string | undefined;
      const refreshToken = (payload?.refresh_token || payload?.refreshToken || "") as string;
      const expiresIn = (payload?.expires_in || payload?.expiresIn || 2592000) as number;

      if (accessToken) {
        return {
          ok: true,
          data: {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
            token_type: "Bearer",
            _userEmail: (payload?.email || payload?.userEmail || "") as string,
          },
        };
      }

      return { ok: false, data: { error: "authorization_pending" } };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        data: { error: "network_error", error_description: errorMsg },
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
    const rawUser = extra && typeof extra === "object" ? extra : null;
    const user =
      rawUser && "data" in rawUser && rawUser.data && typeof rawUser.data === "object"
        ? (rawUser.data as Record<string, unknown>)
        : rawUser;

    const email =
      (user?.email as string) ||
      (user?.mail as string) ||
      (typeof tokens._userEmail === "string" ? tokens._userEmail : null);
    const name =
      (user?.nickname as string) ||
      (user?.name as string) ||
      (user?.username as string) ||
      email ||
      "Qoder User";
    const apiKey =
      (user?.apiKey as string) ||
      (user?.api_key as string) ||
      (typeof tokens.access_token === "string" ? tokens.access_token : null);

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
        userId: (user?.id || user?.userId || null) as string | null,
        email,
        name,
        accountType: (user?.accountType || user?.type || null) as string | null,
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
