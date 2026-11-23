import { infCodeJwtExpiresIn } from "@omniroute/open-sse/services/tokenRefresh/providers/infcode.ts";
import { INF_CODE_CONFIG } from "../constants/oauth";

/**
 * InfCode (Token Infinity) OAuth provider.
 *
 * Verified live 2026-11-02 against the Tokfinity.infcode v2.8.0 VS Code
 * extension. The authorize endpoint is Token Infinity's custom login page:
 *
 *   GET {base}/infcode/login?loginType=&type=editor&redirect=<callback>&scope=profile&state=<state>&client_id=infcode
 *
 * The token exchange is NOT standard OAuth form-encoded — it POSTs a JSON
 * body `{ code }` to {base}/acode/v1/login_by_authcode and receives
 * `{ access_token, refresh_token }` in response. Userinfo is
 * `GET {base}/acode/v1/userinfo` with the bearer token.
 *
 * No PKCE. The extension's own client (v2.8.0 and v2.9.1) builds the login URL
 * with only loginType/type/redirect/scope/state/client_id and redeems the code
 * with a bare `{ code }` JSON body — no code_challenge or code_verifier. The
 * flow is a plain authorization_code grant; sending a challenge/verifier would
 * assume upstream behavior the reference client does not use.
 */
export const infCode = {
  config: INF_CODE_CONFIG,
  flowType: "authorization_code" as const,
  fixedPort: INF_CODE_CONFIG.loopbackPort,
  callbackPath: INF_CODE_CONFIG.callbackPath,
  callbackHost: INF_CODE_CONFIG.callbackHost,

  buildAuthUrl: (config, redirectUri, state, _codeChallenge) => {
    const params = new URLSearchParams({
      loginType: "",
      type: "editor",
      redirect: redirectUri,
      scope: config.scope,
      state,
      client_id: config.clientId,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },

  exchangeToken: async (config, code) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`InfCode token exchange failed: ${error}`);
    }

    return response.json();
  },

  postExchange: async (tokens) => {
    const userinfoUrl = INF_CODE_CONFIG.userinfoUrl;
    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      Accept: "application/json",
    };
    const userRes = await fetch(userinfoUrl, { headers });
    const userInfo = userRes.ok ? ((await userRes.json()) as Record<string, unknown>) : {};
    return { userInfo };
  },

  mapTokens: (tokens, extra) => {
    const userInfo = (extra?.userInfo ?? {}) as Record<string, unknown>;
    const email =
      (typeof userInfo.email === "string" && userInfo.email.trim()) ||
      (typeof userInfo.username === "string" && userInfo.username.trim()) ||
      null;
    const name =
      (typeof userInfo.name === "string" && userInfo.name.trim()) ||
      (typeof userInfo.displayName === "string" && userInfo.displayName.trim()) ||
      email;

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      // The exchange answers with only { access_token, refresh_token }, like the
      // refresh endpoint, so the expiry comes from the access token's exp claim.
      expiresIn: tokens.expires_in ?? infCodeJwtExpiresIn(tokens.access_token),
      email,
      name,
      providerSpecificData: {
        scope: tokens.scope || INF_CODE_CONFIG.scope,
        tokenType: tokens.token_type || "Bearer",
      },
    };
  },
};
