/**
 * MiniMax Code — OAuth2 device-code login (RFC 8628) with S256-PKCE.
 *
 * The MiniMax Code CLI and the desktop app authenticate against the MiniMax
 * account service with the device-code grant: the server asks for a code, the
 * user confirms it in the browser, and the grant is exchanged for an access
 * token plus a refresh token. The dashboard reuses that flow, so an operator
 * can sign in to their MiniMax account without the CLI.
 *
 * The credential obtained here is written into the local MiniMax Code profile
 * (see `persistProfileCredential`), so the CLI and the local agent pick it up
 * on their next session instead of asking for a sign-in of their own.
 */

import {
  MINIMAX_CODE_AUDIENCE,
  MINIMAX_CODE_CODE_CHALLENGE_METHOD,
  MINIMAX_CODE_DEVICE_GRANT,
  MINIMAX_CODE_SCOPE,
  MINIMAX_CODE_USER_AGENT,
} from "@omniroute/open-sse/config/minimaxCode.ts";
import { persistProfileCredential } from "@omniroute/open-sse/executors/minimaxCodeGateway.ts";
import { MINIMAX_CODE_CONFIG } from "../constants/oauth";

type JsonRecord = Record<string, unknown>;

interface MiniMaxCodeTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  error?: string;
  error_description?: string;
}

/**
 * Result of the post-exchange step: did the credential reach the local
 * MiniMax Code profile? The dashboard account is created either way, so a
 * profile that cannot be written is reported, not fatal.
 */
export interface MiniMaxCodePostExchange {
  profileSynced: boolean;
  profileSyncError?: string;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Post a form to the MiniMax account endpoint.
 *
 * The endpoint answers a pending device code with HTTP 400 and a JSON body
 * (`{"error":"authorization_pending"}`), so the body — not the status — decides
 * what happened. The status is only used to tell "the endpoint said no" from
 * "the endpoint was unreachable".
 */
async function postAccountForm(
  url: string,
  params: Record<string, string>,
  fetchImpl?: typeof fetch
): Promise<{ status: number; data: JsonRecord }> {
  const doFetch = fetchImpl || fetch;
  try {
    const response = await doFetch(url, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(20_000),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": MINIMAX_CODE_USER_AGENT,
      },
      body: new URLSearchParams(params).toString(),
    });
    const data = await response.json().catch(() => null);
    return { status: response.status, data: asRecord(data) };
  } catch {
    return { status: 0, data: { error: "network_error" } };
  }
}

/** Error text of an account-endpoint answer, safe to show in the dashboard. */
function accountErrorText(data: JsonRecord): string {
  const description = asString(data.error_description);
  const error = asString(data.error);
  return description || error || "unknown error";
}

export const minimaxCode = {
  config: MINIMAX_CODE_CONFIG,
  flowType: "device_code",

  /**
   * Ask the account endpoint for a device code.
   *
   * The PKCE challenge binds the grant to this instance: only the verifier
   * the panel kept can redeem the device code.
   */
  requestDeviceCode: async (config, codeChallenge?: string) => {
    const { status, data } = await postAccountForm(
      config.deviceCodeUrl,
      {
        client_id: config.clientId,
        scope: config.scope,
        audience: config.audience,
        code_challenge: codeChallenge || "",
        code_challenge_method: MINIMAX_CODE_CODE_CHALLENGE_METHOD,
      },
      config.fetchImpl
    );

    const deviceCode = asString(data.device_code);
    const userCode = asString(data.user_code);
    if (status === 0) {
      throw new Error("MiniMax Code device authorization failed: the account endpoint is unreachable");
    }
    if (!deviceCode || !userCode) {
      throw new Error(`MiniMax Code device authorization failed: ${accountErrorText(data)}`);
    }

    const verificationUri = asString(data.verification_uri);
    return {
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: verificationUri,
      verification_uri_complete: asString(data.verification_uri_complete) || verificationUri,
      expires_in: asNumber(data.expires_in) || 300,
      interval: asNumber(data.interval) || 5,
    };
  },

  /**
   * Redeem the device code.
   *
   * `authorization_pending` (the user has not confirmed yet) and `slow_down`
   * are the states the panel keeps polling on; `expired_token` and
   * `access_denied` end the flow.
   */
  pollToken: async (config, deviceCode: string, codeVerifier?: string) => {
    const { status, data } = await postAccountForm(
      config.tokenUrl,
      {
        grant_type: MINIMAX_CODE_DEVICE_GRANT,
        device_code: deviceCode,
        client_id: config.clientId,
        code_verifier: codeVerifier || "",
      },
      config.fetchImpl
    );

    if (status === 0) {
      return { ok: false, data: { error: "network_error" } };
    }

    const accessToken = asString(data.access_token);
    if (accessToken) {
      return { ok: true, data: asRecord(data) };
    }

    const error = asString(data.error);
    if (!error) {
      return {
        ok: false,
        data: { error: "poll_failed", error_description: `Poll failed: ${status}` },
      };
    }
    return { ok: false, data: { error, error_description: asString(data.error_description) } };
  },

  /**
   * Write the credential into the local MiniMax Code profile.
   *
   * The profile belongs to the MiniMax Code application, so the write follows
   * its rules (the helper raises the generation above every generation in
   * use). A profile that cannot be written — no MiniMax Code login on this
   * host yet, a read-only home — must not fail the sign-in: the dashboard
   * account is still created, and the reason is reported next to it.
   */
  postExchange: async (tokens: MiniMaxCodeTokenResponse): Promise<MiniMaxCodePostExchange> => {
    const accessToken = asString(tokens.access_token);
    if (!accessToken) {
      throw new Error("MiniMax Code device flow completed without an access token.");
    }
    const refreshToken = asString(tokens.refresh_token);
    const expiresIn = asNumber(tokens.expires_in);
    try {
      await persistProfileCredential({
        accessToken,
        refreshToken: refreshToken || undefined,
        expiresAtMs: Date.now() + (expiresIn > 0 ? expiresIn : 3600) * 1000,
        clientId: MINIMAX_CODE_CONFIG.clientId,
        scopes: [MINIMAX_CODE_SCOPE],
        audience: MINIMAX_CODE_AUDIENCE,
      });
      return { profileSynced: true };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      console.warn(
        `[minimax-code] the credential could not be written into the local MiniMax Code profile: ${reason}`
      );
      return { profileSynced: false, profileSyncError: reason };
    }
  },

  mapTokens: (tokens: MiniMaxCodeTokenResponse, extra?: MiniMaxCodePostExchange) => {
    const expiresIn = asNumber(tokens.expires_in);
    return {
      accessToken: asString(tokens.access_token),
      refreshToken: asString(tokens.refresh_token) || undefined,
      expiresIn: expiresIn > 0 ? expiresIn : undefined,
      tokenType: asString(tokens.token_type) || "Bearer",
      // The account endpoint does not return an account identity, so the
      // dashboard labels the account by provider.
      displayName: "MiniMax Code account",
      providerSpecificData: {
        authKind: "oauth",
        accountBase: MINIMAX_CODE_CONFIG.accountBase,
        // Did the credential reach the local profile the CLI reads?
        profileSynced: extra?.profileSynced === true,
        profileSyncError: extra?.profileSyncError,
        lastRefresh: new Date().toISOString(),
      },
    };
  },
};
