import { z } from "zod";
import { CHATGPT_RESOURCE, CHATGPT_TOKEN_URL } from "../../../config/chatgpt.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";

type Credentials = {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  providerSpecificData?: Record<string, unknown>;
};
const tokensSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  expires_in: z.number().positive(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  earliest_refresh_at: z.union([z.string(), z.number()]).optional(),
});

const UNRECOVERABLE_REFRESH_CODES = new Set([
  "invalid_grant",
  "invalid_refresh_token",
  "token_expired",
  "refresh_token_expired",
  "refresh_token_invalidated",
  "refresh_token_reused",
  "invalid_client",
]);

/** earliest_refresh_at arrives as Unix seconds or an ISO timestamp. */
function earliestRefreshMs(earliest: unknown): number {
  if (typeof earliest === "number") return earliest * 1000;
  if (typeof earliest === "string") return Date.parse(earliest);
  return 0;
}

/**
 * Match the official local SDK: refresh in the last minute, never before the
 * issuer's earliest_refresh_at. Returns null when a refresh may run now.
 */
function refreshNotDueResult(credentials: Credentials) {
  const expiry = Date.parse(credentials.expiresAt || "");
  const now = Date.now();
  const tooEarly = earliestRefreshMs(credentials.providerSpecificData?.earliestRefreshAt) > now;
  if (!tooEarly && !(credentials.accessToken && expiry > now + 60_000)) return null;
  if (credentials.accessToken && expiry > now) {
    return {
      accessToken: credentials.accessToken,
      refreshToken: credentials.refreshToken,
      expiresAt: credentials.expiresAt!,
      providerSpecificData: credentials.providerSpecificData,
    };
  }
  return { error: "temporary_refresh_error", code: "refresh_not_ready", status: 503 };
}

async function refreshFailureResult(response: Response) {
  const body = await response.json().catch(() => ({}));
  const code = typeof body?.error === "string" ? body.error : body?.error?.code;
  if (UNRECOVERABLE_REFRESH_CODES.has(code)) return { error: "unrecoverable_refresh_error", code };
  // Preserve temporary failure classification without exposing token endpoint bodies.
  return { error: "temporary_refresh_error", status: response.status };
}

function refreshedCredentials(tokens: z.infer<typeof tokensSchema>, credentials: Credentials) {
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    ...(tokens.id_token ? { idToken: tokens.id_token } : {}),
    providerSpecificData: {
      ...credentials.providerSpecificData,
      earliestRefreshAt: tokens.earliest_refresh_at ?? null,
      ...(tokens.scope !== undefined ? { scopes: tokens.scope.split(/\s+/).filter(Boolean) } : {}),
    },
  };
}

export async function refreshChatGptToken(credentials: Credentials, proxyConfig: unknown = null) {
  const clientId = credentials.providerSpecificData?.clientId;
  if (typeof clientId !== "string" || !clientId.startsWith("oaiapp_") || !credentials.refreshToken)
    return { error: "unrecoverable_refresh_error", code: "invalid_client" };
  const notDue = refreshNotDueResult(credentials);
  if (notDue) return notDue;
  const response = await runWithProxyContext(proxyConfig, () =>
    fetch(CHATGPT_TOKEN_URL, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(30_000),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        refresh_token: credentials.refreshToken!,
        resource: CHATGPT_RESOURCE,
      }),
    })
  );
  if (!response.ok) return refreshFailureResult(response);
  return refreshedCredentials(tokensSchema.parse(await response.json()), credentials);
}
