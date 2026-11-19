import { fetch as undiciFetch } from "undici";
import {
  getGuardedDispatcher,
  isConnectGuardRefusal,
  type ConnectGuardMode,
} from "./connectGuardDispatcher.ts";
import { withPayloadTraffic } from "./proxyTrafficTransport.ts";
import {
  createProxyDispatcher,
  getDefaultDispatcher,
  getDedicatedCodexImageDispatcher,
  getRetryDispatcher,
  isLocalEgressHostname,
} from "./proxyDispatcher.ts";
import { maybeReapDispatcherPool } from "./proxyDispatcherReap.ts";
import { describeFallbackFailure } from "./proxyFetchRedaction.ts";
import { isRegisteredFeatureFlagEnabled as isFeatureFlagEnabled } from "./registeredFeatureFlag.ts";
import {
  directFetchWithBoundedResponseStart,
  isDirectResponseStartTimeout,
  directHeadersTimeoutResolver,
} from "./directResponseStartTimeout.ts";
import {
  getEffectiveSignal,
  isDedicatedCodexImageRequest,
  codexImageResponseStartTimeoutMs,
  canResendAfterTransportError,
  isAmbiguousFailureReplaySafe,
  requestHasNonReplayableBody,
  tagProxyUnreachable,
  isProxyUnreachableError,
  describeFetchCause,
  RETRY_BACKOFF_MS,
  type FetchWithDispatcher,
} from "./proxyFetchTransportSupport.ts";
import { isTlsSendEligible, tryTlsSend } from "./proxyFetchTlsTransport.ts";
import type { ProxyFetchDeps, ProxyTransportRuntime } from "./proxyFetchTransport.ts";

function targetPart(target: string, key: "hostname" | "host"): string {
  try {
    return new URL(target)[key];
  } catch {
    return "";
  }
}
function isLoopbackHost(hostname: string): boolean {
  const host = hostname
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/^::ffff:/i, "")
    .toLowerCase();
  return host === "localhost" || host === "::1" || host === "127.0.0.1" || host.startsWith("127.");
}
function isDirectTransportFailure(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as { code?: unknown })?.code;
  const codes = ["ECONNREFUSED", "EAI_AGAIN", "ENOTFOUND", "ETIMEDOUT"];
  return (
    msg.includes("fetch failed") ||
    codes.includes(String(code)) ||
    codes.some((c) => msg.includes(c)) ||
    (typeof code === "string" && code.startsWith("UND_ERR")) ||
    msg.includes("UND_ERR")
  );
}

export async function dispatchDirectFetch(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  runtime: ProxyTransportRuntime,
  target: string,
  source: string,
  connectGuard?: ConnectGuardMode
): Promise<Response> {
  const store = runtime.tlsFingerprintContext.getStore();
  let tlsFallback = false;
  if (isTlsSendEligible(input, options, target, store, null)) {
    const response = await tryTlsSend(input, options, target, store, null, null, deps);
    if (response) return response;
    tlsFallback = true;
  }
  const native =
    (deps.nativeFetch as FetchWithDispatcher | undefined) ?? runtime.originalFetchWithDispatcher;
  if (process.versions.bun || isLoopbackHost(targetPart(target, "hostname"))) {
    return withPayloadTraffic(native, null, deps.recordTraffic)(input, options);
  }
  return sendDirectWithRetry(
    input,
    options,
    deps,
    native,
    target,
    source,
    tlsFallback,
    connectGuard
  );
}

function validateDirectFailure(error: unknown, signal: AbortSignal | null | undefined): void {
  if (signal?.aborted || isConnectGuardRefusal(error)) throw error;
  if (isDirectResponseStartTimeout(error)) return;
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("onRequestStart")) {
    console.error(
      `[ProxyFetch] Fatal version mismatch: Dispatcher (v8) vs Fetch (v6/native). Hardware upgrade or SOCKS5 config isolation required. Error: ${message}`
    );
    throw error;
  }
  tagProxyUnreachable(error);
  if (!isDirectTransportFailure(error)) throw error;
}

function refuseResend(error: unknown, nonReplayable: boolean): never {
  const reason = nonReplayable
    ? "non-replayable request body"
    : "request may already have been delivered";
  const detail = describeFallbackFailure(describeFetchCause(error), `skipped: ${reason}`);
  console.warn(`[ProxyFetch] skipping native fetch fallback, ${reason}: ${detail}`);
  if (error instanceof Error)
    (error as Error & { proxyFetchDetail?: string }).proxyFetchDetail = detail;
  throw tagProxyUnreachable(error);
}

