import { finalizeReadableStream } from "@/app/api/v1/relay/chat/completions/streamFinalizer";
import { getProviderPluginManifestHeader } from "@omniroute/open-sse/config/providerPluginManifestUrl.ts";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  stripSensitiveResponseHeaders,
  stripStaleEncodingHeaders,
} from "@omniroute/open-sse/utils/upstreamResponseHeaders.ts";
import type { BifrostRoutingConfig } from "./bifrostRouting";

export interface BifrostDispatchOptions {
  request: Request;
  body: Record<string, unknown>;
  config: BifrostRoutingConfig;
  targetPath?: string;
  onUsageRecorded?: (status: "success" | "error", statusCode: number) => void;
}

export interface BifrostForwardResult {
  response: Response;
  timedOut: boolean;
  statusCode: number;
}

function buildUpstreamHeaders(
  request: Request,
  config: BifrostRoutingConfig
): Record<string, string> {
  const origin = new URL(request.url).origin;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...getProviderPluginManifestHeader(origin),
  };

  // Anthropic-compatible endpoint (/v1/messages fast-path) needs the client's protocol headers.
  for (const name of ["anthropic-version", "anthropic-beta"]) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }

  const reqId = request.headers.get("x-request-id") || request.headers.get("x-correlation-id");
  if (reqId) headers["x-request-id"] = reqId;

  if (config.apiKey) {
    headers["Authorization"] = `Bearer ${config.apiKey}`;
  } else {
    const clientAuth = request.headers.get("authorization");
    if (clientAuth) headers["Authorization"] = clientAuth;
  }
  return headers;
}

export async function dispatchToBifrost({
  request,
  body,
  config,
  targetPath = "/v1/chat/completions",
  onUsageRecorded,
}: BifrostDispatchOptions): Promise<BifrostForwardResult> {
  const upstreamHeaders = buildUpstreamHeaders(request, config);
  const wantsStream = Boolean(body.stream) && config.streamingEnabled;

  const ac = new AbortController();
  let timedOut = false;
  const tid = setTimeout(() => {
    timedOut = true;
    ac.abort();
  }, config.timeoutMs);

  const cleanBase = config.baseUrl.replace(/\/$/, "");
  const cleanPath = targetPath.startsWith("/") ? targetPath : `/${targetPath}`;
  const targetUrl = `${cleanBase}${cleanPath}`;

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify(body),
      signal: ac.signal,
    });
  } catch (error) {
    clearTimeout(tid);
    throw error;
  }

  // Never relay the sidecar's headers wholesale: it receives BIFROST_API_KEY (or the
  // client's Authorization) and could echo it back, or set its own session cookie that
  // the browser would store against OUR origin (GHSA-9m72-44hg-w32g). The strip also
  // drops the stale content-encoding/length that fetch() has already decoded.
  const responseHeaders = stripSensitiveResponseHeaders(upstream.headers);
  responseHeaders.set("X-Routed-By", "bifrost");

  // The sidecar is a third-party binary (@maximhq/bifrost), outside OmniRoute's own
  // sanitization layer — its 4xx body is never guaranteed to be free of internal
  // paths/stack traces, so (unlike the 2xx fast-path below) it must go through the
  // same sanitizeErrorMessage()/buildErrorBody() path as every native error response
  // (Hard Rule #12) instead of being passed through verbatim.
  if (upstream.status >= 400 && upstream.status < 500) {
    clearTimeout(tid);
    const rawText = await upstream.text().catch(() => "");
    const safeMessage = sanitizeErrorMessage(`Bifrost error ${upstream.status}: ${rawText}`);
    onUsageRecorded?.("success", upstream.status);
    const errorHeaders = stripStaleEncodingHeaders(responseHeaders);
    errorHeaders.set("Content-Type", "application/json");
    return {
      response: new Response(JSON.stringify(buildErrorBody(upstream.status, safeMessage)), {
        status: upstream.status,
        headers: errorHeaders,
      }),
      timedOut,
      statusCode: upstream.status,
    };
  }

  if (!wantsStream) {
    responseHeaders.set("Content-Type", upstream.headers.get("Content-Type") ?? "application/json");
  }

  if (wantsStream && upstream.body) {
    const stream = finalizeReadableStream(upstream.body, (error) => {
      clearTimeout(tid);
      const statusCode = timedOut ? 504 : upstream.status;
      const status = error || statusCode >= 500 ? "error" : "success";
      onUsageRecorded?.(status, statusCode);
    });

    return {
      response: new Response(stream, { status: upstream.status, headers: responseHeaders }),
      timedOut,
      statusCode: upstream.status,
    };
  }

  clearTimeout(tid);
  onUsageRecorded?.(upstream.status < 500 ? "success" : "error", upstream.status);

  return {
    response: new Response(upstream.body, { status: upstream.status, headers: responseHeaders }),
    timedOut,
    statusCode: upstream.status,
  };
}
