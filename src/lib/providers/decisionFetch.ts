// Outbound transport for decision providers. Lives in src/ (not open-sse/) because it
// needs the app's network guard, proxy settings and DB — the engine must not import src/.
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { parseAndValidateNonMetadataUrl } from "@/shared/network/outboundUrlGuard";
import { resolveProxyForConnection } from "@/lib/db/settings";
import type { DecisionCredentials } from "@omniroute/open-sse/handlers/decisionTypes.ts";

/** Same operator-managed connection, DNS/SSRF guard and proxy path as other providers. */
export async function fetchDecision(
  url: string,
  credentials: DecisionCredentials,
  init: RequestInit
) {
  parseAndValidateNonMetadataUrl(url); // IMDS stays blocked even with the legacy full opt-in.
  const proxy = credentials.connectionId
    ? await resolveProxyForConnection(credentials.connectionId)
    : null;
  return safeOutboundFetch(url, {
    ...init,
    guard: getProviderOutboundGuard(),
    proxyConfig: proxy?.proxy || null,
    allowRedirect: false,
    retry: false, // A timed-out inference may have executed; never replay it automatically.
    timeoutMs: 120_000,
  });
}
