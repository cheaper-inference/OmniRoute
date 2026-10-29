import { SYSTEMONE_BACKENDS, type SystemOneProvider } from "../config/systemOneRegistry.ts";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { parseAndValidateNonMetadataUrl } from "@/shared/network/outboundUrlGuard";
import { resolveProxyForConnection } from "@/lib/db/settings";

export interface SystemOneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

export function systemOneUrl(
  provider: SystemOneProvider,
  credentials: SystemOneCredentials,
  catalog = false
): string {
  if (provider !== "ollama-local")
    return catalog ? SYSTEMONE_BACKENDS[provider].modelsUrl : SYSTEMONE_BACKENDS[provider].url;
  const configured = credentials.providerSpecificData?.baseUrl;
  const base = typeof configured === "string" ? configured : "http://localhost:11434/v1";
  const url = parseAndValidateNonMetadataUrl(base);
  if (url.hostname === "ollama.com" || url.hostname.endsWith(".ollama.com")) {
    throw new Error(
      "Ollama cloud does not support System One; configure a local Ollama connection"
    );
  }
  url.search = "";
  url.hash = "";
  url.pathname =
    url.pathname
      .replace(/\/+$/, "")
      .replace(/\/(?:chat\/completions|completions|embeddings|systemone)$/i, "")
      .replace(/\/api\/chat$/i, "")
      .replace(/\/v1$/i, "") + (catalog ? "/v1/models" : "/v1/systemone");
  return url.toString();
}

/** Normal outbound guard/proxy policy, no URLs or credentials from request fields. */
export async function fetchSystemOne(
  url: string,
  credentials: SystemOneCredentials,
  init: RequestInit
): Promise<Response> {
  const proxyInfo = credentials.connectionId
    ? await resolveProxyForConnection(credentials.connectionId)
    : null;
  return safeOutboundFetch(url, {
    ...init,
    guard: getProviderOutboundGuard(),
    proxyConfig: proxyInfo?.proxy || null,
    retry: false,
    allowRedirect: false,
  });
}

export function systemOneHeaders(credentials: SystemOneCredentials): Record<string, string> {
  const token = credentials.apiKey || credentials.accessToken;
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
