/**
 * chatCore connection-level upstream overrides (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore: read the connection's custom User-Agent (trimmed,
 * "" when unset) and its custom upstream headers (#8369) from provider_specific_data. Both feed
 * buildUpstreamHeadersForExecute.
 */

type ProviderSpecificDataLike = { customUserAgent?: unknown; customHeaders?: unknown };

export function resolveConnectionUpstreamOverrides(
  providerSpecificData: ProviderSpecificDataLike | null | undefined
): {
  connectionCustomUserAgent: string;
  connectionCustomHeaders: Record<string, string> | undefined;
} {
  const connectionCustomUserAgent =
    providerSpecificData &&
    typeof providerSpecificData === "object" &&
    typeof providerSpecificData.customUserAgent === "string"
      ? providerSpecificData.customUserAgent.trim()
      : "";

  // #8369: connection-level custom upstream headers from provider_specific_data.
  const connectionCustomHeaders =
    providerSpecificData &&
    typeof providerSpecificData === "object" &&
    typeof providerSpecificData.customHeaders === "object" &&
    !Array.isArray(providerSpecificData.customHeaders)
      ? (providerSpecificData.customHeaders as Record<string, string>)
      : undefined;
  return { connectionCustomUserAgent, connectionCustomHeaders };
}
