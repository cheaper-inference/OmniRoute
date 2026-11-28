/**
 * Grok Bot OAuth token refresh via api2.cursor.sh/oauth/token.
 * Standard OAuth refresh_token grant (client_id + grant_type + refresh_token),
 * matching the desktop client's own refresh contract.
 * Self-contained in open-sse (no import from src/).
 */

import { resolvePublicCred } from "../../../utils/publicCreds.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";

const GROK_BOT_REFRESH_URL = "https://api2.cursor.sh/oauth/token";
// Production desktop OAuth client identity for api2.cursor.sh.
const GROK_BOT_OAUTH_CLIENT_ID = resolvePublicCred("cursor_id");
const REFRESH_TIMEOUT_MS = 15_000;
const REFRESH_ATTEMPTS = 3;
const REFRESH_RETRY_BASE_MS = 300;
const FALLBACK_TTL_MS = 60 * 60 * 1000;

function isRetryableRefreshStatus(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function refreshRetryDelayMs(attempt: number, baseMs: number): number {
  const exp = baseMs * 2 ** attempt;
  return Math.floor(exp * (0.8 + Math.random() * 0.4));
}

function decodeTokenSub(token: string | null | undefined): string | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8")) as {
      sub?: unknown;
    };
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export type RefreshGrokBotTokenOptions = {
  fetchImpl?: typeof fetch;
  retryBaseMs?: number;
  attempts?: number;
  /** Access token held before the refresh; used to detect account mismatches. */
  previousAccessToken?: string | null;
};

/**
 * Adjudicated refresh contract (REFRESH-adjudication.md):
 * - The server may or may not rotate the refresh token in any given response.
 *   Both shapes must be handled: a new refresh_token replaces the stored one;
 *   an absent one keeps the old value (never persist an empty refresh token).
 * - shouldLogout=true disables the account: unrecoverable, no auto-retry.
 * - Token subject must stay identical across a refresh (mismatch = wrong row).
 *
 * @returns {{ accessToken, refreshToken, expiresAt } | { error, code } | null}
 */
export async function refreshGrokBotToken(
  refreshToken: string,
  log?: { error?: (...args: unknown[]) => void; info?: (...args: unknown[]) => void },
  proxyConfig: unknown = null,
  options: RefreshGrokBotTokenOptions = {}
) {
  const doFetch = options.fetchImpl ?? fetch;
  const attempts = options.attempts ?? REFRESH_ATTEMPTS;
  const retryBaseMs = options.retryBaseMs ?? REFRESH_RETRY_BASE_MS;

  let lastError: RefreshFailure | null = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, refreshRetryDelayMs(attempt - 1, retryBaseMs)));
    }
    try {
      const response = await runWithProxyContext(proxyConfig, () =>
        doFetch(GROK_BOT_REFRESH_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            client_id: GROK_BOT_OAUTH_CLIENT_ID,
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
          signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
        })
      );

      const outcome = await readRefreshOutcome(response, refreshToken, log, options);
      if (outcome.retry && attempt < attempts - 1) {
        lastError = outcome.result;
        continue;
      }
      return outcome.result;
    } catch (err) {
      lastError = {
        error: "refresh_network_error",
        code: err instanceof Error && err.name === "TimeoutError" ? "timeout" : "network",
      };
      if (attempt < attempts - 1) continue;
      return lastError;
    }
  }

  return lastError ?? { error: "refresh_unknown", code: "unknown" };
}

type RefreshFailure = {
  error: string;
  code: string;
  accessToken?: never;
  refreshToken?: never;
  expiresAt?: never;
};
type RefreshLog = { error?: (...args: unknown[]) => void; info?: (...args: unknown[]) => void };
type RefreshResult =
  | { accessToken: string; refreshToken: string; expiresAt: string; error?: never; code?: never }
  | RefreshFailure;
type RefreshOutcome =
  { result: RefreshFailure; retry: true } | { result: RefreshResult; retry: false };

async function readRefreshOutcome(
  response: Response,
  refreshToken: string,
  log: RefreshLog | undefined,
  options: RefreshGrokBotTokenOptions
): Promise<RefreshOutcome> {
  const text = await response.text();
  let parsed: Record<string, unknown> = {};
  try {
    parsed = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    /* Invalid JSON is handled as a missing access token or an HTTP error. */
  }
  if (!response.ok) {
    const retry = isRetryableRefreshStatus(response.status);
    const code = typeof parsed.error === "string" ? parsed.error : `http_${response.status}`;
    // A revoked or malformed grant never becomes valid on a later attempt, and
    // the shared refresher stops retrying on this error shape.
    if (code === "invalid_grant" || code === "invalid_request") {
      return { result: { error: "unrecoverable_refresh_error", code }, retry: false };
    }
    const result = { error: "refresh_http_error", code: retry ? `http_${response.status}` : code };
    return { result, retry };
  }
  return validateRefreshedCredentials(parsed, refreshToken, log, options.previousAccessToken);
}

function validateRefreshedCredentials(
  parsed: Record<string, unknown>,
  refreshToken: string,
  log: RefreshLog | undefined,
  previousAccessToken: string | null | undefined
): RefreshOutcome {
  if (parsed.shouldLogout === true) {
    log?.info?.("TOKEN_REFRESH", "Grok Bot: shouldLogout=true — disabling account");
    return {
      result: { error: "unrecoverable_refresh_error", code: "account_should_logout" },
      retry: false,
    };
  }
  const accessToken = typeof parsed.access_token === "string" ? parsed.access_token : null;
  if (!accessToken) {
    return {
      result: { error: "refresh_malformed_response", code: "no_access_token" },
      retry: true,
    };
  }
  const previousSub = decodeTokenSub(previousAccessToken);
  const newSub = decodeTokenSub(accessToken);
  if (previousSub && newSub && previousSub !== newSub) {
    log?.error?.(
      "TOKEN_REFRESH",
      "Grok Bot: token subject changed across refresh — refusing to persist"
    );
    return {
      result: { error: "unrecoverable_refresh_error", code: "account_subject_mismatch" },
      retry: false,
    };
  }
  return { result: refreshedCredentials(parsed, accessToken, refreshToken), retry: false };
}

function refreshedCredentials(
  parsed: Record<string, unknown>,
  accessToken: string,
  refreshToken: string
) {
  const newRefreshToken =
    typeof parsed.refresh_token === "string" && parsed.refresh_token.length > 0
      ? parsed.refresh_token
      : refreshToken;
  const expiresIn =
    typeof parsed.expires_in === "number" && Number.isFinite(parsed.expires_in)
      ? parsed.expires_in
      : null;
  const expiresAt = expiresIn
    ? new Date(Date.now() + expiresIn * 1000).toISOString()
    : new Date(Date.now() + FALLBACK_TTL_MS).toISOString();
  return { accessToken, refreshToken: newRefreshToken, expiresAt };
}
