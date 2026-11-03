// @ts-nocheck
/**
 * GitHub Copilot sub-token refresh helper for the proactive token health check.
 *
 * GitHub Copilot issues a short-lived (~30 min) API token separate from the
 * GitHub OAuth token. After a successful OAuth refresh, the health check must
 * also refresh this sub-token before it expires mid-session. The Copilot
 * token expiry is stored in providerSpecificData.copilotTokenExpiresAt (Unix
 * seconds). Extracted out of tokenHealthCheck.ts to keep that file under the
 * frozen file-size budget (see config/quality/file-size-baseline.json).
 */

import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { refreshCopilotToken } from "@omniroute/open-sse/services/tokenRefresh.ts";
import { getGitHubCopilotRefreshHeaders } from "@omniroute/open-sse/config/providerHeaderProfiles.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

type HealthCheckLogger = {
  info: (tag: string, msg: string) => void;
  warn: (tag: string, msg: string) => void;
  error: (tag: string, msg: string, extra?: Record<string, unknown>) => void;
};

export async function refreshGithubCopilotSubTokenIfNeeded(params: {
  conn: any;
  result: { accessToken?: string };
  proxyConfig: unknown;
  healthCheckLog: HealthCheckLogger;
  log: (message: string, ...args: any[]) => void;
  logWarn: (message: string, ...args: any[]) => void;
  logError: (message: string, ...args: any[]) => void;
  getConnectionLogLabel: (conn: { name?: string; email?: string; id?: string }) => string;
  logPrefix: string;
}): Promise<void> {
  const {
    conn,
    result,
    proxyConfig,
    healthCheckLog,
    log,
    logWarn,
    logError,
    getConnectionLogLabel,
    logPrefix,
  } = params;

  if (String(conn.provider || "").toLowerCase() !== "github") return;

  // Re-read the latest connection after the OAuth refresh (onPersist may have updated it).
  const latestConn = (await getProviderConnectionById(conn.id).catch(() => null)) || conn;
  const accessTokenForCopilot = result.accessToken || latestConn.accessToken;
  if (!accessTokenForCopilot) return;

  const copilotExpiresAtRaw =
    latestConn.providerSpecificData?.copilotTokenExpiresAt ??
    conn.providerSpecificData?.copilotTokenExpiresAt;
  const copilotExpiresAtMs =
    typeof copilotExpiresAtRaw === "number" && copilotExpiresAtRaw < 1e12
      ? copilotExpiresAtRaw * 1000 // Unix seconds → ms
      : typeof copilotExpiresAtRaw === "string"
        ? new Date(copilotExpiresAtRaw).getTime()
        : typeof copilotExpiresAtRaw === "number"
          ? copilotExpiresAtRaw
          : 0;

  const copilotAboutToExpire =
    !copilotExpiresAtMs || copilotExpiresAtMs - Date.now() < 5 * 60 * 1000;
  if (!copilotAboutToExpire) return;

  log(`${logPrefix} Refreshing GitHub Copilot sub-token for ${getConnectionLogLabel(conn)}`);
  try {
    const copilotResult = await refreshCopilotToken(
      accessTokenForCopilot,
      healthCheckLog,
      proxyConfig
    );
    if (copilotResult?.token) {
      await updateProviderConnection(conn.id, {
        providerSpecificData: {
          ...(latestConn.providerSpecificData || {}),
          copilotToken: copilotResult.token,
          copilotTokenExpiresAt: copilotResult.expiresAt,
        },
      });
      log(`${logPrefix} ✓ GitHub Copilot sub-token refreshed for ${getConnectionLogLabel(conn)}`);
    } else {
      logWarn(
        `${logPrefix} ✗ GitHub Copilot sub-token refresh failed for ${getConnectionLogLabel(conn)}`
      );
    }
  } catch (copilotErr) {
    logError(`${logPrefix} Error refreshing Copilot sub-token:`, copilotErr?.message || copilotErr);
  }
}

/** Upper bound for the healthy-path GitHub /user probe (no timeout = a stuck socket hangs the sweep). */
export const GITHUB_ACCESS_TOKEN_PROBE_TIMEOUT_MS = 10_000;

/**
 * When the Copilot sub-token is still healthy, skip rotating it — but still
 * ask GitHub whether the parent access token is alive. A verified 401 must
 * demote the connection (`github_access_token_invalid`); other statuses and
 * network errors stay active.
 *
 * The probe replaces the `copilot_internal/v2/token` refresh on this path, so it
 * keeps that call's egress and wire profile: it runs inside the connection's
 * proxy context (a proxied account must never leak the host's real IP) and
 * sends the same Copilot refresh header profile (`token <access token>`).
 */
export async function probeGitHubAccessToken(params: {
  accessToken: string;
  apiBaseUrl: string;
  proxyConfig?: unknown;
  timeoutMs?: number;
}): Promise<{ status: number } | null> {
  const base = String(params.apiBaseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  if (!base || !params.accessToken) return null;
  const timeoutMs = params.timeoutMs ?? GITHUB_ACCESS_TOKEN_PROBE_TIMEOUT_MS;
  try {
    const response = await runWithProxyContext(params.proxyConfig ?? null, () =>
      fetch(`${base}/user`, {
        method: "GET",
        headers: getGitHubCopilotRefreshHeaders(`token ${params.accessToken}`),
        signal: AbortSignal.timeout(timeoutMs),
      })
    );
    // Only the status matters; release the socket.
    await response.body?.cancel().catch(() => {});
    return { status: response.status };
  } catch {
    return null;
  }
}
