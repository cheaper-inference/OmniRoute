// Re-export from open-sse with local logger
import * as log from "../utils/logger";
import * as passive from "@omniroute/open-sse/services/tokenRefresh/passiveCodex.ts";
import { stripTrailingSlashes } from "@omniroute/open-sse/utils/urlSanitize.ts";
import { isTransientRefreshError } from "@omniroute/open-sse/services/tokenRefresh/transientError.ts";
import { registerCredentialRefresher } from "@omniroute/open-sse/utils/registeredCredentialRefresher.ts";
import { registerCodexRefreshPersistence } from "@omniroute/open-sse/services/codexAccount/refreshPersistence.ts";
import { updateProviderConnection } from "@/lib/db/providers";
import {
  captureCodexConnectionFence,
  captureCodexConnectionOwnerFence,
  adoptCodexConnectionFence,
  runWithCodexConnectionFence,
  getCodexOperationFence,
  isCodexConnectionFenceCurrent,
  StaleCodexOperationError,
  type CodexConnectionFence,
} from "@/lib/db/codexConnectionFences";
import { parseTokenExpiryMs } from "@/lib/tokenHealthCheckExpiry";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { resolveProxyForProvider, hasBlockingProxyAssignment } from "@/lib/db/proxies";
import {
  TOKEN_EXPIRY_BUFFER_MS as BUFFER_MS,
  getRefreshLeadMs as _getRefreshLeadMs,
  refreshAccessToken as _refreshAccessToken,
  refreshClaudeOAuthToken as _refreshClaudeOAuthToken,
  refreshGoogleToken as _refreshGoogleToken,
  refreshCodexToken as _refreshCodexToken,
  refreshQoderToken as _refreshQoderToken,
  refreshGitHubToken as _refreshGitHubToken,
  refreshCopilotToken as _refreshCopilotToken,
  getAccessToken as _getAccessToken,
  refreshTokenByProvider as _refreshTokenByProvider,
  formatProviderCredentials as _formatProviderCredentials,
  getAllAccessTokens as _getAllAccessTokens,
} from "@omniroute/open-sse/services/tokenRefresh.ts";

// DEPRECATED: withConnectionRefreshMutex was removed. The per-connection mutex
// is now consolidated in open-sse/services/tokenRefresh.ts and protected by
// passing an `onPersist` callback to `getAccessToken`, which runs the DB write
// INSIDE the mutex closure (atomic [network + persist]). The old src/sse-side
// mutex Map was redundant and created the illusion of two locks when there was
// actually only one. Removing it eliminates the dual-Map confusion. See
// docs/architecture/SSE_BOUNDARY.md and tests/unit/token-refresh-race-comprehensive.test.ts.

export const TOKEN_EXPIRY_BUFFER_MS = BUFFER_MS;

/**
 * #13470: mirrors the #6246 fail-closed policy (`src/sse/handlers/chatHelpers.ts`
 * ::safeResolveProxy / decideProxyResolutionFailure) for the background
 * token-refresh path. Duplicated verbatim here — importing decideProxyResolutionFailure
 * from chatHelpers.ts would create an import cycle (chatHelpers.ts already imports
 * updateProviderCredentials from this module).
 */
