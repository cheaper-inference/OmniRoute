import { randomBytes } from "node:crypto";

import { FREEBUFF_CONFIG } from "../constants/oauth";

/**
 * Freebuff (freebuff.com — Codebuff free tier) — custom fingerprint login flow.
 *
 *   1. POST codeUrl { fingerprintId } → { loginUrl, fingerprintHash, expiresAt }
 *   2. Open loginUrl in the browser
 *   3. GET statusUrl?fingerprintId&fingerprintHash&expiresAt until { user.authToken }
 *      (401 = still pending)
 *
 * Mirrors the official `freebuff login` flow (CodebuffAI/codebuff
 * cli/src/login/login-flow.ts). The poll needs all three login values, so they
 * travel as one opaque base64url `device_code` through the shared device-code route.
 * The resulting auth token has no refresh grant — re-login replaces it.
 */
type FreebuffConfig = typeof FREEBUFF_CONFIG;

interface FreebuffLoginState {
  fingerprintId: string;
  fingerprintHash: string;
  expiresAt: string;
}

interface FreebuffDeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

interface FreebuffTokens {
  access_token: string;
  _userId?: string;
  _userEmail?: string;
  _userName?: string;
  _fingerprintId?: string;
}

interface FreebuffPollResult {
  ok: boolean;
  data: Record<string, unknown> | FreebuffTokens;
}

/** Same shape as the CLI's fallback fingerprint (`codebuff-cli-<8 base64url chars>`). */
export function generateFreebuffFingerprintId(): string {
  return `codebuff-cli-${randomBytes(6).toString("base64url").substring(0, 8)}`;
}

export function encodeFreebuffLoginState(state: FreebuffLoginState): string {
  return Buffer.from(JSON.stringify(state), "utf8").toString("base64url");
}

export function decodeFreebuffLoginState(deviceCode: unknown): FreebuffLoginState | null {
  if (typeof deviceCode !== "string" || !deviceCode) return null;
  try {
    const parsed = JSON.parse(Buffer.from(deviceCode, "base64url").toString("utf8"));
    if (
      parsed &&
      typeof parsed.fingerprintId === "string" &&
      typeof parsed.fingerprintHash === "string" &&
      typeof parsed.expiresAt === "string" &&
      parsed.fingerprintId &&
      parsed.fingerprintHash &&
      parsed.expiresAt
    ) {
      return {
        fingerprintId: parsed.fingerprintId,
        fingerprintHash: parsed.fingerprintHash,
        expiresAt: parsed.expiresAt,
      };
    }
  } catch {} // a malformed device code is reported by the caller as invalid_request
  return null;
}

function secondsUntil(expiresAt: string, fallback: number): number {
  const ms = Date.parse(expiresAt) - Date.now();
  if (!Number.isFinite(ms)) return fallback;
  return Math.max(1, Math.floor(ms / 1000));
}

const EXPIRED_RESULT: FreebuffPollResult = {
  ok: false,
  data: { error: "expired_token", error_description: "Freebuff login expired" },
};

export const freebuff = {
  config: FREEBUFF_CONFIG,
  flowType: "device_code" as const,

  requestDeviceCode: async (config: FreebuffConfig): Promise<FreebuffDeviceCodeResponse> => {
    const fingerprintId = generateFreebuffFingerprintId();
    const response = await fetch(config.codeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ fingerprintId }),
    });

    if (!response.ok) {
      throw new Error(`Freebuff login URL request failed (${response.status})`);
    }

    const data = (await response.json()) as {
      loginUrl?: unknown;
      fingerprintHash?: unknown;
      expiresAt?: unknown;
    };
    if (
      typeof data.loginUrl !== "string" ||
      typeof data.fingerprintHash !== "string" ||
      typeof data.expiresAt !== "string" ||
      !data.loginUrl ||
      !data.fingerprintHash ||
      !data.expiresAt
    ) {
      throw new Error("Freebuff login URL response is missing required fields");
    }

    return {
      device_code: encodeFreebuffLoginState({
        fingerprintId,
        fingerprintHash: data.fingerprintHash,
        expiresAt: data.expiresAt,
      }),
      user_code: fingerprintId.replace(/^codebuff-cli-/, ""),
      verification_uri: data.loginUrl,
      verification_uri_complete: data.loginUrl,
      expires_in: secondsUntil(data.expiresAt, config.loginTimeoutSec),
      interval: Math.max(1, Math.floor(config.pollInterval / 1000)),
    };
  },

  pollToken: async (config: FreebuffConfig, deviceCode: string): Promise<FreebuffPollResult> => {
    const state = decodeFreebuffLoginState(deviceCode);
    if (!state) {
      return {
        ok: false,
        data: { error: "invalid_request", error_description: "Malformed Freebuff login state" },
      };
    }

    const url = new URL(config.statusUrl);
    url.searchParams.set("fingerprintId", state.fingerprintId);
    url.searchParams.set("fingerprintHash", state.fingerprintHash);
    url.searchParams.set("expiresAt", state.expiresAt);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const expired = Date.parse(state.expiresAt) <= Date.now();
    if (!response.ok) {
      if (expired) return EXPIRED_RESULT;
      // 401 is the upstream "not approved yet" signal; the official CLI keeps
      // polling through any other status until its timeout, too.
      if (response.status === 429 || response.status >= 500) {
        return { ok: false, data: { error: "slow_down" } };
      }
      return { ok: false, data: { error: "authorization_pending" } };
    }

    // Read the body exactly once (text → JSON) so a non-JSON body cannot trigger
    // a second body read.
    const text = await response.text();
    let body: { user?: Record<string, unknown> } | null = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {} // a non-JSON 2xx body is treated as still pending below
    const user = body?.user;
    if (user && typeof user === "object" && typeof user.authToken === "string" && user.authToken) {
      return {
        ok: true,
        data: {
          access_token: user.authToken,
          _userId: typeof user.id === "string" ? user.id : undefined,
          _userEmail: typeof user.email === "string" ? user.email : undefined,
          _userName: typeof user.name === "string" && user.name ? user.name : undefined,
          _fingerprintId: state.fingerprintId,
        },
      };
    }

    if (expired) return EXPIRED_RESULT;
    return { ok: false, data: { error: "authorization_pending" } };
  },

  mapTokens: (tokens: FreebuffTokens) => ({
    accessToken: tokens.access_token,
    refreshToken: null,
    expiresIn: null,
    email: tokens._userEmail,
    displayName: tokens._userName,
    providerSpecificData: {
      ...(tokens._userId ? { userId: tokens._userId } : {}),
      ...(tokens._fingerprintId ? { fingerprintId: tokens._fingerprintId } : {}),
    },
  }),
};

export default freebuff;
