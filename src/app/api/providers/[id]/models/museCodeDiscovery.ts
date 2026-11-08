import { NextResponse } from "next/server";
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import {
  MUSE_CODE_CATALOG_URL,
  MUSE_CODE_MODELS_URL,
} from "@omniroute/open-sse/config/museCode.ts";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { mergeMuseCodeModelListings } from "@omniroute/open-sse/services/museCodeModels.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { toDiscoveryFailure, type DiscoveryFailure } from "@/shared/discovery/degradedCause";
import { applyConnectionCustomHeaders } from "./discovery/connectionCustomHeaders";

interface DiscoveryWarnings {
  cacheWarning?: string;
  localWarning?: string;
  /** Why the discovery failed — a code or an HTTP status, never a message. */
  failure?: DiscoveryFailure;
}

interface MuseCodeDiscoveryRouteOptions {
  provider: string;
  apiKey: unknown;
  accessToken: unknown;
  providerSpecificData?: unknown;
  proxy: unknown;
  maybeReturnCachedDiscovery: () => Response | null;
  maybeReturnAutoFetchDisabled: () => Response | null;
  buildDiscoveryFallbackResponse: (warnings: DiscoveryWarnings) => Response | null;
  buildApiDiscoveryResponse: (models: Record<string, unknown>[]) => Promise<Response>;
}

/** `status` is what `toDiscoveryFailure` reads to report the failed discovery's cause. */
class MuseCodeListingError extends Error {
  constructor(
    readonly url: string,
    readonly status: number
  ) {
    super(`Muse Code listing ${url} answered HTTP ${status}`);
  }
}

/** A `/v1/models` answer without a `data` array is a failed discovery, not an empty one. */
class MuseCodeListingShapeError extends Error {
  readonly code = "INVALID_RESPONSE";

  constructor(readonly url: string) {
    super(`Muse Code listing ${url} answered without a data array`);
  }
}

function stringOf(value: unknown): string {
  return typeof value === "string" ? value.replace(/^Bearer\s+/i, "").trim() : "";
}

/**
 * The listing requests carry the identity inference sends (the registry entry's
 * headers) and the connection's own custom headers, like every other discovery.
 */
function listingHeaders(token: string, providerSpecificData: unknown): Record<string, string> {
  const headers: Record<string, string> = {
    ...(getRegistryEntry("muse-code")?.extraHeaders ?? {}),
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  return applyConnectionCustomHeaders(headers, providerSpecificData);
}

async function readListing(
  url: string,
  headers: Record<string, string>,
  proxy: unknown
): Promise<unknown> {
  const response = await safeOutboundFetch(url, {
    ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
    guard: getProviderOutboundGuard(),
    proxyConfig: proxy,
    method: "GET",
    headers,
  });
  if (!response.ok) throw new MuseCodeListingError(url, response.status);
  return response.json();
}

async function readUsableListing(
  headers: Record<string, string>,
  proxy: unknown
): Promise<unknown> {
  const body = await readListing(MUSE_CODE_MODELS_URL, headers, proxy);
  const data = body && typeof body === "object" ? (body as { data?: unknown }).data : undefined;
  if (!Array.isArray(data)) throw new MuseCodeListingShapeError(MUSE_CODE_MODELS_URL);
  return body;
}

/**
 * Muse Code discovery reads both listings Meta publishes for the key (see
 * `mergeMuseCodeModelListings`): `/v1/models` decides which models exist, the
 * Muse Code client catalog describes them. A catalog failure only drops the
 * descriptions; a `/v1/models` failure is a failed discovery.
 */
export async function maybeHandleMuseCodeModelDiscovery(
  options: MuseCodeDiscoveryRouteOptions
): Promise<Response | null> {
  if (options.provider !== "muse-code") return null;

  const cachedResponse = options.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = options.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = stringOf(options.accessToken) || stringOf(options.apiKey);
  if (!token) {
    return (
      options.buildDiscoveryFallbackResponse({
        cacheWarning: "No Muse Code credential — using cached catalog",
        localWarning: "No Muse Code credential — using local catalog",
        failure: { code: "NO_CREDENTIAL" },
      }) ?? NextResponse.json({ error: "Muse Code connection has no credential" }, { status: 400 })
    );
  }

  const headers = listingHeaders(token, options.providerSpecificData);
  const [usable, catalog] = await Promise.allSettled([
    readUsableListing(headers, options.proxy),
    readListing(MUSE_CODE_CATALOG_URL, headers, options.proxy),
  ]);

  if (usable.status === "rejected") {
    console.log("Error fetching models from provider", {
      provider: options.provider,
      errorText: sanitizeErrorMessage(
        usable.reason instanceof Error ? usable.reason.message : usable.reason
      ),
    });
    const status = usable.reason instanceof MuseCodeListingError ? usable.reason.status : 502;
    return (
      options.buildDiscoveryFallbackResponse({
        cacheWarning: "API unavailable — using cached catalog",
        localWarning: "API unavailable — using local catalog",
        failure: toDiscoveryFailure(usable.reason),
      }) ?? NextResponse.json({ error: `Muse Code models API failed: ${status}` }, { status })
    );
  }

  if (catalog.status === "rejected") {
    console.log("Muse Code client catalog unavailable; listing models without metadata", {
      errorText: sanitizeErrorMessage(
        catalog.reason instanceof Error ? catalog.reason.message : catalog.reason
      ),
    });
  }

  return options.buildApiDiscoveryResponse(
    mergeMuseCodeModelListings(usable.value, catalog.status === "fulfilled" ? catalog.value : null)
  );
}
