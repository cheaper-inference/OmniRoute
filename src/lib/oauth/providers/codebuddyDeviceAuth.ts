export interface CodeBuddyDeviceCodeConfig {
  stateUrl: string;
  tokenUrl: string;
  userAgent: string;
  platform: string;
  domain?: string;
  pollInterval?: number;
}

export interface CodeBuddyDeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

export interface CodeBuddyTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
}

interface CodeBuddyEnvelope<T> {
  code?: number;
  data?: T;
  msg?: string;
}

interface CodeBuddyStatePayload {
  state?: string | number;
  authUrl?: string;
  url?: string;
}

interface CodeBuddyTokenPayload {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface CodeBuddyPollResult {
  ok: boolean;
  data: Record<string, unknown> | CodeBuddyTokens;
}

/**
 * Captured device-login envelope code: the gateway answers `11217` with
 * `msg: "login ing..."` while the user has not authorized the CLI yet. It is a
 * PENDING state, not an error — treating it as one aborts the modal mid-flow.
 */
export const CODEBUDDY_LOGIN_PENDING_CODE = 11217;

/** Body of `POST /v2/plugin/auth/state?platform=CLI` — captured as literal `{}`. */
export function buildCodeBuddyStateRequestBody(): string {
  return "{}";
}

/**
 * Map a raw `/v2/plugin/auth/token` envelope onto the generic device-flow
 * contract. `authorization_pending` is what `pollForToken()` already knows how
 * to propagate as `pending`, so the 11217 envelope is normalized there instead
 * of leaking a provider-specific code into the OAuth modal.
 */
export function normalizeCodeBuddyPollResponse(
  envelope: CodeBuddyEnvelope<CodeBuddyTokenPayload>
): CodeBuddyPollResult {
  if (envelope?.code === 0 && envelope.data?.accessToken) {
    return {
      ok: true,
      data: {
        access_token: envelope.data.accessToken,
        refresh_token: envelope.data.refreshToken || "",
        token_type: envelope.data.tokenType || "Bearer",
        expires_in: envelope.data.expiresIn,
      },
    };
  }

  if (envelope?.code === CODEBUDDY_LOGIN_PENDING_CODE) {
    return {
      ok: false,
      data: {
        error: "authorization_pending",
        error_description: envelope.msg || "login pending",
        pending: true,
        code: envelope.code,
      },
    };
  }

  // A genuine failure must still surface through the `error` field the device
  // flow consumer reads (`pollForToken` → `result.data.error`); `code`/`msg`
  // are kept only as diagnostics.
  return {
    ok: false,
    data: { error: envelope?.code, error_description: envelope?.msg, code: envelope?.code },
  };
}

export async function requestDeviceCode(
  config: CodeBuddyDeviceCodeConfig
): Promise<CodeBuddyDeviceCodeResponse> {
  const stateUrl = `${config.stateUrl}?platform=${encodeURIComponent(config.platform)}`;
  const domain = config.domain || "copilot.tencent.com";
  const response = await fetch(stateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": config.userAgent,
      "X-Requested-With": "XMLHttpRequest",
      "X-Domain": domain,
      "X-No-Authorization": "true",
      "X-No-User-Id": "true",
      "X-Product": "SaaS",
    },
    body: buildCodeBuddyStateRequestBody(),
  });

  if (!response.ok) {
    const _err = await response.text();
    throw new Error(`CodeBuddy state request failed (${response.status})`);
  }

  const json = (await response.json()) as CodeBuddyEnvelope<CodeBuddyStatePayload>;
  if (json.code !== 0 || !json.data?.state) {
    throw new Error(`CodeBuddy state error: ${json.msg || "no state in response"}`);
  }

  const state = String(json.data.state);
  const authUrl = String(json.data.authUrl || json.data.url || "");
  return {
    device_code: state,
    user_code: state,
    verification_uri: authUrl,
    verification_uri_complete: authUrl,
    expires_in: 600,
    interval: Math.max(1, Math.floor((config.pollInterval || 5000) / 1000)),
  };
}

export async function pollToken(
  config: CodeBuddyDeviceCodeConfig,
  deviceCode: string
): Promise<CodeBuddyPollResult> {
  const domain = config.domain || "copilot.tencent.com";
  const response = await fetch(`${config.tokenUrl}?state=${encodeURIComponent(deviceCode)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": config.userAgent,
      "X-Requested-With": "XMLHttpRequest",
      "X-Domain": domain,
      "X-No-Authorization": "true",
      "X-No-User-Id": "true",
      "X-No-Enterprise-Id": "true",
      "X-No-Department-Info": "true",
      "X-Product": "SaaS",
    },
  });
  if (!response.ok) return { ok: false, data: { error: "request_failed" } };
  const data = (await response.json()) as CodeBuddyEnvelope<CodeBuddyTokenPayload>;
  return normalizeCodeBuddyPollResponse(data);
}

export function mapTokens(tokens: CodeBuddyTokens) {
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in || 86400,
    providerSpecificData: {},
  };
}
