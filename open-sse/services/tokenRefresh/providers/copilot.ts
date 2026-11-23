// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { getGitHubCopilotRefreshHeaders } from "../../../config/providerHeaderProfiles.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { stripTrailingSlashes } from "../../../utils/urlSanitize.ts";

export interface CopilotRefreshResult {
  token?: string;
  expiresAt?: number;
  status?: number | null;
  endpoints?: { proxy?: string; api?: string };
}

function extractCopilotEndpoints(data: { endpoints?: { proxy?: string; api?: string } } | null) {
  return data?.endpoints ? { proxy: data.endpoints.proxy, api: data.endpoints.api } : undefined;
}

function buildCopilotRefreshSuccess(
  token: string,
  expiresAt: number,
  data: { endpoints?: { proxy?: string; api?: string } } | null
): CopilotRefreshResult {
  const endpoints = extractCopilotEndpoints(data);
  return endpoints ? { token, expiresAt, endpoints } : { token, expiresAt };
}

export interface CopilotRefreshLogger {
  info?: (tag: string, msg: string, extra?: Record<string, unknown>) => void;
  error?: (tag: string, msg: string, extra?: Record<string, unknown>) => void;
}

/**
 * GHE Cloud with data residency (*.ghe.com) returns 404 on
 * /copilot_internal/v2/token and instead serves endpoint metadata at
 * /copilot_internal/user while accepting the OAuth access token directly.
 */
async function refreshGheDataResidencyCopilotToken(
  githubAccessToken: string,
  normalizedBase: string,
  headers: Record<string, string>,
  proxyConfig: unknown,
  log?: CopilotRefreshLogger | null
): Promise<CopilotRefreshResult | null> {
  if (normalizedBase === "https://api.github.com") return null;

  const userUrl = `${normalizedBase}/copilot_internal/user`;
  const userResponse = await runWithProxyContext(proxyConfig, () => fetch(userUrl, { headers }));
  if (!userResponse.ok) {
    await userResponse.body?.cancel().catch(() => {});
    return null;
  }

  const userData = await userResponse.json().catch(() => ({}));
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;
  log?.info?.("TOKEN_REFRESH", "Refreshed GHE Copilot token via copilot_internal/user", {
    hasToken: true,
    expiresAt,
  });
  return buildCopilotRefreshSuccess(githubAccessToken, expiresAt, userData);
}

async function handleFailedCopilotTokenResponse(
  response: Response,
  githubAccessToken: string,
  normalizedBase: string,
  headers: Record<string, string>,
  proxyConfig: unknown,
  log?: CopilotRefreshLogger | null
): Promise<CopilotRefreshResult> {
  if (response.status === 404) {
    await response.body?.cancel().catch(() => {});
    const fallback = await refreshGheDataResidencyCopilotToken(
      githubAccessToken,
      normalizedBase,
      headers,
      proxyConfig,
      log
    );
    if (fallback) return fallback;
  }

  log?.error?.("TOKEN_REFRESH", "Failed to refresh Copilot token", {
    status: response.status,
  });
  return { status: response.status };
}

/**
 * Refresh GitHub Copilot token using a GitHub access token.
 *
 * `baseUrl` defaults to github.com's Copilot API but can be overridden to a
 * GitHub Enterprise host's `<gheUrl>/api/v3` so the same helper serves both
 * the `github` and `ghe-copilot` providers (GHE has its own per-enterprise
 * Copilot token endpoint; api.github.com never issues a token scoped to a
 * GHE account).
 */
export async function refreshCopilotToken(
  githubAccessToken,
  log,
  proxyConfig: unknown = null,
  baseUrl: string = "https://api.github.com"
): Promise<CopilotRefreshResult> {
  try {
    const normalizedBase = stripTrailingSlashes(baseUrl);
    const tokenUrl = `${normalizedBase}/copilot_internal/v2/token`;
    const headers = getGitHubCopilotRefreshHeaders(`token ${githubAccessToken}`);
    const response = await runWithProxyContext(proxyConfig, () => fetch(tokenUrl, { headers }));

    if (!response.ok) {
      return await handleFailedCopilotTokenResponse(
        response,
        githubAccessToken,
        normalizedBase,
        headers,
        proxyConfig,
        log
      );
    }

    const data = await response.json();
    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Copilot token", {
      hasToken: !!data.token,
      expiresAt: data.expires_at,
    });
    return buildCopilotRefreshSuccess(data.token, data.expires_at, data);
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", "Error refreshing Copilot token", {
      errorType: error?.name || "Error",
    });
    return { status: null };
  }
}