async function sendDirectWithRetry(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  native: FetchWithDispatcher,
  target: string,
  source: string,
  tlsFallback: boolean,
  connectGuard?: ConnectGuardMode
): Promise<Response> {
  const directOptions = { ...options, signal: getEffectiveSignal(input, options) };
  const nonReplayable = requestHasNonReplayableBody(input, options);
  const replayTimeout = isAmbiguousFailureReplaySafe(input, options);
  const dedicatedCodexImageRequest = isDedicatedCodexImageRequest(input, target, options);
  const imageTimeout = dedicatedCodexImageRequest ? codexImageResponseStartTimeoutMs() : 0;
  const max = nonReplayable || dedicatedCodexImageRequest ? 1 : 2;
  const raw = deps.undiciFetch ?? (undiciFetch as unknown as FetchWithDispatcher);
  const timeoutFor = directHeadersTimeoutResolver(directOptions, target);
  const hostname = targetPart(target, "hostname") || undefined;
  let lastError: unknown;
  for (let attempt = 0; attempt < max; attempt++) {
    try {
      return await directFetchWithBoundedResponseStart(
        input,
        {
          ...directOptions,
          dispatcher: directAttemptDispatcher(
            connectGuard,
            dedicatedCodexImageRequest,
            imageTimeout,
            hostname,
            attempt
          ),
        },
        withPayloadTraffic(raw, null, deps.recordTraffic),
        directAttemptTimeout(
          dedicatedCodexImageRequest,
          imageTimeout,
          timeoutFor,
          attempt,
          replayTimeout
        )
      );
    } catch (error) {
      // Validation tags errors, so inspect the original connection code first.
      const canResend =
        !dedicatedCodexImageRequest && canResendAfterTransportError(input, options, error);
      validateDirectFailure(error, directOptions.signal);
      if (retryDirectFailure(error, attempt, max, replayTimeout, timeoutFor, target, canResend)) {
        await directRetryBackoff(error);
        lastError = error;
        continue;
      }
      if (!canResend) refuseResend(error, nonReplayable);
      // Guarded requests must never fall back to an unguarded proxy or native lookup.
      if (connectGuard) throw error;
      return exhaustedDirect(input, options, deps, native, raw, target, source, tlsFallback, error);
    }
  }
  throw lastError;
}

function directAttemptTimeout(
  dedicatedCodexImageRequest: boolean,
  imageTimeout: number,
  timeoutFor: (attempt: number) => number,
  attempt: number,
  replayTimeout: boolean
): number {
  if (dedicatedCodexImageRequest) return imageTimeout;
  return timeoutFor(attempt === 0 && replayTimeout ? 0 : 1);
}

function directAttemptDispatcher(
  connectGuard: ConnectGuardMode | undefined,
  dedicatedCodexImageRequest: boolean,
  imageTimeout: number,
  hostname: string | undefined,
  attempt: number
) {
  if (connectGuard) return getGuardedDispatcher(connectGuard);
  if (dedicatedCodexImageRequest) return getDedicatedCodexImageDispatcher(imageTimeout);
  return attempt === 0 ? getDefaultDispatcher(hostname) : getRetryDispatcher(hostname);
}

async function directRetryBackoff(error: unknown): Promise<void> {
  if (!isDirectResponseStartTimeout(error))
    await new Promise((resolve) => setTimeout(resolve, RETRY_BACKOFF_MS));
}

function retryDirectFailure(
  error: unknown,
  attempt: number,
  max: number,
  replayTimeout: boolean,
  timeoutFor: (attempt: number) => number,
  target: string,
  canResend: boolean
): boolean {
  if (!isDirectResponseStartTimeout(error)) return attempt === 0 && canResend;
  if (attempt !== 0 || max <= 1 || !replayTimeout) throw error;
  console.warn(
    `[ProxyFetch] Direct response-start timeout (${timeoutFor(0)}ms) on pooled dispatcher — retrying on fresh no-keep-alive dispatcher: ${targetPart(target, "host")}`
  );
  return true;
}

async function tryAutomaticProxy(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  raw: FetchWithDispatcher,
  target: string,
  source: string,
  tlsFallback: boolean
): Promise<Response | null> {
  if (tlsFallback || source !== "direct" || !isFeatureFlagEnabled("PROXY_AUTO_SELECT_ENABLED"))
    return null;
  const hostname = targetPart(target, "hostname");
  if (!hostname) return null;
  const find = deps.findWorkingProxy ?? (await import("./proxyFallback.ts")).findWorkingProxy;
  const proxy = await find(hostname, target);
  if (!proxy) return null;
  try {
    return await withPayloadTraffic(
      raw,
      proxy,
      deps.recordTraffic
    )(input, { ...options, dispatcher: createProxyDispatcher(proxy) });
  } catch {
    return null;
  }
}

async function exhaustedDirect(
  input: RequestInfo | URL,
  options: RequestInit,
  deps: ProxyFetchDeps,
  native: FetchWithDispatcher,
  raw: FetchWithDispatcher,
  target: string,
  source: string,
  tlsFallback: boolean,
  error: unknown
): Promise<Response> {
  const proxied = await tryAutomaticProxy(input, options, deps, raw, target, source, tlsFallback);
  if (proxied) return proxied;
  console.warn(
    `[ProxyFetch] Undici dispatcher failed, falling back to native fetch (after retry): ${describeFetchCause(error)}`
  );
  const host = targetPart(target, "host");
  if (isProxyUnreachableError(error)) maybeReapDispatcherPool(host, isLocalEgressHostname(host));
  try {
    return await withPayloadTraffic(native, null, deps.recordTraffic)(input, options);
  } catch (nativeError) {
    const detail = describeFallbackFailure(
      describeFetchCause(error),
      describeFetchCause(nativeError)
    );
    console.warn(`[ProxyFetch] native fetch fallback ALSO failed: ${detail}`);
    if (nativeError instanceof Error)
      (nativeError as Error & { proxyFetchDetail?: string }).proxyFetchDetail = detail;
    tagProxyUnreachable(nativeError);
    throw nativeError;
  }
}
