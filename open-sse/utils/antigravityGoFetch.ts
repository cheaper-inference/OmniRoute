import type { AntigravityClientProfile } from "../services/antigravityClientProfile.ts";
import { getAppliedProxyContext } from "./appliedProxyContext.ts";
import {
  AntigravityGoBridgeError,
  hasAntigravityGoBridge,
  sendViaAntigravityGoBridge,
  type AntigravityGoBridgeLike,
  type AntigravityGoTargetMeta,
} from "./antigravityGoTlsClient.ts";
import { sanitizeHeaderValues } from "./headerSanitize.ts";
import { isRelayType } from "./proxyDispatcher.ts";
import {
  getActiveProxyContext,
  isDirectFetchContext,
  resolveProxyForRequest,
} from "./proxyFetch.ts";
import {
  getEffectiveSignal,
  isAmbiguousFailureReplaySafe,
  type FetchWithDispatcherOptions,
} from "./proxyFetchTransportSupport.ts";
import { meterTrafficSend } from "./proxyTrafficTransport.ts";
import { sanitizeTransportError } from "./proxyTransportError.ts";
import { isRegisteredFeatureFlagEnabled } from "./registeredFeatureFlag.ts";
import { withUpstreamStatusCapture } from "./upstreamStatusCapture.ts";

export const ANTIGRAVITY_GO_TLS_FLAG = "ANTIGRAVITY_GO_TLS_TRANSPORT_ENABLED";

const SUPPORTED_GO_PROXY_PROTOCOLS = new Set(["http:", "https:", "socks5:", "socks5h:"]);
const ANTIGRAVITY_PROVIDERS = new Set(["antigravity", "agy"]);

export type AntigravityFetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export interface AntigravityGoFetchOptions {
  clientProfile?: AntigravityClientProfile | null;
  provider?: string | null;
  fallbackFetch?: AntigravityFetchLike;
  bridgeOverride?: AntigravityGoBridgeLike | null;
}

type AntigravityRequestInit = FetchWithDispatcherOptions & {
  bypassProxyPatch?: boolean;
  pinDns?: boolean;
};

function isStreamLikeBody(body: unknown): boolean {
  return (
    body !== null &&
    body !== undefined &&
    typeof body === "object" &&
    (typeof (body as Record<string, unknown>).getReader === "function" ||
      typeof (body as Record<string, unknown>).stream === "function")
  );
}

function isGoSupportedProxyUrl(proxyUrl: string): boolean {
  try {
    const parsed = new URL(proxyUrl);
    return SUPPORTED_GO_PROXY_PROTOCOLS.has(parsed.protocol.toLowerCase());
  } catch {
    return false;
  }
}

function isGoSupportedConnectGuard(guard: unknown): guard is "public-only" | "block-metadata" {
  return guard === "public-only" || guard === "block-metadata";
}

function shouldStripForGoAutoGzip(value: string): boolean {
  const normalized = value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
  if (normalized.length === 0) return false;
  // Go net/http automatically sets `Accept-Encoding: gzip` and transparently
  // gunzips when the caller leaves Accept-Encoding unset; stripping Node's
  // default `gzip, deflate, br` or `gzip` prevents double/unhandled compression
  // and keeps the wire header identical to the native Go CLI.
  return (
    (normalized.length === 1 && normalized[0] === "gzip") ||
    normalized.join(",") === "gzip,deflate,br"
  );
}

function serializeHeadersForGo(rawHeaders: HeadersInit | undefined): {
  pairs: [string, string][];
  hasContentType: boolean;
} {
  if (!rawHeaders) {
    return { pairs: [], hasContentType: false };
  }
  const cleanHeaders = sanitizeHeaderValues(rawHeaders);
  const rawPairs: [string, string][] = [];

  if (cleanHeaders instanceof Headers) {
    cleanHeaders.forEach((value, key) => {
      rawPairs.push([key, value]);
    });
  } else if (Array.isArray(cleanHeaders)) {
    for (const entry of cleanHeaders) {
      if (Array.isArray(entry) && entry.length >= 2) {
        rawPairs.push([String(entry[0]), String(entry[1])]);
      }
    }
  } else if (typeof cleanHeaders === "object") {
    for (const [key, value] of Object.entries(cleanHeaders)) {
      if (value !== undefined) {
        rawPairs.push([key, String(value)]);
      }
    }
  }

  const pairs: [string, string][] = [];
  let hasContentType = false;
  for (const [key, value] of rawPairs) {
    const lower = key.toLowerCase();
    if (lower === "accept-encoding" && shouldStripForGoAutoGzip(value)) {
      continue;
    }
    if (lower === "content-type") {
      hasContentType = true;
    }
    pairs.push([key, value]);
  }
  return { pairs, hasContentType };
}

