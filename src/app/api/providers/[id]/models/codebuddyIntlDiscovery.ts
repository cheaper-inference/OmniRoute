import { discoverCodeBuddyIntlModels } from "@omniroute/open-sse/services/codebuddyIntlCatalog.ts";
import { getModelsByProviderId } from "@/shared/constants/models";
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";

interface DiscoveryWarnings {
  cacheWarning?: string;
  localWarning?: string;
}

interface CodeBuddyIntlDiscoveryOptions {
  provider: string;
  connectionId: string;
  apiKey: unknown;
  accessToken: unknown;
  proxy: unknown;
  /** `?refresh=true` on the route: bypass the in-memory catalog TTL for this read. */
  refresh?: boolean;
  maybeReturnCachedDiscovery: () => Response | null;
  maybeReturnAutoFetchDisabled: () => Response | null;
  buildDiscoveryFallbackResponse: (warnings?: DiscoveryWarnings) => Response | null;
  buildResponse: (payload: Record<string, unknown>) => Response;
  buildApiDiscoveryResponse: (models: unknown[], warning?: string) => Promise<Response>;
}

/**
 * CodeBuddy International: the authoritative catalog is the authenticated
 * `GET /v3/config?repos[]=` (the gateway publishes no `/models`). Discovery is best-effort: on any
 * failure the curated registry list is the answer, so a broken catalog endpoint can never empty
 * the model picker. Returns null for every other provider.
 */
export async function maybeHandleCodeBuddyIntlModelDiscovery(
  options: CodeBuddyIntlDiscoveryOptions
): Promise<Response | null> {
  const { provider, connectionId, proxy, buildDiscoveryFallbackResponse, buildResponse } = options;
  if (provider !== "codebuddy-intl") return null;

  const earlyResponse =
    options.maybeReturnCachedDiscovery() ?? options.maybeReturnAutoFetchDisabled();
  if (earlyResponse) return earlyResponse;

  const curatedFallback = (warnings: DiscoveryWarnings, warning: string) =>
    buildDiscoveryFallbackResponse(warnings) ??
    buildResponse({
      provider,
      connectionId,
      models: getModelsByProviderId(provider),
      source: "local_catalog",
      intentional: true,
      warning,
    });

  const token = options.apiKey || options.accessToken;
  if (typeof token !== "string" || !token) {
    return curatedFallback(
      {
        cacheWarning: "No access token — using cached catalog",
        localWarning: "No access token — using curated catalog",
      },
      "No access token — using the curated CodeBuddy model list"
    );
  }

  try {
    const result = await discoverCodeBuddyIntlModels({
      accessToken: token,
      accountKey: connectionId,
      // `?refresh=true` must not be answered from the in-memory catalog: a zero TTL
      // forces the fetch while a successful result still refreshes the cache.
      ...(options.refresh ? { ttlMs: 0 } : {}),
      // The curated registry is passed in so the merge happens before persistence: the gateway
      // decides WHICH models exist, the curated list keeps the metadata the gateway does not
      // publish (context windows, output caps, vision/reasoning flags) and any model it still
      // lists that the gateway omitted. Without this the first successful fetch replaced curated
      // rows with gateway-only rows and dropped that metadata for every model.
      curatedModels: getModelsByProviderId(provider) || [],
      fetchImpl: (url, init) =>
        safeOutboundFetch(url, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          ...init,
        }),
    });

    if (result.ok && result.models.length > 0) {
      return options.buildApiDiscoveryResponse(
        result.models,
        result.cached ? "Served from the cached CodeBuddy catalog" : undefined
      );
    }

    return curatedFallback(
      {
        cacheWarning: "CodeBuddy /v3/config failed — using cached catalog",
        localWarning: "CodeBuddy /v3/config failed — using curated catalog",
      },
      "CodeBuddy catalog unavailable — using the curated model list"
    );
  } catch (error) {
    console.log("Error fetching models from codebuddy-intl", {
      error: error instanceof Error ? error.message : String(error),
    });
    return curatedFallback(
      {
        cacheWarning: "CodeBuddy catalog request threw — using cached catalog",
        localWarning: "CodeBuddy catalog request threw — using curated catalog",
      },
      "CodeBuddy catalog request failed — using the curated model list"
    );
  }
}