function decideTokenRefreshProxyFailure(err: unknown): null {
  if ((process.env.PROXY_FAIL_OPEN ?? "").trim().toLowerCase() === "true") {
    log.warn(
      "PROXY",
      `Token-refresh proxy resolution failed — PROXY_FAIL_OPEN=true, falling back to DIRECT: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    return null;
  }
  throw err instanceof Error ? err : new Error(String(err));
}

/**
 * #13470: a connection whose assigned proxy pool has gone fully dead must not
 * silently fall through to direct/env-proxy egress for its background refresh-token
 * exchange — that is the same class of IP-provenance leak #6246 closed for the
 * interactive chat/executor path (`safeResolveProxy`), on a more sensitive
 * payload (the refresh token itself). Exported for direct testing.
 */
export async function resolveProxyForCredentials(provider: string, credentials?: any) {
  if (credentials?.connectionId) {
    const resolved = await resolveProxyForConnection(credentials.connectionId);
    if (resolved?.proxy) {
      return resolved.proxy;
    }
    if (hasBlockingProxyAssignment(credentials.connectionId, provider)) {
      return decideTokenRefreshProxyFailure(
        Object.assign(
          new Error(
            "PROXY_ASSIGNED_UNAVAILABLE: assigned proxy is inactive/unreachable; refusing to egress background token refresh on a direct connection"
          ),
          { code: "PROXY_ASSIGNED_UNAVAILABLE" }
        )
      );
    }
  }

  return resolveProxyForProvider(provider);
}

export const refreshAccessToken = async (
  provider: string,
  refreshToken: string,
  credentials: any
) => {
  const proxy = passive.isPassiveCodex(provider)
    ? null
    : await resolveProxyForCredentials(provider, credentials);
  return _refreshAccessToken(provider, refreshToken, credentials, log, proxy);
};

export const refreshClaudeOAuthToken = async (refreshToken: string, credentials?: any) => {
  const proxy = await resolveProxyForCredentials("claude", credentials);
  return _refreshClaudeOAuthToken(refreshToken, log, proxy);
};

export const refreshGoogleToken = async (
  refreshToken: string,
  clientId: string,
  clientSecret: string,
  provider: string = "gemini",
  credentials?: any
) => {
  const proxy = await resolveProxyForCredentials(provider, credentials);
  return _refreshGoogleToken(refreshToken, clientId, clientSecret, log, proxy);
};

export const refreshCodexToken = async (refreshToken: string, credentials?: any) => {
  if (passive.isPassiveCodex("codex")) return passive.resolvePassiveCodex(credentials);
  const proxy = await resolveProxyForCredentials("codex", credentials);
  return _refreshCodexToken(refreshToken, log, proxy);
};

export const refreshQoderToken = async (refreshToken: string, credentials?: any) => {
  const proxy = await resolveProxyForCredentials("qoder", credentials);
  return _refreshQoderToken(refreshToken, log, proxy);
};

export const refreshGitHubToken = async (refreshToken: string, credentials?: any) => {
  const proxy = await resolveProxyForCredentials("github", credentials);
  return _refreshGitHubToken(refreshToken, log, proxy);
};

export const refreshCopilotToken = async (
  githubAccessToken: string,
  credentials?: any,
  baseUrl?: string
) => {
  const proxy = await resolveProxyForCredentials("github", credentials);
  return baseUrl
    ? _refreshCopilotToken(githubAccessToken, log, proxy, baseUrl)
    : _refreshCopilotToken(githubAccessToken, log, proxy);
};

/**
 * Resolve the Copilot token endpoint base URL for a provider/credentials pair.
 * github.com Copilot always uses api.github.com; GHE Copilot uses its own
 * per-enterprise host stored in providerSpecificData.gheUrl at connect time.
 */
export function resolveCopilotTokenBaseUrl(
  provider: string,
  credentials?: any
): string | undefined {
  if (provider !== "ghe-copilot") return undefined;
  const gheUrl = credentials?.providerSpecificData?.gheUrl;
  if (typeof gheUrl === "string" && gheUrl.trim().length > 0) {
    return `${stripTrailingSlashes(gheUrl.trim())}/api/v3`;
  }
  return undefined;
}

export const getAccessToken = async (
  provider: string,
  credentials: any,
  onPersist?: (result: any) => Promise<void>
) => {
  const proxy = passive.isPassiveCodex(provider)
    ? null
    : await resolveProxyForCredentials(provider, credentials);
  return _getAccessToken(provider, credentials, log, proxy, onPersist);
};

export const refreshTokenByProvider = async (provider: string, credentials: any) => {
  const proxy = passive.isPassiveCodex(provider)
    ? null
    : await resolveProxyForCredentials(provider, credentials);
  return _refreshTokenByProvider(provider, credentials, log, proxy);
};

export const formatProviderCredentials = (provider: string, credentials: any) =>
  _formatProviderCredentials(provider, credentials, log);

export const getAllAccessTokens = (userInfo: any) =>
  _getAllAccessTokens(userInfo, log, {
    // Per-connection proxy parity with the single-connection refresh path
    // (#13470): a connection with an assigned proxy pool must not egress its
    // refresh directly. Resolution failure fails closed (the connection
    // counts as failed, never refreshed on a direct connection).
    resolveProxy: (provider: string, connectionId: string | null) =>
      resolveProxyForCredentials(provider, { connectionId: connectionId ?? undefined }),
    // Rotated tokens are persisted by the caller (open-sse stays free of
    // `@/lib/db` imports); the write is atomic with the refresh inside the
    // per-connection mutex.
    onPersist: (connectionId: string, result: any) =>
      updateProviderCredentials(connectionId, result),
  });

// A shared refresh result can be reused only with the exact durable version its
// successful write committed. Weak keys do not extend the token object's lifetime.
const committedCodexRefreshes = new WeakMap<object, CodexConnectionFence>();

/** Reuse a shared rotation only while its committed owner/version is still current. */
export function adoptCommittedCodexRefresh(
  result: object,
  expected: CodexConnectionFence | null
): CodexConnectionFence | null {
  const committed = committedCodexRefreshes.get(result);
  if (!expected || !committed) return null;
  if (
    committed.connectionId !== expected.connectionId ||
    committed.ownerEpoch !== expected.ownerEpoch ||
    !isCodexConnectionFenceCurrent(committed)
  ) {
    throw new StaleCodexOperationError();
  }
  return committed;
}

/** Called inside getAccessToken's connection mutex, before its result reaches waiters. */
export async function persistCodexRefresh(
  result: Record<string, unknown>,
  expected: CodexConnectionFence
): Promise<void> {
  if (adoptCommittedCodexRefresh(result, expected)) return;
  const applied = await runWithCodexConnectionFence(expected, () =>
    updateProviderCredentials(expected.connectionId, result, (committed) => {
      committedCodexRefreshes.set(result, committed);
    })
  );
  if (!applied) throw new StaleCodexOperationError();
}

function preserveNewerRefreshFailure(
  updates: Record<string, unknown>,
  fence: CodexConnectionFence | null
): void {
  if (!fence || isCodexConnectionFenceCurrent(fence, true)) return;
  // A valid rotation persists only tokens; never clear a newer health state.
  for (const key of [
    "testStatus",
    "isActive",
    "lastError",
    "lastErrorAt",
    "lastErrorType",
    "lastErrorSource",
    "errorCode",
  ])
    delete updates[key];
}

function applyRefreshedExpiry(updates: Record<string, any>, newCredentials: any) {
  if (newCredentials.expiresIn) {
    const expiresAt = new Date(Date.now() + newCredentials.expiresIn * 1000).toISOString();
    updates.expiresAt = expiresAt;
    updates.tokenExpiresAt = expiresAt;
    updates.expiresIn = newCredentials.expiresIn;
  } else if (newCredentials.expiresAt) {
    updates.expiresAt = newCredentials.expiresAt;
    updates.tokenExpiresAt = newCredentials.expiresAt;
  } else if (newCredentials.accessToken && newCredentials.expiresAt === null) {
    updates.expiresAt = null;
    updates.tokenExpiresAt = null;
  }
}

// Local-specific: Update credentials in localDb
export async function updateProviderCredentials(
  connectionId: string,
  newCredentials: any,
  onCodexFenceCommitted?: (fence: CodexConnectionFence) => void
) {
  try {
    const updates: Record<string, any> = {};

    if (newCredentials.accessToken) {
      updates.accessToken = newCredentials.accessToken;
      // #6352: a successful refresh proves the connection is reachable and its
      // refresh_token is valid again — clear any stale auth-failure state
      // (testStatus/lastError*) left over from a prior expired/invalid refresh
      // token or an upstream 401/403. Without this, a genuinely successful
      // rotating-refresh (e.g. Codex/OpenAI) persisted the new access/refresh
      // token while leaving the dashboard showing "Auth Failed" forever,
      // because the error metadata was never reset here — only the health-check
      // sweep (tokenHealthCheck.ts::checkConnection) did this clearing, so any
      // OTHER caller of updateProviderCredentials (the manual refresh route,
      // the reactive per-request refresh in chat.ts) looked like it "didn't
      // pick up" the refreshed token. Explicit `newCredentials.testStatus`
      // below still wins for callers that need a specific terminal state.
      updates.testStatus = "active";
      updates.lastError = null;
      updates.lastErrorAt = null;
      updates.lastErrorType = null;
      updates.lastErrorSource = null;
      updates.errorCode = null;
    }
    if (newCredentials.refreshToken) {
      updates.refreshToken = newCredentials.refreshToken;
    }
    applyRefreshedExpiry(updates, newCredentials);
    if (newCredentials.providerSpecificData) {
      updates.providerSpecificData = newCredentials.providerSpecificData;
    }
    // Cookie/session providers (Perplexity Web, etc.) refresh by rotating the
    // stored apiKey blob — propagate that here too so DB credentials don't
    // go stale after Set-Cookie rotation.
    if (newCredentials.apiKey) {
      updates.apiKey = newCredentials.apiKey;
    }
    if (newCredentials.testStatus) {
      updates.testStatus = newCredentials.testStatus;
    }
    if (newCredentials.isActive !== undefined) {
      updates.isActive = newCredentials.isActive;
    }

    // #13389: a token rotation touches only credential/health fields — the
    // model catalog builder never reads them, and OAuth refreshes fire
    // continuously on a live instance (Copilot/Kiro/Claude proactive
    // refreshes), so a full bust here cold-rebuilds /v1/models on nearly
    // every dashboard hit. `isActive` and `providerSpecificData` CAN change
    // catalog-relevant state, so those updates keep the default invalidation.
    const catalogRelevant =
      updates.isActive !== undefined || updates.providerSpecificData !== undefined;
    const fence = getCodexOperationFence(connectionId);
    preserveNewerRefreshFailure(updates, fence);
    const result = await updateProviderConnection(connectionId, updates, {
      ...(catalogRelevant ? {} : { skipModelCatalog: true }),
      ...(fence ? { expectedCodexFence: fence, onCodexFenceCommitted } : {}),
    });
    log.info("TOKEN_REFRESH", "Credentials updated in localDb", {
      connectionId,
      success: !!result,
    });
    return !!result;
  } catch (error) {
    log.error("TOKEN_REFRESH", "Error updating credentials in localDb", {
      connectionId,
      error: (error as any).message,
    });
    return false;
  }
}

// A transient Muse remint failure says nothing about the credential: keep it, as a null refresh does.
function keepsMuseCredentialsAfterRefreshError(provider: string, error: unknown) {
  return provider === "muse-code" && isTransientRefreshError(error);
}

function resolveExpiryWithoutAbsolute(newCredentials: any, currentExpiresAt: unknown) {
  if (newCredentials.expiresIn) {
    return new Date(Date.now() + newCredentials.expiresIn * 1000).toISOString();
  }
  return newCredentials.expiresAt === null ? null : currentExpiresAt;
}

// Local-specific: Check and refresh token proactively
export async function checkAndRefreshToken(provider: string, credentials: any) {
  const fence =
    provider === "codex"
      ? (passive.isPassiveCodex(provider)
          ? captureCodexConnectionOwnerFence
          : captureCodexConnectionFence)(credentials)
      : null;
  return runWithCodexConnectionFence(fence, () => checkAndRefreshTokenInner(provider, credentials));
}
function validateRefreshedCodexFence(
  fence: CodexConnectionFence | null,
  credentials: Record<string, unknown>
): void {
  if (!fence) return;
  if (!isCodexConnectionFenceCurrent(fence)) throw new StaleCodexOperationError();
  // A mutex/cache hit can bypass persistence. Never hand another owner's token to a waiter.
  captureCodexConnectionFence(credentials);
}

function adoptProactiveRefresh(
  provider: string,
  fence: CodexConnectionFence | null,
  credentials: Record<string, unknown>,
  refreshed: Record<string, unknown>,
  adoptCommitted: (result: object) => boolean
): CodexConnectionFence | null {
  if (!passive.isPassiveCodex(provider)) {
    adoptCommitted(refreshed);
    return fence;
  }
  return adoptCodexConnectionFence(fence, credentials, { ...credentials, ...refreshed });
}

function createRefreshPersistCallback(
  connectionId: string | undefined,
  getFence: () => CodexConnectionFence | null,
  adoptCommittedRefresh: (result: object) => boolean
) {
  if (!connectionId) return undefined;
  return async (result: Record<string, unknown>) => {
    if (adoptCommittedRefresh(result)) return;
    const fence = getFence();
    if (fence) {
      await persistCodexRefresh(result, fence);
      adoptCommittedRefresh(result);
      return;
    }
    const applied = await updateProviderCredentials(connectionId, result);
    if (!applied && getCodexOperationFence(connectionId)) throw new StaleCodexOperationError();
  };
}

function mergeProactiveRefreshCredentials(
  credentials: Record<string, unknown>,
  refreshed: Record<string, unknown> & { expiresIn?: number },
  isPassive: boolean
): Record<string, unknown> {
  return {
    ...credentials,
    ...(isPassive ? refreshed : {}),
    accessToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken || credentials.refreshToken,
    expiresAt: refreshed.expiresAt
      ? refreshed.expiresAt
      : resolveExpiryWithoutAbsolute(refreshed, credentials.expiresAt),
  };
}

async function checkAndRefreshTokenInner(provider: string, credentials: any) {
  let resultFence = getCodexOperationFence(String(credentials.connectionId || ""));
  const adoptCommittedRefresh = (result: object): boolean => {
    const committed = adoptCommittedCodexRefresh(result, resultFence);
    if (!committed) return false;
    resultFence = committed;
    return true;
  };
  let updatedCredentials = { ...credentials };

  // Check regular token expiry. Use the provider-specific lead time so rotating-
  // token providers (Codex/OpenAI) refresh FAR ahead of access_token expiry. This
  // keeps the refresh_token "warm" — refreshed regularly enough that Auth0 doesn't
  // mark it as stale and revoke the token family on first use after long idle.
  // parseTokenExpiryMs accepts numeric epochs (s/ms, number or TEXT-column
  // string) as well as ISO; 0 means "no usable expiry" and never triggers.
  const expiresAt = parseTokenExpiryMs(updatedCredentials.expiresAt);
  if (expiresAt > 0) {
    const now = Date.now();
    const refreshLead = _getRefreshLeadMs(provider, updatedCredentials.providerSpecificData);

    if (expiresAt - now < refreshLead) {
      log.info("TOKEN_REFRESH", "Token expiring soon, refreshing proactively", {
        provider,
        expiresIn: Math.round((expiresAt - now) / 1000),
        refreshLeadMs: refreshLead,
      });

      const connectionId: string | undefined = updatedCredentials.connectionId;

      // Pass onPersist so the DB write happens INSIDE the open-sse per-connection
      // mutex, making [network call + DB write] one atomic step. This eliminates the
      // race where a concurrent request reads stale DB credentials before the write
      // and re-uses a rotated refresh token (refresh_token_reused on Codex/OpenAI).
      // The separate withConnectionRefreshMutex wrapper is no longer needed here.
      const persistCallback = createRefreshPersistCallback(
        connectionId,
        () => resultFence,
        adoptCommittedRefresh
      );

      let newCredentials;
      try {
        newCredentials = await getAccessToken(provider, updatedCredentials, persistCallback);
      } catch (error) {
        if (!keepsMuseCredentialsAfterRefreshError(provider, error)) throw error;
        return { ...credentials };
      }

      if (newCredentials && newCredentials.accessToken) {
        const adoptedFence = adoptProactiveRefresh(
          provider,
          resultFence,
          updatedCredentials,
          newCredentials,
          adoptCommittedRefresh
        );
        if (passive.isPassiveCodex(provider)) resultFence = adoptedFence;
        // For the no-connectionId path (no mutex, no onPersist), persist here as before.
        if (!connectionId) {
          await updateProviderCredentials(updatedCredentials.connectionId, newCredentials);
        }

        updatedCredentials = mergeProactiveRefreshCredentials(
          updatedCredentials,
          newCredentials,
          passive.isPassiveCodex(provider)
        );
      }
    }
  }

  // Check GitHub/GHE Copilot token expiry. Both github.com Copilot and GHE
  // Copilot (device-code flow against an enterprise host) issue a short-lived
  // sub-token separate from the OAuth access token, stored the same way in
  // providerSpecificData.copilotTokenExpiresAt — only the token endpoint host
  // differs (resolveCopilotTokenBaseUrl picks it via providerSpecificData.gheUrl).
  if (
    (provider === "github" || provider === "ghe-copilot") &&
    updatedCredentials.providerSpecificData?.copilotTokenExpiresAt
  ) {
    const copilotExpiresAt = updatedCredentials.providerSpecificData.copilotTokenExpiresAt * 1000;
    const now = Date.now();

    if (copilotExpiresAt - now < TOKEN_EXPIRY_BUFFER_MS) {
      log.info("TOKEN_REFRESH", "Copilot token expiring soon, refreshing proactively", {
        provider,
        expiresIn: Math.round((copilotExpiresAt - now) / 1000),
      });

      const copilotToken = await refreshCopilotToken(
        updatedCredentials.accessToken,
        updatedCredentials,
        resolveCopilotTokenBaseUrl(provider, updatedCredentials)
      );
      if (copilotToken?.token) {
        await updateProviderCredentials(updatedCredentials.connectionId, {
          providerSpecificData: {
            ...updatedCredentials.providerSpecificData,
            copilotToken: copilotToken.token,
            copilotTokenExpiresAt: copilotToken.expiresAt,
          },
        });

        updatedCredentials.providerSpecificData = {
          ...updatedCredentials.providerSpecificData,
          copilotToken: copilotToken.token,
          copilotTokenExpiresAt: copilotToken.expiresAt,
        };
        // Sync to top-level so buildHeaders() picks up the fresh token
        updatedCredentials.copilotToken = copilotToken.token;
      }
    }
  }

  validateRefreshedCodexFence(resultFence, updatedCredentials);
  return updatedCredentials;
}

// Local-specific: Refresh GitHub and Copilot tokens together
registerCredentialRefresher(checkAndRefreshToken);
// The engine persists and adopts fenced Codex rotations through this seam (no open-sse -> src import).
registerCodexRefreshPersistence({ adoptCommittedCodexRefresh, persistCodexRefresh });

export async function refreshGitHubAndCopilotTokens(credentials: any) {
  const newGitHubCredentials = await refreshGitHubToken(credentials.refreshToken, credentials);
  if (newGitHubCredentials?.accessToken) {
    const copilotToken = await refreshCopilotToken(newGitHubCredentials.accessToken, credentials);
    if (copilotToken?.token) {
      return {
        ...newGitHubCredentials,
        providerSpecificData: {
          copilotToken: copilotToken.token,
          copilotTokenExpiresAt: copilotToken.expiresAt,
        },
      };
    }
  }
  return newGitHubCredentials;
}