async function serializeBodyForGo(body: BodyInit | null | undefined): Promise<{
  bytes: Uint8Array | null;
  defaultContentType?: string;
  supported: boolean;
}> {
  if (body === undefined || body === null) {
    return { bytes: null, supported: true };
  }
  if (typeof body === "string") {
    return { bytes: Buffer.from(body, "utf8"), supported: true };
  }
  if (body instanceof URLSearchParams) {
    return {
      bytes: Buffer.from(body.toString(), "utf8"),
      defaultContentType: "application/x-www-form-urlencoded;charset=UTF-8",
      supported: true,
    };
  }
  if (body instanceof ArrayBuffer) {
    return { bytes: new Uint8Array(body), supported: true };
  }
  if (ArrayBuffer.isView(body)) {
    return {
      bytes: new Uint8Array(body.buffer, body.byteOffset, body.byteLength),
      supported: true,
    };
  }
  if (typeof Blob !== "undefined" && body instanceof Blob) {
    const buf = await body.arrayBuffer();
    return {
      bytes: new Uint8Array(buf),
      defaultContentType: body.type || undefined,
      supported: true,
    };
  }
  return { bytes: null, supported: false };
}

function getTargetHref(input: RequestInfo | URL): string | null {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return null;
}

export function isAntigravityGoTlsEnabled(): boolean {
  return isRegisteredFeatureFlagEnabled(ANTIGRAVITY_GO_TLS_FLAG);
}

/**
 * Dispatch an Antigravity `cli` HTTP request through the optional Go `crypto/tls`
 * HTTP/1.1 sidecar when `ANTIGRAVITY_GO_TLS_TRANSPORT_ENABLED` is enabled and all
 * safety/routing preconditions hold. Gracefully falls back to `fallbackFetch`.
 */
