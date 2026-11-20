// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { getGitHubCopilotRefreshHeaders } from "../../../config/providerHeaderProfiles.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";

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
) {
  try {
    const normalizedBase = baseUrl.replace(/\/+$/, "");
    const tokenUrl = `${normalizedBase}/copilot_internal/v2/token`;
    const headers = getGitHubCopilotRefreshHeaders(`token ${githubAccessToken}`);
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(tokenUrl, { headers })
    );

    if (!response.ok) {
      // GHE Cloud with data residency (*.ghe.com) returns 404 on
      // /copilot_internal/v2/token and instead serves endpoint metadata at
      // /copilot_internal/user while accepting the OAuth access token directly.
      if (response.status === 404 && normalizedBase !== "https://api.github.com") {
        await response.body?.cancel().catch(() => {});
        const userUrl = `${normalizedBase}/copilot_internal/user`;
        const userResponse = await runWithProxyContext(proxyConfig, () =>
          fetch(userUrl, { headers })
        );
        if (userResponse.ok) {
          const userData = await userResponse.json().catch(() => ({}));
          const expiresAt = Math.floor(Date.now() / 1000) + 3600;
          const endpoints = userData?.endpoints
            ? { proxy: userData.endpoints.proxy, api: userData.endpoints.api }
            : undefined;
          log?.info?.("TOKEN_REFRESH", "Refreshed GHE Copilot token via copilot_internal/user", {
            hasToken: true,
            expiresAt,
          });
          return {
            token: githubAccessToken,
            expiresAt,
            ...(endpoints ? { endpoints } : {}),
          };
        }
        await userResponse.body?.cancel().catch(() => {});
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh Copilot token", {
        status: response.status,
      });
      return { status: response.status };
    }

    const data = await response.json();
    const endpoints = data?.endpoints
      ? { proxy: data.endpoints.proxy, api: data.endpoints.api }
      : undefined;

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Copilot token", {
      hasToken: !!data.token,
      expiresAt: data.expires_at,
    });

    return {
      token: data.token,
      expiresAt: data.expires_at,
      ...(endpoints ? { endpoints } : {}),
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", "Error refreshing Copilot token", {
      errorType: error?.name || "Error",
    });
    return { status: null };
  }
}
