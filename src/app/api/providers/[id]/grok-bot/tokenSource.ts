import { updateProviderConnection } from "@/lib/db/providers";
import { singleFlight } from "../../../../(dashboard)/dashboard/grok-bot/auth";
import {
  REFRESH_URL,
  needsRefresh,
  nextExpiry,
  readRefreshResponse,
  refreshBody,
} from "../../../../(dashboard)/dashboard/grok-bot/token";

type GrokBotTokenSource = {
  id?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
  expiresAt?: unknown;
  tokenExpiresAt?: unknown;
};

type GrokBotToken = { accessToken: string } | { error: "reauth_required" };

const gate = singleFlight();

const ASSUMED_LIFETIME_MS = 30 * 60 * 1000;

/**
 * Returns a usable access token, refreshing first when the stored one is spent.
 * Two requests for the same connection share one refresh, so a page that opens
 * a transcript and a send at the same moment does not refresh twice.
 */
export async function grokBotToken(
  connection: GrokBotTokenSource,
  nowMs = Date.now()
): Promise<GrokBotToken> {
  const id = typeof connection.id === "string" ? connection.id : "";
  if (id === "") return { error: "reauth_required" };
  const stored = {
    accessToken: typeof connection.accessToken === "string" ? connection.accessToken : "",
    refreshToken: typeof connection.refreshToken === "string" ? connection.refreshToken : "",
    expiresAt: typeof connection.expiresAt === "string" ? connection.expiresAt : null,
    tokenExpiresAt: typeof connection.tokenExpiresAt === "string" ? connection.tokenExpiresAt : null,
  };
  const { accessToken } = stored;
  const { refreshToken } = stored;
  if (!needsRefresh(stored, nowMs)) return { accessToken };
  if (refreshToken === "") return accessToken === "" ? { error: "reauth_required" } : { accessToken };

  return gate.run(id, async (): Promise<GrokBotToken> => {
    let response: Response;
    try {
      response = await fetch(REFRESH_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: refreshBody(refreshToken),
        // The body carries the refresh token, so a 307/308 must not replay it
        // somewhere else, and a server that never answers must not hold the
        // single-flight gate open for every request on this connection.
        redirect: "error",
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      return accessToken === "" ? { error: "reauth_required" } : { accessToken };
    }
    if (!response.ok) return accessToken === "" ? { error: "reauth_required" } : { accessToken };
    const tokens = readRefreshResponse(await response.json().catch(() => null), refreshToken);
    if (!tokens) return { error: "reauth_required" };
    try {
      // An answer without a readable expiry must neither keep the stored one (it
      // is already spent, so every later request would refresh again) nor write
      // null (no expiry means needsRefresh never asks again). A short assumed
      // lifetime is the only shape that keeps both failure modes out.
      const expiry = nextExpiry(tokens.expiresAt, Date.now(), ASSUMED_LIFETIME_MS);
      await updateProviderConnection(id, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: expiry,
        tokenExpiresAt: expiry,
      });
    } catch {
      // A failed write still leaves a usable token in hand for this request.
      return { accessToken: tokens.accessToken };
    }
    return { accessToken: tokens.accessToken };
  });
}
