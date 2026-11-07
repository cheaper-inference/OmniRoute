/**
 * Muse Code (Meta) public endpoints and CLI identity.
 *
 * Parity with CLIProxyAPI's Meta provider (`internal/auth/meta`,
 * `internal/runtime/executor/meta_executor*`): RFC 8628 device grant against
 * auth.meta.com, then mint of the subscription inference key at
 * api.meta.ai/muse-code/key. The Muse CLI User-Agent is required by Meta.
 */

import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const MUSE_CODE_USER_AGENT = "muse-code/1.0.2";
/**
 * The Muse Code client inference identity, as sent by Muse Code 1.4.14-R7309.1 on
 * /v1/responses (auth still uses muse-code/1.0.2). Subscription keys serve requests from the
 * Muse Code client; the retired muse-build/1.3.0 fingerprint was refused with
 * client_attestation_denied. Session headers are added per request by the executor.
 */
export const MUSE_CODE_CLIENT_VERSION = "1.4.14";
export const MUSE_CODE_CLIENT_BUILD = "dec7d7497fecdad135ec5835a8161dbc92e55b58";
/** `X-Client-Id` of the headless (`muse exec`) surface. */
export const MUSE_CODE_CLIENT_SURFACE = "tbh:exec";

/** The client User-Agent for this host's OS and architecture, as the real client reports them. */
export function museCodeClientUserAgent(
  platform: string = process.platform,
  arch: string = process.arch
): string {
  const os = platform === "darwin" ? "macos" : platform === "win32" ? "windows" : platform;
  const cpu = arch === "x64" ? "x86_64" : arch === "arm64" ? "aarch64" : arch;
  return `muse-build/${MUSE_CODE_CLIENT_VERSION} (non-interactive; ${os}-${cpu}; build ${MUSE_CODE_CLIENT_BUILD})`;
}
export const MUSE_CODE_AUTH_HOST = "https://auth.meta.com";
export const MUSE_CODE_DEVICE_CODE_URL = `${MUSE_CODE_AUTH_HOST}/oidc/device/authorization/`;
export const MUSE_CODE_TOKEN_URL = `${MUSE_CODE_AUTH_HOST}/oidc/device/token/`;
export const MUSE_CODE_MINT_URL = "https://api.meta.ai/muse-code/key";
export const MUSE_CODE_API_BASE_URL = "https://api.meta.ai/v1";
export const MUSE_CODE_RESPONSES_URL = `${MUSE_CODE_API_BASE_URL}/responses`;
/** Muse Image (OpenAI-compatible): JSON generations + multipart edits on the same key. */
export const MUSE_CODE_IMAGES_GENERATIONS_URL = `${MUSE_CODE_API_BASE_URL}/images/generations`;
export const MUSE_CODE_IMAGES_EDITS_URL = `${MUSE_CODE_API_BASE_URL}/images/edits`;
export const MUSE_CODE_DEVICE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";
export const MUSE_CODE_DEFAULT_POLL_INTERVAL_SEC = 5;
export const MUSE_CODE_MAX_POLL_MS = 15 * 60 * 1000;

export function museCodeHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    Accept: "application/json",
    "User-Agent": MUSE_CODE_USER_AGENT,
    ...extra,
  };
}

export function isMuseDcaToken(token: string | null | undefined): boolean {
  return typeof token === "string" && token.trim().startsWith("dca:");
}

export function normalizeMuseBaseUrl(raw: string | null | undefined): string {
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return MUSE_CODE_API_BASE_URL;
  return stripTrailingSlashes(trimmed);
}
