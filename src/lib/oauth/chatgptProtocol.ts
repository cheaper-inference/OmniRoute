import { randomBytes } from "node:crypto";
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";
import { z } from "zod";
import {
  CHATGPT_ISSUER,
  CHATGPT_RESOURCE,
  CHATGPT_SCOPES,
  CHATGPT_TOKEN_URL,
} from "@omniroute/open-sse/config/chatgpt";
import { resolvePublicCred } from "@omniroute/open-sse/utils/publicCreds";
import { generateCodeChallenge } from "./utils/pkce";

export const chatGptTokensSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  id_token: z.string().min(1),
  token_type: z.string().refine((v) => v.toLowerCase() === "bearer"),
  expires_in: z.number().positive(),
  scope: z.string(),
  earliest_refresh_at: z.union([z.string(), z.number()]).optional(),
});
export type ChatGptTokens = z.infer<typeof chatGptTokensSchema>;
export type ChatGptAttempt = {
  state: string;
  nonce: string;
  verifier: string;
  redirectUri: string;
  clientId?: string;
  subject?: string;
  connectionId?: string;
  origin: string;
  expiresAt: number;
};
// Official OpenAI JWKS, derived from the pinned issuer constant — never from token or request data.
const jwks = createRemoteJWKSet(new URL(`${CHATGPT_ISSUER}/.well-known/jwks.json`));

export function createChatGptAttempt(
  origin: string,
  port: number,
  hostId: string,
  registration?: { clientId: string; subject: string; connectionId: string }
) {
  const verifier = randomBytes(32).toString("base64url");
  const attempt: ChatGptAttempt = {
    origin,
    state: `siwc.${Buffer.from(origin).toString("base64url")}.${randomBytes(32).toString("base64url")}`,
    nonce: randomBytes(32).toString("base64url"),
    verifier,
    redirectUri: `http://127.0.0.1:${port}/auth/callback`,
    expiresAt: Date.now() + 10 * 60_000,
    ...registration,
  };
  const url = new URL(`${CHATGPT_ISSUER}/api/accounts/authorize`);
  url.search = new URLSearchParams({
    client_id: registration?.clientId || resolvePublicCred("chatgpt_id"),
    ...(registration ? {} : { agent_name_hint: "OmniRoute" }),
    ext_agent_host_id: hostId,
    response_type: "code",
    redirect_uri: attempt.redirectUri,
    scope: CHATGPT_SCOPES,
    resource: CHATGPT_RESOURCE,
    state: attempt.state,
    nonce: attempt.nonce,
    code_challenge_method: "S256",
    code_challenge: generateCodeChallenge(verifier),
  }).toString();
  return { attempt, authUrl: url.toString() };
}

export function resolveChatGptClientId(attempt: ChatGptAttempt, returned?: string): string {
  if (attempt.clientId && returned && returned !== attempt.clientId)
    throw new Error("ChatGPT returned a different registration. Start sign-in again.");
  const clientId = attempt.clientId || returned;
  if (!clientId || !/^oaiapp_[A-Za-z0-9_-]+$/.test(clientId))
    throw new Error("ChatGPT did not return an issued client ID. Start sign-in again.");
  return clientId;
}

export async function verifyChatGptIdentity(
  idToken: string,
  clientId: string,
  nonce: string,
  key: JWTVerifyGetKey = jwks
) {
  const { payload } = await jwtVerify(idToken, key, {
    issuer: CHATGPT_ISSUER,
    audience: clientId,
    // Pinned: OpenAI signs ID tokens with RS256; accepting whatever the header asks for
    // (HS256 with the public key, `none`) is how algorithm-substitution attacks get in.
    algorithms: ["RS256"],
    requiredClaims: ["sub", "exp", "iat", "nonce"],
  });
  if (payload.nonce !== nonce || !payload.sub)
    throw new Error("ChatGPT identity validation failed.");
  return {
    subject: payload.sub,
    email: typeof payload.email === "string" ? payload.email : undefined,
  };
}

export async function exchangeChatGptCode(attempt: ChatGptAttempt, code: string, clientId: string) {
  const response = await fetch(CHATGPT_TOKEN_URL, {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(30_000),
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      code,
      code_verifier: attempt.verifier,
      redirect_uri: attempt.redirectUri,
      resource: CHATGPT_RESOURCE,
    }),
  });
  // Never expose token endpoint bodies: they can contain credentials.
  if (!response.ok)
    throw new Error(
      `ChatGPT token exchange failed (HTTP ${response.status}). Start sign-in again.`
    );
  return chatGptTokensSchema.parse(await response.json());
}