export async function antigravityGoFetch(
  input: RequestInfo | URL,
  options: RequestInit = {},
  antigravityOptions: AntigravityGoFetchOptions = {}
): Promise<Response> {
  const fallbackFetch = antigravityOptions.fallbackFetch ?? fetch;
  const clientProfile = antigravityOptions.clientProfile ?? "cli";
  if (clientProfile !== "cli") {
    return fallbackFetch(input, options);
  }

  if (
    antigravityOptions.provider &&
    !ANTIGRAVITY_PROVIDERS.has(antigravityOptions.provider.toLowerCase())
  ) {
    return fallbackFetch(input, options);
  }

  if (!isAntigravityGoTlsEnabled()) {
    return fallbackFetch(input, options);
  }

  if (!antigravityOptions.bridgeOverride && !hasAntigravityGoBridge()) {
    return fallbackFetch(input, options);
  }

  const reqOptions = options as AntigravityRequestInit;
  if (
    reqOptions.dispatcher ||
    reqOptions.bypassProxyPatch ||
    reqOptions.pinDns ||
    isDirectFetchContext() ||
    isStreamLikeBody(reqOptions.body) ||
    (typeof FormData !== "undefined" && reqOptions.body instanceof FormData)
  ) {
    return fallbackFetch(input, options);
  }

  const targetUrl = getTargetHref(input);
  if (!targetUrl) {
    return fallbackFetch(input, options);
  }

  const proxyStore = getActiveProxyContext();
  if (
    proxyStore &&
    typeof proxyStore === "object" &&
    isRelayType((proxyStore as { type?: string }).type)
  ) {
    return fallbackFetch(input, options);
  }

  const connectGuard = reqOptions.connectGuard;
  if (
    connectGuard !== undefined &&
    (connectGuard as string) !== "none" &&
    !isGoSupportedConnectGuard(connectGuard)
  ) {
    return fallbackFetch(input, options);
  }

  const { source, proxyUrl } = resolveProxyForRequest(targetUrl);
  if (proxyUrl && !isGoSupportedProxyUrl(proxyUrl)) {
    return fallbackFetch(input, options);
  }

  const serializedBody = await serializeBodyForGo(reqOptions.body);
  if (!serializedBody.supported) {
    return fallbackFetch(input, options);
  }

  const { pairs, hasContentType } = serializeHeadersForGo(reqOptions.headers);
  if (!hasContentType && serializedBody.defaultContentType) {
    pairs.push(["Content-Type", serializedBody.defaultContentType]);
  }

  const effectiveSignal = getEffectiveSignal(input, options);
  const meta: AntigravityGoTargetMeta = {
    url: targetUrl,
    method: (reqOptions.method || "GET").toUpperCase(),
    headers: pairs,
    ...(proxyUrl ? { proxyUrl } : {}),
    ...(reqOptions.redirect ? { redirect: reqOptions.redirect } : {}),
    ...(!proxyUrl && isGoSupportedConnectGuard(connectGuard)
      ? {
          connectGuard,
          blockBenchmarkRange: isRegisteredFeatureFlagEnabled("OMNIROUTE_BLOCK_BENCHMARK_RANGE"),
        }
      : {}),
  };

  const trafficProxy = source === "context" ? proxyStore : proxyUrl;
  const sendBridge = antigravityOptions.bridgeOverride
    ? () => antigravityOptions.bridgeOverride!.send(meta, serializedBody.bytes, effectiveSignal)
    : () => sendViaAntigravityGoBridge(meta, serializedBody.bytes, effectiveSignal);

  const meteredWithStatusCapture = withUpstreamStatusCapture(
    async () => {
      let bridgeResult: Response | null = null;
      return meterTrafficSend(trafficProxy, input, reqOptions, async () => {
        bridgeResult = await sendBridge();
        if (!bridgeResult) {
          throw new AntigravityGoBridgeError("Antigravity Go TLS sidecar unavailable", {
            code: "ERR_BRIDGE_UNAVAILABLE",
            isPreSend: true,
            isBridgeUnavailable: true,
          });
        }
        return bridgeResult;
      });
    },
    () => getAppliedProxyContext().getStore()
  );

  try {
    return await meteredWithStatusCapture();
  } catch (error) {
    if (effectiveSignal?.aborted) {
      throw effectiveSignal.reason ?? error;
    }

    if (error instanceof AntigravityGoBridgeError) {
      if (error.code === "ERR_OUTBOUND_HOST_BLOCKED") {
        const guardError = new Error(error.message) as Error & { code: string };
        guardError.code = "ERR_OUTBOUND_HOST_BLOCKED";
        throw guardError;
      }
      if (error.code === "ERR_REDIRECT_DISALLOWED") {
        throw new TypeError("Failed to fetch");
      }
      if (
        error.isBridgeUnavailable ||
        error.isPreSend ||
        isAmbiguousFailureReplaySafe(input, reqOptions)
      ) {
        if (!error.isBridgeUnavailable) {
          console.warn(
            `[AntigravityGoTls] Bridge send failed (${error.code}); falling back to standard fetch`
          );
        }
        return fallbackFetch(input, options);
      }
      throw sanitizeTransportError(
        error,
        "Antigravity Go TLS request failed; request is not safe to replay",
        "ANTIGRAVITY_GO_TLS_FAILED"
      );
    }

    if (isAmbiguousFailureReplaySafe(input, reqOptions)) {
      console.warn("[AntigravityGoTls] Unexpected bridge failure; falling back to standard fetch");
      return fallbackFetch(input, options);
    }
    throw sanitizeTransportError(
      error,
      "Antigravity Go TLS request failed",
      "ANTIGRAVITY_GO_TLS_FAILED"
    );
  }
}

/**
 * Create a `fetch`-compatible wrapper bound to a specific Antigravity client profile.
 * Non-`cli` profiles pass directly through to `fallbackFetch`.
 */
export function createAntigravityCliFetch(
  clientProfile?: AntigravityClientProfile | null,
  options: Omit<AntigravityGoFetchOptions, "clientProfile"> = {}
): AntigravityFetchLike {
  if (clientProfile !== "cli") {
    return options.fallbackFetch ?? fetch;
  }
  return (input, init) =>
    antigravityGoFetch(input, init, {
      ...options,
      clientProfile: "cli",
    });
}
