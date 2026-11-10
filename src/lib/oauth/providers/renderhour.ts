import { RENDERHOUR_CONFIG } from "../constants/oauth";

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

/**
 * RenderHour (renderhour.com) subscription sign-in: authorization code with PKCE for the
 * public client built into renderhour.com. The access token pays in the plan's credits on
 * RenderHour's /v1 API — the same API an `rh_…` key pays in dollars — for images, video and
 * speech. Access tokens last an hour; refresh tokens rotate and last 30 days.
 */
export const renderhour = {
  config: RENDERHOUR_CONFIG,
  flowType: "authorization_code_pkce" as const,

  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: redirectUri,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      state,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },

  exchangeToken: async (config, code, redirectUri, codeVerifier) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.clientId,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`RenderHour token exchange failed: ${error}`);
    }

    return response.json();
  },

  // Who signed in, so a second sign-in to the same account updates its connection.
  postExchange: async (tokens) => {
    if (!tokens?.access_token) return { userInfo: {} };
    const response = await fetch(RENDERHOUR_CONFIG.userinfoUrl, {
      headers: { Authorization: `Bearer ${tokens.access_token}`, Accept: "application/json" },
    });
    const userInfo = response.ok ? ((await response.json()) as Record<string, unknown>) : {};
    return { userInfo };
  },

  mapTokens: (tokens, extra) => {
    const userInfo = (extra?.userInfo ?? {}) as Record<string, unknown>;
    const email = readString(userInfo.email);
    return {
      accessToken: tokens?.access_token,
      refreshToken: tokens?.refresh_token,
      expiresIn: tokens?.expires_in,
      email,
      name: readString(userInfo.name) || email,
      providerSpecificData: {
        tokenType: tokens?.token_type || "Bearer",
        ...(readString(userInfo.sub) ? { accountId: readString(userInfo.sub) } : {}),
      },
    };
  },
};
