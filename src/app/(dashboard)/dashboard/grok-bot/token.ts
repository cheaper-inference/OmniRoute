/**
 * Token handling for grok-bot connections. The refresh call is the Cursor OAuth
 * token endpoint with the `grok-bot` client, which was measured against the
 * live server: it answers 200 with a new access token and keeps the refresh
 * token it was given, so a refresh cannot strand the account.
 */
export const REFRESH_URL = "https://api2.cursor.sh/oauth/token";

export const REFRESH_SKEW_MS = 60_000;

export type RefreshTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export function refreshBody(refreshToken: string): string {
  return JSON.stringify({
    client_id: "grok-bot",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
}

export function jwtExpiry(token: string): string {
  const parts = token.split(".");
  if (parts.length !== 3) return "";
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8")) as {
      exp?: unknown;
    };
    if (typeof payload.exp !== "number") return "";
    return new Date(payload.exp * 1000).toISOString();
  } catch {
    return "";
  }
}

/**
 * Reads the refresh answer. An empty access token or `shouldLogout` means the
 * stored grant is gone and only a fresh sign-in can help, so both report null
 * rather than an empty token that would be sent upstream.
 */
export function readRefreshResponse(
  payload: unknown,
  previousRefreshToken: string
): RefreshTokens | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as {
    access_token?: unknown;
    refresh_token?: unknown;
    shouldLogout?: unknown;
  };
  if (record.shouldLogout === true) return null;
  if (typeof record.access_token !== "string" || record.access_token === "") return null;
  const handed = typeof record.refresh_token === "string" && record.refresh_token !== "";
  const seconds = (payload as { expires_in?: unknown }).expires_in;
  const fromSeconds =
    typeof seconds === "number" && seconds > 0
      ? new Date(Date.now() + seconds * 1000).toISOString()
      : "";
  return {
    accessToken: record.access_token,
    refreshToken: handed ? (record.refresh_token as string) : previousRefreshToken,
    expiresAt: jwtExpiry(record.access_token) || fromSeconds,
  };
}

function parseMs(value: string | null | undefined): number {
  if (typeof value !== "string" || value === "") return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function needsRefresh(
  connection: {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: string | null;
    tokenExpiresAt?: string | null;
  },
  nowMs: number
): boolean {
  if (typeof connection.accessToken !== "string" || connection.accessToken === "") return true;
  if (typeof connection.refreshToken !== "string" || connection.refreshToken === "") return false;
  const expiry = parseMs(connection.tokenExpiresAt) || parseMs(connection.expiresAt);
  if (expiry === 0) return false;
  return nowMs + REFRESH_SKEW_MS >= expiry;
}

/**
 * The expiry to persist after a refresh. An answer without a readable expiry
 * must neither keep the spent one (every later request would refresh again) nor
 * write nothing (a missing expiry means it never refreshes again), so a short
 * assumed lifetime is written instead.
 */
export function nextExpiry(expiresAt: string, nowMs: number, assumedMs = 30 * 60 * 1000): string {
  return expiresAt === "" ? new Date(nowMs + assumedMs).toISOString() : expiresAt;
}
