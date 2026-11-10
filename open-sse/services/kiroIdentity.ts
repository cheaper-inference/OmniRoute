import { createHash } from "node:crypto";
import { v4 as uuidv4 } from "uuid";

import {
  isExternalIdpAuthMethod,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE,
} from "./kiroExternalIdp.ts";

/**
 * Kiro IDE identity constants shared by every CodeWhisperer / Amazon Q surface.
 *
 * Kiro's 2026-11-09 client-version enforcement (kirodotdev/Kiro#11335, OmniRoute
 * #19607) does not only look at a version number: a bare `kiro-cli/<version>` or
 * `kiro-ide/1.0.0` User-Agent is still answered with
 * `403 "This version of Kiro is no longer supported"` on the regional Amazon Q
 * hosts, even when the advertised version is above the documented CLI floor.
 * Live A/B evidence against an IdC `eu-central-1` profile (2026-11-10):
 *   • `q.eu-central-1` + `kiro-cli/3.1.0`             → 403 version gate
 *   • `q.eu-central-1` + full `KiroIDE-1.4.121-<id>`  → 200
 * The gate therefore expects the IDE-shaped fingerprint the native client sends,
 * not just a newer version string. Keep this in one module so the chat executor,
 * model discovery and usage surfaces cannot drift apart.
 */
export const KIRO_RUNTIME_SDK_VERSION = "1.0.0";

/** Current Kiro IDE release whose fingerprint Kiro accepts (kiro.dev/changelog/ide). */
export const KIRO_IDE_VERSION = "1.4.121";

/** OS token embedded in the fingerprint; a stable Windows desktop identity. */
export const KIRO_AGENT_OS = "windows";

/** Windows build token paired with KIRO_AGENT_OS in the fingerprint. */
export const KIRO_AGENT_OS_VERSION = "10.0.26200";

/** Node version token advertised by the desktop client fingerprint. */
export const KIRO_NODE_VERSION = "22.21.1";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Derive the stable machine id Kiro sees for a connection.
 *
 * The native IDE hashes a local machine identifier; OmniRoute has no such value,
 * so it hashes the most stable per-connection secret it already stores. clientId
 * is preferred because it survives token refresh; profileArn and the access token
 * are fallbacks so the id stays stable even for older connections.
 * @param providerSpecificData - persisted connection metadata (clientId/profileArn)
 * @param accessToken - current bearer token, used only when nothing stabler exists
 * @returns 64-hex machine id embedded in the KiroIDE fingerprint
 */
export function resolveKiroMachineId(
  providerSpecificData: unknown,
  accessToken?: string | null
): string {
  const psd = asRecord(providerSpecificData);
  const seed =
    toNonEmptyString(psd.clientId) ||
    toNonEmptyString(psd.profileArn) ||
    toNonEmptyString(accessToken) ||
    "kiro-anonymous";
  return createHash("sha256").update(String(seed)).digest("hex");
}

/**
 * Build the two User-Agent headers Kiro's version gate expects on inference calls.
 *
 * `api/codewhispererstreaming` is the surface name the IDE sends on
 * GenerateAssistantResponse (the model catalogue uses `codewhispererruntime`
 * instead), so the chat identity and the catalogue identity are built separately.
 * @param providerSpecificData - persisted connection metadata for the machine id
 * @param accessToken - current bearer token used as a last-resort machine-id seed
 * @returns the `User-Agent` and `X-Amz-User-Agent` values for one connection
 */
export function buildKiroServiceUserAgent(
  providerSpecificData: unknown,
  accessToken?: string | null
): { userAgent: string; amzUserAgent: string } {
  const machineId = resolveKiroMachineId(providerSpecificData, accessToken);
  const userAgent =
    `aws-sdk-js/${KIRO_RUNTIME_SDK_VERSION} ua/2.1 ` +
    `os/${KIRO_AGENT_OS}#${KIRO_AGENT_OS_VERSION} ` +
    `lang/js md/nodejs#${KIRO_NODE_VERSION} ` +
    `api/codewhispererstreaming#${KIRO_RUNTIME_SDK_VERSION} m/E ` +
    `KiroIDE-${KIRO_IDE_VERSION}-${machineId}`;
  const amzUserAgent =
    `aws-sdk-js/${KIRO_RUNTIME_SDK_VERSION} KiroIDE-${KIRO_IDE_VERSION}-${machineId}`;
  return { userAgent, amzUserAgent };
}

/**
 * Build the full header set for Kiro model discovery and usage probes.
 *
 * These endpoints use the `codewhispererruntime` surface name and carry the
 * profileArn/opt-out headers the IDE sends. Keeping them here means the version
 * bump applies to every Kiro surface at once.
 * @param providerSpecificData - persisted connection metadata (authMethod, clientId, …)
 * @param accessToken - current bearer token used for the machine id fallback
 * @returns headers without `Authorization`; the caller adds the bearer token
 */
export function buildKiroFingerprintHeaders(
  providerSpecificData: unknown,
  accessToken: string
): Record<string, string> {
  const psd = asRecord(providerSpecificData);
  const machineId = resolveKiroMachineId(psd, accessToken);
  const userAgent =
    `aws-sdk-js/${KIRO_RUNTIME_SDK_VERSION} ua/2.1 ` +
    `os/${KIRO_AGENT_OS}#${KIRO_AGENT_OS_VERSION} ` +
    `lang/js md/nodejs#${KIRO_NODE_VERSION} ` +
    `api/codewhispererruntime#${KIRO_RUNTIME_SDK_VERSION} m/N,E ` +
    `KiroIDE-${KIRO_IDE_VERSION}-${machineId}`;

  const headers: Record<string, string> = {
    "User-Agent": userAgent,
    "x-amz-user-agent": `aws-sdk-js/${KIRO_RUNTIME_SDK_VERSION} KiroIDE-${KIRO_IDE_VERSION}-${machineId}`,
    "x-amzn-kiro-agent-mode": "vibe",
    "x-amzn-codewhisperer-optout": "true",
    "amz-sdk-request": "attempt=1; max=1",
    "amz-sdk-invocation-id": uuidv4(),
    Accept: "application/json",
  };

  // API keys authenticate on a different token type than SSO/social sessions.
  if (psd.authMethod === "api_key") {
    headers.tokentype = "API_KEY";
  }
  // Org-IdP tokens must be labelled as such or CodeWhisperer resolves the wrong ARN.
  if (isExternalIdpAuthMethod(psd.authMethod)) {
    headers[KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER] = KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE;
  }
  return headers;
}
