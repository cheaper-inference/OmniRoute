import { z } from "zod";
import { resolvePublicCred } from "@omniroute/open-sse/utils/publicCreds.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export const M365_NATIVE_REDIRECT_URI =
  "https://login.microsoftonline.com/common/oauth2/nativeclient";

// Kept at the OAuth boundary rather than importing the executor (which imports provider config).
export const M365_NATIVE_OAUTH_CONFIG = {
  clientId: resolvePublicCred("m365_oauth_client_id"),
  authorizeUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  redirectUri: M365_NATIVE_REDIRECT_URI,
  scope:
    "openid profile offline_access https://substrate.office.com/sydney/M365Chat.Read " +
    "https://substrate.office.com/sydney/sydney.readwrite",
  codeChallengeMethod: "S256",
} as const;

const tokenString = z.string().min(1).max(65536);
const tokenSchema = z.object({
  access_token: tokenString,
  refresh_token: tokenString.optional(),
  id_token: tokenString.optional(),
  expires_in: z.number().int().positive().max(31536000),
  token_type: z.string().regex(/^Bearer$/i),
  scope: z.string().max(8192).optional(),
});
export type M365OAuthTokens = z.infer<typeof tokenSchema>;
const guid = z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
const identitySchema = z.object({ oid: guid, tid: guid });
const verifierSchema = z.string().regex(/^[A-Za-z0-9._~-]{43,128}$/);

function fail(message: string): never {
  // Only fixed, local messages cross this boundary: never provider bodies or parser errors.
  throw new Error(sanitizeErrorMessage(message));
}

function requireRedirect(redirectUri: string): void {
  if (redirectUri !== M365_NATIVE_REDIRECT_URI) fail("M365 requires the fixed native redirect URI");
}

function parseTokens(input: unknown): M365OAuthTokens {
  const result = tokenSchema.safeParse(input);
  if (!result.success) fail("M365 token response is invalid");
  return result.data;
}

function displayClaim(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim() || value.length > 254) return null;
  // Display metadata only, not identity/authorization. Reject markup and control characters.
  if (/[<>\p{Cc}\p{Cf}]/u.test(value)) return null;
  return value.trim();
}

function identityFromAccessToken(accessToken: string) {
  try {
    const parts = accessToken.split(".");
    if (parts.length !== 3 || parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))) {
      fail("M365 work or school identity is required");
    }
    // Decode routing/display hints only. This is NOT cryptographic JWT verification.
    const claims: unknown = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    const identity = identitySchema.safeParse(claims);
    if (!identity.success) fail("M365 work or school identity is required");
    const oid = identity.data.oid.toLowerCase();
    const tid = identity.data.tid.toLowerCase();
    if (
      tid === "9188040d-6c67-4c5b-b112-36a304b66dad" ||
      /^0{8}-0{4}-0{4}-0{4}-0{12}$/.test(tid) ||
      /^0{8}-0{4}-0{4}-0{4}-0{12}$/.test(oid)
    ) {
      fail("M365 work or school identity is required");
    }
    const metadata = claims as Record<string, unknown>;
    const emailCandidate =
      displayClaim(metadata.preferred_username) || displayClaim(metadata.email);
    const email =
      emailCandidate && z.email().safeParse(emailCandidate).success ? emailCandidate : null;
    return { oid, tid, name: displayClaim(metadata.name), email };
  } catch {
    fail("M365 work or school identity is required");
  }
}

function mapTokens(input: unknown) {
  const tokens = parseTokens(input);
  const identity = identityFromAccessToken(tokens.access_token);
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    idToken: tokens.id_token,
    expiresIn: tokens.expires_in,
    email: identity.email,
    name: identity.name,
    providerSpecificData: {
      oid: identity.oid,
      tid: identity.tid,
      chathubPath: `${identity.oid}@${identity.tid}`,
    },
  };
}
export type M365MappedTokens = ReturnType<typeof mapTokens>;

// The fetch signal covers connection + body reads; a size cap also bounds JSON memory.
async function readTokenResponse(response: Response): Promise<unknown> {
  if (!response.ok) {
    await response.body?.cancel();
    fail("M365 token exchange was rejected");
  }
  if (!response.body) fail("M365 token response is invalid");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 131072) {
        await reader.cancel();
        fail("M365 token response is invalid");
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } finally {
    reader.releaseLock();
  }
}

export const copilotM365 = {
  config: M365_NATIVE_OAUTH_CONFIG,
  flowType: "authorization_code_pkce",
  buildAuthUrl(
    config: typeof M365_NATIVE_OAUTH_CONFIG,
    redirectUri: string,
    state: string,
    codeChallenge: string
  ): string {
    requireRedirect(redirectUri);
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: M365_NATIVE_REDIRECT_URI,
      scope: config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state,
    });
    return `${M365_NATIVE_OAUTH_CONFIG.authorizeUrl}?${params}`;
  },
  async exchangeToken(
    config: typeof M365_NATIVE_OAUTH_CONFIG,
    code: string,
    redirectUri: string,
    codeVerifier: string
  ): Promise<M365OAuthTokens> {
    requireRedirect(redirectUri);
    if (
      !z.string().min(1).max(8192).safeParse(code).success ||
      !verifierSchema.safeParse(codeVerifier).success
    ) {
      fail("M365 authorization exchange parameters are invalid");
    }
    try {
      const response = await fetch(M365_NATIVE_OAUTH_CONFIG.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        redirect: "error",
        signal: AbortSignal.timeout(15000),
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: config.clientId,
          code,
          redirect_uri: M365_NATIVE_REDIRECT_URI,
          code_verifier: codeVerifier,
          scope: config.scope,
        }),
      });
      const tokens = parseTokens(await readTokenResponse(response));
      identityFromAccessToken(tokens.access_token);
      return tokens;
    } catch {
      fail("M365 token exchange failed; restart sign-in");
    }
  },
  mapTokens,
};
