import { getGitHubCopilotChatUserAgent } from "@omniroute/open-sse/config/providerHeaderProfiles.ts";
import { GITHUB_CONFIG } from "../constants/oauth";
import {
  discoverCopilotCapabilities,
  buildDefaultCapabilityRecord,
} from "@omniroute/open-sse/services/githubCopilotCapabilities.ts";

export const github = {
  config: GITHUB_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const response = await fetch(config.deviceCodeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        scope: config.scopes,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Device code request failed: ${error}`);
    }

    return await response.json();
  },
  pollToken: async (config, deviceCode) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    // Read the body once: after a failed response.json() the stream is already
    // consumed, so a fallback response.text() would throw "Body is unusable"
    // and reject pollToken instead of surfacing the upstream error page.
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: "invalid_response", error_description: text };
    }

    return {
      ok: response.ok,
      data: data,
    };
  },
  postExchange: async (tokens) => {
    // Fetch the short-lived Copilot inference token.
    // A non-2xx response here means the GitHub account has no Copilot subscription.
    const copilotRes = await fetch(GITHUB_CONFIG.copilotTokenUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": getGitHubCopilotChatUserAgent(),
      },
    });
    const copilotTokenData = copilotRes.ok ? await copilotRes.json() : null;

    const userRes = await fetch(GITHUB_CONFIG.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": getGitHubCopilotChatUserAgent(),
      },
    });
    const userInfo = userRes.ok ? await userRes.json() : {};

    // Verify Copilot entitlement and discover plan / model-selection capabilities.
    // A missing copilot token (entitlement absent) produces a conservative default
    // record rather than aborting the connection — callers see entitlementVerified:false
    // and the UI shows a warning instead of silently failing.
    let capabilities = buildDefaultCapabilityRecord();
    try {
      capabilities = await discoverCopilotCapabilities({
        accessToken: tokens.access_token,
        copilotToken: copilotTokenData?.token ?? null,
        apiVersion: GITHUB_CONFIG.apiVersion,
        userAgent: GITHUB_CONFIG.userAgent,
      });
    } catch {
      // Network failure during capability discovery — use default conservative record.
    }

    return {
      copilotToken: copilotTokenData ?? {},
      userInfo,
      capabilities,
    };
  },
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    providerSpecificData: {
      autoSync: true,
      copilotToken: extra?.copilotToken?.token,
      copilotTokenExpiresAt: extra?.copilotToken?.expires_at,
      githubUserId: extra?.userInfo?.id,
      githubLogin: extra?.userInfo?.login,
      githubName: extra?.userInfo?.name,
      githubEmail: extra?.userInfo?.email,
      // Capability record: plan, model selection mode, quota state, policy status.
      // Refreshed periodically; stale after 6 hours (see areCapabilitiesFresh).
      copilotCapabilities: extra?.capabilities ?? buildDefaultCapabilityRecord(),
    },
  }),
};
