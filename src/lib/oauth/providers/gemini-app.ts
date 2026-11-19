import { GEMINI_APP_CONFIG } from "../constants/oauth";

/**
 * Gemini App (Robin native client) OAuth provider.
 *
 * Browser PKCE flow with the public desktop client shipped by gemini-app.
 * Unlike Antigravity/AGY it has no Code Assist project bootstrap, so the
 * post-exchange only resolves the account email for display.
 */

type TokenPayload = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
};

function decodedIdTokenIdentity(idToken: unknown): { email: string | null } {
  if (typeof idToken !== "string") return { email: null };
  const parts = idToken.split(".");
  if (parts.length !== 3) return { email: null };
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    const payload = JSON.parse(
      Buffer.from(base64 + "=".repeat(padding), "base64").toString("utf8")
    );
    return { email: typeof payload.email === "string" ? payload.email : null };
  } catch {
    return { email: null };
  }
}

export const geminiApp = {
  config: GEMINI_APP_CONFIG,
  flowType: "authorization_code_pkce" as const,

  buildAuthUrl: (
    config: typeof GEMINI_APP_CONFIG,
    redirectUri: string,
    state: string,
    codeChallenge: string
  ) => {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: config.scopes.join(" "),
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      access_type: "offline",
      prompt: "consent",
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },

  exchangeToken: async (
    config: typeof GEMINI_APP_CONFIG,
    code: string,
    redirectUri: string,
    codeVerifier: string
  ) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Gemini App token exchange failed (${response.status}): ${detail.slice(0, 200)}`
      );
    }
    return (await response.json()) as TokenPayload;
  },

  postExchange: async (tokens: TokenPayload) => {
    const response = await fetch(`${GEMINI_APP_CONFIG.userInfoUrl}?alt=json`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);
    const userInfo = response?.ok
      ? ((await response.json().catch(() => ({}))) as { email?: string })
      : {};
    return {
      userInfo,
      // Bind the connection to the built-in client so hot refresh keeps using it.
      oauthClient: "builtin",
    };
  },

  mapTokens: (
    tokens: TokenPayload,
    extra?: { userInfo?: { email?: string }; oauthClient?: string }
  ) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    idToken: tokens.id_token,
    expiresIn: tokens.expires_in,
    scope: tokens.scope,
    email: extra?.userInfo?.email ?? decodedIdTokenIdentity(tokens.id_token).email ?? undefined,
    providerSpecificData: {
      oauthClient: extra?.oauthClient ?? "builtin",
      scope: tokens.scope ?? GEMINI_APP_CONFIG.scopes.join(" "),
      tokenType: tokens.token_type ?? "Bearer",
      autoSync: true,
    },
  }),
};
